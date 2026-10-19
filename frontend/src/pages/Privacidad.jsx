import { Link } from 'react-router-dom';

export default function Privacidad() {
  const points = [
    {
      title: '1. Responsable del Tratamiento de Datos',
      text: `El responsable de la recopilación, almacenamiento y protección de tus datos personales es MairoverFit Box (Mairover Mercado y Mauroly Mercado) — El Vigía, Estado Mérida, Venezuela, con domicilio operativo y de atención a atletas a través de los canales oficiales https://mairoverfitbox.fitness y correo de contacto: privacidad@mairoverfitbox.fitness.`
    },
    {
      title: '2. Información que Recopilamos',
      text: `Para prestarte un servicio deportivo y nutricional personalizado de excelencia, recopilamos:
      • Datos de Registro: Nombre completo, correo electrónico, número de teléfono (WhatsApp) y contraseña (almacenada con encriptación irreversible bcrypt).
      • Datos de Rendimiento Físico y Salud: Edad, peso, estatura, porcentaje de grasa, masa muscular, historial de evaluaciones físicas periódicas y notas de lesiones o limitaciones motrices declaradas por ti.
      • Datos de Facturación: Historial de pagos, comprobantes de transferencias o pagos móviles y estado de suscripción.`
    },
    {
      title: '3. Finalidad del Uso de la Información',
      text: `Tus datos son tratados exclusivamente para:
      • Programar, reservar y controlar el aforo de las clases y horarios del box.
      • Monitorear de forma científica y gráfica tu evolución corporal y fuerza a lo largo del tiempo.
      • Enviarte recordatorios de entrenamientos, actualizaciones de horarios y soporte directo vía WhatsApp.
      • Garantizar la seguridad dentro de las instalaciones y ante posibles emergencias físicas.`
    },
    {
      title: '4. Confidencialidad y No Cesión a Terceros',
      text: `MairoverFit mantiene una política estricta de CERO venta o cesión de datos. Tu información jamás será comercializada, cedida ni compartida con empresas de publicidad o bases de datos de terceros. Solo tendrán acceso aquellos sistemas tecnológicos indispensables para el funcionamiento de la plataforma (como el servidor seguro y pasarelas de notificación).`
    },
    {
      title: '5. Seguridad y Almacenamiento',
      text: `Implementamos protocolos de seguridad estándar en la industria, incluyendo transmisión encriptada mediante protocolo SSL/TLS (HTTPS), tokens de sesión protegidos (JWT) con expiración automática, y defensas contra accesos no autorizados en nuestros servidores.`
    },
    {
      title: '6. Derechos del Usuario (Acceso, Rectificación y Cancelación)',
      text: `En cualquier momento tienes el derecho de:
      • Acceder a todos los datos y registros históricos almacenados en tu perfil (/mi-cuenta).
      • Solicitar la corrección de información inexacta o desactualizada.
      • Solicitar la eliminación definitiva de tu cuenta y datos personales enviando un correo a privacidad@mairoverfitbox.fitness.`
    },
    {
      title: '7. Política de Cookies y Almacenamiento Local',
      text: `Nuestra plataforma utiliza únicamente cookies técnicas y almacenamiento local (localStorage) indispensables para mantener activa tu sesión segura y recordar tus preferencias de navegación. No utilizamos cookies de rastreo publicitario invasivas.`
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-blue-200/70 mb-8 uppercase tracking-wider">
          <Link to="/" className="hover:text-primary-400 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-white font-bold">Política de Privacidad</span>
        </div>

        {/* Hero Header */}
        <div className="text-left mb-12 border-b border-dark-700/60 pb-8">
          <span className="text-primary-500 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Seguridad y Protección de Datos
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
            POLÍTICA DE <span className="text-primary-500">PRIVACIDAD</span>
          </h1>
          <p className="text-blue-100/70 text-sm md:text-base leading-relaxed max-w-2xl">
            En MairoverFit nos tomamos muy en serio la confidencialidad de tu información personal y tus datos de salud y rendimiento físico.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-blue-200/50">
            <span>Cumplimiento legal y protección de atletas</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Confidencial</span>
          </div>
        </div>

        {/* Commitment Badge */}
        <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border-l-4 border-blue-500 p-6 rounded-r-2xl mb-10 shadow-lg">
          <div className="flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">🔒</span>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Tu Privacidad es Nuestra Prioridad
              </h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Tus datos biométricos, fotos de evolución corporal y marcas atléticas se mantienen bajo estricta reserva y nunca son publicados sin tu consentimiento explícito.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {points.map((pt, idx) => (
            <div 
              key={idx} 
              className="material-card bg-dark-800/80 border border-dark-700/70 rounded-2xl p-6 md:p-8 backdrop-blur-md"
            >
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                {pt.title}
              </h2>
              <p className="text-sm text-blue-100/80 leading-relaxed whitespace-pre-line font-normal">
                {pt.text}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="mt-14 pt-8 border-t border-dark-700/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            to="/terminos"
            className="text-xs font-bold text-primary-400 hover:text-primary-300 uppercase tracking-wider flex items-center gap-2"
          >
            ← Ver Términos y Condiciones
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
