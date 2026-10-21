import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../utils/authApi';
import { api } from '../utils/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

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

  // Pestaña activa ('reservas' | 'progreso' | 'membresia')
  const [activeTab, setActiveTab] = useState('reservas');

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

  // Estados de Evaluaciones y Progreso Físico
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loadingEvaluaciones, setLoadingEvaluaciones] = useState(true);
  const [chartMetric, setChartMetric] = useState('composicion'); // 'composicion' o 'peso'

  // Estados para el Portal Online
  const [onlineDay, setOnlineDay] = useState('dia1');
  const [completedExercises, setCompletedExercises] = useState({});
  const [videoFormData, setVideoFormData] = useState({ ejercicio: 'Back Squat (Sentadilla)', link: '', notas: '' });
  const [videoFeedback, setVideoFeedback] = useState(null);

  const toggleExercise = (id) => {
    setCompletedExercises((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendVideoCorrection = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `📹 *CORRECCIÓN TÉCNICA ONLINE - ATLETA: ${cuenta?.name || user?.name || 'Cliente'}*\n\n` +
      `• *Ejercicio:* ${videoFormData.ejercicio}\n` +
      `• *Enlace del Video:* ${videoFormData.link || 'Te envío el video a continuación por aquí'}\n` +
      `• *Dudas / Sensaciones:* ${videoFormData.notas || 'Revisión general de postura y profundidad'}\n\n` +
      `Quedo atento(a) a tus correcciones, Coach Mauroly.`
    );
    window.open(`https://wa.me/584147225979?text=${msg}`, '_blank');
    setVideoFeedback('¡Solicitud de revisión enviada a la Coach!');
    setVideoFormData({ ejercicio: 'Back Squat (Sentadilla)', link: '', notas: '' });
  };

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

  // Cargar evaluaciones del atleta
  const cargarMisEvaluaciones = async () => {
    try {
      setLoadingEvaluaciones(true);
      const data = await api.getMisEvaluaciones();
      setEvaluaciones(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al cargar evaluaciones:', err);
    } finally {
      setLoadingEvaluaciones(false);
    }
  };

  useEffect(() => {
    cargarMisReservas();
    cargarMisEvaluaciones();
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

  const yaEstaReservada = (claseId) => {
    return reservas.some(
      (r) => r.claseId === claseId && r.fecha === selectedFecha && r.status === 'confirmada'
    );
  };

  // Cálculos de métricas de progreso físico
  const sortedEvals = useMemo(() => {
    return [...evaluaciones].sort((a, b) => (a.id || 0) - (b.id || 0));
  }, [evaluaciones]);

  const latestEval = sortedEvals.length > 0 ? sortedEvals[sortedEvals.length - 1] : null;
  const initialEval = sortedEvals.length > 0 ? sortedEvals[0] : null;

  const pesoDiff = latestEval && initialEval && sortedEvals.length > 1
    ? (parseFloat(latestEval.peso) - parseFloat(initialEval.peso)).toFixed(1)
    : null;

  const grasaDiff = latestEval && initialEval && sortedEvals.length > 1
    ? (parseInt(latestEval.grasa, 10) - parseInt(initialEval.grasa, 10))
    : null;

  const musculoDiff = latestEval && initialEval && sortedEvals.length > 1
    ? (parseInt(latestEval.musculo, 10) - parseInt(initialEval.musculo, 10))
    : null;

  // Datos para el gráfico Chart.js
  const chartLabels = sortedEvals.map((e) => e.fecha || `Eval #${e.id}`);

  const chartDataComposicion = {
    labels: chartLabels.length > 0 ? chartLabels : ['Sin registros'],
    datasets: [
      {
        label: '% Grasa Corporal',
        data: sortedEvals.length > 0 ? sortedEvals.map((e) => parseFloat(e.grasa)) : [0],
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.12)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f87171',
        pointRadius: 4,
      },
      {
        label: '% Masa Muscular',
        data: sortedEvals.length > 0 ? sortedEvals.map((e) => parseFloat(e.musculo)) : [0],
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.12)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4ade80',
        pointRadius: 4,
      },
    ],
  };

  const chartDataPeso = {
    labels: chartLabels.length > 0 ? chartLabels : ['Sin registros'],
    datasets: [
      {
        label: 'Peso Corporal (kg)',
        data: sortedEvals.length > 0 ? sortedEvals.map((e) => parseFloat(e.peso)) : [0],
        borderColor: '#F43F5E',
        backgroundColor: 'rgba(244, 63, 94, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#F43F5E',
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#C2C0B6',
          boxWidth: 12,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#071628',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#FFFFFF',
        bodyColor: '#C2C0B6',
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 11 } },
      },
    },
  };

  return (
    <div className="bg-dark-900 min-h-screen text-white py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Encabezado Principal */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-dark-800 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-semibold mb-2">
              Portal del Atleta
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Hola, <span className="text-primary-500">{user?.name}</span>
            </h1>
            <p className="text-accent-gray-light text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start sm:self-auto px-5 py-2.5 rounded-full text-xs font-semibold border border-dark-700 text-dark-300 hover:text-white hover:border-primary-500/50 transition-colors cursor-pointer"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Notificaciones / Feedback Global */}
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

        {/* Barra de Pestañas de Navegación del Atleta */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-dark-800/60 border border-dark-700/60 rounded-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('reservas')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'reservas'
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
          >
            <span>📅</span>
            <span>Clases & Reservas</span>
            <span
              className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'reservas'
                  ? 'bg-white/20 text-white'
                  : 'bg-dark-700 text-dark-300'
              }`}
            >
              {reservas.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('progreso')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'progreso'
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
          >
            <span>📈</span>
            <span>Mi Progreso Físico</span>
            <span
              className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'progreso'
                  ? 'bg-white/20 text-white'
                  : 'bg-dark-700 text-dark-300'
              }`}
            >
              {evaluaciones.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('membresia')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'membresia'
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
          >
            <span>🛡️</span>
            <span>Membresía & Seguridad</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('online')}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'online'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
          >
            <span>🌐</span>
            <span>Plan Online & Rutinas</span>
            <span
              className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'online'
                  ? 'bg-white/20 text-white'
                  : 'bg-sky-500/10 text-sky-400'
              }`}
            >
              Activo
            </span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* PESTAÑA 1: MIS CLASES & RESERVAS */}
        {/* ======================================================== */}
        {activeTab === 'reservas' && (
          <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
        )}

        {/* ======================================================== */}
        {/* PESTAÑA 2: MI PROGRESO FÍSICO Y COMPOSICIÓN CORPORAL */}
        {/* ======================================================== */}
        {activeTab === 'progreso' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            
            {/* Tarjetas KPI de Composición Corporal */}
            {latestEval ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Peso */}
                <div className="bg-dark-800/50 border border-dark-700/60 rounded-2xl p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent-gray-light uppercase tracking-wider">
                      Peso Actual
                    </span>
                    <span className="text-base">⚖️</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">
                    {latestEval.peso} <span className="text-sm font-normal text-dark-300">kg</span>
                  </p>
                  {pesoDiff !== null && (
                    <p className={`text-xs mt-2 font-medium ${
                      parseFloat(pesoDiff) <= 0 ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {parseFloat(pesoDiff) > 0 ? `+${pesoDiff}` : pesoDiff} kg vs inicio
                    </p>
                  )}
                </div>

                {/* IMC */}
                <div className="bg-dark-800/50 border border-dark-700/60 rounded-2xl p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent-gray-light uppercase tracking-wider">
                      IMC Corporal
                    </span>
                    <span className="text-base">📊</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">
                    {latestEval.imc}
                  </p>
                  <p className="text-xs text-primary-400 mt-2 font-medium">
                    {parseFloat(latestEval.imc) < 25 ? 'Rango Óptimo' : 'En Recomposición'}
                  </p>
                </div>

                {/* % Grasa */}
                <div className="bg-dark-800/50 border border-dark-700/60 rounded-2xl p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent-gray-light uppercase tracking-wider">
                      % Grasa
                    </span>
                    <span className="text-base">💧</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-red-400">
                    {latestEval.grasa}%
                  </p>
                  {grasaDiff !== null && (
                    <p className={`text-xs mt-2 font-medium ${
                      grasaDiff <= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {grasaDiff > 0 ? `+${grasaDiff}%` : `${grasaDiff}%`} vs inicio
                    </p>
                  )}
                </div>

                {/* % Músculo */}
                <div className="bg-dark-800/50 border border-dark-700/60 rounded-2xl p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent-gray-light uppercase tracking-wider">
                      % Músculo
                    </span>
                    <span className="text-base">💪</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    {latestEval.musculo}%
                  </p>
                  {musculoDiff !== null && (
                    <p className={`text-xs mt-2 font-medium ${
                      musculoDiff >= 0 ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {musculoDiff > 0 ? `+${musculoDiff}%` : `${musculoDiff}%`} masa ganada
                    </p>
                  )}
                </div>

              </div>
            ) : null}

            {/* Gráfico de Evolución */}
            <div className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Evolución y Métricas Antropométricas</h3>
                  <p className="text-xs text-accent-gray-light mt-0.5">
                    Historial de composición corporal registrado por tu coach en el box.
                  </p>
                </div>

                {/* Conmutador de gráfica */}
                <div className="inline-flex p-1 bg-dark-900 border border-dark-700 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setChartMetric('composicion')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      chartMetric === 'composicion'
                        ? 'bg-primary-500 text-white shadow-sm'
                        : 'text-dark-300 hover:text-white'
                    }`}
                  >
                    Grasa vs Músculo
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartMetric('peso')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      chartMetric === 'peso'
                        ? 'bg-primary-500 text-white shadow-sm'
                        : 'text-dark-300 hover:text-white'
                    }`}
                  >
                    Evolución de Peso
                  </button>
                </div>
              </div>

              {loadingEvaluaciones ? (
                <div className="h-64 flex justify-center items-center">
                  <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : evaluaciones.length === 0 ? (
                <div className="h-64 flex flex-col justify-center items-center text-center p-6 border border-dashed border-dark-700 rounded-xl">
                  <span className="text-3xl mb-2">📋</span>
                  <p className="font-semibold text-sm">Aún no tienes evaluaciones registradas</p>
                  <p className="text-xs text-accent-gray-light max-w-sm mt-1">
                    Tu coach registrará tus mediciones corporales y notas de rendimiento en tu próxima sesión en el box.
                  </p>
                </div>
              ) : (
                <div className="h-72 w-full">
                  <Line
                    data={chartMetric === 'composicion' ? chartDataComposicion : chartDataPeso}
                    options={chartOptions}
                  />
                </div>
              )}
            </div>

            {/* Línea de Tiempo e Historial con Observaciones de la Coach */}
            <div className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Observaciones y Valoraciones del Box</h3>
                  <p className="text-xs text-accent-gray-light mt-0.5">
                    Historial cronológico de notas personalizadas de Coach Mauroly Mercado.
                  </p>
                </div>
                <span className="text-xs font-semibold text-dark-300">
                  {evaluaciones.length} {evaluaciones.length === 1 ? 'registro' : 'registros'}
                </span>
              </div>

              {evaluaciones.length === 0 ? (
                <p className="text-xs text-dark-400 text-center py-6">
                  No hay valoraciones registradas por el momento.
                </p>
              ) : (
                <div className="space-y-4">
                  {[...evaluaciones].reverse().map((ev, idx) => (
                    <div
                      key={ev.id || idx}
                      className="p-5 rounded-xl bg-dark-900/60 border border-dark-700/70 hover:border-dark-600 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-dark-800 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-500/10 text-primary-500 border border-primary-500/20">
                            {ev.tipo || 'Evaluación'}
                          </span>
                          <span className="font-semibold text-sm text-white">
                            {ev.fecha}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-dark-300">
                          <span>Peso: <strong className="text-white">{ev.peso} kg</strong></span>
                          <span>IMC: <strong className="text-white">{ev.imc}</strong></span>
                          <span>Grasa: <strong className="text-red-400">{ev.grasa}%</strong></span>
                          <span>Músculo: <strong className="text-emerald-400">{ev.musculo}%</strong></span>
                        </div>
                      </div>

                      {ev.nota && (
                        <div className="p-3.5 bg-dark-800/80 rounded-lg border-l-4 border-primary-500 text-xs text-accent-gray-light flex items-start gap-2.5">
                          <span className="text-sm text-primary-500">💬</span>
                          <div>
                            <p className="font-semibold text-white text-[11px] mb-0.5">Nota de la Coach:</p>
                            <p className="italic">{ev.nota}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* PESTAÑA 3: ESTADO DE MEMBRESÍA & SEGURIDAD */}
        {/* ======================================================== */}
        {activeTab === 'membresia' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            
            {/* Estado de membresía */}
            <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
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
            <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
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
        )}

        {/* ======================================================== */}
        {/* PESTAÑA 4: RUTINA & PLAN ONLINE */}
        {/* ======================================================== */}
        {activeTab === 'online' && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            
            {/* Header del Plan Online */}
            <section className="bg-gradient-to-r from-[#0B2240] to-[#071628] border border-sky-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[90px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <span>🌐</span> PROGRAMA ACTIVO • PLAN INTEGRAL
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                    Tu Programación Online
                  </h2>
                  <p className="text-sm text-[#C2C0B6] mt-1 max-w-xl font-light">
                    Asignado y supervisado por la Head Coach <strong>Mauroly Mercado</strong> (CF-L1 & Nutricionista). Rutina individualizada con progresión semanal.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/584147225979?text=Hola%20Coach%20Mauroly,%20tengo%20una%20consulta%20sobre%20mi%20rutina%20online"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                  >
                    <span>💬 WhatsApp Coach</span>
                  </a>
                  <a
                    href="#correccion-video"
                    className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-95 transition-all"
                  >
                    <span>📹 Enviar Video</span>
                  </a>
                </div>
              </div>

              {/* Indicadores rápidos de la membresía online */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
                <div>
                  <span className="text-dark-400 block uppercase tracking-wider text-[10px]">Fase Actual</span>
                  <span className="font-bold text-white text-sm">Fase 2: Fuerza e Hipertrofia</span>
                </div>
                <div>
                  <span className="text-dark-400 block uppercase tracking-wider text-[10px]">Frecuencia</span>
                  <span className="font-bold text-sky-400 text-sm">5 Días / Semana</span>
                </div>
                <div>
                  <span className="text-dark-400 block uppercase tracking-wider text-[10px]">Próximo Check-In</span>
                  <span className="font-bold text-[#F43F5E] text-sm">Domingo (Medidas & Peso)</span>
                </div>
                <div>
                  <span className="text-dark-400 block uppercase tracking-wider text-[10px]">Videos Disponibles</span>
                  <span className="font-bold text-emerald-400 text-sm">Ilimitados (Plan Integral)</span>
                </div>
              </div>
            </section>

            {/* Selector de Días de la Rutina */}
            <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    Rutina Semanal por Días
                  </h3>
                  <p className="text-xs text-[#C2C0B6]">
                    Selecciona el día para ver tus bloques de trabajo, series y cargas recomendadas.
                  </p>
                </div>
                <div className="text-xs text-sky-400 font-semibold">
                  Marca las casillas al completar cada ejercicio ✓
                </div>
              </div>

              {/* Días en botones */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { id: 'dia1', label: 'Día 1: Tren Superior', tag: 'Lunes' },
                  { id: 'dia2', label: 'Día 2: Pierna & Sentadilla', tag: 'Martes' },
                  { id: 'dia3', label: 'Día 3: WOD & MetCon', tag: 'Miércoles' },
                  { id: 'dia4', label: 'Día 4: Empuje & Tracción', tag: 'Jueves' },
                  { id: 'dia5', label: 'Día 5: Full Body & Core', tag: 'Viernes' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setOnlineDay(d.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      onlineDay === d.id
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                        : 'bg-dark-900 border border-dark-700 text-dark-300 hover:text-white hover:border-dark-600'
                    }`}
                  >
                    <span>{d.label}</span>
                  </button>
                ))}
              </div>

              {/* Detalle del Día Seleccionado */}
              <div className="space-y-4">
                {onlineDay === 'dia1' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Objetivo de la sesión</span>
                        <h4 className="text-sm font-extrabold text-white">Fuerza Máxima de Torso + Volumen de Tracción</h4>
                      </div>
                      <span className="text-xs text-dark-400">⏱️ Duración estimada: 60 min</span>
                    </div>

                    {[
                      { id: 'ex1_1', name: 'Calentamiento Dinámico', detail: 'Dislocaciones de hombro con pica + Band Pull-Aparts', sets: '2 series x 15 reps', rest: '30s', rpe: 'Activación' },
                      { id: 'ex1_2', name: 'Press de Banca con Barra (Bench Press)', detail: 'Pausa de 1 segundo en el pecho. Codo a 45 grados.', sets: '4 series x 8 reps', rest: '90s', rpe: 'RPE 8' },
                      { id: 'ex1_3', name: 'Dominadas Estrictas (o Jalón al Pecho)', detail: 'Rango completo, barbilla sobre la barra y extensión total abajo.', sets: '4 series x 8-10 reps', rest: '75s', rpe: 'RPE 8' },
                      { id: 'ex1_4', name: 'Press Militar con Mancuernas', detail: 'De pie, core firme y bloqueo seguro sobre la cabeza.', sets: '3 series x 10 reps', rest: '60s', rpe: 'RPE 7.5' },
                      { id: 'ex1_5', name: 'Remo con Mancuerna Unilateral', detail: 'Espalda recta paralela al banco, tracción al bolsillo.', sets: '3 series x 12 reps / lado', rest: '60s', rpe: 'RPE 8' },
                      { id: 'ex1_6', name: 'Finisher Acondicionamiento (EMOM 10 Min)', detail: 'Minutos pares: 10 Push-ups estrictos | Minutos impares: 12 Kettlebell Swings', sets: '10 Rondas totales', rest: 'Descanso en remanente de cada min', rpe: 'Máximo esfuerzo' },
                    ].map((ex) => (
                      <div
                        key={ex.id}
                        onClick={() => toggleExercise(ex.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          completedExercises[ex.id]
                            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200 opacity-80'
                            : 'bg-dark-900/60 border-dark-700/60 hover:border-sky-500/40 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <input
                            type="checkbox"
                            checked={!!completedExercises[ex.id]}
                            onChange={() => {}}
                            className="w-5 h-5 rounded border-dark-600 text-sky-500 focus:ring-0 cursor-pointer"
                          />
                          <div>
                            <h5 className={`text-sm font-bold ${completedExercises[ex.id] ? 'line-through text-emerald-300' : 'text-white'}`}>
                              {ex.name}
                            </h5>
                            <p className="text-xs text-[#C2C0B6] mt-0.5">{ex.detail}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-sky-400 block">{ex.sets}</span>
                          <span className="text-[10px] text-dark-400 block">Descanso: {ex.rest} | {ex.rpe}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {onlineDay === 'dia2' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Objetivo de la sesión</span>
                        <h4 className="text-sm font-extrabold text-white">Sentadilla Trasera Pesada & Dominancia de Cadera</h4>
                      </div>
                      <span className="text-xs text-dark-400">⏱️ Duración estimada: 65 min</span>
                    </div>

                    {[
                      { id: 'ex2_1', name: 'Movilidad de Cadera & Tobillo', detail: 'Cossack Squats + 90/90 de cadera + 20 Air Squats', sets: '2 series x 10 reps', rest: '30s', rpe: 'Activación' },
                      { id: 'ex2_2', name: 'Back Squat (Sentadilla Trasera con Barra)', detail: 'Romper paralelo, empujar con talones y rodillas alineadas.', sets: '5 series x 5 reps', rest: '120s', rpe: 'RPE 8.5' },
                      { id: 'ex2_3', name: 'Peso Muerto Rumano (RDL)', detail: 'Bisagra de cadera pura, estiramiento profundo de isquiotibiales.', sets: '4 series x 8-10 reps', rest: '90s', rpe: 'RPE 8' },
                      { id: 'ex2_4', name: 'Sentadilla Búlgara con Mancuernas', detail: 'Pie elevado en banco, torso ligeramente inclinado.', sets: '3 series x 10 reps / pierna', rest: '60s', rpe: 'RPE 8' },
                      { id: 'ex2_5', name: 'Hip Thrust o Puentes de Glúteo', detail: 'Pausa de 2 segundos en el bloqueo superior.', sets: '3 series x 12 reps', rest: '60s', rpe: 'RPE 8' },
                      { id: 'ex2_6', name: 'Core Finisher: Tabata 4 Minutos', detail: '20s Plancha Hollow / 10s descanso / 20s Superman Hold', sets: '8 intervalos', rest: '10s por intervalo', rpe: 'Intensidad alta' },
                    ].map((ex) => (
                      <div
                        key={ex.id}
                        onClick={() => toggleExercise(ex.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          completedExercises[ex.id]
                            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200 opacity-80'
                            : 'bg-dark-900/60 border-dark-700/60 hover:border-sky-500/40 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <input
                            type="checkbox"
                            checked={!!completedExercises[ex.id]}
                            onChange={() => {}}
                            className="w-5 h-5 rounded border-dark-600 text-sky-500 focus:ring-0 cursor-pointer"
                          />
                          <div>
                            <h5 className={`text-sm font-bold ${completedExercises[ex.id] ? 'line-through text-emerald-300' : 'text-white'}`}>
                              {ex.name}
                            </h5>
                            <p className="text-xs text-[#C2C0B6] mt-0.5">{ex.detail}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-sky-400 block">{ex.sets}</span>
                          <span className="text-[10px] text-dark-400 block">Descanso: {ex.rest} | {ex.rpe}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {['dia3', 'dia4', 'dia5'].includes(onlineDay) && (
                  <div className="p-8 rounded-xl bg-dark-900 border border-dark-700 text-center">
                    <p className="text-sm font-bold text-white mb-2">
                      {onlineDay === 'dia3' && 'Día 3: WOD Acondicionamiento Metabólico (Chipper 20 Min)'}
                      {onlineDay === 'dia4' && 'Día 4: Empuje & Tracción Hipertrofia Funcional'}
                      {onlineDay === 'dia5' && 'Día 5: Full Body & Movilidad Activa'}
                    </p>
                    <p className="text-xs text-[#C2C0B6] max-w-md mx-auto mb-4">
                      Bloque programado según tu nivel de la semana. Puedes consultar los detalles completos o solicitar modificaciones a la Coach.
                    </p>
                    <a
                      href="https://wa.me/584147225979?text=Hola%20Coach%20Mauroly,%20quiero%20revisar%20mi%20sesión%20del%20día%20en%20el%20portal%20online"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase tracking-wider inline-block transition-colors"
                    >
                      Consultar detalles con la Coach
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Módulo de Nutrición Online del Atleta */}
            <section className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>🥗</span> Plan Nutricional Asignado
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    Objetivos de Nutrición & Macros
                  </h3>
                </div>
                <span className="text-xs text-[#C2C0B6] font-light">
                  Ajustado por Lic. Mauroly Mercado
                </span>
              </div>

              {/* Tarjetas de Macronutrientes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 text-center">
                  <span className="text-[10px] text-dark-400 uppercase tracking-widest block mb-1">Calorías Meta</span>
                  <span className="text-2xl font-black text-white">2,150</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">kcal / día</span>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 text-center">
                  <span className="text-[10px] text-dark-400 uppercase tracking-widest block mb-1">Proteínas</span>
                  <span className="text-2xl font-black text-[#F43F5E]">145g</span>
                  <span className="text-[10px] text-[#C2C0B6] block mt-1">2.0g / kg peso</span>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 text-center">
                  <span className="text-[10px] text-dark-400 uppercase tracking-widest block mb-1">Carbohidratos</span>
                  <span className="text-2xl font-black text-sky-400">230g</span>
                  <span className="text-[10px] text-[#C2C0B6] block mt-1">Energía limpia</span>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 text-center">
                  <span className="text-[10px] text-dark-400 uppercase tracking-widest block mb-1">Grasas Saludables</span>
                  <span className="text-2xl font-black text-amber-400">65g</span>
                  <span className="text-[10px] text-[#C2C0B6] block mt-1">Hormonal & salud</span>
                </div>
              </div>

              {/* Consejos Clave de la Coach */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Pautas del Mes para tus Comidas
                </h4>
                <ul className="text-xs text-[#C2C0B6] space-y-1.5 font-light">
                  <li>• <strong>Pre-Entreno (1-2h antes):</strong> Carbohidratos de fácil digestión (avena, plátano, pan blanco) + porción de proteína magra.</li>
                  <li>• <strong>Post-Entreno:</strong> 25-35g de proteína rápida + hidratación con electrolitos o agua con una pizca de sal marina.</li>
                  <li>• <strong>Agua diaria:</strong> Mínimo 3.2 litros diarios distribuidos durante el día para mantener el rendimiento muscular.</li>
                </ul>
              </div>
            </section>

            {/* Zona de Corrección Técnica en Video */}
            <section id="correccion-video" className="bg-dark-800/40 border border-dark-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <span>📹</span> Feedback Técnico Directo
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Enviar Video para Corrección de Técnica
                </h3>
                <p className="text-xs text-[#C2C0B6] font-light mt-1">
                  Pega el enlace de tu video (Drive, iCloud, YouTube, etc.) o compártelo directo a WhatsApp para que tu Coach te envíe la retroalimentación.
                </p>
              </div>

              {videoFeedback && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs mb-6">
                  {videoFeedback}
                </div>
              )}

              <form onSubmit={handleSendVideoCorrection} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-dark-300 uppercase tracking-wider mb-1.5">
                    Ejercicio a Corregir
                  </label>
                  <select
                    value={videoFormData.ejercicio}
                    onChange={(e) => setVideoFormData({ ...videoFormData, ejercicio: e.target.value })}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Back Squat (Sentadilla Trasera)">Back Squat (Sentadilla Trasera)</option>
                    <option value="Deadlift (Peso Muerto)">Deadlift (Peso Muerto)</option>
                    <option value="Bench Press (Press de Banca)">Bench Press (Press de Banca)</option>
                    <option value="Clean & Jerk (Cargada y Envión)">Clean & Jerk (Cargada y Envión)</option>
                    <option value="Snatch (Arrancada)">Snatch (Arrancada)</option>
                    <option value="Pull-ups / Dominadas">Pull-ups / Dominadas</option>
                    <option value="Otro Movimiento">Otro Movimiento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-dark-300 uppercase tracking-wider mb-1.5">
                    Enlace del Video (Drive / YouTube / iCloud)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={videoFormData.link}
                    onChange={(e) => setVideoFormData({ ...videoFormData, link: e.target.value })}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-dark-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-dark-300 uppercase tracking-wider mb-1.5">
                    ¿Qué sentiste durante la serie o qué duda tienes?
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Sentí molestia en la zona lumbar en la última repetición / ¿Está bien mi profundidad?"
                    value={videoFormData.notas}
                    onChange={(e) => setVideoFormData({ ...videoFormData, notas: e.target.value })}
                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-dark-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/20 active:scale-95 cursor-pointer"
                  >
                    Enviar a la Coach vía WhatsApp 📲
                  </button>
                  <a
                    href="https://wa.me/584147225979?text=Hola%20Coach%20Mauroly,%20te%20adjunto%20directamente%20mi%20video%20para%20corrección%20técnica"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-dark-900 hover:bg-dark-700 border border-dark-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                  >
                    <span>Enviar archivo directo por WhatsApp</span>
                  </a>
                </div>
              </form>
            </section>

          </div>
        )}


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
