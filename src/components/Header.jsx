import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// MODIFIKASI: Mengganti Info dengan BookOpen dan menghapus Map jika tidak dipakai
import { BarChart3, Home, BookOpen } from 'lucide-react'; 
import { X, Menu } from 'lucide-react';

const Header = () => {
  // Menggunakan useLocation dari react-router-dom untuk mendapatkan pathname saat ini
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    // MODIFIKASI: Menggunakan ikon BookOpen yang baru
    { path: '/story', label: 'Web Story', icon: BookOpen }, 
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    // { path: '/map', label: 'Peta Tematik', icon: Map },
  ];

  // State untuk mobile menu
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header 
      // MODIFIKASI: Menghapus bg-white/80 dan backdrop-blur-sm, diganti dengan bg-white
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0"
      style={{ zIndex: 55 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                {/* Logo Resmi Provinsi NTT */}
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="src/logo-ntt.png"
                    alt="Logo Provinsi Nusa Tenggara Timur"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-lg font-bold text-gray-900 leading-tight block">
                    Dashboard Stunting
                  </span>
                  <span className="text-sm text-gray-600 leading-tight block">
                    Provinsi Nusa Tenggara Timur
                  </span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Navigasi Desktop */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Buka menu utama</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-red-700 bg-red-100'
                      : 'text-gray-700 hover:text-red-700 hover:bg-red-100'
                  }`}
                  // Menutup menu mobile setelah klik
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;