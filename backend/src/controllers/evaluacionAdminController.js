const fs = require('fs');
const { Op } = require('sequelize');
const EvaluacionOnline = require('../models/EvaluacionOnline');
const Plan = require('../models/Plan');
const Cliente = require('../models/Cliente');
const ArchivoEvaluacion = require('../models/ArchivoEvaluacion');
const Consentimiento = require('../models/Consentimiento');
const HistorialAuditoria = require('../models/HistorialAuditoria');
const Usuario = require('../models/Usuario');
const { getSecureFilePath, deleteSecureFile, hashIp } = require('../utils/fileSecurity');

// -------------------------------------------------------------
// DASHBOARD STATS
// -------------------------------------------------------------
exports.getDashboardStats = async (req, res, next) => {
  try {
    const total = await EvaluacionOnline.count();
    const nuevas = await EvaluacionOnline.count({ where: { estado: 'Nueva' } });
    const pendientes = await EvaluacionOnline.count({
      where: { estado: { [Op.in]: ['Pendiente de revisión', 'Nueva'] } },
    });
    const enProceso = await EvaluacionOnline.count({
      where: { estado: { [Op.in]: ['En revisión', 'Información adicional solicitada', 'En preparación'] } },
    });
    const completadas = await EvaluacionOnline.count({
      where: { estado: 'Completada' },
    });

    // Conteo por plan
    const planes = await Plan.findAll({
      attributes: ['id', 'codigo', 'nombre'],
    });

    const porPlan = await Promise.all(
      planes.map(async (p) => {
        const count = await EvaluacionOnline.count({ where: { planId: p.id } });
        return {
          id: p.id,
          codigo: p.codigo,
          nombre: p.nombre,
          total: count,
        };
      })
    );

    res.json({
      success: true,
      data: {
        total,
        nuevas,
        pendientes,
        enProceso,
        completadas,
        porPlan,
      },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// LISTADO DE EVALUACIONES CON FILTROS Y PAGINACIÓN
// -------------------------------------------------------------
exports.getEvaluaciones = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 15,
      search = '',
      plan = 'all',
      estado = 'all',
      sortBy = 'createdAt',
      order = 'DESC',
    } = req.query;

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const where = {};

    if (estado && estado !== 'all') {
      where.estado = estado;
    }

    if (plan && plan !== 'all') {
      const planRecord = await Plan.findOne({ where: { codigo: plan } });
      if (planRecord) {
        where.planId = planRecord.id;
      }
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      where[Op.or] = [
        { codigoReferencia: { [Op.like]: term } },
        { '$cliente.name$': { [Op.like]: term } },
        { '$cliente.email$': { [Op.like]: term } },
      ];
    }

    const { count, rows } = await EvaluacionOnline.findAndCountAll({
      where,
      include: [
        { model: Plan, as: 'plan', attributes: ['id', 'codigo', 'nombre', 'precio', 'vigencia'] },
        { model: Cliente, as: 'cliente', attributes: ['id', 'name', 'email', 'phone'] },
        { model: Usuario, as: 'responsable', attributes: ['id', 'name', 'email'] },
        { model: ArchivoEvaluacion, as: 'archivos', attributes: ['id', 'categoria'] },
      ],
      order: [[sortBy, order.toUpperCase()]],
      limit: parseInt(limit, 10),
      offset,
      // No incluimos respuestas clínicas completas en el listado para preservar privacidad y rendimiento
      attributes: [
        'id',
        'codigoReferencia',
        'estado',
        'datosPersonales',
        'fechaRevision',
        'createdAt',
        'updatedAt',
      ],
    });

    const items = rows.map((ev) => ({
      id: ev.id,
      codigoReferencia: ev.codigoReferencia,
      estado: ev.estado,
      clienteNombre: ev.cliente?.name || `${ev.datosPersonales?.nombre || ''} ${ev.datosPersonales?.apellidos || ''}`.trim(),
      clienteEmail: ev.cliente?.email || ev.datosPersonales?.email,
      clienteTelefono: ev.cliente?.phone || ev.datosPersonales?.telefono,
      plan: ev.plan?.nombre || 'Plan Online',
      planCodigo: ev.plan?.codigo,
      totalArchivos: ev.archivos?.length || 0,
      responsable: ev.responsable?.name || 'Sin asignar',
      fechaEnvio: ev.createdAt,
      fechaActualizacion: ev.updatedAt,
      fechaRevision: ev.fechaRevision,
    }));

    res.json({
      success: true,
      data: items,
      meta: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// DETALLE COMPLETO DE UNA EVALUACIÓN
// -------------------------------------------------------------
exports.getEvaluacionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const evaluacion = await EvaluacionOnline.findByPk(id, {
      include: [
        { model: Plan, as: 'plan' },
        { model: Cliente, as: 'cliente' },
        { model: Usuario, as: 'responsable', attributes: ['id', 'name', 'email'] },
        {
          model: ArchivoEvaluacion,
          as: 'archivos',
          attributes: ['id', 'categoria', 'nombreOriginal', 'mimeType', 'sizeBytes', 'ancho', 'alto', 'createdAt'],
        },
        {
          model: Consentimiento,
          as: 'consentimientos',
          attributes: ['id', 'tipo', 'aceptado', 'textoAceptado', 'versionTexto', 'fechaAceptacion'],
        },
        {
          model: HistorialAuditoria,
          as: 'auditorias',
          include: [{ model: Usuario, as: 'usuario', attributes: ['name', 'email'] }],
          order: [['createdAt', 'DESC']],
          limit: 30,
        },
      ],
    });

    if (!evaluacion) {
      return res.status(404).json({
        success: false,
        message: 'Evaluación no encontrada.',
      });
    }

    // Registrar en auditoría la consulta del expediente
    await HistorialAuditoria.create({
      usuarioId: req.user?.id,
      evaluacionId: evaluacion.id,
      accion: 'VER_EVALUACION',
      detalles: { consultadoPor: req.user?.email },
      ipHash: hashIp(req.socket?.remoteAddress),
    });

    res.json({
      success: true,
      data: evaluacion,
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// ACTUALIZAR ESTADO Y RESPONSABLE
// -------------------------------------------------------------
exports.updateEstado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado, responsableId } = req.body;

    const evaluacion = await EvaluacionOnline.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ success: false, message: 'Evaluación no encontrada.' });
    }

    const estadoAnterior = evaluacion.estado;
    evaluacion.estado = estado || evaluacion.estado;
    evaluacion.fechaRevision = new Date();

    if (responsableId !== undefined) {
      evaluacion.responsableId = responsableId || null;
    }

    await evaluacion.save();

    // Auditoría
    await HistorialAuditoria.create({
      usuarioId: req.user?.id,
      evaluacionId: evaluacion.id,
      accion: 'CAMBIO_ESTADO',
      detalles: {
        de: estadoAnterior,
        a: evaluacion.estado,
        modificadoPor: req.user?.email,
      },
      ipHash: hashIp(req.socket?.remoteAddress),
    });

    res.json({
      success: true,
      message: 'Estado actualizado correctamente.',
      data: {
        estado: evaluacion.estado,
        fechaRevision: evaluacion.fechaRevision,
        responsableId: evaluacion.responsableId,
      },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// ACTUALIZAR NOTAS INTERNAS
// -------------------------------------------------------------
exports.updateNotasInternas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notasInternas } = req.body;

    const evaluacion = await EvaluacionOnline.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ success: false, message: 'Evaluación no encontrada.' });
    }

    evaluacion.notasInternas = notasInternas;
    await evaluacion.save();

    await HistorialAuditoria.create({
      usuarioId: req.user?.id,
      evaluacionId: evaluacion.id,
      accion: 'ACTUALIZAR_NOTAS',
      detalles: { actualizadoPor: req.user?.email },
      ipHash: hashIp(req.socket?.remoteAddress),
    });

    res.json({
      success: true,
      message: 'Notas internas guardadas con éxito.',
      data: { notasInternas: evaluacion.notasInternas },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// STREAM DE ARCHIVO PRIVADO (FOTOGRAFÍAS PROTEGIDAS)
// -------------------------------------------------------------
exports.streamArchivoPrivado = async (req, res, next) => {
  try {
    const { fileId } = req.params;

    const archivo = await ArchivoEvaluacion.findByPk(fileId);
    if (!archivo) {
      return res.status(404).json({ success: false, message: 'Archivo no encontrado.' });
    }

    const filePath = getSecureFilePath(archivo.nombreAlmacenado);
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'El archivo físico no existe en el almacenamiento seguro.' });
    }

    // Cabeceras estrictas de protección privada: nunca cachear en proxies públicos
    res.setHeader('Content-Type', archivo.mimeType || 'image/webp');
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Disposition', `inline; filename="${archivo.nombreOriginal || 'foto.webp'}"`);

    // Auditoría de visualización de fotografía privada
    await HistorialAuditoria.create({
      usuarioId: req.user?.id,
      evaluacionId: archivo.evaluacionId,
      accion: 'VER_FOTO',
      detalles: {
        archivoId: archivo.id,
        categoria: archivo.categoria,
        consultadoPor: req.user?.email,
      },
      ipHash: hashIp(req.socket?.remoteAddress),
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// LISTADO CENTRALIZADO DE ARCHIVOS PRIVADOS (/admin/archivos)
// -------------------------------------------------------------
exports.getArchivosList = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, categoria = 'all' } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const where = {};

    if (categoria && categoria !== 'all') {
      where.categoria = categoria;
    }

    const { count, rows } = await ArchivoEvaluacion.findAndCountAll({
      where,
      include: [
        {
          model: EvaluacionOnline,
          as: 'evaluacion',
          attributes: ['id', 'codigoReferencia', 'estado', 'createdAt'],
          include: [{ model: Cliente, as: 'cliente', attributes: ['name', 'email'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit, 10),
      offset,
      attributes: ['id', 'categoria', 'nombreOriginal', 'mimeType', 'sizeBytes', 'ancho', 'alto', 'createdAt'],
    });

    // Calcular estadísticas generales de almacenamiento
    const totalBytes = await ArchivoEvaluacion.sum('size_bytes') || 0;

    res.json({
      success: true,
      data: rows,
      stats: {
        totalArchivos: count,
        totalMegabytes: (totalBytes / (1024 * 1024)).toFixed(2),
      },
      meta: {
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(count / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// GESTIÓN DE PLANES (ACTUALIZAR PRECIOS Y VIGENCIAS)
// -------------------------------------------------------------
exports.getPlanesAdmin = async (req, res, next) => {
  try {
    const planes = await Plan.findAll({ order: [['orden', 'ASC']] });
    res.json({ success: true, data: planes });
  } catch (error) {
    next(error);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { precio, vigencia, entregaDiasHabiles, activo, badge, descripcion } = req.body;

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan no encontrado.' });
    }

    if (precio !== undefined) plan.precio = precio;
    if (vigencia !== undefined) plan.vigencia = vigencia;
    if (entregaDiasHabiles !== undefined) plan.entregaDiasHabiles = entregaDiasHabiles;
    if (activo !== undefined) plan.activo = activo;
    if (badge !== undefined) plan.badge = badge;
    if (descripcion !== undefined) plan.descripcion = descripcion;

    await plan.save();

    await HistorialAuditoria.create({
      usuarioId: req.user?.id,
      accion: 'ACTUALIZAR_PLAN',
      detalles: { planId: plan.id, codigo: plan.codigo, modificadoPor: req.user?.email },
      ipHash: hashIp(req.socket?.remoteAddress),
    });

    res.json({
      success: true,
      message: 'Plan actualizado con éxito.',
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// POLÍTICA DE SUPRESIÓN Y CONSERVACIÓN DE DATOS
// -------------------------------------------------------------
exports.deleteEvaluacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { eliminarArchivosFisicos = true } = req.body;

    const evaluacion = await EvaluacionOnline.findByPk(id, {
      include: [{ model: ArchivoEvaluacion, as: 'archivos' }],
    });

    if (!evaluacion) {
      return res.status(404).json({ success: false, message: 'Evaluación no encontrada.' });
    }

    // Si se solicita eliminación definitiva de archivos físicos por derecho de supresión
    if (eliminarArchivosFisicos && evaluacion.archivos?.length > 0) {
      for (const arch of evaluacion.archivos) {
        await deleteSecureFile(arch.nombreAlmacenado);
        await arch.destroy({ force: true });
      }
    }

    const codigoRef = evaluacion.codigoReferencia;
    await evaluacion.destroy(); // Soft delete o eliminación según paranoid

    await HistorialAuditoria.create({
      usuarioId: req.user?.id,
      accion: 'ELIMINAR_EVALUACION',
      detalles: {
        codigoReferencia: codigoRef,
        archivosEliminados: eliminarArchivosFisicos,
        eliminadoPor: req.user?.email,
      },
      ipHash: hashIp(req.socket?.remoteAddress),
    });

    res.json({
      success: true,
      message: `Evaluación ${codigoRef} eliminada conforme a la política de conservación.`,
    });
  } catch (error) {
    next(error);
  }
};
