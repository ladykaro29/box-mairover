const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');

// Basic verification endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'MairoverFit Unified API',
  });
});

// Mount auth routes (públicas + sesión)
router.use('/auth', authRoutes);

// Mount admin routes
router.use('/admin', adminRoutes);

module.exports = router;

