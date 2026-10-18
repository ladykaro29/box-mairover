import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { api } from '../../utils/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Procesos() {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [tipo, setTipo] = useState('Bimensual');
  const [peso, setPeso] = useState('');
  const [grasa, setGrasa] = useState('');
  const [musculo, setMusculo] = useState('');
  const [nota, setNota] = useState('');

  // Load clients list for the selector
  useEffect(() => {
    async function loadInitialClientes() {
      try {
        const data = await api.getClientes();
        setClientes(data);
        if (data.length > 0) {
          setSelectedClient(data[0].id.toString()); // Default to the first client
        }
      } catch (err) {
        console.error('Error loading initial clients:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialClientes();
  }, []);

  // Load evaluations when the selected client changes
  const loadEvaluations = async () => {
    if (!selectedClient) return;
    try {
      const data = await api.getEvaluaciones(selectedClient);
      setEvaluaciones(data);
    } catch (err) {
      console.error('Error fetching evaluations:', err);
    }
  };

  useEffect(() => {
    loadEvaluations();
  }, [selectedClient]);

  // Handle evaluation submission
  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedClient) {
      setErrorMsg('Debes seleccionar un cliente primero.');
      return;
    }
    if (!peso || !grasa || !musculo) {
      setErrorMsg('Por favor completa todos los campos numéricos de composición.');
      return;
    }

    try {
      await api.createEvaluacion({
        clienteId: selectedClient,
        tipo,
        peso: parseFloat(peso),
        grasa: parseInt(grasa, 10),
        musculo: parseInt(musculo, 10),
        nota,
      });

      // Reset form
      setTipo('Bimensual');
      setPeso('');
      setGrasa('');
      setMusculo('');
      setNota('');
      setIsModalOpen(false);

      // Reload list
      loadEvaluations();
    } catch (err) {
      setErrorMsg('Error al registrar la evaluación física.');
    }
  };

  // Get active client details
  const activeClientObj = clientes.find(c => c.id.toString() === selectedClient);

  // Dynamic chart mapping from chronological evaluations (oldest to newest)
  const sortedEvals = [...evaluaciones].reverse();
  
  const chartData = {
    labels: sortedEvals.length > 0 
      ? sortedEvals.map(e => {
          const parts = e.fecha.split(' ');
          return parts.length >= 2 ? `${parts[0]} ${parts[1]}` : e.fecha;
        })
      : ['Sin Datos'],
    datasets: [
      {
        label: 'Peso (kg)',
        data: sortedEvals.length > 0 ? sortedEvals.map(e => parseFloat(e.peso)) : [0],
        borderColor: '#F43F5E',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Masa Muscular (%)',
        data: sortedEvals.length > 0 ? sortedEvals.map(e => parseFloat(e.musculo)) : [0],
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#C2C0B6' } },
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#C2C0B6' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#C2C0B6' } },
    },
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEGUIMIENTO DE <span className="text-primary-500">PROCESOS</span></h1>
          <p className="text-accent-gray-light text-sm mt-1">Monitorea las evaluaciones y progresos físicos anuales.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-500/20 flex items-center gap-2 text-white"
        >
          <span>➕</span> NUEVA EVALUACIÓN
        </button>
      </div>

      {/* Selector and Summary */}
      <div className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="w-full md:w-1/3">
            <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Seleccionar Cliente</label>
            <select 
              value={selectedClient} 
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-lg p-3 text-sm focus:outline-none text-white"
            >
              <option value="">Selecciona...</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-2/3 flex gap-4 md:justify-end">
            <div className="bg-dark-900/50 px-6 py-4 rounded-lg text-center border border-dark-700/50">
              <p className="text-xs text-dark-300 font-medium">Meta Principal</p>
              <p className="text-primary-500 font-bold">
                {activeClientObj?.plan === 'Max Performance' ? 'Fuerza Máxima' : 'Recomposición / Grasa'}
              </p>
            </div>
            <div className="bg-dark-900/50 px-6 py-4 rounded-lg text-center border border-dark-700/50">
              <p className="text-xs text-dark-300 font-medium">Evaluaciones Registradas</p>
              <p className="text-white font-bold">{evaluaciones.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md mb-8 h-80">
        <h3 className="text-lg font-semibold mb-4 text-white">Evolución Anual</h3>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Evaluations Table */}
      <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl backdrop-blur-md overflow-hidden">
        <div className="p-6 border-b border-dark-700/50">
          <h3 className="text-lg font-semibold text-white">Historial de Evaluaciones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-900/50 border-b border-dark-700/50">
                <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Fecha / Tipo</th>
                <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Peso / IMC</th>
                <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">% Grasa / Músculo</th>
                <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/20">
              {evaluaciones.map((evaluacion, index) => (
                <tr key={evaluacion.id || index} className="hover:bg-dark-700/20 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-white">{evaluacion.fecha}</p>
                    <p className="text-xs text-dark-300">{evaluacion.tipo}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-white">{evaluacion.peso} kg</p>
                    <p className="text-xs text-dark-300">IMC: {evaluacion.imc}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-red-400 font-medium">Grasa: <span className="font-bold">{evaluacion.grasa}%</span></p>
                    <p className="text-xs text-emerald-400 font-medium">Músculo: <span className="font-bold">{evaluacion.musculo}%</span></p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-accent-gray-light max-w-sm">{evaluacion.nota || 'Sin observaciones'}</p>
                  </td>
                </tr>
              ))}
              
              {evaluaciones.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-dark-300">
                    No hay evaluaciones físicas registradas para este miembro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Nueva Evaluación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Registrar Evaluación Física</h3>
            
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitEvaluation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Cliente Seleccionado</label>
                <div className="w-full bg-dark-900/50 border border-dark-700 rounded-lg p-3 text-sm text-white font-semibold">
                  {activeClientObj?.name || 'Ningún cliente seleccionado'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Tipo de Control</label>
                <select 
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="Inicial">Control Inicial</option>
                  <option value="Bimensual">Control Bimensual</option>
                  <option value="Anual">Control Anual</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Peso (kg)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    placeholder="75.5" 
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">% Grasa</label>
                  <input 
                    type="number" 
                    placeholder="20" 
                    value={grasa}
                    onChange={(e) => setGrasa(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">% Músculo</label>
                  <input 
                    type="number" 
                    placeholder="38" 
                    value={musculo}
                    onChange={(e) => setMusculo(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">Notas y Observaciones</label>
                <textarea 
                  rows="3"
                  placeholder="Ej. Excelente mejora en tren superior..."
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none resize-none"
                ></textarea>
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
