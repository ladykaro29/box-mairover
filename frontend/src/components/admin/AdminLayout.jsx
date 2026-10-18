import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊', exact: true },
    { name: 'Clientes', path: '/admin/clientes', icon: '👥' },
    { name: 'Pagos', path: '/admin/pagos', icon: '💰' },
    { name: 'Horarios', path: '/admin/horarios', icon: '📅' },
    { name: 'Procesos', path: '/admin/procesos', icon: '📈' },
    { name: 'Contactos', path: '/admin/contactos', icon: '✉️' },
  ];

  const handleLogout = async () => {
    // Descarta los tokens (local + aviso al backend) y vuelve al login
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-dark-900 text-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 w-64 bg-dark-800 border-r border-dark-700/50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-50 flex flex-col`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center border-b border-dark-700/60 px-4">
          <div className="flex items-center gap-2.5">
            <svg width="24" height="18" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4C5 4 6 2 9 2C12 2 13 4 16 4C19 4 20 2 23 2C26 2 27 4 29 4" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M2 10C5 10 6 8 9 8C12 8 13 10 16 10C19 10 20 8 23 8C26 8 27 10 29 10" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M2 16C5 16 6 14 9 14C12 14 13 16 16 16C19 16 20 14 23 14C26 14 27 16 29 16" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-black tracking-tight text-white">
              MAIROVER<span className="text-primary-500">FIT</span>
            </span>
            <span className="ml-1 text-[10px] font-extrabold px-2 py-0.5 bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded-full uppercase tracking-wider">
              ADMIN
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                    : 'text-blue-100/70 hover:text-white hover:bg-dark-700/60'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-dark-700/50">
          {user && (
            <div className="px-4 pb-3">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-dark-300 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700/50 transition-colors"
          >
            <span className="text-lg">🚪</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 md:hidden flex items-center justify-between px-4 bg-dark-800 border-b border-dark-700/50">
          <div className="text-xl font-bold">
            MAIROVER<span className="text-primary-500">FIT</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-dark-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Main View Scrollable Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
