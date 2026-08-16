const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { getSequelizeInstance } = require('../database/config');

const sequelize = getSequelizeInstance();

const SALT_ROUNDS = 10;

const Usuario = sequelize.define('Usuario', {
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
    set(value) {
      // Normalizar siempre el correo para evitar duplicados por mayúsculas
      this.setDataValue('email', String(value || '').trim().toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'cliente'),
    allowNull: false,
    defaultValue: 'cliente',
  },
  status: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Activo',
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Enlace opcional al registro de cliente del box (membresía, pagos, evaluaciones)
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'usuarios',
  paranoid: true, // Soft delete
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    // Necesario para poder comparar la contraseña en el login
    withPassword: { attributes: {} },
  },
  hooks: {
    beforeSave: async (usuario) => {
      if (usuario.changed('password')) {
        usuario.password = await bcrypt.hash(usuario.password, SALT_ROUNDS);
      }
    },
  },
});

// Comparación segura de contraseña en texto plano contra el hash almacenado
Usuario.prototype.verifyPassword = function verifyPassword(plainPassword) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(plainPassword, this.password);
};

// Representación pública (nunca expone el hash)
Usuario.prototype.toPublicJSON = function toPublicJSON() {
  const { id, name, email, role, status, clienteId, lastLogin } = this;
  return { id, name, email, role, status, clienteId, lastLogin };
};

module.exports = Usuario;
