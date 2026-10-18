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
        borderColor: '#F43F5E',
        backgroundColor: 'rgba(244, 63, 94, 0.15)',
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-dark-700/60">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              PANEL <span className="text-primary-500">ADMINISTRATIVO</span>
            </h1>
            <p className="text-blue-200/70 text-sm mt-1 font-medium">Monitorea las estadísticas principales de tu box MairoverFit en tiempo real.</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg shadow-primary-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
            + NUEVA EVALUACIÓN
          </button>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-dark-800/90 border border-dark-700 p-6 rounded-2xl shadow-xl backdrop-blur-md hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-blue-200/70 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-1.5">{stat.value}</h2>
              <p className="text-xs text-primary-400 font-bold">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Visual Charts & Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Income Chart */}
          <div className="bg-dark-800/90 border border-dark-700 p-6 rounded-2xl shadow-xl backdrop-blur-md lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider">Historial de Ingresos</h3>
            <div className="h-64 flex-grow">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-dark-800/90 border border-dark-700 p-6 rounded-2xl shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider">Pagos Recientes</h3>
              <div className="space-y-4">
                {recentPayments.map((pay, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-dark-700/40 pb-3 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-bold text-white">{pay.cliente}</h4>
                      <p className="text-xs text-blue-200/60 font-medium">{pay.plan} • {pay.fecha}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-primary-500">{pay.monto}</p>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        pay.estado === 'Completado' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {pay.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-dark-700/80 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-all duration-200 uppercase tracking-wider cursor-pointer">
              VER HISTORIAL COMPLETO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
