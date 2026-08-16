const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plan: {
    type: DataTypes.ENUM('Básico', 'Clase Regular', 'Max Performance'),
    allowNull: false,
    defaultValue: 'Clase Regular',
  },
  status: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Activo',
  },
  lastPayment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'clientes',
  paranoid: true, // Soft delete
});

module.exports = Cliente;
