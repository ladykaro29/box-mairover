import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Online() {
  const [selectedPlan, setSelectedPlan] = useState('personalizado');
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedText, setCopiedText] = useState(null);

  // Estados del Formulario de Diagnóstico Web
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: '',
    edad: '',
    peso: '',
    altura: '',
    objetivo: 'perdida_grasa',
    nivel: 'intermedio',
    lugar: 'gym',
    lesiones: '',
    plan: 'Plan Personalizado Online ($70 / 5 semanas)',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePlanSelect = (planKey, planName, formUrl) => {
    setSelectedPlan(planKey);
    setFormData((prev) => ({ ...prev, plan: planName }));
    const formEl = document.getElementById('formulario-online');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const objetivoLabels = {
      perdida_grasa: 'Pérdida de Grasa y Tonificación',
      ganancia_muscular: 'Ganancia de Masa Muscular y Fuerza',
      rendimiento: 'Rendimiento Deportivo y CrossFit',
      salud: 'Salud, Movilidad y Calidad de Vida',
    };

    const nivelLabels = {
      principiante: 'Principiante (Desde cero o retomando)',
      intermedio: 'Intermedio (Más de 6 meses entrenando)',
      avanzado: 'Avanzado (Atleta con experiencia)',
    };

    const lugarLabels = {
      gym: 'Gimnasio Comercial Completo',
      casa_equipo: 'En Casa (con mancuernas / bandas / pesas)',
      casa_libre: 'En Casa (solo peso corporal / calistenia)',
      box: 'Box de CrossFit / Funcional',
    };

    const objetivoDesc = objetivoLabels[formData.objetivo] || formData.objetivo;
    const nivelDesc = nivelLabels[formData.nivel] || formData.nivel;
    const lugarDesc = lugarLabels[formData.lugar] || formData.lugar;

    const mensajeDetallado = `Diagnóstico Online:\n- Ciudad/País: ${formData.ciudad || 'No especificado'}\n- Edad: ${formData.edad || '0'} años | Peso: ${formData.peso || '0'} kg | Altura: ${formData.altura || '0'} cm\n- Nivel: ${nivelDesc}\n- Dónde entrena: ${lugarDesc}\n- Lesiones / Molestias: ${formData.lesiones || '0'}\n- Plan seleccionado: ${formData.plan}`;

    try {
      await fetch('/api/v1/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          servicio: formData.plan,
          objetivo: objetivoDesc,
          mensaje: mensajeDetallado,
        }),
      });
    } catch (err) {
      console.warn('No se pudo guardar copia local de contacto:', err);
    }

    const waText = encodeURIComponent(
      `👋 *¡Hola Coach Mauroly y Mairover! Quiero iniciar mi plan online*\n\n` +
      `📋 *PLAN ELEGIDO:* ${formData.plan}\n\n` +
      `👤 *Mis Datos:*\n` +
      `• *Nombre:* ${formData.nombre}\n` +
      `• *WhatsApp:* ${formData.telefono}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Ubicación:* ${formData.ciudad || 'No especificado'}\n` +
      `• *Medidas:* ${formData.edad || '0'} años | ${formData.peso || '0'} kg | ${formData.altura || '0'} cm\n\n` +
      `🎯 *Objetivo:* ${objetivoDesc}\n` +
      `⚡ *Nivel:* ${nivelDesc}\n` +
      `🏋️ *Dónde entreno:* ${lugarDesc}\n` +
      `⚠️ *Lesiones/Molestias:* ${formData.lesiones || '0'}\n\n` +
      `Deseo coordinar el pago (Zelle / Pago Móvil) para confirmar mi inscripción.`
    );

    const waUrl = `https://wa.me/584147225979?text=${waText}`;

    setSubmitting(false);
    setSubmittedSuccess(true);
    window.open(waUrl, '_blank');
  };

  const defaultPlanes = [
    {
      key: 'personalizado',
      name: 'Plan Personalizado Online ($70 / 5 semanas)',
      title: 'PLAN PERSONALIZADO ONLINE',
      subtitle: 'Entrenamiento Personal + Plan de Alimentación Personal',
      price: '$70',
      period: '/ 5 semanas',
      badge: 'El Más Completo • Recomendado',
      desc: 'Nuestro programa insignia. Cuenta con todo el apoyo, evaluación, correcciones, tips, resolución de dudas y seguimiento continuo para garantizar tus resultados.',
      features: [
        'Programación personal del entrenamiento (Educación y correcciones continuas)',
        'Valoración de medidas antropométricas + registro fotográfico inicial y final',
        'Plan de alimentación personal acorde a tus objetivos',
        'Asesoramiento nutricional inteligente y hábitos sostenibles',
        'Control y seguimiento personalizado directamente por WhatsApp',
        'Todo nuestro apoyo en resolución de dudas y ajustes',
      ],
      delivery: 'Tu programación será enviada en los siguientes 8 días hábiles de confirmado el pago.',
      routeUrl: '/online/formulario/personalizado',
      popular: true,
      color: 'border-[#F43F5E]',
    },
    {
      key: 'basico',
      name: 'Plan Básico Online ($45 / 5 semanas)',
      title: 'PLAN BÁSICO ONLINE',
      subtitle: 'Solo Plan de Entrenamiento + Guía básica de alimentación',
      price: '$45',
      period: '/ 5 semanas',
      badge: 'Entrenamiento Enfocado',
      desc: 'Ideal para quienes desean una programación técnica exigente y periodizada para su gimnasio o casa con una guía base de bienestar físico.',
      features: [
        'Programación estructurada del entrenamiento (Educación y correcciones)',
        'Valoración de medidas antropométricas + registro fotográfico',
        'Guía básica de alimentación (Programa bienestar físico)',
        'Control y seguimiento mediante WhatsApp o Telegram',
        'Evaluación, correcciones de técnica, tips y resolución de dudas',
      ],
      delivery: 'Tu programación será enviada en los siguientes 8 días hábiles de confirmado el pago.',
      routeUrl: '/online/formulario/basico',
      popular: false,
      color: 'border-sky-500/40',
    },
    {
      key: 'nutricional',
      name: 'Plan Nutricional ($35 / mensual)',
      title: 'PLAN NUTRICIONAL',
      subtitle: 'Solo Plan de Alimentación Personal',
      price: '$35',
      period: '/ mensual',
      badge: 'Nutrición Inteligente',
      desc: 'Enfocado 100% en tu alimentación, recomposición corporal, pérdida de grasa o rendimiento deportivo guiado por nuestra especialista.',
      features: [
        'Plan de alimentación personal acorde a tus objetivos y presupuesto',
        'Valoración de medidas antropométricas + registro fotográfico',
        'Asesoramiento nutricional y opciones de sustitución',
        'Control y seguimiento personalizado directamente por WhatsApp o Telegram',
        'Ajustes de calorías y macros según evolución mensual',
      ],
      delivery: 'Tu programación será enviada en los siguientes 8 días hábiles de confirmado el pago.',
      routeUrl: '/online/formulario/nutricional',
      popular: false,
      color: 'border-emerald-500/40',
    },
  ];

  const planes = defaultPlanes;

  const faqs = [
    {
      q: '¿Cómo funciona la inscripción al plan online?',
      a: '1. Eliges tu plan. 2. Realizas el pago vía Zelle o Pago Móvil (a tasa Euro BCV). 3. Llenas el formulario de diagnóstico oficial con tus datos físicos y metas. 4. Tu programación completa será enviada en los siguientes 8 días hábiles de confirmado el pago.',
    },
    {
      q: '¿Qué hago si no tengo alguna medida a la mano al llenar el formulario?',
      a: 'Tal como indica la Coach: alguna información o medida que no tengas a la mano en el momento, coloca un cero (0) y continúa llenando el resto del formulario.',
    },
    {
      q: '¿Cómo se realizan las correcciones de ejercicios?',
      a: 'Nos envías videos de tus series de levantamiento por WhatsApp. Las Coaches Mauroly y Mairover analizan tu postura, profundidad, respiración y trayectoria de la barra o mancuernas para darte feedback directo.',
    },
    {
      q: '¿Puedo entrenar en casa o requiero un gimnasio completo?',
      a: 'Nos adaptamos totalmente a tu realidad: ya sea que entrenes en un gimnasio comercial, en tu casa con mancuernas/bandas o únicamente con peso corporal.',
    },
    {
      q: '¿Qué vigencia tienen los planes?',
      a: 'El Plan Personalizado Online ($70) y el Plan Básico Online ($45) tienen una duración y vencimiento de 5 semanas. El Plan Nutricional ($35) tiene vencimiento mensual.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white pt-28 pb-20 overflow-hidden font-sans">
      {/* Decorative ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] bg-[#F43F5E]/15 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-[35%] left-[-10%] w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/modalidad"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#C2C0B6] hover:text-[#F43F5E] transition-colors uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver a selección de modalidades
          </Link>
        </div>

        {/* ================= HERO SECTION CON FOTO OFICIAL ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <span>🌐 ASESORÍA & ENTRENAMIENTO ONLINE MAIROVERFIT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-6 text-white">
              ENTRENA DONDE ESTÉS, <br />
              <span className="text-[#F43F5E]">CON RESULTADOS REALES.</span>
            </h1>

            <p className="text-[#C2C0B6] text-base md:text-lg mb-4 max-w-2xl leading-relaxed font-light">
              ¡Hola! Un gusto saludarte. Actualmente cuento con tres planes de trabajo online adaptados a tus necesidades y objetivos con asesoría directa de las Head Coaches certificadas CF-L1 y CF-L2.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 max-w-2xl text-xs sm:text-sm text-[#C2C0B6] space-y-2 font-light">
              <p>
                📌 <strong>Diagnóstico Inicial:</strong> Es de vital importancia que accedas al formulario del plan que elijas y respondas con la mayor sinceridad y claridad posible para adaptar el programa a tu medida.
              </p>
              <p className="text-sky-300">
                💡 <em>(Si alguna información no la tienes a la mano al llenar, coloca un cero <strong>0</strong> y sigue avanzando).</em>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#planes-online"
                className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
              >
                <span>VER LOS 3 PLANES ONLINE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>

              <a
                href="#datos-pago"
                className="px-8 py-4 border-2 border-white/20 hover:border-white/50 active:scale-95 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <span>DATOS DE PAGO (ZELLE / PAGO MÓVIL)</span>
              </a>
            </div>

            {/* Micro KPI highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="text-2xl font-black text-white block">5 Semanas</span>
                <span className="text-[11px] text-[#C2C0B6] uppercase tracking-wider">Duración del ciclo</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#F43F5E] block">8 Días</span>
                <span className="text-[11px] text-[#C2C0B6] uppercase tracking-wider">Entrega tras pago</span>
              </div>
              <div>
                <span className="text-2xl font-black text-sky-400 block">WhatsApp</span>
                <span className="text-[11px] text-[#C2C0B6] uppercase tracking-wider">Control directo</span>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-400 block">Medidas</span>
                <span className="text-[11px] text-[#C2C0B6] uppercase tracking-wider">Fotos & Antropometría</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card con Foto Oficial */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <picture>
                <source srcSet="/images/Mairober_7098.webp" type="image/webp" />
                <source srcSet="/images/Mairober_7098.jpg" type="image/jpeg" />
                <img
                  src="/images/Mairober_7098.jpg"
                  alt="Coaches Mairover y Mauroly - MairoverFit Online"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/Mairober_7098.png';
                  }}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#071628] via-[#071628]/30 to-transparent pointer-events-none"></div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#071628]/90 backdrop-blur-md border border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/20 text-[#F43F5E] flex items-center justify-center font-black text-lg">
                    🏅
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Mairover & Mauroly Mercado</p>
                    <p className="text-[11px] text-[#C2C0B6]">Head Coaches CF-L1 & CF-L2 • Nutrición</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= PLANES ONLINE OFICIALES ================= */}
        <section id="planes-online" className="py-16 mb-20 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
              PLANES Y TARIFAS OFICIALES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              ELIGE TU PLAN DE TRABAJO <span className="text-[#F43F5E]">ONLINE</span>
            </h2>
            <p className="text-[#C2C0B6] text-sm mt-3 font-light">
              Haz clic en el formulario del plan que elijas para responder tu diagnóstico inicial y coordinar tu inicio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {planes.map((p) => {
              const isSelected = selectedPlan === p.key;
              return (
                <div
                  key={p.key}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    p.popular
                      ? 'bg-gradient-to-b from-white/10 to-white/5 border-2 border-[#F43F5E] shadow-2xl scale-102 lg:scale-105'
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F43F5E] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                      {p.badge}
                    </span>
                  )}

                  <div>
                    {!p.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-2">
                        {p.badge}
                      </span>
                    )}

                    <h3 className="text-lg font-black uppercase text-white tracking-wide mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#F43F5E] font-semibold mb-4">
                      {p.subtitle}
                    </p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-black text-white">{p.price}</span>
                      <span className="text-xs text-[#C2C0B6] font-medium">{p.period}</span>
                    </div>

                    <p className="text-xs text-[#C2C0B6] leading-relaxed mb-6 font-light">
                      {p.desc}
                    </p>

                    <div className="text-[11px] font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                      <span>¿Qué recibirás al adquirir este plan?</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#F43F5E] font-black text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-xs text-[#C2C0B6] leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-sky-300 leading-relaxed mb-6">
                      ⏱️ <strong>Entrega:</strong> {p.delivery}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    {/* Botón principal: Formulario Oficial Propio de MairoverFit */}
                    <Link
                      to={p.routeUrl}
                      className="w-full py-3.5 px-4 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 text-center block shadow-lg shadow-[#F43F5E]/30 active:scale-95"
                    >
                      📋 LLENAR FORMULARIO DEL PLAN →
                    </Link>

                    {/* Botón secundario: Seleccionar en Cuestionario Web Rápido */}
                    <button
                      type="button"
                      onClick={() => handlePlanSelect(p.key, p.name, p.routeUrl)}
                      className={`w-full py-2.5 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                          : 'bg-white/5 hover:bg-white/10 text-[#C2C0B6] border border-white/10'
                      }`}
                    >
                      {isSelected ? '✓ Seleccionado en Formulario Web' : 'Llenar Formulario Rápido Web'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= MODALIDAD DE PAGO OFICIAL ================= */}
        <section id="datos-pago" className="py-16 mb-20 scroll-mt-28">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#0B2240] via-[#0d2d52] to-[#071628] border-2 border-sky-500/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
              <span className="text-sky-400 font-bold text-xs uppercase tracking-widest block mb-2">
                PAGO SEGURO Y VERIFICADO
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                MODALIDADES DE PAGO OFICIALES
              </h2>
              <p className="text-xs sm:text-sm text-[#C2C0B6] mt-2 font-light">
                Puedes cancelar tu membresía online a través de Zelle o Pago Móvil. Al realizar el pago, envíanos el comprobante por WhatsApp para confirmar tu cupo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-8">
              
              {/* Tarjeta Zelle */}
              <div className="bg-[#071628]/90 border border-white/15 rounded-2xl p-6 relative hover:border-sky-400 transition-colors shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-black text-sm">
                      Z
                    </span>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      Zelle (Dólares)
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">
                    Internacional
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-dark-400 block text-[10px] uppercase tracking-wider">Correo Electrónico:</span>
                    <div className="flex items-center justify-between bg-dark-900/80 px-3 py-2 rounded-lg border border-dark-700 mt-1">
                      <span className="font-mono text-white font-semibold">yelimarmercado4@gmail.com</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('yelimarmercado4@gmail.com', 'zelle')}
                        className="text-[10px] text-sky-400 hover:text-white uppercase font-bold cursor-pointer"
                      >
                        {copiedText === 'zelle' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-dark-400 block text-[10px] uppercase tracking-wider">Titular:</span>
                    <p className="font-bold text-white text-sm mt-0.5">Yelimar Mercado</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Pago Móvil */}
              <div className="bg-[#071628]/90 border border-white/15 rounded-2xl p-6 relative hover:border-sky-400 transition-colors shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                      Bs
                    </span>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      Pago Móvil (Bolívares)
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                    Venezuela
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-dark-400 block text-[10px] uppercase tracking-wider">Banco:</span>
                      <p className="font-bold text-white">Banco Provincial (0108)</p>
                    </div>
                    <div>
                      <span className="text-dark-400 block text-[10px] uppercase tracking-wider">Cédula:</span>
                      <p className="font-bold text-white">C.I. 17.027.249</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-dark-400 block text-[10px] uppercase tracking-wider">Teléfono:</span>
                    <div className="flex items-center justify-between bg-dark-900/80 px-3 py-2 rounded-lg border border-dark-700 mt-1">
                      <span className="font-mono text-white font-semibold">04147225979</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('04147225979', 'tlf')}
                        className="text-[10px] text-sky-400 hover:text-white uppercase font-bold cursor-pointer"
                      >
                        {copiedText === 'tlf' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-amber-400 font-bold text-[11px] block">
                      ⚡ Tasa de Conversión: Euro del BCV oficial del día
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Aviso de confirmación por WhatsApp */}
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-center relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-xs font-bold text-white">
                  ¿Ya realizaste tu pago? Envía el comprobante para activar tu cupo
                </p>
                <p className="text-[11px] text-[#C2C0B6]">
                  Tu programación será enviada en los siguientes 8 días hábiles de confirmado el pago.
                </p>
              </div>

              <a
                href="https://wa.me/584147225979?text=Hola%20Coach%20Mauroly,%20adjunto%20mi%20comprobante%20de%20pago%20del%20plan%20online"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shrink-0 shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                Enviar Comprobante por WhatsApp 📲
              </a>
            </div>

          </div>
        </section>

        {/* ================= FORMULARIO DE DIAGNÓSTICO RÁPIDO WEB ================= */}
        <section id="formulario-online" className="py-16 mb-20 scroll-mt-28">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/15 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-[#F43F5E] to-rose-400"></div>

            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
                FICHA DE EVALUACIÓN WEB
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                CUESTIONARIO DE <span className="text-[#F43F5E]">DIAGNÓSTICO INICIAL</span>
              </h2>
              <p className="text-[#C2C0B6] text-xs sm:text-sm mt-2 font-light">
                Puedes llenar este diagnóstico aquí mismo o acceder al enlace de Google Forms oficial de tu plan. <em>(Si alguna información no la tienes a la mano, coloca un cero <strong>0</strong> y continúa).</em>
              </p>
            </div>

            {submittedSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-2">
                  ¡Diagnóstico Registrado con Éxito!
                </h3>
                <p className="text-sm text-[#C2C0B6] max-w-lg mx-auto mb-6">
                  Se ha generado tu ficha para la Coach Mauroly Mercado. Si no se abrió WhatsApp automáticamente, pulsa el botón a continuación.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://wa.me/584147225979?text=Hola%20MairoverFit,%20acabo%20de%20enviar%20mi%20diagnóstico%20online%20en%20la%20web"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/25"
                  >
                    Abrir WhatsApp Directo
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedSuccess(false)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/15"
                  >
                    Enviar otro diagnóstico
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Datos Personales */}
                <div>
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-black">1</span>
                    Datos de Contacto y Ubicación
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ej. Carlos Zambrano"
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Número de WhatsApp (con código de país) *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Ej. +58 414 1234567"
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ej. carlos@correo.com"
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Ciudad y País donde te encuentras
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        placeholder="Ej. Caracas, Venezuela / Madrid, España"
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Medidas y Perfil */}
                <div>
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-black">2</span>
                    Datos Físicos (Coloca 0 si no lo tienes a la mano)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Edad (Años)
                      </label>
                      <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        placeholder="Ej. 28"
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Peso Actual (kg aprox o 0)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        placeholder="Ej. 70"
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Altura (cm o 0)
                      </label>
                      <input
                        type="number"
                        name="altura"
                        value={formData.altura}
                        onChange={handleChange}
                        placeholder="Ej. 170"
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Objetivos y Nivel */}
                <div>
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-[10px] font-black">3</span>
                    Metas, Nivel y Lugar de Entrenamiento
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Objetivo Principal
                      </label>
                      <select
                        name="objetivo"
                        value={formData.objetivo}
                        onChange={handleChange}
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F43F5E] transition-colors"
                      >
                        <option value="perdida_grasa">Pérdida de Grasa y Tonificación</option>
                        <option value="ganancia_muscular">Ganancia de Masa Muscular y Fuerza</option>
                        <option value="rendimiento">Rendimiento Deportivo y CrossFit</option>
                        <option value="salud">Salud, Movilidad y Calidad de Vida</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Nivel de Experiencia
                      </label>
                      <select
                        name="nivel"
                        value={formData.nivel}
                        onChange={handleChange}
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F43F5E] transition-colors"
                      >
                        <option value="principiante">Principiante (Desde cero o retomando)</option>
                        <option value="intermedio">Intermedio (Más de 6 meses constantes)</option>
                        <option value="avanzado">Avanzado (Atleta con experiencia previa)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        ¿Dónde vas a entrenar?
                      </label>
                      <select
                        name="lugar"
                        value={formData.lugar}
                        onChange={handleChange}
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F43F5E] transition-colors"
                      >
                        <option value="gym">Gimnasio Comercial Completo</option>
                        <option value="casa_equipo">En Casa (con mancuernas / pesas / bandas)</option>
                        <option value="casa_libre">En Casa (solo peso corporal / calistenia)</option>
                        <option value="box">Box de CrossFit / Funcional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                        Plan de Interés
                      </label>
                      <select
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F43F5E] transition-colors"
                      >
                        <option value="Plan Personalizado Online ($70 / 5 semanas)">Plan Personalizado Online ($70 / 5 semanas) - Más Completo</option>
                        <option value="Plan Básico Online ($45 / 5 semanas)">Plan Básico Online ($45 / 5 semanas)</option>
                        <option value="Plan Nutricional ($35 / mensual)">Plan Nutricional ($35 / mensual)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C2C0B6] mb-1.5">
                      ¿Tienes alguna lesión, molestia articular o condición médica que debamos saber?
                    </label>
                    <textarea
                      name="lesiones"
                      rows="2"
                      value={formData.lesiones}
                      onChange={handleChange}
                      placeholder="Ej. Molestia en hombro al empujar / colocar 0 si no tienes lesiones."
                      className="w-full bg-[#071628]/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F43F5E] transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Botón de Enviar */}
                <div className="pt-4 border-t border-white/10 text-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#F43F5E] to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-95 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-[#F43F5E]/30 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'PROCESANDO DIAGNÓSTICO...' : 'ENVIAR DIAGNÓSTICO Y CONECTAR POR WHATSAPP 📲'}
                  </button>
                  <p className="text-[11px] text-[#C2C0B6] mt-3 font-light">
                    🔒 Tus respuestas van directo a las Head Coaches de MairoverFit para coordinar tu inicio.
                  </p>
                </div>

              </form>
            )}
          </div>
        </section>

        {/* ================= PREGUNTAS FRECUENTES ================= */}
        <section className="py-16 mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sky-400 font-bold text-xs uppercase tracking-widest block mb-2">
              DUDAS FRECUENTES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              TODO LO QUE NECESITAS SABER
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 text-sm font-bold uppercase tracking-wider text-white hover:text-[#F43F5E] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg text-[#F43F5E] font-black">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#C2C0B6] leading-relaxed border-t border-white/5 pt-3 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#0B2240] via-[#0d2d52] to-[#071628] border border-white/15 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-3">
              ¿Listo para dar el siguiente paso?
            </h3>
            <p className="text-xs sm:text-sm text-[#C2C0B6] max-w-xl mx-auto mb-8 leading-relaxed font-light">
              Un placer servirle. Estamos listas para acompañarte en tu transformación física y nutricional con la metodología MairoverFit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#planes-online"
                className="px-8 py-3.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-lg shadow-[#F43F5E]/30 active:scale-95"
              >
                ELEGIR MI PLAN ONLINE
              </a>
              <a
                href="https://wa.me/584147225979?text=Hola%20Coach%20Mauroly%20y%20Mairover,%20deseo%20más%20información%20sobre%20los%20planes%20online"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                <span>CONSULTAR POR WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
