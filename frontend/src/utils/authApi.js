import axios from 'axios';

const AUTH_BASE_URL = '/api/v1/auth';

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'user';

// -------------------------------------------------------------
// Almacenamiento de la sesión (localStorage)
// -------------------------------------------------------------
export const tokenStore = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),

  getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  save({ token, refreshToken, user }) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  saveUser(user) {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 8000,
});

// Adjunta el access token en las rutas de sesión (/me, /password, /logout)
authClient.interceptors.request.use((config) => {
  const token = tokenStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Traduce cualquier fallo a un Error con mensaje legible en español
function toFriendlyError(err, fallbackMessage) {
  const message = err.response?.data?.message
    || (err.response ? fallbackMessage : 'No se pudo conectar con el servidor. Intenta de nuevo.');
  const error = new Error(message);
  error.status = err.response?.status || 0;
  error.isNetworkError = !err.response;
  return error;
}

// -------------------------------------------------------------
// API de autenticación
// -------------------------------------------------------------
export const authApi = {
  async login(credentials) {
    try {
      const res = await authClient.post('/login', credentials);
      return res.data.data;
    } catch (err) {
      throw toFriendlyError(err, 'Correo o contraseña incorrectos.');
    }
  },

  async register(data) {
    try {
      const res = await authClient.post('/register', data);
      return res.data.data;
    } catch (err) {
      throw toFriendlyError(err, 'No se pudo completar el registro.');
    }
  },

  async me() {
    try {
      const res = await authClient.get('/me');
      return res.data.data;
    } catch (err) {
      throw toFriendlyError(err, 'No se pudo recuperar la sesión.');
    }
  },

  async refresh() {
    const refreshToken = tokenStore.getRefreshToken();
    if (!refreshToken) throw new Error('No hay refresh token disponible.');

    const res = await axios.post(`${AUTH_BASE_URL}/refresh`, { refreshToken });
    const session = res.data.data;
    tokenStore.save(session);
    return session;
  },

  async changePassword(payload) {
    try {
      const res = await authClient.put('/password', payload);
      return res.data;
    } catch (err) {
      throw toFriendlyError(err, 'No se pudo cambiar la contraseña.');
    }
  },

  async logout() {
    try {
      await authClient.post('/logout');
    } catch {
      // El logout es local aunque el servidor no responda: los JWT son sin estado.
    } finally {
      tokenStore.clear();
    }
  },
};
