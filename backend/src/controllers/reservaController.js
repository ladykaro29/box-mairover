const Reserva = require('../models/Reserva');
const Clase = require('../models/Clase');
const Evaluacion = require('../models/Evaluacion');
const Cliente = require('../models/Cliente');

// GET /api/v1/cliente/reservas - Obtiene las reservas del usuario autenticado
exports.getMisReservas = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;

    const reservas = await Reserva.findAll({
      where: {
        usuarioId,
        status: 'confirmada',
      },
      order: [
        ['fecha', 'ASC'],
        ['claseHora', 'ASC'],
      ],
    });

    res.json({
      success: true,
      data: reservas,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/cliente/reservas - Crear nueva reserva para una clase y fecha
exports.crearReserva = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;
    const { claseId, fecha } = req.body;

    if (!claseId || !fecha) {
      return res.status(400).json({
        success: false,
        message: 'Debes especificar la clase y la fecha de reserva.',
      });
    }

    // Validar formato básico YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de fecha inválido. Debe ser YYYY-MM-DD.',
      });
    }

    // Verificar que la fecha no sea anterior a hoy
    const hoyStr = new Date().toISOString().split('T')[0];
    if (fecha < hoyStr) {
      return res.status(400).json({
        success: false,
        message: 'No puedes reservar una clase en una fecha pasada.',
      });
    }

    // Buscar clase
    const clase = await Clase.findByPk(claseId);
    if (!clase) {
      return res.status(404).json({
        success: false,
        message: 'La clase solicitada no existe o ya no está disponible.',
      });
    }

    // Verificar si ya tiene una reserva activa para esa clase y fecha
    const reservaExistente = await Reserva.findOne({
      where: {
        usuarioId,
        claseId: clase.id,
        fecha,
        status: 'confirmada',
      },
    });

    if (reservaExistente) {
      return res.status(400).json({
        success: false,
        message: 'Ya tienes una reserva confirmada para este horario en la fecha seleccionada.',
      });
    }

    // Validar aforo
    if (clase.enrolled >= clase.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Lo sentimos, este turno ya ha alcanzado su aforo máximo.',
      });
    }

    // Crear la reserva
    const nuevaReserva = await Reserva.create({
      usuarioId,
      clienteId: req.user.clienteId || null,
      claseId: clase.id,
      fecha,
      claseNombre: clase.name,
      claseHora: clase.time,
      coach: clase.coach,
      status: 'confirmada',
    });

    // Incrementar aforo inscrito en la clase
    await clase.increment('enrolled', { by: 1 });

    res.status(201).json({
      success: true,
      data: nuevaReserva,
      message: '¡Clase reservada con éxito!',
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/cliente/reservas/:id - Cancelar reserva y liberar cupo
exports.cancelarReserva = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;
    const { id } = req.params;

    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada.',
      });
    }

    // Validar propiedad de la reserva (o admin)
    if (reserva.usuarioId !== usuarioId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes autorización para cancelar esta reserva.',
      });
    }

    if (reserva.status === 'cancelada') {
      return res.status(400).json({
        success: false,
        message: 'Esta reserva ya ha sido cancelada previamente.',
      });
    }

    // Actualizar estado y liberar cupo
    await reserva.update({ status: 'cancelada' });
    await reserva.destroy(); // Soft delete en la base de datos

    const clase = await Clase.findByPk(reserva.claseId);
    if (clase && clase.enrolled > 0) {
      await clase.decrement('enrolled', { by: 1 });
    }

    res.json({
      success: true,
      message: 'Reserva cancelada exitosamente y cupo liberado.',
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/cliente/evaluaciones - Obtiene el historial de composición y progreso del atleta
exports.getMisEvaluaciones = async (req, res, next) => {
  try {
    let clienteId = req.user.clienteId;

    if (!clienteId) {
      // Si la cuenta aún no tiene clienteId explícito, vincular por email
      const cliente = await Cliente.findOne({ where: { email: req.user.email } });
      if (cliente) {
        clienteId = cliente.id;
        await req.user.update({ clienteId: cliente.id });
      }
    }

    if (!clienteId) {
      return res.json({
        success: true,
        data: [],
        message: 'No hay ficha de atleta vinculada a este usuario.',
      });
    }

    const evaluaciones = await Evaluacion.findAll({
      where: { clienteId },
      order: [['createdAt', 'ASC']],
    });

    res.json({
      success: true,
      data: evaluaciones,
    });
  } catch (error) {
    next(error);
  }
};

