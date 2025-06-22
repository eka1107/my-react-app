import { motion } from 'framer-motion';
import { ChevronRight, ChevronsDown, ArrowRight, Users, AlertTriangle, TrendingUp, MapPin, Heart, Target, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const stories = [
  {
    id: 1,
    title: 'Apa itu Stunting?',
    subtitle: 'Memahami Masalah Gizi Kronis',
    content: 'Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis. Anak stunting memiliki tinggi badan di bawah standar usianya, tetapi yang lebih mengkhawatirkan adalah dampaknya pada perkembangan otak yang terhambat.',
    image: 'https://images.unsplash.com/photo-1542037104-924827d40573?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    icon: AlertTriangle,
    stats: { value: '37.8%', label: 'Prevalensi NTT' },
    color: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Kondisi NTT Saat Ini',
    subtitle: 'Mengapa NTT Menjadi Perhatian Khusus?',
    content: 'Nusa Tenggara Timur merupakan salah satu provinsi dengan angka prevalensi stunting tertinggi di Indonesia. Berdasarkan SSGI 2023, angkanya mencapai 37.8%, jauh di atas rata-rata nasional yang hanya 21.6%.',
    image: 'https://images.unsplash.com/photo-1599846389423-247f657874a6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    icon: TrendingUp,
    stats: { value: '22', label: 'Kabupaten/Kota' },
    color: 'text-red-600'
  },
  {
    id: 3,
    title: 'Akar Masalah',
    subtitle: 'Faktor-faktor Penyebab Stunting',
    content: 'Stunting tidak terjadi dalam semalam. Ini adalah hasil dari berbagai faktor yang saling terkait: asupan gizi yang tidak memadai, pola asuh yang kurang optimal, sanitasi yang buruk, dan terbatasnya akses ke layanan kesehatan.',
    image: 'https://images.unsplash.com/photo-1591572352385-78e73c4d72a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    icon: Users,
    stats: { value: '5.4M', label: 'Penduduk NTT' },
    color: 'text-yellow-600'
  },
  {
    id: 4,
    title: 'Dampak Jangka Panjang',
    subtitle: 'Mengapa Stunting Harus Segera Ditangani?',
    content: 'Dampak stunting tidak hanya dirasakan saat kecil. Dalam jangka panjang, stunting dapat menurunkan kemampuan kognitif hingga 15%, produktivitas kerja, dan meningkatkan risiko penyakit degeneratif saat dewasa.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
    icon: Heart,
    stats: { value: '15%', label: 'Penurunan IQ' },
    color: 'text-green-600'
  },
  {
    id: 5,
    title: 'Harapan dan Solusi',
    subtitle: 'Bagaimana Kita Bisa Mengatasi Stunting?',
    content: 'Meskipun kompleks, stunting dapat dicegah dan ditangani. Melalui intervensi yang tepat sasaran, edukasi yang berkelanjutan, dan kerja sama semua pihak, kita dapat menurunkan angka stunting di NTT.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    icon: Target,
    stats: { value: '1000', label: 'Hari Emas' },
    color: 'text-purple-600'
  }
];

const WebStory = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Cerita Stunting di NTT
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Jelajahi perjalanan dan kompleksitas stunting di Nusa Tenggara Timur 
            melalui narasi visual yang informatif dan mudah dipahami
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="btn-primary text-lg px-8 py-3 flex items-center"
            >
              {isAutoPlaying ? 'Jeda' : 'Putar'} Otomatis
            </button>
            <Link to="/dashboard" className="btn-secondary text-lg px-8 py-3 flex items-center">
              Lihat Data <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12"
          >
            <ChevronsDown className="h-12 w-12 text-primary-500 mx-auto animate-bounce" />
            <p className="text-gray-500 mt-2">Gulir untuk melanjutkan</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Story Sections */}
      <div className="relative">
        {stories.map((story, index) => (
          <motion.section
            key={story.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`min-h-screen flex items-center ${story.bgColor} relative overflow-hidden`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="order-2 lg:order-1"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${story.bgColor.replace('bg-gradient-to-br', 'bg-white')} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                      <story.icon className={`w-6 h-6 ${story.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                        Bagian {story.id} dari {stories.length}
                      </p>
                      <h2 className="text-2xl font-bold text-gray-900">{story.subtitle}</h2>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {story.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                    {story.content}
                  </p>

                  {/* Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
                  >
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${story.color} mb-1`}>
                        {story.stats.value}
                      </div>
                      <div className="text-gray-600">{story.stats.label}</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="order-1 lg:order-2"
                >
                  <div className="relative">
                    <motion.img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStory(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-primary-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Sekarang Anda Tahu</h2>
          <p className="text-xl mb-8 opacity-90">
            Stunting adalah masalah kompleks yang memerlukan pemahaman mendalam dan tindakan nyata. 
            Mari kita lihat data dan visualisasi yang lebih detail untuk memahami situasi di NTT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center">
              Jelajahi Dashboard <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/map" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center">
              Lihat Peta Tematik <MapPin className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WebStory; 