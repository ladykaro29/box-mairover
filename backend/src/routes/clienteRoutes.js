const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const { authenticate } = require('../middleware/auth');

// Todas las rutas de cliente requieren autenticación activa
router.use(authenticate);

router.get('/reservas', reservaController.getMisReservas);
router.post('/reservas', reservaController.crearReserva);
router.delete('/reservas/:id', reservaController.cancelarReserva);

module.exports = router;
