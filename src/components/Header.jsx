// Alternatif: Header dengan logo lokal (jika Anda download dan simpan di folder public)
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Map, Home, Info } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/story', label: 'Web Story', icon: Info },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    // { path: '/map', label: 'Peta Tematik', icon: Map },
  ];

  return (
    <header 
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 header-fixed"
      style={{ zIndex: 9999 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                {/* Logo Resmi Provinsi NTT dari file lokal */}
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="src/logo-ntt.png"  // Simpan logo di folder public/logo-ntt.png
                    alt="Logo Provinsi Nusa Tenggara Timur"
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      // Fallback jika gambar lokal tidak ada, gunakan dari Wikipedia
                      e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Coat_of_Arms_of_East_Nusa_Tenggara_NEW.png/100px-Coat_of_Arms_of_East_Nusa_Tenggara_NEW.png";
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900 leading-tight">
                    Dashboard Stunting
                  </span>
                  <span className="text-sm text-gray-600 leading-tight">
                    Provinsi Nusa Tenggara Timur
                  </span>
                </div>
              </Link>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;