import { Link } from 'react-router-dom';

export default function Modalidad() {
  const waPresencialUrl =
    'https://wa.me/584147225979?text=Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20entrenamiento%20PRESENCIAL%20en%20el%20Box%20de%20El%20Vigía';
  const waOnlineUrl =
    'https://wa.me/584147225979?text=Hola%20MairoverFit,%20quiero%20información%20sobre%20el%20entrenamiento%20ONLINE%20y%20asesoría%20a%20distancia';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white pt-28 pb-20 overflow-hidden font-sans">
      {/* Decorative ambient glows */}
      <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-[#F43F5E]/15 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#C2C0B6] hover:text-[#F43F5E] transition-colors uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[#F43F5E] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <span>📍 SELECCIONA TU MODALIDAD DE ENTRENAMIENTO</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
            ¿CÓMO QUIERES <br />
            <span className="text-[#F43F5E]">ENTRENAR HOY?</span>
          </h1>

          <p className="text-[#C2C0B6] text-base md:text-lg leading-relaxed font-light">
            En <strong className="text-white font-semibold">MairoverFit</strong> nos adaptamos a tu estilo de vida.
            Elige si prefieres vivir la experiencia en vivo en nuestro Box en El Vigía o entrenar desde cualquier lugar del mundo con nuestra programación online.
          </p>
        </div>

        {/* Two Main Cards: Presencial vs Online */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto mb-16">
          
          {/* ================= OPCIÓN 1: PRESENCIAL ================= */}
          <div className="group relative rounded-3xl bg-white/5 border border-white/10 hover:border-[#F43F5E]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover:-translate-y-1.5 backdrop-blur-md">
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#F43F5E] to-rose-400"></div>

            {/* Image Header with Badge */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                alt="Entrenamiento Presencial MairoverFit Box"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071628] via-[#071628]/60 to-transparent"></div>
              
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-[#F43F5E] text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5">
                  <span>📍</span> EN EL BOX • EL VIGÍA
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-[11px] font-bold text-[#F43F5E] tracking-widest uppercase">
                  EXPERIENCIA 100% EN VIVO
                </p>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                  ENTRENAMIENTO PRESENCIAL
                </h2>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[#C2C0B6] leading-relaxed mb-6 font-light">
                  Entrena en nuestras instalaciones en El Vigía con la energía inigualable de la comunidad, equipamiento completo y la supervisión técnica en tiempo real de coaches certificados CrossFit Level 1 y Level 2.
                </p>

                {/* Feature List */}
                <div className="space-y-3.5 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F43F5E]/20 text-[#F43F5E] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Clases grupales y WODs diarios</h4>
                      <p className="text-[11px] text-[#C2C0B6]">CrossFit, Funcionales, Halterofilia y Musculación guiada.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F43F5E]/20 text-[#F43F5E] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Coaches en vivo corrigiendo técnica</h4>
                      <p className="text-[11px] text-[#C2C0B6]">Prevención de lesiones y máxima eficiencia en cada repetición.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F43F5E]/20 text-[#F43F5E] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Horarios flexibles con reserva</h4>
                      <p className="text-[11px] text-[#C2C0B6]">Turnos en la mañana y tarde gestionados desde la plataforma.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F43F5E]/20 text-[#F43F5E] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Comunidad activa y motivadora</h4>
                      <p className="text-[11px] text-[#C2C0B6]">El mejor ambiente para superarte día tras día.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/planes#planes-box"
                  className="flex-1 py-4 px-6 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center shadow-lg shadow-[#F43F5E]/30 flex items-center justify-center gap-2"
                >
                  <span>VER PLANES DEL BOX</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>

                <Link
                  to="/horarios"
                  className="py-4 px-6 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center border border-white/15 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 text-[#F43F5E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>HORARIOS</span>
                </Link>
              </div>

              {/* Quick WhatsApp Link */}
              <div className="mt-3 text-center">
                <a
                  href={waPresencialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#C2C0B6] hover:text-[#F43F5E] transition-colors underline underline-offset-2"
                >
                  ¿Tienes dudas sobre el Box? Escríbenos por WhatsApp →
                </a>
              </div>
            </div>
          </div>

          {/* ================= OPCIÓN 2: ONLINE ================= */}
          <div className="group relative rounded-3xl bg-white/5 border border-white/10 hover:border-[#F43F5E]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover:-translate-y-1.5 backdrop-blur-md">
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-[#F43F5E]"></div>

            {/* Image Header with Badge */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
                alt="Entrenamiento Online MairoverFit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071628] via-[#071628]/60 to-transparent"></div>
              
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5">
                  <span>🌐</span> 100% ONLINE • DONDE ESTÉS
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-[11px] font-bold text-sky-400 tracking-widest uppercase">
                  A TU RITMO Y DESDE CUALQUIER LUGAR
                </p>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
                  ASESORÍA & PLANES ONLINE
                </h2>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[#C2C0B6] leading-relaxed mb-6 font-light">
                  Lleva el método, la disciplina y la nutrición inteligente de MairoverFit a tu gimnasio habitual o a casa, sin importar en qué ciudad o país te encuentres, con acompañamiento individualizado.
                </p>

                {/* Feature List */}
                <div className="space-y-3.5 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Programación 100% a medida</h4>
                      <p className="text-[11px] text-[#C2C0B6]">Adaptada a tu nivel, objetivo y al equipo disponible.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Nutrición inteligente personalizada</h4>
                      <p className="text-[11px] text-[#C2C0B6]">Planes de alimentación adaptados a tu contexto real.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Corrección técnica en video</h4>
                      <p className="text-[11px] text-[#C2C0B6]">Envías tus levantamientos y recibes feedback directo.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Seguimiento constante por WhatsApp</h4>
                      <p className="text-[11px] text-[#C2C0B6]">Canal abierto con tu Head Coach para resolver dudas.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/online"
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                >
                  <span>EXPLORAR PLANES ONLINE</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>

                <a
                  href={waOnlineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  <span>WHATSAPP</span>
                </a>
              </div>

              {/* Quick WhatsApp Link */}
              <div className="mt-3 text-center">
                <a
                  href={waOnlineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#C2C0B6] hover:text-sky-400 transition-colors underline underline-offset-2"
                >
                  Inicia tu asesoría online personalizada ahora →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Help Banner */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#0B2240] to-[#0d2d52] border border-white/10 p-8 sm:p-10 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
              ¿AÚN NO ESTÁS SEGURO DE CUÁL ELEGIR?
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-3">
              Te orientamos de forma gratuita
            </h3>
            <p className="text-xs sm:text-sm text-[#C2C0B6] max-w-xl mx-auto mb-6 leading-relaxed">
              Cuéntanos tu objetivo (pérdida de grasa, fuerza, acondicionamiento o salud) y te diremos cuál modalidad y plan se adapta mejor a ti.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contacto"
                className="px-6 py-3 bg-[#F43F5E] hover:bg-[#E11D48] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95"
              >
                SOLICITAR ORIENTACIÓN
              </Link>
              <Link
                to="/sobre-mi"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all border border-white/15"
              >
                CONOCER A LOS COACHES
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
