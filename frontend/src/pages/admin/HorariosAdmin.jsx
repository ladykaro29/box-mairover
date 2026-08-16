import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

export default function HorariosAdmin() {
  const [filterDay, setFilterDay] = useState('all');
  const [shifts, setShifts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('07:00');
  const [day, setDay] = useState('Lunes a Viernes');
  const [coach, setCoach] = useState('Mairover');
  const [capacity, setCapacity] = useState('15');

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
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    return `${formattedHours}:${mins} ${suffix}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !startTime || !endTime) return;

    const formattedTimeRange = `${formatTime12h(startTime)} - ${formatTime12h(endTime)}`;

    try {
      await api.createHorario({
        name,
        time: formattedTimeRange,
        day,
        coach,
        capacity: parseInt(capacity, 10),
      });

      // Reset
      setName('');
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      try {
        await api.deleteHorario(id);
        fetchShifts();
      } catch (err) {
        console.error('Error deleting schedule:', err);
      }
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GESTIÓN DE <span className="text-primary-500">HORARIOS</span></h1>
          <p className="text-accent-gray-light text-sm mt-1">Configura las clases, horarios y cupos disponibles.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-500/20 flex items-center gap-2 text-white"
        >
          <span>➕</span> NUEVA CLASE
        </button>
      </div>

      {/* Filters */}
      <div className="bg-dark-800/40 border border-dark-700/50 p-4 rounded-xl backdrop-blur-md mb-6 flex gap-2 overflow-x-auto">
        <button 
          onClick={() => setFilterDay('all')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay === 'all' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Todos los Días
        </button>
        <button 
          onClick={() => setFilterDay('Lunes a Viernes')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay === 'Lunes a Viernes' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Lunes a Viernes
        </button>
        <button 
          onClick={() => setFilterDay('Sábado')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterDay === 'Sábado' ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-300 hover:text-white'}`}
        >
          Sábados
        </button>
      </div>

      {/* Shifts Grid */}
      {loading ? (
        <div className="p-12 text-center text-accent-gray-light flex flex-col items-center justify-center">
          <span className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></span>
          <p className="mt-3 text-sm">Cargando turnos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shifts.map(shift => (
            <div key={shift.id} className="bg-dark-800/40 border border-dark-700/50 rounded-xl backdrop-blur-md p-6 flex flex-col relative overflow-hidden group">
              {/* Full Indicator */}
              {shift.enrolled >= shift.capacity && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Lleno
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center text-primary-500 text-xl border border-dark-600">
                  ⏰
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white leading-tight">{shift.name}</h3>
                  <p className="text-xs text-primary-400 font-medium">{shift.day}</p>
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
                <div className="flex justify-between text-sm">
                  <span className="text-dark-300">Ocupación:</span>
                  <span className={`font-semibold ${shift.enrolled >= shift.capacity ? 'text-red-400' : 'text-emerald-400'}`}>
                    {shift.enrolled} / {shift.capacity}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-dark-900 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${shift.enrolled >= shift.capacity ? 'bg-red-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${(shift.enrolled / shift.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <button className="flex-grow py-2.5 bg-dark-700 hover:bg-dark-600 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 text-white">
                  👥 VER LISTA
                </button>
                <button 
                  onClick={() => handleDelete(shift.id)}
                  className="p-2.5 bg-dark-700 hover:bg-primary-500 hover:text-white rounded-lg text-dark-300 transition-colors cursor-pointer"
                  title="Eliminar Horario"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          
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
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Nombre de la Clase</label>
                <input 
                  type="text" 
                  placeholder="Ej. CrossTraining Principiantes" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  required
                />
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
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Día</label>
                  <select 
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="Lunes a Viernes">Lunes a Viernes</option>
                    <option value="Sábados">Sábado</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Capacidad Máxima</label>
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
                  className="flex-1 py-3 bg-dark-700 hover:bg-dark-600 rounded-lg text-sm font-semibold transition-colors text-white"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors shadow-lg text-white"
                >
                  GUARDAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
