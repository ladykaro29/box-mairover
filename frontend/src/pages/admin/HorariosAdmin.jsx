import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

export default function HorariosAdmin() {
  const [filterDay, setFilterDay] = useState('all');
  const [shifts, setShifts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  // Form states
  const [name, setName] = useState('CrossFit');
  const [customName, setCustomName] = useState('');
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('07:00');
  const [day, setDay] = useState('Lunes a Viernes');
  const [coach, setCoach] = useState('Mairover');
  const [capacity, setCapacity] = useState('15');

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

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const data = await api.getHorarios({
        day: filterDay,
      });
      setShifts(data);
    } catch (err) {
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, [filterDay]);

  // Helper to convert 24h to 12h AM/PM
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

      // Reset
      setName('CrossFit');
      setCustomName('');
      setStartTime('06:00');
      setEndTime('07:00');
      setDay('Lunes a Viernes');
      setCoach('Mairover');
      setCapacity('15');
      setIsModalOpen(false);

      // Refresh list
      fetchShifts();
    } catch (err) {
      console.error('Error saving schedule:', err);
    }
  };

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

      // Update locally immediately for responsiveness
      setShifts((prev) =>
        prev.map((s) => (s.id === shift.id ? { ...s, enrolled: nextVal } : s))
      );
    } catch (err) {
      console.error('Error updating enrolled attendees:', err);
    }
  };

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

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            GESTIÓN DE <span className="text-primary-500">HORARIOS</span>
          </h1>
          <p className="text-accent-gray-light text-sm mt-1">
            Configura clases, coaches y aforos. Los cambios se sincronizan en vivo con la web pública.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {feedback && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              ✓ {feedback}
            </span>
          )}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-500/20 flex items-center gap-2 text-white"
          >
            <span>➕</span> NUEVA CLASE
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-800/40 border border-dark-700/50 p-4 rounded-xl backdrop-blur-md mb-6 flex gap-2 overflow-x-auto">
        <button 
          onClick={() => setFilterDay('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay === 'all' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Todos los Días ({shifts.length})
        </button>
        <button 
          onClick={() => setFilterDay('Lunes a Viernes')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay === 'Lunes a Viernes' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Lunes a Viernes
        </button>
        <button 
          onClick={() => setFilterDay('Lunes, Miércoles y Viernes')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay === 'Lunes, Miércoles y Viernes' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Lun / Mié / Vie
        </button>
        <button 
          onClick={() => setFilterDay('Martes y Jueves')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay === 'Martes y Jueves' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Mar / Jue
        </button>
        <button 
          onClick={() => setFilterDay('Sábado')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay.includes('Sábado') || filterDay.includes('Sabado') ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Sábados
        </button>
      </div>

      {/* Shifts Grid */}
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
                className={`bg-dark-800/40 border border-dark-700/50 rounded-xl backdrop-blur-md p-6 flex flex-col relative overflow-hidden group hover:border-primary-500/40 transition-all shadow-md`}
              >
                {/* Full Indicator */}
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
                  
                  {/* Occupancy with quick counters */}
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
                      <span className={`font-bold px-2 py-0.5 rounded text-xs ${isFull ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
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
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-dark-900 rounded-full h-2 mt-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${isFull ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${Math.min(100, ((shift.enrolled || 0) / (shift.capacity || 15)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <div className="flex-grow py-2.5 bg-dark-700/60 rounded-lg text-xs font-semibold text-dark-300 text-center">
                    Cupos disp: {Math.max(0, (shift.capacity || 15) - (shift.enrolled || 0))}
                  </div>
                  <button 
                    onClick={() => handleDelete(shift.id)}
                    className="p-2.5 bg-dark-700 hover:bg-primary-500 hover:text-white rounded-lg text-dark-300 transition-colors cursor-pointer"
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

      {/* Modal - Nueva Clase */}
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
                    required
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Hora Inicio</label>
                  <input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Hora Fin</label>
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Día(s)</label>
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
                
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Aforo Máximo</label>
                  <input 
                    type="number" 
                    placeholder="15" 
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Coach Entrenador</label>
                <input 
                  type="text" 
                  value={coach}
                  onChange={(e) => setCoach(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 py-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-sm font-semibold transition-colors text-white cursor-pointer"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors shadow-lg text-white cursor-pointer"
                >
                  PUBLICAR EN WEB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
