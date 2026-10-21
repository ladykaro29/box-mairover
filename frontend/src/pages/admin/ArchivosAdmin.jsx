import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { evaluacionesAdminApi } from '../../utils/api';

export default function ArchivosAdmin() {
  const [loading, setLoading] = useState(true);
  const [archivos, setArchivos] = useState([]);
  const [stats, setStats] = useState({ totalArchivos: 0, totalMegabytes: '0.00' });
  const [meta, setMeta] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [categoria, setCategoria] = useState('all');
  const [page, setPage] = useState(1);

  const [activePhoto, setActivePhoto] = useState(null);
  const [blobUrls, setBlobUrls] = useState({});

  const fetchArchivos = async () => {
    setLoading(true);
    try {
      const res = await evaluacionesAdminApi.getArchivos({ page, limit: 20, categoria });
      setArchivos(res.data || []);
      setStats(res.stats || { totalArchivos: 0, totalMegabytes: '0.00' });
      setMeta(res.meta || { page: 1, limit: 20, total: 0, totalPages: 1 });
    } catch (err) {
      console.error('Error al cargar archivos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivos();
  }, [page, categoria]);

  // Cargar previews autenticadas
  useEffect(() => {
    if (!archivos.length) return;

    let mounted = true;
    async function loadThumbnails() {
      for (const arch of archivos) {
        if (!blobUrls[arch.id]) {
          try {
            const url = await evaluacionesAdminApi.fetchProtectedImageBlobUrl(arch.id);
            if (mounted) {
              setBlobUrls((prev) => ({ ...prev, [arch.id]: url }));
            }
          } catch (err) {
            console.warn(`Error en preview de ${arch.id}:`, err);
          }
        }
      }
    }
    loadThumbnails();

    return () => {
      mounted = false;
    };
  }, [archivos]);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-dark-900 min-h-screen text-white font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 block mb-1">
            Almacenamiento Cifrado y Privado
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            ARCHIVOS Y FOTOGRAFÍAS <span className="text-emerald-400">PRIVADAS</span>
          </h1>
          <p className="text-xs text-accent-gray mt-1">
            Repositorio confidencial de imágenes de clientes. Los archivos están fuera de carpetas públicas y solo se transmiten con autorización JWT.
          </p>
        </div>

        <Link
          to="/admin/evaluaciones"
          className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-accent-gray-light hover:text-white rounded-xl text-xs font-bold border border-dark-700 transition-colors"
        >
          ← Volver a Evaluaciones
        </Link>
      </div>

      {/* Storage Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-dark-800 p-5 rounded-2xl border border-dark-700/60 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray block mb-1">
            Total Fotografías Almacenadas
          </span>
          <span className="text-3xl font-black text-white">{stats.totalArchivos}</span>
          <span className="text-[11px] text-emerald-400 block mt-1">✓ Metadatos EXIF eliminados</span>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-dark-700/60 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray block mb-1">
            Espacio en Disco Utilizado
          </span>
          <span className="text-3xl font-black text-white">{stats.totalMegabytes} MB</span>
          <span className="text-[11px] text-accent-gray block mt-1">Formato WebP optimizado</span>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-dark-700/60 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray block mb-1">
            Seguridad y Privacidad
          </span>
          <span className="text-sm font-bold text-emerald-400 block mt-1">Ruta Privada Aislada</span>
          <span className="text-[11px] text-accent-gray block mt-1">Anti Path-Traversal activo</span>
        </div>
      </div>

      {/* Filter Category Toolbar */}
      <div className="bg-dark-800 p-4 rounded-2xl border border-dark-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-dark-300 mr-2">Categoría:</span>
          {['all', 'foto_frente', 'foto_perfil', 'foto_espalda'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoria(cat);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoria === cat
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-dark-900 text-accent-gray hover:text-white border border-dark-700'
              }`}
            >
              {cat === 'all'
                ? 'Todas'
                : cat === 'foto_frente'
                ? 'Frente'
                : cat === 'foto_perfil'
                ? 'Perfil'
                : 'Espalda'}
            </button>
          ))}
        </div>

        <span className="text-xs text-dark-300">
          Página {meta.page} de {meta.totalPages}
        </span>
      </div>

      {/* Grid of Protected Files */}
      {loading ? (
        <div className="p-12 text-center text-accent-gray">
          <span className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin inline-block mb-3" />
          <p>Cargando archivos privados...</p>
        </div>
      ) : archivos.length === 0 ? (
        <div className="bg-dark-800 rounded-3xl p-12 text-center text-dark-400 border border-dark-700/60">
          <span className="text-4xl block mb-2">📁</span>
          No se encontraron fotografías en este criterio.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {archivos.map((arch) => {
            const url = blobUrls[arch.id];

            return (
              <div
                key={arch.id}
                className="bg-dark-800 rounded-2xl border border-dark-700/60 p-3 flex flex-col justify-between shadow-lg hover:border-dark-600 transition-all"
              >
                <div
                  onClick={() => url && setActivePhoto({ url, cat: arch.categoria, arch })}
                  className="w-full aspect-[3/4] bg-dark-900 rounded-xl overflow-hidden cursor-pointer relative group flex items-center justify-center border border-dark-700/40"
                >
                  {url ? (
                    <img
                      src={url}
                      alt={arch.categoria}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-xs text-dark-400">Cargando...</span>
                  )}
                  <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white bg-primary-500 px-2 py-1 rounded">
                      Ampliar 🔍
                    </span>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-primary-400">
                      {arch.categoria.replace('_', ' ')}
                    </span>
                    <span className="text-[9px] font-mono text-dark-400">
                      {(arch.sizeBytes / 1024).toFixed(0)} KB
                    </span>
                  </div>

                  {arch.evaluacion && (
                    <Link
                      to={`/admin/evaluaciones/${arch.evaluacion.id}`}
                      className="text-[11px] font-bold text-white hover:text-primary-300 truncate block hover:underline"
                    >
                      {arch.evaluacion.cliente?.name || arch.evaluacion.codigoReferencia}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] bg-dark-900 rounded-3xl overflow-hidden border border-dark-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-dark-700 flex items-center justify-between bg-dark-800">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Fotografía Protegida: {activePhoto.cat}
              </span>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="text-white hover:text-primary-500 font-bold p-1 text-sm cursor-pointer"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="p-4 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={activePhoto.url}
                alt="Foto Ampliada"
                className="max-h-[75vh] max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
