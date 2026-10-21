const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

const evaluacionAdminController = require('../controllers/evaluacionAdminController');

// Todo el panel administrativo exige sesión válida con rol "admin"
router.use(authenticate, authorize('admin'));

// Dashboard Stats (Presencial + Online)
router.get('/stats/dashboard', adminController.getDashboardStats);
router.get('/evaluaciones/stats', evaluacionAdminController.getDashboardStats);

// Evaluaciones Online (Gestión de Formularios y Respuestas)
router.get('/evaluaciones', evaluacionAdminController.getEvaluaciones);
router.get('/evaluaciones/:id', evaluacionAdminController.getEvaluacionById);
router.put('/evaluaciones/:id/estado', evaluacionAdminController.updateEstado);
router.put('/evaluaciones/:id/notas', evaluacionAdminController.updateNotasInternas);
router.delete('/evaluaciones/:id', evaluacionAdminController.deleteEvaluacion);

// Archivos y Fotografías Privadas Protegidas
router.get('/evaluaciones/archivos/:fileId', evaluacionAdminController.streamArchivoPrivado);
router.get('/archivos', evaluacionAdminController.getArchivosList);

// Gestión y Configuración de Planes Online
router.get('/planes', evaluacionAdminController.getPlanesAdmin);
router.put('/planes/:id', evaluacionAdminController.updatePlan);

// Clientes CRUD
router.get('/clientes', adminController.getClientes);
router.post('/clientes', adminController.createCliente);
router.put('/clientes/:id', adminController.updateCliente);
router.delete('/clientes/:id', adminController.deleteCliente);

// Pagos Management
router.get('/pagos', adminController.getPagos);
router.post('/pagos', adminController.createPago);
router.put('/pagos/:id/approve', adminController.approvePago);
router.get('/pagos/stats', adminController.getPaymentStats);

// Horarios CRUD
router.get('/horarios', adminController.getHorarios);
router.post('/horarios', adminController.createHorario);
router.put('/horarios/:id', adminController.updateHorario);
router.delete('/horarios/:id', adminController.deleteHorario);

// Evaluaciones / Procesos Anuales Presenciales del Box
router.get('/procesos/:clienteId', adminController.getEvaluacionesByCliente);
router.post('/procesos', adminController.createEvaluacion);

// Contactos (Leads)
const contactoController = require('../controllers/contactoController');
router.get('/contactos', contactoController.getContactos);
router.put('/contactos/:id', contactoController.updateContactoStatus);
router.delete('/contactos/:id', contactoController.deleteContacto);

// Reservas & Asistencia a Clases
router.get('/reservas', adminController.getReservas);
router.put('/reservas/:id/asistencia', adminController.updateAsistencia);
router.post('/reservas', adminController.createReservaAdmin);

module.exports = router;
