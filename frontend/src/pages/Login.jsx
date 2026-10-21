import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Destino tras el login: la ruta que se intentó abrir o el área según el rol
  const destinoPorRol = (rol) => (rol === 'admin' ? '/admin' : '/mi-cuenta');
  const from = location.state?.from?.pathname;

  // Si ya hay sesión activa, no tiene sentido mostrar el formulario
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || destinoPorRol(user?.role), { replace: true });
    }
  }, [isAuthenticated, user, from, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      const usuario = await login({ email: data.email, password: data.password });
      navigate(from || destinoPorRol(usuario.role), { replace: true });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-900 min-h-screen text-white py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-dark-800/40 border border-dark-700/50 p-8 rounded-xl backdrop-blur-md shadow-2xl">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img 
              src="/images/logos/logo-vertical.webp" 
              alt="MairoverFit" 
              className="h-16 w-auto object-contain transition-transform duration-200 hover:scale-105"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/logos/logo-vertical.png';
              }}
            />
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 text-center">
          INICIAR <span className="text-primary-500">SESIÓN</span>
        </h1>
        <p className="text-accent-gray-light text-sm mb-8 text-center">
          Ingresa tus credenciales para administrar tus reservas, revisar tus evaluaciones físicas y ver tu estado de membresía.
        </p>

        {searchParams.get('expired') === '1' && !authError && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-4 rounded-lg text-sm mb-6 animate-[fadeIn_0.3s_ease-out]">
            <p className="font-semibold">Tu sesión ha expirado</p>
            <p className="text-xs text-amber-400/80">Vuelve a iniciar sesión para continuar.</p>
          </div>
        )}

        {authError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm mb-6 animate-[fadeIn_0.3s_ease-out] flex items-center gap-3">
            <span>⚠️</span>
            <div>
              <p className="font-semibold">No se pudo iniciar sesión</p>
              <p className="text-xs text-red-400/80">{authError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="maria@gmail.com"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: { value: /^\S+@\S+$/i, message: 'Dirección de correo inválida' },
              })}
              className={`w-full bg-dark-900 border ${
                errors.email ? 'border-red-500' : 'border-dark-700 hover:border-primary-500/40 focus:border-primary-500'
              } rounded-lg p-3 text-sm focus:outline-none transition-all duration-200`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider">
                Contraseña
              </label>
              <a href="#" className="text-xs text-primary-500 hover:text-primary-400">¿La olvidaste?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              className={`w-full bg-dark-900 border ${
                errors.password ? 'border-red-500' : 'border-dark-700 hover:border-primary-500/40 focus:border-primary-500'
              } rounded-lg p-3 text-sm focus:outline-none transition-all duration-200`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-500 text-white py-3.5 rounded-lg font-semibold hover:bg-primary-600 active:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Verificando...</span>
              </>
            ) : (
              <span>ENTRAR AL BOX</span>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-dark-300 mt-8">
          ¿Aún no entrenas con nosotros? <Link to="/register" className="text-primary-500 font-semibold hover:underline">Crea tu cuenta</Link>
        </p>
      </div>
    </div>
  );
}
