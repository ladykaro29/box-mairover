const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const EvaluacionOnline = sequelize.define('EvaluacionOnline', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigoReferencia: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
    field: 'codigo_referencia',
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'cliente_id',
  },
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'plan_id',
  },
  formularioVersionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'formulario_version_id',
  },
  estado: {
    type: DataTypes.ENUM(
      'Nueva',
      'Pendiente de revisión',
      'En revisión',
      'Información adicional solicitada',
      'En preparación',
      'Completada',
      'Archivada'
    ),
    allowNull: false,
    defaultValue: 'Nueva',
  },
  // Secciones estructuradas
  datosPersonales: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'datos_personales',
  },
  objetivos: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'objetivos',
  },
  experienciaRutina: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'experiencia_rutina',
  },
  entrenamiento: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'entrenamiento',
  },
  alimentacion: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'alimentacion',
  },
  valoracionInicial: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'valoracion_inicial',
  },
  // Gestión y notas internas del panel (no visibles para el cliente)
  notasInternas: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'notas_internas',
  },
  responsableId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'responsable_id',
  },
  fechaRevision: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'fecha_revision',
  },
  // Metadatos de seguridad y prevención de abuso (sin almacenar IP directa)
  ipHash: {
    type: DataTypes.STRING(64),
    allowNull: true,
    field: 'ip_hash',
  },
  userAgent: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'user_agent',
  },
}, {
  tableName: 'evaluaciones_online',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

module.exports = EvaluacionOnline;
