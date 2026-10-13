import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../utils/authApi';
import { api } from '../utils/api';

// Helper para formatear fecha en español
function formatFechaEspanol(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const dateObj = new Date(year, month, day);
  return dateObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function getTomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getDayAfterStr() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0];
}

export default function MiCuenta() {
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();

  // Estados de cuenta y ficha
  const [cuenta, setCuenta] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Estados de reservas
  const [reservas, setReservas] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(true);
  const [reservaFeedback, setReservaFeedback] = useState(null);

  // Estados del modal de reserva
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFecha, setSelectedFecha] = useState(getTodayStr());
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [loadingClases, setLoadingClases] = useState(false);
  const [submittingBookingId, setSubmittingBookingId] = useState(null);

  // Estado para cancelar reserva
  const [cancellingReserva, setCancellingReserva] = useState(null);
  const [cancellingLoading, setCancellingLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Cargar datos de la ficha de cliente
  useEffect(() => {
    let cancelled = false;
    authApi.me()
      .then((data) => { if (!cancelled) setCuenta(data); })
      .catch(() => { /* Continúa con los datos de sesión */ });
    return () => { cancelled = true; };
  }, []);

  // Cargar reservas del atleta
  const cargarMisReservas = async () => {
    try {
      setLoadingReservas(true);
      const data = await api.getMisReservas();
      setReservas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al cargar reservas:', err);
    } finally {
      setLoadingReservas(false);
    }
  };

  useEffect(() => {
    cargarMisReservas();
  }, []);

  // Cargar horarios públicos disponibles cuando se abre el modal
  const cargarHorariosDisponibles = async () => {
    try {
      setLoadingClases(true);
      const data = await api.getPublicHorarios();
      setClasesDisponibles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al cargar horarios:', err);
    } finally {
      setLoadingClases(false);
    }
  };

  const openBookingModal = () => {
    setModalOpen(true);
    setReservaFeedback(null);
    cargarHorariosDisponibles();
  };

  const closeBookingModal = () => {
    setModalOpen(false);
  };

  // Ejecutar reserva de un turno
  const handleReservarClase = async (clase) => {
    setReservaFeedback(null);
    setSubmittingBookingId(clase.id);
    try {
      const resp = await api.crearReserva({
        claseId: clase.id,
        fecha: selectedFecha,
      });

      setReservaFeedback({
        type: 'ok',
        message: resp.message || `¡Cupo reservado con éxito para ${clase.name}!`,
      });

      // Recargar reservas y lista de horarios
      await cargarMisReservas();
      await cargarHorariosDisponibles();
      setModalOpen(false);
    } catch (err) {
      setReservaFeedback({
        type: 'error',
        message: err.message || 'No se pudo completar la reserva.',
      });
    } finally {
      setSubmittingBookingId(null);
    }
  };

  // Confirmar y procesar cancelación
  const handleConfirmarCancelacion = async () => {
    if (!cancellingReserva) return;
    setCancellingLoading(true);
    try {
      await api.cancelarReserva(cancellingReserva.id);
      setReservaFeedback({
        type: 'ok',
        message: `Reserva de "${cancellingReserva.claseNombre}" cancelada exitosamente. Tu cupo ha sido liberado.`,
      });
      await cargarMisReservas();
      setCancellingReserva(null);
    } catch (err) {
      setReservaFeedback({
        type: 'error',
        message: err.message || 'No se pudo cancelar la reserva.',
      });
    } finally {
      setCancellingLoading(false);
    }
  };

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
    { label: 'Plan actual', value: cliente?.plan || 'Clase Regular' },
    { label: 'Estado', value: cliente?.status || 'Activo' },
    { label: 'Último pago', value: cliente?.lastPayment || 'Al día' },
    { label: 'Teléfono', value: cliente?.phone || 'No registrado' },
  ];

  // Identificar si una clase ya está reservada por el atleta en la fecha seleccionada
  const yaEstaReservada = (claseId) => {
    return reservas.some(
      (r) => r.claseId === claseId && r.fecha === selectedFecha && r.status === 'confirmada'
    );
  };

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

        {/* Notificaciones / Feedback de Reservas */}
        {reservaFeedback && (
          <div
            className={`p-4 rounded-xl text-sm border flex items-center justify-between ${
              reservaFeedback.type === 'ok'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{reservaFeedback.type === 'ok' ? '✅' : '⚠️'}</span>
              <span>{reservaFeedback.message}</span>
            </div>
            <button
              onClick={() => setReservaFeedback(null)}
              className="text-xs opacity-75 hover:opacity-100 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* SECCIÓN 1: MIS CLASES RESERVADAS */}
        <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">Mis Clases Reservadas</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-500 border border-primary-500/20">
                  {reservas.length} {reservas.length === 1 ? 'activa' : 'activas'}
                </span>
              </div>
              <p className="text-sm text-accent-gray-light mt-1">
                Consulta y gestiona tus cupos confirmados en el box.
              </p>
            </div>
            <button
              onClick={openBookingModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all shadow-lg shadow-primary-500/20 cursor-pointer"
            >
              <span>+</span>
              <span>Reservar Clase</span>
            </button>
          </div>

          {loadingReservas ? (
            <div className="py-12 flex justify-center items-center">
              <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : reservas.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-dark-700 bg-dark-900/30">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-dark-800 flex items-center justify-center text-2xl">
                📅
              </div>
              <h3 className="font-semibold text-base mb-1">No tienes clases reservadas</h3>
              <p className="text-accent-gray-light text-sm max-w-md mx-auto mb-5">
                Asegura tu cupo en los entrenamientos diarios del box antes de que se agoten los turnos.
              </p>
              <button
                onClick={openBookingModal}
                className="px-6 py-2 rounded-full bg-dark-700 hover:bg-primary-500 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Ver Horarios y Reservar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reservas.map((res) => (
                <div
                  key={res.id}
                  className="bg-dark-900/60 border border-dark-700 hover:border-primary-500/40 rounded-xl p-5 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ● Confirmada
                      </span>
                      <span className="text-xs text-accent-gray-light font-mono">
                        Turno #{res.claseId}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white">
                      {res.claseNombre}
                    </h3>

                    <div className="space-y-1.5 text-xs text-accent-gray-light">
                      <div className="flex items-center gap-2">
                        <span className="text-primary-500">📅</span>
                        <span className="capitalize font-medium text-dark-200">
                          {formatFechaEspanol(res.fecha)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary-500">⏰</span>
                        <span>{res.claseHora}</span>
                      </div>
                      {res.coach && (
                        <div className="flex items-center gap-2">
                          <span className="text-primary-500">👤</span>
                          <span>Coach: {res.coach}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dark-800 flex items-center justify-between">
                    <span className="text-xs text-dark-400">Cupo asegurado</span>
                    <button
                      onClick={() => setCancellingReserva(res)}
                      className="text-xs font-semibold text-red-400 hover:text-red-300 hover:underline transition-colors cursor-pointer"
                    >
                      Cancelar reserva
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECCIÓN 2: ESTADO DE MEMBRESÍA */}
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

        {/* SECCIÓN 3: SEGURIDAD Y ACCESO */}
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

      {/* ======================================================== */}
      {/* MODAL: RESERVAR CLASE */}
      {/* ======================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Cabecera del modal */}
            <div className="p-6 border-b border-dark-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Reservar Clase en MairoverFit</h3>
                <p className="text-xs text-accent-gray-light mt-0.5">
                  Selecciona la fecha y el turno que deseas asegurar.
                </p>
              </div>
              <button
                onClick={closeBookingModal}
                className="w-8 h-8 rounded-full bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Selector de Fecha */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider">
                  Fecha del entrenamiento
                </label>
                
                {/* Botones de selección rápida */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFecha(getTodayStr())}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedFecha === getTodayStr()
                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    Hoy
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFecha(getTomorrowStr())}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedFecha === getTomorrowStr()
                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    Mañana
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFecha(getDayAfterStr())}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedFecha === getDayAfterStr()
                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    Pasado Mañana
                  </button>
                  
                  {/* Selector nativo */}
                  <div className="flex-1 min-w-[160px]">
                    <input
                      type="date"
                      min={getTodayStr()}
                      value={selectedFecha}
                      onChange={(e) => setSelectedFecha(e.target.value)}
                      className="w-full bg-dark-800 border border-dark-700 focus:border-primary-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <p className="text-xs text-primary-400 capitalize">
                  Entrenamiento para: <strong>{formatFechaEspanol(selectedFecha)}</strong>
                </p>
              </div>

              {/* Lista de Turnos Disponibles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-accent-gray-light uppercase tracking-wider">
                    Turnos y Horarios
                  </h4>
                  <span className="text-xs text-dark-400">
                    {clasesDisponibles.length} clases programadas
                  </span>
                </div>

                {loadingClases ? (
                  <div className="py-8 flex justify-center items-center">
                    <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : clasesDisponibles.length === 0 ? (
                  <p className="text-sm text-accent-gray-light text-center py-6">
                    No hay turnos disponibles para este horario.
                  </p>
                ) : (
                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {clasesDisponibles.map((clase) => {
                      const yaReservada = yaEstaReservada(clase.id);
                      const cuposLibres = Math.max(0, clase.capacity - clase.enrolled);
                      const estaLleno = cuposLibres === 0;
                      const isSubmitting = submittingBookingId === clase.id;

                      return (
                        <div
                          key={clase.id}
                          className="p-4 rounded-xl bg-dark-800/60 border border-dark-700/70 hover:border-dark-600 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-white">{clase.name}</span>
                              <span className="text-xs text-dark-400 font-mono">({clase.day})</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-accent-gray-light">
                              <span>⏰ {clase.time}</span>
                              <span>•</span>
                              <span>Coach: {clase.coach}</span>
                            </div>
                            <div className="flex items-center gap-2 pt-0.5">
                              {estaLleno ? (
                                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                                  Agotado (0 cupos)
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {cuposLibres} {cuposLibres === 1 ? 'cupo libre' : 'cupos libres'}
                                </span>
                              )}
                              <span className="text-[11px] text-dark-400">
                                ({clase.enrolled}/{clase.capacity} inscritos)
                              </span>
                            </div>
                          </div>

                          <div className="sm:self-center">
                            {yaReservada ? (
                              <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold bg-dark-700 text-dark-300 border border-dark-600">
                                ✓ Ya Reservada
                              </span>
                            ) : (
                              <button
                                type="button"
                                disabled={estaLleno || isSubmitting}
                                onClick={() => handleReservarClase(clase)}
                                className="w-full sm:w-auto px-5 py-2 rounded-full text-xs font-semibold bg-primary-500 hover:bg-primary-600 text-white transition-all shadow-md shadow-primary-500/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                              >
                                {isSubmitting ? 'Reservando...' : 'Reservar Cupo'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Pie del modal */}
            <div className="p-4 bg-dark-950/60 border-t border-dark-800 flex justify-end">
              <button
                type="button"
                onClick={closeBookingModal}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL DE CONFIRMACIÓN DE CANCELACIÓN */}
      {/* ======================================================== */}
      {cancellingReserva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-xl mx-auto">
              ⚠️
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">¿Cancelar esta reserva?</h3>
              <p className="text-xs text-accent-gray-light">
                Estás a punto de liberar tu cupo para:
              </p>
              <div className="p-3 bg-dark-800/80 rounded-xl my-2 border border-dark-700 text-left">
                <p className="font-bold text-sm text-white">{cancellingReserva.claseNombre}</p>
                <p className="text-xs text-primary-400 capitalize">{formatFechaEspanol(cancellingReserva.fecha)}</p>
                <p className="text-xs text-dark-300 mt-1">⏰ {cancellingReserva.claseHora}</p>
              </div>
              <p className="text-xs text-dark-400">
                Al cancelar, el cupo quedará libre para otro atleta del box.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={cancellingLoading}
                onClick={() => setCancellingReserva(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors cursor-pointer"
              >
                Conservar reserva
              </button>
              <button
                type="button"
                disabled={cancellingLoading}
                onClick={handleConfirmarCancelacion}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                {cancellingLoading ? 'Cancelando...' : 'Sí, cancelar cupo'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
