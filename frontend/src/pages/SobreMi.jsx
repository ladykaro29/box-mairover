import { useEffect, useState } from 'react';

export default function SobreMi() {
  return (
    <div className="relative min-h-screen bg-white text-dark-800 font-sans overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white flex items-center pt-28 pb-20 overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E85D4E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#E85D4E]/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-[0.25em] mb-4 animate-[fadeIn_0.5s_ease-out]">
                SOBRE MÍ
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                MI HISTORIA, <br />
                TU <span className="text-[#E85D4E]">INSPIRACIÓN.</span>
              </h1>
              
              <p className="text-[#C2C0B6] text-base md:text-lg mb-10 max-w-xl leading-relaxed">
                Soy licenciada en educación física y entrenadora certificada CrossFit Level 1. Mi misión es ayudarte a descubrir tu mejor versión a través de un entrenamiento inteligente, nutrición real y disciplina diaria.
              </p>

              {/* Quick Profile Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-lg">
                    🏋️‍♂️
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">ENTRENADORA CERTIFICADA</h4>
                    <p className="text-[10px] text-[#C2C0B6]">CrossFit Level 1 Trainer (CF-L1)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-lg">
                    ❤️
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">ENFOQUE INTEGRAL</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Entrenamiento, nutrición y mente</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-lg">
                    👥
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">COMUNIDAD REAL</h4>
                    <p className="text-[10px] text-[#C2C0B6]">Apoyo continuo en cada paso</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Column (Coach Mauroly) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80"
                  alt="Coach Mauroly Mercado"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628]/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MI PROPÓSITO & CERTIFICADOS ================= */}
      <section className="bg-[#F9F9FA] py-24 text-dark-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 text-left">
              <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-widest block mb-2">
                MI PROPÓSITO
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-6">
                TRANSFORMAR VIDAS
              </h2>
              
              <p className="text-dark-600 text-sm md:text-base mb-6 leading-relaxed max-w-xl">
                El movimiento cambió mi vida. Hoy, mi propósito es guiarte para que tú también logres lo que creías imposible.
              </p>
              
              <p className="text-dark-600 text-sm md:text-base mb-8 leading-relaxed max-w-xl font-medium">
                Creo en la <strong className="text-dark-900 font-bold">constancia</strong> sobre la motivación, en los hábitos sobre las excusas y en un proceso sostenible que te lleve a resultados reales y duraderos.
              </p>

              {/* Checklist */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Entrenamiento funcional y efectivo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Planes nutricionales adaptados a ti</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Disciplina, respeto y honestidad</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-dark-700">Seguimiento y acompañamiento constante</span>
                </div>
              </div>
            </div>

            {/* Right Column: CrossFit Certificates Mockups */}
            <div className="lg:col-span-6 flex flex-col gap-6 items-center">
              {/* Main Certificate */}
              <div className="w-full max-w-[500px] bg-white border-2 border-dark-100 rounded-xl p-4 sm:p-6 shadow-lg relative flex flex-col items-center justify-center">
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-[#E85D4E]/40 rounded-lg pointer-events-none"></div>
                <span className="text-[#E85D4E] font-black text-xl tracking-[0.2em] mb-1">CrossFit</span>
                <span className="text-[7px] text-dark-300 font-bold uppercase tracking-[0.2em] mb-4">This Level 1 Trainer Certificate is awarded to</span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-dark-800 border-b border-dark-100 pb-2 mb-2 w-4/5 text-center">MAUROLY MERCADO</h4>
                <p className="text-[6px] text-dark-400 text-center max-w-[280px] leading-relaxed">
                  who has prepared the requirements and completed the prescribed course of study of CrossFit’s Fundamental Movements & Methodology
                </p>
                <div className="flex justify-between w-full mt-4 text-[5px] text-dark-300 uppercase tracking-widest font-semibold px-4">
                  <span>CF-L1 Trainer</span>
                  <span>June 2024</span>
                </div>
              </div>

              {/* Smaller Certificates Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
                <div className="bg-white border border-dark-100 rounded-xl p-4 shadow-sm flex flex-col items-center text-center relative">
                  <div className="absolute top-1 left-1 right-1 bottom-1 border border-dashed border-dark-100 rounded-lg pointer-events-none"></div>
                  <span className="text-[#E85D4E] font-extrabold text-[10px] tracking-wider">CrossFit</span>
                  <span className="text-[5px] text-dark-300 uppercase tracking-widest mt-1">Nutrition Certificate</span>
                  <span className="text-[7px] text-dark-800 font-semibold mt-2">Mauroly Mercado</span>
                </div>
                <div className="bg-white border border-dark-100 rounded-xl p-4 shadow-sm flex flex-col items-center text-center relative">
                  <div className="absolute top-1 left-1 right-1 bottom-1 border border-dashed border-dark-100 rounded-lg pointer-events-none"></div>
                  <span className="text-[#E85D4E] font-extrabold text-[10px] tracking-wider">CrossFit</span>
                  <span className="text-[5px] text-dark-300 uppercase tracking-widest mt-1">Weightlifting Certificate</span>
                  <span className="text-[7px] text-dark-800 font-semibold mt-2">Mauroly Mercado</span>
                </div>
              </div>

              <span className="text-[10px] text-dark-300 italic">
                *Certificaciones avaladas internacionalmente por CrossFit Inc.
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= APRENDIZAJE CONTINUO SECTION ================= */}
      <section className="bg-white pb-24 pt-10 text-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 text-left">
              <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-widest block mb-2">
                APRENDIZAJE CONTINUO
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-6">
                DE LOS MEJORES
              </h2>
              
              <p className="text-dark-600 text-sm md:text-base mb-8 leading-relaxed max-w-md">
                Me rodeo de grandes mentores y colegas para seguir aprendiendo y traer siempre lo mejor a nuestra comunidad.
              </p>
            </div>

            {/* Right Large Coaches Photo */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[650px] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl group border border-dark-100">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                  alt="Coaching Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-[#071628]/10"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= OVERLAPPING KPI STATS BAR (Dark Blue) ================= */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 -mt-10">
        <div className="bg-[#0B2240] rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-[#E85D4E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                👥 +7
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Años de Experiencia
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#E85D4E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                ⭐ +500
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Alumnos Transformados
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#E85D4E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                🏅 100%
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                Comprometida con tu Proceso
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <span className="text-[#E85D4E] text-3xl md:text-4xl font-black mb-1 flex items-center gap-2">
                ❤️ Enfoque
              </span>
              <span className="text-[10px] md:text-xs font-bold text-[#C2C0B6] uppercase tracking-widest text-center">
                En Resultados Reales
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= LO QUE ME DEFINE (Light theme) ================= */}
      <section className="bg-[#F9F9FA] py-24 text-dark-800 border-t border-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-widest block mb-2">
            MIS VALORES
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase mb-16">
            LO QUE ME DEFINE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            
            {/* Value 1: Disciplina */}
            <div className="bg-white p-8 rounded-2xl border border-dark-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-xl mb-4">
                🎯
              </div>
              <h3 className="font-extrabold text-sm text-dark-900 uppercase tracking-wider mb-2">Disciplina</h3>
              <p className="text-dark-500 text-[11px] leading-relaxed">
                La clave para alcanzar cualquier meta.
              </p>
            </div>

            {/* Value 2: Respeto */}
            <div className="bg-white p-8 rounded-2xl border border-dark-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-xl mb-4">
                ❤️
              </div>
              <h3 className="font-extrabold text-sm text-dark-900 uppercase tracking-wider mb-2">Respeto</h3>
              <p className="text-dark-500 text-[11px] leading-relaxed">
                Cada persona, cada proceso y cada meta importan.
              </p>
            </div>

            {/* Value 3: Honestidad */}
            <div className="bg-white p-8 rounded-2xl border border-dark-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-xl mb-4">
                🤝
              </div>
              <h3 className="font-extrabold text-sm text-dark-900 uppercase tracking-wider mb-2">Honestidad</h3>
              <p className="text-dark-500 text-[11px] leading-relaxed">
                Transparencia en cada recomendación y plan.
              </p>
            </div>

            {/* Value 4: Comunidad */}
            <div className="bg-white p-8 rounded-2xl border border-dark-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-xl mb-4">
                👥
              </div>
              <h3 className="font-extrabold text-sm text-dark-900 uppercase tracking-wider mb-2">Comunidad</h3>
              <p className="text-dark-500 text-[11px] leading-relaxed">
                Creemos juntos, crecemos juntos.
              </p>
            </div>

            {/* Value 5: Evolución */}
            <div className="bg-white p-8 rounded-2xl border border-dark-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#E85D4E]/10 flex items-center justify-center text-[#E85D4E] text-xl mb-4">
                📈
              </div>
              <h3 className="font-extrabold text-sm text-dark-900 uppercase tracking-wider mb-2">Evolución</h3>
              <p className="text-dark-500 text-[11px] leading-relaxed">
                Mejoramos cada día, dentro y fuera del box.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-br from-[#071628] to-[#09203a] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E85D4E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 text-left">
              <span className="text-[#E85D4E] font-bold text-xs uppercase tracking-widest block mb-3">
                ESTOY AQUÍ PARA TI
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                TU MEJOR VERSIÓN <br />
                ES <span className="text-[#E85D4E]">NUESTRA MISIÓN.</span>
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed">
                Déjame acompañarte a transformar tu cuerpo, tu mente y tu vida.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/584121234567"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#E85D4E] hover:bg-[#D64A3E] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#E85D4E]/30 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  HABLEMOS POR WHATSAPP
                </a>
                
                <a
                  href="/contacto"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  AGENDAR EVALUACIÓN GRATUITA
                </a>
              </div>
            </div>

            {/* Right Column image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80"
                  alt="Coach Mauroly"
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
                  <path d="M2 4C5 4 6 2 9 2C12 2 13 4 16 4C19 4 20 2 23 2C26 2 27 4 29 4" stroke="#E85D4E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 10C5 10 6 8 9 8C12 8 13 10 16 10C19 10 20 8 23 8C26 8 27 10 29 10" stroke="#E85D4E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 16C5 16 6 14 9 14C12 14 13 16 16 16C19 16 20 14 23 14C26 14 27 16 29 16" stroke="#E85D4E" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-[1.1] justify-center text-left">
                <span className="font-black text-lg tracking-wider text-white">
                  MAIROVER<span className="text-[#E85D4E]">Fit</span>
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
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E85D4E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#E85D4E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://wa.me/584121234567" target="_blank" rel="noreferrer" className="hover:text-[#E85D4E] transition-colors">
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
