# MairoverFit - Workflow Completo: Antigravity + Git + EasyPanel + Diseño Fiel

**Objetivo:** Integrar Antigravity como gestor visual BD, mantener Git como source of truth, y desplegar en EasyPanel sin perder el diseño.

---

## 📋 ÍNDICE

1. [Workflow General](#workflow-general)
2. [Antigravity - Gestión de BD](#antigravity---gestión-de-bd)
3. [Git Workflow Local → Producción](#git-workflow-local--producción)
4. [EasyPanel Deployment](#easypanel-deployment)
5. [Animaciones & Diseño Fiel](#animaciones--diseño-fiel)
6. [Proceso Desarrollo (Día a Día)](#proceso-desarrollo-día-a-día)

---

## Workflow General

```
Tu PC (Windows 10):
├─ VSCode
├─ Git (local)
├─ Node.js / React (dev server)
├─ MySQL (local o remoto)
└─ Antigravity (gestor visual BD)
         ↓ (git push)
GitHub/GitLab:
├─ frontend/ repo
├─ backend/ repo
└─ docs/ repo
         ↓ (git pull)
EasyPanel (VPS):
├─ Production frontend (Node.js)
├─ Production backend (Node.js)
└─ MySQL database
```

### Key Points:

1. **Tu PC:** Desarrollo local. Antigravity es SOLO para visualizar/gestionar BD.
2. **Git:** Source of truth. NUNCA commitear /node_modules, .env.local, uploads/
3. **EasyPanel:** Servidor VPS. Pull automático del repo, restart servicios.

---

## Antigravity - Gestión de BD

### ¿Qué es Antigravity?

Antigravity es un **gestor visual de bases de datos**. En MairoverFit lo usaremos para:

1. **Visualizar tablas y relaciones** (diseño ER)
2. **Crear/editar registros** de forma manual (testing, seed data)
3. **Exportar datos** (backup, CSV)
4. **Ver estadísticas** (queries, performance)

### NO lo usamos para:

- ❌ Generar código (eso lo hace Sequelize)
- ❌ Reemplazar Git (Git es source of truth)
- ❌ Producción directa (solo para desarrollo)

---

### Instalación Antigravity en tu PC

```bash
# 1. En tu PC, en carpeta del proyecto
cd C:\Users\[tu_user]\mairoverfit

# 2. Instalar Antigravity CLI (global)
npm install -g @antigravity/cli

# 3. Inicializar Antigravity en el proyecto
antigravity init

# Responder preguntas:
# - Database host: localhost
# - Database port: 3306
# - Database user: root
# - Database password: [tu_password]
# - Database name: mairoverfit
# - Output folder: backend/src/models

# Genera:
# - .antigravity.json (config, gitignore este)
# - backend/src/models/ (archivos generados)

# 4. Verificar conexión
antigravity test

# Debería retornar: "✓ Connected to mairoverfit database"
```

### Workflow Antigravity (Día a Día)

```bash
# Cuando haces cambios en BD (agregar tabla, campo):

# Option 1: Antigravity CLI (recomendado)
antigravity sync        # Sincroniza BD con Antigravity
antigravity generate    # Genera/actualiza models
git diff                # Verifica qué cambió
git add backend/src/models/
git commit -m "chore: update Sequelize models from BD"

# Option 2: Antigravity GUI (visual)
antigravity ui          # Abre interfaz gráfica en localhost:8000
# Edita tablas/campos visualmente
# Antigravity auto-sync con BD
# Luego ejecutar: antigravity generate

# En Git:
git add backend/src/models/
git commit -m "chore: update models"
```

### Estructura Antigravity

```
.antigravity.json           (CONFIG - GITIGNORE)
├─ database: "mairoverfit"
├─ host: "localhost"
├─ models_path: "backend/src/models"
└─ sync_mode: "auto"

backend/src/models/         (GENERADO - Sequelize models)
├─ User.js
├─ Cliente.js
├─ Plan.js
├─ Horario.js
├─ Asistencia.js
├─ Evaluacion.js
├─ Pago.js
├─ Contacto.js
├─ Log.js
└─ Sesion.js
```

### .gitignore - MUY IMPORTANTE

```bash
# .gitignore (root)

# Antigravity
.antigravity.json
.antigravity/
antigravity.log

# Node modules
node_modules/
package-lock.json
yarn.lock

# Env
.env.local
.env.*.local
!.env.example

# Logs
logs/
*.log
npm-debug.log*

# Builds
dist/
build/
.next/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Uploads (archivos subidos)
backend/uploads/
frontend/public/uploads/

# Temporal
tmp/
temp/
*.tmp
```

---

## Git Workflow: Local → Producción

### Estructura Repos

```
GitHub / GitLab:
├─ mairoverfit-frontend    (React SPA)
├─ mairoverfit-backend     (Node.js API)
└─ mairoverfit-docs        (documentación, specs)
```

### Inicializar Repos en tu PC

```bash
# Frontend
cd C:\Users\[tu_user]\mairoverfit\frontend
git init
git add remote origin https://github.com/tu_usuario/mairoverfit-frontend.git
git add .
git commit -m "initial: React project scaffold"
git push -u origin main

# Backend
cd C:\Users\[tu_user]\mairoverfit\backend
git init
git add remote origin https://github.com/tu_usuario/mairoverfit-backend.git
git add .
git commit -m "initial: Node.js project scaffold"
git push -u origin main

# Docs (opcional)
cd C:\Users\[tu_user]\mairoverfit\docs
git init
git add remote origin https://github.com/tu_usuario/mairoverfit-docs.git
git add .
git commit -m "initial: project documentation"
git push -u origin main
```

### Branch Strategy

```
main/master          (PRODUCCIÓN)
  ↑ (merge when tested)
develop              (staging)
  ↑ (merge features)
feature/[name]       (feature branches)
├─ feature/auth-jwt
├─ feature/clientes-crud
├─ feature/horarios-calendario
└─ ...
```

### Día a Día: Git Workflow

```bash
# Comenzar a trabajar en feature nueva

# 1. Actualizarte con develop
cd backend
git checkout develop
git pull origin develop

# 2. Crear feature branch
git checkout -b feature/clientes-crud
# Ejemplo: feature/clientes-crud, feature/auth-jwt, feature/horarios

# 3. Hacer cambios en tu PC
# Editar archivos, agregar controllers, models, etc

# 4. Verificar cambios
git status       # Ver archivos modificados
git diff         # Ver líneas exactas que cambiaron

# 5. Commits claros (un cambio = un commit)
git add backend/src/controllers/clientesController.js
git commit -m "feat: implement getClientes endpoint"

git add backend/src/models/Cliente.js
git commit -m "chore: update Cliente model from BD changes"

git add backend/src/routes/adminRoutes.js
git commit -m "feat: add admin/clientes routes"

# 6. Subir branch a GitHub
git push origin feature/clientes-crud

# 7. En GitHub:
# - Create Pull Request (PR)
# - Describe cambios
# - Esperar code review (si trabajas con team)
# - Merge a develop

# 8. Pull en tu PC
git checkout develop
git pull origin develop

# 9. Cuando todo está listo en develop
git checkout main
git pull origin main
git merge develop
git push origin main
# → EasyPanel detecta push y REDEPLOY automático
```

### Commits Semánticos (Buena Práctica)

```bash
feat:       Nueva feature        (feat: add login endpoint)
fix:        Bug fix              (fix: validation error on form)
chore:      Mantenimiento        (chore: update dependencies)
refactor:   Reescribir código    (refactor: simplify auth logic)
style:      Formato/estilos      (style: update Tailwind config)
docs:       Documentación        (docs: add API endpoint docs)
test:       Tests                (test: add auth tests)
perf:       Performance          (perf: optimize DB queries)
ci:         CI/CD                (ci: add GitHub Actions)
```

### Ignorar Archivos Sensibles

```bash
# CRÍTICO: Estos NUNCA van a Git

# 1. Variables de entorno
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore

# 2. Node modules
echo "node_modules/" >> .gitignore

# 3. Antigravity config
echo ".antigravity.json" >> .gitignore
echo ".antigravity/" >> .gitignore

# 4. Uploads (archivos subidos por usuarios)
echo "backend/uploads/" >> .gitignore
echo "frontend/public/uploads/" >> .gitignore

# 5. Logs
echo "logs/" >> .gitignore
echo "*.log" >> .gitignore

# 6. Builds
echo "dist/" >> .gitignore
echo "build/" >> .gitignore

# Pero SÍ incluir:
# - .env.example     (plantilla sin secretos)
# - package.json     (dependencias)
# - código fuente
```

### Conectar GitHub con Deploy Automático

En EasyPanel, configuraremos un webhook para que:

```
Push a main branch en GitHub
  ↓
Webhook dispara
  ↓
EasyPanel recibe notificación
  ↓
git pull origin main
  ↓
npm install (si hay nuevas dependencias)
  ↓
Reiniciar servicios (Node.js, etc)
  ↓
Sitio actualizado en vivo
```

---

## EasyPanel Deployment

### Pre-requisitos

1. **Tu VPS** con EasyPanel instalado (ya tienes)
2. **Git instalado en VPS**
3. **GitHub SSH keys** o GitHub token en VPS
4. **Node.js y MySQL** en VPS

### Workflow EasyPanel

#### Paso 1: Crear Applications en EasyPanel

```
EasyPanel UI:
├─ Applications
│  ├─ "mairoverfit-frontend"
│  │  ├─ Git Repo: https://github.com/tu_usuario/mairoverfit-frontend.git
│  │  ├─ Branch: main
│  │  ├─ Build command: npm run build
│  │  ├─ Start command: npm run preview (o tu server)
│  │  ├─ Port: 3000
│  │  └─ Environment: NODE_ENV=production
│  │
│  └─ "mairoverfit-backend"
│     ├─ Git Repo: https://github.com/tu_usuario/mairoverfit-backend.git
│     ├─ Branch: main
│     ├─ Build command: npm install
│     ├─ Start command: pm2 start src/index.js --name api
│     ├─ Port: 3001
│     └─ Environment: NODE_ENV=production
│
└─ Databases
   └─ "mairoverfit"
      ├─ Type: MySQL 8.0
      ├─ Root password: [configurado]
      └─ Database: mairoverfit
```

#### Paso 2: Setup Git SSH en VPS

```bash
# En EasyPanel Terminal:

# 1. Generar SSH key
ssh-keygen -t ed25519 -C "easypanel@mairoverfit" -f ~/.ssh/easypanel_key -N ""

# 2. Ver public key
cat ~/.ssh/easypanel_key.pub

# 3. Copiar en GitHub:
# Settings → SSH and GPG Keys → New SSH Key
# Pegar contenido

# 4. Agregar private key a EasyPanel:
# En EasyPanel UI → Settings → SSH Keys
# Agregar la private key generada
```

#### Paso 3: Configurar Webhooks en GitHub

```
GitHub:
Repository → Settings → Webhooks → Add webhook

Payload URL:     https://easypanel.tu_vps.com/api/webhooks/github
Content type:    application/json
Events:          Push events
Branch filter:   main
Active:          ✓

Cada push a main → EasyPanel redeploy automático
```

#### Paso 4: Desplegar en EasyPanel

```bash
# En EasyPanel UI:

# Frontend:
1. Click "mairoverfit-frontend"
2. Click "Deploy"
3. Espera 2-3 min
4. Verifica en https://mairoverfit.com

# Backend:
1. Click "mairoverfit-backend"
2. Click "Deploy"
3. Espera 1-2 min
4. Verifica GET https://mairoverfit.com/api/v1/health → {"status": "ok"}
```

#### Paso 5: Monitoreo en EasyPanel

```
EasyPanel UI:
├─ Logs
│  ├─ Frontend logs
│  └─ Backend logs
├─ Metrics
│  ├─ CPU usage
│  ├─ Memory
│  └─ Disk
├─ Services status
│  ├─ Node.js (frontend)
│  ├─ Node.js (backend)
│  └─ MySQL
```

### Diagrama: Git → EasyPanel

```
Tu PC:
$ git push origin main
       ↓
GitHub:
Recibe push
       ↓
Webhook trigger
       ↓
EasyPanel:
Recibe notificación
       ↓
VPS (EasyPanel):
$ git pull origin main
$ npm install (si hay cambios package.json)
$ npm run build (frontend)
$ pm2 restart api (backend)
       ↓
mairoverfit.com ACTUALIZADO EN VIVO
```

---

## Animaciones & Diseño Fiel

### 100% Respeto al Diseño

**PRINCIPIO:** El diseño que tienes en las imágenes es CANON. No cambiaremos:
- Colores (Naranja #E85D4E, Negro, Gris)
- Tipografía
- Espaciado
- Layout
- Componentes

### Implementación en React + Tailwind

#### Paso 1: Color Palette en Tailwind

```javascript
// frontend/tailwind.config.js

export default {
  theme: {
    extend: {
      colors: {
        // MairoverFit Brand Colors
        primary: {
          50: '#FFF5F0',
          100: '#FFE5DA',
          200: '#FFD1BB',
          300: '#FFC3A3',
          400: '#F5A584',
          500: '#E85D4E',  // PRIMARY CORAL
          600: '#D64A3E',
          700: '#B83C33',
          800: '#8B2D27',
          900: '#5C1F1C'
        },
        dark: {
          50: '#F8F6F3',
          100: '#E8E5E0',
          200: '#D1CCC5',
          300: '#A8A29A',
          400: '#807970',
          500: '#3D3D3A',  // DARK TEXT
          600: '#2C2C2A',
          700: '#1A1A18',
          800: '#0F0F0D',
          900: '#000000'
        },
        accent: {
          gray: '#73726C',
          'gray-light': '#C2C0B6'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
      },
      spacing: {
        // Escala de espaciado (4px base)
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
      },
      animation: {
        // Animaciones propias (ver sección abajo)
        fadeIn: 'fadeIn 0.3s ease-in',
        slideUp: 'slideUp 0.4s ease-out',
        slideDown: 'slideDown 0.4s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

#### Paso 2: Componentes Reutilizables (Color Exacto)

```jsx
// frontend/src/components/common/Button.jsx

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) {
  const baseStyles = 'font-semibold rounded transition-all duration-200 cursor-pointer';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    dark: 'bg-dark-500 text-white hover:bg-dark-600',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Uso:
// <Button variant="primary">ASESORÍA GRATUITA</Button>
// <Button variant="secondary">VER PLANES</Button>
```

#### Paso 3: Animaciones CSS

```css
/* frontend/src/styles/animations.css */

/* Fade in al cargar página */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide up desde abajo */
@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Slide down desde arriba */
@keyframes slideDown {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Hover effect en tarjetas */
@keyframes cardHover {
  from {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  to {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
}

/* Pulse suave */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Aplicar a componentes */
.hero-title {
  animation: fadeIn 0.6s ease-out, slideUp 0.6s ease-out;
  animation-delay: 0.2s;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  animation: cardHover 0.3s forwards;
}

.cta-button {
  animation: pulse 2s infinite;
}
```

#### Paso 4: Componentes con Animaciones

```jsx
// frontend/src/components/public/HeroSection.jsx

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animación cuando componente carga
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen bg-dark-900 overflow-hidden">
      {/* Background blur decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 
          className={`
            text-5xl md:text-6xl font-bold text-white mb-6
            transition-all duration-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          CONTÁCTANOS
        </h1>

        <p 
          className={`
            text-xl text-gray-300 mb-8 max-w-2xl text-center
            transition-all duration-500 delay-100
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          Hablemos de tu meta. Estoy aquí para orientarte y ayudarte a dar el siguiente paso.
        </p>

        <button 
          className={`
            bg-primary-500 text-white px-8 py-3 rounded font-semibold
            hover:bg-primary-600 transition-all duration-300
            transform hover:scale-105 hover:shadow-lg
            transition-all duration-500 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          ASESORÍA GRATUITA
        </button>
      </div>
    </div>
  );
}
```

#### Paso 5: Animaciones en Calendario Horarios

```jsx
// frontend/src/components/public/HorariosTable.jsx

export function HorariosTable({ horarios }) {
  const [selectedDia, setSelectedDia] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleDiaClick = (dia) => {
    setAnimate(false);
    setTimeout(() => {
      setSelectedDia(dia);
      setAnimate(true);
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Selector de días */}
      <div className="grid grid-cols-7 gap-2">
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia, idx) => (
          <button
            key={dia}
            onClick={() => handleDiaClick(idx)}
            className={`
              p-3 rounded-lg font-semibold transition-all duration-300
              ${selectedDia === idx 
                ? 'bg-primary-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-dark-500 hover:bg-gray-200'
              }
            `}
          >
            {dia.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Tabla horarios animada */}
      <div className={`
        transition-all duration-500 transform
        ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
      `}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 font-bold text-dark-500">Hora</th>
              <th className="text-left p-4 font-bold text-dark-500">Clase</th>
              <th className="text-left p-4 font-bold text-dark-500">Entrenador</th>
              <th className="text-left p-4 font-bold text-dark-500">Capacidad</th>
            </tr>
          </thead>
          <tbody>
            {horarios
              .filter(h => h.dia_semana === selectedDia)
              .map((horario, idx) => (
                <tr 
                  key={horario.id}
                  className={`
                    border-b hover:bg-gray-50 transition-colors duration-200
                    transform transition-all duration-500
                    ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <td className="p-4">{horario.hora_inicio}</td>
                  <td className="p-4 font-semibold text-primary-500">{horario.tipo_clase}</td>
                  <td className="p-4">{horario.entrenador}</td>
                  <td className="p-4">{horario.capacidad_actual}/{horario.capacidad_maxima}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## Proceso Desarrollo (Día a Día)

### Lunes (Ejemplo): Trabajar en Feature Nuevos

```bash
# Mañana - Setup

# 1. Actualizar desde Git
cd C:\Users\troni\mairoverfit\backend
git checkout develop
git pull origin develop

# 2. Crear feature branch
git checkout -b feature/clientes-crud

# 3. Iniciar dev server
npm run dev
# Server corriendo en http://localhost:3000

# Midday - Desarrollo

# 4. Editar archivos (VSCode)
# Crear: src/controllers/clientesController.js
# Editar: src/routes/adminRoutes.js
# Crear: src/validators/clienteValidator.js

# 5. Verificar en Antigravity si hiciste cambios BD
antigravity sync
# Si hay cambios:
antigravity generate
git add src/models/Cliente.js

# Tarde - Commits

# 6. Hacer commit de changes
git add src/controllers/clientesController.js
git commit -m "feat: implement GET /api/v1/admin/clientes"

git add src/routes/adminRoutes.js
git commit -m "feat: add admin/clientes routes"

git add src/validators/clienteValidator.js
git commit -m "feat: add cliente validation schema"

# Noche - Push

# 7. Subir feature branch
git push origin feature/clientes-crud

# 8. En GitHub: Create Pull Request
# Descripción: "Implement CRUD operations for clientes"
# Esperar (si trabajas con team) o self-review

# 9. Merge a develop
git checkout develop
git pull origin develop
```

### Martes (Ejemplo): Frontend React

```bash
# Setup

cd C:\Users\troni\mairoverfit\frontend
git checkout develop
git pull origin develop
git checkout -b feature/clientes-table

# Dev
npm run dev
# Server en http://localhost:5173

# Editar:
# - src/pages/admin/Clientes.jsx
# - src/components/admin/ClientesTable.jsx
# - src/hooks/useClientes.js

# Commits
git add src/pages/admin/Clientes.jsx
git commit -m "feat: create Clientes admin page"

git add src/components/admin/ClientesTable.jsx
git commit -m "feat: implement ClientesTable component with animations"

git add src/hooks/useClientes.js
git commit -m "feat: create useClientes hook for API calls"

# Push
git push origin feature/clientes-table
# Create PR en GitHub
```

### Testing Cambios (Antes de Merge)

```bash
# En tu PC, verificar funcionamiento:

# Backend test
curl -X GET http://localhost:3000/api/v1/admin/clientes \
  -H "Authorization: Bearer [token]"
# Debería retornar JSON con clientes

# Frontend test
# Abrir navegador en http://localhost:5173/admin/clientes
# Verificar tabla carga datos
# Verificar animaciones
# Verificar diseño respeta colores/layout

# Si todo OK:
# Merge a develop en GitHub
# EasyPanel detects change (si tienes webhook)
# O manual: git pull en VPS + redeploy
```

### Viernes: Deploy a Producción

```bash
# 1. Verificar que develop está stable
git checkout develop
git log --oneline -10

# 2. Merge develop → main
git checkout main
git pull origin main
git merge develop

# 3. Push a main
git push origin main

# 4. EasyPanel webhook trigger automático
# O manual en EasyPanel: click Deploy

# 5. Verificar en vivo
# Frontend: https://mairoverfit.com
# Backend: https://mairoverfit.com/api/v1/health

# 6. Monitor logs en EasyPanel
# Si hay errores, revert rápido
```

---

## Checklist: Respetar Diseño 100%

### Colores (Verificar antes de Merge)

- [ ] Botones CTA en #E85D4E (primary-500)
- [ ] Textos principales en #3D3D3A (dark-500)
- [ ] Fondos en blanco/gris claro (light)
- [ ] Acentos en coral cuando relevante
- [ ] Hover states: +10% más oscuro

### Tipografía

- [ ] Títulos: Poppins bold, 24-48px según jerarquía
- [ ] Cuerpo: Poppins regular, 16px
- [ ] Espaciado: grid de 4px (16px, 20px, 24px, etc)

### Animaciones

- [ ] Fade in al cargar página (0.3-0.6s)
- [ ] Slide up en components (0.4s)
- [ ] Hover effects suaves (0.2-0.3s)
- [ ] NO animaciones excesivas (max 2s total)
- [ ] Respetar prefers-reduced-motion

### Layout

- [ ] Mobile first (responsive)
- [ ] Hero section full height
- [ ] Secciones separadas visualmente
- [ ] Cards con sombra sutil
- [ ] Espaciado consistente

### Formularios

- [ ] Inputs con border subtle
- [ ] Labels clara
- [ ] Validación inline con mensajes
- [ ] Botones submit en primary color
- [ ] Placeholder text en gray

---

## CI/CD Pipeline (Opcional - Agregar después)

```yaml
# .github/workflows/deploy.yml

name: Deploy to EasyPanel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger EasyPanel Deploy
        run: |
          curl -X POST https://easypanel.tu_vps.com/api/webhooks/deploy \
            -H "Authorization: Bearer ${{ secrets.EASYPANEL_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"action": "deploy"}'
```

---

## Resumen: Tu Workflow

1. **Antigravity:** Visualizar/gestionar BD. Generar models.
2. **Git local:** Commits limpios, branches feature, develop/main.
3. **GitHub:** Source of truth. PRs, code review, webhooks.
4. **EasyPanel:** Deploy automático desde main. Monitoring logs.
5. **Diseño:** Tailwind config con colores exactos. Componentes reutilizables. Animaciones sutiles.

```
Tu PC (dev)
  ↓ git push
GitHub (source of truth)
  ↓ webhook
EasyPanel (auto deploy)
  ↓
mairoverfit.com (VIVO)
```

---

*Este es tu manual de operaciones. Imprímelo o guárdalo.*

*Próximo paso: Confirmar Antigravity + Git setup en tu PC, luego empezar Fase 1.*
