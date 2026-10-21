import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormProgress from '../../components/formularios/FormProgress';
import MedidasAntropometricas from '../../components/formularios/MedidasAntropometricas';
import FotografiasUpload from '../../components/formularios/FotografiasUpload';
import ConsentimientosCheckboxes from '../../components/formularios/ConsentimientosCheckboxes';
import ResumenConfirmacionModal from '../../components/formularios/ResumenConfirmacionModal';
import { publicEvaluacionesApi } from '../../utils/api';

export default function FormularioPersonalizado() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});

  const steps = [
    'Datos Personales',
    'Objetivos',
    'Experiencia y Rutina',
    'Entrenamiento y Salud',
    'Alimentación',
    'Medidas y Fotos',
    'Consentimientos',
  ];

  const [formData, setFormData] = useState({
    planCodigo: 'personalizado',
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
      principal: 'Pérdida de Grasa y Tonificación',
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
      horariosHabituales: 'Mañana',
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
      horariosComidas: '',
      preferenciasAlimentarias: 'Omnívoro (como de todo)',
      alimentosNoConsume: '',
      alergiasRestricciones: '',
      organizacionComidas: 'Cocino en casa',
      objetivosAlimentacion: '',
      notasAlimentacion: '',
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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleObjetivosChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      objetivos: { ...prev.objetivos, [name]: value },
    }));
  };

  const handleExperienciaChange = (e) => {
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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleConsentChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      consentimientos: { ...prev.consentimientos, [key]: value },
    }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  // Validaciones paso a paso
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
        newErrors.principal = 'Selecciona o define tu objetivo principal.';
      }
    }

    if (step === 5) {
      if (!formData.valoracionInicial.peso || Number(formData.valoracionInicial.peso) <= 0) {
        newErrors.peso = 'El peso es necesario para el cálculo nutricional.';
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
        newErrors.datosSensibles = 'Debes autorizar el tratamiento de datos para tu programación.';
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
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/online"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent-gray-light hover:text-primary-400 transition-colors uppercase tracking-wider"
          >
            ← Volver a los planes online
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-400 bg-primary-500/10 border border-primary-500/30 px-3 py-1 rounded-full">
            Plan Personalizado ($70 / 5 semanas)
          </span>
        </div>

        {/* Title Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
            EVALUACIÓN INICIAL — <span className="text-primary-500">PLAN PERSONALIZADO</span>
          </h1>
          <p className="text-xs sm:text-sm text-accent-gray-light max-w-2xl mx-auto font-light leading-relaxed">
            Completa tu diagnóstico técnico con la mayor sinceridad posible. Esta información permitirá a las Head Coaches
            diseñar tu rutina periodizada y tu plan de alimentación a tu medida.
          </p>
        </div>

        {/* Progress Bar */}
        <FormProgress steps={steps} currentStep={currentStep} onStepClick={(idx) => setCurrentStep(idx)} />

        {/* Error Banner */}
        {submitError && (
          <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-xl text-red-300 text-xs mb-6 flex items-center gap-3 animate-fade-in">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-bold">No se pudo enviar el formulario</p>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        {/* Form Container Card */}
        <div className="bg-dark-800/80 border border-dark-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          {/* SECCIÓN 1: DATOS PERSONALES */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">1</span>
                Sección 1. Datos Personales y Contacto
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
                    placeholder="Ej. Ana María"
                    className={`w-full bg-dark-900 border ${
                      errors.nombre ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
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
                    placeholder="Ej. Rodríguez Pérez"
                    className={`w-full bg-dark-900 border ${
                      errors.apellidos ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
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
                    placeholder="ejemplo@correo.com"
                    className={`w-full bg-dark-900 border ${
                      errors.email ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
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
                    placeholder="Ej. 28"
                    className={`w-full bg-dark-900 border ${
                      errors.edad ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.edad && <p className="text-xs text-primary-400 mt-1">{errors.edad}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Teléfono / WhatsApp <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.datosPersonales.telefono}
                    onChange={handlePersonalChange}
                    placeholder="Ej. +58 414 1234567"
                    className={`w-full bg-dark-900 border ${
                      errors.telefono ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.telefono && <p className="text-xs text-primary-400 mt-1">{errors.telefono}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Medio de Contacto Preferido
                  </label>
                  <select
                    name="medioContactoPreferido"
                    value={formData.datosPersonales.medioContactoPreferido}
                    onChange={handlePersonalChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="WhatsApp">WhatsApp (Recomendado)</option>
                    <option value="Correo">Correo Electrónico</option>
                    <option value="Llamada">Llamada Telefónica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    País <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pais"
                    value={formData.datosPersonales.pais}
                    onChange={handlePersonalChange}
                    placeholder="Ej. Venezuela, España, Chile..."
                    className={`w-full bg-dark-900 border ${
                      errors.pais ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.pais && <p className="text-xs text-primary-400 mt-1">{errors.pais}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Ciudad <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.datosPersonales.ciudad}
                    onChange={handlePersonalChange}
                    placeholder="Ej. San Cristóbal, Caracas, Madrid..."
                    className={`w-full bg-dark-900 border ${
                      errors.ciudad ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.ciudad && <p className="text-xs text-primary-400 mt-1">{errors.ciudad}</p>}
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: OBJETIVOS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">2</span>
                Sección 2. Tus Objetivos
              </h2>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-2">
                  Objetivo Principal <span className="text-primary-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Pérdida de Grasa y Tonificación',
                    'Ganancia de Masa Muscular y Fuerza',
                    'Rendimiento Deportivo y CrossFit',
                    'Recomposición Corporal',
                    'Salud, Movilidad y Calidad de Vida',
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
                          ? 'bg-primary-500/20 border-primary-500 text-white shadow-md'
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
                  ¿Qué esperas conseguir con este plan personalizado?
                </label>
                <textarea
                  rows="3"
                  name="queEsperaConseguir"
                  value={formData.objetivos.queEsperaConseguir}
                  onChange={handleObjetivosChange}
                  placeholder="Describe tus expectativas personales, eventos a los que aspiras o mejoras específicas en tu físico o energía..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl p-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Plazo o Prioridades Personales
                  </label>
                  <input
                    type="text"
                    name="plazoPrioridades"
                    value={formData.objetivos.plazoPrioridades}
                    onChange={handleObjetivosChange}
                    placeholder="Ej. Resultados visibles en 5-10 semanas / Hábitos a largo plazo"
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Principales dificultades que has tenido antes
                  </label>
                  <input
                    type="text"
                    name="dificultades"
                    value={formData.objetivos.dificultades}
                    onChange={handleObjetivosChange}
                    placeholder="Ej. Falta de constancia, ansiedad con la comida, falta de tiempo..."
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 3: EXPERIENCIA Y RUTINA */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">3</span>
                Sección 3. Experiencia y Disponibilidad Semanal
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Nivel de Experiencia Entrenando
                  </label>
                  <select
                    name="experiencia"
                    value={formData.experienciaRutina.experiencia}
                    onChange={handleExperienciaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Principiante (Desde cero o volviendo tras inactividad)">Principiante (Desde cero o volviendo tras inactividad)</option>
                    <option value="Intermedio (Más de 6 meses constantes)">Intermedio (Más de 6 meses constantes)</option>
                    <option value="Avanzado (Atleta con buena técnica y más de 2 años)">Avanzado (Atleta con buena técnica y más de 2 años)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Días disponibles por semana para entrenar
                  </label>
                  <select
                    name="diasDisponibles"
                    value={formData.experienciaRutina.diasDisponibles}
                    onChange={handleExperienciaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="3">3 días por semana</option>
                    <option value="4">4 días por semana</option>
                    <option value="5">5 días por semana</option>
                    <option value="6">6 días por semana</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Tiempo disponible por sesión
                  </label>
                  <select
                    name="tiempoPorSesion"
                    value={formData.experienciaRutina.tiempoPorSesion}
                    onChange={handleExperienciaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="45 minutos">45 minutos</option>
                    <option value="60 minutos">60 minutos</option>
                    <option value="75 minutos">75 minutos</option>
                    <option value="90 minutos">90 minutos o más</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    ¿Dónde vas a entrenar?
                  </label>
                  <select
                    name="lugarEntrenamiento"
                    value={formData.experienciaRutina.lugarEntrenamiento}
                    onChange={handleExperienciaChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Gimnasio Comercial Completo">Gimnasio Comercial Completo</option>
                    <option value="Box de CrossFit / Funcional">Box de CrossFit / Funcional</option>
                    <option value="En Casa con Equipamiento (Mancuernas/Bandas/Banco)">En Casa con Equipamiento (Mancuernas/Bandas/Banco)</option>
                    <option value="En Casa sin Equipamiento (Solo peso corporal)">En Casa sin Equipamiento (Solo peso corporal)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Equipamiento disponible (si entrenas en casa) o detalles del gimnasio
                </label>
                <input
                  type="text"
                  name="equipamiento"
                  value={formData.experienciaRutina.equipamiento}
                  onChange={handleExperienciaChange}
                  placeholder="Ej. Mancuernas de 5kg y 10kg, bandas elásticas, colchoneta, barra de dominadas..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 4: ENTRENAMIENTO Y SALUD */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">4</span>
                Sección 4. Adaptación del Entrenamiento y Salud
              </h2>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200 flex items-start gap-3">
                <span className="text-xl shrink-0">🛡️</span>
                <div>
                  <strong className="block text-white font-bold mb-0.5">Información sensible de salud:</strong>
                  Esta información es confidencial y se solicita únicamente para adaptar las cargas, sustituir ejercicios de impacto y prevenir lesiones. MairoverFit no realiza diagnósticos médicos.
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  ¿Tienes alguna lesión, molestia articular o condición médica que debamos considerar?
                </label>
                <textarea
                  rows="3"
                  name="lesionesMolestias"
                  value={formData.entrenamiento.lesionesMolestias}
                  onChange={handleEntrenamientoChange}
                  placeholder="Ej. Molestia en rodilla derecha al flexionar profundo, dolor lumbar ocasional / colocar '0' o 'ninguna' si no tienes lesiones."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl p-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  ¿Qué actividades o ejercicios te gustan más o realizas actualmente?
                </label>
                <input
                  type="text"
                  name="preferencias"
                  value={formData.entrenamiento.preferencias}
                  onChange={handleEntrenamientoChange}
                  placeholder="Ej. Levantamiento de pesas, correr, saltar cuerda, calistenia, yoga..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Información adicional relevante para tu entrenamiento
                </label>
                <textarea
                  rows="2"
                  name="notasEntrenamiento"
                  value={formData.entrenamiento.notasEntrenamiento}
                  onChange={handleEntrenamientoChange}
                  placeholder="Cualquier otro detalle que consideres importante compartir con tus entrenadoras..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl p-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 5: ALIMENTACIÓN */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">5</span>
                Sección 5. Hábitos y Plan de Alimentación
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Preferencia Alimentaria Base
                  </label>
                  <select
                    name="preferenciasAlimentarias"
                    value={formData.alimentacion.preferenciasAlimentarias}
                    onChange={handleAlimentacionChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Omnívoro (como carnes, pescados y vegetales)">Omnívoro (como carnes, pescados y vegetales)</option>
                    <option value="Pescetariano">Pescetariano</option>
                    <option value="Vegetariano">Vegetariano</option>
                    <option value="Vegano">Vegano</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Organización de tus Comidas
                  </label>
                  <select
                    name="organizacionComidas"
                    value={formData.alimentacion.organizacionComidas}
                    onChange={handleAlimentacionChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Cocino todas mis comidas en casa">Cocino todas mis comidas en casa</option>
                    <option value="Cocino con tuppers preparados con antelación">Cocino con tuppers preparados con antelación</option>
                    <option value="Como fuera de casa con frecuencia por trabajo">Como fuera de casa con frecuencia por trabajo</option>
                    <option value="Mixto (almuerzo fuera, desayuno y cena en casa)">Mixto (almuerzo fuera, desayuno y cena en casa)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Alergias, Intolerancias o Alimentos que te caen mal
                </label>
                <input
                  type="text"
                  name="alergiasRestricciones"
                  value={formData.alimentacion.alergiasRestricciones}
                  onChange={handleAlimentacionChange}
                  placeholder="Ej. Intolerancia a la lactosa, alergia al marisco, celiaquía / 0 si no tienes"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Alimentos que NO te gustan o prefieres excluir
                </label>
                <input
                  type="text"
                  name="alimentosNoConsume"
                  value={formData.alimentacion.alimentosNoConsume}
                  onChange={handleAlimentacionChange}
                  placeholder="Ej. Brócoli, pescado blanco, berenjena, avena..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Horarios habituales de tus comidas principales
                </label>
                <input
                  type="text"
                  name="horariosComidas"
                  value={formData.alimentacion.horariosComidas}
                  onChange={handleAlimentacionChange}
                  placeholder="Ej. Desayuno 8:00 AM, Almuerzo 1:30 PM, Merienda 5:00 PM, Cena 8:30 PM"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 6: MEDIDAS Y FOTOS */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">6</span>
                Sección 6. Medidas Antropométricas y Registro Fotográfico
              </h2>

              <MedidasAntropometricas
                values={formData.valoracionInicial}
                onChange={handleMedidaChange}
                errors={errors}
              />

              <div className="pt-6 border-t border-dark-700/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                  Registro Fotográfico Inicial (Frente, Perfil, Espalda)
                </h3>
                <FotografiasUpload
                  files={files}
                  onFilesChange={setFiles}
                  required={false}
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 7: CONSENTIMIENTOS Y ENVÍO */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">7</span>
                Sección 7. Consentimientos y Envío Final
              </h2>

              <ConsentimientosCheckboxes
                values={formData.consentimientos}
                onChange={handleConsentChange}
                hasPhotos={filesAttachedCount > 0}
                errors={errors}
              />
            </div>
          )}

          {/* Botones de Navegación del Formulario */}
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
                className="w-full sm:w-auto px-8 py-3.5 bg-primary-500 hover:bg-primary-600 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-primary-500/20 cursor-pointer"
              >
                Siguiente Paso →
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePreSubmit}
                className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-primary-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-primary-500/30 cursor-pointer"
              >
                Revisar y Enviar Evaluación 🚀
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Revisión y Confirmación Final */}
      <ResumenConfirmacionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmitFinal}
        isSubmitting={isSubmitting}
        formData={formData}
        filesCount={filesAttachedCount}
        planNombre="Plan Personalizado Online (Entrenamiento + Nutrición)"
        planPrecio="$70 USD / 5 semanas"
      />
    </div>
  );
}
