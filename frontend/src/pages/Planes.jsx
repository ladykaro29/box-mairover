import { useEffect, useState } from 'react';

export default function Planes() {
  const boxPlans = [
    {
      id: 1,
      nombre: 'CLASE REGULAR',
      precio: '$35',
      desc: 'Acceso a clase regular. Ideal para comenzar y mantener constancia.',
      emoji: '🏋️‍♂️'
    },
    {
      id: 2,
      nombre: 'PROGRAMA MAX PERFORMANCE',
      precio: '$45',
      desc: 'Clase regular + 3 días/semana de musculación específica y fortalecimiento.',
      emoji: '⭐',
      popular: true
    },
    {
      id: 3,
      nombre: 'PROGRAMA COMPETITIVO',
      precio: '$40',
      desc: 'Entrenamiento específico a nivel competitivo.',
      emoji: '🏆'
    },
    {
      id: 4,
      nombre: 'PERSONALIZADO BÁSICO',
      precio: '$50',
      desc: '60 min de entrenamiento personalizado.',
      emoji: '🎯'
    },
    {
      id: 5,
      nombre: 'PERSONALIZADO COMPLETO',
      precio: '$65',
      desc: 'Entrenamiento + plan de alimentación personal.',
      emoji: '👤'
    }
  ];

  const otherMembresias = [
    { name: 'OPEN BOX', price: '$40' },
    { name: 'CLASE DIARIA', price: '$5' },
    { name: 'CLASE SEMANAL', price: '$15' },
    { name: 'PLAN DE ALIMENTACIÓN PERSONALIZADO', price: '$25' }
  ];

  const onlinePlans = [
    {
      title: 'PLAN ONLINE ENTRENAMIENTO',
      emoji: '🏋️‍♂️',
      features: [
        'Evaluación inicial',
        'Rutina personalizada',
        'Ajustes según progreso',
        'Seguimiento continuo'
      ]
    },
    {
      title: 'PLAN ONLINE NUTRICIÓN',
      emoji: '🍎',
      features: [
        'Guía de alimentación',
        'Hábitos sostenibles',
        'Ajustes personalizados',
        'Acompañamiento práctico'
      ]
    },
    {
      title: 'PLAN ONLINE INTEGRAL',
      emoji: '🏋️‍♂️+🍎',
      features: [
        'Entrenamiento + nutrición',
        'Seguimiento completo',
        'Acompañamiento cercano',
        'Plan adaptado a tu meta'
      ]
    }
  ];

  const processSteps = [
    {
      title: 'EVALUACIÓN INICIAL',
      desc: 'Analizo tu punto de partida para diseñar el mejor plan para ti.',
      emoji: '📋'
    },
    {
      title: 'PLAN A TU MEDIDA',
      desc: 'Entrenamiento y nutrición adaptados a tus objetivos, nivel y estilo de vida.',
      emoji: '🎯'
    },
    {
      title: 'SEGUIMIENTO CONSTANTE',
      desc: 'Ajustes y acompañamiento en cada etapa de tu proceso.',
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
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E85D4E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#E85D4E]/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-[0.25em] mb-4 animate-[fadeIn_0.5s_ease-out]">
                PLANES
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                PLANES PARA <br />
                ENTRENAR <span className="text-[#E85D4E]">EN EL BOX</span> <br />
                Y DONDE ESTÉS
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-10 max-w-xl leading-relaxed">
                Elige la opción que mejor se adapta a tu objetivo, estilo de vida y nivel. Presencial u online, te acompaño con estructura, seguimiento y resultados sostenibles.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="/contacto"
                  className="px-8 py-4 bg-[#E85D4E] hover:bg-[#D64A3E] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#E85D4E]/30 flex items-center gap-2"
                >
                  QUIERO INSCRIBIRME
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                
                <a
                  href="https://wa.me/584121234567"
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
                  <div className="w-10 h-10 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-lg">
                    📈
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">PLANES PARA</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Todos los niveles</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-lg">
                    👤
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">SEGUIMIENTO</h4>
                    <p className="text-[10px] text-[#C2C0B6]">100% personalizado</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-lg">
                    💻
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">PRESENCIAL</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Y online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column (Coach Mauroly) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80"
                  alt="Coach Mauroly Mercado"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PLANES EN EL BOX (Light theme) ================= */}
      <section className="bg-white py-24 text-dark-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            PLANES <span className="text-[#E85D4E]">EN EL BOX</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left 5 main plans columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-5 gap-4">
              {boxPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-[#F9F9FA] border ${
                    plan.popular ? 'border-[#E85D4E] shadow-md relative scale-103' : 'border-dark-100 shadow-sm'
                  } rounded-xl p-4 flex flex-col justify-between text-left hover:-translate-y-1 transition-all duration-300`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-[#E85D4E] text-white text-[7px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Más Popular
                    </span>
                  )}
                  
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-sm mb-4">
                      {plan.emoji}
                    </div>
                    
                    <h3 className="font-extrabold text-[9px] uppercase tracking-wider text-[#071628] mb-3 min-h-[30px]">
                      {plan.nombre}
                    </h3>
                    <div className="text-[#E85D4E] text-2xl font-black mb-3">
                      {plan.precio}
                    </div>
                    <p className="text-[9px] text-dark-500 leading-relaxed min-h-[50px]">
                      {plan.desc}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <a
                      href="/contacto"
                      className="w-full text-center py-2 bg-[#E85D4E] hover:bg-[#D64A3E] text-white text-[9px] font-black uppercase tracking-wider rounded-md block transition-colors"
                    >
                      SELECCIONAR
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Right "Otras Membresías" column */}
            <div className="lg:col-span-4 bg-[#0B2240] text-white rounded-xl p-6 text-left flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-[#E85D4E] font-bold text-[10px] uppercase tracking-[0.2em] block mb-4">
                  OTRAS MEMBRESÍAS
                </span>
                
                <div className="space-y-4">
                  {otherMembresias.map((plan, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#E85D4E] font-bold text-xs">✓</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">{plan.name}</span>
                      </div>
                      <span className="text-sm font-black text-[#E85D4E]">{plan.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="/contacto"
                  className="w-full text-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-wider rounded-lg block transition-colors"
                >
                  SOLICITAR PLAN
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PLANES ONLINE (Dark Blue Background) ================= */}
      <section className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E85D4E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 3 columns of online plans cards */}
            <div className="lg:col-span-8">
              <div className="text-left mb-12">
                <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-widest block mb-2">
                  PLANES ONLINE
                </span>
                <h2 className="text-3xl font-black uppercase mb-4">
                  ENTRENA DESDE CUALQUIER LUGAR
                </h2>
                <p className="text-[#C2C0B6] text-xs max-w-xl leading-relaxed">
                  Entrena desde cualquier lugar con estructura, guía y acompañamiento real.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {onlinePlans.map((plan, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 hover:border-[#E85D4E]/30 rounded-xl p-6 text-left flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-lg font-bold mb-6">
                        {plan.emoji}
                      </div>
                      
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-white mb-6">
                        {plan.title}
                      </h3>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-[10px] text-[#C2C0B6]">
                            <span className="text-[#E85D4E] font-bold">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="/contacto"
                      className="w-full text-center py-2.5 bg-[#E85D4E] hover:bg-[#D64A3E] text-white text-[10px] font-black uppercase tracking-wider rounded-lg block transition-colors"
                    >
                      SOLICITAR INFORMACIÓN
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right fit woman image column */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
                  alt="Online Training Woman"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRESENCIAL U ONLINE TIMELINE (Light theme) ================= */}
      <section className="bg-white py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#071628] tracking-tight uppercase mb-16 leading-tight">
            PRESENCIAL U ONLINE, EL OBJETIVO ES EL MISMO: <span className="text-[#E85D4E]">TU EVOLUCIÓN</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 bg-[#F9F9FA] rounded-2xl border border-dark-100 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-2xl mb-4">
                  {step.emoji}
                </div>
                
                <h3 className="font-extrabold text-xs text-[#071628] uppercase tracking-wider mb-2">{step.title}</h3>
                <p className="text-dark-500 text-[10px] leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-br from-[#071628] to-[#09203a] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E85D4E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 text-left">
              <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-widest block mb-3">
                ¿NO SABES QUÉ PLAN ELEGIR?
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                TE AYUDO A <br />
                <span className="text-[#E85D4E]">ENCONTRAR EL IDEAL.</span>
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed">
                Escríbeme y hablemos de tu nivel, objetivos y disponibilidad sin compromiso.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/584121234567"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#E85D4E] hover:bg-[#D64A3E] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#E85D4E]/30 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  HABLAR POR WHATSAPP
                </a>
                
                <a
                  href="/contacto"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  AGENDAR EVALUACIÓN
                </a>
              </div>
            </div>

            {/* Right Column image (Coach advising client) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80"
                  alt="Coaching advice"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PREMIUM FOOTER ================= */}
      <footer className="bg-[#071628] py-12 border-t border-[#0B2240]/40 text-[#C2C0B6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col gap-[3px] justify-center h-8">
                <svg width="24" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4C5 4 6 2 9 2C12 2 13 4 16 4C19 4 20 2 23 2C26 2 27 4 29 4" stroke="#E85D4E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 10C5 10 6 8 9 8C12 8 13 10 16 10C19 10 20 8 23 8C26 8 27 10 29 10" stroke="#E85D4E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 16C5 16 6 14 9 14C12 14 13 16 16 16C19 16 20 14 23 14C26 14 27 16 29 16" stroke="#E85D4E" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-[1.1] justify-center text-left">
                <span className="font-black text-lg tracking-wider text-white">
                  MAIROVER<span className="text-[#E85D4E]">Fit</span>
                </span>
                <span className="text-[7px] tracking-[0.25em] text-[#C2C0B6] uppercase font-bold">
                  COACH • NUTRICIÓN
                </span>
              </div>
            </a>

            {/* Copyright */}
            <div className="text-xs text-center font-medium">
              © {new Date().getFullYear()} MairoverFit. Todos los derechos reservados.
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 text-[#C2C0B6]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E85D4E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#E85D4E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://wa.me/584121234567" target="_blank" rel="noreferrer" className="hover:text-[#E85D4E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
