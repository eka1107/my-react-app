import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MapPin, AlertTriangle, Eye, Info } from 'lucide-react';
import { useState } from 'react';
import StuntingMap from '../components/StuntingMap';

const stuntingData = [
  { name: 'Sumba Timur', prevalensi: 40.6 },
  { name: 'TTS', prevalensi: 48.3 },
  { name: 'Manggarai', prevalensi: 38.6 },
  { name: 'Kupang', prevalensi: 34.1 },
  { name: 'Belu', prevalensi: 29.5 },
  { name: 'Alor', prevalensi: 24.1 },
  { name: 'Flotim', prevalensi: 25.6 },
  { name: 'Sikka', prevalensi: 22.1 },
  { name: 'Ende', prevalensi: 23.9 },
  { name: 'Ngada', prevalensi: 13.1 },
  { name: 'Mabar', prevalensi: 16.9 },
  { name: 'Sumba Barat', prevalensi: 21.2 },
  { name: 'Lembata', prevalensi: 22.9 },
  { name: 'Rote Ndao', prevalensi: 19.9 },
  { name: 'TTU', prevalensi: 38.8 },
  { name: 'Sumba Tengah', prevalensi: 42.8 },
  { name: 'SBD', prevalensi: 19.8 },
  { name: 'Nagekeo', prevalensi: 20.3 },
  { name: 'Manggarai Timur', prevalensi: 33.8 },
  { name: 'Sabu Raijua', prevalensi: 28.5 },
  { name: 'Malaka', prevalensi: 29.8 },
  { name: 'Kota Kupang', prevalensi: 21.6 },
];

const statusData = [
  { name: 'Sangat Tinggi (>40%)', value: 2, color: '#800026' },
  { name: 'Tinggi (30-40%)', value: 4, color: '#E31A1C' },
  { name: 'Sedang (20-30%)', value: 9, color: '#FD8D3C' },
  { name: 'Rendah (<20%)', value: 7, color: '#FED976' },
];

const kpiData = [
    { title: 'Prevalensi Tertinggi', value: '48.3%', subtitle: 'Timor Tengah Selatan', icon: TrendingUp, color: 'text-red-500' },
    { title: 'Prevalensi Terendah', value: '13.1%', subtitle: 'Ngada', icon: TrendingUp, color: 'text-green-500' },
    { title: 'Total Kabupaten/Kota', value: '22', subtitle: 'Data SSGI 2023', icon: MapPin, color: 'text-blue-500' },
    { title: 'Rata-rata Prevalensi', value: '27.7%', subtitle: 'di seluruh NTT', icon: AlertTriangle, color: 'text-orange-500' },
];

const Dashboard = () => {
  const [showMap, setShowMap] = useState(false);

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Stunting NTT</h1>
            <p className="text-gray-600">Visualisasi data prevalensi stunting berdasarkan SSGI 2023.</p>
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className="btn-primary flex items-center"
          >
            {showMap ? <Eye className="w-4 h-4 mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
            {showMap ? 'Sembunyikan Peta' : 'Tampilkan Peta'}
          </button>
        </div>
      </div>
      
      {/* KPIs */}
      <div 
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {kpiData.map(kpi => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} variants={chartVariants} className="card flex items-center p-4">
              <Icon className={`w-10 h-10 mr-4 ${kpi.color}`} />
              <div>
                <p className="text-gray-500 text-sm">{kpi.title}</p>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-gray-500 text-xs">{kpi.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Bar Chart */}
        <div variants={chartVariants} initial="hidden" animate="visible" className="lg:col-span-2 card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Prevalensi Stunting per Kabupaten/Kota</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={stuntingData} margin={{ top: 5, right: 20, left: -10, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="prevalensi" fill="#0284c7" name="Prevalensi (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pie Chart */}
        <div variants={chartVariants} initial="hidden" animate="visible" className="card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status Kategori Stunting</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Peta Tematik */}
      {showMap && (
        <div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Peta Tematik Prevalensi Stunting NTT</h2>
          <div className="relative h-96">
            <StuntingMap />
          </div>
        </div>
      )}

      {/* Peta Posisi NTT di Indonesia */}
      <div
        variants={chartVariants}
        initial="hidden"
        animate="visible"
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-500" />
          Posisi NTT di Indonesia
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Peta Indonesia */}
          <div className="lg:col-span-2">
            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200">
              {/* Simplified Indonesia map with NTT highlighted */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Simplified Indonesia outline */}
                  <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-30">
                    <path
                      d="M50 50 Q100 30 150 40 Q200 50 250 60 L240 150 Q200 160 150 170 Q100 160 50 150 Z"
                      fill="#e5e7eb"
                      stroke="#9ca3af"
                      strokeWidth="2"
                    />
                  </svg>
                  
                  {/* NTT highlighted */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-12 bg-red-500 rounded-lg shadow-lg border-2 border-white relative">
                      <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        NTT
                      </div>
                    </div>
                  </div>
                  
                  {/* Location indicator */}
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 text-red-500" />
                      Nusa Tenggara Timur
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Info Panel */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Lokasi Geografis</h3>
              <p className="text-sm text-blue-700">
                NTT terletak di bagian timur Indonesia, terdiri dari pulau-pulau seperti Timor, Flores, Sumba, dan pulau-pulau kecil lainnya.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Luas Wilayah</h3>
              <p className="text-sm text-green-700">
                Total luas: 48.718 km²<br/>
                Terdiri dari 22 kabupaten/kota
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Karakteristik</h3>
              <p className="text-sm text-orange-700">
                • Wilayah kepulauan<br/>
                • Topografi bervariasi<br/>
                • Akses transportasi terbatas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 