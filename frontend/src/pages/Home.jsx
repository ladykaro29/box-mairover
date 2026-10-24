import { Link } from 'react-router-dom';

export default function Home() {
  const whatsappUrl =
    'https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly,%20quiero%20empezar%20a%20entrenar%20en%20MairoverFit%20Box';

  return (
    <div className="relative min-h-screen bg-white text-dark-800 font-sans overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white flex items-center pt-28 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F43F5E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#F43F5E]/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[#F43F5E] text-xs font-semibold tracking-wider uppercase mb-4 animate-[fadeIn_0.5s_ease-out] w-fit">
                <span>📍 CROSSFIT • FUNCIONALES • NUTRICIÓN EN EL VIGÍA</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                TRANSFORMA TU CUERPO, <br />
                <span className="text-[#F43F5E]">ENTRENA EN COMUNIDAD.</span>
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-8 max-w-xl leading-relaxed font-light">
                El Box de acondicionamiento físico integral en El Vigía guiado por Coaches certificados CrossFit Level 1 y Level 2. Programas adaptados a tu nivel, desde tu primer día hasta la arena de competencia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/presencial/planes"
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
                  CONOCE LOS PLANES
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </Link>
              </div>

              {/* Lower Hero Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🏋️‍♂️
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Coaches CF-L1 y L2</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Técnica y seguridad garantizada</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🥗
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Nutrición Inteligente</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Planes de recomposición real</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🔥
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Comunidad Ganadora</h4>
                    <p className="text-[10px] text-[#C2C0B6]">De El Vigía pal mundo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <picture>
                  <source srcSet="/images/Mairober_7098.webp" type="image/webp" />
                  <source srcSet="/images/Mairober_7098.jpg" type="image/jpeg" />
                  <img
                    src="/images/Mairober_7098.jpg"
                    alt="Coaches Mairover y Mauroly - MairoverFit Box"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/Mairober_7098.png';
                    }}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/70 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark-900/80 backdrop-blur-md border border-white/10">
                  <p className="text-xs text-[#F43F5E] font-bold uppercase tracking-wider">MairoverFit Box • El Vigía</p>
                  <p className="text-sm font-semibold text-white">CrossFit Level 1 & Level 2 Trainers</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= OVERLAPPING KPI STATS BAR ================= */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 -mt-10">
        <div className="bg-[#0B2240] rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-[#F43F5E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                💪 +300
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Atletas Activos
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                🏅 CF-L1 & L2
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Certificación Internacional
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                🏆 FitGames
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Nivel Competitivo Nacional
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                👥 +10K
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Comunidad en Redes
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ESTILO DE VIDA SECTION (Light theme) ================= */}
      <section className="bg-[#F9F9FA] py-24 text-dark-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
                MÁS QUE UN ENTRENAMIENTO
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-6 leading-tight">
                UN ESTILO DE VIDA
              </h2>
              
              <p className="text-dark-600 text-sm md:text-base mb-8 leading-relaxed max-w-xl font-light">
                Nuestro enfoque combina ejercicio, nutrición y mentalidad para lograr cambios reales y sostenibles. No se trata de dietas extremas, se trata de crear hábitos que te acerquen a tu mejor versión cada día.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Planes 100% personalizados y escalables</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Seguimiento continuo de coaches certificadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Educación en hábitos, biomecánica y nutrición</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Resultados reales, duraderos y medibles</span>
                </div>
              </div>

              <Link
                to="/sobre-mi"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white font-extrabold text-xs rounded-full transition-all duration-300 tracking-wider shadow-lg shadow-[#F43F5E]/15 uppercase"
              >
                CONOCE A NUESTRAS COACHES
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Right Training Image */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-dark-100">
                <img
                  src="/images/Mairober_7083.jpg"
                  alt="Entrenamiento en el Box MairoverFit"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                
                <div className="absolute inset-0 bg-[#071628]/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#F43F5E] flex items-center justify-center text-white shadow-xl shadow-[#F43F5E]/40">
                    <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[#F43F5E] font-black text-xs uppercase tracking-wider block mb-1">
                    TU MEJOR VERSIÓN
                  </span>
                  <h4 className="text-white font-extrabold text-lg uppercase tracking-tight">
                    EMPIEZA HOY EN EL VIGÍA
                  </h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ¿CÓMO TRANSFORMAMOS TU SALUD? SERVICES (Light theme) ================= */}
      <section className="bg-white py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            NUESTRA METODOLOGÍA
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            ¿CÓMO TRANSFORMAMOS TU SALUD?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: CrossFit & Funcionales */}
            <div className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-dark-100 flex flex-col justify-between text-left">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="/images/Mairober_7067.jpg"
                    alt="CrossFit y Funcionales - Peso Muerto"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-[-20px] left-6 w-10 h-10 rounded-full bg-[#0B2240] flex items-center justify-center text-white text-sm shadow-lg">
                    🏋️‍♂️
                  </div>
                </div>
                <div className="p-8 pt-10">
                  <h3 className="text-lg font-black text-[#071628] uppercase tracking-tight mb-3">
                    CROSSFIT & FUNCIONALES
                  </h3>
                  <p className="text-dark-500 text-xs leading-relaxed">
                    WODs diarios adaptados a tu nivel, halterofilia segura y acondicionamiento metabólico para todas las edades.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link to="/servicios" className="inline-flex items-center gap-1.5 text-xs font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                  VER MÁS
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2: Programa Personalizado + Nutrición */}
            <div className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-dark-100 flex flex-col justify-between text-left">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="/images/Mairober_7044.jpg"
                    alt="Programa Personalizado y Nutrición - Coach Mairover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-[-20px] left-6 w-10 h-10 rounded-full bg-[#F43F5E] flex items-center justify-center text-white text-sm shadow-lg">
                    🥗
                  </div>
                </div>
                <div className="p-8 pt-10">
                  <h3 className="text-lg font-black text-[#071628] uppercase tracking-tight mb-3">
                    PROGRAMA PERSONALIZADO + NUTRICIÓN
                  </h3>
                  <p className="text-dark-500 text-xs leading-relaxed">
                    Atención 1 a 1 y planes alimenticios flexibles enfocados en recomposición corporal y energía diaria.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link to="/servicios" className="inline-flex items-center gap-1.5 text-xs font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                  VER MÁS
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3: CrossFit Kids & Senior */}
            <div className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-dark-100 flex flex-col justify-between text-left">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="/images/004.jpg"
                    alt="CrossFit Kids y Halterofilia"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-[-20px] left-6 w-10 h-10 rounded-full bg-[#0B2240] flex items-center justify-center text-white text-sm shadow-lg">
                    👶
                  </div>
                </div>
                <div className="p-8 pt-10">
                  <h3 className="text-lg font-black text-[#071628] uppercase tracking-tight mb-3">
                    CROSSFIT KIDS & SENIOR
                  </h3>
                  <p className="text-dark-500 text-xs leading-relaxed">
                    Programas especializados por edades: desarrollo motriz y disciplina para niños, y salud articular para adultos mayores.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link to="/servicios" className="inline-flex items-center gap-1.5 text-xs font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                  VER MÁS
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ESTÁS A UN PASO CTA SECTION ================= */}
      <section className="bg-gradient-to-br from-[#071628] to-[#09203a] text-white py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-3">
                ESTÁS A UN PASO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                DE LOGRAR LO QUE <br />
                <span className="text-[#F43F5E]">SIEMPRE</span> HAS QUERIDO
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed font-light">
                Agenda tu asesoría gratuita con nuestras Coaches en El Vigía y recibe una evaluación personalizada sin compromiso.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  AGENDAR ASESORÍA
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  ESCRÍBENOS POR WHATSAPP
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column Features & Image */}
            <div className="lg:col-span-5 relative flex flex-col md:flex-row lg:flex-col gap-8 items-center lg:items-start justify-between">
              
              {/* Features List */}
              <div className="space-y-6 w-full max-w-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] flex-shrink-0 font-bold">
                    📞
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">EVALUACIÓN GRATUITA</h4>
                    <p className="text-xs text-[#C2C0B6] mt-0.5">Analizamos tu punto de partida</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] flex-shrink-0 font-bold">
                    📋
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">PLAN PERSONALIZADO</h4>
                    <p className="text-xs text-[#C2C0B6] mt-0.5">Diseñado para ti y tus metas</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] flex-shrink-0 font-bold">
                    👥
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">ACOMPAÑAMIENTO REAL</h4>
                    <p className="text-xs text-[#C2C0B6] mt-0.5">Estamos contigo en cada paso</p>
                  </div>
                </div>
              </div>

              {/* Fit Coach Image */}
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group flex-shrink-0">
                <img
                  src="/images/Mairober_7023.jpg"
                  alt="Coach Mauroly Mercado - MairoverFit"
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
