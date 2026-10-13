const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

// Todo el panel administrativo exige sesión válida con rol "admin"
router.use(authenticate, authorize('admin'));

// Dashboard Stats
router.get('/stats/dashboard', adminController.getDashboardStats);

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

// Evaluaciones / Procesos Anuales
router.get('/procesos/:clienteId', adminController.getEvaluacionesByCliente);
router.post('/procesos', adminController.createEvaluacion);

// Contactos (Leads)
const contactoController = require('../controllers/contactoController');
router.get('/contactos', contactoController.getContactos);
router.put('/contactos/:id', contactoController.updateContactoStatus);

module.exports = router;
