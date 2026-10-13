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
  const Contacto = require('../models/Contacto');
  const Reserva = require('../models/Reserva');

  // Define Associations
  Cliente.hasMany(Pago, { foreignKey: 'cliente_id', as: 'pagos', onDelete: 'CASCADE' });
  Pago.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

  Cliente.hasMany(Evaluacion, { foreignKey: 'cliente_id', as: 'evaluaciones', onDelete: 'CASCADE' });
  Evaluacion.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

  // Cuenta de acceso (login) enlazada a la ficha de cliente del box
  Cliente.hasOne(Usuario, { foreignKey: 'clienteId', as: 'usuario' });
  Usuario.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

  // Reservas de clases enlazadas al usuario y a la clase
  Usuario.hasMany(Reserva, { foreignKey: 'usuario_id', as: 'reservas', onDelete: 'CASCADE' });
  Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

  Clase.hasMany(Reserva, { foreignKey: 'clase_id', as: 'reservas', onDelete: 'CASCADE' });
  Reserva.belongsTo(Clase, { foreignKey: 'clase_id', as: 'clase' });

  // Sync Database
  console.log('🔄 Sincronizando tablas de la base de datos...');
  await sequelize.sync({ force: false });
  console.log('✅ Base de datos sincronizada con éxito.');

  // Seed default data if database is empty
  await seedDefaultData(Cliente, Pago, Clase, Evaluacion, Contacto);

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

async function seedDefaultData(Cliente, Pago, Clase, Evaluacion, Contacto) {
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
    { name: 'CrossFit', time: '06:00 AM - 07:00 AM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 15, enrolled: 12 },
    { name: 'Funcionales', time: '07:00 AM - 08:00 AM', day: 'Lunes, Miércoles y Viernes', coach: 'Carlos', capacity: 15, enrolled: 8 },
    { name: 'CrossFit', time: '07:00 AM - 08:00 AM', day: 'Martes y Jueves', coach: 'Mairover', capacity: 15, enrolled: 14 },
    { name: 'Bienestar Físico', time: '08:00 AM - 09:00 AM', day: 'Lunes, Miércoles y Viernes', coach: 'Mairover', capacity: 12, enrolled: 6 },
    { name: 'CrossFit', time: '08:00 AM - 09:00 AM', day: 'Martes y Jueves', coach: 'Carlos', capacity: 15, enrolled: 11 },
    { name: 'Entrenamiento Personal', time: '09:00 AM - 10:00 AM', day: 'Lunes, Miércoles y Viernes', coach: 'Mairover', capacity: 3, enrolled: 3 },
    { name: 'Asesoría Nutricional', time: '09:00 AM - 10:00 AM', day: 'Martes y Jueves', coach: 'Mairover', capacity: 2, enrolled: 2 },
    { name: 'Open Box', time: '10:00 AM - 11:30 AM', day: 'Lunes a Viernes', coach: 'Staff', capacity: 20, enrolled: 9 },
    { name: 'Entrenamiento Personal', time: '03:00 PM - 04:00 PM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 4, enrolled: 3 },
    { name: 'CrossFit Kids', time: '04:00 PM - 05:00 PM', day: 'Lunes, Miércoles y Viernes', coach: 'Carlos', capacity: 12, enrolled: 8 },
    { name: 'Bienestar Físico', time: '04:00 PM - 05:00 PM', day: 'Martes y Jueves', coach: 'Mairover', capacity: 12, enrolled: 7 },
    { name: 'Funcionales', time: '05:00 PM - 06:00 PM', day: 'Lunes, Miércoles y Viernes', coach: 'Carlos', capacity: 15, enrolled: 10 },
    { name: 'Hyrox', time: '05:00 PM - 06:00 PM', day: 'Martes y Jueves', coach: 'Carlos', capacity: 15, enrolled: 13 },
    { name: 'CrossFit', time: '06:00 PM - 07:00 PM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 15, enrolled: 15 },
    { name: 'Hyrox', time: '07:00 PM - 08:00 PM', day: 'Lunes, Miércoles y Viernes', coach: 'Carlos', capacity: 15, enrolled: 11 },
    { name: 'CrossFit', time: '07:00 PM - 08:00 PM', day: 'Martes y Jueves', coach: 'Mairover', capacity: 15, enrolled: 14 },
    { name: 'CrossFit (WOD Sábado)', time: '08:00 AM - 09:00 AM', day: 'Sábados', coach: 'Mairover', capacity: 20, enrolled: 18 },
    { name: 'Hyrox Sábado', time: '07:00 AM - 08:00 AM', day: 'Sábados', coach: 'Carlos', capacity: 15, enrolled: 12 },
    { name: 'CrossFit Kids Sábado', time: '08:00 AM - 09:00 AM', day: 'Sábados', coach: 'Carlos', capacity: 12, enrolled: 9 },
    { name: 'Open Box Sábado', time: '09:00 AM - 10:00 AM', day: 'Sábados', coach: 'Staff', capacity: 25, enrolled: 14 },
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
    { clienteId: c3.id, fecha: '10 May 2026', tipo: 'Bimensual', peso: 84.00, imc: 27.00, grasa: 21, musculo: 35, nota: 'Excelente reducción de grasa y aumento de tono muscular.' },
  ]);

  // Create Contactos Iniciales
  if (Contacto) {
    await Contacto.bulkCreate([
      {
        nombre: 'Valeria Mendoza',
        telefono: '+58 412-8899112',
        email: 'valeria.mendoza@gmail.com',
        servicio: 'CROSSFIT',
        objetivo: 'Aumentar fuerza y resistencia general',
        mensaje: 'Hola Mairover, me gustaría comenzar a entrenar CrossFit en el turno de las 6:00 PM. ¿Tienen cupos disponibles esta semana?',
        status: 'pendiente',
      },
      {
        nombre: 'Ricardo Silva',
        telefono: '+58 414-3322114',
        email: 'ricardo.silva@outlook.com',
        servicio: 'ENTRENAMIENTO PERSONAL',
        objetivo: 'Bajar porcentaje de grasa corporal',
        mensaje: 'Buenas tardes. Requiero información sobre el plan personalizado 1 a 1 y asesoría nutricional.',
        status: 'contactado',
      },
    ]);
  }

  console.log('🌲 Sembrado de base de datos finalizado con éxito.');
}

module.exports = {
  initializeDatabase,
};
