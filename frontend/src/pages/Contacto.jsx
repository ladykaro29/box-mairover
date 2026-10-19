import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Contacto() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      // API call to Express backend
      const response = await fetch('/api/v1/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        setSubmitError(true);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      name: 'CROSSFIT',
      desc: 'Entrenamiento funcional de alta intensidad.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12h12M4 9a1 1 0 0 1 1-1h1v8H5a1 1 0 0 1-1-1V9zm14 0a1 1 0 0 1 1-1h1v8h-1a1 1 0 0 1-1-1V9zM2 10h1v4H2v-4zm19 0h1v4h-1v-4z" />
        </svg>
      )
    },
    {
      name: 'CROSSFIT KIDS',
      desc: 'Movimiento, coordinación y disciplina para niños de todas las edades.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6" r="3" />
          <path d="M6 19c0-2.5 2-4.5 4.5-4.5h3c2.5 0 4.5 2 4.5 4.5V21H6v-2z" />
          <path d="M3 12h2M19 12h2M12 2v1M8 10h8" />
        </svg>
      )
    },
    {
      name: 'FUNCIONALES',
      desc: 'Sesiones dinámicas para mejorar condición física y control corporal.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17" cy="4" r="2" />
          <path d="M7 21h3l2.5-5.5L10 11.5L7 13M12.5 15.5l1.5 4.5h4" />
          <path d="M11 9l3 2.5l3-1.5" />
        </svg>
      )
    },
    {
      name: 'HYROX',
      desc: 'Preparación híbrida para rendir al máximo en carreras Hyrox.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="900" letterSpacing="0.2">HYROX</text>
        </svg>
      )
    },
    {
      name: 'ENTRENAMIENTO PERSONAL',
      desc: 'Rutinas a tu medida con planificación enfocada en tus objetivos.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      name: 'ASESORÍA NUTRICIONAL',
      desc: 'Guía alimentaria práctica y adaptada a tu estilo de vida.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5c-.667-1-1.5-1.5-2.5-1.5C7 3.5 5 5.5 5 8.5c0 4.5 3.5 7.5 7 9.5 3.5-2 7-5 7-9.5 0-3-2-5-4.5-5C13.5 3.5 12.667 4 12 5z" />
          <path d="M12 3.5V1.5" />
          <path d="M12 2c1 .5 1.5 1 2 2" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-dark-800 font-sans overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white flex items-center pt-28 pb-20 overflow-hidden">
        {/* Background Gym Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15 pointer-events-none" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80')" }}
        ></div>
        
        {/* Decorative background blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F43F5E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#F43F5E]/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left relative z-20">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-[0.25em] mb-4 animate-[fadeIn_0.5s_ease-out]">
                CONTÁCTANOS
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 uppercase text-white">
                HABLEMOS DE <br />
                <span className="text-[#F43F5E]">TU META</span>
              </h1>
              
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed">
                Ya sea que quieras entrenar en el box, empezar un plan online o recibir asesoría nutricional, estoy aquí para orientarte y ayudarte a dar el siguiente paso.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20y%20agendar%20una%20evaluaci%C3%B3n"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  ESCRÍBEME POR WHATSAPP
                </a>
                
                <a
                  href="#contacto-form"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  AGENDAR EVALUACIÓN
                </a>
              </div>

              {/* Lower Hero Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-white">Respuesta rápida</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-white">Atención personalizada</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-white">Presencial y online</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Image Column (Mairover cutout with gradient mask) */}
            <div className="lg:col-span-3 relative flex items-end justify-center min-h-[300px] lg:min-h-0 pointer-events-none z-10">
              <div className="absolute bottom-0 lg:bottom-[-20px] w-full max-w-[280px] lg:max-w-none h-[110%] lg:h-[115%] flex items-end">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80"
                  alt="Coach Mairover"
                  className="w-full h-full object-contain object-bottom select-none"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* Right Column (Conéctate Conmigo sidebar card) */}
            <div className="lg:col-span-4 flex items-center relative z-20">
              <div className="w-full bg-[#0B2240]/60 border border-white/10 rounded-2xl p-6 text-left shadow-2xl backdrop-blur-md">
                <span className="text-[#F43F5E] font-bold text-[10px] uppercase tracking-[0.2em] block mb-6">
                  CONÉCTATE CONMIGO
                </span>
                
                <div className="space-y-6">
                  {/* Whatsapp */}
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-[#C2C0B6]">WHATSAPP</h4>
                      <p className="text-sm font-black text-white mt-0.5">+58 414-7225979</p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/mairoverfitbox/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-4 items-center group/ig"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 group-hover/ig:bg-[#F43F5E] flex items-center justify-center text-[#F43F5E] group-hover/ig:text-white flex-shrink-0 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-[#C2C0B6]">INSTAGRAM</h4>
                      <p className="text-sm font-black text-white mt-0.5 group-hover/ig:text-primary-500 transition-colors">@mairoverfitbox</p>
                    </div>
                  </a>

                  {/* Correo */}
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-[#C2C0B6]">CORREO</h4>
                      <p className="text-xs font-black text-white mt-0.5">mercado.mairover@gmail.com</p>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 text-base font-bold">
                      📍
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-[#C2C0B6]">UBICACIÓN</h4>
                      <p className="text-xs font-black text-white mt-0.5">El Vigía, Estado Mérida, Venezuela</p>
                    </div>
                  </div>

                  {/* Atención */}
                  <div className="flex gap-4 pt-4 border-t border-white/10 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-[#C2C0B6]">ATENCIÓN</h4>
                      <p className="text-[10px] font-semibold text-white mt-1 leading-relaxed">
                        Lunes a viernes <br />
                        <span className="text-[#F43F5E] font-bold">6:00 a. m. - 11:30 a. m.</span> <br />
                        <span className="text-[#F43F5E] font-bold">3:00 p. m. - 8:00 p. m.</span> <br />
                        Sábados <br />
                        <span className="text-[#F43F5E] font-bold">8:00 a. m. - 10:00 a. m.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FORMULARIO CONTACTO (Light theme) ================= */}
      <section id="contacto-form" className="bg-white py-24 text-dark-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Description Column */}
            <div className="lg:col-span-5 text-left lg:pt-6">
              <h2 className="text-3xl md:text-4xl font-black text-[#071628] tracking-tight uppercase leading-tight">
                CUÉNTAME CÓMO <br />
                <span className="text-[#F43F5E]">PUEDO AYUDARTE</span>
              </h2>
              
              {/* Coral wavy SVGs */}
              <div className="flex flex-col gap-1 my-6">
                <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4C6 4 7 2 11 2C15 2 16 4 20 4C24 4 25 2 29 2C33 2 34 4 38 4" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4C6 4 7 2 11 2C15 2 16 4 20 4C24 4 25 2 29 2C33 2 34 4 38 4" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <p className="text-dark-600 text-sm md:text-base leading-relaxed max-w-sm">
                Completa el formulario y recibirás una respuesta para orientarte según tu objetivo, nivel y disponibilidad.
              </p>

              {/* Status Notifications */}
              {submitSuccess && (
                <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 p-4 rounded-xl text-xs flex items-center gap-3">
                  <span>🎉</span>
                  <div>
                    <p className="font-bold">¡Mensaje enviado con éxito!</p>
                    <p className="text-[10px] text-emerald-500/95 mt-0.5">Te contactaremos por WhatsApp a la brevedad.</p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mt-8 bg-red-500/10 border border-red-500/30 text-red-600 p-4 rounded-xl text-xs flex items-center gap-3">
                  <span>⚠️</span>
                  <div>
                    <p className="font-bold">Ha ocurrido un problema</p>
                    <p className="text-[10px] text-red-500/95 mt-0.5">No pudimos registrar tu contacto. Por favor, inténtalo de nuevo.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Nombre"
                      {...register('nombre', { required: 'El nombre es obligatorio' })}
                      className={`w-full bg-[#F9F9FA] border ${
                        errors.nombre ? 'border-red-500' : 'border-dark-100 focus:border-[#F43F5E]'
                      } rounded-xl p-4 text-xs focus:outline-none transition-all duration-200`}
                    />
                    {errors.nombre && <span className="text-[10px] text-red-500 mt-1 pl-2">⚠ {errors.nombre.message}</span>}
                  </div>

                  {/* Telefono */}
                  <div className="flex flex-col">
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      {...register('telefono', { required: 'El teléfono es obligatorio' })}
                      className={`w-full bg-[#F9F9FA] border ${
                        errors.telefono ? 'border-red-500' : 'border-dark-100 focus:border-[#F43F5E]'
                      } rounded-xl p-4 text-xs focus:outline-none transition-all duration-200`}
                    />
                    {errors.telefono && <span className="text-[10px] text-red-500 mt-1 pl-2">⚠ {errors.telefono.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Correo */}
                  <div className="flex flex-col">
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      {...register('email', {
                        required: 'El correo es obligatorio',
                        pattern: { value: /^\S+@\S+$/i, message: 'Dirección de correo inválida' },
                      })}
                      className={`w-full bg-[#F9F9FA] border ${
                        errors.email ? 'border-red-500' : 'border-dark-100 focus:border-[#F43F5E]'
                      } rounded-xl p-4 text-xs focus:outline-none transition-all duration-200`}
                    />
                    {errors.email && <span className="text-[10px] text-red-500 mt-1 pl-2">⚠ {errors.email.message}</span>}
                  </div>

                  {/* Servicio de Interés */}
                  <div className="flex flex-col">
                    <select
                      defaultValue=""
                      {...register('servicio', { required: 'Selecciona un servicio' })}
                      className={`w-full bg-[#F9F9FA] border ${
                        errors.servicio ? 'border-red-500' : 'border-dark-100 focus:border-[#F43F5E]'
                      } rounded-xl p-4 text-xs focus:outline-none transition-all duration-200 text-[#71717A]`}
                    >
                      <option value="" disabled>Servicio de interés</option>
                      <option value="CrossFit">CrossFit</option>
                      <option value="CrossFit Kids">CrossFit Kids</option>
                      <option value="Funcionales">Funcionales</option>
                      <option value="Hyrox">Hyrox</option>
                      <option value="Entrenamiento Personal">Entrenamiento Personal</option>
                      <option value="Asesoría Nutricional">Asesoría Nutricional</option>
                    </select>
                    {errors.servicio && <span className="text-[10px] text-red-500 mt-1 pl-2">⚠ {errors.servicio.message}</span>}
                  </div>
                </div>

                {/* Objetivo */}
                <div className="flex flex-col">
                  <select
                    defaultValue=""
                    {...register('objetivo', { required: 'Selecciona tu objetivo' })}
                    className={`w-full bg-[#F9F9FA] border ${
                      errors.objetivo ? 'border-red-500' : 'border-dark-100 focus:border-[#F43F5E]'
                    } rounded-xl p-4 text-xs focus:outline-none transition-all duration-200 text-[#71717A]`}
                  >
                    <option value="" disabled>Objetivo</option>
                    <option value="Ganar Fuerza / Músculo">Ganar Fuerza / Músculo</option>
                    <option value="Perder Peso / Grasa">Perder Peso / Grasa</option>
                    <option value="Mejorar Resistencia / Cardio">Mejorar Resistencia / Cardio</option>
                    <option value="Salud General / Recreación">Salud General / Recreación</option>
                  </select>
                  {errors.objetivo && <span className="text-[10px] text-red-500 mt-1 pl-2">⚠ {errors.objetivo.message}</span>}
                </div>

                {/* Mensaje */}
                <div className="flex flex-col">
                  <textarea
                    rows="4"
                    placeholder="Mensaje"
                    {...register('mensaje')}
                    className="w-full bg-[#F9F9FA] border border-dark-100 focus:border-[#F43F5E] rounded-xl p-4 text-xs focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F43F5E] hover:bg-[#E11D48] text-white py-4 rounded-xl font-black text-xs transition-all duration-300 shadow-lg shadow-[#F43F5E]/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative flex items-center justify-center tracking-widest min-h-[50px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>ENVIANDO...</span>
                    </div>
                  ) : (
                    <>
                      <span>ENVIAR MENSAJE</span>
                      <svg className="w-4 h-4 absolute right-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICIOS POR LOS QUE PUEDES ESCRIBIR (Dark Blue Background) ================= */}
      <section className="bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white py-24 relative overflow-hidden">
        {/* Background Gym Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-10 pointer-events-none" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1600&q=80')" }}
        ></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <h2 className="text-3xl font-black tracking-tight uppercase mb-16 text-center">
            SERVICIOS <span className="text-[#F43F5E]">POR LOS QUE PUEDES ESCRIBIR</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {services.map((serv, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 hover:border-[#F43F5E]/30 rounded-xl p-5 flex flex-col justify-between text-center hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] mb-5 mx-auto">
                    {serv.icon}
                  </div>
                  
                  <h3 className="font-extrabold text-[10px] uppercase tracking-wider text-white mb-3 min-h-[30px] flex items-center justify-center">
                    {serv.name}
                  </h3>
                  <p className="text-[9px] text-[#C2C0B6] leading-relaxed">
                    {serv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= HORARIOS SECTION (Light theme) ================= */}
      <section className="bg-white py-20 text-dark-800 relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#071628] tracking-tight uppercase mb-12">
            HORARIOS <span className="text-[#F43F5E]">DEL BOX</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Mañana */}
            <div className="bg-[#F9F9FA] rounded-2xl border border-dark-100 p-8 flex items-center gap-5 text-left shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <rect x="7" y="14" width="2" height="2"></rect>
                  <rect x="11" y="14" width="2" height="2"></rect>
                  <rect x="15" y="14" width="2" height="2"></rect>
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-dark-900 leading-tight">Lunes a Viernes</h4>
                <span className="text-[9px] font-black text-[#F43F5E] uppercase tracking-widest block mt-0.5 mb-1.5">Mañana</span>
                <p className="text-xs font-semibold text-dark-700">6:00 a. m. – 11:30 a. m.</p>
              </div>
            </div>

            {/* Tarde */}
            <div className="bg-[#F9F9FA] rounded-2xl border border-dark-100 p-8 flex items-center gap-5 text-left shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-dark-900 leading-tight">Lunes a Viernes</h4>
                <span className="text-[9px] font-black text-[#F43F5E] uppercase tracking-widest block mt-0.5 mb-1.5">Tarde - Noche</span>
                <p className="text-xs font-semibold text-dark-700">3:00 p. m. – 8:00 p. m.</p>
              </div>
            </div>

            {/* Sábados */}
            <div className="bg-[#F9F9FA] rounded-2xl border border-dark-100 p-8 flex items-center gap-5 text-left shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-dark-900 leading-tight">Sábados</h4>
                <span className="text-[9px] font-black text-[#F43F5E] uppercase tracking-widest block mt-0.5 mb-1.5">Sábados</span>
                <p className="text-xs font-semibold text-dark-700">8:00 a. m. – 10:00 a. m.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-gradient-to-br from-[#071628] to-[#09203a] text-white py-24 relative overflow-hidden">
        {/* Decorative waves behind coach */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none hidden lg:block overflow-hidden">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" opacity="0.3" />
            <path d="M0,60 Q30,40 60,60 T100,60 L100,100 L0,100 Z" fill="currentColor" opacity="0.2" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F43F5E]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-widest block mb-3">
                ESTOY LISTA PARA AYUDARTE
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-[1.15] mb-6 uppercase">
                TU PROCESO EMPIEZA <br />
                <span className="text-[#F43F5E]">CON UN MENSAJE.</span>
              </h2>
              <p className="text-[#C2C0B6] text-sm md:text-base mb-10 max-w-xl leading-relaxed">
                Escríbenos, agenda tu evaluación o solicita información sobre el plan que mejor se adapta a ti en El Vigía.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20y%20agendar%20una%20evaluaci%C3%B3n"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  HABLAR POR WHATSAPP
                </a>
                
                <a
                  href="#contacto-form"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  SOLICITAR INFORMACIÓN
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

    </div>
  );
}
