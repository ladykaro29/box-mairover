# ==============================================================
# MairoverFit — Multi-stage Dockerfile for EasyPanel
# ==============================================================
# Produces a single container that:
#   1. Builds the React frontend with Vite
#   2. Serves the built SPA via Express (backend)
#   3. Exposes the API + frontend on PORT 3000
# ==============================================================

# ---- Stage 1: Build the Frontend ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package.json (unified scripts)
COPY package.json ./

# Copy backend package files
COPY backend/package.json backend/package-lock.json* ./backend/

# Copy frontend package files
COPY frontend/package.json frontend/package-lock.json* ./frontend/

# Install all dependencies
RUN npm run install:all

# Copy full source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Build frontend → frontend/dist/
RUN npm run build:frontend

# ---- Stage 2: Production Image ----
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling in containers
RUN apk add --no-cache dumb-init

# Copy root package.json
COPY package.json ./

# Copy backend source + dependencies
COPY --from=builder /app/backend/ ./backend/

# Copy frontend build output only (not source or node_modules)
COPY --from=builder /app/frontend/dist/ ./frontend/dist/

# Set production environment
ENV NODE_ENV=production

# Expose the application ports (supports both 80 and 3000)
EXPOSE 80 3000

# Dynamic health check — supports whichever PORT EasyPanel assigns (80 or 3000)
HEALTHCHECK --interval=20s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT:-80}/api/v1/health || wget --no-verbose --tries=1 --spider http://127.0.0.1:80/api/v1/health || wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/v1/health || exit 1

# Use dumb-init to handle PID 1 and forward signals correctly
ENTRYPOINT ["dumb-init", "--"]

# Start the unified server
CMD ["node", "backend/src/index.js"]
