const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');
const clienteRoutes = require('./clienteRoutes');

const contactoController = require('../controllers/contactoController');
const publicController = require('../controllers/publicController');

const { authLimiter } = require('../middleware/rateLimiter');

// Basic verification endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'MairoverFit Unified API',
  });
});

// Public endpoints
router.post('/contactos', authLimiter, contactoController.createContacto);
router.get('/horarios', publicController.getPublicHorarios);

// Mount auth routes (públicas + sesión)
router.use('/auth', authRoutes);

// Mount cliente routes (reservas, etc.)
router.use('/cliente', clienteRoutes);

// Mount admin routes
router.use('/admin', adminRoutes);

module.exports = router;

