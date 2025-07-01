import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, Users, MapPin, AlertTriangle, Eye, Layers, Droplets, Leaf, TreePine, Wind, X, Target, Activity, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const stuntingData = [
  { name: 'TTS', prevalensi: 48.3, kabupaten: 'Timor Tengah Selatan', faktors: { ekonomi: 'Kemiskinan 23.1%', akses: 'Layanan kesehatan terbatas', air: 'Air bersih rendah', pangan: 'Pangan tidak stabil' }, satelliteData: { ntl: 2.3, ndwi: 0.12, ndvi: 0.34, savi: 0.21, co: 145 } },
  { name: 'Sumba Tengah', prevalensi: 42.8, kabupaten: 'Sumba Tengah', faktors: { ekonomi: 'Kemiskinan 28.5%', akses: 'Jarak puskesmas >10km', air: 'Sumber air terbatas', pangan: 'Kemarau panjang' }, satelliteData: { ntl: 1.8, ndwi: 0.08, ndvi: 0.28, savi: 0.18, co: 158 } },
  { name: 'Sumba Timur', prevalensi: 40.6, kabupaten: 'Sumba Timur', faktors: { ekonomi: 'Kemiskinan 24.7%', akses: 'Tenaga kesehatan kurang', air: 'Kekeringan musiman', pangan: 'Diversifikasi rendah' }, satelliteData: { ntl: 3.1, ndwi: 0.15, ndvi: 0.31, savi: 0.19, co: 142 } },
  { name: 'TTU', prevalensi: 38.8, kabupaten: 'Timor Tengah Utara', faktors: { ekonomi: 'Kemiskinan 21.3%', akses: 'Infrastruktur rusak', air: 'Sanitasi buruk', pangan: 'Pola asuh tradisional' }, satelliteData: { ntl: 2.7, ndwi: 0.18, ndvi: 0.42, savi: 0.28, co: 138 } },
  { name: 'Manggarai', prevalensi: 38.6, kabupaten: 'Manggarai', faktors: { ekonomi: 'Kemiskinan 19.8%', akses: 'Posyandu terbatas', air: 'Air tercemar', pangan: 'Protein rendah' }, satelliteData: { ntl: 4.2, ndwi: 0.22, ndvi: 0.56, savi: 0.38, co: 132 } },
  { name: 'Manggarai Timur', prevalensi: 33.8, kabupaten: 'Manggarai Timur', faktors: { ekonomi: 'Kemiskinan 18.2%', akses: 'Akses terbatas', air: 'Kualitas air sedang', pangan: 'Gizi kurang' }, satelliteData: { ntl: 3.5, ndwi: 0.19, ndvi: 0.48, savi: 0.32, co: 135 } },
  { name: 'Kupang', prevalensi: 34.1, kabupaten: 'Kupang', faktors: { ekonomi: 'Kemiskinan 16.5%', akses: 'Layanan memadai', air: 'Air cukup baik', pangan: 'Akses pangan baik' }, satelliteData: { ntl: 5.2, ndwi: 0.25, ndvi: 0.38, savi: 0.26, co: 128 } },
  { name: 'Belu', prevalensi: 29.5, kabupaten: 'Belu', faktors: { ekonomi: 'Kemiskinan 15.3%', akses: 'Akses cukup', air: 'Air memadai', pangan: 'Pangan cukup' }, satelliteData: { ntl: 4.1, ndwi: 0.21, ndvi: 0.45, savi: 0.31, co: 130 } },
  { name: 'Sabu Raijua', prevalensi: 28.5, kabupaten: 'Sabu Raijua', faktors: { ekonomi: 'Kemiskinan 17.8%', akses: 'Akses pulau terbatas', air: 'Air terbatas', pangan: 'Pangan musiman' }, satelliteData: { ntl: 2.1, ndwi: 0.11, ndvi: 0.29, savi: 0.18, co: 148 } },
  { name: 'Malaka', prevalensi: 29.8, kabupaten: 'Malaka', faktors: { ekonomi: 'Kemiskinan 16.9%', akses: 'Akses sedang', air: 'Air sedang', pangan: 'Pangan sedang' }, satelliteData: { ntl: 3.8, ndwi: 0.17, ndvi: 0.41, savi: 0.28, co: 134 } },
  { name: 'Flotim', prevalensi: 25.6, kabupaten: 'Flores Timur', faktors: { ekonomi: 'Kemiskinan 14.2%', akses: 'Akses baik', air: 'Air baik', pangan: 'Pangan baik' }, satelliteData: { ntl: 4.6, ndwi: 0.23, ndvi: 0.52, savi: 0.36, co: 125 } },
  { name: 'Ende', prevalensi: 23.9, kabupaten: 'Ende', faktors: { ekonomi: 'Kemiskinan 13.5%', akses: 'Layanan baik', air: 'Air baik', pangan: 'Gizi baik' }, satelliteData: { ntl: 5.1, ndwi: 0.26, ndvi: 0.54, savi: 0.38, co: 122 } },
  { name: 'Lembata', prevalensi: 22.9, kabupaten: 'Lembata', faktors: { ekonomi: 'Kemiskinan 12.8%', akses: 'Akses memadai', air: 'Air memadai', pangan: 'Pangan memadai' }, satelliteData: { ntl: 3.9, ndwi: 0.20, ndvi: 0.49, savi: 0.33, co: 127 } },
  { name: 'Sikka', prevalensi: 22.1, kabupaten: 'Sikka', faktors: { ekonomi: 'Kemiskinan 11.9%', akses: 'Layanan memadai', air: 'Air memadai', pangan: 'Gizi memadai' }, satelliteData: { ntl: 4.8, ndwi: 0.24, ndvi: 0.51, savi: 0.35, co: 124 } },
  { name: 'Kota Kupang', prevalensi: 21.6, kabupaten: 'Kota Kupang', faktors: { ekonomi: 'Kemiskinan 9.2%', akses: 'Layanan sangat baik', air: 'Air sangat baik', pangan: 'Gizi sangat baik' }, satelliteData: { ntl: 8.5, ndwi: 0.28, ndvi: 0.35, savi: 0.24, co: 118 } },
  { name: 'Sumba Barat', prevalensi: 21.2, kabupaten: 'Sumba Barat', faktors: { ekonomi: 'Kemiskinan 11.5%', akses: 'Akses baik', air: 'Air baik', pangan: 'Pangan baik' }, satelliteData: { ntl: 4.3, ndwi: 0.22, ndvi: 0.46, savi: 0.32, co: 126 } },
  { name: 'Nagekeo', prevalensi: 20.3, kabupaten: 'Nagekeo', faktors: { ekonomi: 'Kemiskinan 10.8%', akses: 'Layanan baik', air: 'Air baik', pangan: 'Gizi baik' }, satelliteData: { ntl: 4.7, ndwi: 0.25, ndvi: 0.53, savi: 0.37, co: 123 } },
  { name: 'Rote Ndao', prevalensi: 19.9, kabupaten: 'Rote Ndao', faktors: { ekonomi: 'Kemiskinan 10.2%', akses: 'Akses memadai', air: 'Air memadai', pangan: 'Pangan memadai' }, satelliteData: { ntl: 3.6, ndwi: 0.18, ndvi: 0.42, savi: 0.29, co: 129 } },
  { name: 'SBD', prevalensi: 19.8, kabupaten: 'Sumba Barat Daya', faktors: { ekonomi: 'Kemiskinan 10.1%', akses: 'Akses baik', air: 'Air baik', pangan: 'Pangan baik' }, satelliteData: { ntl: 4.1, ndwi: 0.21, ndvi: 0.44, savi: 0.30, co: 127 } },
  { name: 'Mabar', prevalensi: 16.9, kabupaten: 'Manggarai Barat', faktors: { ekonomi: 'Kemiskinan 8.5%', akses: 'Layanan sangat baik', air: 'Air sangat baik', pangan: 'Gizi sangat baik' }, satelliteData: { ntl: 5.8, ndwi: 0.27, ndvi: 0.58, savi: 0.41, co: 120 } },
  { name: 'Ngada', prevalensi: 13.1, kabupaten: 'Ngada', faktors: { ekonomi: 'Kemiskinan 6.2%', akses: 'Layanan sangat baik', air: 'Air sangat baik', pangan: 'Gizi sangat baik' }, satelliteData: { ntl: 6.2, ndwi: 0.29, ndvi: 0.61, savi: 0.44, co: 115 } },
  { name: 'Alor', prevalensi: 24.1, kabupaten: 'Alor', faktors: { ekonomi: 'Kemiskinan 13.2%', akses: 'Akses memadai', air: 'Air memadai', pangan: 'Pangan memadai' }, satelliteData: { ntl: 4.4, ndwi: 0.22, ndvi: 0.47, savi: 0.32, co: 126 } }
];

const statusData = [
  { name: 'Sangat Tinggi', value: 3, color: '#dc2626' },
  { name: 'Tinggi', value: 6, color: '#f97316' },
  { name: 'Sedang', value: 8, color: '#eab308' },
  { name: 'Rendah', value: 5, color: '#16a34a' },
];

const kpiData = [
  { 
    title: 'Prevalensi Tertinggi', 
    value: '48.3%', 
    subtitle: 'Timor Tengah Selatan', 
    icon: AlertTriangle, 
    color: 'text-red-600',
    bg: 'bg-red-50'
  },
  { 
    title: 'Prevalensi Terendah', 
    value: '13.1%', 
    subtitle: 'Ngada', 
    icon: Shield, 
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  { 
    title: 'Total Wilayah', 
    value: '22', 
    subtitle: 'Kabupaten/Kota', 
    icon: MapPin, 
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  { 
    title: 'Target 2024', 
    value: '14%', 
    subtitle: 'Gap: 13.7%', 
    icon: Target, 
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
];

const trendData = [
  { tahun: '2019', ntt: 33.4, indonesia: 27.7 },
  { tahun: '2020', ntt: 31.8, indonesia: 26.9 },
  { tahun: '2021', ntt: 29.2, indonesia: 24.4 },
  { tahun: '2022', ntt: 28.5, indonesia: 21.6 },
  { tahun: '2023', ntt: 27.7, indonesia: 21.5 },
];

// Sample GeoJSON data untuk NTT
const sampleGeoData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "kdprov": "53",
        "kdkab": "01",
        "kdkec": "021",
        "nmprov": "NUSA TENGGARA TIMUR",
        "nmkab": "SUMBA BARAT",
        "nmkec": "LAMBOYA",
        "sumber": "BPS",
        "periode": "2023_1",
        "Kode": 5301021,
        "Data_RSE K": 14.64,
        "Data_Estim": 0.402821598,
        "Data_Est_1": 0.37
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [119.333826250000016, -9.643328729999972],
              [119.333799740000046, -9.643361729999949],
              [119.334036870000119, -9.643281509999973],
              [119.334116410000121, -9.643329519999948],
              [119.33420337000004, -9.643449629999939],
              [119.33419808000005, -9.643552709999941],
              [119.334099060000113, -9.64373804],
              [119.333908020000109, -9.644108139999979],
              [119.33387386000004, -9.644299299999986],
              [119.333926340000033, -9.64444013],
              [119.333826250000016, -9.643328729999972]
            ]
          ]
        ]
      }
    }
  ]
};

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Simplified map component without Leaflet to avoid errors
  const MapComponent = () => {
    const [showLegend, setShowLegend] = useState(true);

    // Simplified representation of regions
    const regions = [
      { name: 'TTS', x: 320, y: 180, prevalensi: 48.3, size: 'large' },
      { name: 'Sumba Tengah', x: 150, y: 220, prevalensi: 42.8, size: 'medium' },
      { name: 'Sumba Timur', x: 200, y: 230, prevalensi: 40.6, size: 'medium' },
      { name: 'TTU', x: 280, y: 160, prevalensi: 38.8, size: 'medium' },
      { name: 'Manggarai', x: 120, y: 120, prevalensi: 38.6, size: 'medium' },
      { name: 'Kupang', x: 350, y: 200, prevalensi: 34.1, size: 'medium' },
      { name: 'Kota Kupang', x: 370, y: 210, prevalensi: 21.6, size: 'small' },
      { name: 'Ende', x: 180, y: 140, prevalensi: 23.9, size: 'small' },
      { name: 'Ngada', x: 160, y: 130, prevalensi: 13.1, size: 'small' }
    ];

    const getColor = (prevalensi) => {
      if (prevalensi > 40) return '#dc2626';
      if (prevalensi > 30) return '#f97316'; 
      if (prevalensi > 20) return '#eab308';
      return '#16a34a';
    };

    const getSize = (size) => {
      switch(size) {
        case 'large': return 18;
        case 'medium': return 14;
        case 'small': return 10;
        default: return 12;
      }
    };

    return (
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Peta Tematik NTT</h3>
          <p className="text-sm text-gray-600 mt-1">Prevalensi Stunting per Kabupaten/Kota</p>
        </div>
        <div className="relative h-80 bg-gradient-to-br from-blue-50 to-gray-50">
          {/* SVG Map */}
          <svg width="100%" height="100%" viewBox="0 0 500 300" className="absolute inset-0">
            {/* Background islands shape */}
            <path
              d="M50 150 Q100 120 150 140 Q200 110 250 130 Q300 120 350 140 Q400 150 450 160 Q480 180 450 200 Q400 220 350 210 Q300 200 250 190 Q200 180 150 190 Q100 200 50 180 Z"
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="2"
              opacity="0.3"
            />
            <path
              d="M80 200 Q120 190 160 200 Q200 210 240 200 Q280 190 320 200 Q360 210 400 200 Q430 220 400 240 Q360 250 320 240 Q280 230 240 240 Q200 250 160 240 Q120 230 80 220 Z"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="2"
              opacity="0.3"
            />
            
            {/* Region circles */}
            {regions.map((region, index) => (
              <g key={index}>
                <circle
                  cx={region.x}
                  cy={region.y}
                  r={getSize(region.size)}
                  fill={getColor(region.prevalensi)}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    const fullData = stuntingData.find(d => d.name === region.name);
                    if (fullData) setSelectedRegion(fullData);
                  }}
                >
                  <title>{`${region.name}: ${region.prevalensi}%`}</title>
                </circle>
                <text
                  x={region.x}
                  y={region.y + getSize(region.size) + 15}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium pointer-events-none"
                >
                  {region.name}
                </text>
                <text
                  x={region.x}
                  y={region.y + getSize(region.size) + 28}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 pointer-events-none"
                >
                  {region.prevalensi}%
                </text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          {showLegend && (
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-sm border max-w-xs">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-900">Prevalensi Stunting</h4>
                <button
                  onClick={() => setShowLegend(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 inline-block" style={{background:'#dc2626'}}></span>
                  &gt;40% (Sangat Tinggi)
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 inline-block" style={{background:'#f97316'}}></span>
                  30-40% (Tinggi)
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 inline-block" style={{background:'#eab308'}}></span>
                  20-30% (Sedang)
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 inline-block" style={{background:'#16a34a'}}></span>
                  &lt;20% (Rendah)
                </div>
              </div>
            </div>
          )}
          {!showLegend && (
            <button
              onClick={() => setShowLegend(true)}
              className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-sm border hover:bg-gray-50"
            >
              <Layers className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard Stunting NTT</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Analisis komprehensif prevalensi stunting dengan integrasi data citra satelit
          </p>
        </div>
        
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map(kpi => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.title} className={`${kpi.bg} rounded-2xl p-5 border border-gray-100`}>
                <div className="flex items-center">
                  <Icon className={`w-8 h-8 ${kpi.color} mr-4`} />
                  <div>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                    <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-xs text-gray-500">{kpi.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Trend Chart */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Tren Prevalensi Stunting</h2>
              <p className="text-sm text-gray-600">Perbandingan NTT vs Indonesia (2019-2023)</p>
            </div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="tahun" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ntt"
                    stroke="#dc2626"
                    strokeWidth={3}
                    name="NTT"
                    dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2, fill: 'white' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="indonesia"
                    stroke="#16a34a"
                    strokeWidth={3}
                    name="Indonesia"
                    dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2, fill: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                📈 <strong>Gap:</strong> NTT 6.2 poin di atas nasional. Target: 14% (2024)
              </p>
            </div>
          </div>

          {/* Bar Chart + Category Chart */}
          <div className="space-y-4">
            {/* Bar Chart */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Prevalensi Stunting per Kabupaten/Kota</h2>
                <p className="text-sm text-gray-600">22 wilayah di Provinsi NTT</p>
              </div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <BarChart 
                    data={stuntingData.sort((a, b) => b.prevalensi - a.prevalensi)} 
                    margin={{ top: 5, right: 10, left: 0, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      interval={0} 
                      tick={{ fontSize: 9 }} 
                      stroke="#6b7280"
                      height={60}
                    />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [
                        `${value}%`,
                        'Prevalensi Stunting'
                      ]}
                      labelFormatter={(label, payload) => payload[0]?.payload.kabupaten || label}
                    />
                    <Bar dataKey="prevalensi" name="Prevalensi (%)" radius={[2, 2, 0, 0]}>
                      {stuntingData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.prevalensi > 40 ? '#dc2626' :
                            entry.prevalensi > 30 ? '#f97316' :
                            entry.prevalensi > 20 ? '#eab308' : '#16a34a'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">Distribusi Kategori Stunting</h2>
              </div>
              <div style={{ width: '100%', height: 160 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie 
                      data={statusData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={30}
                      outerRadius={60} 
                      dataKey="value"
                      label={({ value }) => `${value}`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <MapComponent />

        {/* Region Analysis */}
        {selectedRegion && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Analisis: {selectedRegion.kabupaten}
              </h2>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stunting Info */}
              <div>
                <div className="bg-red-50 p-4 rounded-2xl mb-4 border border-red-100">
                  <h3 className="font-bold text-red-800 mb-2">Status Stunting</h3>
                  <div className="text-3xl font-bold text-red-600 mb-1">{selectedRegion.prevalensi}%</div>
                  <p className="text-sm text-red-700">
                    Kategori: {selectedRegion.prevalensi > 40 ? 'Sangat Tinggi' : 
                             selectedRegion.prevalensi > 30 ? 'Tinggi' : 
                             selectedRegion.prevalensi > 20 ? 'Sedang' : 'Rendah'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900">Faktor Penyebab</h4>
                  <div className="space-y-2">
                    <div className="flex items-start p-3 bg-red-50 rounded-xl">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">Ekonomi</div>
                        <div className="text-xs text-gray-600">{selectedRegion.faktors.ekonomi}</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-blue-50 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">Akses Layanan</div>
                        <div className="text-xs text-gray-600">{selectedRegion.faktors.akses}</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-cyan-50 rounded-xl">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">Air Bersih</div>
                        <div className="text-xs text-gray-600">{selectedRegion.faktors.air}</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-green-50 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">Pangan</div>
                        <div className="text-xs text-gray-600">{selectedRegion.faktors.pangan}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Satellite Data */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Data Citra Satelit</h4>
                <div className="space-y-3">
                  <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-yellow-600 mr-2" />
                        <span className="font-medium text-gray-800 text-sm">Night Time Light</span>
                      </div>
                      <span className="font-bold text-yellow-600">{selectedRegion.satelliteData.ntl}</span>
                    </div>
                    <p className="text-xs text-yellow-700">Aktivitas ekonomi</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Droplets className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="font-medium text-gray-800 text-sm">NDWI</span>
                      </div>
                      <span className="font-bold text-blue-600">{selectedRegion.satelliteData.ndwi}</span>
                    </div>
                    <p className="text-xs text-blue-700">Ketersediaan air</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Leaf className="w-4 h-4 text-green-600 mr-2" />
                        <span className="font-medium text-gray-800 text-sm">NDVI</span>
                      </div>
                      <span className="font-bold text-green-600">{selectedRegion.satelliteData.ndvi}</span>
                    </div>
                    <p className="text-xs text-green-700">Vegetasi</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Wind className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-800 text-sm">CO</span>
                      </div>
                      <span className="font-bold text-gray-600">{selectedRegion.satelliteData.co}</span>
                    </div>
                    <p className="text-xs text-gray-700">Kualitas udara</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <h5 className="font-medium text-orange-800 mb-2 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Interpretasi
                  </h5>
                  <p className="text-sm text-orange-700">
                    {selectedRegion.satelliteData.ndvi < 0.3 ? 
                      "🌱 Vegetasi rendah → ketahanan pangan terbatas" :
                      "🌱 Vegetasi memadai"
                    }
                    {selectedRegion.satelliteData.ndwi < 0.15 ? 
                      " | 💧 Air terbatas" :
                      " | 💧 Air memadai"
                    }
                    {selectedRegion.satelliteData.ntl < 3 ?
                      " | 💡 Ekonomi rendah" :
                      " | 💡 Ekonomi baik"
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Rekomendasi
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl">
                  <h5 className="font-medium text-blue-700 mb-2 text-sm">Jangka Pendek</h5>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• PMT balita stunting</li>
                    <li>• Edukasi gizi ibu hamil</li>
                    <li>• Perbaikan sanitasi</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-xl">
                  <h5 className="font-medium text-indigo-700 mb-2 text-sm">Jangka Panjang</h5>
                  <ul className="text-xs text-indigo-600 space-y-1">
                    <li>• Infrastruktur air bersih</li>
                    <li>• Diversifikasi pertanian</li>
                    <li>• Pemberdayaan ekonomi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Correlation */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Korelasi Data Satelit</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Stunting vs NDVI</span>
                  <span className="text-sm text-red-600 font-bold">-0.72</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Vegetasi rendah = stunting tinggi</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Stunting vs NDWI</span>
                  <span className="text-sm text-orange-600 font-bold">-0.58</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">Air terbatas = stunting tinggi</p>
              </div>
            </div>
          </div>

          {/* Priority Areas */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Area Prioritas</h2>
            <div className="space-y-3">
              {stuntingData.slice(0, 3).map((region, index) => (
                <div key={region.name} className="flex items-center p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{region.kabupaten}</div>
                    <div className="text-xs text-gray-600">{region.prevalensi}%</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="font-medium text-yellow-800 text-sm">Catatan</span>
              </div>
              <p className="text-xs text-yellow-700">
                Diperlukan intervensi holistik: air bersih, pertanian, dan kesehatan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;