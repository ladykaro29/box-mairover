import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Planes from './pages/Planes';
import Servicios from './pages/Servicios';
import Horarios from './pages/Horarios';
import SobreMi from './pages/SobreMi';
import Comunidad from './pages/Comunidad';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import MiCuenta from './pages/MiCuenta';
import EnrutadorModalidad from './pages/EnrutadorModalidad';
import Online from './pages/Online';

import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';
import DescargoSalud from './pages/DescargoSalud';

// Layouts independientes por modalidad
import PresencialLayout from './components/layout/PresencialLayout';
import OnlineLayout from './components/layout/OnlineLayout';

// Auth
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './components/common/ProtectedRoute';

// Formularios Online
import FormularioPersonalizado from './pages/online/FormularioPersonalizado';
import FormularioNutricional from './pages/online/FormularioNutricional';
import FormularioBasico from './pages/online/FormularioBasico';
import ConfirmacionEnvio from './pages/online/ConfirmacionEnvio';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Clientes from './pages/admin/Clientes';
import Pagos from './pages/admin/Pagos';
import HorariosAdmin from './pages/admin/HorariosAdmin';
import Procesos from './pages/admin/Procesos';
import Contactos from './pages/admin/Contactos';
import EvaluacionesAdmin from './pages/admin/EvaluacionesAdmin';
import EvaluacionDetalleAdmin from './pages/admin/EvaluacionDetalleAdmin';
import ArchivosAdmin from './pages/admin/ArchivosAdmin';
import PlanesAdmin from './pages/admin/PlanesAdmin';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ===================================================================
              1. ENRUTADOR PRINCIPAL: Página limpia sin navegación ni pie
                 Permite seleccionar si se desea entrenar Presencial u Online
              =================================================================== */}
          <Route path="/" element={<EnrutadorModalidad />} />
          <Route path="/modalidad" element={<EnrutadorModalidad />} />
          <Route path="/empezar" element={<EnrutadorModalidad />} />

          {/* ===================================================================
              2. MODALIDAD PRESENCIAL: Con su propia navegación y pie de página
              =================================================================== */}
          <Route element={<PresencialLayout />}>
            <Route path="/presencial" element={<Home />} />
            <Route path="/presencial/horarios" element={<Horarios />} />
            <Route path="/presencial/planes" element={<Planes />} />
            <Route path="/presencial/servicios" element={<Servicios />} />
            <Route path="/presencial/contacto" element={<Contacto />} />

            {/* Rutas directas del Box */}
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Cuentas y Políticas */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/descargo-salud" element={<DescargoSalud />} />

            {/* Área privada del cliente */}
            <Route element={<ProtectedRoute />}>
              <Route path="/mi-cuenta" element={<MiCuenta />} />
            </Route>
          </Route>

          {/* ===================================================================
              3. MODALIDAD ONLINE: Con su propia navegación y pie de página
              =================================================================== */}
          <Route element={<OnlineLayout />}>
            <Route path="/online" element={<Online />} />
            <Route path="/online/formulario/personalizado" element={<FormularioPersonalizado />} />
            <Route path="/online/formulario/nutricional" element={<FormularioNutricional />} />
            <Route path="/online/formulario/basico" element={<FormularioBasico />} />
            <Route path="/online/formulario/confirmacion/:codigo" element={<ConfirmacionEnvio />} />
          </Route>

          {/* ===================================================================
              4. PANEL ADMINISTRATIVO: Solo rol "admin"
              =================================================================== */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="evaluaciones" element={<EvaluacionesAdmin />} />
              <Route path="evaluaciones/:id" element={<EvaluacionDetalleAdmin />} />
              <Route path="archivos" element={<ArchivosAdmin />} />
              <Route path="planes" element={<PlanesAdmin />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="pagos" element={<Pagos />} />
              <Route path="horarios" element={<HorariosAdmin />} />
              <Route path="procesos" element={<Procesos />} />
              <Route path="contactos" element={<Contactos />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
