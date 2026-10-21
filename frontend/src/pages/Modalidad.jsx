import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Modalidad() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'presencial' | 'online'

  // Pre-filled WhatsApp URLs
  const waBase = 'https://wa.me/584147225979?text=';
  const waPresencialGen = `${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero información sobre el entrenamiento PRESENCIAL en el Box de El Vigía.')}`;
  const waOnlineGen = `${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero información sobre los planes ONLINE de entrenamiento y nutrición.')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-x-hidden">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F43F5E]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Top Minimal Bar: Logo & Return to Site */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <Link to="/" className="group transition-transform hover:scale-105">
            <img 
              src="/images/logos/logo-horizontal.webp" 
              alt="MairoverFit" 
              className="h-11 sm:h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/logos/logo-horizontal.png';
              }}
            />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-[#C2C0B6] hover:text-white transition-all duration-200 active:scale-95 uppercase tracking-wider"
          >
            <svg className="w-4 h-4 text-[#F43F5E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>Ir a la web principal</span>
          </Link>
        </header>

        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F43F5E]/15 border border-[#F43F5E]/30 text-[#F43F5E] text-xs font-bold tracking-widest uppercase mb-4">
            <span>📍 SELECCIÓN DE MODALIDAD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 leading-tight">
            ¿CÓMO QUIERES <span className="text-[#F43F5E]">ENTRENAR?</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C2C0B6] leading-relaxed font-light">
            Selecciona tu modalidad para explorar las opciones disponibles, acceder a los formularios de evaluación o hablar directamente con tus Coaches certificadas CF-L1 &amp; CF-L2.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#F43F5E] text-white shadow-lg shadow-[#F43F5E]/30 scale-105'
                : 'bg-white/5 hover:bg-white/10 text-[#C2C0B6] border border-white/10'
            }`}
          >
            Todas las Opciones
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presencial')}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'presencial'
                ? 'bg-[#F43F5E] text-white shadow-lg shadow-[#F43F5E]/30 scale-105'
                : 'bg-white/5 hover:bg-white/10 text-[#C2C0B6] border border-white/10'
            }`}
          >
            <span>🏋️</span>
            <span>Presencial (Box El Vigía)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('online')}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'online'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105'
                : 'bg-white/5 hover:bg-white/10 text-[#C2C0B6] border border-white/10'
            }`}
          >
            <span>🌐</span>
            <span>Online (A Distancia)</span>
          </button>
        </div>

        {/* ================= SECCIÓN 1: MODALIDAD PRESENCIAL ================= */}
        {(activeTab === 'all' || activeTab === 'presencial') && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#F43F5E]/20 text-[#F43F5E] flex items-center justify-center text-xl font-black">
                🏋️
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F43F5E] block">
                  En el Box • El Vigía, Mérida
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  Modalidad Presencial
                </h2>
              </div>
            </div>

            {/* Grid of Presencial Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Opción 1: Clase Regular */}
              <div className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">🏋️‍♂️</span>
                    <span className="text-2xl font-black text-white">$35<span className="text-xs font-normal text-[#C2C0B6]">/mes</span></span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-2">Clase Regular Box</h3>
                  <p className="text-xs text-[#C2C0B6] leading-relaxed mb-4">
                    Acceso a clases grupales de CrossFit y Funcionales. Ideal para crear disciplina y constancia diaria.
                  </p>
                </div>
                <a
                  href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero inscribirme en el plan CLASE REGULAR ($35/mes) en el Box.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-white/10 hover:bg-[#F43F5E] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Inscribirme al Box</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Opción 2: Max Performance (Popular) */}
              <div className="bg-gradient-to-b from-[#F43F5E]/15 to-white/5 border-2 border-[#F43F5E] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-[#F43F5E]/15 relative">
                <span className="absolute -top-3 right-4 px-3 py-0.5 bg-[#F43F5E] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                  MÁS POPULAR ⭐
                </span>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">⭐</span>
                    <span className="text-2xl font-black text-white">$45<span className="text-xs font-normal text-[#C2C0B6]">/mes</span></span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-2">Max Performance</h3>
                  <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                    Clase regular + 3 días/semana de musculación específica y fuerza guiada para acelerar tu transformación.
                  </p>
                </div>
                <a
                  href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero inscribirme en el PROGRAMA MAX PERFORMANCE ($45/mes) en el Box.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-md shadow-[#F43F5E]/30 active:scale-95"
                >
                  <span>Inscribirme Max Performance</span>
                  <span>→</span>
                </a>
              </div>

              {/* Opción 3: Competitivo */}
              <div className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">🏆</span>
                    <span className="text-2xl font-black text-white">$40<span className="text-xs font-normal text-[#C2C0B6]">/mes</span></span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-2">Programa Competitivo</h3>
                  <p className="text-xs text-[#C2C0B6] leading-relaxed mb-4">
                    Entrenamiento específico de alta exigencia para atletas con aspiraciones a competencias nacionales.
                  </p>
                </div>
                <a
                  href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero información sobre el PROGRAMA COMPETITIVO ($40/mes).')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-white/10 hover:bg-[#F43F5E] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Consultar Programa</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Opción 4: Personalizado 1 a 1 */}
              <div className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">🎯</span>
                    <span className="text-2xl font-black text-white">$50 - $65<span className="text-xs font-normal text-[#C2C0B6]">/mes</span></span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-2">Personalizado 1 a 1</h3>
                  <p className="text-xs text-[#C2C0B6] leading-relaxed mb-4">
                    60 min exclusivos de entrenamiento con coach. Opción completa incluye plan nutricional individual.
                  </p>
                </div>
                <a
                  href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero consultar cupos para ENTRENAMIENTO PERSONALIZADO 1 a 1 en el Box.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-white/10 hover:bg-[#F43F5E] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Reservar Personalizado</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Opción 5: Pases Flexibles */}
              <div className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">🎟️</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">FLEXIBLE</span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-2">Pases por Día o Semana</h3>
                  <p className="text-xs text-[#C2C0B6] leading-relaxed mb-4">
                    Clase Diaria: $5 • Pase Semanal: $15 • Open Box Mensual: $40. Para visitantes y atletas en tránsito.
                  </p>
                </div>
                <a
                  href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero adquirir un PASE FLEXIBLE (Clase Diaria o Semanal) para entrenar en el Box.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-white/10 hover:bg-[#F43F5E] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Adquirir Pase</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

              {/* Opción 6: Ver Horarios del Box */}
              <div className="bg-gradient-to-br from-[#0B2240] to-[#13335A] border border-[#13335A] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">📅</span>
                    <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">TURNOS</span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-2">Horarios y Turnos</h3>
                  <p className="text-xs text-[#C2C0B6] leading-relaxed mb-4">
                    Revisa las franjas horarias de mañana y tarde con reserva disponible para no quedarte sin cupo.
                  </p>
                </div>
                <Link
                  to="/horarios"
                  className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-sky-500/25"
                >
                  <span>Ver Horarios del Box</span>
                  <span>→</span>
                </Link>
              </div>

            </div>
          </section>
        )}

        {/* ================= SECCIÓN 2: MODALIDAD ONLINE ================= */}
        {(activeTab === 'all' || activeTab === 'online') && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-xl font-black">
                🌐
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block">
                  A Distancia • Disponible en cualquier país
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  Modalidad Online
                </h2>
              </div>
            </div>

            {/* Grid of Online Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Opción Online 1: Plan Personalizado Online (Destacado) */}
              <div className="bg-gradient-to-b from-sky-500/20 via-sky-500/5 to-white/5 border-2 border-sky-400 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-sky-500/15 relative">
                <span className="absolute -top-3 right-4 px-3 py-0.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                  MÁS COMPLETO ⭐
                </span>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">⭐</span>
                    <span className="text-2xl font-black text-white">$70<span className="text-xs font-normal text-sky-300">/ 5 sem</span></span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-1">Plan Personalizado Online</h3>
                  <p className="text-[11px] font-bold text-sky-400 mb-2">Entrenamiento + Nutrición Individual</p>
                  <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                    Rutina 100% a tu medida, plan de alimentación individual, corrección técnica en video y seguimiento directo.
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/online/formulario/personalizado"
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 active:scale-95"
                  >
                    <span>Llenar Formulario Oficial</span>
                    <span>→</span>
                  </Link>
                  <a
                    href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero consultar sobre el PLAN PERSONALIZADO ONLINE ($70 / 5 semanas).')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 text-[11px] text-[#C2C0B6] hover:text-white text-center block transition-colors underline"
                  >
                    Consultar dudas por WhatsApp
                  </a>
                </div>
              </div>

              {/* Opción Online 2: Plan Básico Online */}
              <div className="bg-white/5 border border-white/10 hover:border-sky-400/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">🏋️‍♂️</span>
                    <span className="text-2xl font-black text-white">$45<span className="text-xs font-normal text-[#C2C0B6]">/ 5 sem</span></span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-1">Plan Básico Online</h3>
                  <p className="text-[11px] font-bold text-[#C2C0B6] mb-2">Entrenamiento + Guía de Alimentación</p>
                  <p className="text-xs text-[#C2C0B6] leading-relaxed mb-4">
                    Programación adaptada al equipo de tu gimnasio o casa, correcciones continuas y valoración antropométrica.
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/online/formulario/basico"
                    className="w-full py-3.5 px-4 bg-white/10 hover:bg-sky-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Llenar Formulario Oficial</span>
                    <span>→</span>
                  </Link>
                  <a
                    href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero consultar sobre el PLAN BÁSICO ONLINE ($45 / 5 semanas).')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 text-[11px] text-[#C2C0B6] hover:text-white text-center block transition-colors underline"
                  >
                    Consultar dudas por WhatsApp
                  </a>
                </div>
              </div>

              {/* Opción Online 3: Plan Nutricional */}
              <div className="bg-white/5 border border-white/10 hover:border-sky-400/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">🥗</span>
                    <span className="text-2xl font-black text-white">$35<span className="text-xs font-normal text-[#C2C0B6]">/mes</span></span>
                  </div>
                  <h3 className="text-base font-black uppercase text-white mb-1">Plan Nutricional</h3>
                  <p className="text-[11px] font-bold text-emerald-400 mb-2">Nutrición Inteligente y Sostenible</p>
                  <p className="text-xs text-[#C2C0B6] leading-relaxed mb-4">
                    Plan de alimentación individualizado según tus objetivos de recomposición corporal, hábitos y horarios.
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/online/formulario/nutricional"
                    className="w-full py-3.5 px-4 bg-white/10 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Llenar Formulario Oficial</span>
                    <span>→</span>
                  </Link>
                  <a
                    href={`${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero consultar sobre el PLAN NUTRICIONAL ($35/mes).')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 text-[11px] text-[#C2C0B6] hover:text-white text-center block transition-colors underline"
                  >
                    Consultar dudas por WhatsApp
                  </a>
                </div>
              </div>

            </div>

            {/* Direct Link to Detailed Online Page */}
            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">¿Deseas leer el desglose detallado de los planes online?</p>
                  <p className="text-[11px] text-[#C2C0B6]">Conoce el paso a paso, entrega en 8 días hábiles y preguntas frecuentes.</p>
                </div>
              </div>
              <Link
                to="/online"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap transition-all border border-white/15 active:scale-95"
              >
                Ver Todo sobre Online →
              </Link>
            </div>
          </section>
        )}

        {/* ================= HELP & WHATSAPP DIRECT ACTION ================= */}
        <div className="bg-gradient-to-r from-[#0B2240] to-[#13335A] border border-white/10 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden mb-12">
          <div className="max-w-xl mx-auto">
            <span className="text-2xl block mb-2">💬</span>
            <h3 className="text-lg sm:text-xl font-black uppercase text-white mb-2">
              ¿No estás seguro de cuál es la mejor opción para ti?
            </h3>
            <p className="text-xs sm:text-sm text-[#C2C0B6] leading-relaxed mb-6 font-light">
              Escríbenos directamente por WhatsApp. Te ayudaremos a evaluar tu nivel actual, objetivos y disponibilidad para recomendarte la modalidad ideal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={waPresencialGen}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-[#F43F5E]/25 active:scale-95 flex items-center gap-2"
              >
                <span>WhatsApp Presencial</span>
                <span>→</span>
              </a>
              <a
                href={waOnlineGen}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/25 active:scale-95 flex items-center gap-2"
              >
                <span>WhatsApp Online</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Footer */}
        <footer className="pt-6 pb-2 text-center text-xs text-blue-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">MairoverFit</strong>. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Desarrollado por</span>
            <a 
              href="https://www.kickoffdevelopment.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-white hover:text-[#F43F5E] transition-colors underline decoration-[#F43F5E]/50 hover:decoration-[#F43F5E]"
            >
              Kickoff Development
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}
