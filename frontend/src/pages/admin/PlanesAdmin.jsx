import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { evaluacionesAdminApi } from '../../utils/api';

export default function PlanesAdmin() {
  const [loading, setLoading] = useState(true);
  const [planes, setPlanes] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchPlanes = async () => {
    setLoading(true);
    try {
      const data = await evaluacionesAdminApi.getPlanes();
      setPlanes(data || []);
    } catch (err) {
      console.error('Error al cargar planes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  const handleEditClick = (plan) => {
    setEditingPlan({ ...plan });
    setFeedback(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      await evaluacionesAdminApi.updatePlan(editingPlan.id, {
        precio: parseFloat(editingPlan.precio),
        vigencia: editingPlan.vigencia,
        entregaDiasHabiles: parseInt(editingPlan.entregaDiasHabiles, 10),
        activo: editingPlan.activo,
        badge: editingPlan.badge,
        descripcion: editingPlan.descripcion,
      });

      setFeedback({ type: 'success', text: `Plan "${editingPlan.nombre}" actualizado con éxito.` });
      setEditingPlan(null);
      fetchPlanes();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Error al actualizar plan.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-dark-900 min-h-screen text-white font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary-400 block mb-1">
            Configuración Comercial Centralizada
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            TARIFAS Y VIGENCIAS DE <span className="text-primary-500">PLANES ONLINE</span>
          </h1>
          <p className="text-xs text-accent-gray mt-1">
            Ajusta los precios, monedas, días de entrega y vigencias comerciales. Los cambios se reflejan inmediatamente en la web y los formularios.
          </p>
        </div>

        <Link
          to="/admin/evaluaciones"
          className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-accent-gray-light hover:text-white rounded-xl text-xs font-bold border border-dark-700 transition-colors"
        >
          ← Volver a Evaluaciones
        </Link>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/15 border border-red-500/30 text-red-300'
          }`}
        >
          <span>{feedback.type === 'success' ? '✓' : '⚠️'}</span>
          <span>{feedback.text}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-accent-gray">
          <span className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin inline-block mb-3" />
          <p>Cargando planes oficiales...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planes.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between shadow-xl transition-all ${
                p.activo
                  ? 'bg-dark-800 border-dark-700/80 hover:border-dark-600'
                  : 'bg-dark-900/40 border-dark-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-400">
                    Código: {p.codigo}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      p.activo
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase text-white mb-1">{p.nombre}</h3>
                <p className="text-xs text-primary-300 font-medium mb-4">{p.subtitulo}</p>

                <div className="flex items-baseline gap-2 mb-4 bg-dark-900/80 p-3 rounded-xl border border-dark-700/50">
                  <span className="text-3xl font-black text-white">
                    ${Number(p.precio).toFixed(2)}
                  </span>
                  <span className="text-xs text-accent-gray font-semibold">{p.moneda} / {p.vigencia}</span>
                </div>

                <div className="space-y-2 text-xs text-dark-300 mb-6">
                  <p>
                    ⏱️ <strong>Entrega:</strong> {p.entregaDiasHabiles} días hábiles tras confirmar pago.
                  </p>
                  {p.badge && (
                    <p>
                      🏷️ <strong>Distintivo:</strong> {p.badge}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleEditClick(p)}
                className="w-full py-2.5 bg-dark-700 hover:bg-dark-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                ✏️ Modificar Tarifa / Vigencia
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setEditingPlan(null)}
        >
          <div
            className="max-w-lg w-full bg-dark-800 rounded-3xl border border-dark-700 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-dark-700/60 pb-3 mb-6">
              <h3 className="text-base font-black uppercase text-white">
                Editar Plan: {editingPlan.nombre}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="text-accent-gray hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-accent-gray mb-1">
                  Precio (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editingPlan.precio}
                  onChange={(e) => setEditingPlan({ ...editingPlan, precio: e.target.value })}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-2.5 text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-accent-gray mb-1">
                  Vigencia Comercial
                </label>
                <input
                  type="text"
                  required
                  value={editingPlan.vigencia}
                  onChange={(e) => setEditingPlan({ ...editingPlan, vigencia: e.target.value })}
                  placeholder="Ej. 5 semanas / mensual"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-accent-gray mb-1">
                  Días Hábiles de Entrega tras Confirmar Pago
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="30"
                  value={editingPlan.entregaDiasHabiles}
                  onChange={(e) => setEditingPlan({ ...editingPlan, entregaDiasHabiles: e.target.value })}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-accent-gray mb-1">
                  Distintivo / Badge
                </label>
                <input
                  type="text"
                  value={editingPlan.badge || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                  placeholder="Ej. El Más Completo • Recomendado"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.activo}
                    onChange={(e) => setEditingPlan({ ...editingPlan, activo: e.target.checked })}
                    className="w-4 h-4 accent-primary-500"
                  />
                  <span className="text-white font-semibold">Plan Activo y Disponible en la Web</span>
                </label>
              </div>

              <div className="pt-4 border-t border-dark-700/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 bg-dark-900 hover:bg-dark-700 text-accent-gray-light rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-black uppercase tracking-wider shadow-lg shadow-primary-500/20"
                >
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
