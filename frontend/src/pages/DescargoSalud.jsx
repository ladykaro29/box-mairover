import { Link } from 'react-router-dom';

export default function DescargoSalud() {
  const clauses = [
    {
      icon: '🩺',
      title: '1. Asesoramiento Médico Previo Requerido',
      body: 'La práctica de disciplinas como CrossFit, Halterofilia, Hyrox y Acondicionamiento Metabólico de alta intensidad demanda un esfuerzo cardiovascular y neuromuscular considerable. Se recomienda formalmente a cada atleta someterse a una evaluación médica y cardiológica completa antes de iniciar las actividades.'
    },
    {
      icon: '📋',
      title: '2. Cuestionario de Aptitud Física (PAR-Q)',
      body: 'Si presentas hipertensión, antecedentes de afecciones cardíacas, dolor en el pecho durante el esfuerzo físico, mareos frecuentes, problemas osteoarticulares severos o sospecha de embarazo, estás obligado a informar inmediatamente al coach antes del inicio de cualquier sesión para realizar las adaptaciones y escalados pertinentes.'
    },
    {
      icon: '⚠️',
      title: '3. Asunción Voluntaria de Riesgos Deportivos',
      body: 'El ejercicio físico intenso conlleva riesgos inherentes de fatiga extrema, agujetas musculares, contracturas o posibles lesiones accidentales. El atleta reconoce estos riesgos y asume voluntariamente su participación, comprometiéndose a respetar sus propios límites corporales y a priorizar la técnica por encima del peso levantado.'
    },
    {
      icon: '🛑',
      title: '4. Protocolo ante Síntomas de Alarma',
      body: 'Si en el transcurso de un entrenamiento experimentas mareo repentino, náuseas, pérdida de visión periférica, dolor opresivo en el pecho o falta severa de aire, debes detenerte de inmediato y comunicarlo a viva voz al coach o a los compañeros más cercanos.'
    },
    {
      icon: '🥗',
      title: '5. Pautas Nutricionales y Suplementación',
      body: 'Las recomendaciones nutricionales provistas por MairoverFit tienen carácter de educación alimentaria y hábitos saludables para atletas. No constituyen prescripciones farmacológicas ni pretenden diagnosticar, tratar o curar enfermedades metabólicas o patologías clínicas complejas.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-blue-200/70 mb-8 uppercase tracking-wider">
          <Link to="/" className="hover:text-primary-400 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-white font-bold">Descargo de Salud</span>
        </div>

        {/* Hero Header */}
        <div className="text-left mb-12 border-b border-dark-700/60 pb-8">
          <span className="text-primary-500 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Salud, Aptitud Física & Responsabilidad
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            DESCARGO DE <span className="text-primary-500">RESPONSABILIDAD</span>
          </h1>
          <p className="text-blue-100/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Tu bienestar y seguridad son fundamentales. Conoce nuestras pautas médicas y de aptitud deportiva para un entrenamiento responsable.
          </p>
        </div>

        {/* Important Warning Banner */}
        <div className="bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-r-2xl mb-10 shadow-lg">
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0">⚠️</span>
            <div>
              <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider mb-1">
                Aviso Médico Importante
              </h3>
              <p className="text-xs text-amber-100/80 leading-relaxed">
                Ningún programa de entrenamiento o consejo de nuestros coaches sustituye el criterio, diagnóstico o tratamiento de un médico profesional colegiado.
              </p>
            </div>
          </div>
        </div>

        {/* Clauses */}
        <div className="space-y-6">
          {clauses.map((clause, idx) => (
            <div 
              key={idx} 
              className="material-card bg-dark-800/80 border border-dark-700/70 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col md:flex-row gap-5 items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center text-2xl flex-shrink-0">
                {clause.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-base md:text-lg font-black text-white uppercase tracking-tight mb-2">
                  {clause.title}
                </h2>
                <p className="text-sm text-blue-100/80 leading-relaxed font-normal">
                  {clause.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-14 pt-8 border-t border-dark-700/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/terminos"
            className="text-xs font-bold text-primary-400 hover:text-primary-300 uppercase tracking-wider"
          >
            ← Volver a Términos y Condiciones
          </Link>
          <Link
            to="/contacto"
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-primary-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            ¿Tienes dudas médicas? Escríbenos
          </Link>
        </div>

      </div>
    </div>
  );
}
