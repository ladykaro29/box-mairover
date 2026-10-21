export default function MedidasAntropometricas({ values, onChange, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value === '' ? '' : Number(value) >= 0 ? value : 0);
  };

  const fields = [
    { name: 'peso', label: 'Peso Actual (kg)', placeholder: 'Ej. 72.5', required: true, hint: 'Requerido para cálculo calórico' },
    { name: 'altura', label: 'Estatura (cm)', placeholder: 'Ej. 172', required: true, hint: 'En centímetros' },
    { name: 'cuello', label: 'Cuello (cm)', placeholder: '0 si no lo tienes' },
    { name: 'pecho', label: 'Pecho / Busto (cm)', placeholder: '0 si no lo tienes' },
    { name: 'cintura', label: 'Cintura (cm)', placeholder: 'A nivel del ombligo o más estrecho' },
    { name: 'abdomen', label: 'Abdomen (cm)', placeholder: 'Parte más prominente' },
    { name: 'cadera', label: 'Cadera / Glúteo (cm)', placeholder: 'Parte de mayor volumen' },
    { name: 'brazo', label: 'Brazo Relajado (cm)', placeholder: 'Punto medio del bíceps' },
    { name: 'muslo', label: 'Muslo (cm)', placeholder: 'Parte media del muslo' },
    { name: 'pantorrilla', label: 'Pantorrilla (cm)', placeholder: 'Parte de mayor volumen' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-sky-500/10 border border-sky-400/30 rounded-2xl p-4 text-xs text-sky-200 flex items-start gap-3">
        <span className="text-lg shrink-0">💡</span>
        <div>
          <strong className="block text-white mb-0.5">Indicación importante de las Coaches:</strong>
          Si alguna medida no la tienes a la mano en este momento, no te preocupes: puedes colocar un cero (
          <strong>0</strong>) o dejarla en blanco y continuar. Solo el peso y la estatura son obligatorios para la estimación de tu plan.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="bg-dark-900/60 p-4 rounded-xl border border-dark-700/60">
            <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-1">
              {field.label} {field.required && <span className="text-primary-500">*</span>}
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              name={field.name}
              value={values[field.name] ?? ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`w-full bg-dark-800 border ${
                errors?.[field.name] ? 'border-primary-500' : 'border-dark-700 focus:border-primary-500'
              } rounded-lg px-3 py-2.5 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors`}
            />
            {field.hint && <p className="text-[10px] text-dark-300 mt-1">{field.hint}</p>}
            {errors?.[field.name] && (
              <p className="text-xs text-primary-400 mt-1">⚠️ {errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-semibold text-accent-gray-light uppercase tracking-wider mb-1.5">
          Observaciones sobre tus medidas o complexión (opcional)
        </label>
        <textarea
          rows="2"
          name="observacionesMedidas"
          value={values.observacionesMedidas || ''}
          onChange={(e) => onChange('observacionesMedidas', e.target.value)}
          placeholder="Ej. Medidas tomadas en ayunas por la mañana / Retención de líquidos ocasional..."
          className="w-full bg-dark-800 border border-dark-700 focus:border-primary-500 rounded-xl p-3 text-sm text-white placeholder-dark-400 focus:outline-none transition-colors resize-none"
        />
      </div>
    </div>
  );
}
