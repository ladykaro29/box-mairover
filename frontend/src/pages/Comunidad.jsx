import { useEffect } from 'react';

export default function Comunidad() {
  const boxLife = [
    {
      title: 'CROSSFIT KIDS',
      desc: 'Formando hábitos desde pequeños.',
      emoji: '🧸',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'COMUNIDAD REAL',
      desc: 'Amistades que se convierten en familia.',
      emoji: '👥',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'ENTRENAMIENTO EN EQUIPO',
      desc: 'Nos apoyamos, nos retamos, crecemos juntos.',
      emoji: '🏋️‍♂️',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'SUPERACIÓN DIARIA',
      desc: 'La edad no es límite, la actitud sí importa.',
      emoji: '⭐',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'DISCIPLINA Y CONSTANCIA',
      desc: 'Pequeños hábitos, grandes resultados.',
      emoji: '🏆',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const valueItems = [
    {
      title: 'Disciplina',
      desc: 'Enseñamos constancia para resultados reales.',
      emoji: '🎯'
    },
    {
      title: 'Compañerismo',
      desc: 'Te apoyamos dentro y fuera del box.',
      emoji: '🤝'
    },
    {
      title: 'Respeto',
      desc: 'Ambiente seguro, inclusivo y positivo.',
      emoji: '🛡️'
    },
    {
      title: 'Constancia',
      desc: 'Pequeños pasos, grandes transformaciones.',
      emoji: '📈'
    },
    {
      title: 'Acompañamiento',
      desc: 'Coaches que te guían en cada etapa.',
      emoji: '👤'
    }
  ];

  const ageGroups = [
    {
      title: 'NIÑOS',
      range: '7 a 14 años',
      desc: 'Formamos hábitos saludables, disciplina y confianza desde pequeños.',
      emoji: '👶',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'ADULTOS',
      range: '15 a 45 años',
      desc: 'Entrenamientos adaptados a tu nivel y objetivos. Mejora tu salud y tu rendimiento.',
      emoji: '🏋️‍♂️',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'ADULTOS ACTIVOS',
      range: '45+ años',
      desc: 'Nunca es tarde para empezar. Fuerza, movilidad y calidad de vida.',
      emoji: '👴',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80'
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
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-[0.25em] mb-4 animate-[fadeIn_0.5s_ease-out]">
                COMUNIDAD
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                ENTRENA EN UNA <br />
                <span className="text-[#F43F5E]">COMUNIDAD</span> <br />
                QUE TE IMPULSA
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-10 max-w-xl leading-relaxed">
                Más que un gimnasio, somos un equipo. Acompañamiento, motivación, disciplina y pertenencia para lograr tu mejor versión.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  ÚNETE A LA COMUNIDAD
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
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🛡️
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">AMBIENTE REAL</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Personas e historias reales</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    👥
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">CLASES PARA TODOS</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Todos los niveles y edades</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-lg">
                    🤝
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">MOTIVACIÓN</h4>
                    <p className="text-[10px] text-[#C2C0B6]">En equipo somos más fuertes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column (Community grid collage) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80"
                  alt="MairoverFit Community"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ASÍ SE VIVE BOX (Light theme) ================= */}
      <section className="bg-white py-24 text-dark-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            ASÍ SE VIVE <span className="text-[#F43F5E]">MAIROVERFIT BOX</span>
          </h2>

          {/* 5 horizontal columns for the community life cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {boxLife.map((item, idx) => (
              <div key={idx} className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 border border-dark-100 flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/12] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Floating Badge */}
                    <div className="absolute bottom-[-16px] left-4 w-8 h-8 rounded-full bg-[#0B2240] flex items-center justify-center text-white text-[11px] shadow-md font-bold">
                      {item.emoji}
                    </div>
                  </div>
                  <div className="p-5 pt-7 text-left">
                    <h3 className="text-xs font-black text-[#071628] uppercase tracking-tight mb-2 min-h-[30px]">
                      {item.title}
                    </h3>
                    <p className="text-dark-500 text-[10px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS / RESULTADOS QUE INSPIRAN (Dark Blue) ================= */}
      <section className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-16 text-center">
            RESULTADOS <span className="text-[#F43F5E]">QUE INSPIRAN</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column (2 Testimonials) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Testimonial 1: Daniela R */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between text-left">
                <div>
                  <div className="flex gap-4 mb-4">
                    {/* Double image represent transformation */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=150&q=80"
                        alt="Daniela R"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">CAMBIO FÍSICO</h4>
                      <div className="text-yellow-400 text-[10px] mt-1">★★★★★</div>
                      <span className="text-[10px] font-bold text-[#F43F5E] mt-1 block">Daniela R.</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-[#C2C0B6] leading-relaxed italic mb-4">
                    "Perdí 12 kilos y recuperé mi energía. No es solo el cambio físico, es la disciplina que cambió mi vida."
                  </p>
                </div>
                <div className="text-[9px] text-[#F43F5E] uppercase tracking-wider font-extrabold border-t border-white/10 pt-3">
                  ANTES & DESPUÉS
                </div>
              </div>

              {/* Testimonial 2: Andrea L */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between text-left">
                <div>
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=150&q=80"
                        alt="Andrea L"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">MÁS CONFIANZA</h4>
                      <div className="text-yellow-400 text-[10px] mt-1">★★★★★</div>
                      <span className="text-[10px] font-bold text-[#F43F5E] mt-1 block">Andrea L.</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-[#C2C0B6] leading-relaxed italic mb-4">
                    "Me siento más fuerte, segura y capaz. Aquí encontré el lugar donde me aceptan y me impulsan."
                  </p>
                </div>
                <div className="text-[9px] text-[#F43F5E] uppercase tracking-wider font-extrabold border-t border-white/10 pt-3">
                  RESULTADO REAL
                </div>
              </div>

            </div>

            {/* Right Column (List checklist) */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-xl p-6 text-left flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] flex-shrink-0 font-bold">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-white">MÁS ENERGÍA</h4>
                    <p className="text-[10px] text-[#C2C0B6] mt-0.5">Rindo mejor en mi día a día.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] flex-shrink-0 font-bold">
                    🥗
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-white">HÁBITOS SOSTENIBLES</h4>
                    <p className="text-[10px] text-[#C2C0B6] mt-0.5">Entreno, como y vivo mejor.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] flex-shrink-0 font-bold">
                    🧠
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-white">MENTE FUERTE</h4>
                    <p className="text-[10px] text-[#C2C0B6] mt-0.5">Disciplina que se refleja en todo.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= ¿QUÉ HACE DIFERENTE A LA COMUNIDAD? ================= */}
      <section className="bg-white py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            ¿QUÉ HACE DIFERENTE A NUESTRA COMUNIDAD?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            LO QUE NOS DEFINE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {valueItems.map((val, idx) => (
              <div key={idx} className="bg-[#F9F9FA] p-8 rounded-2xl border border-dark-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] text-xl mb-4">
                  {val.emoji}
                </div>
                <h3 className="font-extrabold text-xs text-dark-900 uppercase tracking-wider mb-2">{val.title}</h3>
                <p className="text-dark-500 text-[10px] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= UNA COMUNIDAD PARA TODAS LAS ETAPAS (Dark Blue) ================= */}
      <section className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <h2 className="text-3xl font-black tracking-tight uppercase mb-16 text-center">
            UNA COMUNIDAD PARA <span className="text-[#F43F5E]">TODAS LAS ETAPAS</span>
          </h2>

          {/* Three columns grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {ageGroups.map((group, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/30 rounded-xl overflow-hidden text-left hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={group.image}
                    alt={group.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-white mb-2">{group.title}</h3>
                  <span className="text-[10px] font-bold text-[#F43F5E] uppercase tracking-widest block mb-4">
                    {group.range}
                  </span>
                  <p className="text-[11px] text-[#C2C0B6] leading-relaxed">
                    {group.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Staggered bottom stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 pt-10 border-t border-white/10">
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-[#F43F5E] text-2xl font-black mb-1">
                👥 +300
              </span>
              <span className="text-[9px] font-bold text-[#C2C0B6] uppercase tracking-widest">
                ALUMNOS ACTIVOS
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-2xl font-black mb-1">
                🔄 +90%
              </span>
              <span className="text-[9px] font-bold text-[#C2C0B6] uppercase tracking-widest">
                ADHERENCIA AL PROCESO
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-2xl font-black mb-1">
                👥 TODAS EDADES
              </span>
              <span className="text-[9px] font-bold text-[#C2C0B6] uppercase tracking-widest">
                ENTRENANDO JUNTOS
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#F43F5E] text-2xl font-black mb-1">
                🏆 MOTIVADOR
              </span>
              <span className="text-[9px] font-bold text-[#C2C0B6] uppercase tracking-widest">
                AMBIENTE INSPIRADOR
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-br from-[#071628] to-[#09203a] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-3">
                TU LUGAR PARA ENTRENAR Y CRECER
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                TU LUGAR PARA <br />
                <span className="text-[#F43F5E]">ENTRENAR Y CRECER.</span>
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed">
                No vienes solo a entrenar, vienes a formar parte de algo más grande. Únete a la comunidad MairoverFit y transforma tu vida.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  AGENDAR VISITA
                </a>
                
                <a
                  href="https://wa.me/584121234567"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  ESCRÍBENOS
                </a>
              </div>
            </div>

            {/* Right Column image (Hands huddle) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
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
                  <path d="M2 4C5 4 6 2 9 2C12 2 13 4 16 4C19 4 20 2 23 2C26 2 27 4 29 4" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 10C5 10 6 8 9 8C12 8 13 10 16 10C19 10 20 8 23 8C26 8 27 10 29 10" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 16C5 16 6 14 9 14C12 14 13 16 16 16C19 16 20 14 23 14C26 14 27 16 29 16" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-[1.1] justify-center text-left">
                <span className="font-black text-lg tracking-wider text-white">
                  MAIROVER<span className="text-[#F43F5E]">Fit</span>
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
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://wa.me/584121234567" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors">
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
