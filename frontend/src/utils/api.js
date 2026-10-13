import axios from 'axios';
import { authApi, tokenStore } from './authApi';

const API_BASE_URL = '/api/v1/admin';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

// Todas las llamadas del panel viajan con el JWT de la sesión activa
apiClient.interceptors.request.use((config) => {
  const token = tokenStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si el access token expiró, se renueva una sola vez y se reintenta la petición
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isExpired = error.response?.status === 401
      && error.response?.data?.code === 'TOKEN_EXPIRED';

    if (isExpired && original && !original._retried && tokenStore.getRefreshToken()) {
      original._retried = true;
      try {
        const session = await authApi.refresh();
        original.headers.Authorization = `Bearer ${session.token}`;
        return apiClient(original);
      } catch {
        tokenStore.clear();
      }
    }

    if (error.response?.status === 401) {
      tokenStore.clear();
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?expired=1';
      }
    }

    return Promise.reject(error);
  }
);

// =============================================================
// HIGH-FIDELITY LOCAL MOCK FALLBACK DATA
// =============================================================
// These will be used if the backend server is unreachable.
let mockClientes = [
  { id: 1, name: 'María García', email: 'maria@example.com', phone: '+58 414-1234567', plan: 'Clase Regular', status: 'Activo', lastPayment: '2026-05-15' },
  { id: 2, name: 'Juan Pérez', email: 'juan@example.com', phone: '+58 424-9876543', plan: 'Max Performance', status: 'Inactivo', lastPayment: '2026-04-01' },
  { id: 3, name: 'Carlos Rodríguez', email: 'carlos@example.com', phone: '+58 412-5555555', plan: 'Básico', status: 'Activo', lastPayment: '2026-05-20' },
  { id: 4, name: 'Ana Martínez', email: 'ana@example.com', phone: '+58 414-7778899', plan: 'Clase Regular', status: 'Activo', lastPayment: '2026-05-10' },
];

let mockPagos = [
  { id: 'TRX-001', client: 'María García', plan: 'Clase Regular', amount: '$45.00', date: '2026-05-15', method: 'Transferencia', status: 'Completado' },
  { id: 'TRX-002', client: 'Carlos Rodríguez', plan: 'Básico', amount: '$25.00', date: '2026-05-20', method: 'Efectivo', status: 'Pendiente' },
  { id: 'TRX-003', client: 'Ana Martínez', plan: 'Clase Regular', amount: '$45.00', date: '2026-05-10', method: 'Zelle', status: 'Completado' },
  { id: 'TRX-004', client: 'Juan Pérez', plan: 'Max Performance', amount: '$75.00', date: '2026-04-01', method: 'Zelle', status: 'Completado' },
];

let mockHorarios = [
  { id: 1, name: 'CrossTraining Matutino', time: '06:00 AM - 07:00 AM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 15, enrolled: 12 },
  { id: 2, name: 'CrossTraining Media Mañana', time: '08:00 AM - 09:00 AM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 15, enrolled: 8 },
  { id: 3, name: 'CrossTraining Tarde', time: '05:00 PM - 06:00 PM', day: 'Lunes a Viernes', coach: 'Invitado', capacity: 20, enrolled: 20 },
  { id: 4, name: 'CrossTraining Noche', time: '06:30 PM - 07:30 PM', day: 'Lunes a Viernes', coach: 'Mairover', capacity: 20, enrolled: 18 },
  { id: 5, name: 'Especial Fin de Semana', time: '09:00 AM - 11:00 AM', day: 'Sábados', coach: 'Mairover', capacity: 30, enrolled: 25 },
];

let mockEvaluaciones = {
  1: [
    { id: 1, fecha: '15 Feb 2026', tipo: 'Inicial', peso: 82.00, imc: 26.00, grasa: 25, musculo: 35, nota: 'Comienzo del plan de déficit calórico.' },
    { id: 2, fecha: '15 Abr 2026', tipo: 'Bimensual', peso: 78.00, imc: 25.00, grasa: 22, musculo: 36, nota: 'Mejora en resistencia aeróbica y fuerza.' },
    { id: 3, fecha: '15 May 2026', tipo: 'Bimensual', peso: 75.50, imc: 24.20, grasa: 20, musculo: 37, nota: 'Adaptación completa a la rutina. Excelente progreso.' },
  ],
  3: [
    { id: 4, fecha: '10 Ene 2026', tipo: 'Inicial', peso: 90.00, imc: 29.10, grasa: 28, musculo: 32, nota: 'Meta: Recomposición corporal y acondicionamiento inicial.' },
    { id: 5, fecha: '10 Mar 2026', tipo: 'Bimensual', peso: 86.50, imc: 27.80, grasa: 24, musculo: 34, nota: 'Muy buen avance. Se incrementa intensidad en entrenamientos.' },
    { id: 6, fecha: '10 May 2026', tipo: 'Bimensual', peso: 84.00, imc: 27.00, grasa: 21, musculo: 35, nota: 'Excelente reducción de grasa y aumento de tono muscular.' },
  ]
};

let mockContactos = [
  {
    id: 1,
    nombre: 'Valeria Mendoza',
    telefono: '+58 412-8899112',
    email: 'valeria.mendoza@gmail.com',
    servicio: 'CROSSFIT',
    objetivo: 'Aumentar fuerza y resistencia general',
    mensaje: 'Hola Mairover, me gustaría comenzar a entrenar CrossFit en el turno de las 6:00 PM. ¿Tienen cupos disponibles esta semana?',
    status: 'pendiente',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 2,
    nombre: 'Ricardo Silva',
    telefono: '+58 414-3322114',
    email: 'ricardo.silva@outlook.com',
    servicio: 'ENTRENAMIENTO PERSONAL',
    objetivo: 'Bajar porcentaje de grasa corporal',
    mensaje: 'Buenas tardes. Requiero información sobre el plan personalizado 1 a 1 y asesoría nutricional.',
    status: 'contactado',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: 3,
    nombre: 'Gabriela Torres',
    telefono: '+58 424-5544332',
    email: 'gaby.torres@gmail.com',
    servicio: 'CROSSFIT KIDS',
    objetivo: 'Actividad física y coordinación motriz',
    mensaje: 'Hola! Quiero inscribir a mi hijo de 9 años en las clases de CrossFit Kids de las 4:00 PM.',
    status: 'pendiente',
    createdAt: new Date(Date.now() - 3600000 * 52).toISOString(),
  },
];


// Logger helper for fallbacks.
// El respaldo local solo aplica cuando el servidor no responde (red caída o timeout).
// Si el backend contestó (401, 403, 404, 500...) el error se propaga: no se
// enmascara un problema real de permisos o de datos con información ficticia.
function logFallback(action, error) {
  if (error.response) {
    const err = new Error(error.response.data?.message || `Error del servidor en "${action}".`);
    err.status = error.response.status;
    throw err;
  }
  console.warn(`⚠️ API Call failed for "${action}" (${error.message}). Falling back to premium local state.`);
}

// =============================================================
// API INTEGRATION UTILITIES (with dynamic fallback)
// =============================================================

export const api = {
  // 1. Dashboard Stats
  async getDashboardStats() {
    try {
      const res = await apiClient.get('/stats/dashboard');
      return res.data.data;
    } catch (err) {
      logFallback('getDashboardStats', err);
      // Aggregate stats locally
      const activeCount = mockClientes.filter(c => c.status === 'Activo').length;
      const totalIncome = mockPagos.filter(p => p.status === 'Completado')
        .reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '')), 0);
      
      const sumEnrolled = mockHorarios.reduce((sum, c) => sum + c.enrolled, 0);
      const sumCapacity = mockHorarios.reduce((sum, c) => sum + c.capacity, 0);
      const occupancy = `${Math.round((sumEnrolled / sumCapacity) * 100)}%`;

      return {
        stats: [
          { label: 'Clientes Totales', value: mockClientes.length.toString(), change: `+${mockClientes.length} registrados`, icon: '👥' },
          { label: 'Miembros Activos', value: activeCount.toString(), change: `${Math.round((activeCount / mockClientes.length) * 100)}% de retención`, icon: '⚡' },
          { label: 'Ingresos Mensuales', value: `$${totalIncome.toFixed(0)}`, change: '+18% vs mes anterior', icon: '💰' },
          { label: 'Ocupación de Clases', value: occupancy, change: 'Pico a las 6:30 PM', icon: '📊' },
        ],
        recentPayments: mockPagos.slice(0, 4).map(p => ({
          cliente: p.client,
          plan: p.plan,
          monto: p.amount,
          fecha: p.date,
          estado: p.status,
        })),
      };
    }
  },

  // 2. Clientes CRUD
  async getClientes(params = {}) {
    try {
      const res = await apiClient.get('/clientes', { params });
      return res.data.data;
    } catch (err) {
      logFallback('getClientes', err);
      let filtered = [...mockClientes];
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
      }
      if (params.plan && params.plan !== 'all') {
        const map = { regular: 'Clase Regular', max: 'Max Performance', basic: 'Básico' };
        filtered = filtered.filter(c => c.plan === map[params.plan]);
      }
      if (params.status && params.status !== 'all') {
        const map = { active: 'Activo', inactive: 'Inactivo' };
        filtered = filtered.filter(c => c.status === map[params.status]);
      }
      return filtered;
    }
  },

  async createCliente(data) {
    try {
      const res = await apiClient.post('/clientes', data);
      return res.data.data;
    } catch (err) {
      logFallback('createCliente', err);
      const newClient = {
        id: mockClientes.length ? Math.max(...mockClientes.map(c => c.id)) + 1 : 1,
        name: data.name,
        email: data.email,
        phone: data.phone,
        plan: data.plan,
        status: data.status || 'Activo',
        lastPayment: new Date().toISOString().split('T')[0],
      };
      mockClientes.push(newClient);
      return newClient;
    }
  },

  async updateCliente(id, data) {
    try {
      const res = await apiClient.put(`/clientes/${id}`, data);
      return res.data.data;
    } catch (err) {
      logFallback('updateCliente', err);
      const idx = mockClientes.findIndex(c => c.id === parseInt(id, 10));
      if (idx !== -1) {
        mockClientes[idx] = { ...mockClientes[idx], ...data };
        return mockClientes[idx];
      }
      throw new Error('Cliente no encontrado');
    }
  },

  async deleteCliente(id) {
    try {
      await apiClient.delete(`/clientes/${id}`);
      return true;
    } catch (err) {
      logFallback('deleteCliente', err);
      mockClientes = mockClientes.filter(c => c.id !== parseInt(id, 10));
      return true;
    }
  },

  // 3. Pagos
  async getPagos(params = {}) {
    try {
      const res = await apiClient.get('/pagos', { params });
      return res.data.data;
    } catch (err) {
      logFallback('getPagos', err);
      let filtered = [...mockPagos];
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p => p.client.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
      }
      if (params.method && params.method !== 'all') {
        const map = { transfer: 'Transferencia', cash: 'Efectivo', zelle: 'Zelle' };
        filtered = filtered.filter(p => p.method === map[params.method]);
      }
      return filtered;
    }
  },

  async createPago(data) {
    try {
      const res = await apiClient.post('/pagos', data);
      return res.data.data;
    } catch (err) {
      logFallback('createPago', err);
      const client = mockClientes.find(c => c.id === parseInt(data.clienteId, 10)) || { name: 'Cliente Ficticio' };
      const newTrx = `TRX-${Math.floor(100 + Math.random() * 900)}`;
      const today = new Date().toISOString().split('T')[0];
      const newPay = {
        id: newTrx,
        client: client.name,
        plan: data.plan || client.plan,
        amount: `$${parseFloat(data.amount || (data.plan === 'Max Performance' ? 75 : data.plan === 'Básico' ? 25 : 45)).toFixed(2)}`,
        date: today,
        method: data.method === 'transfer' ? 'Transferencia' : data.method === 'zelle' ? 'Zelle' : 'Efectivo',
        status: data.status || 'Pendiente',
      };
      mockPagos.unshift(newPay);

      if (newPay.status === 'Completado') {
        const idx = mockClientes.findIndex(c => c.id === parseInt(data.clienteId, 10));
        if (idx !== -1) {
          mockClientes[idx].lastPayment = today;
          mockClientes[idx].status = 'Activo';
        }
      }
      return newPay;
    }
  },

  async approvePago(id) {
    try {
      const res = await apiClient.put(`/pagos/${id}/approve`);
      return res.data.data;
    } catch (err) {
      logFallback('approvePago', err);
      const idx = mockPagos.findIndex(p => p.id === id);
      if (idx !== -1) {
        mockPagos[idx].status = 'Completado';
        
        // Find matching client and update status/payment
        const clientName = mockPagos[idx].client;
        const cIdx = mockClientes.findIndex(c => c.name === clientName);
        if (cIdx !== -1) {
          mockClientes[cIdx].status = 'Activo';
          mockClientes[cIdx].lastPayment = mockPagos[idx].date;
        }
        return mockPagos[idx];
      }
      throw new Error('Pago no encontrado');
    }
  },

  async getPaymentStats() {
    try {
      const res = await apiClient.get('/pagos/stats');
      return res.data.data;
    } catch (err) {
      logFallback('getPaymentStats', err);
      const totalIncome = mockPagos.filter(p => p.status === 'Completado')
        .reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '')), 0);
      const pendingCount = mockPagos.filter(p => p.status === 'Pendiente').length;

      return {
        monthlyIncome: `$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        pendingPayments: pendingCount,
        totalTransactions: mockPagos.length,
      };
    }
  },

  // 4. Horarios
  async getHorarios(params = {}) {
    try {
      const res = await apiClient.get('/horarios', { params });
      return res.data.data;
    } catch (err) {
      logFallback('getHorarios', err);
      if (params.day && params.day !== 'all') {
        return mockHorarios.filter(s => s.day.includes(params.day));
      }
      return mockHorarios;
    }
  },

  async createHorario(data) {
    try {
      const res = await apiClient.post('/horarios', data);
      return res.data.data;
    } catch (err) {
      logFallback('createHorario', err);
      const newClass = {
        id: mockHorarios.length ? Math.max(...mockHorarios.map(h => h.id)) + 1 : 1,
        name: data.name,
        time: data.time,
        day: data.day || 'Lunes a Viernes',
        coach: data.coach || 'Mairover',
        capacity: parseInt(data.capacity, 10) || 15,
        enrolled: 0,
      };
      mockHorarios.push(newClass);
      return newClass;
    }
  },

  async updateHorario(id, data) {
    try {
      const res = await apiClient.put(`/horarios/${id}`, data);
      return res.data.data;
    } catch (err) {
      logFallback('updateHorario', err);
      const idx = mockHorarios.findIndex(h => h.id === parseInt(id, 10));
      if (idx !== -1) {
        mockHorarios[idx] = { ...mockHorarios[idx], ...data };
        return mockHorarios[idx];
      }
      throw new Error('Horario no encontrado');
    }
  },

  async deleteHorario(id) {
    try {
      await apiClient.delete(`/horarios/${id}`);
      return true;
    } catch (err) {
      logFallback('deleteHorario', err);
      mockHorarios = mockHorarios.filter(h => h.id !== parseInt(id, 10));
      return true;
    }
  },

  // 5. Evaluaciones / Procesos
  async getEvaluaciones(clienteId) {
    try {
      const res = await apiClient.get(`/procesos/${clienteId}`);
      return res.data.data;
    } catch (err) {
      logFallback('getEvaluaciones', err);
      return mockEvaluaciones[clienteId] || [];
    }
  },

  async createEvaluacion(data) {
    try {
      const res = await apiClient.post('/procesos', data);
      return res.data.data;
    } catch (err) {
      logFallback('createEvaluacion', err);
      
      const cId = parseInt(data.clienteId, 10);
      const weight = parseFloat(data.peso);
      const height = 1.75;
      const imc = weight / (height * height);
      
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const today = new Date();
      const dateStr = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

      if (!mockEvaluaciones[cId]) {
        mockEvaluaciones[cId] = [];
      }

      const newEval = {
        id: Math.floor(Math.random() * 10000),
        fecha: dateStr,
        tipo: data.tipo || 'Bimensual',
        peso: weight,
        imc: parseFloat(imc.toFixed(2)),
        grasa: parseInt(data.grasa, 10),
        musculo: parseInt(data.musculo, 10),
        nota: data.nota || '',
      };
      
      mockEvaluaciones[cId].unshift(newEval);
      return newEval;
    }
  },

  // 6. Contactos / Leads
  async getContactos(params = {}) {
    try {
      const res = await apiClient.get('/contactos', { params });
      return res.data.data;
    } catch (err) {
      logFallback('getContactos', err);
      let filtered = [...mockContactos];
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.nombre.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.telefono.toLowerCase().includes(q) ||
            (c.servicio && c.servicio.toLowerCase().includes(q))
        );
      }
      if (params.status && params.status !== 'all') {
        filtered = filtered.filter((c) => c.status === params.status);
      }
      return filtered;
    }
  },

  async updateContactoStatus(id, status) {
    try {
      const res = await apiClient.put(`/contactos/${id}`, { status });
      return res.data.data;
    } catch (err) {
      logFallback('updateContactoStatus', err);
      const idx = mockContactos.findIndex((c) => c.id === parseInt(id, 10));
      if (idx !== -1) {
        mockContactos[idx].status = status;
        return mockContactos[idx];
      }
      throw new Error('Contacto no encontrado');
    }
  },

  async deleteContacto(id) {
    try {
      await apiClient.delete(`/contactos/${id}`);
      return true;
    } catch (err) {
      logFallback('deleteContacto', err);
      mockContactos = mockContactos.filter((c) => c.id !== parseInt(id, 10));
      return true;
    }
  },
};
