import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { evaluacionesAdminApi } from '../../utils/api';

export default function EvaluacionesAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 15, totalPages: 1 });

  // Filtros
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [estadoFilter, setEstadoFilter] = useState('all');
  const [page, setPage] = useState(1);

  const fetchStats = async () => {
    try {
      const data = await evaluacionesAdminApi.getStats();
      setStats(data);
    } catch (err) {
      console.warn('Error al cargar métricas:', err);
    }
  };

  const fetchEvaluaciones = async () => {
    setLoading(true);
    try {
      const res = await evaluacionesAdminApi.getEvaluaciones({
        page,
        limit: 15,
        search,
        plan: planFilter,
        estado: estadoFilter,
      });
      setEvaluaciones(res.data || []);
      setMeta(res.meta || { total: 0, page: 1, limit: 15, totalPages: 1 });
    } catch (err) {
      console.error('Error al cargar evaluaciones:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchEvaluaciones();
  }, [page, planFilter, estadoFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEvaluaciones();
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Nueva':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pendiente de revisión':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'En revisión':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Información adicional solicitada':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'En preparación':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'Completada':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Archivada':
        return 'bg-dark-600 text-dark-300 border-dark-500';
      default:
        return 'bg-dark-700 text-white border-dark-600';
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-dark-900 min-h-screen text-white font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary-400 block mb-1">
            Gestión de Formularios Online
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            EVALUACIONES <span className="text-primary-500">ONLINE</span>
          </h1>
          <p className="text-xs text-accent-gray mt-1">
            Administra los expedientes clínicos, medidas, fotografías privadas y seguimiento de los 3 planes online.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/archivos"
            className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-accent-gray-light hover:text-white rounded-xl text-xs font-bold border border-dark-700 transition-colors flex items-center gap-2"
          >
            <span>🔒 Archivos Privados</span>
          </Link>
          <Link
            to="/admin/planes"
            className="px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-xl text-xs font-bold border border-primary-500/40 transition-colors flex items-center gap-2"
          >
            <span>🏷️ Tarifas & Planes</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-dark-800 p-5 rounded-2xl border border-dark-700/60 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray block mb-1">
            Total Evaluaciones
          </span>
          <span className="text-3xl font-black text-white">{stats?.total || 0}</span>
          <span className="text-[11px] text-accent-gray block mt-1">Recibidas en sistema</span>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
            Nuevas
          </span>
          <span className="text-3xl font-black text-blue-400">{stats?.nuevas || 0}</span>
          <span className="text-[11px] text-accent-gray block mt-1">Pendientes de apertura</span>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-amber-500/30 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
            En Revisión / Proceso
          </span>
          <span className="text-3xl font-black text-amber-300">{stats?.enProceso || 0}</span>
          <span className="text-[11px] text-accent-gray block mt-1">Diseñando programa</span>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-emerald-500/30 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Completadas
          </span>
          <span className="text-3xl font-black text-emerald-400">{stats?.completadas || 0}</span>
          <span className="text-[11px] text-accent-gray block mt-1">Programación enviada</span>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-dark-700/60 shadow-lg col-span-2 lg:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray block mb-2">
            Por Plan
          </span>
          <div className="space-y-1 text-xs">
            {stats?.porPlan?.map((p) => (
              <div key={p.id} className="flex justify-between items-center text-[11px]">
                <span className="text-dark-300 truncate max-w-[110px]">{p.nombre}</span>
                <span className="font-bold text-white bg-dark-900 px-2 py-0.5 rounded-full border border-dark-700">
                  {p.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-dark-800 p-4 rounded-2xl border border-dark-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="w-full md:w-96 flex items-center gap-2">
          <div className="relative w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por cliente, correo o código..."
              className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-dark-400 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Buscar
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value);
              setPage(1);
            }}
            className="bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="all">Todos los Planes</option>
            <option value="personalizado">Plan Personalizado</option>
            <option value="basico">Plan Básico</option>
            <option value="nutricional">Plan Nutricional</option>
          </select>

          {/* Estado Filter */}
          <select
            value={estadoFilter}
            onChange={(e) => {
              setEstadoFilter(e.target.value);
              setPage(1);
            }}
            className="bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="all">Todos los Estados</option>
            <option value="Nueva">Nueva</option>
            <option value="Pendiente de revisión">Pendiente de revisión</option>
            <option value="En revisión">En revisión</option>
            <option value="Información adicional solicitada">Info adicional solicitada</option>
            <option value="En preparación">En preparación</option>
            <option value="Completada">Completada</option>
            <option value="Archivada">Archivada</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearch('');
              setPlanFilter('all');
              setEstadoFilter('all');
              setPage(1);
            }}
            className="p-2.5 bg-dark-900 hover:bg-dark-700 text-accent-gray hover:text-white rounded-xl border border-dark-700 transition-colors cursor-pointer"
            title="Restablecer filtros"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-dark-800 rounded-2xl border border-dark-700/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-dark-900/80 text-dark-300 uppercase tracking-wider font-semibold border-b border-dark-700/60">
                <th className="py-4 px-5">Fecha Envío</th>
                <th className="py-4 px-5">Código Ref.</th>
                <th className="py-4 px-5">Cliente</th>
                <th className="py-4 px-5">Plan Solicitado</th>
                <th className="py-4 px-5">Fotos</th>
                <th className="py-4 px-5">Estado</th>
                <th className="py-4 px-5">Responsable</th>
                <th className="py-4 px-5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/50">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-accent-gray">
                    <span className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin inline-block mr-2" />
                    Cargando evaluaciones...
                  </td>
                </tr>
              ) : evaluaciones.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-accent-gray">
                    No se encontraron evaluaciones con los filtros actuales.
                  </td>
                </tr>
              ) : (
                evaluaciones.map((item) => (
                  <tr key={item.id} className="hover:bg-dark-700/30 transition-colors">
                    <td className="py-4 px-5 text-dark-300 font-mono">
                      {new Date(item.fechaEnvio).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-5 font-mono font-bold text-white">
                      <Link
                        to={`/admin/evaluaciones/${item.id}`}
                        className="text-primary-400 hover:text-primary-300 hover:underline"
                      >
                        {item.codigoReferencia}
                      </Link>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-white">{item.clienteNombre}</div>
                      <div className="text-[11px] text-dark-300 truncate max-w-[180px]">
                        {item.clienteEmail}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-semibold text-accent-gray-light block">
                        {item.plan}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      {item.totalArchivos > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          📸 {item.totalArchivos}
                        </span>
                      ) : (
                        <span className="text-[11px] text-dark-400">Sin fotos</span>
                      )}
                    </td>

                    <td className="py-4 px-5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                          item.estado
                        )}`}
                      >
                        {item.estado}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-dark-300">
                      {item.responsable}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <Link
                        to={`/admin/evaluaciones/${item.id}`}
                        className="px-3 py-1.5 bg-primary-500/15 hover:bg-primary-500/30 text-primary-300 hover:text-white rounded-lg text-xs font-bold border border-primary-500/30 transition-all inline-block"
                      >
                        Ver Expediente →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {meta.totalPages > 1 && (
          <div className="p-4 border-t border-dark-700/60 flex items-center justify-between text-xs text-accent-gray">
            <span>
              Mostrando página {meta.page} de {meta.totalPages} ({meta.total} evaluaciones)
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1.5 rounded-lg border border-dark-700 bg-dark-900 text-accent-gray-light hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
                className="px-3 py-1.5 rounded-lg border border-dark-700 bg-dark-900 text-accent-gray-light hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
