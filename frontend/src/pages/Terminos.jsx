import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Terminos() {
  const [activeSection, setActiveSection] = useState('todos');

  const sections = [
    {
      id: 'membresias',
      title: '1. Membresías, Pagos y Vigencia',
      content: `Las membresías en MairoverFit son personales e intransferibles. Cada plan tiene una vigencia mensual de 30 días continuos contados a partir de la fecha de pago o activación. 
      Los pagos no son reembolsables una vez iniciado el ciclo contratado. 
      En casos de fuerza mayor comprobable (accidente o prescripción médica formal con reposo superior a 15 días continuos), el atleta podrá solicitar el congelamiento temporal de su membresía por un periodo máximo de 30 días, notificando previamente a la administración vía WhatsApp o correo electrónico.`
    },
    {
      id: 'reservas',
      title: '2. Política de Reservas y Cancelación de Clases',
      content: `Para garantizar la calidad técnica y la seguridad de los atletas, cada clase cuenta con un aforo máximo estricto.
      Las reservas se realizan a través de la plataforma web hasta 15 minutos antes del inicio de la sesión.
      Cancelaciones: Si un atleta no puede asistir a una clase reservada, debe cancelar su reserva con al menos dos (2) horas de anticipación para permitir que otro compañero en lista de espera tome el cupo.
      El incumplimiento reiterado de reservas sin cancelación oportuna podrá acarrear la suspensión temporal del sistema de reserva anticipada.`
    },
    {
      id: 'salud',
      title: '3. Exención de Responsabilidad y Declaración de Salud',
      content: `El atleta declara voluntariamente que se encuentra en condiciones físicas, cardiovasculares y de salud óptimas para la práctica de ejercicios de alta intensidad (CrossFit, Levantamiento Olímpico, Acondicionamiento Metabólico y Funcionales).
      Es responsabilidad exclusiva del atleta consultar a su médico de confianza antes de iniciar cualquier programa de entrenamiento exigente.
      MairoverFit, sus coaches y personal quedan exentos de toda responsabilidad derivada del ocultamiento de patologías preexistentes, lesiones previas no informadas o de la ejecución de movimientos contrarios a las indicaciones técnicas dadas por el coach a cargo.`
    },
    {
      id: 'normas',
      title: '4. Normas de Convivencia y Cuidado del Box',
      content: `La comunidad de MairoverFit se basa en el respeto, el compañerismo y la superación personal.
      • El material deportivo (barras, discos, kettlebells, mancuernas) debe ser tratado con cuidado; no se permite soltar barras vacías ni mancuernas desde alturas peligrosas.
      • Al finalizar el WOD o sesión, cada atleta es responsable de desinfectar y regresar a su lugar todo el equipo utilizado.
      • Se exige puntualidad: llegar con más de 10 minutos de retraso invalida el calentamiento general estructurado y el coach podrá denegar el acceso a la clase por motivos de prevención de lesiones.`
    },
    {
      id: 'propiedad',
      title: '5. Propiedad Intelectual y Derechos de Imagen',
      content: `Todos los logotipos, diseños, esquemas de entrenamiento, guías nutricionales y contenidos digitales de MairoverFit son propiedad exclusiva de la marca.
      Durante las sesiones y eventos comunitarios pueden tomarse fotografías o videos grupales con fines de motivación y difusión en redes sociales oficiales. Si un atleta prefiere no aparecer en dicho material, puede manifestarlo por escrito al momento de su registro inicial.`
    },
    {
      id: 'contacto',
      title: '6. Modificaciones y Contacto Legal',
      content: `MairoverFit se reserva el derecho de actualizar los presentes Términos y Condiciones para reflejar mejoras operativas o exigencias legales. Cualquier cambio sustancial será notificado oportunamente a los atletas registrados.
      Para consultas legales, sugerencias o reclamos: contacto@mairoverfitbox.fitness o WhatsApp +58 414-7225979.`
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-blue-200/70 mb-8 uppercase tracking-wider">
          <Link to="/" className="hover:text-primary-400 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-white font-bold">Términos y Condiciones</span>
        </div>

        {/* Hero Header */}
        <div className="text-left mb-12 border-b border-dark-700/60 pb-8">
          <span className="text-primary-500 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Marco Legal y Normativa
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            TÉRMINOS Y <span className="text-primary-500">CONDICIONES</span>
          </h1>
          <p className="text-blue-100/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Bienvenido a MairoverFit. Por favor, lee atentamente los términos que rigen nuestros servicios de entrenamiento, asesorías y uso de las instalaciones.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-blue-200/50">
            <span>Última actualización: Octubre 2026</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Vigente y aplicable</span>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-transparent border-l-4 border-primary-500 p-6 rounded-r-2xl mb-10 shadow-lg">
          <div className="flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">⚖️</span>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Aceptación de Términos al Registrarte
              </h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Al crear una cuenta, reservar una clase o adquirir una membresía en MairoverFit, el usuario acepta de forma plena y sin reservas la totalidad de las cláusulas aquí descritas.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="material-card bg-dark-800/80 border border-dark-700/70 rounded-2xl p-6 md:p-8 backdrop-blur-md"
            >
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                {section.title}
              </h2>
              <p className="text-sm text-blue-100/80 leading-relaxed whitespace-pre-line font-normal">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="mt-14 pt-8 border-t border-dark-700/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/privacidad"
            className="text-xs font-bold text-primary-400 hover:text-primary-300 uppercase tracking-wider flex items-center gap-2"
          >
            ← Ver Política de Privacidad
          </Link>
          <Link
            to="/descargo-salud"
            className="text-xs font-bold text-primary-400 hover:text-primary-300 uppercase tracking-wider flex items-center gap-2"
          >
            Descargo de Responsabilidad de Salud →
          </Link>
        </div>

      </div>
    </div>
  );
}
