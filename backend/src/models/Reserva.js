const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'usuario_id',
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'cliente_id',
  },
  claseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'clase_id',
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false, // Formato YYYY-MM-DD
  },
  claseNombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  claseHora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coach: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('confirmada', 'cancelada', 'asistio'),
    allowNull: false,
    defaultValue: 'confirmada',
  },
}, {
  tableName: 'reservas',
  paranoid: true, // Soft delete
});

module.exports = Reserva;
