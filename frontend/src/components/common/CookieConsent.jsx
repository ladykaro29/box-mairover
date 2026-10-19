import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('mairoverfit_cookie_consent');
      if (!consent) {
        // Show after a brief delay for smooth UX
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleAccept = (choice) => {
    try {
      localStorage.setItem('mairoverfit_cookie_consent', choice);
    } catch {
      // Fallback
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Aviso de privacidad y cookies"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 animate-slide-up"
    >
      <div className="bg-[#0B2240]/95 border border-[#13335A] rounded-2xl p-5 shadow-2xl backdrop-blur-md text-white">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl flex-shrink-0">🍪</span>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-white">
              Privacidad y Cookies
            </h2>
            <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
              Utilizamos cookies técnicas para mantener tu sesión segura, recordar tus preferencias y optimizar la reserva de clases en MairoverFit.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#13335A]/60">
          <button
            onClick={() => handleAccept('all')}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-primary-500/25 transition-all duration-200 active:scale-95 cursor-pointer text-center"
          >
            Aceptar todas
          </button>
          <button
            onClick={() => handleAccept('essential')}
            className="px-4 py-2.5 bg-dark-700/80 hover:bg-dark-700 text-blue-100 font-bold text-xs uppercase tracking-wider rounded-xl border border-dark-600 transition-colors cursor-pointer text-center"
          >
            Solo esenciales
          </button>
        </div>

        <div className="mt-2 text-center">
          <Link
            to="/privacidad"
            onClick={() => setIsVisible(false)}
            className="text-[11px] text-primary-400 hover:text-primary-300 underline font-medium"
          >
            Leer nuestra Política de Privacidad y Cookies
          </Link>
        </div>
      </div>
    </aside>
  );
}
