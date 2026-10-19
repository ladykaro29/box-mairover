const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { authLimiter, passwordLimiter } = require('../middleware/rateLimiter');

// Rutas públicas con protección contra fuerza bruta y spam
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refresh);

// Rutas de sesión
router.get('/me', authenticate, authController.me);
router.put('/password', authenticate, passwordLimiter, authController.changePassword);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
