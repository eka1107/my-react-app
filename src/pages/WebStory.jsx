import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertTriangle, TrendingUp, Users, MapPin, Target, BarChart3, PieChart, Calendar, Lightbulb, ArrowRight, Heart, Baby, Utensils, Home, GraduationCap, Database, Eye, Zap, Shield, Brain, DollarSign, Activity } from 'lucide-react';

const WebStory = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [animatedValues, setAnimatedValues] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Scroll handler untuk animasi
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.story-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
        
        setIsVisible(prev => {
          // Untuk section 7 ke atas, jangan fade out setelah muncul
          if (index >= 6 && prev[index]) {
            return { ...prev, [index]: true };
          }
          return { ...prev, [index]: isInView };
        });

        if (isInView) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animasi untuk nilai-nilai statistik
  useEffect(() => {
    if (isVisible[0]) {
      setTimeout(() => {
        setAnimatedValues(prev => ({ ...prev, stunting: 37.8 }));
      },
    {
      id: 'sdgs',
      background: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      title: 'Komitmen Global',
      subtitle: 'SDGs Target 2.2: Mengakhiri Malnutrisi',
      content: 'Sustainable Development Goals (SDGs) target 2.2 berkomitmen mengakhiri segala bentuk malnutrisi pada tahun 2030, termasuk stunting pada anak di bawah 5 tahun. NTT berperan penting dalam mencapai target global ini melalui data yang akurat dan program yang tepat sasaran.',
      visual: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            {/* SDG Logo 2.2 */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-center">
                  <div className="text-xs mb-1">SDG</div>
                  <div className="text-2xl">2.2</div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🌱</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Target 2.2: Zero Hunger</h3>
            <p className="text-sm text-gray-600 mb-6">
              Mengakhiri segala bentuk malnutrisi pada tahun 2030, termasuk stunting pada balita
            </p>
            
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 bg-green-50 rounded-lg transform transition-all duration-700 ${
                isVisible[9] ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`} style={{ 
                transitionDelay: '200ms',
                transform: isVisible[9] ? 'translateX(0)' : 'translateX(16px)',
                opacity: isVisible[9] ? 1 : 0
              }}>
                <span className="text-sm font-medium text-green-800">Target Global 2030</span>
                <span className="text-lg font-bold text-green-600">14%</span>
              </div>
              <div className={`flex items-center justify-between p-3 bg-orange-50 rounded-lg transform transition-all duration-700 ${
                isVisible[9] ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`} style={{ 
                transitionDelay: '400ms',
                transform: isVisible[9] ? 'translateX(0)' : 'translateX(16px)',
                opacity: isVisible[9] ? 1 : 0
              }}>
                <span className="text-sm font-medium text-orange-800">NTT Saat Ini</span>
                <span className="text-lg font-bold text-orange-600">37.8%</span>
              </div>
              <div className={`flex items-center justify-between p-3 bg-blue-50 rounded-lg transform transition-all duration-700 ${
                isVisible[9] ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`} style={{ 
                transitionDelay: '600ms',
                transform: isVisible[9] ? 'translateX(0)' : 'translateX(16px)',
                opacity: isVisible[9] ? 1 : 0
              }}>
                <span className="text-sm font-medium text-blue-800">Gap yang Harus Diturunkan</span>
                <span className="text-lg font-bold text-blue-600">-23.8%</span>
              </div>
            </div>

            <div className={`mt-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl transform transition-all duration-700 ${
              isVisible[9] ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`} style={{ 
              transitionDelay: '800ms',
              transform: isVisible[9] ? 'scale(1)' : 'scale(0.95)',
              opacity: isVisible[9] ? 1 : 0
            }}>
              <div className="flex items-center justify-center space-x-2 text-indigo-900">
                <Target className="w-5 h-5" />
                <span className="font-semibold text-sm">SAE + Data = Monitoring Progress SDGs</span>
              </div>
            </div>
          </div>
        </div>
      )
    }, 500);
    }
    if (isVisible[1]) {
      setTimeout(() => {
        setAnimatedValues(prev => ({ ...prev, comparison: true }));
      }, 300);
    }
  }, [isVisible]);

  // Data untuk visualisasi
  const stuntingStats = {
    ntt: 37.8,
    nasional: 21.6,
    target: 14.0,
    affected: 204000 // estimasi anak terdampak
  };

  const regionalData = [
    { name: 'Manggarai Timur', value: 45.2, color: 'bg-red-600' },
    { name: 'Sumba Timur', value: 42.8, color: 'bg-red-500' },
    { name: 'Lembata', value: 41.5, color: 'bg-orange-600' },
    { name: 'Flores Timur', value: 40.1, color: 'bg-orange-500' },
    { name: 'Kupang', value: 28.3, color: 'bg-yellow-500' }
  ];

  const causesData = [
    { icon: Utensils, title: 'Gizi Buruk', desc: 'Kekurangan asupan makanan bergizi', percentage: 35, color: 'from-red-500 to-red-600' },
    { icon: Home, title: 'Sanitasi Buruk', desc: 'Akses air bersih dan sanitasi terbatas', percentage: 28, color: 'from-orange-500 to-orange-600' },
    { icon: Activity, title: 'Akses Kesehatan', desc: 'Layanan kesehatan yang tidak memadai', percentage: 22, color: 'from-yellow-500 to-yellow-600' },
    { icon: GraduationCap, title: 'Pendidikan', desc: 'Kurangnya pengetahuan ibu tentang gizi', percentage: 15, color: 'from-blue-500 to-blue-600' }
  ];

  const impactData = [
    { title: 'Penurunan IQ', value: '15 Poin', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Risiko Penyakit', value: '2x Lipat', icon: Shield, color: 'text-red-600', bg: 'bg-red-100' },
    { title: 'Produktivitas Ekonomi', value: '-20%', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Tinggi Badan', value: '-7.5cm', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' }
  ];

  // Komponen untuk statistik cards
  const StatCard = ({ icon: Icon, title, value, subtitle, color, delay = 0 }) => (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform transition-all duration-700 hover:scale-105 ${
        isVisible[currentSection] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-700 mb-1">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );

  // Komponen untuk progress bar animasi
  const AnimatedProgress = ({ percentage, color, delay = 0 }) => {
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
      if (isVisible[currentSection]) {
        setTimeout(() => setWidth(percentage), delay);
      }
    }, [isVisible, currentSection, percentage, delay]);

    return (
      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`bg-gradient-to-r ${color} rounded-full h-3 transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    );
  };

  // Komponen chart untuk perbandingan
  const ComparisonChart = () => (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Perbandingan Prevalensi Stunting</h3>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">NTT</span>
            <span className="text-lg font-bold text-red-600">37.8%</span>
          </div>
          <AnimatedProgress percentage={75.6} color="from-red-500 to-red-600" delay={200} />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Nasional</span>
            <span className="text-lg font-bold text-orange-600">21.6%</span>
          </div>
          <AnimatedProgress percentage={43.2} color="from-orange-500 to-orange-600" delay={400} />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Target WHO</span>
            <span className="text-lg font-bold text-green-600">14.0%</span>
          </div>
          <AnimatedProgress percentage={28} color="from-green-500 to-green-600" delay={600} />
        </div>
      </div>
    </div>
  );



  const sections = [
    {
      id: 'hero',
      background: 'bg-gradient-to-br from-red-50 via-white to-orange-50',
      title: 'Krisis Tersembunyi',
      subtitle: 'Stunting di Nusa Tenggara Timur',
      content: 'Di balik keindahan alam NTT, tersembunyi krisis gizi yang mengancam masa depan 204.000 anak. Mari kita bongkar data dan temukan solusinya.',
      visual: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard 
            icon={AlertTriangle}
            title="Prevalensi Stunting"
            value="37.8%"
            subtitle="Tertinggi ke-2 di Indonesia"
            color="bg-gradient-to-br from-red-500 to-red-600"
            delay={200}
          />
          <StatCard 
            icon={Baby}
            title="Anak Terdampak"
            value="204K"
            subtitle="Estimasi jumlah balita stunting"
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            delay={400}
          />
        </div>
      )
    },
    {
      id: 'problem',
      background: 'bg-gradient-to-br from-gray-50 to-blue-50',
      title: 'Seberapa Parah?',
      subtitle: 'Membandingkan dengan Standar Nasional',
      content: 'Angka stunting NTT mencapai 37.8%, hampir dua kali lipat rata-rata nasional. Ini adalah kondisi darurat gizi yang memerlukan penanganan segera.',
      visual: <ComparisonChart />
    },
    {
      id: 'causes',
      background: 'bg-gradient-to-br from-blue-50 to-purple-50',
      title: 'Akar Permasalahan',
      subtitle: 'Faktor-faktor Penyebab Stunting',
      content: 'Stunting disebabkan oleh berbagai faktor yang saling terkait. Memahami akar masalah ini penting untuk merancang intervensi yang tepat.',
      visual: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {causesData.map((cause, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform transition-all duration-700 hover:scale-105 ${
                isVisible[2] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${cause.color} rounded-xl flex items-center justify-center mb-4`}>
                <cause.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900 mb-2">{cause.title}</div>
              <div className="text-sm text-gray-600 mb-4">{cause.desc}</div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500">Kontribusi</span>
                <span className="text-sm font-bold text-gray-900">{cause.percentage}%</span>
              </div>
              <AnimatedProgress percentage={cause.percentage * 2} color={cause.color} delay={500 + index * 100} />
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'impact',
      background: 'bg-gradient-to-br from-purple-50 to-pink-50',
      title: 'Dampak Jangka Panjang',
      subtitle: 'Lebih dari Sekadar Tinggi Badan',
      content: 'Stunting tidak hanya mempengaruhi pertumbuhan fisik, tetapi juga perkembangan kognitif, produktivitas ekonomi, dan kualitas hidup secara keseluruhan.',
      visual: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactData.map((impact, index) => (
            <div 
              key={index}
              className={`${impact.bg} rounded-2xl p-6 text-center transform transition-all duration-700 hover:scale-105 ${
                isVisible[3] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <impact.icon className={`w-12 h-12 ${impact.color} mx-auto mb-4`} />
              <div className={`text-2xl font-bold ${impact.color} mb-2`}>{impact.value}</div>
              <div className="text-sm font-medium text-gray-700">{impact.title}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'regional',
      background: 'bg-gradient-to-br from-green-50 to-teal-50',
      title: 'Variasi Regional',
      subtitle: 'Setiap Kabupaten Punya Cerita',
      content: 'Prevalensi stunting bervariasi antar kabupaten di NTT. Beberapa daerah memiliki angka yang sangat tinggi, sementara yang lain relatif lebih baik.',
      visual: (
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">5 Kabupaten dengan Prevalensi Tertinggi</h3>
          <div className="space-y-4">
            {regionalData.map((region, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-4 transform transition-all duration-700 ${
                  isVisible[4] ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{region.name}</span>
                    <span className="text-lg font-bold text-red-600">{region.value}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${region.color} rounded-full h-2 transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible[4] ? `${(region.value / 50) * 100}%` : '0%',
                        transitionDelay: `${500 + index * 100}ms`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'solution',
      background: 'bg-gradient-to-br from-teal-50 to-cyan-50',
      title: 'Solusi Berbasis Data',
      subtitle: 'Menuju NTT Bebas Stunting',
      content: 'Dengan data yang komprehensif hingga level administrasi terendah, kita dapat merancang program yang tepat sasaran dan mengukur dampaknya secara real-time.',
      visual: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={Target}
            title="Target 2024"
            value="14%"
            subtitle="Prevalensi Stunting"
            color="bg-gradient-to-br from-green-500 to-green-600"
            delay={200}
          />
          <StatCard 
            icon={Calendar}
            title="1000 Hari"
            value="Emas"
            subtitle="Periode Kritis"
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
            delay={400}
          />
          <StatCard 
            icon={Users}
            title="Kolaborasi"
            value="Semua"
            subtitle="Pihak Terlibat"
            color="bg-gradient-to-br from-blue-500 to-purple-500"
            delay={600}
          />
        </div>
      )
    },
    {
      id: 'data-limitation',
      background: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      title: 'Tantangan Data',
      subtitle: 'Keterbatasan Data SKI dan Kebutuhan SAE',
      content: 'Data SSGI hanya tersedia hingga kabupaten/kota. Untuk program yang efektif, kita butuh data level kecamatan menggunakan Small Area Estimation (SAE).',
      visual: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <Database className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900">Ketersediaan Data Saat Ini</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { level: 'Provinsi', available: true, source: 'SSGI 2023' },
                { level: 'Kabupaten/Kota', available: true, source: 'SSGI 2023' },
                { level: 'Kecamatan', available: false, source: 'Perlu SAE' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transform transition-all duration-700 ${
                    item.available 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-orange-200 bg-orange-50'
                  } ${isVisible[6] ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.available ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="font-medium text-gray-800 text-sm">{item.level}</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium ${
                      item.available ? 'text-green-700' : 'text-orange-700'
                    }`}>
                      {item.available ? '✓ Ada' : '✗ Perlu SAE'}
                    </div>
                    <div className="text-xs text-gray-600">{item.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <h4 className="text-base font-bold text-amber-900 mb-1">Gap Data Kritis</h4>
            <p className="text-sm text-amber-800">
              22 kabupaten → <strong>300+ kecamatan</strong> butuh estimasi SAE
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sae-solution',
      background: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      title: 'Solusi Cerdas: SAE',
      subtitle: 'Ketika Data Tidak Ada, Kita Bisa Memperkirakan',
      content: 'Small Area Estimation (SAE) seperti seorang detektif yang pintar - menggunakan petunjuk dari area sekitar untuk menebak kondisi di tempat yang datanya belum ada. Sederhana tapi powerful!',
      visual: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Bagaimana SAE Bekerja?</h3>
            </div>
            
            {/* Ilustrasi sederhana dengan emoji */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="text-6xl mb-3">🏘️</div>
                <div className="bg-blue-100 rounded-xl p-4">
                  <div className="font-bold text-blue-900">Kabupaten A</div>
                  <div className="text-2xl font-bold text-red-600">37.8%</div>
                  <div className="text-sm text-blue-700">Data SSGI tersedia</div>
                </div>
              </div>
              
              <div className="text-4xl text-purple-500">🧠</div>
              
              <div className="text-center">
                <div className="text-6xl mb-3">🎯</div>
                <div className="bg-green-100 rounded-xl p-4">
                  <div className="font-bold text-green-900">Kecamatan X</div>
                  <div className="text-2xl font-bold text-orange-600">~35%</div>
                  <div className="text-sm text-green-700">Estimasi SAE</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 text-center">
              <p className="text-purple-900 font-medium">
                💡 <strong>Analogi:</strong> Seperti menebak cuaca di kampung berdasarkan pola cuaca kota tetangga
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'remote-sensing',
      background: 'bg-gradient-to-br from-sky-50 to-blue-50',
      title: 'Mata di Langit',
      subtitle: 'Satelit Membantu Kita "Melihat" Kondisi Lapangan',
      content: 'Citra satelit adalah mata kita di langit yang bisa melihat hal-hal penting seperti seberapa hijau tanaman dan seberapa terang lampu malam. Informasi ini membantu SAE membuat perkiraan yang lebih tepat.',
      visual: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Apa yang Dilihat Satelit?</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: '🌱', title: 'Kehijauan', desc: 'Seberapa subur pertanian' },
                { emoji: '🌃', title: 'Cahaya Malam', desc: 'Tingkat pembangunan' },
                { emoji: '🏡', title: 'Pemukiman', desc: 'Kepadatan penduduk' },
                { emoji: '🛣️', title: 'Infrastruktur', desc: 'Akses jalan & fasilitas' }
              ].map((item, index) => {
                const isAnimated = isVisible[7];
                return (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl p-4 text-center transform transition-all duration-700 hover:scale-105 ${
                      isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 200}ms`,
                      transform: isAnimated ? 'translateY(0)' : 'translateY(32px)',
                      opacity: isAnimated ? 1 : 0
                    }}
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="font-bold text-sky-900 text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-sky-700">{item.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="text-3xl">🛰️</div>
                <div className="text-xl text-sky-600">+</div>
                <div className="text-3xl">🧠</div>
                <div className="text-xl text-sky-600">=</div>
                <div className="text-3xl">🎯</div>
              </div>
              <div className="text-center mt-2">
                <p className="text-sky-900 font-medium text-sm">Satelit + SAE = Estimasi Akurat</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'conclusion',
      background: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      title: 'Kesimpulan',
      subtitle: 'SAE + Citra Satelit = Solusi Cerdas untuk Data yang Tidak Ada',
      content: 'Dengan kombinasi Small Area Estimation dan citra satelit, kita bisa mengisi gap data stunting di level kecamatan. Ini memberikan dasar yang kuat untuk merancang program pencegahan stunting yang tepat sasaran di seluruh NTT.',
      visual: (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Manfaat Utama</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`text-center transform transition-all duration-700 ${
                isVisible[8] ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ 
                transitionDelay: '200ms',
                transform: isVisible[8] ? 'translateY(0)' : 'translateY(16px)',
                opacity: isVisible[8] ? 1 : 0
              }}>
                <div className="text-4xl mb-3">📍</div>
                <h4 className="font-bold text-emerald-900 mb-2">Data Level Kecamatan</h4>
                <p className="text-sm text-emerald-700">
                  Estimasi prevalensi stunting untuk 300+ kecamatan di NTT
                </p>
              </div>
              
              <div className={`text-center transform transition-all duration-700 ${
                isVisible[8] ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ 
                transitionDelay: '400ms',
                transform: isVisible[8] ? 'translateY(0)' : 'translateY(16px)',
                opacity: isVisible[8] ? 1 : 0
              }}>
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-bold text-emerald-900 mb-2">Program Tepat Sasaran</h4>
                <p className="text-sm text-emerald-700">
                  Intervensi yang lebih fokus dan efektif di daerah prioritas
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className={`transform transition-all duration-700 ${
              isVisible[8] ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`} style={{ 
              transitionDelay: '600ms',
              transform: isVisible[8] ? 'scale(1)' : 'scale(0.95)',
              opacity: isVisible[8] ? 1 : 0
            }}>
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl shadow-lg">
                <Heart className="w-6 h-6" />
                <span className="font-semibold text-lg">Menuju NTT Bebas Stunting</span>
                <Heart className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative">
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
        />
      </div>

      {/* Floating Fullscreen Button */}
      <button
        onClick={() => setIsFullscreen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center group"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <div className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Tampilan Fullscreen
        </div>
      </button>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-[100] overflow-y-auto">
          {/* Close Button - Paling Depan */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="fixed top-6 right-6 w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-[101] shadow-2xl border-2 border-white"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Fullscreen Story Content */}
          <div className="min-h-screen">{sections.map((section, index) => (
              <section 
                key={section.id}
                id={`fullscreen-section-${index}`}
                className={`min-h-screen flex items-center ${section.background} relative overflow-hidden`}
              >
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-4 lg:space-y-6">
                      <div>
                        <div className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-red-600 mb-3">
                          Bagian {index + 1} dari {sections.length}
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
                          {section.title}
                        </h2>
                        <h3 className="text-lg md:text-xl lg:text-2xl text-red-600 font-semibold mb-4 lg:mb-6">
                          {section.subtitle}
                        </h3>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6 lg:mb-8">
                          {section.content}
                        </p>
                        
                        {index < sections.length - 1 && (
                          <button 
                            onClick={() => {
                              const nextSection = document.querySelector(`#fullscreen-section-${index + 1}`);
                              if (nextSection) {
                                nextSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 lg:py-3 px-4 lg:px-6 rounded-lg transition-colors duration-200"
                          >
                            <span>Lanjutkan Cerita</span>
                            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Visual */}
                    <div>
                      {section.visual}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* Call to Action in Fullscreen */}
            <section className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white py-16 lg:py-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                <Lightbulb className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 text-yellow-300" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">Mari Bertindak Bersama</h2>
                <p className="text-lg lg:text-xl mb-6 lg:mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
                  Dengan pemahaman yang mendalam tentang stunting dan data yang akurat, 
                  kita dapat merancang solusi yang efektif untuk masa depan anak-anak NTT yang lebih baik dan mencapai target SDGs 2030.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="bg-white text-red-600 hover:bg-gray-100 font-medium py-3 lg:py-4 px-6 lg:px-8 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Eksplorasi Dashboard
                  </button>
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-medium py-3 lg:py-4 px-6 lg:px-8 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Lihat Peta Tematik
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {sections.map((section, index) => (
        <section 
          key={section.id}
          id={`section-${index}`}
          className={`story-section min-h-screen flex items-center ${section.background} relative overflow-hidden`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className={`space-y-4 lg:space-y-6 ${
                isVisible[index] ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
                <div>
                  <div className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-red-600 mb-3">
                    Bagian {index + 1} dari {sections.length}
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
                    {section.title}
                  </h2>
                  <h3 className="text-lg md:text-xl lg:text-2xl text-red-600 font-semibold mb-4 lg:mb-6">
                    {section.subtitle}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6 lg:mb-8">
                    {section.content}
                  </p>
                  
                  {index < sections.length - 1 && (
                    <button 
                      onClick={() => {
                        document.getElementById(`section-${index + 1}`).scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 lg:py-3 px-4 lg:px-6 rounded-lg transition-colors duration-200"
                    >
                      <span>Lanjutkan Cerita</span>
                      <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Visual */}
              <div className={`${
                isVisible[index] ? 'animate-fade-in-up' : 'opacity-0'
              }`} style={{ animationDelay: '200ms' }}>
                {section.visual}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <Lightbulb className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">Mari Bertindak Bersama</h2>
          <p className="text-lg lg:text-xl mb-6 lg:mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Dengan pemahaman yang mendalam tentang stunting dan data yang akurat, 
            kita dapat merancang solusi yang efektif untuk masa depan anak-anak NTT yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 font-medium py-3 lg:py-4 px-6 lg:px-8 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
              <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Eksplorasi Dashboard
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-medium py-3 lg:py-4 px-6 lg:px-8 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
              <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Lihat Peta Tematik
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

        .story-section {
          scroll-snap-align: start;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default WebStory;