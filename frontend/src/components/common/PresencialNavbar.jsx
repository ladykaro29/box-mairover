import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function PresencialNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'box' | 'nosotros' | 'modalidad' | null
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const navRef = useRef(null);

  const sesion = isAuthenticated
    ? { label: isAdmin ? 'PANEL' : 'MI CUENTA', href: isAdmin ? '/admin' : '/mi-cuenta' }
    : { label: 'ACCEDER', href: '/login' };

  // Cerrar menús al hacer click fuera o al cambiar de ruta
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

  const isBoxActive = ['/presencial/planes', '/planes', '/presencial/horarios', '/horarios', '/presencial/servicios', '/servicios'].some(p => location.pathname.startsWith(p));
  const isNosotrosActive = ['/sobre-mi', '/comunidad', '/presencial/contacto', '/contacto'].some(p => location.pathname.startsWith(p));

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#071628]/95 border-b border-[#13335A]/60 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo MairoverFit */}
          <Link to="/presencial" className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]">
            <img 
              src="/images/logos/logo-horizontal.webp" 
              alt="MairoverFit Box" 
              className="h-10 sm:h-11 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/logos/logo-horizontal.png';
              }}
            />
          </Link>

          {/* Menú de Escritorio Agrupado por Categorías Desplegables */}
          <div className="hidden lg:flex items-center gap-7">

            {/* 1. Inicio Box */}
            <Link
              to="/presencial"
              className={`text-xs font-extrabold uppercase tracking-wider transition-colors duration-200 py-2 ${
                location.pathname === '/presencial' ? 'text-[#EF7F7D]' : 'text-[#C2C0B6] hover:text-[#EF7F7D]'
              }`}
            >
              INICIO
            </Link>

            {/* 2. Categoría: EL BOX (Desplegable) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('box')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('box')}
                className={`text-xs font-extrabold uppercase tracking-wider py-2 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  isBoxActive || activeDropdown === 'box' ? 'text-[#EF7F7D]' : 'text-[#C2C0B6] hover:text-[#EF7F7D]'
                }`}
              >
                <span>EL BOX</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'box' ? 'rotate-180 text-[#EF7F7D]' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel Desplegable: EL BOX */}
              {activeDropdown === 'box' && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-[fadeIn_0.2s_ease-out]">
                  <div className="bg-[#0B2240] border border-[#13335A] rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl">
                    <Link
                      to="/presencial/planes"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">💳</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#EF7F7D] transition-colors">Planes &amp; Membresías</p>
                        <p className="text-[10px] text-[#C2C0B6]">Clase regular, Max Performance y 1 a 1</p>
                      </div>
                    </Link>

                    <Link
                      to="/presencial/horarios"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">📅</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#EF7F7D] transition-colors">Horarios &amp; Turnos</p>
                        <p className="text-[10px] text-[#C2C0B6]">Turnos de mañana y tarde con reserva</p>
                      </div>
                    </Link>

                    <Link
                      to="/presencial/servicios"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">⚡</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#EF7F7D] transition-colors">Servicios &amp; Clases</p>
                        <p className="text-[10px] text-[#C2C0B6]">CrossFit, Funcionales y Halterofilia</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Categoría: COMUNIDAD (Desplegable) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('nosotros')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('nosotros')}
                className={`text-xs font-extrabold uppercase tracking-wider py-2 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  isNosotrosActive || activeDropdown === 'nosotros' ? 'text-[#EF7F7D]' : 'text-[#C2C0B6] hover:text-[#EF7F7D]'
                }`}
              >
                <span>COMUNIDAD</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'nosotros' ? 'rotate-180 text-[#EF7F7D]' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel Desplegable: COMUNIDAD */}
              {activeDropdown === 'nosotros' && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-[fadeIn_0.2s_ease-out]">
                  <div className="bg-[#0B2240] border border-[#13335A] rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl">
                    <Link
                      to="/sobre-mi"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">🏅</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#EF7F7D] transition-colors">Nuestras Coaches</p>
                        <p className="text-[10px] text-[#C2C0B6]">Mairover y Mauroly (CF-L1 &amp; CF-L2)</p>
                      </div>
                    </Link>

                    <Link
                      to="/comunidad"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">👥</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#EF7F7D] transition-colors">Comunidad Box</p>
                        <p className="text-[10px] text-[#C2C0B6]">Eventos, FitGames y atletas</p>
                      </div>
                    </Link>

                    <Link
                      to="/presencial/contacto"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#EF7F7D] transition-colors">Contacto &amp; Ubicación</p>
                        <p className="text-[10px] text-[#C2C0B6]">Sede en El Vigía y WhatsApp</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Categoría: MODALIDAD (Desplegable Selector) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('modalidad')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('modalidad')}
                className="px-3 py-1.5 rounded-full bg-[#EF7F7D]/15 border border-[#EF7F7D]/35 text-[#EF7F7D] text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer hover:bg-[#EF7F7D]/25"
              >
                <span>🏋️</span>
                <span className="text-[11px] font-black uppercase tracking-wider">Presencial</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'modalidad' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Panel Desplegable: CAMBIO DE MODALIDAD */}
              {activeDropdown === 'modalidad' && (
                <div className="absolute top-full right-0 w-64 pt-2 animate-[fadeIn_0.2s_ease-out]">
                  <div className="bg-[#0B2240] border border-[#13335A] rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl">
                    <div className="p-2 border-b border-white/10 mb-1">
                      <p className="text-[10px] font-black text-[#EF7F7D] uppercase tracking-wider">Modalidad Actual:</p>
                      <p className="text-xs font-bold text-white">🏋️ Sede Presencial (El Vigía)</p>
                    </div>

                    <Link
                      to="/online"
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 transition-colors group mt-1"
                    >
                      <span className="text-base">🌐</span>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-300">Cambiar a Modo Online</p>
                        <p className="text-[10px] text-sky-200/70">Asesoría a distancia nacional e internacional</p>
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
              to="/presencial/contacto"
              className="px-5 py-2.5 bg-gradient-to-r from-[#EF7F7D] to-rose-500 hover:from-rose-500 hover:to-[#EF7F7D] active:scale-95 text-white font-black text-xs rounded-full transition-all duration-200 tracking-wider shadow-lg shadow-[#EF7F7D]/25 uppercase cursor-pointer"
            >
              CLASE DE PRUEBA
            </Link>
          </div>

          {/* Botón de Menú Móvil */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/online"
              className="px-2.5 py-1 bg-sky-500/15 text-sky-400 text-[10px] font-black uppercase rounded-full border border-sky-500/30"
            >
              🌐 Online
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
        <div className="lg:hidden bg-[#071628]/98 border-b border-[#13335A] px-5 py-6 space-y-4 animate-[slideDown_0.2s_ease-out] backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-[11px] font-black text-[#EF7F7D] uppercase tracking-wider flex items-center gap-1.5">
              <span>🏋️</span> Sede Box Presencial
            </span>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[11px] text-[#C2C0B6] hover:text-white underline"
            >
              ↺ Cambiar
            </Link>
          </div>

          {/* Grupo 1: El Box */}
          <div>
            <p className="text-[10px] font-black text-[#C2C0B6] uppercase tracking-widest mb-2 px-1">El Box</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/presencial/planes"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
              >
                <span>💳</span> Planes
              </Link>
              <Link
                to="/presencial/horarios"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
              >
                <span>📅</span> Horarios
              </Link>
              <Link
                to="/presencial/servicios"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2 col-span-2"
              >
                <span>⚡</span> Servicios &amp; Disciplinas
              </Link>
            </div>
          </div>

          {/* Grupo 2: Comunidad */}
          <div>
            <p className="text-[10px] font-black text-[#C2C0B6] uppercase tracking-widest mb-2 px-1">Comunidad</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/sobre-mi"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
              >
                <span>🏅</span> Coaches
              </Link>
              <Link
                to="/comunidad"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
              >
                <span>👥</span> Atletas
              </Link>
              <Link
                to="/presencial/contacto"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2 col-span-2"
              >
                <span>📍</span> Contacto &amp; Ubicación
              </Link>
            </div>
          </div>

          {/* Grupo 3: Cambiar a Online y Acceso */}
          <div className="pt-2 border-t border-white/10 space-y-2.5">
            <Link
              to="/online"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-sky-500/15 border border-sky-500/30 text-sky-400 font-black text-xs rounded-xl text-center flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>🌐 Cambiar a Modalidad Online</span>
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
