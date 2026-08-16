# MairoverFit - CHECKLIST PRE-DESARROLLO

**Objetivo:** Validar que todos entendamos el proyecto igual antes de escribir código.

---

## ✅ STACK TECNOLÓGICO

- [ ] **Frontend:** React 18 + Vite + Tailwind CSS ✅
- [ ] **State:** Zustand (lightweight, no Redux) ✅
- [ ] **Backend:** Node.js + Express ✅
- [ ] **Database:** MySQL 8.0 en VPS ✅
- [ ] **ORM:** Sequelize ✅
- [ ] **Auth:** JWT (access 15min + refresh 7d) ✅
- [ ] **Hosting:** Tu VPS actual ✅
- [ ] **Process Manager:** PM2 ✅
- [ ] **Web Server:** Nginx reverse proxy ✅

---

## ✅ ARQUITECTURA

- [ ] **Separación clear:** Frontend (React) ← (JSON REST API) ← Backend (Express)
- [ ] **Nginx:** Sirve React estáticos + proxea /api/ a Node.js:3000
- [ ] **BD:** MySQL en mismo VPS (localhost:3306)
- [ ] **Backup:** Cron job diario MySQL
- [ ] **SSL:** HTTPS con Certbot (obligatorio)
- [ ] **Logs:** Morgan (HTTP), custom logger (app logic)
- [ ] **Monitoring:** PM2 + health check endpoint

---

## ✅ BASE DE DATOS

### Tablas Principales
- [ ] **users** - Autenticación (admin, entrenador, cliente, staff)
- [ ] **clientes** - Info extendida de clientes
- [ ] **planes** - Tipos de membresía (Clase Regular, Max Performance, etc)
- [ ] **horarios** - Schedule del box (día, hora, tipo, entrenador, capacidad)
- [ ] **asistencias** - Reservas y asistencias a clases
- [ ] **evaluaciones** - Mediciones de progreso (peso, medidas, fotos)
- [ ] **pagos** - Transacciones (monto, estado, método)
- [ ] **contactos** - Formularios del sitio público
- [ ] **logs** - Auditoría (quién hizo qué, cuándo)
- [ ] **sesiones** - Token blacklist (logout)

### Características Clave
- [ ] **Soft delete** en users, clientes (deleted_at NULL)
- [ ] **Índices** en campos frecuentemente consultados (email, user_id, fecha, etc)
- [ ] **JSON fields** en tablas como planes (caracteristicas), evaluaciones (fotos)
- [ ] **Timestamps** en todas (created_at, updated_at)
- [ ] **Relaciones** bien definidas (FK constraints)

---

## ✅ API ENDPOINTS

### Auth (Público)
- [ ] POST /api/v1/auth/register
- [ ] POST /api/v1/auth/login
- [ ] POST /api/v1/auth/logout
- [ ] POST /api/v1/auth/refresh-token
- [ ] GET /api/v1/auth/me
- [ ] PUT /api/v1/auth/profile

### Planes (Público)
- [ ] GET /api/v1/planes
- [ ] GET /api/v1/planes/:id

### Horarios (Público + Admin)
- [ ] GET /api/v1/horarios
- [ ] GET /api/v1/horarios/semana (formateado para calendario)

### Admin (Requiere JWT + rol admin/entrenador)
- [ ] CRUD /api/v1/admin/clientes
- [ ] CRUD /api/v1/admin/planes
- [ ] CRUD /api/v1/admin/horarios
- [ ] GET /api/v1/admin/asistencias
- [ ] GET /api/v1/admin/evaluaciones
- [ ] GET /api/v1/admin/pagos
- [ ] GET /api/v1/admin/contactos
- [ ] GET /api/v1/admin/dashboard (KPIs)
- [ ] GET /api/v1/admin/dashboard/ingresos (reportes finanzas)
- [ ] GET /api/v1/admin/reportes/export (CSV/PDF)

### Cliente (Requiere JWT + rol cliente)
- [ ] GET /api/v1/cliente/asistencias (mis clases)
- [ ] POST /api/v1/cliente/asistencias/reservar
- [ ] DELETE /api/v1/cliente/asistencias/:id/cancelar
- [ ] POST /api/v1/cliente/evaluaciones
- [ ] GET /api/v1/cliente/evaluaciones
- [ ] POST /api/v1/cliente/pagos/crear
- [ ] GET /api/v1/cliente/pagos

### Contactos (Público)
- [ ] POST /api/v1/contactos (crear)

### Health (Público)
- [ ] GET /health (verificación simple)

**Total de endpoints:** ~50 bien documentados

---

## ✅ SEGURIDAD

- [ ] **Helmet** - Security headers (HSTS, X-Content-Type-Options, etc)
- [ ] **CORS** - Solo origin: https://mairoverfit.com
- [ ] **Rate limiting** - 100 req/15min por IP
- [ ] **JWT expiration** - 15min (access), 7d (refresh)
- [ ] **Password hashing** - bcryptjs (salt 10)
- [ ] **Input validation** - Joi en controllers
- [ ] **SQL injection prevention** - Sequelize parameterized queries
- [ ] **XSS prevention** - Sanitizar output
- [ ] **Soft delete** - Datos nunca permanentemente borrados
- [ ] **Audit logs** - Log de CREATE, UPDATE, DELETE, LOGIN, PAGO
- [ ] **Bloqueo de cuenta** - 5 intentos fallidos → 15min lock
- [ ] **.env.local gitignored** - Secretos NUNCA en repo
- [ ] **HTTPS obligatorio** - Redirect 80 → 443
- [ ] **Token blacklist** - Logout invalida sesión
- [ ] **Permisos por rol** - Middleware requireRole en cada endpoint

---

## ✅ FLUJOS PRINCIPALES

### Flujo 1: Cliente Nuevo
- [ ] Cliente rellena /contacto (form público)
- [ ] Backend guarda en tabla contactos
- [ ] Dispara Evolution API → WhatsApp a cliente
- [ ] Admin ve contacto en dashboard
- [ ] Admin crea usuario cliente
- [ ] Cliente recibe email con login
- [ ] Cliente hace login + actualiza perfil
- [ ] Cliente hace evaluación inicial
- [ ] Admin ve evaluación en dashboard

### Flujo 2: Cliente Paga
- [ ] Cliente elige plan en /planes
- [ ] Cliente crea pago (metodo, monto)
- [ ] Admin ve pago pendiente en dashboard
- [ ] Admin confirma pago
- [ ] Backend actualiza: plan_activo, estado_membresia='activa'
- [ ] Backend dispara N8N webhook (email, recordatorio)
- [ ] Cliente ya puede reservar clases
- [ ] Cliente reserva clase
- [ ] Capacidad_actual del horario se incrementa

### Flujo 3: Admin Gestiona
- [ ] Admin login → dashboard
- [ ] Ve KPIs: total clientes, activos, ingresos mes
- [ ] Busca cliente por email/nombre
- [ ] Ve evaluaciones, asistencias, pagos del cliente
- [ ] Edita datos cliente
- [ ] Marca asistencias en clase
- [ ] Genera reportes (PDF, CSV)
- [ ] Exporta datos a Google Drive

---

## ✅ INTEGRACIONES EXTERNAS

### Evolution API (WhatsApp)
- [ ] Configurado con tu credencial API
- [ ] Dispara mensajes automáticos en: nuevo contacto, pago confirmado, recordatorio clase
- [ ] Manejo de errores sin bloquear app

### N8N (Webhooks)
- [ ] Webhook endpoint activado
- [ ] Trigger: pago_confirmado → enviar email + calendar reminder
- [ ] Documentación de payload

### Google Drive (Reportes)
- [ ] Service account creado
- [ ] Credenciales en .env
- [ ] Exportar reportes a folder específica

### Email (SMTP)
- [ ] Configurado para: password recovery, bienvenida, notificaciones
- [ ] Template HTML profesionales

---

## ✅ ESTRUCTURA DE CARPETAS

### Frontend
- [ ] /src/components (common, public, admin)
- [ ] /src/pages (Home, Planes, Login, admin/Dashboard)
- [ ] /src/hooks (useAuth, useApi, useFetch)
- [ ] /src/store (Zustand stores)
- [ ] /src/utils (api client, validators, helpers)
- [ ] /src/styles (Tailwind config)

### Backend
- [ ] /src/controllers (authController, clientesController, etc)
- [ ] /src/models (Sequelize models)
- [ ] /src/routes (authRoutes, adminRoutes, etc)
- [ ] /src/middleware (auth, validation, errorHandler)
- [ ] /src/services (integración Evolution, N8N, email)
- [ ] /src/database (config, migrations, seeders)
- [ ] /src/validators (schemas Joi)
- [ ] /src/utils (logger, jwt, helpers)

---

## ✅ DEPLOYMENT

### VPS Setup
- [ ] Ubuntu 20.04 LTS
- [ ] Node.js 18 LTS
- [ ] MySQL 8.0
- [ ] Nginx
- [ ] PM2
- [ ] Certbot (SSL)

### Configuración
- [ ] Nginx reverse proxy (80 → 443, /api proxy)
- [ ] PM2 startup script
- [ ] Cron job backup MySQL (diario)
- [ ] Firewall UFW (22, 80, 443)
- [ ] Variables de entorno (.env.local)
- [ ] SSL con Certbot (auto-renew)

### Health Check
- [ ] GET /health endpoint
- [ ] Monitoring PM2
- [ ] Logs rotados (pm2-logrotate)

---

## ✅ DECISIONES CONFIRMADAS

1. **¿Lenguaje?** React + Node.js ✅
2. **¿Base de datos?** MySQL en mismo VPS ✅
3. **¿Escalabilidad?** Suficiente para 500+ clientes ✅
4. **¿Mantenimiento?** Bajo (no exceso de frameworks/librerías) ✅
5. **¿TypeScript?** No por ahora (agregable después) ✅
6. **¿Testing?** MVP sin tests formales ✅

---

## 📋 CHECKLIST PARA LADY

### Antes de empezar código:

1. **BD:** ¿Confirmas tablas y relaciones?
   - [ ] Sí, como está documentado
   - [ ] Necesito cambiar algo:  _______________

2. **API:** ¿Están todos los endpoints que necesitas?
   - [ ] Sí
   - [ ] Falta: _______________

3. **Flujos:** ¿Los flujos principales cubren tu modelo de negocio?
   - [ ] Sí
   - [ ] Cambio needed: _______________

4. **Seguridad:** ¿Te conforma el nivel de seguridad?
   - [ ] Sí
   - [ ] Necesito más: _______________

5. **VPS:** ¿Tienes acceso SSH y credenciales MySQL?
   - [ ] Sí, tengo: _______________
   - [ ] No, necesito configurar

6. **Dominios:** ¿Dominio apunta a tu VPS?
   - [ ] Sí, registrado en: _______________
   - [ ] No, necesito help

7. **Integraciones:** ¿Tienes credenciales de Evolution API?
   - [ ] Sí
   - [ ] No, te paso después

8. **Timeline:** ¿6-8 semanas te parece realista?
   - [ ] Sí
   - [ ] Necesito más rápido/lento: _______________

---

## ⚠️ RIESGOS IDENTIFICADOS

| Riesgo | Impacto | Mitigación |
|--------|---------|-----------|
| Cambios scope mid-proyecto | Alto | Documentar requisitos ahora |
| Pérdida BD sin backup | Crítico | Cron backup diario + GDrive |
| Integración Evolution API | Medio | Testing con número de prueba |
| Performance con muchos clientes | Bajo | Índices BD, caching React |
| SSL certificate expirado | Alto | Certbot auto-renew habilitado |
| Servidor cae | Medio | PM2 restart automático |

---

## 📝 SIGUIENTE PASO

Una vez confirmes todo arriba, arrancaremos con:

**FASE 0 - SETUP INICIAL:**
1. Crear repos GitHub (frontend + backend)
2. Setup inicial VPS (Node, MySQL, Nginx)
3. Crear schema BD + migrations
4. Estructura carpetas base

**Duración:** 2-3 días de trabajo

¿Confirmas todo el documento arriba?

---

*Generado: Mayo 2026*
*Status: PENDIENTE CONFIRMACIÓN*
