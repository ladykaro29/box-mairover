const Usuario = require('../models/Usuario');
const { verifyAccessToken, extractBearerToken } = require('../utils/tokens');

// Verifica el JWT y carga el usuario en req.user
async function authenticate(req, res, next) {
  try {
    const token = extractBearerToken(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado. Falta el token de acceso.',
      });
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      const expired = err.name === 'TokenExpiredError';
      return res.status(401).json({
        success: false,
        code: expired ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID',
        message: expired ? 'La sesión ha expirado.' : 'Token de acceso inválido.',
      });
    }

    const usuario = await Usuario.findByPk(payload.sub);
    if (!usuario) {
      return res.status(401).json({ success: false, message: 'El usuario ya no existe.' });
    }
    if (usuario.status !== 'Activo') {
      return res.status(403).json({ success: false, message: 'La cuenta está desactivada.' });
    }

    req.user = usuario;
    next();
  } catch (error) {
    next(error);
  }
}

// Restringe el acceso por rol: authorize('admin')
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'No autenticado.' });
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para realizar esta acción.',
      });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
