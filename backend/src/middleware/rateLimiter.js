/**
 * In-memory robust rate limiter middleware for API security.
 * Prevents brute-force attacks and abuse without external Redis dependency.
 */

function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutos por defecto
  const max = options.max || 10; // 10 solicitudes máximas
  const message = options.message || 'Demasiadas solicitudes desde esta dirección IP. Por favor intente más tarde.';

  // Map: ip -> { count: number, resetTime: number }
  const hits = new Map();

  // Limpieza periódica cada 5 minutos de IPs cuyo resetTime ya expiró
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of hits.entries()) {
      if (now > record.resetTime) {
        hits.delete(ip);
      }
    }
  }, 5 * 60 * 1000).unref(); // unref para no bloquear el cierre del proceso

  return function rateLimiter(req, res, next) {
    // Obtener IP del cliente (considerando proxies/load balancers de EasyPanel o Cloudflare)
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = (forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress) || 'unknown-ip';

    const now = Date.now();
    let record = hits.get(clientIp);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs,
      };
      hits.set(clientIp, record);
    } else {
      record.count += 1;
    }

    const remaining = Math.max(0, max - record.count);
    const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

    // Cabeceras estándar de rate limiting
    res.setHeader('RateLimit-Limit', max);
    res.setHeader('RateLimit-Remaining', remaining);
    res.setHeader('RateLimit-Reset', resetSeconds);

    if (record.count > max) {
      res.setHeader('Retry-After', resetSeconds);
      console.warn(`⚠️ [RateLimit] IP bloqueada temporalmente: ${clientIp} en ${req.originalUrl}`);
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds: resetSeconds,
      });
    }

    next();
  };
}

// Limitador estricto para inicio de sesión y registro (10 intentos por cada 15 min)
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Demasiados intentos de acceso o registro desde tu conexión. Por motivos de seguridad, espera 15 minutos antes de reintentar.',
});

// Limitador para cambio de contraseña (5 intentos por cada 15 min)
const passwordLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiadas solicitudes de cambio de clave. Por favor espera 15 minutos.',
});

// Limitador general para API pública (150 solicitudes por minuto)
const generalLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 150,
  message: 'Límite de solicitudes de la API excedido temporalmente.',
});

module.exports = {
  createRateLimiter,
  authLimiter,
  passwordLimiter,
  generalLimiter,
};
