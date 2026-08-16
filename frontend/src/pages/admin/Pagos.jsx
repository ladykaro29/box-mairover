import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [clientes, setClientes] = useState([]); // Loaded to populate dropdown inside modal
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  
  // Stats states
  const [stats, setStats] = useState({
    monthlyIncome: '$0.00',
    pendingPayments: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Clase Regular');
  const [selectedAmount, setSelectedAmount] = useState('45.00');
  const [selectedMethod, setSelectedMethod] = useState('transfer');
  const [paymentStatus, setPaymentStatus] = useState('Completado');

  const loadPagosData = async () => {
    try {
      setLoading(true);
      // Fetch payments
      const paymentsData = await api.getPagos({
        search: searchTerm,
        method: methodFilter,
      });
      setPagos(paymentsData);

      // Fetch payment stats
      const statsData = await api.getPaymentStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching payments details:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDropdownClientes = async () => {
    try {
      const data = await api.getClientes();
      setClientes(data);
    } catch (err) {
      console.error('Error loading dropdown clients:', err);
    }
  };

  useEffect(() => {
    loadPagosData();
  }, [searchTerm, methodFilter]);

  useEffect(() => {
    if (isModalOpen) {
      loadDropdownClientes();
    }
  }, [isModalOpen]);

  const handleRegisterPayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedClienteId) {
      setErrorMsg('Debes seleccionar un cliente.');
      return;
    }

    try {
      await api.createPago({
        clienteId: selectedClienteId,
        plan: selectedPlan,
        amount: parseFloat(selectedAmount),
        method: selectedMethod,
        status: paymentStatus,
      });

      // Clear form
      setSelectedClienteId('');
      setSelectedPlan('Clase Regular');
      setSelectedAmount('45.00');
      setSelectedMethod('transfer');
      setPaymentStatus('Completado');
      setIsModalOpen(false);

      // Reload
      loadPagosData();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error al registrar el pago.');
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.approvePago(id);
      loadPagosData();
    } catch (err) {
      console.error('Error approving payment:', err);
    }
  };

  // Adjust amount automatically based on plan selection
  const handlePlanChange = (planName) => {
    setSelectedPlan(planName);
    if (planName === 'Max Performance') {
      setSelectedAmount('75.00');
    } else if (planName === 'Básico') {
      setSelectedAmount('25.00');
    } else {
      setSelectedAmount('45.00');
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GESTIÓN DE <span className="text-primary-500">PAGOS</span></h1>
          <p className="text-accent-gray-light text-sm mt-1">Registra y verifica los pagos de las membresías.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-500/20 flex items-center gap-2 text-white"
        >
          <span>➕</span> REGISTRAR PAGO
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md">
          <p className="text-dark-300 text-sm font-medium mb-1">Ingresos Totales (Completados)</p>
          <h2 className="text-3xl font-extrabold text-white">{stats.monthlyIncome}</h2>
        </div>
        <div className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md">
          <p className="text-dark-300 text-sm font-medium mb-1">Pagos Pendientes</p>
          <h2 className="text-3xl font-extrabold text-amber-500">{stats.pendingPayments}</h2>
        </div>
        <div className="bg-dark-800/40 border border-dark-700/50 p-6 rounded-xl backdrop-blur-md">
          <p className="text-dark-300 text-sm font-medium mb-1">Total Transacciones</p>
          <h2 className="text-3xl font-extrabold text-white">{stats.totalTransactions}</h2>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-800/40 border border-dark-700/50 p-4 rounded-xl backdrop-blur-md mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar por cliente o ID de transacción..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-900 border border-dark-700 hover:border-primary-500/40 focus:border-primary-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all duration-200 text-white"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-300">🔍</span>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none text-white"
          >
            <option value="all">Método de Pago</option>
            <option value="transfer">Transferencia</option>
            <option value="cash">Efectivo</option>
            <option value="zelle">Zelle</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl backdrop-blur-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-accent-gray-light flex flex-col items-center justify-center">
            <span className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></span>
            <p className="mt-3 text-sm">Cargando transacciones...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-900/50 border-b border-dark-700/50">
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Transacción</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Cliente</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Plan / Monto</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Fecha / Método</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Estado</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700/20">
                {pagos.map(pago => (
                  <tr key={pago.id} className="hover:bg-dark-700/20 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-xs text-primary-400">{pago.id}</span>
                    </td>
                    <td className="p-4 font-semibold text-white">{pago.client}</td>
                    <td className="p-4">
                      <p className="text-sm text-dark-300">{pago.plan}</p>
                      <p className="font-bold text-white">{pago.amount}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-white">{pago.date}</p>
                      <p className="text-xs text-dark-300">{pago.method}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                        pago.status === 'Completado' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {pago.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {pago.status === 'Pendiente' && (
                        <button 
                          onClick={() => handleApprove(pago.id)}
                          className="p-2 text-dark-300 hover:text-emerald-500 transition-colors" 
                          title="Aprobar Pago"
                        >
                          ✅
                        </button>
                      )}
                      <button className="p-2 text-dark-300 hover:text-primary-500 transition-colors" title="Ver Recibo">
                        📄
                      </button>
                    </td>
                  </tr>
                ))}
                
                {pagos.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-dark-300">
                      No se encontraron transacciones.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Registrar Pago */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Registrar Pago Manual</h3>
            
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRegisterPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Cliente
                </label>
                <select 
                  value={selectedClienteId}
                  onChange={(e) => setSelectedClienteId(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 hover:border-primary-500/40 focus:border-primary-500 rounded-lg p-3 text-sm focus:outline-none transition-all duration-200 text-white"
                  required
                >
                  <option value="">Selecciona un cliente...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.plan})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Plan a renovar
                </label>
                <select 
                  value={selectedPlan}
                  onChange={(e) => handlePlanChange(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 hover:border-primary-500/40 focus:border-primary-500 rounded-lg p-3 text-sm focus:outline-none transition-all duration-200 text-white"
                >
                  <option value="Básico">Básico - $25.00</option>
                  <option value="Clase Regular">Clase Regular - $45.00</option>
                  <option value="Max Performance">Max Performance - $75.00</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Monto Real Recibido ($)
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Método de Pago
                  </label>
                  <select 
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 hover:border-primary-500/40 focus:border-primary-500 rounded-lg p-3 text-sm focus:outline-none transition-all duration-200 text-white"
                  >
                    <option value="cash">Efectivo</option>
                    <option value="transfer">Transferencia</option>
                    <option value="zelle">Zelle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Estado del Pago
                </label>
                <select 
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 hover:border-primary-500/40 focus:border-primary-500 rounded-lg p-3 text-sm focus:outline-none transition-all duration-200 text-white"
                >
                  <option value="Completado">Completado</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
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
                  className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-primary-500/20 text-white"
                >
                  REGISTRAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
