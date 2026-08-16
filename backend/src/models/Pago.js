const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const Pago = sequelize.define('Pago', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cliente_id',
  },
  plan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM('Efectivo', 'Transferencia', 'Zelle'),
    allowNull: false,
    defaultValue: 'Transferencia',
  },
  status: {
    type: DataTypes.ENUM('Completado', 'Pendiente'),
    allowNull: false,
    defaultValue: 'Pendiente',
  },
}, {
  tableName: 'pagos',
  paranoid: true, // Soft delete
});

module.exports = Pago;
