import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const { register: registrarUsuario } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setRegisterError(null);

    try {
      // El registro devuelve la sesión ya iniciada: se entra directo al portal
      const usuario = await registrarUsuario(data);
      navigate(usuario.role === 'admin' ? '/admin' : '/mi-cuenta', { replace: true });
    } catch (err) {
      setRegisterError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-900 min-h-screen text-white py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-dark-800/40 border border-dark-700/50 p-8 rounded-xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 text-center">
          CREAR <span className="text-primary-500">CUENTA</span>
        </h1>
        <p className="text-accent-gray-light text-sm mb-8 text-center">
          Regístrate para poder gestionar tus membresías, registrar tus pagos y comenzar tus entrenamientos en el box.
        </p>

        {registerError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm mb-6 animate-[fadeIn_0.3s_ease-out] flex items-center gap-3">
            <span>⚠️</span>
            <div>
              <p className="font-semibold">Error al registrarse</p>
              <p className="text-xs text-red-400/80">{registerError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre Input */}
          <div>
            <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Ej: María García"
              {...register('nombre', { required: 'El nombre es obligatorio' })}
              className={`w-full bg-dark-900 border ${
                errors.nombre ? 'border-red-500' : 'border-dark-700 hover:border-primary-500/40 focus:border-primary-500'
              } rounded-lg p-3 text-sm focus:outline-none transition-all duration-200`}
            />
            {errors.nombre && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.nombre.message}
              </p>
            )}
          </div>

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
            <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: { value: 8, message: 'Mínimo 8 caracteres' },
              })}
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

          {/* Legal Acceptance Disclaimer */}
          <div className="bg-[#071628]/80 border border-[#13335A] rounded-xl p-3.5 text-[11px] text-blue-200/70 leading-relaxed">
            Al registrarte en MairoverFit, confirmas que eres mayor de edad o cuentas con autorización, y que has leído y aceptas nuestros{' '}
            <Link to="/terminos" target="_blank" className="text-[#F43F5E] hover:underline font-semibold">
              Términos y Condiciones
            </Link>
            , nuestra{' '}
            <Link to="/privacidad" target="_blank" className="text-[#F43F5E] hover:underline font-semibold">
              Política de Privacidad
            </Link>{' '}
            y el{' '}
            <Link to="/descargo-salud" target="_blank" className="text-[#F43F5E] hover:underline font-semibold">
              Descargo de Salud
            </Link>
            .
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 active:scale-98 text-white py-3.5 rounded-xl font-bold tracking-wider hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase text-xs"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Creando cuenta segura...</span>
              </>
            ) : (
              <span>CREAR CUENTA</span>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-dark-300 mt-8">
          ¿Ya tienes cuenta? <Link to="/login" className="text-primary-500 font-semibold hover:underline">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}
