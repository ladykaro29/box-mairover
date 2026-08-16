import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Pantalla de espera mientras se revalida el token contra el backend
function AuthLoader() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center gap-4 text-white">
      <span className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></span>
      <p className="text-sm text-accent-gray-light tracking-wide">Verificando sesión...</p>
    </div>
  );
}

/**
 * Envuelve rutas que exigen sesión.
 * @param {string[]} roles Roles permitidos. Vacío = cualquier usuario autenticado.
 */
export default function ProtectedRoute({ roles = [] }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthLoader />;

  if (!isAuthenticated) {
    // Se recuerda el destino para volver a él tras iniciar sesión
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    // Autenticado pero sin permisos: se envía a su propia área
    return <Navigate to={user.role === 'admin' ? '/admin' : '/mi-cuenta'} replace />;
  }

  return <Outlet />;
}
