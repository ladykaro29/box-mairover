const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_SECRET || 'dev_only_jwt_secret_token_placeholder_32_chars';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_only_jwt_refresh_secret_token_placeholder_32_chars';

const ACCESS_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

function signAccessToken(usuario) {
  return jwt.sign(
    {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
      clienteId: usuario.clienteId || null,
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
}

function signRefreshToken(usuario) {
  return jwt.sign({ sub: usuario.id, type: 'refresh' }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

// Extrae el token del header "Authorization: Bearer <token>"
function extractBearerToken(req) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  return token || null;
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  extractBearerToken,
  ACCESS_EXPIRES_IN,
};
