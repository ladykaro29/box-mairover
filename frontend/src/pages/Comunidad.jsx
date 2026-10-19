import { Link } from 'react-router-dom';

export default function Comunidad() {
  const whatsappUrl =
    'https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly,%20quiero%20unirme%20a%20la%20comunidad%20MairoverFit%20Box';

  const competitiveHighlights = [
    {
      badge: '🔥 Valencia, Venezuela',
      title: 'Presentes en FitGames 2026 (Valencia)',
      desc: 'Nuestra delegación oficial de atletas clasificó y representó con orgullo a El Vigía en el stage de la competencia de CrossFit más grande de Venezuela.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      icon: '🔥'
    },
    {
      badge: '🥈 Mérida, Venezuela',
      title: 'Podio en BeFitFlow (Mérida)',
      desc: 'El esfuerzo bien programado da frutos en la pista. Celebramos la participación de nuestras atletas y el 2do Lugar en la categoría Funcional.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
      icon: '🥈'
    },
    {
      badge: '🏆 Box El Vigía',
      title: 'Eventos Internos: Mundialito & Kids',
      desc: 'Vivimos el deporte en familia con eventos temáticos como el Mundialito en el Box y nuestras Competencias Internas de CrossFit Kids.',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80',
      icon: '🏆'
    }
  ];

  const testimonials = [
    {
      name: 'Pablo Rodríguez',
      role: 'Programa Personalizado — Recomposición Corporal',
      rating: 5,
      quote: 'Logré una recomposición corporal notable integrando planes de alimentación saludable y entrenamiento enfocado. En MairoverFit gané vitalidad, energía diaria y una mentalidad ganadora.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Carlos Galvis',
      role: 'Comunidad del Box — Ambiente y Despeje',
      rating: 5,
      quote: 'Además de cumplir mis metas físicas, entrenar aquí es la hora de despeje del día. Un ambiente amigable, bromas que activan la mente y excelentes coaches que te apoyan siempre.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Atletas FitGames 2026',
      role: 'Delegación Competitiva — Superación y Disciplina',
      rating: 5,
      quote: 'Superamos lesiones, dudas y meses de preparación exigente gracias a la guía de nuestras coaches Mairover y Mauroly hasta cumplir el sueño de pisar la arena nacional en Valencia.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const boxLife = [
    {
      title: 'CROSSFIT KIDS',
      desc: 'Formando hábitos y disciplina desde pequeños.',
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
      desc: 'Pequeños hábitos, grandes transformaciones.',
      emoji: '🏆',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const valueItems = [
    {
      title: 'Disciplina',
      desc: 'Enseñamos constancia para resultados reales y sostenibles.',
      emoji: '🎯'
    },
    {
      title: 'Compañerismo',
      desc: 'Te apoyamos dentro y fuera del box en cada WOD.',
      emoji: '🤝'
    },
    {
      title: 'Respeto',
      desc: 'Ambiente seguro, guiado y positivo para cualquier nivel.',
      emoji: '🛡️'
    },
    {
      title: 'Constancia',
      desc: 'Pequeños pasos diarios generan atletas fuertes de por vida.',
      emoji: '📈'
    },
    {
      title: 'Acompañamiento',
      desc: 'Coaches CF-L1 y L2 corrigiendo tu técnica en cada sesión.',
      emoji: '👤'
    }
  ];

  const ageGroups = [
    {
      title: 'NIÑOS & KIDS',
      range: '7 a 14 años',
      desc: 'Iniciación motriz, disciplina, confianza y trabajo en equipo en un entorno seguro y divertido.',
      emoji: '👶',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'ADULTOS',
      range: '15 a 45 años',
      desc: 'CrossFit, Funcionales y preparación híbrida. Fuerza, resistencia cardiovascular y estética funcional.',
      emoji: '🏋️‍♂️',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'ADULTOS ACTIVOS & SENIOR',
      range: '45+ años',
      desc: 'Nunca es tarde para empezar. Movilidad, fortalecimiento óseo, salud articular y calidad de vida.',
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[#F43F5E] text-xs font-semibold tracking-wider uppercase mb-4 animate-[fadeIn_0.5s_ease-out] w-fit">
                <span>📍 COMUNIDAD • MAIROVERFIT BOX EL VIGÍA</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                ENTRENA EN UNA <br />
                <span className="text-[#F43F5E]">COMUNIDAD</span> <br />
                QUE TE IMPULSA.
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-10 max-w-xl leading-relaxed font-light">
                Más que un box de CrossFit, somos una familia en El Vigía. Acompañamiento cercano, técnica estricta, disciplina y la energía colectiva para conquistar tu mejor versión.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  ÚNETE A LA COMUNIDAD
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
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">AMBIENTE SEGURO</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Coaching personalizado</p>
                  </div>
                </div>

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
                    🔥
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">NIVEL NACIONAL</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Atletas FitGames</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80"
                  alt="Comunidad MairoverFit"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark-900/80 backdrop-blur-md border border-white/10 text-left">
                  <p className="text-xs text-[#F43F5E] font-bold uppercase tracking-wider">MairoverFit Box</p>
                  <p className="text-sm font-semibold text-white">De El Vigía pal mundo 🇻🇪</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= NUEVA SECCIÓN: ORGULLO COMPETITIVO ================= */}
      <section className="bg-dark-900 text-white py-20 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primary-500 font-semibold tracking-wider uppercase text-xs">
              LOGROS Y COMPETENCIAS
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              DE EL VIGÍA PAL MUNDO 🇻🇪: <span className="text-primary-500">ORGULLO COMPETITIVO</span>
            </h2>
            <p className="text-gray-300 text-sm mt-3 font-light">
              Llevamos la disciplina, la técnica y el corazón de nuestro box a las arenas competitivas más exigentes de Venezuela.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {competitiveHighlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden hover:border-primary-500 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm border border-white/10 text-[11px] font-bold text-white flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.badge}</span>
                    </div>
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ASÍ SE VIVE BOX (Light theme) ================= */}
      <section className="bg-white py-24 text-dark-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            NUESTRO DÍA A DÍA
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            ASÍ SE VIVE <span className="text-[#F43F5E]">MAIROVERFIT BOX</span>
          </h2>

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

      {/* ================= TESTIMONIOS REALES / RESULTADOS QUE INSPIRAN ================= */}
      <section className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-500 font-bold text-xs uppercase tracking-widest block mb-2">
              CASOS REALES
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-white">
              RESULTADOS <span className="text-[#F43F5E]">QUE INSPIRAN</span>
            </h2>
            <p className="text-[#C2C0B6] text-sm mt-3 font-light">
              Historias reales de disciplina, recomposición corporal y comunidad en El Vigía.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-primary-500/50 rounded-2xl p-6 flex flex-col justify-between text-left transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-500/40 flex-shrink-0">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-white">{t.name}</h4>
                      <div className="text-yellow-400 text-xs mt-0.5">★★★★★</div>
                      <span className="text-[10px] font-semibold text-primary-500 block mt-1">
                        {t.role}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-[#C2C0B6] leading-relaxed italic mb-4 font-light">
                    "{t.quote}"
                  </p>
                </div>
                <div className="text-[10px] text-primary-500 uppercase tracking-wider font-extrabold border-t border-white/10 pt-3 flex items-center justify-between">
                  <span>TESTIMONIO VERIFICADO</span>
                  <span>MairoverFit Box</span>
                </div>
              </div>
            ))}
          </div>

          {/* Value Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 text-left">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] text-lg font-bold flex-shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-white">MÁS ENERGÍA</h4>
                <p className="text-[11px] text-[#C2C0B6] mt-0.5">Rendimiento en tu día a día.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] text-lg font-bold flex-shrink-0">
                🥗
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-white">HÁBITOS SOSTENIBLES</h4>
                <p className="text-[11px] text-[#C2C0B6] mt-0.5">Entrenas, comes y vives mejor.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] text-lg font-bold flex-shrink-0">
                🧠
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-white">MENTE GANADORA</h4>
                <p className="text-[11px] text-[#C2C0B6] mt-0.5">Disciplina que se refleja en todo.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= ¿QUÉ HACE DIFERENTE A LA COMUNIDAD? ================= */}
      <section className="bg-white py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-2">
            NUESTRO ADN
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

      {/* ================= UNA COMUNIDAD PARA TODAS LAS ETAPAS ================= */}
      <section className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <h2 className="text-3xl font-black tracking-tight uppercase mb-16 text-center">
            UNA COMUNIDAD PARA <span className="text-[#F43F5E]">TODAS LAS ETAPAS</span>
          </h2>

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
                  <p className="text-[11px] text-[#C2C0B6] leading-relaxed font-light">
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
            
            <div className="lg:col-span-7 text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-3">
                TU LUGAR PARA ENTRENAR Y CRECER
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                NO VIENES SOLO A ENTRENAR, <br />
                <span className="text-[#F43F5E]">VIENES A FORMAR PARTE</span> DE ALGO MÁS GRANDE.
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed font-light">
                Únete a la familia MairoverFit Box en El Vigía. Descubre la fuerza de entrenar rodeado de coaches que te cuidan y atletas que celebran cada logro contigo.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contacto"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  AGENDAR VISITA AL BOX
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
                  ESCRÍBENOS
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
                  alt="Equipo MairoverFit"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
