import { Link } from 'react-router-dom';

export default function EnrutadorModalidad() {
  const waBase = 'https://wa.me/584147225979?text=';
  const waPresencial = `${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero información sobre el entrenamiento PRESENCIAL en el Box de El Vigía.')}`;
  const waOnline = `${waBase}${encodeURIComponent('Hola Coaches Mairover y Mauroly, quiero información sobre la asesoría y planes ONLINE.')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0c2444] text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 font-sans relative overflow-x-hidden selection:bg-[#F43F5E] selection:text-white">
      
      {/* Luces y brillos ambientales de fondo */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F43F5E]/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Contenedor central */}
      <div className="max-w-5xl w-full mx-auto relative z-10 flex-1 flex flex-col justify-center py-6 sm:py-10">

        {/* Cabecera limpia con Logo oficial */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-block transition-transform duration-300 hover:scale-105 mb-6">
            <img 
              src="/images/logos/logo-horizontal.webp" 
              alt="MairoverFit" 
              className="h-12 sm:h-14 md:h-16 w-auto mx-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/logos/logo-horizontal.png';
              }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-extrabold uppercase tracking-widest text-[#EF7F7D] mb-4 backdrop-blur-md">
            <span>📍 SELECCIONA TU MODALIDAD DE ENTRENAMIENTO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4 leading-none">
            ¿CÓMO QUIERES <span className="text-[#EF7F7D]">ENTRENAR?</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#C2C0B6] max-w-2xl mx-auto leading-relaxed font-light">
            En <strong className="text-white font-semibold">MairoverFit</strong> nos adaptamos a ti. Elige si prefieres vivir la experiencia en vivo en nuestro Box en El Vigía o entrenar desde cualquier lugar del mundo con nuestra metodología online.
          </p>
        </div>

        {/* Las 2 Modalidades Principales (Enrutadores Independientes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto w-full mb-10 sm:mb-14">

          {/* ================= MODALIDAD 1: PRESENCIAL ================= */}
          <div className="group relative rounded-3xl bg-[#0B2240]/60 hover:bg-[#0B2240]/90 border border-white/15 hover:border-[#EF7F7D]/70 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:shadow-[#EF7F7D]/20 hover:-translate-y-1.5 backdrop-blur-xl">
            {/* Barra superior de acento */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#EF7F7D] to-rose-400 rounded-full"></div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="px-3.5 py-1 rounded-full bg-[#EF7F7D]/20 border border-[#EF7F7D]/40 text-[#EF7F7D] text-[11px] font-black uppercase tracking-wider">
                  📍 EN EL BOX • EL VIGÍA
                </span>
                <span className="text-3xl">🏋️‍♂️</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
                ENTRENAMIENTO PRESENCIAL
              </h2>

              <p className="text-xs sm:text-sm text-[#C2C0B6] leading-relaxed mb-6 font-light">
                Entrena en nuestras instalaciones con equipamiento profesional, la energía de la comunidad y supervisión técnica en vivo de Head Coaches certificadas CrossFit Level 1 &amp; Level 2.
              </p>

              {/* Puntos destacados */}
              <ul className="space-y-2.5 text-xs text-[#C2C0B6] mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#EF7F7D]/20 text-[#EF7F7D] flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>WODs diarios grupales y técnica guiada</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#EF7F7D]/20 text-[#EF7F7D] flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Turnos flexibles de mañana y tarde con reserva</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#EF7F7D]/20 text-[#EF7F7D] flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Planes desde $35/mes, Max Performance y 1 a 1</span>
                </li>
              </ul>
            </div>

            {/* Botón de Entrada a la Modalidad Presencial */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <Link
                to="/presencial"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#EF7F7D] to-[#e06765] hover:from-[#f08886] hover:to-[#EF7F7D] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-lg shadow-[#EF7F7D]/30 active:scale-95 cursor-pointer"
              >
                <span>ENTRAR AL BOX PRESENCIAL</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <div className="flex items-center justify-between text-[11px] text-[#C2C0B6] px-1">
                <Link to="/presencial/horarios" className="hover:text-white transition-colors underline decoration-white/30">
                  Ver Horarios del Box
                </Link>
                <a href={waPresencial} target="_blank" rel="noreferrer" className="text-[#EF7F7D] hover:underline">
                  WhatsApp Presencial →
                </a>
              </div>
            </div>
          </div>

          {/* ================= MODALIDAD 2: ONLINE ================= */}
          <div className="group relative rounded-3xl bg-[#0B2240]/60 hover:bg-[#0B2240]/90 border border-white/15 hover:border-sky-400/70 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:shadow-sky-500/20 hover:-translate-y-1.5 backdrop-blur-xl">
            {/* Barra superior de acento */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"></div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 text-[11px] font-black uppercase tracking-wider">
                  🌐 100% ONLINE • INTERNACIONAL
                </span>
                <span className="text-3xl">📱</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
                ASESORÍA &amp; PLANES ONLINE
              </h2>

              <p className="text-xs sm:text-sm text-[#C2C0B6] leading-relaxed mb-6 font-light">
                Entrena en tu gimnasio habitual o en casa desde cualquier país, con programación individual, planes de alimentación a tu medida y correcciones en video.
              </p>

              {/* Puntos destacados */}
              <ul className="space-y-2.5 text-xs text-[#C2C0B6] mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Plan personalizado por 5 semanas o mensual</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Formulario oficial de evaluación y antropometría</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Feedback continuo y seguimiento por WhatsApp</span>
                </li>
              </ul>
            </div>

            {/* Botón de Entrada a la Modalidad Online */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <Link
                to="/online"
                className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all duration-200 text-center flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 active:scale-95 cursor-pointer"
              >
                <span>ENTRAR A MAIROVERFIT ONLINE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <div className="flex items-center justify-between text-[11px] text-[#C2C0B6] px-1">
                <Link to="/online/formulario/personalizado" className="hover:text-white transition-colors underline decoration-white/30">
                  Llenar Evaluación Online
                </Link>
                <a href={waOnline} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  WhatsApp Online →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Acceso rápido a clientes / Mi Cuenta */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#C2C0B6] hover:text-white transition-all duration-200"
          >
            <span>👤 ¿Ya eres atleta de MairoverFit? Iniciar Sesión / Mi Cuenta</span>
            <span>→</span>
          </Link>
        </div>

      </div>

      {/* Pie de página ultra limpio y minimalista */}
      <footer className="w-full max-w-5xl mx-auto pt-6 border-t border-white/10 text-center text-xs text-blue-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div>
          © {new Date().getFullYear()} <strong className="text-white">MairoverFit Box</strong>. Todos los derechos reservados.
        </div>
        <div className="flex items-center gap-1.5">
          <span>Desarrollado por</span>
          <a 
            href="https://www.kickoffdevelopment.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold text-white hover:text-[#EF7F7D] transition-colors underline decoration-[#EF7F7D]/50 hover:decoration-[#EF7F7D]"
          >
            Kickoff Development
          </a>
        </div>
      </footer>

    </div>
  );
}
