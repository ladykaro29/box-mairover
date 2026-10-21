import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormProgress from '../../components/formularios/FormProgress';
import MedidasAntropometricas from '../../components/formularios/MedidasAntropometricas';
import FotografiasUpload from '../../components/formularios/FotografiasUpload';
import ConsentimientosCheckboxes from '../../components/formularios/ConsentimientosCheckboxes';
import ResumenConfirmacionModal from '../../components/formularios/ResumenConfirmacionModal';
import { publicEvaluacionesApi } from '../../utils/api';

export default function FormularioBasico() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});

  const steps = [
    'Datos Personales',
    'Objetivos de Entrenamiento',
    'Rutina y Equipamiento',
    'Limitaciones y Salud',
    'Guía Básica Alimentación',
    'Medidas y Fotos',
    'Consentimientos',
  ];

  const [formData, setFormData] = useState({
    planCodigo: 'basico',
    datosPersonales: {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      whatsapp: '',
      edad: '',
      fechaNacimiento: '',
      pais: '',
      ciudad: '',
      zonaHoraria: '',
      medioContactoPreferido: 'WhatsApp',
    },
    objetivos: {
      principal: 'Ganancia de Fuerza y Acondicionamiento Físico',
      secundarios: [],
      queEsperaConseguir: '',
      plazoPrioridades: '',
      dificultades: '',
      notasObjetivos: '',
    },
    experienciaRutina: {
      experiencia: 'Intermedio (Más de 6 meses constantes)',
      actividadActual: '',
      diasDisponibles: 4,
      tiempoPorSesion: '60 minutos',
      horariosHabituales: 'Tarde / Noche',
      lugarEntrenamiento: 'Gimnasio Comercial Completo',
      equipamiento: '',
    },
    entrenamiento: {
      preferencias: '',
      ejerciciosActuales: '',
      limitacionesFuncionales: '',
      lesionesMolestias: '',
      notasEntrenamiento: '',
    },
    alimentacion: {
      alergiasRestricciones: '',
      notasAlimentacion: 'Guía básica de alimentación y bienestar físico',
    },
    valoracionInicial: {
      peso: '',
      altura: '',
      cuello: '',
      pecho: '',
      cintura: '',
      abdomen: '',
      cadera: '',
      brazo: '',
      muslo: '',
      pantorrilla: '',
      observacionesMedidas: '',
    },
    consentimientos: {
      privacidad: false,
      datosSensibles: false,
      fotosCorporales: false,
      publicidadRrss: false,
    },
  });

  const [files, setFiles] = useState({
    fotoFrente: null,
    fotoPerfil: null,
    fotoEspalda: null,
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      datosPersonales: { ...prev.datosPersonales, [name]: value },
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleObjetivosChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      objetivos: { ...prev.objetivos, [name]: value },
    }));
  };

  const handleRutinaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      experienciaRutina: { ...prev.experienciaRutina, [name]: value },
    }));
  };

  const handleEntrenamientoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      entrenamiento: { ...prev.entrenamiento, [name]: value },
    }));
  };

  const handleAlimentacionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      alimentacion: { ...prev.alimentacion, [name]: value },
    }));
  };

  const handleMedidaChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      valoracionInicial: { ...prev.valoracionInicial, [name]: value },
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleConsentChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      consentimientos: { ...prev.consentimientos, [key]: value },
    }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.datosPersonales.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
      if (!formData.datosPersonales.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios.';
      if (!formData.datosPersonales.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.datosPersonales.email)) {
        newErrors.email = 'Introduce un correo electrónico válido.';
      }
      if (!formData.datosPersonales.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio.';
      const edadNum = parseInt(formData.datosPersonales.edad, 10);
      if (!edadNum || isNaN(edadNum)) {
        newErrors.edad = 'La edad es obligatoria.';
      } else if (edadNum < 18) {
        newErrors.edad = 'Se requiere autorización de un representante para menores de 18 años.';
      }
      if (!formData.datosPersonales.pais.trim()) newErrors.pais = 'El país es obligatorio.';
      if (!formData.datosPersonales.ciudad.trim()) newErrors.ciudad = 'La ciudad es obligatoria.';
    }

    if (step === 1) {
      if (!formData.objetivos.principal.trim()) {
        newErrors.principal = 'Selecciona tu objetivo de entrenamiento.';
      }
    }

    if (step === 5) {
      if (!formData.valoracionInicial.peso || Number(formData.valoracionInicial.peso) <= 0) {
        newErrors.peso = 'El peso es necesario para el ajuste de cargas y volumen.';
      }
      if (!formData.valoracionInicial.altura || Number(formData.valoracionInicial.altura) <= 0) {
        newErrors.altura = 'La estatura es requerida en centímetros.';
      }
    }

    if (step === 6) {
      if (!formData.consentimientos.privacidad) {
        newErrors.privacidad = 'Debes aceptar la política de privacidad.';
      }
      if (!formData.consentimientos.datosSensibles) {
        newErrors.datosSensibles = 'Debes autorizar el tratamiento de datos para tu programación de entrenamiento.';
      }
      const hasAnyPhoto = Boolean(files.fotoFrente || files.fotoPerfil || files.fotoEspalda);
      if (hasAnyPhoto && !formData.consentimientos.fotosCorporales) {
        newErrors.fotosCorporales = 'Debes autorizar el uso técnico confidencial de las fotografías adjuntas.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setSubmitError(null);
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePreSubmit = () => {
    if (validateStep(6)) {
      setIsModalOpen(true);
    }
  };

  const handleSubmitFinal = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = new FormData();
      data.append('payload', JSON.stringify(formData));

      if (files.fotoFrente) data.append('fotoFrente', files.fotoFrente);
      if (files.fotoPerfil) data.append('fotoPerfil', files.fotoPerfil);
      if (files.fotoEspalda) data.append('fotoEspalda', files.fotoEspalda);

      const response = await publicEvaluacionesApi.submitEvaluacion(data);

      setIsModalOpen(false);
      navigate(`/online/formulario/confirmacion/${response.codigoReferencia}`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error al guardar la evaluación.';
      setSubmitError(msg);
      setIsModalOpen(false);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filesAttachedCount = [files.fotoFrente, files.fotoPerfil, files.fotoEspalda].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white pt-28 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/online"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent-gray-light hover:text-sky-400 transition-colors uppercase tracking-wider"
          >
            ← Volver a los planes online
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full">
            Plan Básico Online ($45 USD)
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
            EVALUACIÓN INICIAL — <span className="text-sky-400">PLAN BÁSICO ONLINE</span>
          </h1>
          <p className="text-xs sm:text-sm text-accent-gray-light max-w-2xl mx-auto font-light leading-relaxed">
            Programación estructurada del entrenamiento con seguimiento por WhatsApp y guía básica de alimentación de bienestar físico.
            <span className="block mt-1 text-sky-300 font-normal">
              ⏱️ Vigencia: Ciclo de 5 semanas (o mensual según confirmación con tu coach).
            </span>
          </p>
        </div>

        <FormProgress steps={steps} currentStep={currentStep} onStepClick={(idx) => setCurrentStep(idx)} />

        {submitError && (
          <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-xl text-red-300 text-xs mb-6 flex items-center gap-3 animate-fade-in">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-bold">No se pudo enviar el formulario</p>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        <div className="bg-dark-800/80 border border-dark-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {/* SECCIÓN 1: DATOS PERSONALES */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">1</span>
                Sección 1. Datos Personales
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Nombres <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.datosPersonales.nombre}
                    onChange={handlePersonalChange}
                    placeholder="Ej. Juan Carlos"
                    className={`w-full bg-dark-900 border ${
                      errors.nombre ? 'border-primary-500' : 'border-dark-700 focus:border-sky-400'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.nombre && <p className="text-xs text-primary-400 mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Apellidos <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.datosPersonales.apellidos}
                    onChange={handlePersonalChange}
                    placeholder="Ej. Silva Gómez"
                    className={`w-full bg-dark-900 border ${
                      errors.apellidos ? 'border-primary-500' : 'border-dark-700 focus:border-sky-400'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.apellidos && <p className="text-xs text-primary-400 mt-1">{errors.apellidos}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Correo Electrónico <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.datosPersonales.email}
                    onChange={handlePersonalChange}
                    placeholder="juan@correo.com"
                    className={`w-full bg-dark-900 border ${
                      errors.email ? 'border-primary-500' : 'border-dark-700 focus:border-sky-400'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.email && <p className="text-xs text-primary-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Edad (Años) <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="edad"
                    min="14"
                    max="100"
                    value={formData.datosPersonales.edad}
                    onChange={handlePersonalChange}
                    placeholder="Ej. 26"
                    className={`w-full bg-dark-900 border ${
                      errors.edad ? 'border-primary-500' : 'border-dark-700 focus:border-sky-400'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.edad && <p className="text-xs text-primary-400 mt-1">{errors.edad}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    WhatsApp <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.datosPersonales.telefono}
                    onChange={handlePersonalChange}
                    placeholder="Ej. +58 414 7788990"
                    className={`w-full bg-dark-900 border ${
                      errors.telefono ? 'border-primary-500' : 'border-dark-700 focus:border-sky-400'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.telefono && <p className="text-xs text-primary-400 mt-1">{errors.telefono}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    País y Ciudad <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.datosPersonales.ciudad}
                    onChange={(e) => {
                      setFormData((p) => ({
                        ...p,
                        datosPersonales: {
                          ...p.datosPersonales,
                          ciudad: e.target.value,
                          pais: p.datosPersonales.pais || 'Venezuela',
                        },
                      }));
                      if (errors.ciudad) setErrors((prev) => ({ ...prev, ciudad: null }));
                    }}
                    placeholder="Ej. Maracaibo, Venezuela / Buenos Aires"
                    className={`w-full bg-dark-900 border ${
                      errors.ciudad ? 'border-primary-500' : 'border-dark-700 focus:border-sky-400'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.ciudad && <p className="text-xs text-primary-400 mt-1">{errors.ciudad}</p>}
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: OBJETIVOS DE ENTRENAMIENTO */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">2</span>
                Sección 2. Tus Metas de Entrenamiento
              </h2>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-2">
                  Objetivo Principal de Entrenamiento <span className="text-primary-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Fuerza y Rendimiento en Gym',
                    'Acondicionamiento Físico y Pérdida de Grasa',
                    'Hipertrofia y Aumento de Masa Muscular',
                    'Mejorar Resistencia y Salud General',
                  ].map((obj) => (
                    <button
                      key={obj}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          objetivos: { ...p.objetivos, principal: obj },
                        }))
                      }
                      className={`p-3.5 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                        formData.objetivos.principal === obj
                          ? 'bg-sky-500/20 border-sky-400 text-white shadow-md'
                          : 'bg-dark-900 border-dark-700 text-accent-gray-light hover:border-dark-600'
                      }`}
                    >
                      {formData.objetivos.principal === obj ? '✓ ' : ''}{obj}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  ¿Qué buscas conseguir con esta programación?
                </label>
                <textarea
                  rows="3"
                  name="queEsperaConseguir"
                  value={formData.objetivos.queEsperaConseguir}
                  onChange={handleObjetivosChange}
                  placeholder="Describe qué cambios físicos o de fuerza deseas lograr en las próximas semanas..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl p-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 3: RUTINA Y EQUIPAMIENTO */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">3</span>
                Sección 3. Experiencia, Disponibilidad y Equipamiento
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Nivel Actual de Entrenamiento
                  </label>
                  <select
                    name="experiencia"
                    value={formData.experienciaRutina.experiencia}
                    onChange={handleRutinaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Principiante (menos de 6 meses)">Principiante (menos de 6 meses)</option>
                    <option value="Intermedio (6 meses a 2 años constantes)">Intermedio (6 meses a 2 años constantes)</option>
                    <option value="Avanzado (más de 2 años)">Avanzado (más de 2 años)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Días disponibles por semana
                  </label>
                  <select
                    name="diasDisponibles"
                    value={formData.experienciaRutina.diasDisponibles}
                    onChange={handleRutinaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="3">3 días por semana</option>
                    <option value="4">4 días por semana</option>
                    <option value="5">5 días por semana</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    ¿Dónde vas a entrenar?
                  </label>
                  <select
                    name="lugarEntrenamiento"
                    value={formData.experienciaRutina.lugarEntrenamiento}
                    onChange={handleRutinaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Gimnasio Comercial Completo">Gimnasio Comercial Completo</option>
                    <option value="Box de CrossFit / Funcional">Box de CrossFit / Funcional</option>
                    <option value="En Casa con Equipamiento (Pesas / Bandas)">En Casa con Equipamiento (Pesas / Bandas)</option>
                    <option value="En Casa sin Equipamiento (Calistenia)">En Casa sin Equipamiento (Calistenia)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Tiempo disponible por sesión
                  </label>
                  <select
                    name="tiempoPorSesion"
                    value={formData.experienciaRutina.tiempoPorSesion}
                    onChange={handleRutinaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="45 minutos">45 minutos</option>
                    <option value="60 minutos">60 minutos</option>
                    <option value="75 minutos">75 minutos o más</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Equipamiento disponible
                </label>
                <input
                  type="text"
                  name="equipamiento"
                  value={formData.experienciaRutina.equipamiento}
                  onChange={handleRutinaChange}
                  placeholder="Ej. Gimnasio comercial completo / mancuernas ajustables de 10kg y barra de dominadas..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 4: LIMITACIONES Y SALUD */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">4</span>
                Sección 4. Adaptaciones y Prevención de Lesiones
              </h2>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  ¿Tienes alguna molestia, lesión previa o limitación física?
                </label>
                <textarea
                  rows="3"
                  name="lesionesMolestias"
                  value={formData.entrenamiento.lesionesMolestias}
                  onChange={handleEntrenamientoChange}
                  placeholder="Ej. Molestia en rodilla en sentadillas profundas / 0 si no tienes lesiones."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl p-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Preferencias o ejercicios que prefieres evitar o incluir
                </label>
                <input
                  type="text"
                  name="preferencias"
                  value={formData.entrenamiento.preferencias}
                  onChange={handleEntrenamientoChange}
                  placeholder="Ej. Me gusta el trabajo de piernas / prefiero evitar saltos de alto impacto..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 5: GUÍA BÁSICA DE ALIMENTACIÓN */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">5</span>
                Sección 5. Información Mínima para la Guía Básica de Alimentación
              </h2>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-dark-200">
                📌 <strong>Alcance del Plan Básico:</strong> Incluye una guía general de alimentación para bienestar físico. Si requieres un menú personalizado con sustituciones gramo a gramo y cálculo exhaustivo de macronutrientes, te recomendamos el Plan Nutricional o el Plan Personalizado.
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Alergias o Alimentos que debes evitar
                </label>
                <input
                  type="text"
                  name="alergiasRestricciones"
                  value={formData.alimentacion.alergiasRestricciones}
                  onChange={handleAlimentacionChange}
                  placeholder="Ej. Alergia a frutos secos, intolerancia a la lactosa / 0 si no tienes"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-sky-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 6: MEDIDAS Y FOTOS */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">6</span>
                Sección 6. Medidas y Fotos Iniciales
              </h2>

              <MedidasAntropometricas
                values={formData.valoracionInicial}
                onChange={handleMedidaChange}
                errors={errors}
              />

              <div className="pt-6 border-t border-dark-700/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                  Registro Fotográfico Inicial
                </h3>
                <FotografiasUpload
                  files={files}
                  onFilesChange={setFiles}
                  required={false}
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 7: CONSENTIMIENTOS */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold">7</span>
                Sección 7. Consentimientos y Envío
              </h2>

              <ConsentimientosCheckboxes
                values={formData.consentimientos}
                onChange={handleConsentChange}
                hasPhotos={filesAttachedCount > 0}
                errors={errors}
              />
            </div>
          )}

          {/* Botones de Navegación */}
          <div className="mt-10 pt-6 border-t border-dark-700/60 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-dark-700 hover:bg-dark-700/60 text-xs font-bold uppercase tracking-wider text-accent-gray-light hover:text-white transition-all cursor-pointer"
              >
                ← Paso Anterior
              </button>
            ) : (
              <div />
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                Siguiente Paso →
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePreSubmit}
                className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-sky-500/30 cursor-pointer"
              >
                Revisar y Enviar Evaluación Básica 🏋️
              </button>
            )}
          </div>
        </div>
      </div>

      <ResumenConfirmacionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmitFinal}
        isSubmitting={isSubmitting}
        formData={formData}
        filesCount={filesAttachedCount}
        planNombre="Plan Básico Online (Entrenamiento Estructurado)"
        planPrecio="$45 USD"
      />
    </div>
  );
}
