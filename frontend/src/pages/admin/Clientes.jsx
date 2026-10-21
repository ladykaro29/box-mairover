import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('Clase Regular');
  const [status, setStatus] = useState('Activo');

  // Load clients dynamically
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const data = await api.getClientes({
        search: searchTerm,
        plan: planFilter,
        status: statusFilter,
      });
      setClientes(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [searchTerm, planFilter, statusFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!name || !email) {
      setErrorMsg('El nombre y correo electrónico son obligatorios.');
      return;
    }

    try {
      await api.createCliente({
        name,
        email,
        phone,
        plan,
        status,
      });
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setPlan('Clase Regular');
      setStatus('Activo');
      setIsModalOpen(false);
      
      // Refresh list
      fetchClientes();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error al guardar el cliente.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        await api.deleteCliente(id);
        fetchClientes();
      } catch (err) {
        console.error('Error deleting client:', err);
      }
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">GESTIÓN DE <span className="text-primary-500">CLIENTES</span></h1>
          <p className="text-accent-gray-light text-sm mt-1">Administra el listado de miembros y sus planes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-primary-500/20"
        >
          + NUEVO CLIENTE
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-dark-800/40 border border-dark-700/50 p-4 rounded-xl backdrop-blur-md mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar por nombre o correo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-900 border border-dark-700 hover:border-primary-500/40 focus:border-primary-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all duration-200"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-300">🔍</span>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none text-white"
          >
            <option value="all">Todos los Planes</option>
            <option value="regular">Clase Regular</option>
            <option value="max">Max Performance</option>
            <option value="basic">Básico</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none text-white"
          >
            <option value="all">Cualquier Estado</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl backdrop-blur-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-accent-gray-light flex flex-col items-center justify-center">
            <span className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></span>
            <p className="mt-3 text-sm">Cargando listado de clientes...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-900/50 border-b border-dark-700/50">
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Cliente</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Contacto</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Plan</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider">Estado</th>
                  <th className="p-4 text-xs font-semibold text-accent-gray-light uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700/20">
                {clientes.map(cliente => (
                  <tr key={cliente.id} className="hover:bg-dark-700/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center font-bold text-primary-500">
                          {cliente.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{cliente.name}</p>
                          <p className="text-xs text-dark-300">Último pago: {cliente.lastPayment || 'Sin registros'}</p>
                          {cliente.evaluacionesOnline?.length > 0 && (
                            <Link
                              to={`/admin/evaluaciones/${cliente.evaluacionesOnline[0].id}`}
                              className="inline-flex items-center gap-1 text-[10px] text-primary-400 bg-primary-500/10 border border-primary-500/20 px-2 py-0.5 rounded-full mt-1 hover:underline"
                            >
                              📋 Ver Evaluación ({cliente.evaluacionesOnline[0].codigoReferencia})
                            </Link>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-white">{cliente.email}</p>
                      <p className="text-xs text-dark-300">{cliente.phone || 'No asignado'}</p>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-dark-700 rounded-full text-xs font-medium border border-dark-600">
                        {cliente.plan}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                        cliente.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {cliente.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-dark-300 hover:text-white transition-colors" title="Editar / Ver">
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(cliente.id)}
                        className="p-2 text-dark-300 hover:text-primary-500 transition-colors" 
                        title="Eliminar Cliente"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                
                {clientes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-dark-300">
                      No se encontraron clientes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Nuevo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full shadow-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Registrar Nuevo Cliente</h3>
            
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Nombre Completo
                </label>
                <input 
                  type="text" 
                  placeholder="Ej. María García" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Correo Electrónico
                </label>
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                  Teléfono
                </label>
                <input 
                  type="text" 
                  placeholder="Ej. +58 414-1234567" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Membresía / Plan
                  </label>
                  <select 
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="Básico">Básico</option>
                    <option value="Clase Regular">Clase Regular</option>
                    <option value="Max Performance">Max Performance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-2">
                    Estado Inicial
                  </label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg p-3 text-sm text-white focus:border-primary-500 focus:outline-none"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
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
                  className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm font-semibold transition-colors text-white shadow-lg"
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
