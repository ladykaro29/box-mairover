const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const Plan = sequelize.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  subtitulo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  moneda: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'USD',
  },
  vigencia: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: '5 semanas',
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  caracteristicas: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  entregaDiasHabiles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 8,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  badge: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'planes',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

module.exports = Plan;
