import { useState, useEffect, useMemo } from 'react';
import { api } from '../../utils/api';

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

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export default function HorariosAdmin() {
  // Pestaña activa ('clases' | 'asistencia')
  const [activeTab, setActiveTab] = useState('clases');

  // Estados de gestión de clases
  const [filterDay, setFilterDay] = useState('all');
  const [shifts, setShifts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  // Form states para nueva clase
  const [name, setName] = useState('CrossFit');
  const [customName, setCustomName] = useState('');
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('07:00');
  const [day, setDay] = useState('Lunes a Viernes');
  const [coach, setCoach] = useState('Mairover');
  const [capacity, setCapacity] = useState('15');

  // Estados para pase de asistencia y reservas
  const [attendanceDate, setAttendanceDate] = useState(getTodayStr());
  const [attendanceClaseId, setAttendanceClaseId] = useState('all');
  const [attendanceStatus, setAttendanceStatus] = useState('all');
  const [attendanceSearch, setAttendanceSearch] = useState('');
  const [reservas, setReservas] = useState([]);
  const [loadingReservas, setLoadingReservas] = useState(false);
  const [updatingReservaId, setUpdatingReservaId] = useState(null);

  // Modal para agregar atleta en puerta (Walk-in)
  const [isWalkinModalOpen, setIsWalkinModalOpen] = useState(false);
  const [clientesList, setClientesList] = useState([]);
  const [walkinClienteId, setWalkinClienteId] = useState('');
  const [walkinClaseId, setWalkinClaseId] = useState('');

  const disciplines = [
    'CrossFit',
    'Funcionales',
    'Hyrox',
    'CrossFit Kids',
    'Entrenamiento Personal',
    'Asesoría Nutricional',
    'Bienestar Físico',
    'Open Box',
    'Otro (Personalizado)',
  ];

  const dayOptions = [
    'Lunes a Viernes',
    'Lunes, Miércoles y Viernes',
    'Martes y Jueves',
    'Sábados',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  // Cargar clases
  const fetchShifts = async () => {
    try {
      setLoading(true);
      const data = await api.getHorarios({ day: filterDay });
      setShifts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, [filterDay]);

  // Cargar lista de clientes para walk-in
  useEffect(() => {
    async function loadClientes() {
      try {
        const data = await api.getClientes();
        setClientesList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading clientes:', err);
      }
    }
    loadClientes();
  }, []);

  // Cargar reservas para el pase de asistencia
  const fetchReservas = async () => {
    try {
      setLoadingReservas(true);
      const data = await api.getAdminReservas({
        fecha: attendanceDate,
        claseId: attendanceClaseId,
        status: attendanceStatus,
        search: attendanceSearch,
      });
      setReservas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    } finally {
      setLoadingReservas(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'asistencia') {
      fetchReservas();
    }
  }, [activeTab, attendanceDate, attendanceClaseId, attendanceStatus, attendanceSearch]);

  // Helper para convertir 24h a 12h AM/PM
  const formatTime12h = (time24) => {
    if (!time24) return '';
    const [hrs, mins] = time24.split(':');
    let hours = parseInt(hrs, 10);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    return `${formattedHours}:${mins} ${suffix}`;
  };

  // Crear nueva clase
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalClassName = name === 'Otro (Personalizado)' ? customName : name;
    if (!finalClassName || !startTime || !endTime) return;

    const formattedTimeRange = `${formatTime12h(startTime)} - ${formatTime12h(endTime)}`;

    try {
      await api.createHorario({
        name: finalClassName,
        time: formattedTimeRange,
        day,
        coach,
        capacity: parseInt(capacity, 10),
      });

      setFeedback(`Clase "${finalClassName}" guardada con éxito.`);
      setTimeout(() => setFeedback(''), 3000);

      setName('CrossFit');
      setCustomName('');
      setStartTime('06:00');
      setEndTime('07:00');
      setDay('Lunes a Viernes');
      setCoach('Mairover');
      setCapacity('15');
      setIsModalOpen(false);

      fetchShifts();
    } catch (err) {
      console.error('Error saving schedule:', err);
    }
  };

  // Ajuste rápido de aforo (+ / -)
  const handleUpdateEnrolled = async (shift, delta) => {
    const current = shift.enrolled || 0;
    const max = shift.capacity || 15;
    const nextVal = Math.max(0, Math.min(max, current + delta));
    if (nextVal === current) return;

    try {
      await api.updateHorario(shift.id, {
        name: shift.name,
        time: shift.time,
        day: shift.day,
        coach: shift.coach,
        capacity: shift.capacity,
        enrolled: nextVal,
      });

      setShifts((prev) =>
        prev.map((s) => (s.id === shift.id ? { ...s, enrolled: nextVal } : s))
      );
    } catch (err) {
      console.error('Error updating enrolled attendees:', err);
    }
  };

  // Eliminar clase
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario? Los cambios se reflejarán inmediatamente en la web pública.')) {
      try {
        await api.deleteHorario(id);
        setFeedback('Horario eliminado con éxito.');
        setTimeout(() => setFeedback(''), 3000);
        fetchShifts();
      } catch (err) {
        console.error('Error deleting schedule:', err);
      }
    }
  };

  // Cambiar estado de asistencia de una reserva
  const handleUpdateAsistencia = async (reservaId, newStatus) => {
    setUpdatingReservaId(reservaId);
    try {
      await api.updateAsistencia(reservaId, newStatus);
      setReservas((prev) =>
        prev.map((r) => (r.id === reservaId ? { ...r, status: newStatus } : r))
      );
      setFeedback(`Asistencia actualizada a "${newStatus}".`);
      setTimeout(() => setFeedback(''), 3000);
      fetchShifts();
    } catch (err) {
      console.error('Error updating attendance:', err);
    } finally {
      setUpdatingReservaId(null);
    }
  };

  // Abrir asistencia filtrada para una clase específica
  const handleVerAsistenciaClase = (shift) => {
    setAttendanceClaseId(shift.id.toString());
    setActiveTab('asistencia');
  };

  // Registrar asistencia walk-in
  const handleWalkinSubmit = async (e) => {
    e.preventDefault();
    if (!walkinClaseId) return;

    try {
      await api.createReservaAdmin({
        clienteId: walkinClienteId || null,
        claseId: walkinClaseId,
        fecha: attendanceDate,
      });

      setFeedback('Atleta registrado en la clase con éxito.');
      setTimeout(() => setFeedback(''), 3000);
      setIsWalkinModalOpen(false);
      setWalkinClienteId('');
      setWalkinClaseId('');
      fetchReservas();
      fetchShifts();
    } catch (err) {
      console.error('Error creating walk-in reservation:', err);
    }
  };

  const getDisciplineColor = (className) => {
    const n = (className || '').toLowerCase();
    if (n.includes('kids')) return 'border-[#D9C4F7] text-[#6E38BF] bg-[#EFE7FC]/20';
    if (n.includes('funcional')) return 'border-[#B6DFF8] text-[#1869A8] bg-[#E1F2FC]/20';
    if (n.includes('hyrox')) return 'border-[#F6E9A9] text-[#8C7015] bg-[#FEF8DE]/20';
    if (n.includes('personal')) return 'border-[#FCD3A5] text-[#AB6112] bg-[#FFEAD2]/20';
    if (n.includes('nutrici')) return 'border-[#B3E8E1] text-[#137E70] bg-[#DDF5F2]/20';
    if (n.includes('bienestar')) return 'border-[#BEE8C4] text-[#217D38] bg-[#E4F7E7]/20';
    if (n.includes('open')) return 'border-[#D2D5D9] text-[#55595E] bg-[#E8EAED]/20';
    return 'border-primary-500/30 text-primary-400 bg-primary-500/10';
  };

  // Estadísticas del pase de asistencia del día
  const statsAsistencia = useMemo(() => {
    const total = reservas.length;
    const asistieron = reservas.filter((r) => r.status === 'asistio').length;
    const confirmadas = reservas.filter((r) => r.status === 'confirmada').length;
    const canceladas = reservas.filter((r) => r.status === 'cancelada').length;
    return { total, asistieron, confirmadas, canceladas };
  }, [reservas]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto text-white space-y-6">
      
      {/* Encabezado General */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            HORARIOS & <span className="text-primary-500">ASISTENCIA</span>
          </h1>
          <p className="text-accent-gray-light text-sm mt-1">
            Gestión completa de clases, aforos en tiempo real y lista de asistencia por turno.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {feedback && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg animate-[fadeIn_0.2s_ease-out]">
              ✓ {feedback}
            </span>
          )}

          {activeTab === 'clases' ? (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-500/20 flex items-center gap-2 text-white"
            >
              <span>➕</span> NUEVA CLASE
            </button>
          ) : (
            <button
              onClick={() => setIsWalkinModalOpen(true)}
              className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-500/20 flex items-center gap-2 text-white"
            >
              <span>+</span> ANOTAR ATLETA
            </button>
          )}
        </div>
      </div>

      {/* Pestañas de Vista */}
      <div className="flex gap-2 p-1 bg-dark-800/60 border border-dark-700/60 rounded-xl backdrop-blur-md w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('clases')}
          className={`py-2 px-5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'clases'
              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
              : 'text-dark-300 hover:text-white'
          }`}
        >
          <span>📅</span>
          <span>Clases y Grilla Semanal</span>
          <span className="text-[11px] opacity-75 font-mono">({shifts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('asistencia')}
          className={`py-2 px-5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'asistencia'
              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
              : 'text-dark-300 hover:text-white'
          }`}
        >
          <span>📋</span>
          <span>Pase de Asistencia & Atletas</span>
          <span className="text-[11px] opacity-75 font-mono">({reservas.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* VISTA 1: GRILLA DE CLASES Y HORARIOS */}
      {/* ======================================================== */}
      {activeTab === 'clases' && (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
          
          {/* Filtros por Día */}
          <div className="bg-dark-800/40 border border-dark-700/50 p-4 rounded-xl backdrop-blur-md flex gap-2 overflow-x-auto">
            <button 
              onClick={() => setFilterDay('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                filterDay === 'all' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'
              }`}
            >
              Todos los Días ({shifts.length})
            </button>
            <button 
              onClick={() => setFilterDay('Lunes a Viernes')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                filterDay === 'Lunes a Viernes' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'
              }`}
            >
              Lunes a Viernes
            </button>
            <button 
              onClick={() => setFilterDay('Lunes, Miércoles y Viernes')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                filterDay === 'Lunes, Miércoles y Viernes' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'
              }`}
            >
              Lun / Mié / Vie
            </button>
            <button 
              onClick={() => setFilterDay('Martes y Jueves')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                filterDay === 'Martes y Jueves' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'
              }`}
            >
              Mar / Jue
            </button>
            <button 
              onClick={() => setFilterDay('Sábado')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                filterDay.includes('Sábado') || filterDay.includes('Sabado') ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'
              }`}
            >
              Sábados
            </button>
          </div>

          {/* Grilla de Clases */}
          {loading ? (
            <div className="p-16 text-center text-accent-gray-light flex flex-col items-center justify-center">
              <span className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></span>
              <p className="mt-3 text-sm">Cargando turnos sincronizados...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shifts.map((shift) => {
                const isFull = (shift.enrolled || 0) >= (shift.capacity || 15);
                const styleColor = getDisciplineColor(shift.name);

                return (
                  <div 
                    key={shift.id} 
                    className="bg-dark-800/40 border border-dark-700/50 rounded-xl backdrop-blur-md p-6 flex flex-col relative overflow-hidden group hover:border-primary-500/40 transition-all shadow-md"
                  >
                    {isFull && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                        Lleno
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl border ${styleColor}`}>
                        ⏰
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white leading-tight">{shift.name}</h3>
                        <p className="text-xs text-primary-400 font-semibold">{shift.day}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 flex-grow">
                      <div className="flex justify-between text-sm border-b border-dark-700/40 pb-2">
                        <span className="text-dark-300">Horario:</span>
                        <span className="font-semibold text-white">{shift.time}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-dark-700/40 pb-2">
                        <span className="text-dark-300">Coach:</span>
                        <span className="font-semibold text-white">{shift.coach}</span>
                      </div>
                      
                      {/* Aforo / Asistencia con contadores rápidos */}
                      <div className="flex items-center justify-between text-sm pt-1">
                        <span className="text-dark-300">Aforo / Asistencia:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateEnrolled(shift, -1)}
                            className="w-6 h-6 rounded bg-dark-700 hover:bg-dark-600 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            title="Restar 1 atleta"
                          >
                            -
                          </button>
                          <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                            isFull ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {shift.enrolled || 0} / {shift.capacity || 15}
                          </span>
                          <button
                            onClick={() => handleUpdateEnrolled(shift, 1)}
                            className="w-6 h-6 rounded bg-dark-700 hover:bg-dark-600 text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            title="Sumar 1 atleta"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="w-full bg-dark-900 rounded-full h-2 mt-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${isFull ? 'bg-red-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${Math.min(100, ((shift.enrolled || 0) / (shift.capacity || 15)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Botones de acción inferior */}
                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-dark-700/40">
                      <button
                        type="button"
                        onClick={() => handleVerAsistenciaClase(shift)}
                        className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-dark-700 hover:bg-primary-500 text-dark-200 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>📋</span>
                        <span>Ver Asistencia</span>
                      </button>

                      <button 
                        onClick={() => handleDelete(shift.id)}
                        className="p-2 bg-dark-700 hover:bg-red-500 hover:text-white rounded-lg text-dark-300 transition-colors cursor-pointer"
                        title="Eliminar Horario de la web"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
              
              {shifts.length === 0 && (
                <div className="col-span-full bg-dark-800/20 border border-dark-700/50 p-8 rounded-xl text-center text-dark-300">
                  No hay clases configuradas para esta selección.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VISTA 2: PASE DE ASISTENCIA Y CONTROL DE RESERVAS */}
      {/* ======================================================== */}
      {activeTab === 'asistencia' && (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
          
          {/* Tarjetas KPI de Asistencia del Día */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700/60 backdrop-blur-md">
              <span className="text-xs text-dark-400 font-semibold uppercase">Total Reservas</span>
              <p className="text-2xl font-extrabold text-white mt-1">{statsAsistencia.total}</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700/60 backdrop-blur-md">
              <span className="text-xs text-emerald-400 font-semibold uppercase">✓ Asistieron</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{statsAsistencia.asistieron}</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700/60 backdrop-blur-md">
              <span className="text-xs text-primary-400 font-semibold uppercase">● Pendientes</span>
              <p className="text-2xl font-extrabold text-primary-400 mt-1">{statsAsistencia.confirmadas}</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700/60 backdrop-blur-md">
              <span className="text-xs text-dark-400 font-semibold uppercase">✗ Canceladas</span>
              <p className="text-2xl font-extrabold text-dark-400 mt-1">{statsAsistencia.canceladas}</p>
            </div>
          </div>

          {/* Barra de Filtros */}
          <div className="p-5 rounded-xl bg-dark-800/40 border border-dark-700/50 backdrop-blur-md space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Fecha */}
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-1.5">
                  Fecha del Pase
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setAttendanceDate(getTodayStr())}
                    className="px-2.5 py-1 text-xs rounded-lg bg-dark-700 hover:bg-dark-600 text-dark-200 hover:text-white cursor-pointer"
                    title="Hoy"
                  >
                    Hoy
                  </button>
                </div>
              </div>

              {/* Filtro por Clase */}
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-1.5">
                  Filtrar por Clase / Turno
                </label>
                <select
                  value={attendanceClaseId}
                  onChange={(e) => setAttendanceClaseId(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="all">Todas las clases ({shifts.length})</option>
                  {shifts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.time})
                    </option>
                  ))}
                </select>
              </div>

              {/* Estado */}
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-1.5">
                  Estado
                </label>
                <select
                  value={attendanceStatus}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="all">Todos los estados</option>
                  <option value="confirmada">● Confirmada (Pendiente)</option>
                  <option value="asistio">✓ Asistió (Presente)</option>
                  <option value="cancelada">✗ Cancelada</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-1.5">
                  Buscar Atleta
                </label>
                <input
                  type="text"
                  placeholder="Nombre o correo..."
                  value={attendanceSearch}
                  onChange={(e) => setAttendanceSearch(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none placeholder-dark-400"
                />
              </div>

            </div>

            <div className="flex items-center justify-between pt-2 border-t border-dark-700/40 text-xs text-accent-gray-light">
              <span className="capitalize">
                Mostrando lista para: <strong>{formatFechaEspanol(attendanceDate)}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setAttendanceClaseId('all');
                  setAttendanceStatus('all');
                  setAttendanceSearch('');
                }}
                className="text-primary-400 hover:text-primary-300 cursor-pointer"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          {/* Tabla de Asistencia */}
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl backdrop-blur-md overflow-hidden">
            {loadingReservas ? (
              <div className="p-16 text-center text-accent-gray-light flex flex-col items-center justify-center">
                <span className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></span>
                <p className="mt-3 text-sm">Cargando lista de atletas...</p>
              </div>
            ) : reservas.length === 0 ? (
              <div className="p-12 text-center text-dark-300 space-y-3">
                <span className="text-3xl block">📋</span>
                <p className="font-semibold text-sm text-white">No hay reservas para esta fecha o filtro</p>
                <p className="text-xs text-accent-gray-light max-w-sm mx-auto">
                  Puedes registrar un atleta directamente con el botón "+ Anotar Atleta" en la esquina superior.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-dark-900/70 border-b border-dark-700/60 uppercase tracking-wider text-dark-300">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Atleta</th>
                      <th className="py-3.5 px-4 font-semibold">Clase / Turno</th>
                      <th className="py-3.5 px-4 font-semibold">Plan</th>
                      <th className="py-3.5 px-4 font-semibold">Estado Actual</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Control de Asistencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700/30">
                    {reservas.map((res) => {
                      const isUpdating = updatingReservaId === res.id;
                      const cleanPhone = (res.telefonoAtleta || '').replace(/[^\d]/g, '');

                      return (
                        <tr key={res.id} className="hover:bg-dark-700/20 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white text-sm">{res.nombreAtleta}</div>
                            <div className="text-dark-400 font-mono text-[11px]">{res.emailAtleta}</div>
                            {res.telefonoAtleta && (
                              <div className="text-dark-400 text-[11px]">{res.telefonoAtleta}</div>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{res.claseNombre}</div>
                            <div className="text-primary-400 font-mono text-[11px]">⏰ {res.claseHora}</div>
                            {res.coach && (
                              <div className="text-dark-400 text-[11px]">Coach: {res.coach}</div>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-dark-700 text-dark-200">
                              {res.planAtleta || 'Clase Regular'}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            {res.status === 'asistio' ? (
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                ✓ Presente
                              </span>
                            ) : res.status === 'cancelada' ? (
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                ✗ Cancelada
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary-500/10 text-primary-400 border border-primary-500/20">
                                ● Confirmada
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Botón WhatsApp */}
                              {cleanPhone && (
                                <a
                                  href={`https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(res.nombreAtleta)},%20te%20esperamos%20en%20tu%20clase%20de%20${encodeURIComponent(res.claseNombre)}%20en%20MairoverFit.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-xs transition-colors"
                                  title="Enviar WhatsApp al atleta"
                                >
                                  💬
                                </a>
                              )}

                              {/* Marcar Presente */}
                              {res.status !== 'asistio' && (
                                <button
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={() => handleUpdateAsistencia(res.id, 'asistio')}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors cursor-pointer disabled:opacity-50"
                                >
                                  ✓ Presente
                                </button>
                              )}

                              {/* Marcar Ausente / Cancelar */}
                              {res.status !== 'cancelada' && (
                                <button
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={() => handleUpdateAsistencia(res.id, 'cancelada')}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-dark-700 hover:bg-red-500 hover:text-white text-dark-300 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                  ✗ Cancelar
                                </button>
                              )}

                              {/* Reset a Confirmada */}
                              {(res.status === 'asistio' || res.status === 'cancelada') && (
                                <button
                                  type="button"
                                  disabled={isUpdating}
                                  onClick={() => handleUpdateAsistencia(res.id, 'confirmada')}
                                  className="px-2 py-1.5 rounded-lg text-xs font-semibold bg-dark-700 hover:bg-dark-600 text-dark-300 transition-colors cursor-pointer"
                                  title="Restablecer a confirmada"
                                >
                                  ↺
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CONFIGURAR NUEVA CLASE */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Configurar Nueva Clase</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Modalidad / Disciplina
                </label>
                <select 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none mb-2"
                >
                  {disciplines.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {name === 'Otro (Personalizado)' && (
                  <input 
                    type="text" 
                    placeholder="Escribe el nombre de la clase..." 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Hora Inicio
                  </label>
                  <input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Hora Fin
                  </label>
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Días Asignados
                </label>
                <select 
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                >
                  {dayOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Coach a Cargo
                  </label>
                  <input 
                    type="text" 
                    value={coach}
                    onChange={(e) => setCoach(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Aforo / Capacidad
                  </label>
                  <input 
                    type="number" 
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    min="1"
                    max="100"
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-dark-700/50">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm text-dark-300 hover:text-white bg-dark-700 hover:bg-dark-600 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Guardar Horario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ANOTAR ATLETA EN PUERTA (WALK-IN) */}
      {/* ======================================================== */}
      {isWalkinModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-1 text-white">Anotar Atleta en Clase</h3>
            <p className="text-xs text-accent-gray-light mb-4">
              Registra la asistencia en puerta de un atleta para el día seleccionado.
            </p>

            <form onSubmit={handleWalkinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Atleta Registrado
                </label>
                <select
                  value={walkinClienteId}
                  onChange={(e) => setWalkinClienteId(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Selecciona un atleta...</option>
                  {clientesList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.plan})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Clase y Turno de Destino
                </label>
                <select
                  required
                  value={walkinClaseId}
                  onChange={(e) => setWalkinClaseId(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Selecciona la clase...</option>
                  {shifts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.time}) - {s.coach}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Fecha de la Clase
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-dark-700/50">
                <button
                  type="button"
                  onClick={() => setIsWalkinModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm text-dark-300 hover:text-white bg-dark-700 hover:bg-dark-600 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Confirmar Asistencia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
