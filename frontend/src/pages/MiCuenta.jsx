import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../utils/authApi';

export default function MiCuenta() {
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();
  const [cuenta, setCuenta] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Trae la ficha de cliente enlazada (plan, estado, último pago)
  useEffect(() => {
    let cancelled = false;
    authApi.me()
      .then((data) => { if (!cancelled) setCuenta(data); })
      .catch(() => { /* la vista funciona igual con los datos de la sesión */ });
    return () => { cancelled = true; };
  }, []);

  const onChangePassword = async (data) => {
    setFeedback(null);
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      setFeedback({ type: 'ok', message: 'Contraseña actualizada correctamente.' });
      reset();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const cliente = cuenta?.cliente;

  const datos = [
    { label: 'Plan actual', value: cliente?.plan || 'Sin membresía asignada' },
    { label: 'Estado', value: cliente?.status || '—' },
    { label: 'Último pago', value: cliente?.lastPayment || 'Sin registros' },
    { label: 'Teléfono', value: cliente?.phone || 'No registrado' },
  ];

  return (
    <div className="bg-dark-900 min-h-screen text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
        {/* Encabezado */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-semibold mb-2">Mi cuenta</p>
            <h1 className="text-3xl font-bold tracking-tight">
              Hola, <span className="text-primary-500">{user?.name}</span>
            </h1>
            <p className="text-accent-gray-light text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start sm:self-auto px-5 py-2.5 rounded-full text-sm font-semibold border border-dark-700 text-dark-300 hover:text-white hover:border-primary-500/50 transition-colors cursor-pointer"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Estado de membresía */}
        <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-8 backdrop-blur-md">
          <h2 className="text-lg font-bold mb-6">Estado de tu membresía</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {datos.map((dato) => (
              <div key={dato.label}>
                <p className="text-xs uppercase tracking-wider text-dark-300 mb-1.5">{dato.label}</p>
                <p className="font-semibold">{dato.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seguridad */}
        <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-8 backdrop-blur-md">
          <h2 className="text-lg font-bold mb-2">Seguridad</h2>
          <p className="text-sm text-accent-gray-light mb-6">Actualiza tu contraseña de acceso al portal.</p>

          {feedback && (
            <div
              className={`p-4 rounded-lg text-sm mb-6 border ${
                feedback.type === 'ok'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onChangePassword)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                Contraseña actual
              </label>
              <input
                type="password"
                {...register('currentPassword', { required: 'Obligatoria' })}
                className={`w-full bg-dark-900 border ${
                  errors.currentPassword ? 'border-red-500' : 'border-dark-700 focus:border-primary-500'
                } rounded-lg p-3 text-sm focus:outline-none transition-all duration-200`}
              />
              {errors.currentPassword && (
                <p className="text-xs text-red-500 mt-1.5">{errors.currentPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                Nueva contraseña
              </label>
              <input
                type="password"
                {...register('newPassword', {
                  required: 'Obligatoria',
                  minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                })}
                className={`w-full bg-dark-900 border ${
                  errors.newPassword ? 'border-red-500' : 'border-dark-700 focus:border-primary-500'
                } rounded-lg p-3 text-sm focus:outline-none transition-all duration-200`}
              />
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1.5">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full bg-primary-500 font-semibold text-sm hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Guardando...' : 'ACTUALIZAR CONTRASEÑA'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
