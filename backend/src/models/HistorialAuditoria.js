const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const HistorialAuditoria = sequelize.define('HistorialAuditoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'usuario_id',
  },
  evaluacionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'evaluacion_id',
  },
  accion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  detalles: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  ipHash: {
    type: DataTypes.STRING(64),
    allowNull: true,
    field: 'ip_hash',
  },
}, {
  tableName: 'historial_auditoria',
  timestamps: true,
  underscored: true,
  paranoid: false,
});

module.exports = HistorialAuditoria;
