const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');

const contactoController = require('../controllers/contactoController');
const publicController = require('../controllers/publicController');

// Basic verification endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'MairoverFit Unified API',
  });
});

// Public endpoints
router.post('/contactos', contactoController.createContacto);
router.get('/horarios', publicController.getPublicHorarios);

// Mount auth routes (públicas + sesión)
router.use('/auth', authRoutes);

// Mount admin routes
router.use('/admin', adminRoutes);

module.exports = router;

