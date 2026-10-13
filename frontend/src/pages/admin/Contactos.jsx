import { useState, useEffect } from 'react';
import { api } from '../../utils/api';

export default function Contactos() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchContactos = async () => {
    try {
      setLoading(true);
      const data = await api.getContactos({
        search: searchTerm,
        status: statusFilter,
      });
      setContactos(data);
    } catch (err) {
      console.error('Error al cargar contactos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactos();
  }, [searchTerm, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateContactoStatus(id, newStatus);
      setActionSuccess(`Estado actualizado a "${newStatus}".`);
      setTimeout(() => setActionSuccess(''), 3000);
      fetchContactos();
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas archivar/eliminar este mensaje de contacto?')) {
      try {
        await api.deleteContacto(id);
        setActionSuccess('Mensaje eliminado.');
        setTimeout(() => setActionSuccess(''), 3000);
        fetchContactos();
      } catch (err) {
        console.error('Error al eliminar contacto:', err);
      }
    }
  };

  // KPIs
  const totalCount = contactos.length;
  const pendingCount = contactos.filter((c) => c.status === 'pendiente').length;
  const contactedCount = contactos.filter((c) => c.status === 'contactado').length;

  const cleanPhoneForWhatsApp = (phone) => {
    if (!phone) return '';
    return phone.replace(/[^\d]/g, '');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Reciente';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            GESTIÓN DE <span className="text-primary-500">CONTACTOS</span>
          </h1>
          <p className="text-accent-gray-light text-sm mt-1">
            Bandeja de prospectos y solicitudes de asesoría recibidas desde la web.
          </p>
        </div>

        {actionSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-xs font-semibold animate-[fadeIn_0.3s_ease-out]">
            ✓ {actionSuccess}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-5 backdrop-blur-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center text-xl text-primary-500 border border-dark-600">
            📬
          </div>
          <div>
            <p className="text-xs text-dark-300 font-semibold uppercase tracking-wider">Total Prospectos</p>
            <p className="text-2xl font-bold mt-0.5">{totalCount}</p>
          </div>
        </div>

        <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-5 backdrop-blur-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-xl text-amber-400 border border-amber-500/20">
            ⏳
          </div>
          <div>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Por Responder</p>
            <p className="text-2xl font-bold mt-0.5 text-amber-300">{pendingCount}</p>
          </div>
        </div>

        <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-5 backdrop-blur-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xl text-emerald-400 border border-emerald-500/20">
            ✅
          </div>
          <div>
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Contactados</p>
            <p className="text-2xl font-bold mt-0.5 text-emerald-300">{contactedCount}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-dark-800/40 border border-dark-700/50 p-4 rounded-xl backdrop-blur-md mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-dark-300 pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre, email, teléfono o servicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-dark-300 focus:border-primary-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-dark-700 text-dark-300 hover:text-white'
            }`}
          >
            Todos ({contactos.length})
          </button>
          <button
            onClick={() => setStatusFilter('pendiente')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'pendiente'
                ? 'bg-amber-500 text-white'
                : 'bg-dark-700 text-dark-300 hover:text-white'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setStatusFilter('contactado')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'contactado'
                ? 'bg-emerald-500 text-white'
                : 'bg-dark-700 text-dark-300 hover:text-white'
            }`}
          >
            Contactados
          </button>
          <button
            onClick={() => setStatusFilter('archivado')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'archivado'
                ? 'bg-dark-600 text-white'
                : 'bg-dark-700 text-dark-300 hover:text-white'
            }`}
          >
            Archivados
          </button>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="p-16 text-center text-accent-gray-light flex flex-col items-center justify-center">
          <span className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></span>
          <p className="mt-3 text-sm">Cargando solicitudes de contacto...</p>
        </div>
      ) : contactos.length === 0 ? (
        <div className="bg-dark-800/20 border border-dark-700/50 p-12 rounded-xl text-center text-dark-300">
          <p className="text-3xl mb-2">📭</p>
          <p className="text-base font-medium text-white">No hay mensajes de contacto</p>
          <p className="text-xs text-dark-300 mt-1">
            Los mensajes enviados desde el formulario público aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {contactos.map((c) => (
            <div
              key={c.id}
              className={`bg-dark-800/40 border ${
                c.status === 'pendiente' ? 'border-amber-500/40 bg-dark-800/60' : 'border-dark-700/50'
              } rounded-xl p-6 backdrop-blur-md transition-all hover:border-primary-500/40 relative group`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-dark-700/40">
                {/* Contact Identity */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400 font-extrabold text-base flex-shrink-0">
                    {c.nombre ? c.nombre.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-white">{c.nombre}</h3>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          c.status === 'pendiente'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : c.status === 'contactado'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-dark-700 text-dark-300 border border-dark-600'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-dark-300">
                      <span>📧 {c.email}</span>
                      <span>📱 {c.telefono}</span>
                      <span className="text-dark-400">🕒 {formatDate(c.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Service Tag & Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {c.servicio && (
                    <span className="px-3 py-1 bg-dark-700/70 border border-dark-600 rounded-full text-xs font-semibold text-primary-400">
                      {c.servicio}
                    </span>
                  )}

                  {/* Direct WhatsApp Action */}
                  <a
                    href={`https://wa.me/${cleanPhoneForWhatsApp(c.telefono)}?text=${encodeURIComponent(
                      `¡Hola ${c.nombre}! Te escribo de MairoverFit con respecto a tu solicitud de información sobre ${c.servicio || 'nuestros planes'}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>

                  {/* Email Action */}
                  <a
                    href={`mailto:${c.email}?subject=${encodeURIComponent(
                      'Información MairoverFit - Asesoría y Entrenamientos'
                    )}`}
                    className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-dark-600"
                  >
                    <span>✉️</span>
                    <span>Email</span>
                  </a>

                  {/* Status Dropdown */}
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="bg-dark-900 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-primary-500 focus:outline-none cursor-pointer"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="contactado">Contactado</option>
                    <option value="archivado">Archivado</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 text-dark-300 hover:text-red-400 transition-colors cursor-pointer"
                    title="Eliminar mensaje"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Message Content & Goal */}
              <div className="space-y-3">
                {c.objetivo && (
                  <div className="text-xs">
                    <span className="text-dark-300 font-semibold uppercase tracking-wider">Objetivo declarado: </span>
                    <span className="text-primary-300 font-medium">{c.objetivo}</span>
                  </div>
                )}

                {c.mensaje ? (
                  <div className="bg-dark-900/60 border border-dark-700/40 rounded-lg p-3 text-sm text-gray-200 leading-relaxed font-sans">
                    {c.mensaje}
                  </div>
                ) : (
                  <p className="text-xs italic text-dark-400">Sin mensaje adicional adjunto.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
