const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const ArchivoEvaluacion = sequelize.define('ArchivoEvaluacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  evaluacionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'evaluacion_id',
  },
  categoria: {
    type: DataTypes.ENUM(
      'foto_frente',
      'foto_perfil',
      'foto_espalda',
      'foto_extra',
      'documento'
    ),
    allowNull: false,
    defaultValue: 'foto_frente',
  },
  nombreOriginal: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'nombre_original',
  },
  nombreAlmacenado: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'nombre_almacenado',
  },
  rutaPrivada: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'ruta_privada',
  },
  mimeType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'mime_type',
  },
  sizeBytes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'size_bytes',
  },
  checksumSha256: {
    type: DataTypes.STRING(64),
    allowNull: true,
    field: 'checksum_sha256',
  },
  ancho: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  alto: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'archivos_evaluacion',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

module.exports = ArchivoEvaluacion;
