import { Link } from 'react-router-dom';

export default function EnrutadorModalidad() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0c2444] text-white flex flex-col justify-between p-6 sm:p-10 md:p-16 font-sans relative overflow-x-hidden selection:bg-[#8BDBF6] selection:text-[#071628]">
      
      {/* Luces sutiles y elegantes de ambientación: Equilibrio Coral y Cyan #8BDBF6 */}
      <div className="absolute top-[-20%] left-[-10%] w-[550px] h-[550px] bg-[#EF7F7D]/12 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[550px] h-[550px] bg-[#8BDBF6]/15 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Contenedor Principal Centrado */}
      <main className="max-w-2xl w-full mx-auto relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto py-8">

        {/* 1. Logotipo Oficial MairoverFit */}
        <div className="mb-10 sm:mb-12 transition-transform duration-300 hover:scale-105">
          <img 
            src="/images/logos/logo-horizontal.webp" 
            alt="MairoverFit" 
            className="h-14 sm:h-16 md:h-20 w-auto mx-auto object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/logos/logo-horizontal.png';
            }}
          />
        </div>

        {/* 2. Textos Claramente Separados con Jerarquía y Espaciado Equilibrado */}
        <div className="space-y-4 mb-10 sm:mb-12">
          
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full bg-[#8BDBF6]/10 border border-[#8BDBF6]/30 text-xs font-black tracking-widest text-[#8BDBF6] uppercase">
              BIENVENIDO A MAIROVERFIT
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            SELECCIONA TU MODALIDAD <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF7F7D] via-[#fcd3d2] to-[#8BDBF6]">
              DE ENTRENAMIENTO
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#C2C0B6] max-w-lg mx-auto font-light leading-relaxed pt-2">
            Elige la modalidad para acceder a su plataforma, planes oficiales y canales de atención con tus Coaches:
          </p>

        </div>

        {/* 3. Selección de Modalidad: 2 BOTONES EQUILIBRADOS (Coral & Cyan #8BDBF6) */}
        <div className="flex flex-col gap-5 w-full max-w-md mx-auto mb-12">

          {/* Botón 1: Entrenamiento Presencial (Coral Suave) */}
          <Link
            to="/presencial"
            className="group relative w-full py-5 px-7 rounded-2xl bg-gradient-to-r from-[#EF7F7D] to-[#e66c6a] hover:from-[#e66c6a] hover:to-[#EF7F7D] text-white font-black text-base sm:text-lg uppercase tracking-wider text-center shadow-xl shadow-[#EF7F7D]/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-between border border-white/20"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-3xl">🏋️‍♂️</span>
              <div className="text-left">
                <span className="block leading-tight text-white font-black text-sm sm:text-base">
                  ENTRENAMIENTO PRESENCIAL
                </span>
                <span className="text-[11px] text-white/85 font-semibold tracking-normal normal-case block">
                  Sede Box en El Vigía, Mérida
                </span>
              </div>
            </div>

            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

          {/* Botón 2: Entrenamiento Online (Celeste #8BDBF6 Equilibrante) */}
          <Link
            to="/online"
            className="group relative w-full py-5 px-7 rounded-2xl bg-gradient-to-r from-[#8BDBF6] via-[#6ed0f2] to-[#54c4eb] hover:from-[#6ed0f2] hover:to-[#8BDBF6] text-[#071628] font-black text-base sm:text-lg uppercase tracking-wider text-center shadow-xl shadow-[#8BDBF6]/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-between border border-white/40"
          >
            <div className="flex items-center gap-3.5">
              <span className="text-3xl">🌐</span>
              <div className="text-left">
                <span className="block leading-tight text-[#071628] font-black text-sm sm:text-base">
                  ENTRENAMIENTO ONLINE
                </span>
                <span className="text-[11px] text-[#071628]/85 font-bold tracking-normal normal-case block">
                  Asesoría a distancia (Nacional e Internacional)
                </span>
              </div>
            </div>

            <span className="w-8 h-8 rounded-full bg-[#071628]/15 flex items-center justify-center text-[#071628] text-sm group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>

        </div>

        {/* 4. Enlace Secundario Discreto para Atletas */}
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#C2C0B6] hover:text-[#8BDBF6] transition-colors duration-200 py-1 px-3 rounded-lg hover:bg-white/5"
          >
            <span>👤 ¿Ya eres miembro? Iniciar Sesión / Mi Cuenta</span>
            <span>→</span>
          </Link>
        </div>

      </main>

      {/* Pie de página ultra limpio */}
      <footer className="w-full max-w-2xl mx-auto pt-6 text-center text-xs text-blue-200/40 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 border-t border-white/10">
        <div>
          © {new Date().getFullYear()} <strong className="text-white/80">MairoverFit</strong>. Todos los derechos reservados.
        </div>
        <div>
          Desarrollado por{' '}
          <a 
            href="https://www.kickoffdevelopment.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/80 hover:text-[#8BDBF6] underline decoration-white/30 transition-colors"
          >
            Kickoff Development
          </a>
        </div>
      </footer>

    </div>
  );
}
