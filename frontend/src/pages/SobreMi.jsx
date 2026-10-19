import React from 'react';
import { Link } from 'react-router-dom';

export default function SobreMi() {
  const whatsappUrl =
    'https://wa.me/584147225979?text=Hola%20Coaches%20Mairover%20y%20Mauroly,%20vengo%20de%20la%20web%20y%20quiero%20agendar%20mi%20evaluación%20en%20MairoverFit%20Box';

  const valores = [
    {
      emoji: '🎯',
      titulo: 'Disciplina y Carácter',
      texto: 'La constancia diaria cuando nadie mira es la clave para alcanzar cualquier meta dentro y fuera del box.',
    },
    {
      emoji: '🛡️',
      titulo: 'Técnica y Seguridad',
      texto: 'Priorizamos la calidad del movimiento y la biomecánica antes que el peso en la barra.',
    },
    {
      emoji: '❤️',
      titulo: 'Paciencia y Respeto',
      texto: 'Cada cuerpo, cada cicatriz y cada proceso importan. Escalamos cada WOD a tu realidad.',
    },
    {
      emoji: '👥',
      titulo: 'Comunidad Real',
      texto: 'Nadie entrena solo. Los gritos de aliento de tus compañeros te levantan cuando las fuerzas flaquean.',
    },
    {
      emoji: '📈',
      titulo: 'Evolución Continua',
      texto: 'Nos certificamos constantemente al más alto nivel (CF-L2) para entregarte programación de primera.',
    },
  ];

  return (
    <div className="bg-dark-900 text-white min-h-screen font-sans">
      {/* 1. HERO PERFIL / HEAD COACHES */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Columna Texto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-500 text-xs font-semibold tracking-wider uppercase">
                <span>🇻🇪 SOBRE NOSOTRAS • HEAD COACHES</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                NUESTRA HISTORIA,{' '}
                <span className="text-primary-500">TU TRANSFORMACIÓN.</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed font-light">
                Somos <strong className="text-white font-semibold">Mairover y Mauroly Mercado</strong>, hermanas, licenciadas en educación física, atletas y entrenadoras certificadas internacionalmente como{' '}
                <strong className="text-white font-semibold">CrossFit Level 1 (CF-L1) y CrossFit Level 2 (CF-L2)</strong>. Fundamos MairoverFit Box en El Vigía con una misión innegociable: hacer del entrenamiento y la nutrición el bote salvavidas que impulse tu salud física, mental e integral.
              </p>

              {/* Trilogía de Puntos Fuertes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
                  <span className="text-primary-500 font-bold text-sm block mb-1">
                    🏅 CERTIFICADO CF-L2
                  </span>
                  <p className="text-xs text-gray-300">
                    Aval internacional CrossFit Level 1 y Level 2 Trainer.
                  </p>
                </div>
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
                  <span className="text-primary-500 font-bold text-sm block mb-1">
                    🍏 ENFOQUE INTEGRAL
                  </span>
                  <p className="text-xs text-gray-300">
                    Programación funcional, halterofilia, nutrición y mente.
                  </p>
                </div>
                <div className="bg-dark-800 border border-dark-700 rounded-xl p-4">
                  <span className="text-primary-500 font-bold text-sm block mb-1">
                    🔥 NIVEL FITGAMES
                  </span>
                  <p className="text-xs text-gray-300">
                    De El Vigía a las arenas competitivas más grandes del país.
                  </p>
                </div>
              </div>

              {/* Botones CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl bg-primary-500 hover:bg-[#E11D48] text-white font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-primary-500/25 active:scale-95"
                >
                  <span>ENTRENAR CON NOSOTRAS</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link
                  to="/planes"
                  className="px-7 py-3.5 rounded-xl border border-dark-700 hover:border-white text-white font-semibold text-sm transition-all duration-300 active:scale-95"
                >
                  VER PLANES Y MEMBRESÍAS
                </Link>
              </div>
            </div>

            {/* Columna Tarjeta Dual de Liderazgo */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card Mairover */}
              <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-primary-500 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-white">Mairover Mercado</h2>
                    <p className="text-xs text-primary-500 font-medium uppercase tracking-wider">
                      Co-Fundadora & Head Coach • CF-L2 Trainer
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-500/20 text-primary-500 border border-primary-500/30">
                    CF-L1 & CF-L2
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Mi disciplina, constancia y carácter me conducen a prepararme día a día para contribuir en esos botes salvavidas de nuestro gran método CrossFit, el cual también me salvó a mí. Mi meta es guiarte con excelencia técnica para que descubras de qué estás hecho."
                </p>
              </div>

              {/* Card Mauroly */}
              <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-primary-500 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-white">Mauroly Mercado</h2>
                    <p className="text-xs text-primary-500 font-medium uppercase tracking-wider">
                      Co-Fundadora & Head Coach • Lic. Educación Física
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-500/20 text-primary-500 border border-primary-500/30">
                    CF-L1 & Nutrición
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Especialista en pedagogía del movimiento, halterofilia y planes nutricionales. Mi enfoque es corregir cada técnica con paciencia, empujarte a romper tus límites cuando quieres rendirte y formar desde pequeños atletas en CrossFit Kids hasta competidores en FitGames."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE ESTADÍSTICAS (KPIs) */}
      <section className="py-12 bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary-500">+7 Años</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">De Experiencia y Trayectoria</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary-500">+500</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">Alumnos Transformados</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary-500">CF-L1 & L2</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">Certificación Internacional</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary-500">+10K</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">Comunidad Digital Activa</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MI PROPÓSITO & CERTIFICACIONES INTERNACIONALES */}
      <section className="py-20 bg-dark-900 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Propósito */}
            <div className="space-y-6">
              <span className="text-primary-500 font-semibold tracking-wider uppercase text-sm">
                NUESTRO PROPÓSITO EN EL BOX
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                NO SOLO ENTRENAMOS CUERPOS, TRANSFORMAMOS VIDAS
              </h2>
              <p className="text-gray-300 leading-relaxed font-light">
                El movimiento cambió nuestras vidas, y hoy nuestro propósito junto a todo el equipo de coaches de{' '}
                <strong className="text-white">MairoverFit Box</strong> es guiarte para que logres lo que creías imposible. Creemos en la constancia sobre la motivación pasajera, en los hábitos sostenibles sobre las dietas extremas y en que la hora de entrenamiento sea el mejor momento de tu día.
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  'Programación estructurada para todas las edades (Kids, Adultos y Senior).',
                  'Corrección biomecánica constante para prevenir lesiones y superar PRs.',
                  'Planes de alimentación adaptados a tu ritmo de vida y objetivos.',
                  'Preparación probada en competencias nacionales (FitGames y BeFitFlow).',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                    <span className="text-primary-500 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Credenciales y Certificaciones CrossFit Inc. */}
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-dark-700 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary-500 font-semibold">
                    RESPALDO INTERNACIONAL
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Credenciales CrossFit® Inc.
                  </h3>
                </div>
                <span className="text-3xl">🎓</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-dark-900 border border-primary-500/40">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white text-sm">
                      CrossFit Level 2 Trainer Certificate (CF-L2)
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-primary-500 text-white font-semibold">
                      Avanzado
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    Dominio avanzado de coaching, corrección de mecánica en tiempo real, programación efectiva y liderazgo de clases grupales e individuales.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
                  <h4 className="font-bold text-white text-sm">
                    CrossFit Level 1 Trainer Certificate (CF-L1)
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Metodología oficial y movimientos fundamentales avalados por CrossFit Inc.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
                    <h4 className="font-bold text-white text-sm">🏋️‍♀️ Weightlifting</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Especialización en Levantamiento Olímpico (Snatch & Clean and Jerk).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-900 border border-dark-700">
                    <h4 className="font-bold text-white text-sm">🥗 CrossFit Nutrition</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Estrategias de recomposición corporal y rendimiento metabólico.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 italic">
                * Formadas continuamente junto a mentores referentes de Latinoamérica como Carlos Andrade Salazar y Ricardo Vázquez (#EsaEsLaDiferencia).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALORES ("LO QUE NOS DEFINE") */}
      <section className="py-20 bg-dark-900 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primary-500 font-semibold tracking-wider uppercase text-sm">
              NUESTRO ADN
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              LO QUE DEFINE A MAIROVERFIT BOX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {valores.map((v, index) => (
              <div
                key={index}
                className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-primary-500 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="text-3xl mb-4">{v.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-2">{v.titulo}</h3>
                <p className="text-gray-300 text-xs leading-relaxed">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA DE CIERRE */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-primary-500 font-semibold tracking-wider uppercase text-sm">
            DE EL VIGÍA PAL MUNDO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            TU MEJOR VERSIÓN ES NUESTRA MISIÓN.
          </h2>
          <p className="text-gray-300 text-lg font-light max-w-2xl mx-auto">
            Déjanos acompañarte a transformar tu cuerpo, tu mente y tus hábitos en una comunidad que te impulsa desde el primer día.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-primary-500 hover:bg-[#E11D48] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary-500/25 active:scale-95"
            >
              HABLEMOS POR WHATSAPP
            </a>
            <Link
              to="/contacto"
              className="px-8 py-4 rounded-xl border border-dark-700 hover:border-white text-white font-semibold text-sm transition-all duration-300 active:scale-95"
            >
              AGENDAR EVALUACIÓN GRATUITA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
