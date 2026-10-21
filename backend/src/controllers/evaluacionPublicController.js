const Joi = require('joi');
const Plan = require('../models/Plan');
const FormularioVersion = require('../models/FormularioVersion');
const EvaluacionOnline = require('../models/EvaluacionOnline');
const ArchivoEvaluacion = require('../models/ArchivoEvaluacion');
const Consentimiento = require('../models/Consentimiento');
const HistorialAuditoria = require('../models/HistorialAuditoria');
const Cliente = require('../models/Cliente');
const {
  hashIp,
  generateReferenceCode,
  processAndSaveSecureImage,
} = require('../utils/fileSecurity');

// Obtener todos los planes online activos con sus tarifas oficiales
exports.getPlanesPublicos = async (req, res, next) => {
  try {
    const planes = await Plan.findAll({
      where: { activo: true },
      order: [['orden', 'ASC']],
      attributes: [
        'id',
        'codigo',
        'nombre',
        'subtitulo',
        'precio',
        'moneda',
        'vigencia',
        'descripcion',
        'caracteristicas',
        'entregaDiasHabiles',
        'badge',
      ],
    });

    res.json({
      success: true,
      data: planes,
    });
  } catch (error) {
    next(error);
  }
};

// Obtener configuración de un plan específico
exports.getPlanDetalle = async (req, res, next) => {
  try {
    const { codigo } = req.params;
    const plan = await Plan.findOne({
      where: { codigo, activo: true },
      include: [
        {
          model: FormularioVersion,
          as: 'versiones',
          where: { activo: true },
          required: false,
          limit: 1,
          order: [['version', 'DESC']],
        },
      ],
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan no encontrado o no disponible actualmente.',
      });
    }

    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// Esquema de validación general con Joi
const evaluacionValidationSchema = Joi.object({
  planCodigo: Joi.string().valid('personalizado', 'nutricional', 'basico').required(),
  datosPersonales: Joi.object({
    nombre: Joi.string().trim().min(2).max(100).required(),
    apellidos: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().email().required(),
    telefono: Joi.string().trim().min(6).max(30).required(),
    whatsapp: Joi.string().trim().min(6).max(30).allow('', null),
    edad: Joi.number().integer().min(14).max(100).required(),
    fechaNacimiento: Joi.string().allow('', null),
    pais: Joi.string().trim().max(100).required(),
    ciudad: Joi.string().trim().max(100).required(),
    zonaHoraria: Joi.string().trim().max(100).allow('', null),
    medioContactoPreferido: Joi.string().valid('WhatsApp', 'Correo', 'Llamada').default('WhatsApp'),
  }).required(),
  objetivos: Joi.object({
    principal: Joi.string().trim().min(2).max(255).required(),
    secundarios: Joi.array().items(Joi.string()).allow(null),
    queEsperaConseguir: Joi.string().trim().max(1000).allow('', null),
    plazoPrioridades: Joi.string().trim().max(255).allow('', null),
    dificultades: Joi.string().trim().max(1000).allow('', null),
    notasObjetivos: Joi.string().trim().max(1000).allow('', null),
  }).required(),
  experienciaRutina: Joi.object({
    experiencia: Joi.string().allow('', null),
    actividadActual: Joi.string().allow('', null),
    diasDisponibles: Joi.number().integer().min(1).max(7).allow(null),
    tiempoPorSesion: Joi.string().allow('', null),
    horariosHabituales: Joi.string().allow('', null),
    lugarEntrenamiento: Joi.string().allow('', null),
    equipamiento: Joi.string().allow('', null),
  }).optional(),
  entrenamiento: Joi.object({
    preferencias: Joi.string().allow('', null),
    ejerciciosActuales: Joi.string().allow('', null),
    limitacionesFuncionales: Joi.string().allow('', null),
    lesionesMolestias: Joi.string().allow('', null),
    notasEntrenamiento: Joi.string().allow('', null),
  }).optional(),
  alimentacion: Joi.object({
    horariosComidas: Joi.string().allow('', null),
    preferenciasAlimentarias: Joi.string().allow('', null),
    alimentosNoConsume: Joi.string().allow('', null),
    alergiasRestricciones: Joi.string().allow('', null),
    organizacionComidas: Joi.string().allow('', null),
    objetivosAlimentacion: Joi.string().allow('', null),
    notasAlimentacion: Joi.string().allow('', null),
  }).optional(),
  valoracionInicial: Joi.object({
    peso: Joi.number().min(0).max(300).allow(null),
    altura: Joi.number().min(0).max(250).allow(null),
    cuello: Joi.number().min(0).max(100).allow(null),
    pecho: Joi.number().min(0).max(200).allow(null),
    cintura: Joi.number().min(0).max(200).allow(null),
    abdomen: Joi.number().min(0).max(200).allow(null),
    cadera: Joi.number().min(0).max(200).allow(null),
    brazo: Joi.number().min(0).max(100).allow(null),
    muslo: Joi.number().min(0).max(150).allow(null),
    pantorrilla: Joi.number().min(0).max(100).allow(null),
    observacionesMedidas: Joi.string().trim().max(1000).allow('', null),
  }).optional(),
  consentimientos: Joi.object({
    privacidad: Joi.boolean().valid(true).required(),
    datosSensibles: Joi.boolean().valid(true).required(),
    fotosCorporales: Joi.boolean().allow(null, false, true),
    publicidadRrss: Joi.boolean().allow(null, false, true),
  }).required(),
});

// Envío del formulario de evaluación inicial
exports.submitEvaluacion = async (req, res, next) => {
  try {
    // Si viene como multipart/form-data con body.payload en formato JSON
    let bodyData = req.body;
    if (typeof req.body.payload === 'string') {
      try {
        bodyData = JSON.parse(req.body.payload);
      } catch {
        return res.status(400).json({
          success: false,
          message: 'El formato de los datos enviados no es un JSON válido.',
        });
      }
    }

    const { error, value } = evaluacionValidationSchema.validate(bodyData, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(422).json({
        success: false,
        message: 'Por favor revisa los campos requeridos del formulario.',
        errors: details,
      });
    }

    // Regla de mayoría de edad: si es menor de 18 años, no se permite el envío sin tutor legal
    if (value.datosPersonales.edad < 18) {
      return res.status(400).json({
        success: false,
        message:
          'Para personas menores de 18 años se requiere la autorización de un representante legal antes de iniciar la asesoría.',
      });
    }

    // Buscar el plan activo
    const plan = await Plan.findOne({
      where: { codigo: value.planCodigo, activo: true },
      include: [
        {
          model: FormularioVersion,
          as: 'versiones',
          where: { activo: true },
          required: false,
          limit: 1,
          order: [['version', 'DESC']],
        },
      ],
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'El plan seleccionado no existe o no está activo.',
      });
    }

    const versionFormularioId = plan.versiones?.[0]?.id || null;

    // Normalizar cliente: buscar o crear cliente sin duplicar
    const emailNorm = value.datosPersonales.email.trim().toLowerCase();
    const nombreCompleto = `${value.datosPersonales.nombre} ${value.datosPersonales.apellidos}`.trim();

    let cliente = await Cliente.findOne({ where: { email: emailNorm } });
    if (!cliente) {
      cliente = await Cliente.create({
        name: nombreCompleto,
        email: emailNorm,
        phone: value.datosPersonales.whatsapp || value.datosPersonales.telefono,
        plan: plan.nombre,
        status: 'Activo',
      });
    }

    // Hash de IP para prevenir abusos
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress;
    const ipH = hashIp(clientIp);
    const userAgent = (req.headers['user-agent'] || '').slice(0, 250);

    // Generar código de referencia único no predecible (ej: MF-EV-9B7C2A)
    const codigoReferencia = generateReferenceCode();

    // Crear registro principal de Evaluación Online
    const nuevaEvaluacion = await EvaluacionOnline.create({
      codigoReferencia,
      clienteId: cliente.id,
      planId: plan.id,
      formularioVersionId: versionFormularioId,
      estado: 'Nueva',
      datosPersonales: value.datosPersonales,
      objetivos: value.objetivos,
      experienciaRutina: value.experienciaRutina || {},
      entrenamiento: value.entrenamiento || {},
      alimentacion: value.alimentacion || {},
      valoracionInicial: value.valoracionInicial || {},
      ipHash: ipH,
      userAgent,
    });

    // Guardar Consentimientos explícitos
    const consentsToCreate = [
      {
        evaluacionId: nuevaEvaluacion.id,
        clienteId: cliente.id,
        tipo: 'politica_privacidad',
        versionTexto: 'v1.0',
        aceptado: true,
        textoAceptado:
          'Acepto la Política de Privacidad de MairoverFit y el tratamiento de mis datos personales para la prestación del servicio.',
        ipHash: ipH,
        userAgent,
      },
      {
        evaluacionId: nuevaEvaluacion.id,
        clienteId: cliente.id,
        tipo: 'datos_sensibles_salud',
        versionTexto: 'v1.0',
        aceptado: true,
        textoAceptado:
          'Doy mi consentimiento expreso para el tratamiento de datos de salud, lesiones y hábitos con fines estrictos de adaptación del entrenamiento y nutrición.',
        ipHash: ipH,
        userAgent,
      },
    ];

    if (value.consentimientos.fotosCorporales) {
      consentsToCreate.push({
        evaluacionId: nuevaEvaluacion.id,
        clienteId: cliente.id,
        tipo: 'fotografias_corporales',
        versionTexto: 'v1.0',
        aceptado: true,
        textoAceptado:
          'Autorizo la carga de fotografías corporales únicamente para la valoración y seguimiento técnico confidencial. Entiendo que NUNCA serán publicadas en redes sociales sin mi autorización expresa e independiente.',
        ipHash: ipH,
        userAgent,
      });
    }

    if (value.consentimientos.publicidadRrss) {
      consentsToCreate.push({
        evaluacionId: nuevaEvaluacion.id,
        clienteId: cliente.id,
        tipo: 'publicidad_rrss_opcional',
        versionTexto: 'v1.0',
        aceptado: true,
        textoAceptado: 'Autorizo opcionalmente el uso de fotos de evolución antes/después en redes sociales de MairoverFit.',
        ipHash: ipH,
        userAgent,
      });
    }

    await Consentimiento.bulkCreate(consentsToCreate);

    // Procesar fotografías corporales subidas de forma privada
    const uploadedFiles = req.files || [];
    const archivosGuardados = [];

    for (const file of uploadedFiles) {
      try {
        let categoria = 'foto_extra';
        if (file.fieldname === 'fotoFrente' || file.originalname.includes('frente')) {
          categoria = 'foto_frente';
        } else if (file.fieldname === 'fotoPerfil' || file.originalname.includes('perfil')) {
          categoria = 'foto_perfil';
        } else if (file.fieldname === 'fotoEspalda' || file.originalname.includes('espalda')) {
          categoria = 'foto_espalda';
        }

        const procesado = await processAndSaveSecureImage(file.buffer, file.originalname, categoria);

        const registroArchivo = await ArchivoEvaluacion.create({
          evaluacionId: nuevaEvaluacion.id,
          categoria: procesado.categoria,
          nombreOriginal: procesado.nombreOriginal,
          nombreAlmacenado: procesado.nombreAlmacenado,
          rutaPrivada: procesado.rutaPrivada,
          mimeType: procesado.mimeType,
          sizeBytes: procesado.sizeBytes,
          checksumSha256: procesado.checksumSha256,
          ancho: procesado.ancho,
          alto: procesado.alto,
        });

        archivosGuardados.push({
          id: registroArchivo.id,
          categoria: registroArchivo.categoria,
        });
      } catch (fileErr) {
        console.warn('Error al procesar archivo fotográfico:', fileErr.message);
      }
    }

    // Registrar en auditoría la creación de la evaluación
    await HistorialAuditoria.create({
      evaluacionId: nuevaEvaluacion.id,
      accion: 'CREAR_EVALUACION',
      detalles: {
        plan: plan.codigo,
        clienteNombre: nombreCompleto,
        archivosSubidos: archivosGuardados.length,
      },
      ipHash: ipH,
    });

    // Respuesta limpia: jamás exponer respuestas clínicas ni URLs internas en la confirmación
    res.status(201).json({
      success: true,
      data: {
        codigoReferencia: nuevaEvaluacion.codigoReferencia,
        planNombre: plan.nombre,
        clienteNombre: value.datosPersonales.nombre,
        diasHabilesEntrega: plan.entregaDiasHabiles || 8,
        fechaEnvio: nuevaEvaluacion.createdAt,
        mensaje:
          '¡Formulario recibido con éxito! MairoverFit revisará la información enviada y continuará con los siguientes pasos de tu plan.',
      },
    });
  } catch (error) {
    next(error);
  }
};

// Consultar estado público seguro de confirmación
exports.getConfirmacion = async (req, res, next) => {
  try {
    const { codigo } = req.params;
    const evaluacion = await EvaluacionOnline.findOne({
      where: { codigoReferencia: codigo },
      include: [{ model: Plan, as: 'plan', attributes: ['nombre', 'precio', 'moneda', 'vigencia', 'entregaDiasHabiles'] }],
      attributes: ['codigoReferencia', 'estado', 'createdAt', 'datosPersonales'],
    });

    if (!evaluacion) {
      return res.status(404).json({
        success: false,
        message: 'Código de evaluación no encontrado.',
      });
    }

    // Devolver únicamente información no sensible
    res.json({
      success: true,
      data: {
        codigoReferencia: evaluacion.codigoReferencia,
        planNombre: evaluacion.plan?.nombre,
        precio: evaluacion.plan?.precio,
        moneda: evaluacion.plan?.moneda,
        vigencia: evaluacion.plan?.vigencia,
        diasHabilesEntrega: evaluacion.plan?.entregaDiasHabiles || 8,
        estado: evaluacion.estado,
        clienteNombre: evaluacion.datosPersonales?.nombre,
        fechaEnvio: evaluacion.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
