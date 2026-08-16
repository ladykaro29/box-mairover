const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const Evaluacion = sequelize.define('Evaluacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cliente_id',
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('Inicial', 'Bimensual', 'Anual'),
    allowNull: false,
    defaultValue: 'Bimensual',
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  imc: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  grasa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  musculo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nota: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'evaluaciones',
  paranoid: true, // Soft delete
});

module.exports = Evaluacion;
