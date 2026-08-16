import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { api } from '../../utils/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await api.getDashboardStats();
        setStats(data.stats);
        setRecentPayments(data.recentPayments);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);


  // Dummy chart data for financial history
  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        fill: true,
        label: 'Ingresos ($)',
        data: [3200, 3800, 4100, 4700, 5240, 5800],
        borderColor: '#E85D4E',
        backgroundColor: 'rgba(232, 93, 78, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#C2C0B6' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#C2C0B6' } },
    },
  };

  if (loading) {
    return (
      <div className="bg-dark-900 min-h-screen text-white flex flex-col items-center justify-center">
        <span className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></span>
        <p className="mt-4 text-accent-gray-light font-medium text-sm">Cargando panel administrativo...</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-900 min-h-screen text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-dark-700/40">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">PANEL <span className="text-primary-500">ADMINISTRATIVO</span></h1>
            <p className="text-accent-gray-light text-sm mt-1">Monitorea las estadísticas principales de tu box MairoverFit.</p>
          </div>
          <button className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded text-sm font-semibold transition-colors duration-200 cursor-pointer">
            + NUEVA EVALUACIÓN
          </button>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md">
              <div className="flex justify-between items-start mb-4">
                <span className="text-dark-300 text-sm font-medium">{stat.label}</span>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <h2 className="text-3xl font-extrabold mb-1">{stat.value}</h2>
              <p className="text-xs text-primary-400 font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Visual Charts & Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Income Chart */}
          <div className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-semibold mb-6">Historial de Ingresos</h3>
            <div className="h-64 flex-grow">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-6">Pagos Recientes</h3>
              <div className="space-y-4">
                {recentPayments.map((pay, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-dark-700/20 pb-3 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-medium text-white">{pay.cliente}</h4>
                      <p className="text-xs text-dark-300">{pay.plan} • {pay.fecha}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-500">{pay.monto}</p>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-semibold ${
                        pay.estado === 'Completado' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {pay.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-dark-700 hover:bg-dark-600 rounded text-xs font-semibold text-accent-gray-light transition-colors cursor-pointer">
              VER HISTORIAL COMPLETO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
