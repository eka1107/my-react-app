import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertTriangle, TrendingUp, Users, MapPin, Target, BarChart3, PieChart, Calendar, Lightbulb, ArrowRight, Heart, Baby, Utensils, Home, GraduationCap, Database } from 'lucide-react';

const WebStory = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Scroll handler untuk animasi
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.story-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
        
        setIsVisible(prev => ({
          ...prev,
          [index]: isInView
        }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data untuk visualisasi
  const nttStuntingData = {
    prevalensi: 37.8,
    nasional: 21.6,
    target: 14.0,
    kabupaten: [
      { name: 'Manggarai Timur', value: 45.2 },
      { name: 'Sumba Timur', value: 42.8 },
      { name: 'Lembata', value: 41.5 },
      { name: 'Flores Timur', value: 40.1 },
      { name: 'Kupang', value: 28.3 }
    ]
  };

  const faktarPenyebab = [
    { icon: Utensils, title: 'Gizi Buruk', percentage: 35, color: 'bg-red-500' },
    { icon: Home, title: 'Sanitasi Buruk', percentage: 28, color: 'bg-orange-500' },
    { icon: Home, title: 'Akses Kesehatan', percentage: 22, color: 'bg-yellow-500' },
    { icon: GraduationCap, title: 'Pendidikan', percentage: 15, color: 'bg-blue-500' }
  ];

  const dampakStunting = [
    { title: 'Penurunan IQ', value: '15%', icon: '🧠' },
    { title: 'Risiko Penyakit', value: '2x', icon: '💔' },
    { title: 'Produktivitas', value: '-20%', icon: '📉' },
    { title: 'Pendapatan', value: '-22%', icon: '💰' }
  ];

  const InteractiveChart = ({ data, title, type = 'bar' }) => {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        {type === 'bar' && (
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-600 truncate">
                  {item.name}
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 rounded-full h-3 transition-all duration-1000 ease-out"
                      style={{ width: `${(item.value / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-bold text-red-600 w-12">
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ComparisonChart = () => {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Perbandingan Prevalensi Stunting</h3>
        <div className="flex items-end justify-center space-x-8 h-64">
          <div className="flex flex-col items-center">
            <div 
              className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg w-16 transition-all duration-1000 ease-out"
              style={{ height: `${(nttStuntingData.prevalensi / 50) * 200}px` }}
            ></div>
            <div className="mt-2 text-center">
              <div className="text-2xl font-bold text-red-600">{nttStuntingData.prevalensi}%</div>
              <div className="text-sm text-gray-600">NTT</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div 
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-16 transition-all duration-1000 ease-out delay-300"
              style={{ height: `${(nttStuntingData.nasional / 50) * 200}px` }}
            ></div>
            <div className="mt-2 text-center">
              <div className="text-2xl font-bold text-blue-600">{nttStuntingData.nasional}%</div>
              <div className="text-sm text-gray-600">Nasional</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div 
              className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg w-16 transition-all duration-1000 ease-out delay-500"
              style={{ height: `${(nttStuntingData.target / 50) * 200}px` }}
            ></div>
            <div className="mt-2 text-center">
              <div className="text-2xl font-bold text-green-600">{nttStuntingData.target}%</div>
              <div className="text-sm text-gray-600">Target 2024</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
    return (
      <div className={`${color} rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300`}>
        <Icon className="w-8 h-8 mb-3 opacity-80" />
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-lg font-medium mb-1">{title}</div>
        <div className="text-sm opacity-80">{subtitle}</div>
      </div>
    );
  };

  const sections = [
    {
      id: 'hero',
      title: 'Stunting di NTT',
      subtitle: 'Sebuah Tantangan yang Mendesak',
      content: 'Nusa Tenggara Timur menghadapi tantangan serius dalam mengatasi stunting. Mari kita telusuri perjalanan dari masalah hingga solusinya.',
      visual: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl"></div>
          <div className="relative p-8 text-center">
            <Baby className="w-24 h-24 mx-auto text-red-500 mb-4" />
            <div className="text-6xl font-bold text-red-600 mb-2">37.8%</div>
            <div className="text-xl text-gray-700">Prevalensi Stunting di NTT</div>
          </div>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'Kondisi Mengkhawatirkan',
      subtitle: 'NTT: Tertinggi di Indonesia',
      content: 'Dengan prevalensi 37.8%, NTT memiliki angka stunting hampir dua kali lipat rata-rata nasional. Ini adalah kondisi darurat gizi yang memerlukan penanganan segera.',
      visual: <ComparisonChart />
    },
    {
      id: 'causes',
      title: 'Akar Permasalahan',
      subtitle: 'Faktor-faktor Penyebab Stunting',
      content: 'Stunting disebabkan oleh berbagai faktor yang saling terkait. Memahami akar masalah ini penting untuk merancang intervensi yang tepat.',
      visual: (
        <div className="grid grid-cols-2 gap-4">
          {faktarPenyebab.map((faktor, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
              <faktor.icon className="w-8 h-8 text-gray-600 mb-2" />
              <div className="text-sm font-medium text-gray-800 mb-2">{faktor.title}</div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`${faktor.color} rounded-full h-2 transition-all duration-1000`}
                  style={{ width: `${faktor.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">{faktor.percentage}%</div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'impact',
      title: 'Dampak Jangka Panjang',
      subtitle: 'Lebih dari Sekadar Tinggi Badan',
      content: 'Stunting tidak hanya mempengaruhi pertumbuhan fisik, tetapi juga perkembangan kognitif, produktivitas ekonomi, dan kualitas hidup secara keseluruhan.',
      visual: (
        <div className="grid grid-cols-2 gap-4">
          {dampakStunting.map((dampak, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-3xl mb-2">{dampak.icon}</div>
              <div className="text-2xl font-bold text-red-600 mb-1">{dampak.value}</div>
              <div className="text-sm text-gray-600">{dampak.title}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'regional',
      title: 'Variasi Regional',
      subtitle: 'Setiap Kabupaten Punya Cerita',
      content: 'Prevalensi stunting bervariasi antar kabupaten di NTT. Beberapa daerah memiliki angka yang sangat tinggi, sementara yang lain relatif lebih baik.',
      visual: <InteractiveChart data={nttStuntingData.kabupaten} title="5 Kabupaten Tertinggi" type="bar" />
    },
    {
      id: 'data-need',
      title: 'Mengapa Data Penting?',
      subtitle: 'Dari Data ke Kebijakan',
      content: 'Data yang akurat dan terperinci hingga level desa sangat penting untuk merancang intervensi yang efektif dan mengalokasikan sumber daya dengan tepat.',
      visual: (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-bold">Hierarki Data yang Dibutuhkan</h3>
            </div>
            <div className="space-y-3">
              {['Provinsi', 'Kabupaten/Kota', 'Kecamatan', 'Desa/Kelurahan'].map((level, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{level}</span>
                  <div className="ml-auto text-sm text-blue-600 font-medium">
                    Level {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'Solusi Berbasis Data',
      subtitle: 'Menuju NTT Bebas Stunting',
      content: 'Dengan data yang komprehensif hingga level administrasi terendah, kita dapat merancang program yang tepat sasaran dan mengukur dampaknya secara real-time.',
      visual: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            icon={Target}
            title="Target 2024"
            value="14%"
            subtitle="Prevalensi Stunting"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard 
            icon={Calendar}
            title="1000 Hari"
            value="Emas"
            subtitle="Periode Kritis"
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
          />
          <StatCard 
            icon={Users}
            title="Kolaborasi"
            value="Semua"
            subtitle="Pihak Terlibat"
            color="bg-gradient-to-br from-blue-500 to-purple-500"
          />
        </div>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-red-50"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Stunting di NTT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Perjalanan memahami tantangan stunting di Nusa Tenggara Timur dan pentingnya data untuk solusi yang tepat sasaran
            </p>
          </div>
          
          <div className="animate-bounce">
            <ChevronDown className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-gray-500 mt-2">Gulir untuk memulai perjalanan</p>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      {sections.map((section, index) => (
        <section 
          key={section.id}
          className={`story-section min-h-screen flex items-center py-20 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-reverse' : ''
            }`}>
              {/* Content */}
              <div className={`space-y-6 ${isVisible[index] ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-red-600 font-medium text-sm uppercase tracking-wide">
                      Bagian {index + 1} dari {sections.length}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-600">
                    {section.subtitle}
                  </h2>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {section.content}
                </p>

                {index === sections.length - 1 && (
                  <div className="flex space-x-4 pt-6">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center">
                      Lihat Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                    <button className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center">
                      Jelajahi Data <BarChart3 className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                )}
              </div>

              {/* Visual */}
              <div className={`${isVisible[index] ? 'animate-fade-in-up' : 'opacity-0'} ${
                index % 2 === 1 ? 'lg:order-first' : ''
              }`} style={{ animationDelay: '200ms' }}>
                {section.visual}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Lightbulb className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-4xl font-bold mb-6">Mari Bertindak Bersama</h2>
          <p className="text-xl mb-8 opacity-90">
            Dengan pemahaman yang mendalam tentang stunting dan data yang akurat, 
            kita dapat merancang solusi yang efektif untuk masa depan anak-anak NTT yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center">
              Mulai Eksplorasi Data <BarChart3 className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center">
              Pelajari Lebih Lanjut <Heart className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WebStory;