import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function PresencialNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  const sesion = isAuthenticated
    ? { label: isAdmin ? 'PANEL' : 'MI CUENTA', href: isAdmin ? '/admin' : '/mi-cuenta' }
    : { label: 'ACCEDER', href: '/login' };

  const links = [
    { label: 'INICIO BOX', href: '/presencial' },
    { label: 'HORARIOS', href: '/presencial/horarios' },
    { label: 'PLANES DEL BOX', href: '/presencial/planes' },
    { label: 'SERVICIOS', href: '/presencial/servicios' },
    { label: 'COACHES', href: '/sobre-mi' },
    { label: 'COMUNIDAD', href: '/comunidad' },
    { label: 'CONTACTO', href: '/presencial/contacto' },
  ];

  const isActive = (path) => {
    if (path === '/presencial') return location.pathname === '/presencial';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071628]/95 border-b border-[#13335A]/60 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Presencial Badge */}
          <div className="flex items-center gap-3">
            <Link to="/presencial" className="flex items-center group transition-transform duration-200 group-hover:scale-[1.02]">
              <img 
                src="/images/logos/logo-horizontal.webp" 
                alt="MairoverFit Box" 
                className="h-9 sm:h-10 md:h-11 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/logos/logo-horizontal.png';
                }}
              />
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EF7F7D]/15 border border-[#EF7F7D]/30 text-[#EF7F7D] text-[10px] font-black uppercase tracking-wider">
              🏋️ BOX PRESENCIAL
            </span>
          </div>

          {/* Desktop Links for Presencial */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-xs font-bold tracking-wider transition-all duration-200 relative py-1 ${
                    active 
                      ? 'text-[#EF7F7D]' 
                      : 'text-[#C2C0B6] hover:text-[#EF7F7D]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EF7F7D] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions: Switcher to Online & Account */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Switch Modality Button */}
            <Link
              to="/online"
              className="px-3.5 py-1.5 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="Cambiar a la plataforma Online"
            >
              <span>🌐</span>
              <span className="text-[11px] uppercase tracking-wider">Modo Online</span>
            </Link>

            <Link
              to="/"
              className="text-[#C2C0B6] hover:text-white p-2 rounded-xl text-xs font-bold transition-colors"
              title="Volver al Selector de Modalidad"
            >
              ↺ Cambiar
            </Link>

            <Link
              to={sesion.href}
              className="text-xs font-bold tracking-wider text-[#C2C0B6] hover:text-white transition-colors duration-200 px-2 py-1"
            >
              {sesion.label}
            </Link>

            <Link
              to="/presencial/contacto"
              className="px-4 py-2 bg-gradient-to-r from-[#EF7F7D] to-rose-500 hover:from-rose-500 hover:to-[#EF7F7D] active:scale-95 text-white font-extrabold text-xs rounded-full transition-all duration-200 tracking-wider shadow-md shadow-[#EF7F7D]/25 uppercase cursor-pointer"
            >
              CLASE DE PRUEBA
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/online"
              className="px-2.5 py-1 bg-sky-500/20 text-sky-400 text-[10px] font-black uppercase rounded-full border border-sky-500/30"
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

      {/* Mobile Links Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#071628]/98 border-b border-[#13335A] px-6 py-6 space-y-4 animate-[slideDown_0.3s_ease-out] backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-[11px] font-black text-[#EF7F7D] uppercase tracking-wider">
              🏋️ Menú Presencial (Box El Vigía)
            </span>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-[11px] text-[#C2C0B6] hover:text-white underline"
            >
              ↺ Cambiar Modalidad
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold tracking-wider py-2.5 px-3 rounded-xl transition-all ${
                    active 
                      ? 'bg-[#0B2240] text-[#EF7F7D] font-extrabold border-l-4 border-[#EF7F7D]' 
                      : 'text-[#C2C0B6] hover:text-[#EF7F7D] hover:bg-[#0B2240]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#13335A] flex flex-col gap-3">
            <Link
              to="/online"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-sky-500/15 border border-sky-500/30 text-sky-400 font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>🌐 Ir a Modalidad Online (A Distancia)</span>
            </Link>

            <Link
              to={sesion.href}
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#0B2240] text-[#C2C0B6] font-bold text-xs rounded-xl text-center"
            >
              {sesion.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
