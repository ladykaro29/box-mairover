import { Link } from 'react-router-dom';

export default function Servicios() {
  const whatsappUrl =
    'https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly,%20quisiera%20asesor%C3%ADa%20sobre%20los%20servicios%20de%20entrenamiento%20en%20MairoverFit%20Box';

  const services = [
    {
      id: 'crossfit',
      title: 'CROSSFIT',
      desc: 'Fuerza, halterofilia (Squat Clean, Push Press, Snatch) y acondicionamiento metabólico. WODs diarios escalables desde principiantes hasta atletas RX.',
      emoji: '🏋️‍♂️',
      badgeBg: 'bg-[#0B2240]',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'crossfit-kids',
      title: 'CROSSFIT KIDS',
      desc: 'Dividido en niveles Iniciación, Intermedio y Avanzado. Desarrollamos motricidad, fuerza segura y trabajo en equipo en niños y preadolescentes.',
      emoji: '🧸',
      badgeBg: 'bg-[#F43F5E]',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'funcionales',
      title: 'FUNCIONALES',
      desc: 'Circuitos dinámicos de alta energía sin cargas olímpicas pesadas. Ideal para quemar grasa, mejorar agilidad y resistencia cardiovascular.',
      emoji: '🏃‍♂️',
      badgeBg: 'bg-[#0B2240]',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'hyrox',
      title: 'HYROX',
      desc: 'Preparación híbrida que combina carrera y estaciones funcionales de resistencia, potencia y empuje sostenido.',
      emoji: '⚡',
      badgeBg: 'bg-[#F43F5E]',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'entrenamiento-personal',
      title: 'ENTRENAMIENTO PERSONAL',
      desc: 'Programación 1 a 1 enfocada en recomposición corporal, rehabilitación o preparación competitiva con seguimiento milimétrico.',
      emoji: '👤',
      badgeBg: 'bg-[#0B2240]',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'nutricion-inteligente',
      title: 'ASESORÍA NUTRICIONAL',
      desc: 'Planes de alimentación reales y sostenibles diseñados para potenciar tu energía en el box y transformar tu composición corporal.',
      emoji: '🍎',
      badgeBg: 'bg-[#F43F5E]',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'bienestar-fisico',
      title: 'BIENESTAR FÍSICO / SENIOR',
      desc: 'Movimiento funcional seguro enfocado en salud articular, movilidad, fuerza e independencia para adultos mayores o personas que inician desde cero.',
      emoji: '🧘‍♀️',
      badgeBg: 'bg-[#0B2240]',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const timelineSteps = [
    {
      number: '1',
      title: 'EVALUACIÓN INICIAL',
      desc: 'Analizamos tu condición física, antecedentes, movilidad y metas.',
      emoji: '📋'
    },
    {
      number: '2',
      title: 'PLAN PERSONALIZADO',
      desc: 'Diseñamos una rutina y plan nutricional adaptado a tu estilo de vida.',
      emoji: '🎯'
    },
    {
      number: '3',
      title: 'SEGUIMIENTO CONSTANTE',
      desc: 'Coaches CF-L1 y L2 corrigen tu técnica y ajustan tu carga en cada WOD.',
      emoji: '📈'
    },
    {
      number: '4',
      title: 'EVOLUCIÓN REAL',
      desc: 'Resultados medibles, fuerza duradera y hábitos para toda la vida.',
      emoji: '🚀'
    }
  ];

  const mainPlans = [
    { name: 'CLASE REGULAR', price: '$35', desc: 'Acceso a clase regular. Ideal para comenzar y mantener constancia.' },
    { name: 'PROGRAMA MAX PERFORMANCE', price: '$45', desc: 'Clase regular + 3 días/semana de musculación específica y fortalecimiento.' },
    { name: 'PROGRAMA COMPETITIVO', price: '$40', desc: 'Entrenamiento específico enfocado a nivel competitivo nacional.' },
    { name: 'PERSONALIZADO BÁSICO', price: '$50', desc: '60 min de entrenamiento personalizado 1 a 1.' },
    { name: 'PERSONALIZADO COMPLETO', price: '$65', desc: 'Entrenamiento personalizado + plan de alimentación individual.' }
  ];

  const otherPlans = [
    { name: 'OPEN BOX', price: '$40' },
    { name: 'CLASE DIARIA', price: '$5' },
    { name: 'CLASE SEMANAL', price: '$15' },
    { name: 'PLAN DE ALIMENTACIÓN PERSONALIZADO', price: '$25' }
  ];

  return (
    <div className="relative min-h-screen bg-white text-dark-800 font-sans overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white flex items-center pt-28 pb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F43F5E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#F43F5E]/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[#F43F5E] text-xs font-semibold tracking-wider uppercase mb-4 animate-[fadeIn_0.5s_ease-out] w-fit">
                <span>📍 DISCIPLINAS • MAIROVERFIT BOX EL VIGÍA</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                SERVICIOS QUE <br />
                TE LLEVAN A <br />
                TU <span className="text-[#F43F5E]">MEJOR VERSIÓN.</span>
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-10 max-w-xl leading-relaxed font-light">
                Entrenamiento, nutrición y acompañamiento real en El Vigía para ayudarte a avanzar con estructura, constancia y resultados sostenibles.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  QUIERO EMPEZAR
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                
                <Link
                  to="/planes"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  VER PLANES
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </Link>
              </div>

              {/* Lower Hero Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    👥
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">TODAS LAS EDADES</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Kids, Adultos y Senior</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    👤
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">ATENCIÓN CERCANA</h4>
                    <p className="text-[10px] text-[#C2C0B6]">100% personalizada</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🏅
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">COACHING CF-L2</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Técnica certificada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80"
                  alt="Coaches MairoverFit Box"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CATÁLOGO DE 7 SERVICIOS ================= */}
      <section className="bg-white py-24 text-dark-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            CATÁLOGO COMPLETO
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            NUESTROS SERVICIOS Y DISCIPLINAS
          </h2>

          <div className="space-y-8">
            {/* Top Row (4 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 4).map((serv) => (
                <div key={serv.id} className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 border border-dark-100 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/11] overflow-hidden relative">
                      <img
                        src={serv.image}
                        alt={serv.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute bottom-[-18px] left-6 w-9 h-9 rounded-full ${serv.badgeBg} flex items-center justify-center text-white text-xs shadow-md font-bold`}>
                        {serv.emoji}
                      </div>
                    </div>
                    <div className="p-6 pt-8 text-left">
                      <h3 className="text-sm font-black text-[#071628] uppercase tracking-tight mb-2">
                        {serv.title}
                      </h3>
                      <p className="text-dark-500 text-[11px] leading-relaxed font-light">
                        {serv.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 text-left">
                    <Link to="/contacto" className="inline-flex items-center gap-1 text-[10px] font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                      MÁS INFO
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row (3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.slice(4, 7).map((serv) => (
                <div key={serv.id} className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 border border-dark-100 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/11] overflow-hidden relative">
                      <img
                        src={serv.image}
                        alt={serv.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute bottom-[-18px] left-6 w-9 h-9 rounded-full ${serv.badgeBg} flex items-center justify-center text-white text-xs shadow-md font-bold`}>
                        {serv.emoji}
                      </div>
                    </div>
                    <div className="p-6 pt-8 text-left">
                      <h3 className="text-sm font-black text-[#071628] uppercase tracking-tight mb-2">
                        {serv.title}
                      </h3>
                      <p className="text-dark-500 text-[11px] leading-relaxed font-light">
                        {serv.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 text-left">
                    <Link to="/contacto" className="inline-flex items-center gap-1 text-[10px] font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                      MÁS INFO
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= BLOQUE DESTACADO: CROSSFIT KIDS & PLAN VACACIONAL ================= */}
      <section className="bg-dark-900 text-white py-20 border-y border-dark-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F43F5E]/10 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-dark-800 border-2 border-primary-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Columna Texto */}
              <div className="lg:col-span-8 text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-500 text-xs font-bold uppercase tracking-wider">
                  <span>🧸 PROGRAMA ESTRELLA PARA LOS PEQUEÑOS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-white tracking-tight">
                  CROSSFIT KIDS & <span className="text-primary-500">PLAN VACACIONAL</span> (TEMPORADA 6)
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  En MairoverFit Box formamos el carácter, la disciplina y las habilidades motoras de los futuros campeones en un entorno seguro, pedagógico y altamente divertido.
                </p>

                {/* 3 Categorías por Edades */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
                    <span className="text-xs font-extrabold text-green-400 block mb-1">🟢 INICIACIÓN</span>
                    <p className="text-[11px] text-gray-300">Juegos motores, coordinación y patrones básicos de movimiento.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
                    <span className="text-xs font-extrabold text-yellow-400 block mb-1">🟡 INTERMEDIO</span>
                    <p className="text-[11px] text-gray-300">Gimnasia corporal básica, fuerza con peso corporal y trabajo en equipo.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
                    <span className="text-xs font-extrabold text-red-400 block mb-1">🔴 AVANZADO</span>
                    <p className="text-[11px] text-gray-300">Técnica introductoria de barras, acondicionamiento y competencias internas.</p>
                  </div>
                </div>

                {/* Highlights Plan Vacacional */}
                <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/30 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">🌞 PLAN VACACIONAL TEMPORADA 6</h4>
                    <p className="text-[11px] text-gray-300">CrossFit Kids + Natación formativa + Actividades recreativas y deportivas al aire libre.</p>
                  </div>
                  <a
                    href="https://wa.me/584147225979?text=Hola%20Coaches,%20quiero%20información%20sobre%20CrossFit%20Kids%20y%20el%20Plan%20Vacacional"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-[#E11D48] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md active:scale-95"
                  >
                    CONSULTAR CUPOS KIDS
                  </a>
                </div>
              </div>

              {/* Columna Imagen */}
              <div className="lg:col-span-4 relative flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-2 border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80"
                    alt="CrossFit Kids MairoverFit"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-xs font-bold text-primary-500 uppercase">MairoverFit Kids</span>
                    <p className="text-sm font-extrabold text-white">Competencias Internas & Diversión</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= TIMELINE METODOLÓGICO ================= */}
      <section className="bg-[#F9F9FA] py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            MÁS QUE ENTRENAR
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            TE ACOMPAÑAMOS EN EL PROCESO
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center p-6 bg-white rounded-2xl border border-dark-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute -top-4 w-8 h-8 rounded-full bg-[#F43F5E] text-white flex items-center justify-center font-black text-xs shadow-md">
                  {step.number}
                </div>
                
                <div className="w-14 h-14 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-2xl mb-4 mt-2">
                  {step.emoji}
                </div>
                
                <h3 className="font-extrabold text-xs text-[#071628] uppercase tracking-wider mb-2">{step.title}</h3>
                <p className="text-dark-500 text-[11px] leading-relaxed max-w-[200px] font-light">
                  {step.desc}
                </p>
                
                {idx < 3 && (
                  <div className="hidden lg:block absolute right-[-24px] top-1/2 transform -translate-y-1/2 z-10 text-dark-300 text-lg font-bold pointer-events-none">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PLANES Y MEMBRESÍAS ================= */}
      <section id="planes" className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2 text-center">
            TARIFAS EN EL BOX
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-16 text-center">
            MEMBRESÍAS DESTACADAS
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left 5 main plans */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-5 gap-4">
              {mainPlans.map((plan, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/30 rounded-xl p-4 flex flex-col justify-between text-left hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <h3 className="font-extrabold text-[10px] uppercase tracking-wider text-[#C2C0B6] mb-3 min-h-[30px]">
                      {plan.name}
                    </h3>
                    <div className="text-[#F43F5E] text-2xl font-black mb-3">
                      {plan.price}
                    </div>
                    <p className="text-[9px] text-[#C2C0B6] leading-relaxed font-light">
                      {plan.desc}
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link to="/planes" className="w-full text-center py-1.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-[9px] font-black uppercase tracking-wider rounded-md block transition-colors">
                      ELEGIR
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Otras Membresías */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-xl p-6 text-left flex flex-col justify-between">
              <div>
                <span className="text-[#F43F5E] font-bold text-[10px] uppercase tracking-[0.2em] block mb-4">
                  OTRAS MEMBRESÍAS Y PASES
                </span>
                
                <div className="space-y-4">
                  {otherPlans.map((plan, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#F43F5E] font-bold text-xs">✓</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">{plan.name}</span>
                      </div>
                      <span className="text-sm font-black text-[#F43F5E]">{plan.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link to="/planes" className="w-full text-center py-3 bg-[#0B2240] hover:bg-[#123158] border border-white/10 text-white text-[10px] font-black uppercase tracking-wider rounded-lg block transition-colors">
                  VER TODOS LOS PLANES
                </Link>
              </div>
            </div>

          </div>

          <p className="text-center text-[11px] text-[#C2C0B6] mt-12 italic font-light">
            * Todos los planes presenciales incluyen seguimiento técnico personalizado y acceso a las instalaciones.
          </p>

        </div>
      </section>

      {/* ================= HORARIOS SECTION ================= */}
      <section className="bg-white py-20 text-dark-800 relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#071628] tracking-tight uppercase mb-12">
            HORARIOS DEL BOX EN EL VIGÍA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#F9F9FA] rounded-2xl border border-dark-100 p-8 flex items-center gap-4 text-left shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-2xl flex-shrink-0">
                📅
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-dark-900">Lunes a Viernes</h4>
                <span className="text-[10px] font-black text-[#F43F5E] uppercase tracking-wider block mb-1">Mañana</span>
                <p className="text-xs font-semibold text-dark-700">6:00 a. m. – 11:30 a. m.</p>
              </div>
            </div>

            <div className="bg-[#F9F9FA] rounded-2xl border border-dark-100 p-8 flex items-center gap-4 text-left shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-2xl flex-shrink-0">
                ☀️
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-dark-900">Lunes a Viernes</h4>
                <span className="text-[10px] font-black text-[#F43F5E] uppercase tracking-wider block mb-1">Tarde / Noche</span>
                <p className="text-xs font-semibold text-dark-700">3:00 p. m. – 8:00 p. m.</p>
              </div>
            </div>

            <div className="bg-[#F9F9FA] rounded-2xl border border-dark-100 p-8 flex items-center gap-4 text-left shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-2xl flex-shrink-0">
                🕒
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-dark-900">Sábados</h4>
                <span className="text-[10px] font-black text-[#F43F5E] uppercase tracking-wider block mb-1">Comunidad / WOD</span>
                <p className="text-xs font-semibold text-dark-700">8:00 a. m. – 10:00 a. m.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-gradient-to-br from-[#071628] to-[#09203a] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-3">
                TU OBJETIVO NO SE LOGRA SOLO.
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                SE CONSTRUYE <br />
                <span className="text-[#F43F5E]">CON GUÍA.</span>
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed font-light">
                Escríbenos y encuentra el servicio ideal para ti según tu nivel, tu meta y tu disponibilidad de horario en El Vigía.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  HABLAR POR WHATSAPP
                </a>
                
                <Link
                  to="/contacto"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  AGENDAR EVALUACIÓN
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80"
                  alt="Coaching MairoverFit"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
