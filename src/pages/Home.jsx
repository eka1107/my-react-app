import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, MapPin, Users, AlertTriangle } from 'lucide-react';

const Home = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '37.8%',
      label: 'Prevalensi Stunting',
      description: 'Angka stunting di NTT tahun 2023',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: MapPin,
      value: '22',
      label: 'Kabupaten/Kota',
      description: 'Jumlah wilayah administrasi',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      value: '5.4M',
      label: 'Penduduk',
      description: 'Total populasi NTT',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: AlertTriangle,
      value: 'Tinggi',
      label: 'Status Risiko',
      description: 'Kategori risiko stunting',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const features = [
    {
      title: 'Web Story Interaktif',
      description: 'Jelajahi cerita stunting di NTT melalui narasi visual yang menarik',
      icon: '📖',
      link: '/story'
    },
    {
      title: 'Dashboard Visualisasi',
      description: 'Analisis data stunting dengan grafik dan chart yang informatif',
      icon: '📊',
      link: '/dashboard'
    },
    {
      title: 'Peta Tematik Dinamis',
      description: 'Lihat distribusi stunting di seluruh kabupaten NTT',
      icon: '🗺️',
      link: '/map'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Stunting di Nusa Tenggara Timur
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Platform visualisasi data stunting yang komprehensif untuk memahami dan mengatasi 
              masalah gizi kronis di Provinsi Nusa Tenggara Timur
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/story" className="btn-primary text-lg px-8 py-3">
                Mulai Jelajahi
              </Link>
              <Link to="/dashboard" className="btn-secondary text-lg px-8 py-3">
                Lihat Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fitur Utama Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jelajahi berbagai cara untuk memahami data stunting di NTT
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <Link to={feature.link} className="text-primary-600 hover:text-primary-700 font-medium">
                  Jelajahi →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tentang Stunting di NTT
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Stunting adalah masalah gizi kronis yang ditandai dengan tinggi badan anak di bawah standar 
                usianya. Di Nusa Tenggara Timur, prevalensi stunting masih tergolong tinggi dan memerlukan 
                perhatian serius dari berbagai pihak.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Platform ini menyajikan data dan visualisasi yang komprehensif untuk membantu pemahaman 
                mendalam tentang kondisi stunting di setiap kabupaten di NTT.
              </p>
              <Link to="/story" className="btn-primary">
                Pelajari Lebih Lanjut
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Data Terpercaya
                  </h3>
                  <p className="text-gray-600">
                    Sumber data dari BPS, Kemenkes, dan instansi terkait
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 