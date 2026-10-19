export default function Home() {
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
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-[0.25em] mb-4 animate-[fadeIn_0.5s_ease-out]">
                COACHING • NUTRICIÓN • RESULTADOS
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                TRANSFORMA <br />
                <span className="text-[#F43F5E]">TU CUERPO,</span> <br />
                CAMBIA TU VIDA.
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-8 max-w-xl leading-relaxed">
                Entrenamiento personalizado y nutrición inteligente para que alcances tu mejor versión.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  QUIERO EMPEZAR
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                
                <a
                  href="/planes"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  CONOCE MIS PLANES
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </a>
              </div>

              {/* Lower Hero Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    🏋️‍♂️
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Entrenamientos</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Personalizados para ti</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    🥗
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Nutrición</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Planes inteligentes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    📈
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Resultados</h4>
                    <p className="text-[10px] text-[#C2C0B6]">100% comprobados</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column (Premium Crossfit Woman) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80"
                  alt="MairoverFit Coaching"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
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
                Clientes Transformados
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                ⭐ +5
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Años de Experiencia
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                🏆 100%
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Planes Personalizados
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                ❤️ +90%
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Satisfacción Comprobada
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
              
              <p className="text-dark-600 text-sm md:text-base mb-8 leading-relaxed max-w-xl">
                Mi enfoque combina ejercicio, nutrición y mentalidad para lograr cambios reales y sostenibles. No se trata de dietas, se trata de crear hábitos que te acerquen a tu mejor versión cada día.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Planes 100% personalizados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Seguimiento y acompañamiento continuo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Educación en nutrición y hábitos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Resultados reales y duraderos</span>
                </div>
              </div>

              <a
                href="/sobre-mi"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white font-extrabold text-xs rounded-full transition-all duration-300 tracking-wider shadow-lg shadow-[#F43F5E]/15 uppercase"
              >
                CONÓCEME MÁS
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Right Dumbbell Woman with Play Button Overlay */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-dark-100">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
                  alt="Dumbbell Training"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                
                {/* Red Circular Play Button Overlay */}
                <div className="absolute inset-0 bg-[#071628]/20 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-[#F43F5E] hover:bg-[#E11D48] active:scale-90 flex items-center justify-center text-white shadow-xl shadow-[#F43F5E]/40 transition-all duration-300 cursor-pointer">
                    <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[#F43F5E] font-black text-xs uppercase tracking-wider block mb-1">
                    TU MEJOR VERSIÓN
                  </span>
                  <h4 className="text-white font-extrabold text-lg uppercase tracking-tight">
                    EMPIEZA HOY
                  </h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ¿CÓMO PUEDO AYUDARTE? SERVICES (Light theme) ================= */}
      <section className="bg-white py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            MIS SERVICIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            ¿CÓMO PUEDO AYUDARTE?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Entrenamiento */}
            <div className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-dark-100 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
                    alt="Entrenamiento"
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Icon Badge */}
                  <div className="absolute bottom-[-20px] left-6 w-10 h-10 rounded-full bg-[#0B2240] flex items-center justify-center text-white text-sm shadow-lg">
                    🏋️‍♂️
                  </div>
                </div>
                <div className="p-8 pt-10 text-left">
                  <h3 className="text-lg font-black text-[#071628] uppercase tracking-tight mb-3">
                    ENTRENAMIENTO PERSONALIZADO
                  </h3>
                  <p className="text-dark-500 text-xs leading-relaxed">
                    Rutinas adaptadas a tu nivel, objetivo y estilo de vida.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 text-left">
                <a href="/servicios" className="inline-flex items-center gap-1.5 text-xs font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                  VER MÁS
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Card 2: Nutrición */}
            <div className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-dark-100 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80"
                    alt="Nutrición"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-[-20px] left-6 w-10 h-10 rounded-full bg-[#F43F5E] flex items-center justify-center text-white text-sm shadow-lg">
                    🥗
                  </div>
                </div>
                <div className="p-8 pt-10 text-left">
                  <h3 className="text-lg font-black text-[#071628] uppercase tracking-tight mb-3">
                    NUTRICIÓN INTELIGENTE
                  </h3>
                  <p className="text-dark-500 text-xs leading-relaxed">
                    Planes alimenticios flexibles, prácticos y deliciosos.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 text-left">
                <a href="/servicios" className="inline-flex items-center gap-1.5 text-xs font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                  VER MÁS
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Card 3: Seguimiento */}
            <div className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-dark-100 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80"
                    alt="Seguimiento"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-[-20px] left-6 w-10 h-10 rounded-full bg-[#0B2240] flex items-center justify-center text-white text-sm shadow-lg">
                    📈
                  </div>
                </div>
                <div className="p-8 pt-10 text-left">
                  <h3 className="text-lg font-black text-[#071628] uppercase tracking-tight mb-3">
                    SEGUIMIENTO Y RESULTADOS
                  </h3>
                  <p className="text-dark-500 text-xs leading-relaxed">
                    Acompañamiento constante para que nunca te detengas.
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0 text-left">
                <a href="/servicios" className="inline-flex items-center gap-1.5 text-xs font-black text-[#F43F5E] hover:text-[#E11D48] transition-colors">
                  VER MÁS
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ESTÁS A UN PASO CTA SECTION (Dark theme blue/coral) ================= */}
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
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed">
                Agenda tu asesoría gratuita y recibe una evaluación personalizada sin compromiso.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  AGENDAR ASESORÍA
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
                  ESCRÍBEME POR WHATSAPP
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column Features & Fit Woman */}
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
                    <p className="text-xs text-[#C2C0B6] mt-0.5">Diseñado para ti y tus objetivos</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] flex-shrink-0 font-bold">
                    👥
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm uppercase tracking-wider text-white">ACOMPAÑAMIENTO REAL</h4>
                    <p className="text-xs text-[#C2C0B6] mt-0.5">Estoy contigo en cada paso</p>
                  </div>
                </div>
              </div>

              {/* Fit Woman Crossed Arms Image */}
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80"
                  alt="Fit Coach"
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
