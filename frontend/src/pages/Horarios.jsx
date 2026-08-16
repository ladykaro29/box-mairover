import { useState } from 'react';

export default function Horarios() {
  const [selectedDay, setSelectedDay] = useState('Lunes');

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const scheduleData = {
    Lunes: [
      { hora: '06:00 AM - 07:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '12 / 15' },
      { hora: '07:00 AM - 08:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '15 / 15' },
      { hora: '08:00 AM - 09:00 AM', clase: 'Funcionales', coach: 'Carlos', cupos: '8 / 15' },
      { hora: '05:30 PM - 06:30 PM', clase: 'CrossFit', coach: 'Mairover', cupos: '14 / 15' },
      { hora: '06:30 PM - 07:30 PM', clase: 'Hyrox', coach: 'Carlos', cupos: '10 / 15' },
    ],
    Martes: [
      { hora: '06:00 AM - 07:00 AM', clase: 'Funcionales', coach: 'Carlos', cupos: '9 / 15' },
      { hora: '07:00 AM - 08:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '11 / 15' },
      { hora: '08:00 AM - 09:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '13 / 15' },
      { hora: '05:30 PM - 06:30 PM', clase: 'CrossFit', coach: 'Mairover', cupos: '15 / 15' },
      { hora: '06:30 PM - 07:30 PM', clase: 'Funcionales', coach: 'Carlos', cupos: '7 / 15' },
    ],
    Miércoles: [
      { hora: '06:00 AM - 07:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '10 / 15' },
      { hora: '07:00 AM - 08:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '15 / 15' },
      { hora: '08:00 AM - 09:00 AM', clase: 'Funcionales', coach: 'Carlos', cupos: '6 / 15' },
      { hora: '05:30 PM - 06:30 PM', clase: 'CrossFit', coach: 'Mairover', cupos: '13 / 15' },
      { hora: '06:30 PM - 07:30 PM', clase: 'Hyrox', coach: 'Carlos', cupos: '11 / 15' },
    ],
    Jueves: [
      { hora: '06:00 AM - 07:00 AM', clase: 'Funcionales', coach: 'Carlos', cupos: '8 / 15' },
      { hora: '07:00 AM - 08:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '10 / 15' },
      { hora: '08:00 AM - 09:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '12 / 15' },
      { hora: '05:30 PM - 06:30 PM', clase: 'CrossFit', coach: 'Mairover', cupos: '14 / 15' },
      { hora: '06:30 PM - 07:30 PM', clase: 'Funcionales', coach: 'Carlos', cupos: '8 / 15' },
    ],
    Viernes: [
      { hora: '06:00 AM - 07:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '11 / 15' },
      { hora: '07:00 AM - 08:00 AM', clase: 'CrossFit', coach: 'Mairover', cupos: '13 / 15' },
      { hora: '08:00 AM - 09:00 AM', clase: 'Funcionales', coach: 'Carlos', cupos: '9 / 15' },
      { hora: '05:30 PM - 06:30 PM', clase: 'CrossFit', coach: 'Mairover', cupos: '15 / 15' },
      { hora: '06:30 PM - 07:30 PM', clase: 'Hyrox', coach: 'Carlos', cupos: '12 / 15' },
    ],
    Sábado: [
      { hora: '08:00 AM - 09:00 AM', clase: 'CrossFit (WOD Especial)', coach: 'Mairover', cupos: '15 / 15' },
      { hora: '09:00 AM - 10:00 AM', clase: 'CrossFit (WOD Especial)', coach: 'Mairover', cupos: '15 / 15' },
      { hora: '10:00 AM - 11:30 AM', clase: 'Open Box / Comunidad', coach: 'Staff', cupos: '20 / 30' },
    ],
  };

  return (
    <div className="bg-dark-900 min-h-screen text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 text-center">
          CALENDARIO DE LA <span className="text-primary-500">SEMANA</span>
        </h1>
        <p className="text-accent-gray-light max-w-2xl mx-auto mb-12 text-lg text-center">
          Organiza tus entrenamientos. Haz clic en los días para ver los diferentes horarios de clases y cupos disponibles en tiempo real.
        </p>

        {/* Days Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded font-semibold text-sm transition-all duration-200 cursor-pointer ${
                selectedDay === day
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-dark-800 border border-dark-700/50 text-accent-gray-light hover:bg-dark-700 hover:text-white'
              }`}
            >
              {day.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Schedule Grid Table */}
        <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl overflow-hidden backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-800 border-b border-dark-700/60">
                  <th className="p-5 font-semibold text-sm text-dark-300 uppercase tracking-wider">Hora</th>
                  <th className="p-5 font-semibold text-sm text-dark-300 uppercase tracking-wider">Clase / Modalidad</th>
                  <th className="p-5 font-semibold text-sm text-dark-300 uppercase tracking-wider">Entrenador</th>
                  <th className="p-5 font-semibold text-sm text-dark-300 uppercase tracking-wider">Disponibilidad</th>
                  <th className="p-5 font-semibold text-sm text-dark-300 uppercase tracking-wider text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700/30">
                {scheduleData[selectedDay].map((row, idx) => (
                  <tr key={idx} className="hover:bg-primary-500/5 transition-colors duration-200">
                    <td className="p-5 text-sm font-medium">{row.hora}</td>
                    <td className="p-5 text-sm">
                      <span className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full font-medium text-xs">
                        {row.clase}
                      </span>
                    </td>
                    <td className="p-5 text-sm text-accent-gray-light">{row.coach}</td>
                    <td className="p-5 text-sm text-accent-gray-light font-medium">{row.cupos}</td>
                    <td className="p-5 text-sm text-right">
                      <button className="px-4 py-2 bg-primary-500 text-white rounded font-medium text-xs hover:bg-primary-600 transition-colors shadow shadow-primary-500/10 cursor-pointer">
                        Reservar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
