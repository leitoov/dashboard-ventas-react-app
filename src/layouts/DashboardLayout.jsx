import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { MessageSquare, PackagePlus, LogOut, LayoutDashboard } from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-lg z-10 relative">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-primaryGreen p-2 rounded-xl">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Admin<span className="text-primaryGreen">Panel</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink 
            to="/dashboard/chat-general" 
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-primaryGreen/10 text-primaryGreen shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-primaryGreen'}`}
          >
            <MessageSquare className="w-5 h-5" />
            Chat General IA
          </NavLink>
          
          <NavLink 
            to="/dashboard/chat-productos" 
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-primaryBrown/10 text-primaryBrown shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-primaryBrown'}`}
          >
            <PackagePlus className="w-5 h-5" />
            Gestión de Productos
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gray-50/50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
