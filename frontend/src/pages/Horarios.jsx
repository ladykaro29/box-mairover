import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../utils/api';

export default function Horarios() {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeDayMobile, setActiveDayMobile] = useState('Lunes');
  const [modalClass, setModalClass] = useState(null);

  const [liveClasses, setLiveClasses] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  // Categorías y paleta exacta del diseño
  const categories = {
    crossfit: {
      name: 'CrossFit',
      bg: 'bg-[#FEECE8]',
      text: 'text-[#C83D2D]',
      dot: 'bg-[#C83D2D]',
      border: 'border-[#F8C8C0]',
    },
    kids: {
      name: 'CrossFit Kids',
      bg: 'bg-[#EFE7FC]',
      text: 'text-[#6E38BF]',
      dot: 'bg-[#6E38BF]',
      border: 'border-[#D9C4F7]',
    },
    funcionales: {
      name: 'Funcionales',
      bg: 'bg-[#E1F2FC]',
      text: 'text-[#1869A8]',
      dot: 'bg-[#1869A8]',
      border: 'border-[#B6DFF8]',
    },
    hyrox: {
      name: 'Hyrox',
      bg: 'bg-[#FEF8DE]',
      text: 'text-[#8C7015]',
      dot: 'bg-[#8C7015]',
      border: 'border-[#F6E9A9]',
    },
    personal: {
      name: 'Entrenamiento Personal',
      bg: 'bg-[#FFEAD2]',
      text: 'text-[#AB6112]',
      dot: 'bg-[#AB6112]',
      border: 'border-[#FCD3A5]',
    },
    nutricion: {
      name: 'Asesoría Nutricional',
      bg: 'bg-[#DDF5F2]',
      text: 'text-[#137E70]',
      dot: 'bg-[#137E70]',
      border: 'border-[#B3E8E1]',
    },
    bienestar: {
      name: 'Bienestar Físico',
      bg: 'bg-[#E4F7E7]',
      text: 'text-[#217D38]',
      dot: 'bg-[#217D38]',
      border: 'border-[#BEE8C4]',
    },
    openbox: {
      name: 'Open Box',
      bg: 'bg-[#E8EAED]',
      text: 'text-[#55595E]',
      dot: 'bg-[#55595E]',
      border: 'border-[#D2D5D9]',
    },
  };

  // Carga de horarios en vivo desde la base de datos
  useEffect(() => {
    async function loadSchedule() {
      try {
        setLoadingSchedule(true);
        const data = await api.getPublicHorarios();
        if (data && Array.isArray(data)) {
          setLiveClasses(data);
        }
      } catch (err) {
        console.warn('Usando matriz local de respaldo para horarios:', err);
      } finally {
        setLoadingSchedule(false);
      }
    }
    loadSchedule();
  }, []);

  // Mapeo dinámico de disciplinas a claves de diseño
  const detectCategoryType = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('kids')) return 'kids';
    if (n.includes('crossfit') || n.includes('crosstraining') || n.includes('wod')) return 'crossfit';
    if (n.includes('funcional')) return 'funcionales';
    if (n.includes('hyrox')) return 'hyrox';
    if (n.includes('personal') || n.includes('1 a 1')) return 'personal';
    if (n.includes('nutrici')) return 'nutricion';
    if (n.includes('bienestar')) return 'bienestar';
    if (n.includes('open')) return 'openbox';
    return 'crossfit';
  };

  const getTargetDays = (dayStr) => {
    const s = (dayStr || '').toLowerCase();
    if (s.includes('lunes a viernes') || s.includes('lunes a vie')) {
      return ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    }
    if (s.includes('lunes, miércoles y viernes') || s.includes('lunes, miercoles y viernes') || s.includes('lun / mié / vie')) {
      return ['lunes', 'miercoles', 'viernes'];
    }
    if (s.includes('martes y jueves') || s.includes('mar / jue')) {
      return ['martes', 'jueves'];
    }
    if (s.includes('sábado') || s.includes('sabado') || s.includes('fin de semana')) {
      return ['sabado'];
    }
    const result = [];
    if (s.includes('lunes')) result.push('lunes');
    if (s.includes('martes')) result.push('martes');
    if (s.includes('miércoles') || s.includes('miercoles')) result.push('miercoles');
    if (s.includes('jueves')) result.push('jueves');
    if (s.includes('viernes')) result.push('viernes');
    if (s.includes('sábado') || s.includes('sabado')) result.push('sabado');
    return result.length > 0 ? result : ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  };

  const normalizeTimeToSlot = (timeStr) => {
    if (!timeStr) return null;
    const s = timeStr.toLowerCase();
    if (s.includes('06:00') || s.includes('6:00')) {
      if (s.includes('pm') || s.includes('18:00') || s.includes('tarde') || s.includes('noche')) return '6:00 p. m.';
      return '6:00 a. m.';
    }
    if (s.includes('07:00') || s.includes('7:00')) {
      if (s.includes('pm') || s.includes('19:00') || s.includes('noche')) return '7:00 p. m.';
      return '7:00 a. m.';
    }
    if (s.includes('08:00') || s.includes('8:00')) return '8:00 a. m.';
    if (s.includes('09:00') || s.includes('9:00')) return '9:00 a. m.';
    if (s.includes('10:00')) return '10:00 a. m.';
    if (s.includes('03:00') || s.includes('3:00') || s.includes('15:00')) return '3:00 p. m.';
    if (s.includes('04:00') || s.includes('4:00') || s.includes('16:00')) return '4:00 p. m.';
    if (s.includes('05:00') || s.includes('5:00') || s.includes('05:30') || s.includes('5:30') || s.includes('17:00')) return '5:00 p. m.';
    return null;
  };

  // Matriz base de respaldo
  const baseScheduleRows = [
    {
      time: '6:00 a. m.',
      lunes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 12 },
      martes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 14 },
      miercoles: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 13 },
      jueves: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 15 },
      viernes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 11 },
      sabado: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 20, enrolled: 18 },
    },
    {
      time: '7:00 a. m.',
      lunes: { name: 'Funcionales', type: 'funcionales', coach: 'Carlos', capacity: 15, enrolled: 8 },
      martes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 14 },
      miercoles: { name: 'Funcionales', type: 'funcionales', coach: 'Carlos', capacity: 15, enrolled: 8 },
      jueves: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 14 },
      viernes: { name: 'Funcionales', type: 'funcionales', coach: 'Carlos', capacity: 15, enrolled: 8 },
      sabado: { name: 'Hyrox', type: 'hyrox', coach: 'Carlos', capacity: 15, enrolled: 12 },
    },
    {
      time: '8:00 a. m.',
      lunes: { name: 'Bienestar Físico', type: 'bienestar', coach: 'Mairover', capacity: 12, enrolled: 6 },
      martes: { name: 'CrossFit', type: 'crossfit', coach: 'Carlos', capacity: 15, enrolled: 11 },
      miercoles: { name: 'Bienestar Físico', type: 'bienestar', coach: 'Mairover', capacity: 12, enrolled: 6 },
      jueves: { name: 'CrossFit', type: 'crossfit', coach: 'Carlos', capacity: 15, enrolled: 11 },
      viernes: { name: 'Bienestar Físico', type: 'bienestar', coach: 'Mairover', capacity: 12, enrolled: 6 },
      sabado: { name: 'CrossFit Kids', type: 'kids', coach: 'Carlos', capacity: 12, enrolled: 9 },
    },
    {
      time: '9:00 a. m.',
      lunes: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 3, enrolled: 3 },
      martes: { name: 'Asesoría Nutricional', type: 'nutricion', coach: 'Mairover', capacity: 2, enrolled: 2 },
      miercoles: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 3, enrolled: 3 },
      jueves: { name: 'Asesoría Nutricional', type: 'nutricion', coach: 'Mairover', capacity: 2, enrolled: 2 },
      viernes: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 3, enrolled: 3 },
      sabado: { name: 'Open Box', type: 'openbox', coach: 'Staff', capacity: 25, enrolled: 14 },
    },
    {
      time: '10:00 a. m.',
      lunes: { name: 'Open Box', type: 'openbox', coach: 'Staff', capacity: 20, enrolled: 9 },
      martes: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 3, enrolled: 2 },
      miercoles: { name: 'Open Box', type: 'openbox', coach: 'Staff', capacity: 20, enrolled: 9 },
      jueves: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 3, enrolled: 2 },
      viernes: { name: 'Open Box', type: 'openbox', coach: 'Staff', capacity: 20, enrolled: 9 },
      sabado: { name: 'Open Box', type: 'openbox', coach: 'Staff', capacity: 25, enrolled: 14 },
    },
    {
      time: '3:00 p. m.',
      lunes: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 4, enrolled: 3 },
      martes: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 4, enrolled: 3 },
      miercoles: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 4, enrolled: 3 },
      jueves: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 4, enrolled: 3 },
      viernes: { name: 'Entrenamiento Personal', type: 'personal', coach: 'Mairover', capacity: 4, enrolled: 3 },
      sabado: null,
    },
    {
      time: '4:00 p. m.',
      lunes: { name: 'CrossFit Kids', type: 'kids', coach: 'Carlos', capacity: 12, enrolled: 8 },
      martes: { name: 'Programa Bienestar Físico', type: 'bienestar', coach: 'Mairover', capacity: 12, enrolled: 7 },
      miercoles: { name: 'CrossFit Kids', type: 'kids', coach: 'Carlos', capacity: 12, enrolled: 8 },
      jueves: { name: 'Programa Bienestar Físico', type: 'bienestar', coach: 'Mairover', capacity: 12, enrolled: 7 },
      viernes: { name: 'CrossFit Kids', type: 'kids', coach: 'Carlos', capacity: 12, enrolled: 8 },
      sabado: null,
    },
    {
      time: '5:00 p. m.',
      lunes: { name: 'Funcionales', type: 'funcionales', coach: 'Carlos', capacity: 15, enrolled: 10 },
      martes: { name: 'Hyrox', type: 'hyrox', coach: 'Carlos', capacity: 15, enrolled: 13 },
      miercoles: { name: 'Funcionales', type: 'funcionales', coach: 'Carlos', capacity: 15, enrolled: 10 },
      jueves: { name: 'Hyrox', type: 'hyrox', coach: 'Carlos', capacity: 15, enrolled: 13 },
      viernes: { name: 'Funcionales', type: 'funcionales', coach: 'Carlos', capacity: 15, enrolled: 10 },
      sabado: null,
    },
    {
      time: '6:00 p. m.',
      lunes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 15 },
      martes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 15 },
      miercoles: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 15 },
      jueves: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 15 },
      viernes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 15 },
      sabado: null,
    },
    {
      time: '7:00 p. m.',
      lunes: { name: 'Hyrox', type: 'hyrox', coach: 'Carlos', capacity: 15, enrolled: 11 },
      martes: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 14 },
      miercoles: { name: 'Hyrox', type: 'hyrox', coach: 'Carlos', capacity: 15, enrolled: 11 },
      jueves: { name: 'CrossFit', type: 'crossfit', coach: 'Mairover', capacity: 15, enrolled: 14 },
      viernes: { name: 'Hyrox', type: 'hyrox', coach: 'Carlos', capacity: 15, enrolled: 11 },
      sabado: null,
    },
  ];

  // Construcción dinámica de la matriz: si hay clases en vivo en BD, se integran
  const scheduleRows = baseScheduleRows.map((row) => {
    if (!liveClasses || liveClasses.length === 0) return row;

    const updatedRow = { ...row };

    // Buscar si hay clases vivas que coincidan con este horario
    liveClasses.forEach((cls) => {
      const slotTime = normalizeTimeToSlot(cls.time);
      if (slotTime === row.time) {
        const days = getTargetDays(cls.day);
        days.forEach((d) => {
          updatedRow[d] = {
            id: cls.id,
            name: cls.name,
            type: detectCategoryType(cls.name),
            coach: cls.coach || 'Mauroly Mercado',
            capacity: cls.capacity || 15,
            enrolled: cls.enrolled || 0,
            originalTime: cls.time,
          };
        });
      }
    });

    return updatedRow;
  });

  const daysList = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const categoryCards = [
    {
      title: 'CROSSFIT',
      color: 'text-[#C83D2D]',
      borderColor: 'border-[#F8C8C0]',
      bgColor: 'bg-[#FEECE8]/40',
      icon: (
        <svg className="w-8 h-8 text-[#F43F5E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12h12M4 9a1 1 0 0 1 1-1h1v8H5a1 1 0 0 1-1-1V9zm14 0a1 1 0 0 1 1-1h1v8h-1a1 1 0 0 1-1-1V9zM2 10h1v4H2v-4zm19 0h1v4h-1v-4z" />
        </svg>
      ),
      horarios: [
        { label: 'Lunes a viernes:', value: '6:00 a. m. / 6:00 p. m.' },
        { label: 'Sábados:', value: '8:00 a. m.' },
      ],
    },
    {
      title: 'CROSSFIT KIDS',
      color: 'text-[#6E38BF]',
      borderColor: 'border-[#D9C4F7]',
      bgColor: 'bg-[#EFE7FC]/40',
      icon: (
        <svg className="w-8 h-8 text-[#6E38BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M4 19c0-2.5 2-4.5 4.5-4.5h1c2.5 0 4.5 2 4.5 4.5V20H4v-1z" />
          <path d="M14 19c0-1.8 1.4-3.2 3.2-3.2h.6c1.8 0 3.2 1.4 3.2 3.2V20h-7v-1z" />
        </svg>
      ),
      horarios: [
        { label: 'Lunes, miércoles y viernes:', value: '4:00 p. m.' },
        { label: 'Sábados:', value: '8:00 a. m.' },
      ],
    },
    {
      title: 'FUNCIONALES',
      color: 'text-[#1869A8]',
      borderColor: 'border-[#B6DFF8]',
      bgColor: 'bg-[#E1F2FC]/40',
      icon: (
        <svg className="w-8 h-8 text-[#1869A8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 8a4 4 0 0 1 8 0" />
          <path d="M6 10a6 6 0 0 1 12 0v7a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-7z" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      ),
      horarios: [
        { label: 'Lunes, miércoles y viernes:', value: '7:00 a. m. / 5:00 p. m.' },
      ],
    },
    {
      title: 'HYROX',
      color: 'text-[#8C7015]',
      borderColor: 'border-[#F6E9A9]',
      bgColor: 'bg-[#FEF8DE]/40',
      icon: (
        <svg className="w-8 h-8 text-[#8C7015]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="5" r="2" />
          <path d="M8 21l3-7l3 2l2 5" />
          <path d="M6 11l4 2l3-3l3 2" />
          <path d="M12 7l1 5" />
        </svg>
      ),
      horarios: [
        { label: 'Martes y jueves:', value: '5:00 p. m.' },
        { label: 'Lunes, miércoles y viernes:', value: '7:00 p. m.' },
      ],
    },
    {
      title: 'ENTRENAMIENTO PERSONAL',
      color: 'text-[#AB6112]',
      borderColor: 'border-[#FCD3A5]',
      bgColor: 'bg-[#FFEAD2]/40',
      icon: (
        <svg className="w-8 h-8 text-[#AB6112]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      horarios: [
        { label: 'Lunes a viernes:', value: '9:00 a. m., 10:00 a. m. y 3:00 p. m.' },
        { label: 'Modalidad:', value: 'Previa cita.' },
      ],
    },
    {
      title: 'ASESORÍA NUTRICIONAL / BIENESTAR FÍSICO',
      color: 'text-[#217D38]',
      borderColor: 'border-[#BEE8C4]',
      bgColor: 'bg-[#E4F7E7]/40',
      icon: (
        <svg className="w-8 h-8 text-[#217D38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5c-.667-1-1.5-1.5-2.5-1.5C7 3.5 5 5.5 5 8.5c0 4.5 3.5 7.5 7 9.5 3.5-2 7-5 7-9.5 0-3-2-5-4.5-5C13.5 3.5 12.667 4 12 5z" />
          <path d="M12 3.5V1.5" />
          <path d="M12 2c1 .5 1.5 1 2 2" />
        </svg>
      ),
      horarios: [
        { label: 'Martes y jueves:', value: '9:00 a. m.' },
        { label: 'Lunes, miércoles y viernes:', value: '8:00 a. m. / 4:00 p. m.' },
      ],
    },
  ];

  // Apertura de modal con detalles de la clase
  const handleCellClick = (item, time, day) => {
    if (!item) return;
    setModalClass({
      ...item,
      time,
      day,
    });
  };

  const getWhatsAppLink = (clase, hora, dia) => {
    const text = encodeURIComponent(
      `¡Hola Mairover! Me gustaría consultar disponibilidad o reservar mi cupo para la clase de ${clase} del día ${dia} a las ${hora}.`
    );
    return `https://wa.me/584147225979?text=${text}`;
  };

  return (
    <div className="bg-[#F9F9FA] text-[#071628] min-h-screen">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (100% FIEL AL DISEÑO)                     */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071628] via-[#09203a] to-[#0d2d52] text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
        {/* Decorative Wave Rings radiating from right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] pointer-events-none opacity-20">
          <div className="w-full h-full rounded-full border border-[#F43F5E] animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none opacity-25">
          <div className="w-full h-full rounded-full border border-[#F43F5E]"></div>
        </div>
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none opacity-30">
          <div className="w-full h-full rounded-full border border-[#F43F5E]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Columna Izquierda: Textos & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <span className="text-[#F43F5E] font-bold text-xs uppercase tracking-[0.25em] mb-3 animate-[fadeIn_0.5s_ease-out]">
                CALENDARIO DE CLASES
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] uppercase text-white mb-6">
                ORGANIZA <br />
                <span className="text-[#F43F5E]">TU SEMANA</span>
              </h1>

              <p className="text-[#C2C0B6] text-base md:text-lg mb-8 max-w-xl leading-relaxed">
                Encuentra el horario ideal para entrenar según tu nivel, tus objetivos y tu estilo de vida.
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#calendario-semanal"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  RESERVAR MI CLASE
                </a>

                <a
                  href="https://wa.me/584147225979?text=Hola%20Mairover,%20quisiera%20consultar%20sobre%20los%20horarios%20de%20entrenamiento"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  HABLAR POR WHATSAPP
                </a>
              </div>

              {/* Fila de Características (3 Icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[#F43F5E] flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Horarios flexibles</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Clases por nivel</h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E]/10 flex items-center justify-center text-[#F43F5E] flex-shrink-0">
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-white">Presencial y personalizado</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Foto de la Coach con máscara */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[480px]">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80"
                  alt="Coach Mairover"
                  className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071628] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <p className="text-white font-bold text-sm">Mauroly Mercado</p>
                  <p className="text-[#F43F5E] text-xs font-semibold">Head Coach & Nutricionista</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CALENDARIO SEMANAL (TABLA GRÁFICA INTERACTIVA)          */}
      {/* ========================================================= */}
      <section id="calendario-semanal" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#071628]">
            CALENDARIO <span className="text-[#F43F5E]">SEMANAL</span>
          </h2>
          <div className="h-1.5 w-20 bg-[#F43F5E] rounded-full mx-auto mt-3 mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Consulta la programación completa del box. Haz clic sobre cualquier clase para ver los detalles y agendar tu cupo.
          </p>
        </div>

        {/* Selector móvil de días (visible en pantallas pequeñas) */}
        <div className="lg:hidden mb-6 flex overflow-x-auto gap-2 pb-2">
          {daysList.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDayMobile(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeDayMobile === day
                  ? 'bg-[#F43F5E] text-white shadow-md shadow-[#F43F5E]/20'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Contenedor Principal de la Tabla */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden p-3 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1.5 md:border-spacing-2">
              <thead>
                <tr>
                  <th className="bg-[#071628] text-white text-xs md:text-sm font-bold uppercase tracking-wider py-3.5 px-3 rounded-lg text-center min-w-[90px]">
                    Hora
                  </th>
                  {daysList.map((day) => (
                    <th
                      key={day}
                      className={`bg-[#071628] text-white text-xs md:text-sm font-bold uppercase tracking-wider py-3.5 px-3 rounded-lg text-center min-w-[130px] md:min-w-[150px] ${
                        activeDayMobile !== day ? 'max-lg:hidden' : ''
                      }`}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((row, idx) => (
                  <tr key={idx}>
                    {/* Columna Hora */}
                    <td className="bg-white border border-gray-200 text-gray-800 text-xs md:text-sm font-bold py-3 px-2 rounded-lg text-center whitespace-nowrap">
                      {row.time}
                    </td>

                    {/* Columnas Días */}
                    {daysList.map((day) => {
                      const dayKey = day.toLowerCase().replace('é', 'e');
                      const item = row[dayKey];
                      const cat = item ? categories[item.type] : null;

                      return (
                        <td
                          key={day}
                          className={`${activeDayMobile !== day ? 'max-lg:hidden' : ''}`}
                        >
                          {item ? (
                            <button
                              onClick={() => handleCellClick(item, row.time, day)}
                              className={`w-full h-full py-2.5 px-2 md:py-3 md:px-3 rounded-lg text-center transition-all duration-200 cursor-pointer border ${cat.bg} ${cat.text} ${cat.border} hover:scale-[1.02] hover:shadow-md active:scale-95 flex flex-col items-center justify-center min-h-[52px] relative`}
                            >
                              <span className="text-[11px] md:text-xs font-extrabold leading-tight">
                                {item.name}
                              </span>
                              {item.capacity && (
                                <span className={`text-[9px] font-semibold mt-0.5 ${item.enrolled >= item.capacity ? 'text-red-500 font-bold' : 'opacity-75'}`}>
                                  {item.enrolled >= item.capacity ? 'Lleno' : `${item.capacity - item.enrolled} cupos`}
                                </span>
                              )}
                            </button>
                          ) : (
                            <div className="w-full h-full py-2.5 px-2 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 font-bold min-h-[48px]">
                              —
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leyenda de Categorías */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center md:text-left">
              Modalidades de Entrenamiento:
            </h4>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs font-medium text-gray-700">
              {Object.entries(categories).map(([key, cat]) => (
                <div key={key} className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.dot}`}></span>
                  <span className="font-semibold text-gray-800">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. HORARIOS POR CATEGORÍA (6 TARJETAS SVG)                */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#071628]">
              HORARIOS <span className="text-[#F43F5E]">POR CATEGORÍA</span>
            </h2>
            <div className="h-1.5 w-20 bg-[#F43F5E] rounded-full mx-auto mt-3 mb-4"></div>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Revisa los turnos fijos asignados para cada disciplina y planifica tus sesiones semanales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-center items-center group relative overflow-hidden"
              >
                {/* Accent top border strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${card.bgColor.replace('/40', '')}`}></div>

                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl ${card.bgColor} border ${card.borderColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>

                <h3 className="text-lg font-black tracking-tight text-[#071628] mb-4 uppercase">
                  {card.title}
                </h3>

                <div className="space-y-3 w-full border-t border-gray-100 pt-4 flex-grow">
                  {card.horarios.map((h, hIdx) => (
                    <div key={hIdx} className="text-xs">
                      <p className="text-gray-500 font-medium">{h.label}</p>
                      <p className="font-extrabold text-[#071628] text-sm mt-0.5">{h.value}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={getWhatsAppLink(card.title, 'los horarios asignados', 'semanal')}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 w-full py-2.5 px-4 bg-gray-50 hover:bg-[#F43F5E] text-gray-700 hover:text-white rounded-xl text-xs font-bold transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-200"
                >
                  <span>Consultar Cupos</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. HORARIO GENERAL DEL BOX (3 TARJETAS AZUL MARINO)       */}
      {/* ========================================================= */}
      <section className="py-16 md:py-20 bg-[#F9F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#071628]">
              HORARIO <span className="text-[#F43F5E]">GENERAL DEL BOX</span>
            </h2>
            <div className="h-1.5 w-20 bg-[#F43F5E] rounded-full mx-auto mt-3 mb-4"></div>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
              Franjas de apertura del box para clases guiadas y sesiones de Open Box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta 1: Mañana */}
            <div className="bg-[#071628] rounded-2xl p-8 border border-white/10 shadow-xl flex items-center gap-6 group hover:border-[#F43F5E]/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 flex items-center justify-center text-[#F43F5E] flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="2" x2="12" y2="9" />
                  <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                  <line x1="1" y1="18" x2="3" y2="18" />
                  <line x1="21" y1="18" x2="23" y2="18" />
                  <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                  <line x1="23" y1="22" x2="1" y2="22" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white/60 text-[11px] font-bold uppercase tracking-wider block">
                  Lunes a Viernes
                </span>
                <h3 className="text-2xl font-black text-[#F43F5E] tracking-tight uppercase">
                  MAÑANA
                </h3>
                <p className="text-white font-bold text-sm mt-1">
                  6:00 a. m. – 11:30 a. m.
                </p>
              </div>
            </div>

            {/* Tarjeta 2: Tarde / Noche */}
            <div className="bg-[#071628] rounded-2xl p-8 border border-white/10 shadow-xl flex items-center gap-6 group hover:border-[#F43F5E]/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 flex items-center justify-center text-[#F43F5E] flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white/60 text-[11px] font-bold uppercase tracking-wider block">
                  Lunes a Viernes
                </span>
                <h3 className="text-2xl font-black text-[#F43F5E] tracking-tight uppercase">
                  TARDE/NOCHE
                </h3>
                <p className="text-white font-bold text-sm mt-1">
                  3:00 p. m. – 8:00 p. m.
                </p>
              </div>
            </div>

            {/* Tarjeta 3: Sábados */}
            <div className="bg-[#071628] rounded-2xl p-8 border border-white/10 shadow-xl flex items-center gap-6 group hover:border-[#F43F5E]/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 flex items-center justify-center text-[#F43F5E] flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-white/60 text-[11px] font-bold uppercase tracking-wider block">
                  Fin de Semana
                </span>
                <h3 className="text-2xl font-black text-[#F43F5E] tracking-tight uppercase">
                  SÁBADOS
                </h3>
                <p className="text-white font-bold text-sm mt-1">
                  8:00 a. m. – 10:00 a. m.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. BOTTOM CTA BANNER: TU PRÓXIMA CLASE TE ESTÁ ESPERANDO   */}
      {/* ========================================================= */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#071628] via-[#0B2240] to-[#071628] border border-white/10 shadow-2xl p-8 sm:p-12 md:p-16">
          {/* Subtle Watermark Text */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/[0.03] font-black text-6xl md:text-8xl select-none pointer-events-none uppercase">
            MAIROVERFIT
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                TU PRÓXIMA CLASE <br />
                <span className="text-[#F43F5E]">TE ESTÁ ESPERANDO.</span>
              </h2>
              <p className="text-[#C2C0B6] text-sm sm:text-base mt-4 mb-8 max-w-lg leading-relaxed">
                Escríbeme y reserva el horario que mejor se adapte a ti. Te asesoramos desde tu primera sesión.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/584147225979?text=Hola%20Mairover,%20quiero%20agendar%20mi%20próxima%20clase%20en%20el%20box"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#F43F5E] hover:bg-[#E11D48] active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#F43F5E]/30 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                  </svg>
                  AGENDAR POR WHATSAPP
                </a>

                <Link
                  to="/contacto"
                  className="px-8 py-4 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 active:scale-95 text-white font-extrabold text-sm rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  SOLICITAR INFORMACIÓN
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80"
                  alt="Coach Mauroly"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FOOTER CORPORATIVO (100% FIEL AL DISEÑO)              */}
      {/* ========================================================= */}
      <footer className="bg-[#071628] py-12 border-t border-[#0B2240]/40 text-[#C2C0B6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex flex-col gap-[3px] justify-center h-8">
                <svg width="24" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4C5 4 6 2 9 2C12 2 13 4 16 4C19 4 20 2 23 2C26 2 27 4 29 4" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 10C5 10 6 8 9 8C12 8 13 10 16 10C19 10 20 8 23 8C26 8 27 10 29 10" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M2 16C5 16 6 14 9 14C12 14 13 16 16 16C19 16 20 14 23 14C26 14 27 16 29 16" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-[1.1] justify-center text-left">
                <span className="font-black text-lg tracking-wider text-white">
                  MAIROVER<span className="text-[#F43F5E]">Fit</span>
                </span>
                <span className="text-[7px] tracking-[0.25em] text-[#C2C0B6] uppercase font-bold">
                  COACH • NUTRICIÓN
                </span>
              </div>
            </Link>

            {/* Copyright */}
            <div className="text-xs text-center font-medium">
              © {new Date().getFullYear()} MairoverFit. Todos los derechos reservados.
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 text-[#C2C0B6]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://wa.me/584147225979" target="_blank" rel="noreferrer" className="hover:text-[#F43F5E] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.513 2.266 2.265 3.51 5.275 3.51 8.478-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.66.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.047-5.232-2.952-7.137C17.275 1.53 14.74.482 12.039.482 6.471.482 1.946 5.007 1.943 10.577c-.001 1.975.513 3.906 1.489 5.607L2.4 20.272l4.247-1.118z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 7. MODAL INTERACTIVO DE DETALLES Y RESERVA DE CLASE       */}
      {/* ========================================================= */}
      {modalClass && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative text-left">
            <button
              onClick={() => setModalClass(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className={`w-3.5 h-3.5 rounded-full ${categories[modalClass.type]?.dot || 'bg-[#F43F5E]'}`}></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F43F5E]">
                Detalles del Turno
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#071628] uppercase mb-1">
              {modalClass.name}
            </h3>
            <p className="text-gray-500 text-xs font-semibold mb-6">
              Día: <strong className="text-gray-800">{modalClass.day}</strong> • Horario: <strong className="text-gray-800">{modalClass.time}</strong>
            </p>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2 mb-6 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Coach responsable:</span>
                <span className="font-bold text-[#071628]">{modalClass.coach || 'Mauroly Mercado'}</span>
              </div>
              <div className="flex justify-between">
                <span>Aforo / Disponibilidad:</span>
                <span className={`font-bold ${(modalClass.enrolled || 0) >= (modalClass.capacity || 15) ? 'text-red-500' : 'text-emerald-600'}`}>
                  {(modalClass.enrolled || 0) >= (modalClass.capacity || 15)
                    ? 'Turno Lleno (Sin cupos)'
                    : `${(modalClass.capacity || 15) - (modalClass.enrolled || 0)} cupos disponibles (${modalClass.enrolled || 0}/${modalClass.capacity || 15})`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nivel requerido:</span>
                <span className="font-bold text-emerald-600">Todos los niveles</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={getWhatsAppLink(modalClass.name, modalClass.time, modalClass.day)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#F43F5E] hover:bg-[#E11D48] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#F43F5E]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reservar Cupo vía WhatsApp</span>
                <span>💬</span>
              </a>

              {isAuthenticated ? (
                <Link
                  to="/mi-cuenta"
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-[#071628] rounded-xl text-xs font-bold transition-colors flex items-center justify-center"
                >
                  Ver mis reservas en Mi Cuenta
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-[#071628] rounded-xl text-xs font-bold transition-colors flex items-center justify-center"
                >
                  ¿Ya eres miembro? Inicia sesión aquí
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
