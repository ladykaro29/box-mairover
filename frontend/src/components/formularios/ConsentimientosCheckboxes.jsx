import { Link } from 'react-router-dom';

export default function ConsentimientosCheckboxes({
  values,
  onChange,
  hasPhotos = false,
  errors,
}) {
  const handleToggle = (key) => {
    onChange(key, !values[key]);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-dark-700/60 pb-3 mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <span>📜</span> Consentimientos Legales y Protección de Datos
        </h3>
        <p className="text-xs text-accent-gray-light mt-1">
          Por favor revisa y marca cada una de las autorizaciones requeridas para procesar tu evaluación inicial.
        </p>
      </div>

      {/* 1. Política de Privacidad (Obligatorio) */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          values.privacidad
            ? 'bg-dark-800/80 border-primary-500/50'
            : errors?.privacidad
            ? 'bg-red-500/10 border-red-500/50'
            : 'bg-dark-900/60 border-dark-700/60'
        }`}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(values.privacidad)}
            onChange={() => handleToggle('privacidad')}
            className="w-4 h-4 mt-1 accent-[#F43F5E] rounded cursor-pointer shrink-0"
          />
          <div className="text-xs leading-relaxed text-dark-200">
            <span className="font-bold text-white block mb-0.5">
              1. Política de Privacidad y Términos del Servicio <span className="text-primary-500">*</span>
            </span>
            He leído y acepto la{' '}
            <Link to="/privacidad" target="_blank" className="text-primary-400 underline hover:text-primary-300">
              Política de Privacidad
            </Link>{' '}
            y los{' '}
            <Link to="/terminos" target="_blank" className="text-primary-400 underline hover:text-primary-300">
              Términos del Servicio
            </Link>{' '}
            de MairoverFit. Autorizo el tratamiento de mis datos de contacto para la gestión de mi plan.
          </div>
        </label>
        {errors?.privacidad && (
          <p className="text-xs text-primary-400 mt-2 pl-7 font-medium">⚠️ Debes aceptar la política de privacidad para continuar.</p>
        )}
      </div>

      {/* 2. Datos Sensibles de Salud y Lesiones (Obligatorio) */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          values.datosSensibles
            ? 'bg-dark-800/80 border-primary-500/50'
            : errors?.datosSensibles
            ? 'bg-red-500/10 border-red-500/50'
            : 'bg-dark-900/60 border-dark-700/60'
        }`}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(values.datosSensibles)}
            onChange={() => handleToggle('datosSensibles')}
            className="w-4 h-4 mt-1 accent-[#F43F5E] rounded cursor-pointer shrink-0"
          />
          <div className="text-xs leading-relaxed text-dark-200">
            <span className="font-bold text-white block mb-0.5">
              2. Tratamiento de Datos de Salud, Lesiones y Hábitos <span className="text-primary-500">*</span>
            </span>
            Otorgo mi consentimiento expreso para que MairoverFit trate mis datos sobre antecedentes físicos, lesiones, molestias y hábitos alimenticios exclusivamente con el fin de adaptar y personalizar mi programación técnica de entrenamiento y nutrición.
          </div>
        </label>
        {errors?.datosSensibles && (
          <p className="text-xs text-primary-400 mt-2 pl-7 font-medium">⚠️ Este consentimiento es necesario para diseñar tu plan de forma segura.</p>
        )}
      </div>

      {/* 3. Consentimiento de Fotografías Corporales (Condicional si sube fotos) */}
      {hasPhotos && (
        <div
          className={`p-4 rounded-xl border transition-all ${
            values.fotosCorporales
              ? 'bg-dark-800/80 border-primary-500/50'
              : errors?.fotosCorporales
              ? 'bg-red-500/10 border-red-500/50'
              : 'bg-dark-900/60 border-dark-700/60'
          }`}
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(values.fotosCorporales)}
              onChange={() => handleToggle('fotosCorporales')}
              className="w-4 h-4 mt-1 accent-[#F43F5E] rounded cursor-pointer shrink-0"
            />
            <div className="text-xs leading-relaxed text-dark-200">
              <span className="font-bold text-white block mb-0.5">
                3. Uso Privado y Confidencial de Fotografías Corporales <span className="text-primary-500">*</span>
              </span>
              Autorizo la carga y almacenamiento privado de mis fotografías corporales únicamente para la valoración y seguimiento técnico por parte de las entrenadoras de MairoverFit. Entiendo que se procesan eliminando metadatos EXIF y que{' '}
              <strong className="text-white">este consentimiento NO autoriza su difusión en redes sociales ni en medios públicos</strong>.
            </div>
          </label>
          {errors?.fotosCorporales && (
            <p className="text-xs text-primary-400 mt-2 pl-7 font-medium">⚠️ Si adjuntas fotos, debes autorizar su uso confidencial.</p>
          )}
        </div>
      )}

      {/* 4. Consentimiento Opcional e Independiente para Redes Sociales */}
      <div className="p-4 rounded-xl bg-dark-900/40 border border-dark-700/40">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(values.publicidadRrss)}
            onChange={() => handleToggle('publicidadRrss')}
            className="w-4 h-4 mt-1 accent-[#F43F5E] rounded cursor-pointer shrink-0"
          />
          <div className="text-xs leading-relaxed text-accent-gray-light">
            <span className="font-bold text-white block mb-0.5">
              4. Autorización Opcional para Testimonios y Redes Sociales (Opcional)
            </span>
            Autorizo voluntariamente a MairoverFit a compartir mis testimonios o fotografías de avance (con rostro cubierto si así lo solicito) en sus canales de difusión oficiales. <span className="text-accent-gray font-normal">(No es obligatorio para adquirir el plan).</span>
          </div>
        </label>
      </div>

      {/* 5. Declaración de Veracidad */}
      <div className="p-3 bg-dark-800/40 rounded-lg border border-dark-700/30 text-[11px] text-accent-gray">
        ℹ️ <strong>Declaración de veracidad:</strong> Al enviar el formulario, confirmas que toda la información provista es fidedigna y que eres mayor de edad según la legislación vigente.
      </div>
    </div>
  );
}
