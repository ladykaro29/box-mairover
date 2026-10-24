import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function OnlineNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'planes' | 'evaluaciones' | 'modalidad' | null
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const navRef = useRef(null);

  const sesion = isAuthenticated
    ? { label: isAdmin ? 'PANEL' : 'MI CUENTA', href: isAdmin ? '/admin' : '/mi-cuenta' }
    : { label: 'ACCEDER', href: '/login' };

  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleScrollTo = (id) => {
    setActiveDropdown(null);
    setIsOpen(false);
    if (location.pathname === '/online') {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#071628]/95 border-b border-sky-900/40 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo MairoverFit */}
          <Link to="/online" className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]">
            <img 
              src="/images/logos/logo-horizontal.webp" 
              alt="MairoverFit Online" 
              className="h-10 sm:h-11 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/logos/logo-horizontal.png';
              }}
            />
          </Link>

          {/* Menú de Escritorio Agrupado por Categorías Desplegables */}
          <div className="hidden lg:flex items-center gap-7">

            {/* 1. Inicio Online */}
            <Link
              to="/online"
              className={`text-xs font-extrabold uppercase tracking-wider transition-colors duration-200 py-2 ${
                location.pathname === '/online' ? 'text-sky-400' : 'text-[#C2C0B6] hover:text-sky-400'
              }`}
            >
              INICIO ONLINE
            </Link>

            {/* 2. Categoría: PLANES ONLINE (Desplegable) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('planes')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('planes')}
                className={`text-xs font-extrabold uppercase tracking-wider py-2 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  activeDropdown === 'planes' ? 'text-sky-400' : 'text-[#C2C0B6] hover:text-sky-400'
                }`}
              >
                <span>PLANES ONLINE</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'planes' ? 'rotate-180 text-sky-400' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel Desplegable: PLANES */}
              {activeDropdown === 'planes' && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-[fadeIn_0.2s_ease-out]">
                  <div className="bg-[#0B2240] border border-sky-900/50 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl">
                    <Link
                      to="/online#planes-online"
                      onClick={() => handleScrollTo('planes-online')}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">⭐</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Plan Personalizado ($70)</p>
                        <p className="text-[10px] text-[#C2C0B6]">Entrenamiento + Plan Nutricional por 5 semanas</p>
                      </div>
                    </Link>

                    <Link
                      to="/online#planes-online"
                      onClick={() => handleScrollTo('planes-online')}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">🏋️‍♂️</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Plan Básico ($45)</p>
                        <p className="text-[10px] text-[#C2C0B6]">Rutina a medida + Guía de Alimentación</p>
                      </div>
                    </Link>

                    <Link
                      to="/online#planes-online"
                      onClick={() => handleScrollTo('planes-online')}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">🥗</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Plan Nutricional ($35)</p>
                        <p className="text-[10px] text-[#C2C0B6]">Plan de alimentación personalizado mensual</p>
                      </div>
                    </Link>

                    <Link
                      to="/online#como-funciona"
                      onClick={() => handleScrollTo('como-funciona')}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group border-t border-white/10 mt-1 pt-2"
                    >
                      <span className="text-xl">⏱️</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Cómo Funciona</p>
                        <p className="text-[10px] text-sky-200/70">Paso a paso y entrega oficial en 8 días hábiles</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Categoría: EVALUACIONES (Desplegable) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('evaluaciones')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('evaluaciones')}
                className={`text-xs font-extrabold uppercase tracking-wider py-2 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  activeDropdown === 'evaluaciones' ? 'text-sky-400' : 'text-[#C2C0B6] hover:text-sky-400'
                }`}
              >
                <span>EVALUACIONES</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'evaluaciones' ? 'rotate-180 text-sky-400' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel Desplegable: EVALUACIONES */}
              {activeDropdown === 'evaluaciones' && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-[fadeIn_0.2s_ease-out]">
                  <div className="bg-[#0B2240] border border-sky-900/50 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl">
                    <Link
                      to="/online/formulario/personalizado"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">📋</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Formulario Personalizado</p>
                        <p className="text-[10px] text-[#C2C0B6]">Evaluación completa con medidas y fotos</p>
                      </div>
                    </Link>

                    <Link
                      to="/online/formulario/basico"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">📋</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Formulario Básico</p>
                        <p className="text-[10px] text-[#C2C0B6]">Evaluación de entrenamiento general</p>
                      </div>
                    </Link>

                    <Link
                      to="/online/formulario/nutricional"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">📋</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Formulario Nutricional</p>
                        <p className="text-[10px] text-[#C2C0B6]">Evaluación de hábitos y alimentación</p>
                      </div>
                    </Link>

                    <Link
                      to="/online#faqs"
                      onClick={() => handleScrollTo('faqs')}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group border-t border-white/10 mt-1 pt-2"
                    >
                      <span className="text-xl">❓</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">Preguntas Frecuentes</p>
                        <p className="text-[10px] text-sky-200/70">Dudas sobre envíos, pagos y seguimiento</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Coaches */}
            <Link
              to="/sobre-mi"
              className="text-xs font-extrabold uppercase tracking-wider text-[#C2C0B6] hover:text-sky-400 transition-colors duration-200 py-2"
            >
              COACHES
            </Link>

            {/* 5. Categoría: MODALIDAD (Desplegable Selector) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('modalidad')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('modalidad')}
                className="px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/35 text-sky-400 text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer hover:bg-sky-500/25"
              >
                <span>🌐</span>
                <span className="text-[11px] font-black uppercase tracking-wider">Online</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'modalidad' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel Desplegable: CAMBIO DE MODALIDAD */}
              {activeDropdown === 'modalidad' && (
                <div className="absolute top-full right-0 w-64 pt-2 animate-[fadeIn_0.2s_ease-out]">
                  <div className="bg-[#0B2240] border border-sky-900/50 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl">
                    <div className="p-2 border-b border-white/10 mb-1">
                      <p className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Modalidad Actual:</p>
                      <p className="text-xs font-bold text-white">🌐 Asesoría Online Internacional</p>
                    </div>

                    <Link
                      to="/presencial"
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-[#EF7F7D]/10 hover:bg-[#EF7F7D]/20 border border-[#EF7F7D]/30 text-[#EF7F7D] transition-colors group mt-1"
                    >
                      <span className="text-base">🏋️</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-rose-300">Cambiar a Sede Box Presencial</p>
                        <p className="text-[10px] text-rose-200/70">Instalaciones en El Vigía, Mérida</p>
                      </div>
                    </Link>

                    <Link
                      to="/"
                      className="flex items-center gap-2 p-2 mt-1 rounded-xl hover:bg-white/5 text-[#C2C0B6] hover:text-white text-[11px] font-semibold transition-colors"
                    >
                      <span>↺</span>
                      <span>Volver a pantalla de inicio</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Acciones de la Derecha: Acceder + Botón CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={sesion.href}
              className="text-xs font-bold tracking-wider text-[#C2C0B6] hover:text-white transition-colors duration-200 px-2 py-1"
            >
              {sesion.label}
            </Link>

            <Link
              to="/online/formulario/personalizado"
              className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-95 text-white font-black text-xs rounded-full transition-all duration-200 tracking-wider shadow-lg shadow-sky-500/25 uppercase cursor-pointer"
            >
              EVALUACIÓN ONLINE
            </Link>
          </div>

          {/* Botón de Menú Móvil */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/presencial"
              className="px-2.5 py-1 bg-[#EF7F7D]/15 text-[#EF7F7D] text-[10px] font-black uppercase rounded-full border border-[#EF7F7D]/30"
            >
              🏋️ Presencial
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
              className="text-[#C2C0B6] hover:text-white p-2 rounded-xl focus:outline-none cursor-pointer hover:bg-[#0B2240] transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Desplegable Móvil Agrupado */}
      {isOpen && (
        <div className="lg:hidden bg-[#071628]/98 border-b border-sky-900/50 px-5 py-6 space-y-4 animate-[slideDown_0.2s_ease-out] backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-[11px] font-black text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🌐</span> Plataforma Online
            </span>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[11px] text-[#C2C0B6] hover:text-white underline"
            >
              ↺ Cambiar
            </Link>
          </div>

          {/* Grupo 1: Planes */}
          <div>
            <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest mb-2 px-1">Planes Online</p>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/online#planes-online"
                onClick={() => handleScrollTo('planes-online')}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center justify-between"
              >
                <span>⭐ Plan Personalizado</span>
                <span className="text-sky-400 font-mono">$70</span>
              </Link>
              <Link
                to="/online#planes-online"
                onClick={() => handleScrollTo('planes-online')}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center justify-between"
              >
                <span>🏋️‍♂️ Plan Básico</span>
                <span className="text-sky-400 font-mono">$45</span>
              </Link>
              <Link
                to="/online#planes-online"
                onClick={() => handleScrollTo('planes-online')}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center justify-between"
              >
                <span>🥗 Plan Nutricional</span>
                <span className="text-sky-400 font-mono">$35</span>
              </Link>
            </div>
          </div>

          {/* Grupo 2: Formularios de Evaluación */}
          <div>
            <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest mb-2 px-1">Formularios Oficiales</p>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/online/formulario/personalizado"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-sky-500/10 text-xs font-bold text-sky-300 hover:bg-sky-500/20 flex items-center gap-2 border border-sky-500/20"
              >
                <span>📋</span> Formulario Plan Personalizado
              </Link>
              <Link
                to="/online/formulario/basico"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
              >
                <span>📋</span> Formulario Plan Básico
              </Link>
              <Link
                to="/online/formulario/nutricional"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
              >
                <span>📋</span> Formulario Plan Nutricional
              </Link>
            </div>
          </div>

          {/* Grupo 3: Cambiar a Presencial y Acceso */}
          <div className="pt-2 border-t border-white/10 space-y-2.5">
            <Link
              to="/presencial"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#EF7F7D]/15 border border-[#EF7F7D]/30 text-[#EF7F7D] font-black text-xs rounded-xl text-center flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>🏋️ Cambiar a Sede Presencial (El Vigía)</span>
            </Link>

            <Link
              to={sesion.href}
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#0B2240] text-[#C2C0B6] font-bold text-xs rounded-xl text-center block"
            >
              {sesion.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
