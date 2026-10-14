const { Sequelize } = require('sequelize');
const path = require('path');

// Ensure dotenv is loaded in case config is run standalone (e.g. for migrations)
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

const config = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'mairoverfit',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true, // match the SQL snake_case fields (created_at, updated_at)
    paranoid: true, // enable soft deletes (deleted_at) by default
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
};

// Singleton sequelize instance setup
let sequelize;

function getSequelizeInstance() {
  if (!sequelize) {
    if (process.env.USE_SQLITE === 'true') {
      const sqlitePath = path.resolve(__dirname, './mairoverfit.sqlite');
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: sqlitePath,
        logging: false,
        define: {
          timestamps: true,
          underscored: true,
          paranoid: true,
        }
      });
      console.log(`🔌 Base de datos inicializada con SQLite en: ${sqlitePath}`);
    } else {
      sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
          host: config.host,
          port: config.port,
          dialect: config.dialect,
          logging: config.logging,
          define: config.define,
          pool: config.pool,
        }
      );
      console.log(`🔌 Conectando a MySQL (${config.host}:${config.port}/${config.database})...`);
    }
  }
  return sequelize;
}

module.exports = {
  development: config,
  production: config,
  getSequelizeInstance,
};

