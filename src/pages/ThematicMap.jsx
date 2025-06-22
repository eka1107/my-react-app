import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper component to load CSS ---
// This component dynamically adds the Leaflet CSS to the document's head
const LeafletCSS = () => {
  useEffect(() => {
    // Check if the stylesheet is already added to prevent duplicates
    if (document.querySelector('link[href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]')) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // No cleanup needed, the CSS should persist for the app's lifetime
  }, []);

  return null; // This component doesn't render anything
};


// Data koordinat kabupaten di NTT (tidak berubah)
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

// Helper functions (tidak berubah)
const getColor = (d) => {
  return d > 40 ? '#800026' : d > 35 ? '#BD0026' : d > 30 ? '#E31A1C' : d > 25 ? '#FC4E2A' : d > 20 ? '#FD8D3C' : d > 15 ? '#FEB24C' : d > 10 ? '#FED976' : '#FFEDA0';
};
const getRadius = (d) => {
  return d > 40 ? 13 : d > 35 ? 12 : d > 30 ? 11 : d > 25 ? 10 : d > 20 ? 9 : d > 15 ? 8 : d > 10 ? 7 : 6;
};

// Komponen Legend (tidak berubah)
const Legend = () => {
  const grades = [0, 10, 15, 20, 25, 30, 35, 40];
  return (
    <div className="absolute bottom-5 left-5 z-[1000] p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <h4 className="font-bold mb-2 text-sm text-gray-700">Prevalensi Stunting (%)</h4>
      {grades.map((grade, i) => (
        <div key={i} className="flex items-center my-1">
          <i style={{ background: getColor(grade + 1), width: '18px', height: '18px', borderRadius: '50%', marginRight: '8px', opacity: 0.8 }}></i>
          <span className="text-xs text-gray-600">{grade}{grades[i + 1] ? ` – ${grades[i + 1]}` : '+'}</span>
        </div>
      ))}
    </div>
  );
};


// Komponen Peta utama
function ThematicMap() {
  const [hoveredKabupaten, setHoveredKabupaten] = useState(null);
  // State to check if React-Leaflet library is loaded from the CDN
  const [libsReady, setLibsReady] = useState(false);

  useEffect(() => {
    // This hook checks if the ReactLeaflet library is available on the window object.
    // This is necessary because we are not using 'import' and instead relying on a
    // script loaded from a CDN.
    const checkLibs = () => {
      if (window.ReactLeaflet) {
        setLibsReady(true);
      } else {
        // If not ready, check again shortly.
        setTimeout(checkLibs, 100);
      }
    };
    checkLibs();
  }, []);


  // Do not render anything until the libraries are confirmed to be loaded.
  if (!libsReady) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat pustaka peta...</p>
        </div>
      </div>
    );
  }

  // ** FIX **
  // Destructure components from the global window.ReactLeaflet object
  // This avoids the "Could not resolve" build error.
  const { MapContainer, TileLayer, CircleMarker, Popup } = window.ReactLeaflet;

  return (
    <div className="relative h-screen w-full bg-gray-100">
      <LeafletCSS />
      
      <MapContainer 
        center={[-9.5, 122.5]} 
        zoom={8} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', backgroundColor: '#f0f0f0' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {kabupatenData.map((kabupaten) => (
          <CircleMarker
            key={kabupaten.name}
            center={[kabupaten.lat, kabupaten.lng]}
            pathOptions={{
              color: '#333',
              weight: 1,
              fillColor: getColor(kabupaten.prevalensi),
              fillOpacity: 0.8,
            }}
            radius={getRadius(kabupaten.prevalensi)}
            eventHandlers={{
              mouseover: (e) => {
                e.target.bringToFront();
                e.target.setStyle({ weight: 3, fillOpacity: 1 });
                setHoveredKabupaten(kabupaten);
              },
              mouseout: (e) => {
                e.target.setStyle({ weight: 1, fillOpacity: 0.8 });
                setHoveredKabupaten(null);
              },
            }}
          >
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-base text-gray-800 m-0">{kabupaten.name}</h3>
                <p className="text-gray-600 m-0">
                  Prevalensi: <span className="font-bold text-lg">{kabupaten.prevalensi}%</span>
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* --- UI Elements --- */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] p-3 px-5 bg-white/80 backdrop-blur-sm rounded-full shadow-xl"
      >
        <h1 className="text-xl font-bold text-gray-800 text-center">Peta Prevalensi Stunting NTT</h1>
      </motion.div>
      
      <Legend />
      
      <AnimatePresence>
        {hoveredKabupaten && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-5 right-5 z-[1000] p-3 bg-white rounded-lg shadow-2xl w-60 border-t-4"
            style={{borderColor: getColor(hoveredKabupaten.prevalensi)}}
          >
            <h2 className="text-base font-bold text-gray-800">{hoveredKabupaten.name}</h2>
            <p className="text-4xl font-bold" style={{color: getColor(hoveredKabupaten.prevalensi)}}>
              {hoveredKabupaten.prevalensi}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// The main App component is now this ThematicMap.
export default ThematicMap;
