const { DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const FormularioVersion = sequelize.define('FormularioVersion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'plan_id',
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  configuracionSecciones: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  fechaPublicacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'fecha_publicacion',
  },
}, {
  tableName: 'formularios_versiones',
  timestamps: true,
  underscored: true,
  paranoid: true,
});

module.exports = FormularioVersion;
