const { Op } = require('sequelize');
const Cliente = require('../models/Cliente');
const Pago = require('../models/Pago');
const Clase = require('../models/Clase');
const Evaluacion = require('../models/Evaluacion');
const Reserva = require('../models/Reserva');
const Usuario = require('../models/Usuario');
const { getSequelizeInstance } = require('../database/config');

// Helper to generate transaction IDs
function generateTransactionId() {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TRX-${result}`;
}

const EvaluacionOnline = require('../models/EvaluacionOnline');
const Plan = require('../models/Plan');

// -------------------------------------------------------------
// CLIENTES CONTROLLER
// -------------------------------------------------------------
exports.getClientes = async (req, res, next) => {
  try {
    const { search, plan, status } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    if (plan && plan !== 'all') {
      where[Op.or] = [
        ...(where[Op.or] || []),
        { plan: plan === 'regular' ? 'Clase Regular' : plan === 'max' ? 'Max Performance' : 'Básico' }
      ];
    }

    if (status && status !== 'all') {
      where[Op.or] = [
        ...(where[Op.or] || []),
        { status: status === 'active' ? 'Activo' : 'Inactivo' }
      ];
    }

    const clientes = await Cliente.findAll({
      where,
      include: [
        {
          model: EvaluacionOnline,
          as: 'evaluacionesOnline',
          attributes: ['id', 'codigoReferencia', 'estado', 'createdAt'],
          include: [{ model: Plan, as: 'plan', attributes: ['id', 'nombre', 'codigo'] }],
          required: false,
        },
      ],
      order: [['name', 'ASC']],
    });

    res.json({ success: true, data: clientes });
  } catch (error) {
    next(error);
  }
};

exports.createCliente = async (req, res, next) => {
  try {
    const { name, email, phone, plan, status } = req.body;
    
    // Check if email already exists
    const existing = await Cliente.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado.' });
    }

    const newCliente = await Cliente.create({
      name,
      email,
      phone,
      plan,
      status: status || 'Activo',
      lastPayment: new Date().toISOString().split('T')[0], // Default last payment to today
    });

    res.status(201).json({ success: true, data: newCliente });
  } catch (error) {
    next(error);
  }
};

exports.updateCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, plan, status, lastPayment } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente no encontrado.' });
    }

    await cliente.update({ name, email, phone, plan, status, lastPayment });
    res.json({ success: true, data: cliente });
  } catch (error) {
    next(error);
  }
};

exports.deleteCliente = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente no encontrado.' });
    }

    await cliente.destroy(); // Soft delete
    res.json({ success: true, message: 'Cliente eliminado correctamente (soft delete).' });
  } catch (error) {
    next(error);
  }
};


// -------------------------------------------------------------
// PAGOS CONTROLLER
// -------------------------------------------------------------
exports.getPagos = async (req, res, next) => {
  try {
    const { search, method } = req.query;
    const where = {};
    const clientWhere = {};

    if (method && method !== 'all') {
      where.method = method === 'transfer' ? 'Transferencia' : method === 'cash' ? 'Efectivo' : 'Zelle';
    }

    if (search) {
      where[Op.or] = [
        { id: { [Op.like]: `%${search}%` } },
        { '$cliente.name$': { [Op.like]: `%${search}%` } }
      ];
    }

    const pagos = await Pago.findAll({
      where,
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'name', 'email'],
      }],
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
    });

    // Format for frontend response
    const formatted = pagos.map(p => ({
      id: p.id,
      client: p.cliente ? p.cliente.name : 'Cliente Eliminado',
      plan: p.plan,
      amount: `$${parseFloat(p.amount).toFixed(2)}`,
      date: p.date,
      method: p.method,
      status: p.status,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

exports.createPago = async (req, res, next) => {
  try {
    const { clienteId, plan, amount, method, status } = req.body;

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente no encontrado.' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    
    // Generate clean unique TRX ID
    let trxId = generateTransactionId();
    let existingTrx = await Pago.findByPk(trxId);
    while (existingTrx) {
      trxId = generateTransactionId();
      existingTrx = await Pago.findByPk(trxId);
    }

    const newPago = await Pago.create({
      id: trxId,
      clienteId,
      plan: plan || cliente.plan,
      amount: amount || (plan === 'Max Performance' ? 75.00 : plan === 'Básico' ? 25.00 : 45.00),
      date: todayStr,
      method,
      status: status || 'Pendiente',
    });

    if (newPago.status === 'Completado') {
      await cliente.update({ lastPayment: todayStr, status: 'Activo' });
    }

    res.status(201).json({ success: true, data: newPago });
  } catch (error) {
    next(error);
  }
};

exports.approvePago = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) {
      return res.status(404).json({ success: false, message: 'Pago no encontrado.' });
    }

    await pago.update({ status: 'Completado' });

    // Update associated client status and lastPayment
    const cliente = await Cliente.findByPk(pago.clienteId);
    if (cliente) {
      await cliente.update({
        lastPayment: pago.date,
        status: 'Activo',
      });
    }

    res.json({ success: true, data: pago });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentStats = async (req, res, next) => {
  try {
    // Total income completed
    const completedPayments = await Pago.findAll({ where: { status: 'Completado' } });
    const totalIncome = completedPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    
    // Pending payments count
    const pendingCount = await Pago.count({ where: { status: 'Pendiente' } });
    
    // Total transactions
    const totalTransactions = await Pago.count();

    res.json({
      success: true,
      data: {
        monthlyIncome: `$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        pendingPayments: pendingCount,
        totalTransactions: totalTransactions,
      }
    });
  } catch (error) {
    next(error);
  }
};


// -------------------------------------------------------------
// HORARIOS CONTROLLER
// -------------------------------------------------------------
exports.getHorarios = async (req, res, next) => {
  try {
    const { day } = req.query;
    const where = {};

    if (day && day !== 'all') {
      where.day = day;
    }

    const classes = await Clase.findAll({
      where,
      order: [['time', 'ASC']],
    });

    res.json({ success: true, data: classes });
  } catch (error) {
    next(error);
  }
};

exports.createHorario = async (req, res, next) => {
  try {
    const { name, time, day, coach, capacity } = req.body;
    
    const newClass = await Clase.create({
      name,
      time,
      day: day || 'Lunes a Viernes',
      coach,
      capacity: parseInt(capacity, 10) || 15,
      enrolled: 0,
    });

    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    next(error);
  }
};

exports.updateHorario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, time, day, coach, capacity, enrolled } = req.body;

    const shift = await Clase.findByPk(id);
    if (!shift) {
      return res.status(404).json({ success: false, message: 'Horario no encontrado.' });
    }

    await shift.update({ name, time, day, coach, capacity, enrolled });
    res.json({ success: true, data: shift });
  } catch (error) {
    next(error);
  }
};

exports.deleteHorario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shift = await Clase.findByPk(id);
    if (!shift) {
      return res.status(404).json({ success: false, message: 'Horario no encontrado.' });
    }

    await shift.destroy();
    res.json({ success: true, message: 'Horario eliminado con éxito.' });
  } catch (error) {
    next(error);
  }
};


// -------------------------------------------------------------
// EVALUACIONES / PROCESOS CONTROLLER
// -------------------------------------------------------------
exports.getEvaluacionesByCliente = async (req, res, next) => {
  try {
    const { clienteId } = req.params;
    
    const evaluations = await Evaluacion.findAll({
      where: { clienteId },
      order: [['createdAt', 'DESC']],
    });

    res.json({ success: true, data: evaluations });
  } catch (error) {
    next(error);
  }
};

exports.createEvaluacion = async (req, res, next) => {
  try {
    const { clienteId, tipo, peso, grasa, musculo, nota } = req.body;

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente no encontrado.' });
    }

    // Dynamic IMC calculation (assuming average height of 1.75m for mock realistic data)
    const height = 1.75;
    const imc = parseFloat(peso) / (height * height);

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const today = new Date();
    const dateStr = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    const newEval = await Evaluacion.create({
      clienteId,
      fecha: dateStr,
      tipo: tipo || 'Bimensual',
      peso: parseFloat(peso),
      imc: parseFloat(imc.toFixed(2)),
      grasa: parseInt(grasa, 10),
      musculo: parseInt(musculo, 10),
      nota,
    });

    res.status(201).json({ success: true, data: newEval });
  } catch (error) {
    next(error);
  }
};


// -------------------------------------------------------------
// DASHBOARD CONTROLLER
// -------------------------------------------------------------
exports.getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total Clientes
    const totalClients = await Cliente.count();

    // 2. Active Members
    const activeMembers = await Cliente.count({ where: { status: 'Activo' } });

    // 3. Monthly completed payments
    const completedPayments = await Pago.findAll({ where: { status: 'Completado' } });
    const totalIncome = completedPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    // 4. Average occupancy rate
    const classes = await Clase.findAll();
    let occupancyRate = '0%';
    if (classes.length > 0) {
      const sumEnrolled = classes.reduce((sum, c) => sum + c.enrolled, 0);
      const sumCapacity = classes.reduce((sum, c) => sum + c.capacity, 0);
      occupancyRate = `${Math.round((sumEnrolled / sumCapacity) * 100)}%`;
    }

    // 5. Recent Payments (last 4)
    const recent = await Pago.findAll({
      limit: 4,
      include: [{ model: Cliente, as: 'cliente', attributes: ['name'] }],
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
    });

    const recentPaymentsFormatted = recent.map(p => ({
      cliente: p.cliente ? p.cliente.name : 'Cliente Eliminado',
      plan: p.plan,
      monto: `$${parseFloat(p.amount).toFixed(2)}`,
      fecha: p.date,
      estado: p.status,
    }));

    // 6. Stats cards array
    const stats = [
      { label: 'Clientes Totales', value: totalClients.toString(), change: `+${totalClients} registrados`, icon: '👥' },
      { label: 'Miembros Activos', value: activeMembers.toString(), change: `${Math.round((activeMembers / (totalClients || 1)) * 100)}% de retención`, icon: '⚡' },
      { label: 'Ingresos Mensuales', value: `$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, change: '+18% vs mes anterior', icon: '💰' },
      { label: 'Ocupación de Clases', value: occupancyRate, change: 'Pico a las 6:30 PM', icon: '📊' },
    ];

    res.json({
      success: true,
      data: {
        stats,
        recentPayments: recentPaymentsFormatted,
      }
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// RESERVAS & ASISTENCIA CONTROLLER
// -------------------------------------------------------------
exports.getReservas = async (req, res, next) => {
  try {
    const { fecha, claseId, status, search } = req.query;
    const where = {};

    if (fecha && fecha !== 'all') {
      where.fecha = fecha;
    }
    if (claseId && claseId !== 'all') {
      where.claseId = claseId;
    }
    if (status && status !== 'all') {
      where.status = status;
    }

    const reservas = await Reserva.findAll({
      where,
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: Cliente,
              as: 'cliente',
              attributes: ['phone', 'plan', 'status'],
            },
          ],
        },
        {
          model: Clase,
          as: 'clase',
          attributes: ['id', 'name', 'time', 'day', 'coach', 'capacity', 'enrolled'],
        },
      ],
      order: [
        ['fecha', 'DESC'],
        ['claseHora', 'ASC'],
      ],
    });

    let result = reservas.map((r) => {
      const json = r.toJSON();
      return {
        ...json,
        nombreAtleta: json.usuario?.name || 'Atleta',
        emailAtleta: json.usuario?.email || '',
        telefonoAtleta: json.usuario?.cliente?.phone || '',
        planAtleta: json.usuario?.cliente?.plan || 'Membresía',
      };
    });

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.nombreAtleta.toLowerCase().includes(q) ||
          r.emailAtleta.toLowerCase().includes(q) ||
          r.claseNombre.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateAsistencia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'confirmada' | 'asistio' | 'cancelada'

    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada.' });
    }

    const prevStatus = reserva.status;
    await reserva.update({ status });

    // Ajustar aforo en la clase si cambia a cancelada o vuelve de cancelada
    if (status === 'cancelada' && prevStatus !== 'cancelada') {
      const clase = await Clase.findByPk(reserva.claseId);
      if (clase && clase.enrolled > 0) {
        await clase.decrement('enrolled', { by: 1 });
      }
    } else if (prevStatus === 'cancelada' && status !== 'cancelada') {
      const clase = await Clase.findByPk(reserva.claseId);
      if (clase) {
        await clase.increment('enrolled', { by: 1 });
      }
    }

    res.json({
      success: true,
      data: reserva,
      message: `Asistencia actualizada a "${status}".`,
    });
  } catch (error) {
    next(error);
  }
};

exports.createReservaAdmin = async (req, res, next) => {
  try {
    const { clienteId, claseId, fecha } = req.body;

    const clase = await Clase.findByPk(claseId);
    if (!clase) {
      return res.status(404).json({ success: false, message: 'Clase no encontrada.' });
    }

    // Buscar o generar usuario/cliente
    let targetCliente = null;
    let usuarioId = 1;

    if (clienteId) {
      targetCliente = await Cliente.findByPk(clienteId, {
        include: [{ model: Usuario, as: 'usuario' }],
      });
      if (targetCliente && targetCliente.usuario) {
        usuarioId = targetCliente.usuario.id;
      }
    }

    const nuevaReserva = await Reserva.create({
      usuarioId,
      clienteId: targetCliente ? targetCliente.id : null,
      claseId: clase.id,
      fecha: fecha || new Date().toISOString().split('T')[0],
      claseNombre: clase.name,
      claseHora: clase.time,
      coach: clase.coach,
      status: 'confirmada',
    });

    if (clase.enrolled < clase.capacity) {
      await clase.increment('enrolled', { by: 1 });
    }

    res.status(201).json({
      success: true,
      data: nuevaReserva,
      message: 'Atleta agregado a la clase con éxito.',
    });
  } catch (error) {
    next(error);
  }
};

