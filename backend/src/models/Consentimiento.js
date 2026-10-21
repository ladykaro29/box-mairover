const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const Consentimiento = sequelize.define('Consentimiento', {
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
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'cliente_id',
  },
  tipo: {
    type: DataTypes.ENUM(
      'politica_privacidad',
      'datos_sensibles_salud',
      'fotografias_corporales',
      'publicidad_rrss_opcional'
    ),
    allowNull: false,
  },
  versionTexto: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'v1.0',
    field: 'version_texto',
  },
  aceptado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  textoAceptado: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'texto_aceptado',
  },
  fechaAceptacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'fecha_aceptacion',
  },
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
  tableName: 'consentimientos',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

module.exports = Consentimiento;
