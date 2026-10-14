const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables (.env in root, backend/.env, or backend/.env.local)
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 3000;

// Security and headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Turn off CSP for easy local resources loading
  })
);

// CORS settings
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Request parsing & Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static serving for React frontend (production build)
const frontendDist = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDist));

// Fallback all other routes to React router SPA.
// Se registra dentro de startServer() para que quede DESPUÉS de las rutas de la API.
const spaFallback = (req, res) => {
  // If static React assets are built, serve index.html
  const indexPath = path.join(frontendDist, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // In development if frontend is not built, send a helpful message
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>MairoverFit Unified API Server</title>
          <style>
            body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #0f0f0d; color: white; margin: 0; }
            .container { text-align: center; border: 1px solid #E85D4E; padding: 40px; border-radius: 8px; }
            h1 { color: #E85D4E; }
            a { color: #F5A584; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>MairoverFit API Server</h1>
            <p>The Express API is running on Port ${PORT}!</p>
            <p>To view the React Frontend, make sure you build it using <code>npm run build</code> or run the frontend dev server.</p>
            <p>API Health: <a href="/api/v1/health">/api/v1/health</a></p>
          </div>
        </body>
        </html>
      `);
    }
  });
};

const { errorHandler } = require('./middleware/errorHandler');

// Async server initialization
const { initializeDatabase } = require('./database/dbInitializer');

async function startServer() {
  try {
    // La base de datos se inicializa PRIMERO: decide el dialecto (MySQL o SQLite)
    // antes de que los controladores carguen los modelos de Sequelize.
    await initializeDatabase();

    // API router setup — mount all routes from the routes module
    const apiRoutes = require('./routes');
    app.use('/api/v1', apiRoutes);

    // SPA de React para cualquier otra ruta
    app.get('*', spaFallback);

    // Global error handler (siempre el último middleware)
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`========================================`);
      console.log(`🚀 MairoverFit Server is running on Port ${PORT}`);
      console.log(`👉 API Health Check: http://localhost:${PORT}/api/v1/health`);
      console.log(`========================================`);
    });
  } catch (error) {
    console.error('❌ Error fatal al iniciar el servidor o la base de datos:', error);
    process.exit(1);
  }
}

startServer();

