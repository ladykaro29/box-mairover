# MairoverFit - Especificación Técnica Completa

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Propósito:** Blueprint completo antes de desarrollo  
**Objetivo:** Sistema escalable, mantenible, sin exceso de dependencias

---

## 📋 ÍNDICE

1. [Stack Tecnológico](#stack-tecnológico)
2. [Arquitectura General](#arquitectura-general)
3. [Base de Datos](#base-de-datos)
4. [API REST Endpoints](#api-rest-endpoints)
5. [Seguridad](#seguridad)
6. [Autenticación & Autorización](#autenticación--autorización)
7. [Estructura de Carpetas](#estructura-de-carpetas)
8. [Modelos de Datos](#modelos-de-datos)
9. [Flujos Principales](#flujos-principales)
10. [Deployment en VPS](#deployment-en-vps)
11. [Integraciones Externas](#integraciones-externas)
12. [Monitoreo & Mantenimiento](#monitoreo--mantenimiento)

---

## Stack Tecnológico

### Frontend (React SPA)
- **React 18.2+** - UI library
- **Vite 5+** - Build tool (rápido, HMR, optimización)
- **Tailwind CSS 3+** - Styling (utility-first, responsive)
- **Zustand** - State management (lightweight, no boilerplate)
- **Axios** - HTTP client para API calls
- **React Router v6** - Routing SPA
- **Chart.js + react-chartjs-2** - Gráficos simples
- **React Hook Form** - Form management (validación)
- **date-fns** - Date utilities

**NO incluiremos:**
- Redux (exceso de boilerplate)
- GraphQL (REST es suficiente)
- Material-UI (Tailwind es más ligero)

### Backend (Node.js + Express)
- **Node.js 18 LTS** - Runtime
- **Express 4.18+** - Web framework (minimalista)
- **Sequelize 6+** - ORM (migrations, models, associations)
- **MySQL2/promise** - Driver MySQL
- **jsonwebtoken** - JWT para autenticación
- **bcryptjs** - Password hashing
- **dotenv** - Variables de entorno
- **multer** - File uploads
- **sharp** - Image processing (thumbnails, optimize)
- **joi** - Schema validation
- **helmet** - Security headers
- **cors** - CORS middleware
- **morgan** - HTTP logging
- **axios** - HTTP requests (integración Evolution API, N8N)

**NO incluiremos:**
- TypeScript (por ahora - agregable después)
- GraphQL
- Prisma (Sequelize es suficiente)

### Database
- **MySQL 8.0+** - Relacional
- **Adminer** (opcional) - GUI para gestión rápida en VPS

### Server/Hosting
- **Ubuntu 20.04 LTS** en VPS
- **Nginx 1.18+** - Reverse proxy + static files
- **PM2 5+** - Process manager para Node.js
- **OpenSSL/Certbot** - SSL/TLS certificates (HTTPS)
- **UFW** - Firewall básico

### Development Tools
- **Git** - Version control
- **Postman/Insomnia** - API testing
- **VS Code** - IDE

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Nginx Reverse Proxy                       │
│  (SSL termination, static files, routing)                   │
└──────────┬──────────────────────────────┬──────────────────┘
           │                              │
           ▼                              ▼
     ┌─────────────┐            ┌──────────────────┐
     │ React Build │            │  Node.js + Exp. │
     │  (estáticos)│            │  (puerto 3000)   │
     │  (puerto 80)│            └────────┬─────────┘
     └─────────────┘                     │
                                         ▼
                                   ┌──────────────┐
                                   │ MySQL 8.0    │
                                   │ (puerto 3306)│
                                   └──────────────┘

Integraciones Externas:
    ├─ Evolution API → WhatsApp
    ├─ N8N → Webhooks, automaciones
    └─ Google Drive API → Backup documentos
```

### Flujo de Requests

1. **Usuario accede mairoverfit.com**
   - Nginx sirve React build (HTML, JS, CSS estáticos)
   
2. **React app en navegador hace fetch a /api/...**
   - Axios intercepta y agrega JWT token
   - Request va a Nginx → forward a Node.js:3000
   
3. **Node.js Express:**
   - Valida JWT
   - Ejecuta controller
   - Consulta BD (Sequelize)
   - Retorna JSON response

4. **React recibe JSON y renderiza**

---

## Base de Datos

### Diseño Relacional

```sql
-- USUARIOS (Core authentication)
users
├─ id (INT, PK, AUTO_INCREMENT)
├─ email (VARCHAR(255), UNIQUE, NOT NULL)
├─ password_hash (VARCHAR(255), NOT NULL) -- bcrypt
├─ nombre (VARCHAR(100), NOT NULL)
├─ tipo (ENUM: 'admin', 'entrenador', 'cliente', 'staff')
├─ estado (ENUM: 'activo', 'inactivo', 'bloqueado')
├─ telefono (VARCHAR(20))
├─ foto_perfil_url (VARCHAR(500))
├─ ultimo_login (DATETIME)
├─ created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
├─ updated_at (DATETIME, ON UPDATE CURRENT_TIMESTAMP)
└─ deleted_at (DATETIME, NULL) -- Soft delete

-- CLIENTES (Info extendida para clientes)
clientes
├─ id (INT, PK, AUTO_INCREMENT)
├─ user_id (INT, FK → users, UNIQUE)
├─ edad (INT)
├─ genero (ENUM: 'M', 'F', 'Otro')
├─ objetivo (VARCHAR(255)) -- Ej: "Ganar fuerza", "Perder peso"
├─ plan_activo_id (INT, FK → planes, NULLABLE)
├─ estado_membresia (ENUM: 'activa', 'pausa', 'cancelada', 'vencida')
├─ fecha_inicio_plan (DATETIME)
├─ fecha_proximo_vencimiento (DATETIME)
├─ numero_evaluaciones (INT, DEFAULT 0)
├─ created_at (DATETIME)
├─ updated_at (DATETIME)
└─ deleted_at (DATETIME, NULL)

-- PLANES (Tipos de membresía)
planes
├─ id (INT, PK)
├─ nombre (VARCHAR(100), NOT NULL) -- Ej: "Clase Regular", "Max Performance"
├─ descripcion (TEXT)
├─ precio_mensual (DECIMAL(10,2), NOT NULL)
├─ duracion_dias (INT, DEFAULT 30)
├─ capacidad_clases_mes (INT, NULLABLE) -- NULL = ilimitado
├─ incluye_nutricion (BOOLEAN, DEFAULT 0)
├─ incluye_evaluaciones (BOOLEAN, DEFAULT 1)
├─ caracteristicas (JSON) -- Flexible para features extras
├─ imagen_url (VARCHAR(500))
├─ estado (ENUM: 'activo', 'inactivo')
├─ created_at (DATETIME)
└─ updated_at (DATETIME)

-- HORARIOS (Schedule del box)
horarios
├─ id (INT, PK, AUTO_INCREMENT)
├─ dia_semana (INT, 0-6) -- 0=lunes, 6=domingo
├─ hora_inicio (TIME)
├─ hora_fin (TIME)
├─ tipo_clase (VARCHAR(50)) -- 'CrossFit', 'Funcionales', 'Hyrox', etc
├─ entrenador_id (INT, FK → users)
├─ capacidad_maxima (INT, DEFAULT 15)
├─ capacidad_actual (INT, DEFAULT 0) -- Actualizado al reservar
├─ descripcion (TEXT)
├─ reservas_abiertas (BOOLEAN, DEFAULT 1)
├─ estado (ENUM: 'activo', 'inactivo', 'cancelado')
├─ created_at (DATETIME)
└─ updated_at (DATETIME)

-- RESERVAS/ASISTENCIAS (Cliente asiste a clase)
asistencias
├─ id (INT, PK, AUTO_INCREMENT)
├─ cliente_id (INT, FK → clientes, NOT NULL)
├─ horario_id (INT, FK → horarios, NOT NULL)
├─ fecha (DATE, NOT NULL) -- Fecha específica de la clase
├─ hora_inicio (TIME) -- Denormalizado para queries rápidas
├─ tipo_clase (VARCHAR(50))
├─ presente (BOOLEAN, DEFAULT NULL) -- NULL=no checkeada, 1=presente, 0=ausente
├─ check_in_timestamp (DATETIME, NULLABLE)
├─ notas (TEXT) -- "Lesión de hombro", etc
├─ created_at (DATETIME)
└─ updated_at (DATETIME)
UNIQUE KEY (cliente_id, horario_id, fecha)

-- EVALUACIONES (Mediciones de progreso)
evaluaciones
├─ id (INT, PK, AUTO_INCREMENT)
├─ cliente_id (INT, FK → clientes, NOT NULL)
├─ tipo (ENUM: 'inicial', 'mensual', 'final')
├─ fecha (DATETIME, NOT NULL)
├─ peso_kg (DECIMAL(5,2))
├─ altura_cm (INT)
├─ % grasa (DECIMAL(5,2))
├─ pecho_cm (DECIMAL(5,2))
├─ cintura_cm (DECIMAL(5,2))
├─ cadera_cm (DECIMAL(5,2))
├─ brazo_izq_cm (DECIMAL(5,2))
├─ brazo_der_cm (DECIMAL(5,2))
├─ muslo_izq_cm (DECIMAL(5,2))
├─ muslo_der_cm (DECIMAL(5,2))
├─ fotos_antes (JSON) -- URLs array: [url1, url2]
├─ fotos_despues (JSON)
├─ notas (TEXT) -- Observaciones del entrenador
├─ created_by (INT, FK → users) -- Quién creó la evaluación
├─ created_at (DATETIME)
└─ updated_at (DATETIME)

-- PAGOS (Transacciones)
pagos
├─ id (INT, PK, AUTO_INCREMENT)
├─ cliente_id (INT, FK → clientes, NOT NULL)
├─ plan_id (INT, FK → planes, NOT NULL)
├─ monto (DECIMAL(10,2), NOT NULL)
├─ fecha_pago (DATE, NOT NULL)
├─ metodo (ENUM: 'transferencia', 'efectivo', 'tarjeta', 'stripe')
├─ estado (ENUM: 'pendiente', 'completado', 'fallido', 'reembolsado')
├─ referencia_externa (VARCHAR(255)) -- Transaction ID from Stripe, etc
├─ notas_admin (TEXT)
├─ proxima_fecha_renovacion (DATE, NULLABLE)
├─ comprobante_url (VARCHAR(500)) -- URL a imagen del comprobante
├─ created_by (INT, FK → users) -- Quién registró el pago
├─ created_at (DATETIME)
└─ updated_at (DATETIME)

-- CONTACTOS (Formularios del sitio público)
contactos
├─ id (INT, PK, AUTO_INCREMENT)
├─ nombre (VARCHAR(100), NOT NULL)
├─ email (VARCHAR(255), NOT NULL)
├─ telefono (VARCHAR(20), NOT NULL)
├─ objetivo (VARCHAR(255))
├─ mensaje (TEXT)
├─ estado (ENUM: 'nuevo', 'procesado', 'contactado', 'convertido')
├─ usuario_asignado_id (INT, FK → users, NULLABLE)
├─ notas_internas (TEXT)
├─ fecha_contacto (DATETIME, NULLABLE)
├─ created_at (DATETIME)
└─ updated_at (DATETIME)

-- LOGS (Auditoría)
logs
├─ id (INT, PK, AUTO_INCREMENT)
├─ usuario_id (INT, FK → users, NULLABLE)
├─ tabla_afectada (VARCHAR(50))
├─ id_registro (INT)
├─ accion (ENUM: 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'PAGO')
├─ datos_antes (JSON, NULLABLE)
├─ datos_despues (JSON, NULLABLE)
├─ ip_address (VARCHAR(45))
├─ user_agent (TEXT)
├─ created_at (DATETIME, INDEX)
└─ status (ENUM: 'exitoso', 'error')
INDEX (usuario_id, created_at)
INDEX (tabla_afectada, id_registro, created_at)

-- SESIONES (Token blacklist para logout)
sesiones
├─ id (INT, PK, AUTO_INCREMENT)
├─ usuario_id (INT, FK → users, NOT NULL)
├─ token_hash (VARCHAR(255), UNIQUE) -- Hash del JWT
├─ expires_at (DATETIME)
├─ created_at (DATETIME)
└─ updated_at (DATETIME)
INDEX (usuario_id, expires_at)
```

### Índices (Performance)

```sql
-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tipo ON users(tipo);
CREATE INDEX idx_clientes_user_id ON clientes(user_id);
CREATE INDEX idx_clientes_plan_activo ON clientes(plan_activo_id);
CREATE INDEX idx_asistencias_cliente_fecha ON asistencias(cliente_id, fecha);
CREATE INDEX idx_asistencias_horario ON asistencias(horario_id, fecha);
CREATE INDEX idx_evaluaciones_cliente ON evaluaciones(cliente_id, fecha);
CREATE INDEX idx_pagos_cliente ON pagos(cliente_id, created_at);
CREATE INDEX idx_contactos_estado ON contactos(estado, created_at);
CREATE INDEX idx_logs_usuario_fecha ON logs(usuario_id, created_at);
CREATE INDEX idx_horarios_dia_semana ON horarios(dia_semana);
```

---

## API REST Endpoints

### Convención
- `POST /api/v1/resource` - Crear
- `GET /api/v1/resource` - Listar
- `GET /api/v1/resource/:id` - Detalle
- `PUT /api/v1/resource/:id` - Actualizar
- `DELETE /api/v1/resource/:id` - Eliminar

### Auth Endpoints

```
POST   /api/v1/auth/register        - Registro cliente (público)
POST   /api/v1/auth/login           - Login (público)
POST   /api/v1/auth/logout          - Logout (requiere JWT)
POST   /api/v1/auth/refresh-token   - Refresh JWT
GET    /api/v1/auth/me              - Perfil del usuario logueado
PUT    /api/v1/auth/profile         - Actualizar perfil
POST   /api/v1/auth/change-password - Cambiar contraseña
POST   /api/v1/auth/forgot-password - Recuperar contraseña (send email)
POST   /api/v1/auth/reset-password  - Reset contraseña (con token)
```

### Clientes Endpoints (Admin only)

```
GET    /api/v1/admin/clientes              - Listar todos
GET    /api/v1/admin/clientes/:id          - Detalle
POST   /api/v1/admin/clientes              - Crear cliente
PUT    /api/v1/admin/clientes/:id          - Actualizar
DELETE /api/v1/admin/clientes/:id          - Soft delete
GET    /api/v1/admin/clientes/:id/pagos    - Historial pagos cliente
GET    /api/v1/admin/clientes/:id/asistencias - Asistencias cliente
GET    /api/v1/admin/clientes/:id/evaluaciones - Evaluaciones cliente
GET    /api/v1/admin/clientes/filtro?estado=activo&plan=2 - Filtrar
```

### Planes Endpoints

```
GET    /api/v1/planes              - Listar (público)
GET    /api/v1/planes/:id          - Detalle (público)
POST   /api/v1/admin/planes        - Crear (admin only)
PUT    /api/v1/admin/planes/:id    - Actualizar (admin only)
DELETE /api/v1/admin/planes/:id    - Eliminar (admin only)
```

### Horarios Endpoints

```
GET    /api/v1/horarios                    - Listar (público)
GET    /api/v1/horarios/semana             - Semana completa formateada
GET    /api/v1/horarios/:id                - Detalle
POST   /api/v1/admin/horarios              - Crear (admin)
PUT    /api/v1/admin/horarios/:id          - Actualizar (admin)
DELETE /api/v1/admin/horarios/:id          - Eliminar (admin)
GET    /api/v1/admin/horarios/:id/ocupacion - % ocupación actual
```

### Asistencias/Reservas Endpoints

```
POST   /api/v1/cliente/asistencias/reservar        - Reservar clase
DELETE /api/v1/cliente/asistencias/:id/cancelar    - Cancelar reserva
GET    /api/v1/cliente/asistencias                 - Mis clases reservadas
POST   /api/v1/admin/asistencias/:id/checkin       - Check-in en clase
PUT    /api/v1/admin/asistencias/:id/marcar        - Marcar presente/ausente
GET    /api/v1/admin/asistencias/filtro?fecha=... - Reportes asistencias
```

### Evaluaciones Endpoints

```
POST   /api/v1/cliente/evaluaciones              - Crear (cliente o admin)
GET    /api/v1/cliente/evaluaciones              - Mis evaluaciones
GET    /api/v1/cliente/evaluaciones/:id          - Detalle evaluación
PUT    /api/v1/cliente/evaluaciones/:id          - Actualizar
GET    /api/v1/admin/evaluaciones                - Todas evaluaciones
GET    /api/v1/admin/evaluaciones/reporte?cliente=1 - Reporte cliente
```

### Pagos Endpoints

```
POST   /api/v1/cliente/pagos/crear               - Crear pago pendiente
GET    /api/v1/cliente/pagos                     - Mis pagos
GET    /api/v1/admin/pagos                       - Todos pagos
POST   /api/v1/admin/pagos/:id/confirmar         - Confirmar pago (admin)
POST   /api/v1/admin/pagos/:id/reembolsar        - Reembolsar (admin)
GET    /api/v1/admin/dashboard/ingresos?mes=5   - Ingresos por período
```

### Contactos Endpoints

```
POST   /api/v1/contactos                  - Crear (público)
GET    /api/v1/admin/contactos            - Listar (admin)
PUT    /api/v1/admin/contactos/:id        - Actualizar estado
POST   /api/v1/admin/contactos/:id/convertir - Convertir a cliente
```

### Dashboard/Reportes Endpoints

```
GET    /api/v1/admin/dashboard            - KPIs generales
GET    /api/v1/admin/dashboard/clientes   - Estadísticas clientes
GET    /api/v1/admin/dashboard/ingresos   - Ingresos/reportes finanzas
GET    /api/v1/admin/dashboard/ocupacion  - Ocupación clases
GET    /api/v1/admin/reportes/export?tipo=csv|pdf - Exportar datos
```

---

## Seguridad

### Principles

1. **Never trust user input** - Validar y sanitizar todo
2. **Principle of least privilege** - Roles y permisos estrictos
3. **Defense in depth** - Múltiples capas de seguridad
4. **HTTPS only** - Certificado SSL/TLS obligatorio
5. **Audit everything** - Logs de todas las acciones críticas

### Implementación

```javascript
// 1. HELMET - Security headers
app.use(helmet());

// 2. CORS - Control cross-origin
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://mairoverfit.com',
  credentials: true
}));

// 3. Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100 // Máx 100 requests
});
app.use('/api/', limiter);

// 4. Input validation (Joi)
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  nombre: Joi.string().max(100).required()
});

// 5. Password hashing (bcryptjs)
const hashedPassword = await bcrypt.hash(password, 10);

// 6. JWT token expiration
// Access token: 15 min
// Refresh token: 7 días

// 7. SQL injection prevention
// Sequelize parameterized queries - SIEMPRE

// 8. CSRF protection
// Token en form submission

// 9. XSS prevention
// Sanitizar output HTML, escapar special chars
```

### Política de Contraseñas

- Mínimo 8 caracteres
- Al menos 1 mayúscula, 1 número, 1 símbolo
- No reutilizar últimas 5 contraseñas
- Reset después de 90 días (opcional, alert)
- Bloqueo de cuenta después de 5 intentos fallidos (15 min)

### Secretos & Configuración

```bash
# .env.local (NUNCA commitear)
DATABASE_URL=mysql://user:pass@localhost:3306/mairoverfit
JWT_SECRET=super_secret_key_min_32_chars_random
JWT_REFRESH_SECRET=another_random_secret_key_min_32_chars
EVOLUTION_API_KEY=xxx
EVOLUTION_API_URL=https://evolution.xxx
STRIPE_SECRET_KEY=sk_xxx
GOOGLE_DRIVE_CLIENT_ID=xxx
GOOGLE_DRIVE_CLIENT_SECRET=xxx
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://mairoverfit.com
```

---

## Autenticación & Autorización

### JWT Tokens

```javascript
// Access Token Payload (15 min expiry)
{
  sub: userId,
  email: user.email,
  tipo: user.tipo,
  iat: timestamp,
  exp: timestamp + 900
}

// Refresh Token Payload (7 días expiry)
{
  sub: userId,
  type: 'refresh',
  iat: timestamp,
  exp: timestamp + 604800
}
```

### Middleware de Autenticación

```javascript
// Verificar JWT válido
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Verificar rol específico
const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.tipo)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

// Usar en rutas:
app.get('/api/v1/admin/clientes',
  authMiddleware,
  requireRole(['admin', 'entrenador']),
  getClientes
);
```

### Roles y Permisos

| Rol | Permiso | GET Clientes | CREAR Pago | VER Dashboard | EDITAR Usuario |
|-----|---------|--------------|-----------|---------------|----------------|
| admin | Acceso total | ✅ | ✅ | ✅ | ✅ |
| entrenador | Ver clientes, marcar asistencias | ✅ | ❌ | Limitado | ❌ |
| cliente | Datos propios | ❌ | ✅ (propio) | ❌ | ✅ (propio) |

---

## Estructura de Carpetas

```
mairoverfit/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Modal.jsx
│   │   │   ├── public/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── PlanesCard.jsx
│   │   │   │   ├── ContactForm.jsx
│   │   │   │   └── HorariosTable.jsx
│   │   │   └── admin/
│   │   │       ├── ClientesTable.jsx
│   │   │       ├── PagosForm.jsx
│   │   │       ├── EvaluacionesChart.jsx
│   │   │       └── DashboardKPIs.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Planes.jsx
│   │   │   ├── Servicios.jsx
│   │   │   ├── Horarios.jsx
│   │   │   ├── SobreMi.jsx
│   │   │   ├── Contacto.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Clientes.jsx
│   │   │       ├── Pagos.jsx
│   │   │       ├── Evaluaciones.jsx
│   │   │       ├── Horarios.jsx
│   │   │       └── Reportes.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useApi.js
│   │   │   ├── useFetch.js
│   │   │   └── useForm.js
│   │   │
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   ├── clienteStore.js
│   │   │   ├── uiStore.js
│   │   │   └── notificationStore.js
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js (axios instance)
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── tailwind.config.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   │   ├── logo.png
│   │   ├── favicon.ico
│   │   └── images/
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── .gitignore
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── clientesController.js
│   │   │   ├── planesController.js
│   │   │   ├── horariosController.js
│   │   │   ├── asistenciasController.js
│   │   │   ├── evaluacionesController.js
│   │   │   ├── pagosController.js
│   │   │   ├── contactosController.js
│   │   │   └── dashboardController.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Cliente.js
│   │   │   ├── Plan.js
│   │   │   ├── Horario.js
│   │   │   ├── Asistencia.js
│   │   │   ├── Evaluacion.js
│   │   │   ├── Pago.js
│   │   │   ├── Contacto.js
│   │   │   ├── Log.js
│   │   │   └── Sesion.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── clientesRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── publicRoutes.js
│   │   │   └── index.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   ├── corsMiddleware.js
│   │   │   └── auditMiddleware.js
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── clienteService.js
│   │   │   ├── emailService.js
│   │   │   ├── evolutionApiService.js
│   │   │   ├── n8nService.js
│   │   │   ├── googleDriveService.js
│   │   │   ├── fileUploadService.js
│   │   │   └── reportService.js
│   │   │
│   │   ├── database/
│   │   │   ├── config.js
│   │   │   ├── migrations/
│   │   │   │   ├── 001_create_users.js
│   │   │   │   ├── 002_create_clientes.js
│   │   │   │   └── ...
│   │   │   └── seeders/
│   │   │       └── seed.js
│   │   │
│   │   ├── validators/
│   │   │   ├── authValidator.js
│   │   │   ├── clienteValidator.js
│   │   │   └── ...
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── jwt.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   │
│   │   └── index.js (entry point)
│   │
│   ├── uploads/ (gitignored)
│   ├── logs/ (gitignored)
│   ├── package.json
│   ├── .env.example
│   ├── .env.local (gitignored)
│   └── .gitignore
│
├── .gitignore (root)
├── .github/
│   └── workflows/
│       └── deploy.yml (CI/CD opcional después)
│
└── docs/
    ├── DEPLOYMENT.md
    ├── API_DOCS.md
    └── TROUBLESHOOTING.md
```

---

## Modelos de Datos

### User Model

```javascript
// backend/src/models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('admin', 'entrenador', 'cliente', 'staff'),
      allowNull: false,
      defaultValue: 'cliente'
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo', 'bloqueado'),
      allowNull: false,
      defaultValue: 'activo'
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    foto_perfil_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ultimo_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true // Soft delete
    }
  }, {
    tableName: 'users',
    paranoid: true // Soft delete
  });
};
```

*(Similar pattern para Cliente, Plan, Horario, etc)*

---

## Flujos Principales

### Flujo 1: Cliente Nuevo → Contacto → Conversión

```
1. Cliente rellena formulario en Home → /contacto
   POST /api/v1/contactos
   {
     nombre: "María García",
     email: "maria@gmail.com",
     telefono: "+58 412 1234567",
     objetivo: "Ganar fuerza",
     mensaje: "Quiero empezar en el box"
   }

2. Backend:
   - Valida campos (Joi)
   - Guarda en tabla `contactos` (estado: 'nuevo')
   - Dispara webhook a Evolution API → WhatsApp automático a María
   - Log audit

3. Admin ve contacto nuevo en dashboard
   GET /api/v1/admin/contactos?estado=nuevo

4. Admin contacta a María (vía WhatsApp o email)
   
5. María acepta evaluación
   POST /api/v1/admin/clientes (crear usuario)
   {
     user_id: (new user created),
     email: "maria@gmail.com",
     tipo: "cliente",
     plan_activo_id: 1,
     objetivo: "Ganar fuerza"
   }

6. María recibe email con login credentials
   - Link: https://mairoverfit.com/login
   - Usuario: maria@gmail.com
   - Password: temporal

7. María login y actualiza perfil/foto
   PUT /api/v1/auth/profile

8. María hace evaluación inicial
   POST /api/v1/cliente/evaluaciones
   {
     tipo: "inicial",
     peso_kg: 65,
     altura_cm: 165,
     fotos_antes: [...urls...]
   }

9. Admin ve evaluación en dashboard
   GET /api/v1/admin/evaluaciones?cliente_id=X

10. Contacto marcado como 'convertido'
    PUT /api/v1/admin/contactos/:id
    { estado: 'convertido', usuario_asignado_id: 1 }
```

### Flujo 2: Cliente Paga → Acceso Plan

```
1. Cliente ve planes en /planes
   GET /api/v1/planes

2. Cliente elige plan y paga
   POST /api/v1/cliente/pagos/crear
   {
     plan_id: 1,
     monto: 45,
     metodo: "transferencia"
   }
   → Crea registro con estado: 'pendiente'

3. Admin ve pago pendiente
   GET /api/v1/admin/pagos?estado=pendiente

4. Cliente transfiere dinero (en la vida real)

5. Admin ve comprobante y confirma pago
   POST /api/v1/admin/pagos/:id/confirmar
   {
     metodo: "transferencia",
     referencia_externa: "Trs123456"
   }

6. Backend:
   - Actualiza pago (estado: 'completado')
   - Actualiza cliente: plan_activo_id, estado_membresia: 'activa'
   - Calcula próximo vencimiento (fecha_actual + 30 días)
   - Dispara webhook a N8N → notificación WhatsApp/email
   - Log audit

7. Cliente ya puede reservar clases
   POST /api/v1/cliente/asistencias/reservar
   { horario_id: 5, fecha: "2026-06-01" }
```

### Flujo 3: Admin Gestiona Clientes

```
Admin entra a dashboard:
GET /api/v1/admin/dashboard
← Retorna: total clientes, activos, inactivos, ingresos mes, ocupación clases

Admin ve tabla de clientes:
GET /api/v1/admin/clientes?estado=activo&plan=1
← Retorna: [cliente1, cliente2, ...]

Admin hace click en un cliente:
GET /api/v1/admin/clientes/:id
← Retorna: datos cliente + últimas evaluaciones + asistencias + pagos

Admin actualiza plan de cliente:
PUT /api/v1/admin/clientes/:id
{ plan_activo_id: 2, estado_membresia: 'pausa' }

Admin marca asistencia en clase:
POST /api/v1/admin/asistencias/:id/checkin
{ cliente_id: 1, presente: true }

Admin ve reportes:
GET /api/v1/admin/dashboard/ingresos?mes=5
← Retorna: ingresos, clientes nuevos, retención, etc
```

---

## Deployment en VPS

### Pre-requisitos

```bash
# En tu VPS:
- Ubuntu 20.04 LTS (o superior)
- Node.js 18 LTS instalado
- MySQL 8.0 instalado
- Nginx instalado
- Certbot para SSL
- Git instalado
- User no-root con permisos sudo
```

### 1. Setup Inicial VPS

```bash
# SSH a VPS
ssh user@tu_vps_ip

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar MySQL 8.0
sudo apt install -y mysql-server

# Instalar Nginx
sudo apt install -y nginx

# Instalar Certbot (SSL)
sudo apt install -y certbot python3-certbot-nginx

# Instalar PM2 (global)
sudo npm install -g pm2

# Instalar Git
sudo apt install -y git
```

### 2. Setup Aplicación

```bash
# Clonar repo (asumiendo GitHub)
cd /var/www
git clone https://github.com/tu_usuario/mairoverfit.git
cd mairoverfit

# Backend setup
cd backend
npm install
cp .env.example .env.local
# Editar .env.local con credenciales correctas

# Ejecutar migrations MySQL
npm run migrate

# Seed inicial (opcional)
npm run seed

# Iniciar con PM2
pm2 start src/index.js --name "mairoverfit-api"
pm2 startup
pm2 save

# Frontend setup
cd ../frontend
npm install
npm run build
# Build generado en /frontend/dist
```

### 3. Configurar Nginx

```nginx
# /etc/nginx/sites-available/mairoverfit

# Redirect HTTP a HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name mairoverfit.com www.mairoverfit.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS - Sitio público (React)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name mairoverfit.com www.mairoverfit.com;

    # SSL certificates (Certbot)
    ssl_certificate /etc/letsencrypt/live/mairoverfit.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mairoverfit.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Root para archivos estáticos React
    root /var/www/mairoverfit/frontend/dist;
    index index.html;

    # Servir estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        log_not_found off;
    }

    # Proxy a API Node.js
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }

    # SPA - Fallback a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Denegar acceso a archivos sensibles
    location ~ /\. {
        deny all;
    }
    location ~ ~$ {
        deny all;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/mairoverfit /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar sintaxis
sudo systemctl restart nginx

# Obtener SSL con Certbot
sudo certbot certonly --nginx -d mairoverfit.com -d www.mairoverfit.com
```

### 4. Verificar Servicios

```bash
# MySQL
sudo systemctl status mysql
mysql -u root -p  # Test conexión

# Node.js con PM2
pm2 list
pm2 logs mairoverfit-api

# Nginx
sudo systemctl status nginx
curl -I https://mairoverfit.com

# Firewall
sudo ufw status
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 5. Backups & Monitoring

```bash
# Backup diario MySQL
sudo nano /home/user/backup-mysql.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/backups/mysql"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p$MYSQL_ROOT_PASSWORD \
  mairoverfit > $BACKUP_DIR/mairoverfit_$TIMESTAMP.sql
gzip $BACKUP_DIR/mairoverfit_$TIMESTAMP.sql

# Mantener últimos 7 días
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
```

```bash
# Agregar cron job
crontab -e
# Agregar: 0 2 * * * /home/user/backup-mysql.sh
```

---

## Integraciones Externas

### Evolution API (WhatsApp)

```javascript
// backend/src/services/evolutionApiService.js

const axios = require('axios');

const evolutionAPI = axios.create({
  baseURL: process.env.EVOLUTION_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.EVOLUTION_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function enviarWhatsApp(numero, mensaje) {
  try {
    const response = await evolutionAPI.post('/message/sendText', {
      number: numero,
      text: mensaje
    });
    return response.data;
  } catch (error) {
    console.error('Error Evolution API:', error.message);
    throw error;
  }
}

// Uso en controller:
// Cuando se crea un contacto:
await enviarWhatsApp('+58 412 1234567', 
  `¡Hola María! 🎉 Recibimos tu contacto. Un entrenador te contactará pronto.`
);

module.exports = { enviarWhatsApp };
```

### N8N (Webhooks)

```javascript
// backend/src/services/n8nService.js

async function dispararWebhook(event, data) {
  try {
    await axios.post(process.env.N8N_WEBHOOK_URL, {
      event,
      data,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('N8N webhook error:', error.message);
    // No throw - N8N error no debe bloquear app
  }
}

// Uso:
// Cuando pago se confirma:
await dispararWebhook('pago_confirmado', {
  cliente_id: 1,
  monto: 45,
  plan: 'Max Performance'
});

// N8N ejecuta: enviar email, recordatorio en calendar, etc.
```

### Google Drive (Reportes)

```javascript
// Documentar después de implementación inicial
```

---

## Monitoreo & Mantenimiento

### Logs

```javascript
// backend/src/utils/logger.js
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = JSON.stringify({ timestamp, level, message, ...data });
  
  fs.appendFileSync(path.join(logDir, 'app.log'), logEntry + '\n');
  
  if (level === 'ERROR') {
    fs.appendFileSync(path.join(logDir, 'error.log'), logEntry + '\n');
  }
};

module.exports = { logFile };
```

### Monitoreo PM2

```bash
pm2 install pm2-logrotate
pm2 install pm2-auto-pull  # Auto update from git
pm2 monitor

# Ver métricas en tiempo real
pm2 monit
```

### Health Checks

```javascript
// backend/src/routes/index.js
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Verificar desde VPS:
// curl -I https://mairoverfit.com/health
```

---

## Versionamiento API

Siempre usar `/api/v1/` para permitir breaking changes en futuras versiones.

```
/api/v1/ → Current stable
/api/v2/ → Future si hay cambios breaking
```

---

## Conclusión

Este documento es tu **source of truth** antes de escribir código.

**Próximos pasos:**
1. ✅ Revisar y confirmar este plan
2. ⬜ Crear repos (GitHub)
3. ⬜ Setup inicial VPS (Node, MySQL, Nginx)
4. ⬜ Crear schema BD + migrations
5. ⬜ Desarrollar API endpoints
6. ⬜ Desarrollar componentes React
7. ⬜ Testing manual
8. ⬜ Deploy producción

**Duración estimada:** 6-8 semanas (120-160 horas)

---

*Documento generado: Mayo 2026*  
*Última actualización: [Tu fecha]*
