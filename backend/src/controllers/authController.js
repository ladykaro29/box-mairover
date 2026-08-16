const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  ACCESS_EXPIRES_IN,
} = require('../utils/tokens');

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const MIN_PASSWORD_LENGTH = 8;

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

// El frontend público envía "nombre"; el panel admin envía "name".
function normalizeName(body) {
  return String(body.name || body.nombre || '').trim();
}

function buildSession(usuario) {
  return {
    token: signAccessToken(usuario),
    refreshToken: signRefreshToken(usuario),
    expiresIn: ACCESS_EXPIRES_IN,
    user: usuario.toPublicJSON(),
  };
}

// -------------------------------------------------------------
// POST /api/v1/auth/register — alta de cliente (rol fijo "cliente")
// -------------------------------------------------------------
exports.register = async (req, res, next) => {
  try {
    const name = normalizeName(req.body);
    const email = normalizeEmail(req.body.email);
    const { password, phone, plan } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, correo y contraseña son obligatorios.',
      });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: 'La dirección de correo no es válida.' });
    }
    if (String(password).length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
      });
    }

    const existing = await Usuario.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Este correo ya está registrado.' });
    }

    // Reutiliza la ficha de cliente si la coach ya la había creado desde el panel
    let cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
      cliente = await Cliente.create({
        name,
        email,
        phone: phone || null,
        plan: plan || 'Clase Regular',
        status: 'Activo',
      });
    }

    const usuario = await Usuario.create({
      name,
      email,
      password,
      role: 'cliente', // nunca se acepta el rol desde el cuerpo de la petición
      clienteId: cliente.id,
    });

    res.status(201).json({ success: true, data: buildSession(usuario) });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// POST /api/v1/auth/login
// -------------------------------------------------------------
exports.login = async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Correo y contraseña son obligatorios.' });
    }

    const usuario = await Usuario.scope('withPassword').findOne({ where: { email } });
    // Mismo mensaje para usuario inexistente y contraseña incorrecta (evita enumerar cuentas)
    const isValid = usuario ? await usuario.verifyPassword(password) : false;
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos.' });
    }

    if (usuario.status !== 'Activo') {
      return res.status(403).json({ success: false, message: 'La cuenta está desactivada. Contacta al box.' });
    }

    await usuario.update({ lastLogin: new Date() });

    res.json({ success: true, data: buildSession(usuario) });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// GET /api/v1/auth/me — sesión actual (requiere authenticate)
// -------------------------------------------------------------
exports.me = async (req, res, next) => {
  try {
    const data = req.user.toPublicJSON();

    // Adjunta la ficha del box si el usuario es un cliente enlazado
    if (req.user.clienteId) {
      const cliente = await Cliente.findByPk(req.user.clienteId);
      data.cliente = cliente || null;
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// POST /api/v1/auth/refresh — nuevo access token
// -------------------------------------------------------------
exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Falta el refresh token.' });
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Refresh token inválido o expirado.' });
    }

    const usuario = await Usuario.findByPk(payload.sub);
    if (!usuario || usuario.status !== 'Activo') {
      return res.status(401).json({ success: false, message: 'La sesión ya no es válida.' });
    }

    res.json({ success: true, data: buildSession(usuario) });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// PUT /api/v1/auth/password — cambio de contraseña (requiere authenticate)
// -------------------------------------------------------------
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Debes indicar la contraseña actual y la nueva.',
      });
    }
    if (String(newPassword).length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `La nueva contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
      });
    }

    const usuario = await Usuario.scope('withPassword').findByPk(req.user.id);
    const isValid = await usuario.verifyPassword(currentPassword);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'La contraseña actual no es correcta.' });
    }

    await usuario.update({ password: newPassword });

    res.json({ success: true, message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    next(error);
  }
};

// -------------------------------------------------------------
// POST /api/v1/auth/logout
// Los JWT son sin estado: el cliente descarta los tokens.
// Se mantiene el endpoint para registrar el cierre de sesión.
// -------------------------------------------------------------
exports.logout = async (req, res) => {
  res.json({ success: true, message: 'Sesión cerrada.' });
};
