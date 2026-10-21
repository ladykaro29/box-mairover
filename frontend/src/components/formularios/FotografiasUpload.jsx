import { useEffect, useRef, useState } from 'react';

export default function FotografiasUpload({ files, onFilesChange, required = false }) {
  const [previews, setPreviews] = useState({
    fotoFrente: null,
    fotoPerfil: null,
    fotoEspalda: null,
  });

  const fileInputRefs = {
    fotoFrente: useRef(null),
    fotoPerfil: useRef(null),
    fotoEspalda: useRef(null),
  };

  // Generar previews cuando cambian los archivos
  useEffect(() => {
    const newPreviews = {};
    for (const key of ['fotoFrente', 'fotoPerfil', 'fotoEspalda']) {
      if (files[key] instanceof File) {
        newPreviews[key] = URL.createObjectURL(files[key]);
      } else {
        newPreviews[key] = null;
      }
    }
    setPreviews(newPreviews);

    return () => {
      // Liberar memoria de ObjectURLs
      Object.values(newPreviews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  const handleSelectFile = (key, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Solo se admiten archivos de imagen (JPEG, PNG o WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen no debe superar los 10 MB.');
      return;
    }

    onFilesChange({
      ...files,
      [key]: file,
    });
  };

  const handleRemove = (key) => {
    if (fileInputRefs[key]?.current) {
      fileInputRefs[key].current.value = '';
    }
    onFilesChange({
      ...files,
      [key]: null,
    });
  };

  const slots = [
    { key: 'fotoFrente', label: 'Foto de Frente', icon: '👤', tip: 'Postura natural y erguida' },
    { key: 'fotoPerfil', label: 'Foto de Perfil', icon: '🚶', tip: 'De lado, brazos relajados' },
    { key: 'fotoEspalda', label: 'Foto de Espalda', icon: '🧘', tip: 'Buena iluminación general' },
  ];

  return (
    <div className="space-y-6">
      {/* Privacy Alert */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-xs text-emerald-200">
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0">🔒</span>
          <div>
            <strong className="block text-white font-bold mb-1">
              Garantía de Confidencialidad y Seguridad MairoverFit
            </strong>
            <p className="leading-relaxed">
              Tus fotografías son 100% privadas y se emplean exclusivamente para que las Head Coaches analicen tu estructura,
              postura y recomposición corporal. En el servidor se eliminan automáticamente los metadatos EXIF (ubicación GPS y
              datos del dispositivo).
              <span className="block mt-1 font-semibold text-white">
                ⚠️ Ninguna imagen será divulgada ni compartida en redes sociales sin tu consentimiento explícito por separado.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Upload Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slots.map((slot) => {
          const previewUrl = previews[slot.key];

          return (
            <div
              key={slot.key}
              className="bg-dark-900/60 border border-dark-700/60 rounded-2xl p-5 flex flex-col items-center justify-between text-center relative overflow-hidden transition-all hover:border-dark-600"
            >
              <div className="w-full mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {slot.label}
                </span>
                <span className="text-[10px] text-accent-gray-light bg-dark-800 px-2 py-0.5 rounded-full border border-dark-700">
                  {slot.tip}
                </span>
              </div>

              {/* Preview or Placeholder Box */}
              <div className="w-full aspect-[3/4] bg-dark-800 rounded-xl border-2 border-dashed border-dark-700 hover:border-primary-500/50 flex flex-col items-center justify-center p-2 relative group overflow-hidden transition-colors">
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt={slot.label}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-dark-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRefs[slot.key].current?.click()}
                        className="px-3 py-1.5 bg-primary-500 text-white rounded-lg text-xs font-semibold shadow hover:bg-primary-600"
                      >
                        Cambiar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(slot.key)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRefs[slot.key].current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center text-dark-300 hover:text-primary-400 cursor-pointer p-4 transition-colors"
                  >
                    <span className="text-4xl mb-2">{slot.icon}</span>
                    <span className="text-xs font-bold text-white mb-1">Subir fotografía</span>
                    <span className="text-[11px] text-accent-gray">JPG, PNG o WebP (Máx. 10MB)</span>
                  </button>
                )}

                <input
                  ref={fileInputRefs[slot.key]}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleSelectFile(slot.key, e)}
                />
              </div>

              <div className="w-full mt-3">
                {previewUrl ? (
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                    <span>✓</span> Imagen lista para envío
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRefs[slot.key].current?.click()}
                    className="w-full py-2 bg-dark-800 hover:bg-dark-700 text-accent-gray-light hover:text-white rounded-lg text-xs font-semibold border border-dark-700 transition-colors"
                  >
                    Seleccionar o Tomar Foto 📸
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
