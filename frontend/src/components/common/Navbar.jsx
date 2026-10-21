import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  // Acceso al área privada según el estado de la sesión
  const sesion = isAuthenticated
    ? { label: isAdmin ? 'PANEL' : 'MI CUENTA', href: isAdmin ? '/admin' : '/mi-cuenta' }
    : { label: 'ACCEDER', href: '/login' };

  const links = [
    { label: 'INICIO', href: '/' },
    { label: 'MODALIDAD', href: '/modalidad' },
    { label: 'ONLINE', href: '/online' },
    { label: 'COACHES', href: '/sobre-mi' },
    { label: 'SERVICIOS', href: '/servicios' },
    { label: 'PLANES', href: '/planes' },
    { label: 'HORARIOS', href: '/horarios' },
    { label: 'COMUNIDAD', href: '/comunidad' },
    { label: 'CONTACTO', href: '/contacto' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071628]/95 border-b border-[#13335A]/60 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center group transition-transform duration-200 group-hover:scale-[1.02]">
            <img 
              src="/images/logos/logo-horizontal.webp" 
              alt="MairoverFit" 
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/logos/logo-horizontal.png';
              }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-xs font-bold tracking-wider transition-all duration-200 relative py-1 ${
                    active 
                      ? 'text-[#F43F5E]' 
                      : 'text-[#C2C0B6] hover:text-[#F43F5E]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F43F5E] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Social Icons & CTA Button */}
          <div className="hidden md:flex items-center gap-5">
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-[#C2C0B6]">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/mairoverfitbox/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="hover:text-[#F43F5E] hover:scale-110 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="hover:text-[#F43F5E] hover:scale-110 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a 
                href="https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="WhatsApp"
                className="hover:text-[#F43F5E] hover:scale-110 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                </svg>
              </a>
            </div>
            
            <Link
              to={sesion.href}
              className={`text-xs font-bold tracking-wider transition-colors duration-200 ${
                isActive(sesion.href) ? 'text-[#F43F5E]' : 'text-[#C2C0B6] hover:text-[#F43F5E]'
              }`}
            >
              {sesion.label}
            </Link>

            <Link
              to="/contacto"
              className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 active:scale-95 text-white font-bold text-xs rounded-full transition-all duration-200 tracking-wider shadow-lg shadow-primary-500/25 uppercase cursor-pointer"
            >
              ASESORÍA GRATUITA
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              to="/contacto"
              className="px-3.5 py-1.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white font-bold text-[11px] rounded-full transition-all tracking-wider shadow-md shadow-[#F43F5E]/20 uppercase active:scale-95"
            >
              Asesoría
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
          <div className="flex flex-col gap-3">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold tracking-wider py-2 px-3 rounded-xl transition-all ${
                    active 
                      ? 'bg-[#0B2240] text-[#F43F5E] font-extrabold border-l-4 border-[#F43F5E]' 
                      : 'text-[#C2C0B6] hover:text-[#F43F5E] hover:bg-[#0B2240]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to={sesion.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 py-2.5 px-4 rounded-xl text-center tracking-wider transition-all shadow-md active:scale-95 mt-2"
            >
              {sesion.label}
            </Link>
            <div className="h-px bg-[#13335A]/60 my-2"></div>
            
            {/* Social Icons inside Mobile Menu */}
            <div className="flex items-center justify-around text-[#C2C0B6] py-2 text-xs font-semibold">
              <a href="https://www.instagram.com/mairoverfitbox/" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors p-2">
                Instagram
              </a>
              <span className="text-[#13335A]">•</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors p-2">
                Facebook
              </a>
              <span className="text-[#13335A]">•</span>
              <a href="https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors p-2">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
