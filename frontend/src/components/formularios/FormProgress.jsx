export default function FormProgress({ steps, currentStep, onStepClick }) {
  const percentage = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="w-full mb-8">
      {/* Percentage and step title */}
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
        <span className="text-primary-400">
          Paso {currentStep + 1} de {steps.length}: <span className="text-white">{steps[currentStep]}</span>
        </span>
        <span className="text-accent-gray-light">{percentage}% completado</span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-2.5 bg-dark-800 rounded-full overflow-hidden border border-dark-700/60 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-rose-400 transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Pills on Desktop */}
      <div className="hidden sm:flex justify-between items-center mt-3 gap-1">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onStepClick && idx <= currentStep && onStepClick(idx)}
              disabled={idx > currentStep}
              className={`flex items-center gap-1.5 text-[11px] font-semibold py-1 px-2.5 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40 shadow-sm'
                  : isDone
                  ? 'text-accent-gray-light hover:text-white cursor-pointer'
                  : 'text-dark-400 cursor-not-allowed'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  isCurrent
                    ? 'bg-primary-500 text-white'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-dark-700 text-dark-300'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </span>
              <span className="truncate max-w-[100px]">{step}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
