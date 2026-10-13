const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const Contacto = sequelize.define('Contacto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servicio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  objetivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'contactado', 'archivado'),
    allowNull: false,
    defaultValue: 'pendiente',
  },
}, {
  tableName: 'contactos',
  paranoid: true, // Soft delete
});

module.exports = Contacto;
