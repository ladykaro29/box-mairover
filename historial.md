# Historial de Proyecto - MairoverFit Web Rediseño

Este archivo contiene el historial completo y detallado del desarrollo, las decisiones de diseño y las especificaciones técnicas del proyecto **MairoverFit**. Sirve como punto de referencia único y memoria persistente para asegurar la coherencia estética y técnica en futuras iteraciones.

---

## 📋 1. DESCRIPCIÓN GENERAL DEL PROYECTO
**MairoverFit** es el sitio web oficial y plataforma de gestión para el Box de CrossFit y Asesoría Nutricional liderado por la coach **Mauroly Mercado**. Combina una sección pública altamente premium de mercadotecnia con un área privada (Dashboard de Administración e interfaz de cliente para reservas, asistencias y pagos).

*   **Enfoque de Rediseño:** Lograr una fidelidad del 100% respecto a los mockups visuales corporativos, utilizando un diseño sofisticado de doble tono (secciones oscuras en azul profundo contrastadas con secciones de contenido limpias en blanco y gris claro).

---

## 🛠️ 2. STACK TECNOLÓGICO
*   **Frontend (Cliente):** React SPA (v18+) construido con **Vite 5+** y **Tailwind CSS v4** (a través de `@tailwindcss/vite`).
*   **Gestión de Formularios:** `react-hook-form` con validaciones nativas.
*   **Backend (Servidor):** Node.js + **Express 4.18+** sirviendo una API JSON REST en el puerto `3000`.
*   **Base de Datos & ORM:** **MySQL 8.0** gestionado con **Sequelize 6+** (soporte de migraciones, modelos y relaciones).
*   **Gestión de Procesos:** PM2 para mantener los servidores locales en ejecución persistente.

---

## 🎨 3. SISTEMA DE DISEÑO & GUÍAS VISUALES
### Paleta de Colores Corporativa
Las variables de color están mapeadas en la directiva `@theme` dentro de `frontend/src/index.css`:
*   **Coral de Acento (Primary):** `#E85D4E` (usado para CTAs principales, textos destacados, insignias y acentos).
*   **Fondo Oscuro de Contraste:** Gradiente desde el Azul Profundo `#071628` pasando por el `#09203a` hasta el `#0d2d52`.
*   **Fondo Claro de Contenido:** `#F9F9FA` o `white` (usado para cuadrículas de servicios, tablas de horarios e inputs).
*   **Textos:** Blanco/Gris Claro (`#C2C0B6` o `white`) en fondos oscuros y Azul Profundo/Negro (`#071628` o `#000000`) en fondos claros.

### Estilo de Componentes
*   **Tipografía:** Fuentes premium sin serifas (Sans-serif) con jerarquía clara (títulos extra-gruesos con interletrado ajustado).
*   **Bordes Redondeados:** Redondeo intermedio (`rounded-xl` o `rounded-2xl`) en tarjetas, inputs y botones de formulario para dar un aspecto moderno. Los botones globales de acción (*CTAs*) son de estilo pastilla (`rounded-full`).
*   **Interactividad:** Animaciones sutiles de entrada (`animate-[fadeIn_0.5s_ease-out]`) y elevación en tarjetas al pasar el cursor (`hover:-translate-y-1 transition-all duration-300`).
*   **Iconografía:** Eliminación total de emojis genéricos en la parte pública, utilizando únicamente iconos vectoriales **SVG** estilizados y de líneas finas.

---

## 🚀 4. HITOS DE REDISEÑO COMPLETADOS (HISTORIAL DE VISTAS)

### 📌 Navbar (`Navbar.jsx`)
*   **Logotipo Premium:** Incorpora el nombre corporativo **MAIROVERFit** (con el "Fit" destacado en coral) junto al isotipo de 3 ondas SVG color coral que representa dinamismo y movimiento.
*   **Enlaces de Navegación:** Actualizados a: `INICIO`, `SOBRE MÍ`, `SERVICIOS`, `PLANES`, `HORARIOS`, `COMUNIDAD` y `CONTACTO`.
*   **CTAs & Redes:** Añadida sección de redes sociales en el extremo derecho (Instagram, Facebook, WhatsApp) y un botón de acción rápida y angular en color coral: **ASESORÍA GRATUITA**.

### 📌 Inicio (`Home.jsx`)
*   **Hero de Impacto:** Pantalla dividida con imagen premium de deportista CrossFit de alta resolución y superposición de textos gigantes corporativos.
*   **Barra de Estadísticas KPI Flotante:** Bloque azul marino superpuesto sobre el límite inferior del Hero que detalla los logros reales del box (`+300 Clientes`, `+5 Años`, `100% Personalizado`, `+90% Satisfacción`).
*   **Sección Estilo de Vida:** Tarjeta clara con viñetas de marca y un botón interactivo circular de estilo multimedia de CrossFit.

### 📌 Sobre Mí (`SobreMi.jsx`)
*   **Diploma CrossFit Level 1 en HTML/CSS:** Simulación exacta de un certificado oficial enmarcado con borde punteado de acento coral, texto caligráfico y firmas, acompañado de dos certificados menores en rejilla (Nutrición y Halterofilia).
*   **Biografía & Valores:** Cronología fotográfica del equipo de entrenadores y tarjetas de los pilares del box (Constancia, Disciplina, Comunidad, Respeto y Honestidad).

### 📌 Servicios (`Servicios.jsx`)
*   **Asymmetric Grid (Rejilla Asimétrica):** Organización estética de los 7 servicios (4 arriba y 3 abajo) utilizando emojis e iconos especiales.
*   **Línea de Progreso en 4 Pasos:** Cronología visual numerada detallando el viaje de transformación del cliente.
*   **Pricing Sidebar Unifier:** Sección final que unifica e introduce de forma limpia el salto a la sección de membresías.

### 📌 Planes y Tarifas (`Planes.jsx`)
*   **Membresías Presenciales:** 5 planes principales destacando el plan **Max Performance** con una insignia coral superior de "Más Popular".
*   **Sidebar de Otras Membresías:** Panel lateral que detalla pases diarios, clases de prueba y cuotas de inscripción.
*   **Planes Virtuales:** 3 tarjetas estilizadas de asesorías online con desglose de servicios.

### 📌 Comunidad (`Comunidad.jsx` - ¡NUEVA VISTA!)
*   **Propósito:** Creada desde cero y enlazada en las rutas de React (`App.jsx`) para mostrar la vida social e identidad del box.
*   **Sección Antes/Después:** Comparación de progreso real (Daniela R. y Andrea L.) con detalles de peso, porcentaje de grasa y porcentaje de músculo ganado.
*   **Rejilla Etapas de Edad:** Columnas dedicadas a CrossFit Kids (Niños), CrossFit Regular (Adultos) y Active Aging (Adultos Activos).

### 📌 Contacto (`Contacto.jsx` - ¡Rediseño de Alta Fidelidad!)
*   **Hero Tridimensional en 3 Columnas (`lg:grid-cols-12`):**
    *   *Columna Izquierda:* Textos de llamado a la acción, botones redondos con SVG de WhatsApp y Agenda, y fila de características estilizadas con SVGs.
    *   *Columna Central:* Fotografía vertical recortada de Mairover con máscara de gradiente de desvanecimiento hacia la base para simular integración 3D.
    *   *Columna Derecha:* Panel flotante translúcido "Conéctate conmigo" con desenfoque de fondo (*backdrop-blur-md*) e iconos SVG vectoriales de contacto y horarios de atención.
*   **Botón de Envío Geométrico:** Botón del formulario con bordes `rounded-xl` que coinciden perfectamente con los inputs, y el icono de plano de papel posicionado de forma absoluta en el extremo derecho.
*   **Sustitución Completa de Emojis por SVGs Premium:**
    *   *Sección Servicios:* Mancuerna horizontal (CrossFit), silueta infantil activa (CrossFit Kids), corredor (Funcionales), escudo hexagonal personalizado con el texto grabado (HYROX), silueta doble de coach y atleta (Entrenamiento Personal), y manzana silueteada con hoja (Nutrición).
    *   *Sección Horarios:* Iconos limpios de Calendario (Mañana), Sol con rayos (Tarde-Noche) y Reloj (Sábados).
*   **Bottom CTA & Footer:** Capa de ondas vectoriales decorativas detrás del perfil inferior de la coach y actualización dinámica del año de copyright `{new Date().getFullYear()}`.

### 📌 Horarios y Calendario (`Horarios.jsx` - ¡Rediseño de Alta Fidelidad 100% Mockup!)
*   **Hero Section Dinámico:** Titular corporativo gigante (`ORGANIZA TU SEMANA`), CTAs en pastilla (`RESERVAR MI CLASE` con scroll suave y `HABLAR POR WHATSAPP`), fila de 3 insignias vectoriales (*Horarios flexibles*, *Clases por nivel*, *Presencial y personalizado*) y fotografía recortada con anillos de ondas concéntricas de fondo.
*   **Matriz Semanal Gráfica Interactiva:** Replicación al 100% del mockup corporativo (`calendario de la semana.png`) con paleta de colores pasteles premium diferenciada por disciplina (CrossFit, CrossFit Kids, Funcionales, Hyrox, Entrenamiento Personal, Asesoría Nutricional, Bienestar Físico y Open Box).
*   **Adaptabilidad Responsive:** Selector rápido por días para pantallas móviles y vista completa matricial para escritorios y tablets.
*   **Horarios por Categoría:** 6 tarjetas estilizadas con SVGs vectoriales que desglosan los turnos exactos por disciplina deportiva y botón directo de consulta a WhatsApp.
*   **Horario General del Box:** 3 tarjetas en Azul Profundo (`#071628`) para las franjas horarias de Mañana, Tarde/Noche y Sábados.
*   **Banner Inferior CTA & Modal de Turnos:** Llamado a la acción con integración directa de WhatsApp prellenado con la clase y hora elegida, además de enlace al portal privado del cliente.

---

## 🌐 5. PERSISTENCIA DE CONTACTOS Y ENDPOINTS PÚBLICOS
*   **Modelo `Contacto`** (`backend/src/models/Contacto.js`): tabla `contactos` con soporte de `nombre`, `telefono`, `email`, `servicio`, `objetivo`, `mensaje`, `status` y soft deletes (`paranoid: true`).
*   **Endpoint Público `POST /api/v1/contactos`:** conecta el formulario de `Contacto.jsx` directamente con Express y MySQL/SQLite para registrar nuevos prospectos.
*   **Endpoint Público `GET /api/v1/horarios`:** permite consultar la disponibilidad de clases de forma pública.
*   **Panel Administrativo de Contactos:** endpoints protegidos `GET /api/v1/admin/contactos` y `PUT /api/v1/admin/contactos/:id` para que la administración gestione y actualice el estatus de cada lead.

---

## 🔐 5. AUTENTICACIÓN (JWT) — IMPLEMENTADA

### Backend
*   **Modelo `Usuario`** (`backend/src/models/Usuario.js`): tabla `usuarios` con `name`, `email` (único, normalizado a minúsculas), `password` (hash **bcrypt**, 10 rondas, vía hook `beforeSave`), `role` (`admin` | `cliente`), `status`, `lastLogin` y `clienteId` (enlace opcional a la ficha del box). El `defaultScope` **excluye siempre el hash**; el login usa el scope `withPassword`.
*   **Tokens** (`backend/src/utils/tokens.js`): access token (`JWT_SECRET`, 2h) + refresh token (`JWT_REFRESH_SECRET`, 7d).
*   **Middleware** (`backend/src/middleware/auth.js`): `authenticate` (valida el Bearer token y carga `req.user`; devuelve `code: TOKEN_EXPIRED` cuando caduca) y `authorize('admin')` para restringir por rol.
*   **Endpoints** (`/api/v1/auth`): `POST /register`, `POST /login`, `POST /refresh` (públicos); `GET /me`, `PUT /password`, `POST /logout` (con sesión).
*   **Panel protegido:** `adminRoutes.js` aplica `router.use(authenticate, authorize('admin'))`, por lo que **todo** `/api/v1/admin/*` exige rol admin.
*   **Seguridad aplicada:** el rol nunca se acepta desde el body (registro siempre `cliente`), mensaje de error idéntico para usuario inexistente y contraseña incorrecta (evita enumerar cuentas) y mínimo de 8 caracteres.
*   **Sembrado:** al arrancar se crea la cuenta admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) y una cuenta de cliente por cada ficha existente (`SEED_CLIENT_PASSWORD`).

### Frontend
*   **`utils/authApi.js`:** `tokenStore` (token, refreshToken y usuario en `localStorage`) + `authApi` con mensajes de error en español.
*   **`context/AuthProvider.jsx` + `hooks/useAuth.js`:** sesión global; revalida el token con `GET /auth/me` al montar y **no** cierra sesión ante fallos de red.
*   **`components/common/ProtectedRoute.jsx`:** protege rutas por rol, recuerda el destino original y redirige a `/login`.
*   **`utils/api.js`:** interceptor que adjunta el JWT, renueva el token una sola vez ante `TOKEN_EXPIRED` y reintenta. El respaldo con datos locales **solo** actúa si el servidor no responde (nunca enmascara un 401/403/500).
*   **Vistas:** `/login` y `/register` conectados al contexto (redirigen según el rol), nueva vista `/mi-cuenta` (estado de membresía + cambio de contraseña) y navbar con acceso dinámico (ACCEDER / MI CUENTA / PANEL).

### Corrección de arranque
El `index.js` cargaba las rutas —y con ellas los modelos de Sequelize— **antes** de decidir el dialecto, por lo que el fallback a SQLite nunca se activaba. Ahora la API y el fallback SPA se montan dentro de `startServer()`, después de `initializeDatabase()`. Se añadió la dependencia `sqlite3`.

---

## 🔒 6. REGLAS ARQUITECTÓNICAS Y COMPROMISOS
1.  **Integración de la API:** Al modificar el frontend de contacto u horarios, **nunca** se deben eliminar o renombrar los hooks de validación (`react-hook-form`), los nombres de los atributos en los campos de entrada (`nombre`, `telefono`, `email`, etc.), ni los endpoints del backend (`POST /api/v1/contactos`), asegurando que la conexión y persistencia con Express y MySQL nunca se rompa.
2.  **Reglas de ESLint:** Evitar la re-declaración de variables externas y evitar la mutación directa de estados de React de forma síncrona dentro de `useEffect` para prevenir warnings en la compilación.
3.  **Compilación Limpia:** Antes de finalizar cualquier cambio estético, es obligatorio verificar que no existan errores sintácticos ejecutando la compilación del frontend (`npm run build:frontend`), asegurando un bundle limpio en `frontend/dist`.
