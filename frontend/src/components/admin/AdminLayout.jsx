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
        <div className="h-20 flex items-center justify-center border-b border-dark-700/50">
          <div className="text-2xl font-bold tracking-tighter">
            MAIROVER<span className="text-primary-500">FIT</span>
            <span className="ml-2 text-xs font-medium px-2 py-1 bg-dark-700 rounded text-accent-gray-light">ADMIN</span>
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
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' 
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
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
