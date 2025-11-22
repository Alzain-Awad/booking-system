import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { SystemDesign } from './pages/SystemDesign';
import { UserBooking } from './pages/UserBooking';
import { LayoutDashboard, UserCircle, Box, Menu, X } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
      active 
      ? 'bg-brand-50 text-brand-700 font-medium' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

const AppContent = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simple logic to switch between Admin and User views for demo
  const isAdmin = !location.pathname.includes('my-access');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">A</div>
            AccessPro
          </div>
        </div>
        
        <nav className="p-4 mt-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Platform</div>
          <SidebarItem to="/" icon={LayoutDashboard} label="Admin Dashboard" active={location.pathname === '/'} />
          <SidebarItem to="/design" icon={Box} label="System Design" active={location.pathname === '/design'} />
          
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-6">User Portal</div>
          <SidebarItem to="/my-access" icon={UserCircle} label="My Access & Bookings" active={location.pathname === '/my-access'} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <span className="font-bold text-slate-900">AccessPro</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/design" element={<SystemDesign />} />
              <Route path="/my-access" element={<UserBooking />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;