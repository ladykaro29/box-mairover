export default function ResumenConfirmacionModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  formData,
  filesCount,
  planNombre,
  planPrecio,
}) {
  if (!isOpen) return null;

  const { datosPersonales, objetivos, valoracionInicial, consentimientos } = formData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-dark-800 border border-dark-700/80 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-dark-700/60 bg-dark-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-primary-400 block">
              Paso Final • Revisión
            </span>
            <h3 className="text-base font-black uppercase text-white tracking-tight">
              Confirmar Respuestas antes de Enviar
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-dark-300 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Plan Seleccionado */}
          <div className="bg-primary-500/10 border border-primary-500/30 p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-primary-300 block">Plan Solicitado</span>
              <p className="text-sm font-black text-white">{planNombre}</p>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-white">{planPrecio}</span>
            </div>
          </div>

          {/* Datos Personales */}
          <div className="bg-dark-900/60 p-3.5 rounded-xl border border-dark-700/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray-light block mb-1">
              Datos Personales y Contacto
            </span>
            <p className="text-white font-semibold">
              {datosPersonales?.nombre} {datosPersonales?.apellidos} ({datosPersonales?.edad} años)
            </p>
            <p className="text-accent-gray">
              {datosPersonales?.email} • WhatsApp: {datosPersonales?.whatsapp || datosPersonales?.telefono}
            </p>
            <p className="text-accent-gray">
              {datosPersonales?.ciudad}, {datosPersonales?.pais}
            </p>
          </div>

          {/* Objetivos */}
          <div className="bg-dark-900/60 p-3.5 rounded-xl border border-dark-700/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray-light block mb-1">
              Objetivo Principal
            </span>
            <p className="text-white font-medium">{objetivos?.principal || 'No especificado'}</p>
          </div>

          {/* Medidas y Fotos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-900/60 p-3 rounded-xl border border-dark-700/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray-light block mb-1">
                Medidas
              </span>
              <p className="text-white font-semibold">
                Peso: {valoracionInicial?.peso || 0} kg | Altura: {valoracionInicial?.altura || 0} cm
              </p>
            </div>

            <div className="bg-dark-900/60 p-3 rounded-xl border border-dark-700/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gray-light block mb-1">
                Fotografías
              </span>
              <p className="text-emerald-400 font-semibold">
                {filesCount > 0 ? `✓ ${filesCount} fotos adjuntas` : 'Sin fotos adjuntas'}
              </p>
            </div>
          </div>

          {/* Consentimientos */}
          <div className="p-3 rounded-xl bg-dark-900/40 border border-dark-700/40 text-[11px] text-dark-300">
            ✓ Política de Privacidad y consentimiento de datos sensibles aceptados.
            {consentimientos?.fotosCorporales && ' ✓ Autorización de fotos privadas para evaluación.'}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-dark-700/60 bg-dark-900/80 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-accent-gray-light hover:text-white hover:bg-dark-700 border border-dark-700 transition-colors"
          >
            Modificar Respuestas
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Guardando Evaluación...</span>
              </>
            ) : (
              <span>✓ Confirmar y Enviar Evaluación</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
