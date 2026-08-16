const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

// Rutas de sesión
router.get('/me', authenticate, authController.me);
router.put('/password', authenticate, authController.changePassword);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
