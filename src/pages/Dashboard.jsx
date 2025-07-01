import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sun, Moon, Satellite, Expand } from 'lucide-react';

// Import Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Opsi Base Map
const basemaps = {
  light: { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' },
  dark: { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' },
  satellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: 'Tiles &copy; Esri' },
};

// Helper Functions & Data
const getCategory = (prevalensi) => {
  const iconProps = 'xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  if (prevalensi > 40) return { name: 'Sangat Tinggi', color: '#dc2626', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>` };
  if (prevalensi > 30) return { name: 'Tinggi', color: '#f97316', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>` };
  if (prevalensi > 20) return { name: 'Sedang', color: '#eab308', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 3v19"/></svg>` };
  return { name: 'Rendah', color: '#16a34a', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>` };
};
const filterCategories = ['Sangat Tinggi', 'Tinggi', 'Sedang', 'Rendah'];

// Fix untuk ikon default di Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [districtCategoryCounts, setDistrictCategoryCounts] = useState({ sangatTinggi: 0, tinggi: 0, sedang: 0, rendah: 0 });
  
  // State untuk Filter
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [filterKabupaten, setFilterKabupaten] = useState('Semua');
  
  const [activeBasemap, setActiveBasemap] = useState('light');
  
  // Refs untuk Peta
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    fetch('/src/data/peta ntt.geojson')
      .then(response => response.json())
      .then(data => {
        setGeojsonData(data);
        const kabupatens = new Set(data.features.map(f => f.properties.nmkab));
        setKabupatenList(['Semua', ...Array.from(kabupatens).sort()]);
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  }, []);

  // ########## EFEK UNTUK STATISTIK DINAMIS ##########
  useEffect(() => {
    if (!geojsonData) return;

    // Terapkan filter yang sama seperti di peta
    let filteredData = geojsonData.features;
    if (filterCategory !== 'Semua') {
      filteredData = filteredData.filter(feature => getCategory(feature.properties.Data_Estim * 100).name === filterCategory);
    }
    if (filterKabupaten !== 'Semua') {
      filteredData = filteredData.filter(feature => feature.properties.nmkab === filterKabupaten);
    }

    // Hitung ulang statistik dari data yang sudah difilter
    const counts = { sangatTinggi: 0, tinggi: 0, sedang: 0, rendah: 0 };
    filteredData.forEach(feature => {
      const category = getCategory(feature.properties.Data_Estim * 100).name;
      if (category === 'Sangat Tinggi') counts.sangatTinggi++;
      else if (category === 'Tinggi') counts.tinggi++;
      else if (category === 'Sedang') counts.sedang++;
      else counts.rendah++;
    });
    
    setDistrictCategoryCounts(counts);
  }, [geojsonData, filterCategory, filterKabupaten]);
  // ########## AKHIR DARI EFEK STATISTIK DINAMIS ##########


  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, { zoomControl: false }).setView([-9.5, 122], 7);
      L.control.zoom({ position: 'topright' }).addTo(mapInstanceRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      if (tileLayerRef.current) mapInstanceRef.current.removeLayer(tileLayerRef.current);
      tileLayerRef.current = L.tileLayer(basemaps[activeBasemap].url, { attribution: basemaps[activeBasemap].attribution }).addTo(mapInstanceRef.current);
    }
  }, [activeBasemap]);

  useEffect(() => {
    if (!geojsonData || !mapInstanceRef.current) return;
    if (geoJsonLayerRef.current) mapInstanceRef.current.removeLayer(geoJsonLayerRef.current);
    
    let filteredFeatures = geojsonData.features;
    if (filterCategory !== 'Semua') {
      filteredFeatures = filteredFeatures.filter(feature => getCategory(feature.properties.Data_Estim * 100).name === filterCategory);
    }
    if (filterKabupaten !== 'Semua') {
      filteredFeatures = filteredFeatures.filter(feature => feature.properties.nmkab === filterKabupaten);
    }
    const filteredGeoJson = { type: 'FeatureCollection', features: filteredFeatures };

    geoJsonLayerRef.current = L.geoJSON(filteredGeoJson, {
      style: (feature) => ({
        fillColor: getCategory(feature.properties.Data_Estim * 100).color,
        weight: 1, opacity: 1,
        color: activeBasemap === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.6)',
        fillOpacity: 0.7,
      }),
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        const estimasi = (props.Data_Estim * 100);
        const category = getCategory(estimasi);
        const tooltipContent = `<div class="${activeBasemap === 'dark' ? 'dark-mode' : ''}"><div style="background-color: ${category.color}; padding: 8px 12px; display: flex; align-items: center; color: white; gap: 8px;">${category.icon}<span style="font-weight: bold; font-size: 14px;">${category.name}</span></div><div style="padding: 12px;"><h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${props.nmkec}</h3><p style="margin: 0; font-size: 12px; color: ${activeBasemap === 'dark' ? '#94a3b8' : '#64748b'};">Kab. ${props.nmkab}</p><div style="margin-top: 10px; font-size: 18px; font-weight: bold;">${estimasi.toFixed(1)}% <span style="font-size: 12px; font-weight: normal;">Prevalensi</span></div></div></div>`;
        layer.bindTooltip(tooltipContent, { sticky: true, className: 'custom-leaflet-tooltip' });
        layer.on({
          mouseover: (e) => e.target.setStyle({ weight: 2.5, color: '#333' }),
          mouseout: () => geoJsonLayerRef.current.resetStyle(layer),
          click: (e) => setFilterKabupaten(e.target.feature.properties.nmkab),
        });
      },
    }).addTo(mapInstanceRef.current);
    
    if (filteredFeatures.length > 0) {
        mapInstanceRef.current.fitBounds(geoJsonLayerRef.current.getBounds().pad(0.2));
    }

  }, [geojsonData, activeBasemap, filterCategory, filterKabupaten]);
  
  const handleResetView = () => {
    setFilterCategory('Semua');
    setFilterKabupaten('Semua');
  };
  
  // Fungsi untuk membuat judul statistik dinamis
  const getStatsTitle = () => {
    if (filterKabupaten !== 'Semua') {
      return `Statistik Kecamatan di ${filterKabupaten}`;
    }
    if (filterCategory !== 'Semua') {
      return `Statistik Kecamatan (${filterCategory})`;
    }
    return 'Statistik Kecamatan (Total NTT)';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">Dashboard Prevalensi Stunting</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Level Kecataman Provinsi Nusa Tenggara Timur tahun 2023
            </p>
        </div>
        
        {/* ########## PANEL STATISTIK YANG DIPERBARUI ########## */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{getStatsTitle()}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <h3 className="text-sm font-semibold text-red-800">Sangat Tinggi</h3>
                    <p className="text-3xl font-bold text-red-600 mt-1">{districtCategoryCounts.sangatTinggi}</p>
                    <p className="text-xs text-red-500">&gt;40%</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                    <h3 className="text-sm font-semibold text-orange-800">Tinggi</h3>
                    <p className="text-3xl font-bold text-orange-600 mt-1">{districtCategoryCounts.tinggi}</p>
                    <p className="text-xs text-orange-500">30-40%</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h3 className="text-sm font-semibold text-yellow-800">Sedang</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-1">{districtCategoryCounts.sedang}</p>
                    <p className="text-xs text-yellow-500">20-30%</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <h3 className="text-sm font-semibold text-green-800">Rendah</h3>
                    <p className="text-3xl font-bold text-green-600 mt-1">{districtCategoryCounts.rendah}</p>
                    <p className="text-xs text-green-500">&lt;20%</p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
              <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">Peta Interaktif</h2>
              <div className="flex flex-col sm:flex-row w-full gap-2">
                  <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full sm:w-auto bg-gray-100 border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                  >
                      <option value="Semua">Semua Kategori</option>
                      {filterCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                      ))}
                  </select>
                  <select 
                      value={filterKabupaten} 
                      onChange={(e) => setFilterKabupaten(e.target.value)} 
                      className="w-full sm:w-64 bg-gray-100 border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
                  >
                      {kabupatenList.map(kab => <option key={kab} value={kab}>{kab === 'Semua' ? 'Semua Kabupaten/Kota' : kab}</option>)}
                  </select>
              </div>
          </div>
          
          <div className="relative" style={{ height: '550px' }}>
            <div ref={mapRef} className="w-full h-full rounded-xl border border-gray-200" />
            <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1 flex gap-1">
                <button onClick={() => setActiveBasemap('light')} className={`p-2 rounded-md ${activeBasemap === 'light' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}><Sun size={18} /></button>
                <button onClick={() => setActiveBasemap('dark')} className={`p-2 rounded-md ${activeBasemap === 'dark' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}><Moon size={18} /></button>
                <button onClick={() => setActiveBasemap('satellite')} className={`p-2 rounded-md ${activeBasemap === 'satellite' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}><Satellite size={18} /></button>
              </div>
               <button onClick={handleResetView} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"><Expand size={18} /></button>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200 max-w-xs z-[1000]">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Prevalensi Stunting</h4>
              <div className="flex flex-col gap-1 text-xs text-gray-700">
                <div className="flex items-center"><span className="w-3.5 h-3.5 rounded-full mr-2" style={{ background: '#dc2626' }}></span>&gt;40% (Sangat Tinggi)</div>
                <div className="flex items-center"><span className="w-3.5 h-3.5 rounded-full mr-2" style={{ background: '#f97316' }}></span>30-40% (Tinggi)</div>
                <div className="flex items-center"><span className="w-3.5 h-3.5 rounded-full mr-2" style={{ background: '#eab308' }}></span>20-30% (Sedang)</div>
                <div className="flex items-center"><span className="w-3.5 h-3.5 rounded-full mr-2" style={{ background: '#16a34a' }}></span>&lt;20% (Rendah)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;