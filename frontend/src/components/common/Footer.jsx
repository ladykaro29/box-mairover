import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071628] border-t border-[#13335A] text-[#C2C0B6] pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: 4 Columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#13335A]/60">
          
          {/* Columna 1: Marca & Misión */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group transition-transform duration-200 hover:scale-[1.02]">
              <img 
                src="/images/logos/logo-horizontal.webp" 
                alt="MairoverFit" 
                className="h-11 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/logos/logo-horizontal.png';
                }}
              />
            </Link>

            <p className="text-xs text-blue-100/75 leading-relaxed">
              El box de CrossFit, entrenamiento funcional y halterofilia donde construyes disciplina, fuerza y hábitos duraderos. Coaching profesional CF-L1 & CF-L2 y comunidad de alto nivel.
            </p>

            {/* Redes Sociales con efecto Material Equilibrado */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/mairoverfitbox/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram MairoverFit Box"
                className="w-9 h-9 rounded-xl bg-[#0B2240] hover:bg-[#EF7F7D] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 border border-white/5 hover:border-[#EF7F7D]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook MairoverFit"
                className="w-9 h-9 rounded-xl bg-[#0B2240] hover:bg-[#13335A] hover:text-[#8BDBF6] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 border border-white/5 hover:border-[#8BDBF6]/50"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>

              <a 
                href="https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="WhatsApp MairoverFit"
                className="w-9 h-9 rounded-xl bg-[#0B2240] hover:bg-[#8BDBF6] hover:text-[#071628] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95 border border-white/5 hover:border-[#8BDBF6]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF7F7D]"></span>
              Plataforma
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-150">Inicio</Link>
              </li>
              <li>
                <Link to="/planes" className="hover:text-white transition-colors duration-150">Membresías y Planes</Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-white transition-colors duration-150">Servicios y Disciplinas</Link>
              </li>
              <li>
                <Link to="/horarios" className="hover:text-white transition-colors duration-150">Horarios de Clases</Link>
              </li>
              <li>
                <Link to="/sobre-mi" className="hover:text-white transition-colors duration-150">Sobre Nuestras Coaches (CF-L1 & L2)</Link>
              </li>
              <li>
                <Link to="/comunidad" className="hover:text-white transition-colors duration-150">Comunidad & Atletas</Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition-colors duration-150">Contacto y Asesoría</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal, Normativa & Cumplimiento */}
          <div>
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8BDBF6]"></span>
              Legal & Seguridad
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link 
                  to="/terminos" 
                  className="hover:text-[#8BDBF6] flex items-center gap-1.5 transition-colors duration-150"
                >
                  <span className="text-[10px]">📜</span>
                  <span>Términos y Condiciones</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacidad" 
                  className="hover:text-[#8BDBF6] flex items-center gap-1.5 transition-colors duration-150"
                >
                  <span className="text-[10px]">🛡️</span>
                  <span>Política de Privacidad</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/descargo-salud" 
                  className="hover:text-[#8BDBF6] flex items-center gap-1.5 transition-colors duration-150"
                >
                  <span className="text-[10px]">🩺</span>
                  <span>Descargo de Salud & PAR-Q</span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    localStorage.removeItem('mairoverfit_cookie_consent');
                    window.location.reload();
                  }}
                  className="text-left hover:text-[#8BDBF6] flex items-center gap-1.5 transition-colors duration-150 cursor-pointer"
                >
                  <span className="text-[10px]">🍪</span>
                  <span>Configuración de Cookies</span>
                </button>
              </li>
              <li className="pt-2 text-[11px] text-blue-200/60 leading-tight">
                Cumplimiento de protección de datos personales y normativa deportiva de prevención.
              </li>
            </ul>
          </div>

          {/* Columna 4: Garantías de Seguridad & Horarios */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8BDBF6]"></span>
              Seguridad Garantizada
            </h3>

            {/* Badges de Seguridad */}
            <div className="bg-[#0B2240]/80 border border-[#13335A] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🔒</span>
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">Cifrado SSL 256-Bit</div>
                  <div className="text-[10px] text-blue-200/60">Navegación y datos 100% seguros</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🛡️</span>
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">Protección bcrypt</div>
                  <div className="text-[10px] text-blue-200/60">Contraseñas no reversibles</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-lg">💳</span>
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">Pagos Verificados</div>
                  <div className="text-[10px] text-blue-200/60">Pago Móvil, Zelle y Transferencias</div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-blue-200/70 pt-1 space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <span>📍</span> El Vigía, Estado Mérida, Venezuela
              </p>
              <div className="pt-1">
                <p className="font-semibold text-white">Horario del Box:</p>
                <p>Lun - Vie: 6:00 AM - 9:00 PM</p>
                <p>Sábados: 8:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal Links & Developer Credit */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-center lg:text-left">
          
          <div className="text-blue-200/70">
            © {currentYear} <span className="font-bold text-white">MairoverFit</span>. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-blue-200/60">
            <Link to="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link>
            <span>•</span>
            <Link to="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <span>•</span>
            <Link to="/descargo-salud" className="hover:text-white transition-colors">Exención Médica</Link>
          </div>

          <div className="text-[11px] text-blue-200/60 flex items-center gap-1.5">
            <span>Desarrollado por</span>
            <a 
              href="https://www.kickoffdevelopment.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-white hover:text-[#8BDBF6] transition-colors underline decoration-[#8BDBF6]/50 hover:decoration-[#8BDBF6]"
            >
              Kickoff Development
            </a>
          </div>

        </div>

        {/* Final Legal Warning Footnote */}
        <div className="mt-4 pt-4 border-t border-[#13335A]/30 text-[10px] text-blue-200/40 text-center leading-relaxed">
          Aviso Legal: MairoverFit es una plataforma y centro de entrenamiento físico y acondicionamiento. Las rutinas, planes y consejos nutricionales son orientativos para la práctica deportiva y no sustituyen el dictamen, diagnóstico ni prescripción de un profesional médico colegiado. Todo atleta debe consultar con su médico antes de comenzar cualquier programa de ejercicio de alta intensidad.
        </div>

      </div>
    </footer>
  );
}
