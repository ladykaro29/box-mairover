const net = require('net');
const path = require('path');
const { getSequelizeInstance } = require('./config');

// Helper to check if MySQL port is open
function isMySQLAlive(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1500); // 1.5 seconds timeout
    
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.connect(port, host);
  });
}

async function initializeDatabase() {
  const dbHost = process.env.DB_HOST || '127.0.0.1';
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
  
  console.log(`🔍 Verificando estado de MySQL en ${dbHost}:${dbPort}...`);
  
  const mysqlAlive = await isMySQLAlive(dbHost, dbPort);
  
  if (!mysqlAlive) {
    console.log(`⚠️ MySQL no está disponible en ${dbHost}:${dbPort}. Activando fallback de SQLite...`);
    process.env.USE_SQLITE = 'true';
  } else {
    console.log(`✅ MySQL detectado de forma activa.`);
  }

  // Import models after the dialect selection is set in process.env
  const sequelize = getSequelizeInstance();
  const Cliente = require('../models/Cliente');
  const Pago = require('../models/Pago');
  const Clase = require('../models/Clase');
  const Evaluacion = require('../models/Evaluacion');
  const Usuario = require('../models/Usuario');

  // Define Associations
  Cliente.hasMany(Pago, { foreignKey: 'cliente_id', as: 'pagos', onDelete: 'CASCADE' });
  Pago.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

  Cliente.hasMany(Evaluacion, { foreignKey: 'cliente_id', as: 'evaluaciones', onDelete: 'CASCADE' });
  Evaluacion.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

  // Cuenta de acceso (login) enlazada a la ficha de cliente del box
  Cliente.hasOne(Usuario, { foreignKey: 'clienteId', as: 'usuario' });
  Usuario.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

  // Sync Database
  console.log('🔄 Sincronizando tablas de la base de datos...');
  await sequelize.sync({ force: false });
  console.log('✅ Base de datos sincronizada con éxito.');

  // Seed default data if database is empty
  await seedDefaultData(Cliente, Pago, Clase, Evaluacion);

  // Las cuentas de acceso se siembran siempre que falten (independiente del resto)
  await seedDefaultUsers(Cliente, Usuario);
}

// Crea la cuenta de la coach (admin) y las cuentas de los clientes sembrados.
async function seedDefaultUsers(Cliente, Usuario) {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@mairoverfit.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Mairover2026!';

  const existingAdmin = await Usuario.findOne({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await Usuario.create({
      name: process.env.ADMIN_NAME || 'Mauroly Mercado',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`🔑 Usuario administrador creado: ${adminEmail}`);
  }

  // Cuenta demo para cada cliente existente que aún no tenga acceso
  const demoPassword = process.env.SEED_CLIENT_PASSWORD || 'Cliente2026!';
  const clientes = await Cliente.findAll();

  for (const cliente of clientes) {
    const yaTieneCuenta = await Usuario.findOne({ where: { email: cliente.email } });
    if (yaTieneCuenta) continue;

    await Usuario.create({
      name: cliente.name,
      email: cliente.email,
      password: demoPassword,
      role: 'cliente',
      clienteId: cliente.id,
    });
  }
}

async function seedDefaultData(Cliente, Pago, Clase, Evaluacion) {
  const clientCount = await Cliente.count();
  if (clientCount > 0) {
    console.log('📊 La base de datos ya contiene registros. Saltando sembrado.');
    return;
  }

  console.log('🌱 Sembrando datos premium iniciales...');

  // Create Clientes
  const c1 = await Cliente.create({
    name: 'María García',
    email: 'maria@example.com',
    phone: '+58 414-1234567',
    plan: 'Clase Regular',
    status: 'Activo',
    lastPayment: '2026-05-15',
  });

  const c2 = await Cliente.create({
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+58 424-9876543',
    plan: 'Max Performance',
    status: 'Inactivo',
    lastPayment: '2026-04-01',
  });

  const c3 = await Cliente.create({
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    phone: '+58 412-5555555',
    plan: 'Básico',
    status: 'Activo',
    lastPayment: '2026-05-20',
  });

  const c4 = await Cliente.create({
    name: 'Ana Martínez',
    email: 'ana@example.com',
    phone: '+58 414-7778899',
    plan: 'Clase Regular',
    status: 'Activo',
    lastPayment: '2026-05-10',
  });

  // Create Pagos
  await Pago.bulkCreate([
    { id: 'TRX-001', clienteId: c1.id, plan: 'Clase Regular', amount: 45.00, date: '2026-05-15', method: 'Transferencia', status: 'Completado' },
    { id: 'TRX-002', clienteId: c3.id, plan: 'Básico', amount: 25.00, date: '2026-05-20', method: 'Efectivo', status: 'Pendiente' },
    { id: 'TRX-003', clienteId: c4.id, plan: 'Clase Regular', amount: 45.00, date: '2026-05-10', method: 'Zelle', status: 'Completado' },
    { id: 'TRX-004', clienteId: c2.id, plan: 'Max Performance', amount: 75.00, date: '2026-04-01', method: 'Zelle', status: 'Completado' },
  ]);

  // Create Clases / Horarios
  await Clase.bulkCreate([
    { name: 'CrossTraining Matutino', time: '06:00 AM - 07:00 AM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 15, enrolled: 12 },
    { name: 'CrossTraining Media Mañana', time: '08:00 AM - 09:00 AM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 15, enrolled: 8 },
    { name: 'CrossTraining Tarde', time: '05:00 PM - 06:00 PM', day: 'Lunes a Viernes', coach: 'Invitado', capacity: 20, enrolled: 20 },
    { name: 'CrossTraining Noche', time: '06:30 PM - 07:30 PM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 20, enrolled: 18 },
    { name: 'Especial Fin de Semana', time: '09:00 AM - 11:00 AM', day: 'Sábados', coach: 'Mairover', capacity: 30, enrolled: 25 },
  ]);

  // Create Evaluaciones (Físicas/Procesos)
  // María García (id: c1.id) Progress
  await Evaluacion.bulkCreate([
    { clienteId: c1.id, fecha: '15 Feb 2026', tipo: 'Inicial', peso: 82.00, imc: 26.00, grasa: 25, musculo: 35, nota: 'Comienzo del plan de déficit calórico.' },
    { clienteId: c1.id, fecha: '15 Abr 2026', tipo: 'Bimensual', peso: 78.00, imc: 25.00, grasa: 22, musculo: 36, nota: 'Mejora en resistencia aeróbica y fuerza.' },
    { clienteId: c1.id, fecha: '15 May 2026', tipo: 'Bimensual', peso: 75.50, imc: 24.20, grasa: 20, musculo: 37, nota: 'Adaptación completa a la rutina. Excelente progreso.' },
  ]);

  // Carlos Rodríguez (id: c3.id) Progress
  await Evaluacion.bulkCreate([
    { clienteId: c3.id, fecha: '10 Ene 2026', tipo: 'Inicial', peso: 90.00, imc: 29.10, grasa: 28, musculo: 32, nota: 'Meta: Recomposición corporal y acondicionamiento inicial.' },
    { clienteId: c3.id, fecha: '10 Mar 2026', tipo: 'Bimensual', peso: 86.50, imc: 27.80, grasa: 24, musculo: 34, nota: 'Muy buen avance. Se incrementa intensidad en entrenamientos.' },
    { clienteId: c3.id, fecha: '10 May 2026', tipo: 'Bimensual', peso: 84.00, imc: 27.00, grasa: 21, musculo: 35, nota: 'Excelente reducción de grasa y aumento de tono muscular.' },
  ]);

  console.log('🌲 Sembrado de base de datos finalizado con éxito.');
}

module.exports = {
  initializeDatabase,
};
