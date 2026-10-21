import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { evaluacionesAdminApi } from '../../utils/api';

export default function EvaluacionDetalleAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [evaluacion, setEvaluacion] = useState(null);
  const [activeTab, setActiveTab] = useState('personales');

  // Estado del formulario de control interno
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [notasInternas, setNotasInternas] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  // Modal de fotos protegidas
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [photoBlobUrls, setPhotoBlobUrls] = useState({});

  // Cargar datos
  const fetchDetalle = async () => {
    try {
      setLoading(true);
      const data = await evaluacionesAdminApi.getEvaluacionById(id);
      setEvaluacion(data);
      setNuevoEstado(data.estado);
      setNotasInternas(data.notasInternas || '');
    } catch (err) {
      console.error('Error al cargar detalle de evaluación:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetalle();
  }, [id]);

  // Cargar URLs de blobs autenticadas para las fotos privadas
  useEffect(() => {
    if (!evaluacion?.archivos?.length) return;

    let isMounted = true;
    const loadedUrls = {};

    async function loadBlobs() {
      for (const arch of evaluacion.archivos) {
        try {
          const url = await evaluacionesAdminApi.fetchProtectedImageBlobUrl(arch.id);
          if (isMounted) {
            loadedUrls[arch.id] = url;
            setPhotoBlobUrls((prev) => ({ ...prev, [arch.id]: url }));
          }
        } catch (err) {
          console.warn(`No se pudo cargar foto ${arch.id}:`, err);
        }
      }
    }

    loadBlobs();

    return () => {
      isMounted = false;
      Object.values(loadedUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [evaluacion?.archivos]);

  const handleSaveStatus = async () => {
    setSavingStatus(true);
    setFeedbackMsg(null);
    try {
      await evaluacionesAdminApi.updateEstado(id, { estado: nuevoEstado });
      setFeedbackMsg({ type: 'success', text: `Estado actualizado a "${nuevoEstado}".` });
      fetchDetalle();
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: err.message || 'Error al cambiar estado.' });
    } finally {
      setSavingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    setFeedbackMsg(null);
    try {
      await evaluacionesAdminApi.updateNotasInternas(id, notasInternas);
      setFeedbackMsg({ type: 'success', text: 'Notas internas guardadas con éxito.' });
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: err.message || 'Error al guardar notas.' });
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      '¿Estás segura de eliminar esta evaluación? Esto eliminará el expediente y las fotografías físicas del servidor conforme a la política de conservación.'
    );
    if (!confirmDelete) return;

    try {
      await evaluacionesAdminApi.deleteEvaluacion(id, true);
      alert('Evaluación y archivos eliminados correctamente.');
      navigate('/admin/evaluaciones');
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-accent-gray">
        <span className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin inline-block mb-3" />
        <p>Cargando expediente confidencial de la evaluación...</p>
      </div>
    );
  }

  if (!evaluacion) {
    return (
      <div className="p-8 text-center text-white">
        <p className="text-lg font-bold mb-4">Evaluación no encontrada</p>
        <Link to="/admin/evaluaciones" className="text-primary-400 hover:underline text-xs">
          ← Volver a la lista de evaluaciones
        </Link>
      </div>
    );
  }

  const { datosPersonales, objetivos, experienciaRutina, entrenamiento, alimentacion, valoracionInicial } = evaluacion;

  const tabs = [
    { key: 'personales', label: '1. Datos Personales', icon: '👤' },
    { key: 'objetivos', label: '2. Objetivos', icon: '🎯' },
    { key: 'rutina', label: '3. Rutina y Salud', icon: '🏋️' },
    { key: 'alimentacion', label: '4. Alimentación', icon: '🥗' },
    { key: 'medidas', label: '5. Medidas', icon: '📏' },
    { key: 'fotos', label: `6. Fotos (${evaluacion.archivos?.length || 0})`, icon: '📸' },
    { key: 'consentimientos', label: '7. Consentimientos', icon: '📜' },
    { key: 'auditoria', label: '8. Auditoría', icon: '🛡️' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 bg-dark-900 min-h-screen text-white font-sans">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-dark-700/60 pb-6">
        <div>
          <Link
            to="/admin/evaluaciones"
            className="text-xs font-semibold text-accent-gray hover:text-white transition-colors flex items-center gap-1.5 mb-2"
          >
            ← Volver al listado de evaluaciones
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              EXPEDIENTE: <span className="font-mono text-primary-400">{evaluacion.codigoReferencia}</span>
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-500/15 border border-primary-500/30 text-primary-300">
              {evaluacion.plan?.nombre}
            </span>
          </div>
          <p className="text-xs text-dark-300 mt-1">
            Cliente: <strong>{datosPersonales?.nombre} {datosPersonales?.apellidos}</strong> • Enviado el{' '}
            {new Date(evaluacion.createdAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500/15 hover:bg-red-500/30 text-red-400 rounded-xl text-xs font-bold border border-red-500/30 transition-colors cursor-pointer"
        >
          🗑️ Eliminar Expediente (RGPD)
        </button>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/15 border border-red-500/30 text-red-300'
          }`}
        >
          <span>{feedbackMsg.type === 'success' ? '✓' : '⚠️'}</span>
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Internal Management Bar: Status & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cambiar Estado */}
        <div className="lg:col-span-4 bg-dark-800 p-5 rounded-2xl border border-dark-700/60 shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-400 block mb-2">
              Gestión del Estado
            </span>
            <label className="block text-xs font-semibold text-accent-gray mb-1.5">
              Estado de la Evaluación
            </label>
            <select
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
              className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none mb-3"
            >
              <option value="Nueva">Nueva</option>
              <option value="Pendiente de revisión">Pendiente de revisión</option>
              <option value="En revisión">En revisión</option>
              <option value="Información adicional solicitada">Información adicional solicitada</option>
              <option value="En preparación">En preparación</option>
              <option value="Completada">Completada (Entregada)</option>
              <option value="Archivada">Archivada</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSaveStatus}
            disabled={savingStatus || nuevoEstado === evaluacion.estado}
            className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {savingStatus ? 'Actualizando...' : 'Guardar Estado'}
          </button>
        </div>

        {/* Notas Internas de la Coach */}
        <div className="lg:col-span-8 bg-dark-800 p-5 rounded-2xl border border-dark-700/60 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-400">
              Notas Internas de las Coaches (Privadas • No visibles para el cliente)
            </span>
            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="px-3.5 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs font-bold border border-dark-600 transition-colors cursor-pointer"
            >
              {savingNotes ? 'Guardando...' : 'Guardar Notas'}
            </button>
          </div>
          <textarea
            rows="3"
            value={notasInternas}
            onChange={(e) => setNotasInternas(e.target.value)}
            placeholder="Añade observaciones técnicas, adaptaciones prescritas, enlace a la hoja de cálculo o seguimiento de WhatsApp..."
            className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl p-3 text-xs text-white placeholder-dark-400 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-dark-700/60 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'bg-dark-800 text-accent-gray hover:text-white hover:bg-dark-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents Card */}
      <div className="bg-dark-800 p-6 sm:p-8 rounded-3xl border border-dark-700/60 shadow-xl">
        {/* TAB 1: DATOS PERSONALES */}
        {activeTab === 'personales' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-2">
              Datos Personales y Contacto
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Nombre Completo</span>
                <span className="text-sm font-bold text-white">{datosPersonales?.nombre} {datosPersonales?.apellidos}</span>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Correo Electrónico</span>
                <span className="text-sm font-mono text-white">{datosPersonales?.email}</span>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Edad</span>
                <span className="text-sm font-bold text-white">{datosPersonales?.edad} años</span>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">WhatsApp / Teléfono</span>
                <span className="text-sm font-mono text-emerald-400 font-bold">{datosPersonales?.whatsapp || datosPersonales?.telefono}</span>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Ubicación</span>
                <span className="text-sm font-bold text-white">{datosPersonales?.ciudad}, {datosPersonales?.pais}</span>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Medio Preferido</span>
                <span className="text-sm font-bold text-white">{datosPersonales?.medioContactoPreferido || 'WhatsApp'}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OBJETIVOS */}
        {activeTab === 'objetivos' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-2">
              Objetivos y Expectativas del Cliente
            </h3>

            <div className="space-y-4">
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-primary-400 block mb-1">Objetivo Principal</span>
                <p className="text-base font-bold text-white">{objetivos?.principal || 'No especificado'}</p>
              </div>

              {objetivos?.queEsperaConseguir && (
                <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                  <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">¿Qué espera conseguir?</span>
                  <p className="text-xs text-white leading-relaxed">{objetivos.queEsperaConseguir}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objetivos?.plazoPrioridades && (
                  <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                    <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Plazo o Prioridades</span>
                    <p className="text-xs text-white">{objetivos.plazoPrioridades}</p>
                  </div>
                )}

                {objetivos?.dificultades && (
                  <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                    <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Dificultades Identificadas</span>
                    <p className="text-xs text-white">{objetivos.dificultades}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RUTINA Y SALUD */}
        {activeTab === 'rutina' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-2">
              Experiencia, Rutina y Salud
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Nivel / Experiencia</span>
                <span className="text-xs font-bold text-white">{experienciaRutina?.experiencia || 'No especificado'}</span>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Días Disponibles</span>
                <span className="text-xs font-bold text-white">{experienciaRutina?.diasDisponibles || '4'} días por semana</span>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Lugar de Entrenamiento</span>
                <span className="text-xs font-bold text-white">{experienciaRutina?.lugarEntrenamiento || 'Gimnasio'}</span>
              </div>
            </div>

            {/* Lesiones / Salud sensible */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <span>⚠️</span> Información de Lesiones, Molestias o Salud
              </div>
              <p className="text-xs text-white leading-relaxed">
                {entrenamiento?.lesionesMolestias || 'Ninguna molestia o lesión comunicada.'}
              </p>
            </div>

            {entrenamiento?.preferencias && (
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Preferencias de Actividad</span>
                <p className="text-xs text-white">{entrenamiento.preferencias}</p>
              </div>
            )}

            {experienciaRutina?.equipamiento && (
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Equipamiento Disponible</span>
                <p className="text-xs text-white">{experienciaRutina.equipamiento}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ALIMENTACIÓN */}
        {activeTab === 'alimentacion' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-2">
              Hábitos y Plan de Alimentación
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Preferencia Base</span>
                <p className="text-xs font-bold text-white">{alimentacion?.preferenciasAlimentarias || 'Omnívoro'}</p>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Organización de Comidas</span>
                <p className="text-xs font-bold text-white">{alimentacion?.organizacionComidas || 'En casa'}</p>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-red-400 block mb-1">Alergias o Restricciones</span>
                <p className="text-xs font-bold text-white">{alimentacion?.alergiasRestricciones || 'Ninguna'}</p>
              </div>

              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Alimentos que NO Consume</span>
                <p className="text-xs font-bold text-white">{alimentacion?.alimentosNoConsume || 'Ninguno en específico'}</p>
              </div>
            </div>

            {alimentacion?.horariosComidas && (
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Horarios Habituales de Comida</span>
                <p className="text-xs text-white">{alimentacion.horariosComidas}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MEDIDAS ANTROPOMÉTRICAS */}
        {activeTab === 'medidas' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-2">
              Valoración Antropométrica Inicial
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { label: 'Peso (kg)', value: valoracionInicial?.peso, highlight: true },
                { label: 'Estatura (cm)', value: valoracionInicial?.altura, highlight: true },
                { label: 'Cuello (cm)', value: valoracionInicial?.cuello },
                { label: 'Pecho (cm)', value: valoracionInicial?.pecho },
                { label: 'Cintura (cm)', value: valoracionInicial?.cintura },
                { label: 'Abdomen (cm)', value: valoracionInicial?.abdomen },
                { label: 'Cadera (cm)', value: valoracionInicial?.cadera },
                { label: 'Brazo (cm)', value: valoracionInicial?.brazo },
                { label: 'Muslo (cm)', value: valoracionInicial?.muslo },
                { label: 'Pantorrilla (cm)', value: valoracionInicial?.pantorrilla },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border ${
                    m.highlight
                      ? 'bg-primary-500/10 border-primary-500/30'
                      : 'bg-dark-900/60 border-dark-700/40'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">{m.label}</span>
                  <span className={`text-base font-black ${m.highlight ? 'text-primary-400' : 'text-white'}`}>
                    {m.value && Number(m.value) > 0 ? `${m.value}` : 'No disponible (0)'}
                  </span>
                </div>
              ))}
            </div>

            {valoracionInicial?.observacionesMedidas && (
              <div className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/40">
                <span className="text-[10px] uppercase font-bold text-dark-300 block mb-1">Observaciones sobre las medidas</span>
                <p className="text-xs text-white">{valoracionInicial.observacionesMedidas}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: FOTOGRAFÍAS PRIVADAS PROTEGIDAS */}
        {activeTab === 'fotos' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-dark-700/60 pb-3">
              <div>
                <h3 className="text-sm font-black uppercase text-white tracking-wide">
                  Registro Fotográfico Protegido
                </h3>
                <p className="text-xs text-emerald-400 font-light mt-0.5">
                  🔒 Cifrado y acceso restringido con sesión administrativa. Metadatos EXIF eliminados.
                </p>
              </div>
              <span className="text-xs text-dark-300">
                {evaluacion.archivos?.length || 0} imágenes adjuntas
              </span>
            </div>

            {evaluacion.archivos?.length === 0 ? (
              <div className="p-12 text-center text-dark-400">
                <span className="text-4xl block mb-2">📸</span>
                El cliente no adjuntó fotografías corporales en esta evaluación.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {evaluacion.archivos.map((archivo) => {
                  const blobUrl = photoBlobUrls[archivo.id];

                  return (
                    <div
                      key={archivo.id}
                      className="bg-dark-900/80 rounded-2xl border border-dark-700/60 p-4 flex flex-col justify-between overflow-hidden shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
                          {archivo.categoria.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-dark-400 font-mono">
                          {(archivo.sizeBytes / 1024).toFixed(0)} KB
                        </span>
                      </div>

                      <div
                        onClick={() => blobUrl && setActivePhotoModal({ url: blobUrl, cat: archivo.categoria })}
                        className="w-full aspect-[3/4] bg-dark-800 rounded-xl overflow-hidden cursor-pointer relative group border border-dark-700/40 flex items-center justify-center"
                      >
                        {blobUrl ? (
                          <>
                            <img
                              src={blobUrl}
                              alt={archivo.categoria}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-bold shadow">
                                Ampliar Foto 🔍
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center text-accent-gray">
                            <span className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin inline-block mb-1" />
                            <p className="text-[10px]">Cargando...</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 text-[10px] text-dark-400 truncate">
                        {archivo.nombreOriginal}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: CONSENTIMIENTOS */}
        {activeTab === 'consentimientos' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-2">
              Evidencia de Consentimientos Legales Registrados
            </h3>

            <div className="space-y-3">
              {evaluacion.consentimientos?.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-dark-900/60 border border-dark-700/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {c.tipo.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      ✓ Aceptado ({c.versionTexto})
                    </span>
                  </div>
                  <p className="text-xs text-dark-200 mt-1 mb-2 font-light">{c.textoAceptado}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-dark-400 font-mono">
                    <span>Fecha: {new Date(c.fechaAceptacion).toLocaleString('es-ES')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: AUDITORÍA */}
        {activeTab === 'auditoria' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-2">
              Historial de Auditoría y Acceso Seguro
            </h3>

            <div className="space-y-2">
              {evaluacion.auditorias?.map((a) => (
                <div key={a.id} className="p-3 rounded-lg bg-dark-900/60 border border-dark-700/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-primary-400 uppercase tracking-wider mr-2">
                      {a.accion}
                    </span>
                    <span className="text-dark-300">
                      {a.usuario ? a.usuario.name : 'Sistema'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-dark-400">
                    {new Date(a.createdAt).toLocaleString('es-ES')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal de Foto Privada */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="max-w-4xl max-h-[90vh] bg-dark-900 rounded-3xl overflow-hidden border border-dark-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-dark-700 flex items-center justify-between bg-dark-800">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Fotografía Privada: {activePhotoModal.cat}
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="text-white hover:text-primary-500 font-bold p-1 text-sm cursor-pointer"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="p-4 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={activePhotoModal.url}
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
