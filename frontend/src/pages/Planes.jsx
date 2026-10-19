import { Link } from 'react-router-dom';

export default function Planes() {
  const boxPlans = [
    {
      id: 1,
      nombre: 'CLASE REGULAR',
      precio: '$35',
      periodo: '/mes',
      desc: 'Acceso a clase regular. Ideal para comenzar y mantener constancia.',
      emoji: '🏋️‍♂️',
      waText: 'Hola%20MairoverFit,%20quiero%20inscribirme%20en%20el%20plan%20CLASE%20REGULAR%20($35/mes)'
    },
    {
      id: 2,
      nombre: 'PROGRAMA MAX PERFORMANCE',
      precio: '$45',
      periodo: '/mes',
      desc: 'Clase regular + 3 días/semana de musculación específica y fortalecimiento.',
      emoji: '⭐',
      popular: true,
      waText: 'Hola%20MairoverFit,%20quiero%20inscribirme%20en%20el%20PROGRAMA%20MAX%20PERFORMANCE%20($45/mes)'
    },
    {
      id: 3,
      nombre: 'PROGRAMA COMPETITIVO',
      precio: '$40',
      periodo: '/mes',
      desc: 'Entrenamiento específico a nivel competitivo nacional.',
      emoji: '🏆',
      waText: 'Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20PROGRAMA%20COMPETITIVO%20($40/mes)'
    },
    {
      id: 4,
      nombre: 'PERSONALIZADO BÁSICO',
      precio: '$50',
      periodo: '/mes',
      desc: '60 min de entrenamiento personalizado 1 a 1.',
      emoji: '🎯',
      waText: 'Hola%20MairoverFit,%20quiero%20empezar%20el%20plan%20PERSONALIZADO%20BÁSICO%20($50/mes)'
    },
    {
      id: 5,
      nombre: 'PERSONALIZADO COMPLETO',
      precio: '$65',
      periodo: '/mes',
      desc: 'Entrenamiento + plan de alimentación individual.',
      emoji: '👤',
      waText: 'Hola%20MairoverFit,%20quiero%20empezar%20el%20plan%20PERSONALIZADO%20COMPLETO%20con%20nutrición%20($65/mes)'
    }
  ];

  const otherMembresias = [
    { name: 'OPEN BOX', price: '$40', waText: 'Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20pase%20OPEN%20BOX%20($40)' },
    { name: 'CLASE DIARIA', price: '$5', waText: 'Hola%20MairoverFit,%20quiero%20adquirir%20una%20CLASE%20DIARIA%20($5)' },
    { name: 'CLASE SEMANAL', price: '$15', waText: 'Hola%20MairoverFit,%20quiero%20adquirir%20el%20pase%20de%20CLASE%20SEMANAL%20($15)' },
    { name: 'PLAN DE ALIMENTACIÓN PERSONALIZADO', price: '$25', waText: 'Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20PLAN%20DE%20ALIMENTACIÓN%20PERSONALIZADO%20($25)' }
  ];

  const onlinePlans = [
    {
      title: 'PLAN ONLINE ENTRENAMIENTO',
      emoji: '🏋️‍♂️',
      waText: 'Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20PLAN%20ONLINE%20ENTRENAMIENTO',
      features: [
        'Evaluación física inicial',
        'Rutina personalizada en app',
        'Ajustes continuos de cargas',
        'Feedback directo de coaches'
      ]
    },
    {
      title: 'PLAN ONLINE NUTRICIÓN',
      emoji: '🍎',
      waText: 'Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20PLAN%20ONLINE%20NUTRICIÓN',
      features: [
        'Guía de alimentación flexible',
        'Hábitos reales sin pasar hambre',
        'Cálculo de macros según tu meta',
        'Acompañamiento semanal'
      ]
    },
    {
      title: 'PLAN ONLINE INTEGRAL',
      emoji: '🏋️‍♂️+🍎',
      waText: 'Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20PLAN%20ONLINE%20INTEGRAL',
      features: [
        'Entrenamiento + nutrición activa',
        'Seguimiento integral de evolución',
        'Acompañamiento 1 a 1',
        'Plan adaptado a tus metas'
      ]
    }
  ];

  const processSteps = [
    {
      title: 'EVALUACIÓN INICIAL',
      desc: 'Analizamos tu punto de partida para diseñar el mejor plan para ti.',
      emoji: '📋'
    },
    {
      title: 'PLAN A TU MEDIDA',
      desc: 'Entrenamiento y nutrición adaptados a tus objetivos, nivel y estilo de vida.',
      emoji: '🎯'
    },
    {
      title: 'SEGUIMIENTO CONSTANTE',
      desc: 'Ajustes y acompañamiento cercano en cada etapa de tu proceso.',
      emoji: '📈'
    },
    {
      title: 'RESULTADOS SOSTENIBLES',
      desc: 'Hábitos reales que generan cambios duraderos y medibles.',
      emoji: '🏆'
    }
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
                <span>📍 TARIFAS Y MEMBRESÍAS • EL VIGÍA</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                PLANES PARA <br />
                ENTRENAR <span className="text-[#F43F5E]">EN EL BOX</span> <br />
                Y DONDE ESTÉS
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-10 max-w-xl leading-relaxed font-light">
                Elige la opción que mejor se adapta a tu objetivo, estilo de vida y nivel. Presencial en El Vigía u online, te acompañamos con estructura, técnica y resultados sostenibles.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#planes-box"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  VER PLANES DEL BOX
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </a>
                
                <a
                  href="https://wa.me/584147225979?text=Hola%20MairoverFit,%20quiero%20inscribirme%20y%20consultar%20los%20planes%20del%20box"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  HABLAR POR WHATSAPP
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                </a>
              </div>

              {/* Lower Hero Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🔒
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">SIN PERMANENCIA</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Mensualidades continuas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🏅
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">COACHING CF-L2</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Seguimiento profesional</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    💳
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">PAGOS FÁCILES</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Pago Móvil, Zelle y Divisas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=700&q=80"
                  alt="Planes MairoverFit Box"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PLANES EN EL BOX ================= */}
      <section id="planes-box" className="bg-white py-24 text-dark-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            PRESENCIAL EN EL VIGÍA
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            PLANES <span className="text-[#F43F5E]">EN EL BOX</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left 5 main plans */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-5 gap-4">
              {boxPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-[#F9F9FA] border ${
                    plan.popular ? 'border-[#F43F5E] shadow-xl relative scale-103' : 'border-dark-100 shadow-sm'
                  } rounded-xl p-4 flex flex-col justify-between text-left hover:-translate-y-1 transition-all duration-300`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-[#F43F5E] text-white text-[7px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Más Popular
                    </span>
                  )}
                  
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-sm mb-4 font-bold">
                      {plan.emoji}
                    </div>
                    
                    <h3 className="font-extrabold text-[9px] uppercase tracking-wider text-[#071628] mb-3 min-h-[30px]">
                      {plan.nombre}
                    </h3>
                    <div className="text-[#F43F5E] text-2xl font-black mb-3">
                      {plan.precio} <span className="text-[10px] font-normal text-dark-400">{plan.periodo}</span>
                    </div>
                    <p className="text-[9px] text-dark-500 leading-relaxed min-h-[50px] font-light">
                      {plan.desc}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <a
                      href={`https://wa.me/584147225979?text=${plan.waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center py-2 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-[9px] font-black uppercase tracking-wider rounded-md block transition-colors shadow active:scale-95"
                    >
                      INSCRIBIRME
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Right "Otras Membresías" column */}
            <div className="lg:col-span-4 bg-[#0B2240] text-white rounded-xl p-6 text-left flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[#F43F5E] font-bold text-[10px] uppercase tracking-[0.2em] block mb-4">
                  PASES SUELTOS Y NUTRICIÓN
                </span>
                
                <div className="space-y-4">
                  {otherMembresias.map((plan, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#F43F5E] font-bold text-xs">✓</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white">{plan.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-[#F43F5E]">{plan.price}</span>
                        <a
                          href={`https://wa.me/584147225979?text=${plan.waText}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 bg-white/10 hover:bg-[#F43F5E] text-white text-[8px] font-bold uppercase rounded transition-colors"
                        >
                          Elegir
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="https://wa.me/584147225979?text=Hola%20MairoverFit,%20quisiera%20consultar%20disponibilidad%20de%20pases%20y%20planes"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-3 bg-white/10 hover:bg-[#F43F5E] border border-white/15 text-white text-[10px] font-black uppercase tracking-wider rounded-lg block transition-colors"
                >
                  CONSULTAR DISPONIBILIDAD
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PLANES ONLINE ================= */}
      <section className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 3 columns of online plans cards */}
            <div className="lg:col-span-8">
              <div className="text-left mb-12">
                <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
                  PLANES ONLINE
                </span>
                <h2 className="text-3xl font-black uppercase mb-4 text-white">
                  ENTRENA DESDE CUALQUIER LUGAR
                </h2>
                <p className="text-[#C2C0B6] text-xs max-w-xl leading-relaxed font-light">
                  Programación estructurada, técnica corregida en video y seguimiento directo con las Head Coaches de MairoverFit Box.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {onlinePlans.map((plan, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/40 rounded-xl p-6 text-left flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xl">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-lg font-bold mb-6">
                        {plan.emoji}
                      </div>
                      
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-white mb-6">
                        {plan.title}
                      </h3>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-[10px] text-[#C2C0B6]">
                            <span className="text-[#F43F5E] font-bold">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`https://wa.me/584147225979?text=${plan.waText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center py-2.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-[10px] font-black uppercase tracking-wider rounded-lg block transition-colors active:scale-95 shadow"
                    >
                      SOLICITAR PLAN ONLINE
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
                  alt="Online Training MairoverFit"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRESENCIAL U ONLINE TIMELINE ================= */}
      <section className="bg-white py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            NUESTRO MÉTODO
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#071628] tracking-tight uppercase mb-16 leading-tight">
            PRESENCIAL U ONLINE, EL OBJETIVO ES EL MISMO: <span className="text-[#F43F5E]">TU EVOLUCIÓN</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 bg-[#F9F9FA] rounded-2xl border border-dark-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-2xl mb-4 font-bold">
                  {step.emoji}
                </div>
                
                <h3 className="font-extrabold text-xs text-[#071628] uppercase tracking-wider mb-2">{step.title}</h3>
                <p className="text-dark-500 text-[10px] leading-relaxed max-w-[200px] font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-br from-[#071628] to-[#09203a] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-3">
                ¿NO SABES QUÉ PLAN ELEGIR?
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                TE AYUDAMOS A <br />
                <span className="text-[#F43F5E]">ENCONTRAR EL IDEAL.</span>
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed font-light">
                Escríbenos y conversemos de tu nivel, objetivos y disponibilidad sin ningún compromiso.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/584147225979?text=Hola%20Coach%20Mauroly%20y%20Mairover,%20no%20sé%20cuál%20plan%20elegir%20y%20me%20gustaría%20su%20asesoría"
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
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80"
                  alt="Coaching advice MairoverFit"
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
