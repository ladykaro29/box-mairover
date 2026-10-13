import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
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

// Auth
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './components/common/ProtectedRoute';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Clientes from './pages/admin/Clientes';
import Pagos from './pages/admin/Pagos';
import HorariosAdmin from './pages/admin/HorariosAdmin';
import Procesos from './pages/admin/Procesos';
import Contactos from './pages/admin/Contactos';

import './App.css';

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-white text-dark-800">
    <Navbar />
    <div className="pt-20 flex-grow">
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Área privada del cliente */}
            <Route element={<ProtectedRoute />}>
              <Route path="/mi-cuenta" element={<MiCuenta />} />
            </Route>
          </Route>

          {/* Admin Routes — solo rol "admin" */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
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
