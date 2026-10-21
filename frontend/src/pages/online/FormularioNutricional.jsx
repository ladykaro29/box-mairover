import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormProgress from '../../components/formularios/FormProgress';
import MedidasAntropometricas from '../../components/formularios/MedidasAntropometricas';
import FotografiasUpload from '../../components/formularios/FotografiasUpload';
import ConsentimientosCheckboxes from '../../components/formularios/ConsentimientosCheckboxes';
import ResumenConfirmacionModal from '../../components/formularios/ResumenConfirmacionModal';
import { publicEvaluacionesApi } from '../../utils/api';

export default function FormularioNutricional() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});

  const steps = [
    'Datos Personales',
    'Objetivos Nutricionales',
    'Hábitos y Preferencias',
    'Actividad Física',
    'Medidas y Fotos',
    'Consentimientos',
  ];

  const [formData, setFormData] = useState({
    planCodigo: 'nutricional',
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
      principal: 'Pérdida de Grasa y Recomposición',
      secundarios: [],
      queEsperaConseguir: '',
      plazoPrioridades: '',
      dificultades: '',
      notasObjetivos: '',
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
    experienciaRutina: {
      actividadActual: 'Moderada (hago ejercicio 2-3 veces por semana)',
      tipoTrabajo: 'Sedentario (oficina / sentado la mayor parte del día)',
      horasEjercicioSemanales: '3 a 5 horas',
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

  const handleAlimentacionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      alimentacion: { ...prev.alimentacion, [name]: value },
    }));
  };

  const handleActividadChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      experienciaRutina: { ...prev.experienciaRutina, [name]: value },
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
        newErrors.principal = 'Selecciona tu objetivo nutricional principal.';
      }
    }

    if (step === 4) {
      if (!formData.valoracionInicial.peso || Number(formData.valoracionInicial.peso) <= 0) {
        newErrors.peso = 'El peso es necesario para el cálculo nutricional.';
      }
      if (!formData.valoracionInicial.altura || Number(formData.valoracionInicial.altura) <= 0) {
        newErrors.altura = 'La estatura es requerida en centímetros.';
      }
    }

    if (step === 5) {
      if (!formData.consentimientos.privacidad) {
        newErrors.privacidad = 'Debes aceptar la política de privacidad.';
      }
      if (!formData.consentimientos.datosSensibles) {
        newErrors.datosSensibles = 'Debes autorizar el tratamiento de datos para tu plan nutricional.';
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
    if (validateStep(5)) {
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
      const msg = err.response?.data?.message || err.message || 'Error al guardar la evaluación nutricional.';
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
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent-gray-light hover:text-emerald-400 transition-colors uppercase tracking-wider"
          >
            ← Volver a los planes online
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            Plan Nutricional ($35 / mensual)
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
            EVALUACIÓN INICIAL — <span className="text-emerald-400">PLAN NUTRICIONAL</span>
          </h1>
          <p className="text-xs sm:text-sm text-accent-gray-light max-w-2xl mx-auto font-light leading-relaxed">
            Formulario enfocado 100% en tus hábitos alimenticios, digestión, preferencias y metas calóricas.
            <span className="block mt-1 text-sky-300">
              📌 Nota: Este plan contempla exclusivamente el diseño y asesoría de tu alimentación. No incluye programación de rutinas de pesas ni entrenamiento.
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
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
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
                    placeholder="Ej. Sofía"
                    className={`w-full bg-dark-900 border ${
                      errors.nombre ? 'border-primary-500' : 'border-dark-700 focus:border-emerald-400'
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
                    placeholder="Ej. Mendoza Blanco"
                    className={`w-full bg-dark-900 border ${
                      errors.apellidos ? 'border-primary-500' : 'border-dark-700 focus:border-emerald-400'
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
                    placeholder="sofia@correo.com"
                    className={`w-full bg-dark-900 border ${
                      errors.email ? 'border-primary-500' : 'border-dark-700 focus:border-emerald-400'
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
                    placeholder="Ej. 29"
                    className={`w-full bg-dark-900 border ${
                      errors.edad ? 'border-primary-500' : 'border-dark-700 focus:border-emerald-400'
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
                    placeholder="Ej. +58 412 1234567"
                    className={`w-full bg-dark-900 border ${
                      errors.telefono ? 'border-primary-500' : 'border-dark-700 focus:border-emerald-400'
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
                    placeholder="Ej. Caracas, Venezuela / Santiago, Chile"
                    className={`w-full bg-dark-900 border ${
                      errors.ciudad ? 'border-primary-500' : 'border-dark-700 focus:border-emerald-400'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
                  />
                  {errors.ciudad && <p className="text-xs text-primary-400 mt-1">{errors.ciudad}</p>}
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: OBJETIVOS NUTRICIONALES */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                Sección 2. Tus Objetivos Alimentarios
              </h2>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-2">
                  Objetivo Nutricional Principal <span className="text-primary-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Pérdida de Grasa y Definición',
                    'Ganancia de Peso y Masa Muscular',
                    'Recomposición Corporal',
                    'Aprender a Comer Saludable y Mejorar Hábitos',
                    'Nutrición para Rendimiento Deportivo',
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
                          ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
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
                  ¿Qué buscas conseguir con tu plan nutricional?
                </label>
                <textarea
                  rows="3"
                  name="queEsperaConseguir"
                  value={formData.objetivos.queEsperaConseguir}
                  onChange={handleObjetivosChange}
                  placeholder="Ej. Bajar porcentaje de grasa sin pasar hambre, tener más energía en el día, aprender a combinar alimentos..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl p-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Dificultades o barreras que has encontrado antes con la comida
                </label>
                <input
                  type="text"
                  name="dificultades"
                  value={formData.objetivos.dificultades}
                  onChange={handleObjetivosChange}
                  placeholder="Ej. Picoteo por ansiedad por las tardes, fines de semana descontrolados, falta de ideas para cocinar..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 3: HÁBITOS Y PREFERENCIAS */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                Sección 3. Horarios, Hábitos y Preferencias
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Preferencia Alimentaria
                  </label>
                  <select
                    name="preferenciasAlimentarias"
                    value={formData.alimentacion.preferenciasAlimentarias}
                    onChange={handleAlimentacionChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Omnívoro (como carnes, pescados, huevos y vegetales)">Omnívoro (como carnes, pescados, huevos y vegetales)</option>
                    <option value="Pescetariano">Pescetariano</option>
                    <option value="Vegetariano">Vegetariano</option>
                    <option value="Vegano">Vegano</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    ¿Cómo organizas tus comidas?
                  </label>
                  <select
                    name="organizacionComidas"
                    value={formData.alimentacion.organizacionComidas}
                    onChange={handleAlimentacionChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Cocino todas mis comidas en casa">Cocino todas mis comidas en casa</option>
                    <option value="Cocino con tuppers preparados">Cocino con tuppers preparados</option>
                    <option value="Como fuera de casa con frecuencia">Como fuera de casa con frecuencia</option>
                    <option value="Mixto">Mixto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Alergias, Intolerancias o Problemas Digestivos
                </label>
                <input
                  type="text"
                  name="alergiasRestricciones"
                  value={formData.alimentacion.alergiasRestricciones}
                  onChange={handleAlimentacionChange}
                  placeholder="Ej. Intolerancia a la lactosa, reflujo gástrico, celiaquía / 0 si no tienes"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Alimentos que NO te gustan y deseas excluir del menú
                </label>
                <input
                  type="text"
                  name="alimentosNoConsume"
                  value={formData.alimentacion.alimentosNoConsume}
                  onChange={handleAlimentacionChange}
                  placeholder="Ej. Cebolla cruda, pescado blanco, berenjena, lácteos..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  Horarios habituales de tus comidas
                </label>
                <input
                  type="text"
                  name="horariosComidas"
                  value={formData.alimentacion.horariosComidas}
                  onChange={handleAlimentacionChange}
                  placeholder="Ej. Desayuno 7:30 AM, Almuerzo 1:00 PM, Cena 8:00 PM..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 4: CONTEXTO DE ACTIVIDAD FÍSICA */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
                Sección 4. Contexto de Actividad Física
              </h2>

              <p className="text-xs text-accent-gray-light font-light">
                Para calcular tu gasto calórico basal y tu tasa metabólica diaria con precisión, indícanos brevemente tu nivel de movimiento habitual.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Tipo de Trabajo / Ocupación
                  </label>
                  <select
                    name="tipoTrabajo"
                    value={formData.experienciaRutina.tipoTrabajo}
                    onChange={handleActividadChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Sedentario (sentado la mayor parte del día)">Sedentario (sentado la mayor parte del día)</option>
                    <option value="Ligeramente Activo (de pie o caminando parte del día)">Ligeramente Activo (de pie o caminando parte del día)</option>
                    <option value="Muy Activo (trabajo físico pesado o constante movimiento)">Muy Activo (trabajo físico pesado o constante movimiento)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                    Horas de Ejercicio Semanales
                  </label>
                  <select
                    name="horasEjercicioSemanales"
                    value={formData.experienciaRutina.horasEjercicioSemanales}
                    onChange={handleActividadChange}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="0 a 1 hora (Casi nada de ejercicio actualmente)">0 a 1 hora (Casi nada de ejercicio actualmente)</option>
                    <option value="2 a 4 horas por semana">2 a 4 horas por semana</option>
                    <option value="5 a 7 horas por semana">5 a 7 horas por semana</option>
                    <option value="Más de 8 horas por semana (Atleta)">Más de 8 horas por semana (Atleta)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-gray-light mb-1.5">
                  ¿Qué deportes o ejercicios realizas habitualmente?
                </label>
                <input
                  type="text"
                  name="actividadActual"
                  value={formData.experienciaRutina.actividadActual}
                  onChange={handleActividadChange}
                  placeholder="Ej. Gimnasio 3 veces por semana, salgo a caminar 30 min, CrossFit..."
                  className="w-full bg-dark-900 border border-dark-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 5: MEDIDAS Y FOTOS */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">5</span>
                Sección 5. Medidas Antropométricas y Fotografías Opcionales
              </h2>

              <MedidasAntropometricas
                values={formData.valoracionInicial}
                onChange={handleMedidaChange}
                errors={errors}
              />

              <div className="pt-6 border-t border-dark-700/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                  Registro Fotográfico Opcional
                </h3>
                <p className="text-xs text-accent-gray-light mb-4 font-light">
                  En el plan nutricional las fotos son completamente opcionales, pero sumamente útiles para que la coach evalúe tu retención de líquidos y masa magra.
                </p>
                <FotografiasUpload
                  files={files}
                  onFilesChange={setFiles}
                  required={false}
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 6: CONSENTIMIENTOS */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-base font-black uppercase text-white tracking-wide border-b border-dark-700/60 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">6</span>
                Sección 6. Consentimientos Legales y Envío
              </h2>

              <ConsentimientosCheckboxes
                values={formData.consentimientos}
                onChange={handleConsentChange}
                hasPhotos={filesAttachedCount > 0}
                errors={errors}
              />
            </div>
          )}

          {/* Navegación */}
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
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Siguiente Paso →
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePreSubmit}
                className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 active:scale-95 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-emerald-500/30 cursor-pointer"
              >
                Revisar y Enviar Evaluación Nutricional 🥗
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
        planNombre="Plan Nutricional (Alimentación Personalizada)"
        planPrecio="$35 USD / mensual"
      />
    </div>
  );
}
