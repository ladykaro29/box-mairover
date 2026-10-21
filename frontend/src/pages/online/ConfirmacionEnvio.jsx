import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { publicEvaluacionesApi } from '../../utils/api';

export default function ConfirmacionEnvio() {
  const { codigo } = useParams();
  const [loading, setLoading] = useState(true);
  const [evaluacion, setEvaluacion] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    async function loadConfirmation() {
      try {
        const data = await publicEvaluacionesApi.getConfirmacion(codigo);
        setEvaluacion(data);
      } catch (err) {
        console.warn('No se pudo cargar el detalle público:', err);
      } finally {
        setLoading(false);
      }
    }
    loadConfirmation();
  }, [codigo]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `👋 *¡Hola Coaches Mauroly y Mairover!*\n\n` +
    `Acabo de enviar mi *Formulario de Evaluación Inicial* en la web oficial de MairoverFit.\n\n` +
    `📋 *Código de Referencia:* ${codigo}\n` +
    `🎯 *Plan:* ${evaluacion?.planNombre || 'Plan Online'}\n\n` +
    `Deseo coordinar el pago (Zelle o Pago Móvil) para confirmar mi inscripción y comenzar.`
  );

  const whatsappUrl = `https://wa.me/584147225979?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white pt-28 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Main Success Card */}
        <div className="bg-dark-800/90 border border-dark-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-primary-500 to-sky-400" />

          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-emerald-500/20 animate-scale-in">
            ✓
          </div>

          <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-4 inline-block">
            Formulario Guardado Exitosamente
          </span>

          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-4">
            ¡Formulario recibido!
          </h1>

          <div className="text-accent-gray-light text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-light space-y-3">
            <p>
              Gracias por completar tu evaluación inicial{evaluacion?.clienteNombre ? `, ${evaluacion.clienteNombre}` : ''}.
              MairoverFit revisará la información enviada y continuará con los siguientes pasos de tu plan.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-sky-200">
              ⏱️ <strong>Compromiso oficial de entrega:</strong> La programación se enviará dentro de los siguientes 8 días hábiles después de confirmar el pago.
            </div>
          </div>

          {/* Reference Code Box */}
          <div className="bg-dark-900/90 border-2 border-primary-500/40 rounded-2xl p-6 max-w-md mx-auto mb-8 shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent-gray-light block mb-1">
              Tu Código de Referencia Único
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-wider">
                {codigo}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(codigo, 'ref')}
                className="px-3 py-1 bg-dark-800 hover:bg-dark-700 text-primary-400 text-xs font-bold rounded-lg border border-dark-700 transition-colors cursor-pointer"
              >
                {copiedKey === 'ref' ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
            <p className="text-[11px] text-accent-gray mt-2">
              Conserva este código para dar seguimiento a tu solicitud con tus entrenadoras.
            </p>
          </div>

          {/* Action: Connect with WhatsApp */}
          <div className="mb-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-emerald-500/25"
            >
              <span>Confirmar Envío y Pago por WhatsApp 📲</span>
            </a>
            <p className="text-[11px] text-accent-gray mt-2">
              Se abrirá WhatsApp con tu código de referencia listo para coordinar con la Coach.
            </p>
          </div>

          {/* Modalidades de Pago Oficiales */}
          <div className="border-t border-dark-700/60 pt-8 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-4 text-center">
              Datos Oficiales para Realizar tu Pago
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Zelle */}
              <div className="bg-dark-900 p-5 rounded-2xl border border-dark-700/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-purple-400">Zelle (USD)</span>
                  <span className="text-[9px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold uppercase">Internacional</span>
                </div>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-accent-gray text-[10px] uppercase block">Correo:</span>
                    <div className="flex items-center justify-between bg-dark-800 px-2.5 py-1.5 rounded-lg border border-dark-700 mt-0.5">
                      <span className="font-mono text-white text-[11px] font-semibold">yelimarmercado4@gmail.com</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('yelimarmercado4@gmail.com', 'zelle')}
                        className="text-[10px] text-primary-400 hover:text-white font-bold cursor-pointer"
                      >
                        {copiedKey === 'zelle' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-accent-gray text-[10px] uppercase block">Titular:</span>
                    <span className="text-white font-bold">Yelimar Mercado</span>
                  </div>
                </div>
              </div>

              {/* Pago Móvil */}
              <div className="bg-dark-900 p-5 rounded-2xl border border-dark-700/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-emerald-400">Pago Móvil (Bs)</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold uppercase">Venezuela</span>
                </div>
                <div className="text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-accent-gray">Banco:</span>
                    <span className="text-white font-semibold">Provincial (0108)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent-gray">Cédula:</span>
                    <span className="text-white font-semibold">17.027.249</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-accent-gray">Teléfono:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-white font-semibold">04147225979</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('04147225979', 'pm')}
                        className="text-[10px] text-emerald-400 hover:text-white font-bold cursor-pointer"
                      >
                        {copiedKey === 'pm' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-amber-300 font-medium pt-1">
                    Tasa oficial Euro BCV del día.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-dark-700/60 text-center">
            <Link
              to="/online"
              className="text-xs text-accent-gray hover:text-white transition-colors"
            >
              ← Volver a la página principal de Planes Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
