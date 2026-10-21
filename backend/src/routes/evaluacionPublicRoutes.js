const express = require('express');
const router = express.Router();
const multer = require('multer');
const evaluacionPublicController = require('../controllers/evaluacionPublicController');
const { createRateLimiter } = require('../middleware/rateLimiter');

// Configuración de Multer en memoria (para procesar y validar antes de escribir en disco)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB por archivo
    files: 5, // Máximo 5 fotografías por formulario
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Formato no permitido. Solo se aceptan imágenes JPEG, PNG o WebP.'));
    }
  },
});

// Limitador de envíos contra abuso y spam (5 envíos por cada 15 min por IP)
const evaluacionLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Has realizado varios envíos recientemente. Por favor espera unos minutos antes de volver a enviar un formulario.',
});

// Rutas públicas
router.get('/planes', evaluacionPublicController.getPlanesPublicos);
router.get('/planes/:codigo', evaluacionPublicController.getPlanDetalle);
router.get('/confirmacion/:codigo', evaluacionPublicController.getConfirmacion);

// Envío seguro de evaluación con subida de fotos protegidas
router.post(
  '/',
  evaluacionLimiter,
  upload.any(),
  evaluacionPublicController.submitEvaluacion
);

module.exports = router;
