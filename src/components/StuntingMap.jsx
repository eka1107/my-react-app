import React, { useState, useEffect } from 'react';
import { MapPin, Info } from 'lucide-react';

// Data koordinat kabupaten di NTT
const kabupatenData = [
  { name: "Kabupaten Sumba Timur", lat: -9.833, lng: 120.383, prevalensi: 40.6 },
  { name: "Kabupaten Timor Tengah Selatan", lat: -9.833, lng: 124.467, prevalensi: 48.3 },
  { name: "Kabupaten Manggarai", lat: -8.583, lng: 120.417, prevalensi: 38.6 },
  { name: "Kabupaten Kupang", lat: -10.167, lng: 123.583, prevalensi: 34.1 },
  { name: "Kabupaten Belu", lat: -9.083, lng: 124.917, prevalensi: 29.5 },
  { name: "Kabupaten Alor", lat: -8.333, lng: 124.417, prevalensi: 24.1 },
  { name: "Kabupaten Flores Timur", lat: -8.583, lng: 122.917, prevalensi: 25.6 },
  { name: "Kabupaten Sikka", lat: -8.667, lng: 122.167, prevalensi: 22.1 },
  { name: "Kabupaten Ende", lat: -8.833, lng: 121.667, prevalensi: 23.9 },
  { name: "Kabupaten Ngada", lat: -8.667, lng: 121.083, prevalensi: 13.1 },
  { name: "Kabupaten Manggarai Barat", lat: -8.667, lng: 119.917, prevalensi: 16.9 },
  { name: "Kabupaten Sumba Barat", lat: -9.583, lng: 119.417, prevalensi: 21.2 },
  { name: "Kabupaten Lembata", lat: -8.417, lng: 123.417, prevalensi: 22.9 },
  { name: "Kabupaten Rote Ndao", lat: -10.833, lng: 123.417, prevalensi: 19.9 },
  { name: "Kabupaten Timor Tengah Utara", lat: -9.417, lng: 124.167, prevalensi: 38.8 },
  { name: "Kabupaten Sumba Tengah", lat: -9.417, lng: 119.917, prevalensi: 42.8 },
  { name: "Kabupaten Sumba Barat Daya", lat: -9.667, lng: 119.167, prevalensi: 19.8 },
  { name: "Kabupaten Nagekeo", lat: -8.833, lng: 121.417, prevalensi: 20.3 },
  { name: "Kabupaten Manggarai Timur", lat: -8.583, lng: 120.917, prevalensi: 33.8 },
  { name: "Kabupaten Sabu Raijua", lat: -10.583, lng: 121.917, prevalensi: 28.5 },
  { name: "Kabupaten Malaka", lat: -9.583, lng: 124.917, prevalensi: 29.8 },
  { name: "Kota Kupang", lat: -10.167, lng: 123.583, prevalensi: 21.6 }
];

const getColor = (d) => {
  return d > 40 ? '#800026' :
         d > 35  ? '#BD0026' :
         d > 30  ? '#E31A1C' :
         d > 25  ? '#FC4E2A' :
         d > 20   ? '#FD8D3C' :
         d > 15   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
};

const getRadius = (d) => {
  return d > 40 ? 8 :
         d > 35  ? 7 :
         d > 30  ? 6 :
         d > 25  ? 5 :
         d > 20   ? 4 :
         d > 15   ? 3 :
         d > 10   ? 2 :
                    1;
};

const StuntingMap = () => {
  const [hoveredKabupaten, setHoveredKabupaten] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!mapLoaded) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">Memuat peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Simplified map representation */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 relative overflow-hidden">
        {/* Map background with grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Kabupaten markers */}
        {kabupatenData.map((kabupaten, index) => {
          // Convert lat/lng to relative positions on the map
          const x = ((kabupaten.lng - 119) / (125 - 119)) * 100;
          const y = ((kabupaten.lat - (-11)) / (-8 - (-11))) * 100;
          
          return (
            <div
              key={kabupaten.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-125"
              style={{
                left: `${Math.max(5, Math.min(95, x))}%`,
                top: `${Math.max(5, Math.min(95, y))}%`,
              }}
              onMouseEnter={() => setHoveredKabupaten(kabupaten)}
              onMouseLeave={() => setHoveredKabupaten(null)}
            >
              <div
                className="rounded-full border-2 border-white shadow-lg"
                style={{
                  width: `${getRadius(kabupaten.prevalensi) * 3}px`,
                  height: `${getRadius(kabupaten.prevalensi) * 3}px`,
                  backgroundColor: getColor(kabupaten.prevalensi),
                }}
              ></div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="font-bold text-sm text-gray-700 mb-2">Prevalensi Stunting (%)</h4>
          <div className="space-y-1">
            {[
              { range: '40+', color: '#800026' },
              { range: '35-40', color: '#BD0026' },
              { range: '30-35', color: '#E31A1C' },
              { range: '25-30', color: '#FC4E2A' },
              { range: '20-25', color: '#FD8D3C' },
              { range: '15-20', color: '#FEB24C' },
              { range: '10-15', color: '#FED976' },
              { range: '<10', color: '#FFEDA0' },
            ].map((item, i) => (
              <div key={i} className="flex items-center text-xs">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600">{item.range}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hover tooltip */}
        {hoveredKabupaten && (
          <div className="absolute bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-10"
               style={{
                 left: `${Math.max(5, Math.min(85, ((hoveredKabupaten.lng - 119) / (125 - 119)) * 100))}%`,
                 top: `${Math.max(5, Math.min(85, ((hoveredKabupaten.lat - (-11)) / (-8 - (-11))) * 100))}%`,
                 transform: 'translate(-50%, -100%)',
                 marginTop: '-10px'
               }}>
            <div className="text-center">
              <h3 className="font-bold text-sm text-gray-800">{hoveredKabupaten.name}</h3>
              <p className="text-lg font-bold" style={{ color: getColor(hoveredKabupaten.prevalensi) }}>
                {hoveredKabupaten.prevalensi}%
              </p>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}

        {/* Map title */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-1 text-primary-600" />
            <span className="font-medium">NTT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuntingMap; 