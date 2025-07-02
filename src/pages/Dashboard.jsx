import React, { useState, useEffect, useRef } from 'react';
// Menambahkan ArrowLeft dan ChevronUp ke dalam import
import { Sun, Moon, Satellite, Expand, Maximize, Minimize, ChevronDown, Check, Target, PieChart, ArrowUpCircle, ArrowDownCircle, TrendingUp, Globe, Info, Award, ArrowLeft, ChevronUp } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- CUSTOM HOOK UNTUK ANIMASI ANGKA ---
const useCountUp = (end, duration = 1500, start = 0) => {
    const [count, setCount] = useState(start);
    const frameRef = useRef(null);
    const startTimeRef = useRef(null);
    const easeOutQuad = t => t * (2 - t);
    useEffect(() => {
        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const currentCount = start + (end - start) * easedProgress;
            setCount(currentCount);
            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };
        startTimeRef.current = null;
        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [end, start, duration]);
    return count;
};

// Opsi Base Map
const basemaps = {
    light: { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' },
    dark: { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' },
    satellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: 'Tiles &copy; Esri' },
};

const getCategory = (prevalensi) => {
    const iconProps = 'xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    if (prevalensi > 40) return { name: 'Sangat Tinggi', color: '#dc2626', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>` };
    if (prevalensi > 30) return { name: 'Tinggi', color: '#f97316', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>` };
    if (prevalensi > 20) return { name: 'Sedang', color: '#eab308', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 3v19"/></svg>` };
    return { name: 'Rendah', color: '#16a34a', icon: `<svg ${iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>` };
};

const categoryOptions = [
    { value: 'Sangat Tinggi', label: 'Sangat Tinggi' },
    { value: 'Tinggi', label: 'Tinggi' },
    { value: 'Sedang', label: 'Sedang' },
    { value: 'Rendah', label: 'Rendah' }
];

const stuntingFacts = [
    { icon: <Award size={14} />, text: "NTT menempati peringkat ke-2 provinsi dengan prevalensi stunting tertinggi di Indonesia pada 2023.", color: "text-red-600" },
    { icon: <TrendingUp size={14} />, text: "Angka prevalensi stunting NTT tahun 2023 (37.9%) naik dari tahun 2022 (35.3%).", color: "text-red-600" },
    { icon: <Target size={14} />, text: "Target prevalensi stunting nasional pada tahun 2024 adalah turun hingga 14%.", color: "text-blue-600" },
    { icon: <Globe size={14} />, text: "Kabupaten Timor Tengah Selatan dan Sumba Barat Daya tercatat memiliki prevalensi tertinggi di NTT.", color: "text-orange-600" },
    { icon: <Info size={14} />, text: "Stunting disebabkan oleh kekurangan gizi kronis dalam 1.000 Hari Pertama Kehidupan (HPK).", color: "text-gray-600" },
    { icon: <Check size={14} />, text: "Intervensi gizi spesifik dan sensitif adalah strategi kunci untuk percepatan penurunan stunting.", color: "text-green-600" }
];


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CustomMultiSelect = ({
    options, selectedValues, onChange, placeholder, allSelectedText,
    isCustomMode = false,
    isCustomRangeActive, setIsCustomRangeActive,
    customRange, setCustomRange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isAllSelected = options.length > 0 && selectedValues.length === options.length;
    const handleOptionClick = (value) => {
        const newSelectedValues = selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
        onChange(newSelectedValues);
    };
    const handleSelectAllClick = () => {
        if (isAllSelected) {
            onChange([]);
        } else {
            onChange(options.map(opt => opt.value));
        }
    };
    const handleRangeChange = (e) => {
        const { name, value } = e.target;
        let numValue = parseFloat(value);
        if (numValue < 0) numValue = 0;
        if (numValue > 100) numValue = 100;
        setCustomRange(prev => ({ ...prev, [name]: numValue }));
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const getDisplayText = () => {
        if (isCustomRangeActive) return `Rentang: ${customRange.min}% - ${customRange.max}%`;
        if (selectedValues.length === 0) return placeholder;
        if (isAllSelected) return allSelectedText;
        if (selectedValues.length > 2) return `${selectedValues.length} dipilih`;
        return options.filter(opt => selectedValues.includes(opt.value)).map(opt => {
            const labelParts = opt.label.split(' ');
            if (options.some(o => o.label.includes('.'))) labelParts.shift();
            return labelParts.join(' ');
        }).join(', ');
    };
    return (
        <div className="relative w-72" ref={dropdownRef}>
            <button type="button" className="w-full bg-gray-100 border-gray-300 rounded-lg text-sm px-4 py-2 text-left flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
                <span className="truncate">{getDisplayText()}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute z-[1200] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto origin-top transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {isCustomMode ? (
                    <>
                        <div className="flex border-b">
                            <button onClick={() => setIsCustomRangeActive(false)} className={`flex-1 p-2 text-sm font-semibold ${!isCustomRangeActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}>Kategori</button>
                            <button onClick={() => setIsCustomRangeActive(true)} className={`flex-1 p-2 text-sm font-semibold ${isCustomRangeActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}>Rentang Kustom</button>
                        </div>
                        {!isCustomRangeActive ? (
                            <>
                                <div className="flex items-center px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer border-b" onClick={handleSelectAllClick}><div className={`w-4 h-4 mr-3 border-2 rounded flex-shrink-0 flex items-center justify-center ${isAllSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>{isAllSelected && <Check size={12} className="text-white" />}</div><span>Pilih Semua</span></div>
                                {options.map((option) => (<div key={option.value} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick(option.value)}><div className={`w-4 h-4 mr-3 border-2 rounded flex-shrink-0 flex items-center justify-center ${selectedValues.includes(option.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>{selectedValues.includes(option.value) && <Check size={12} className="text-white" />}</div><span>{option.label}</span></div>))}
                            </>
                        ) : (
                            <div className="p-3 space-y-2" onClick={e => e.stopPropagation()}>
                                <p className="text-xs text-gray-600">Masukkan rentang prevalensi (0-100).</p>
                                <div className="flex items-center justify-between gap-2">
                                    <input type="number" name="min" value={customRange.min} onChange={handleRangeChange} className="w-full rounded-md border-gray-300 shadow-sm text-sm" placeholder="Min" />
                                    <span>-</span>
                                    <input type="number" name="max" value={customRange.max} onChange={handleRangeChange} className="w-full rounded-md border-gray-300 shadow-sm text-sm" placeholder="Max" />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex items-center px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer border-b" onClick={handleSelectAllClick}><div className={`w-4 h-4 mr-3 border-2 rounded flex-shrink-0 flex items-center justify-center ${isAllSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>{isAllSelected && <Check size={12} className="text-white" />}</div><span>Pilih Semua</span></div>
                        {options.map((option) => (<div key={option.value} className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick(option.value)}><div className={`w-4 h-4 mr-3 border-2 rounded flex-shrink-0 flex items-center justify-center ${selectedValues.includes(option.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>{selectedValues.includes(option.value) && <Check size={12} className="text-white" />}</div><span>{option.label}</span></div>))}
                    </>
                )}
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [geojsonData, setGeojsonData] = useState(null);
    const [kabupatenOptions, setKabupatenOptions] = useState([]);
    const [districtCategoryCounts, setDistrictCategoryCounts] = useState({ sangatTinggi: 0, tinggi: 0, sedang: 0, rendah: 0 });
    const [selectedCategories, setSelectedCategories] = useState(categoryOptions.map(opt => opt.value));
    const [selectedKabupaten, setSelectedKabupaten] = useState([]);
    const [isCustomRangeActive, setIsCustomRangeActive] = useState(false);
    const [customRange, setCustomRange] = useState({ min: 0, max: 100 });
    const [activeBasemap, setActiveBasemap] = useState('light');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const tileLayerRef = useRef(null);
    const geoJsonLayerRef = useRef(null);
    const [topHighest, setTopHighest] = useState([]);
    const [topLowest, setTopLowest] = useState([]);
    const [showTopHighest, setShowTopHighest] = useState(false);
    const [showTopLowest, setShowTopLowest] = useState(false);
    const [isHighestFading, setIsHighestFading] = useState(false);
    const [isLowestFading, setIsLowestFading] = useState(false);
    const [highlightedKecamatan, setHighlightedKecamatan] = useState(null);
    const highlightedLayerRef = useRef(null);
    const animatedPrevalence = useCountUp(37.9);
    const animatedSangatTinggi = useCountUp(districtCategoryCounts.sangatTinggi);
    const animatedTinggi = useCountUp(districtCategoryCounts.tinggi);
    const animatedSedang = useCountUp(districtCategoryCounts.sedang);
    const animatedRendah = useCountUp(districtCategoryCounts.rendah);
    const animatedHighestValue = useCountUp(topHighest.length > 0 ? topHighest[0].prevalence : 0);
    const animatedLowestValue = useCountUp(topLowest.length > 0 ? topLowest[0].prevalence : 0);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [isFactFading, setIsFactFading] = useState(false);
    const [isStatsVisible, setIsStatsVisible] = useState(true);

    useEffect(() => {
        const factTimer = setInterval(() => {
            setIsFactFading(true);
            setTimeout(() => {
                setCurrentFactIndex(prevIndex => (prevIndex + 1) % stuntingFacts.length);
                setIsFactFading(false);
            }, 500);
        }, 5000); 

        return () => clearInterval(factTimer);
    }, []);


    useEffect(() => {
        fetch('/src/data/peta ntt.geojson')
            .then(response => response.json())
            .then(data => {
                setGeojsonData(data);
                const uniqueKabupatens = Array.from(new Set(data.features.map(f => JSON.stringify({ kdkab: f.properties.kdkab, nmkab: f.properties.nmkab })))).map(item => JSON.parse(item));
                const sortedKabupatens = uniqueKabupatens.sort((a, b) => a.kdkab.localeCompare(b.kdkab));
                setKabupatenOptions(sortedKabupatens.map(k => ({ value: k.kdkab, label: `${k.kdkab} ${k.nmkab}` })));
                const features = data.features;
                if (!features || features.length === 0) return;
                const allKecamatan = features.map(feature => ({
                    ...feature.properties,
                    prevalence: feature.properties.Data_Estim * 100
                }));
                const sortedHighest = [...allKecamatan].sort((a, b) => b.prevalence - a.prevalence);
                const sortedLowest = [...allKecamatan].sort((a, b) => a.prevalence - b.prevalence);
                setTopHighest(sortedHighest.slice(0, 10));
                setTopLowest(sortedLowest.slice(0, 10));
            })
            .catch(error => console.error('Error loading GeoJSON:', error));
    }, []);

    useEffect(() => {
        if (kabupatenOptions.length > 0) {
            setSelectedKabupaten(kabupatenOptions.map(opt => opt.value));
        }
    }, [kabupatenOptions]);

    useEffect(() => {
        if (!geojsonData) return;
        const counts = { sangatTinggi: 0, tinggi: 0, sedang: 0, rendah: 0 };
        geojsonData.features.forEach(feature => {
            const category = getCategory(feature.properties.Data_Estim * 100).name;
            if (category === 'Sangat Tinggi') counts.sangatTinggi++;
            else if (category === 'Tinggi') counts.tinggi++;
            else if (category === 'Sedang') counts.sedang++;
            else counts.rendah++;
        });
        setDistrictCategoryCounts(counts);
    }, [geojsonData]);

    const resetHighlight = () => {
        if (highlightedLayerRef.current) {
            geoJsonLayerRef.current.resetStyle(highlightedLayerRef.current);
            highlightedLayerRef.current = null;
        }
        setHighlightedKecamatan(null);
    };

    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current, { zoomControl: false }).setView([-9.5, 122], 7);
            L.control.zoom({ position: 'topright' }).addTo(mapInstanceRef.current);
            mapInstanceRef.current.on('click', resetHighlight);
            const style = document.createElement('style');
            style.textContent = ` .modern-popup .leaflet-popup-content-wrapper { background: transparent !important; border-radius: 12px !important; padding: 0 !important; box-shadow: none !important; } .modern-popup .leaflet-popup-content { margin: 0 !important; line-height: 1.4 !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; } .modern-popup .leaflet-popup-tip-container { margin-top: -1px; } .modern-popup .leaflet-popup-tip { background: rgba(255, 255, 255, 0.9) !important; border: none !important; box-shadow: none !important; } .popup-container { background: rgba(255, 255, 255, 0.9) !important; backdrop-filter: blur(10px) !important; border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 12px; box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.2); overflow: hidden; min-width: 210px; } .popup-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--category-color); } .popup-header { padding: 8px 12px 4px; } .popup-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 16px; font-size: 11px; font-weight: 600; background: var(--category-color); color: white; } .popup-badge svg { width: 13px !important; height: 13px !important; } .popup-content-main { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 4px 12px 10px; } .popup-info { flex: 1; } .popup-title { font-size: 16px; font-weight: 700; color: #1f2937; margin: 0; line-height: 1.2; } .popup-subtitle { font-size: 12px; color: #6b7280; margin: 0; font-weight: 500; } .popup-stats { text-align: right; } .popup-percentage { font-size: 28px; font-weight: 800; line-height: 1; background: linear-gradient(45deg, var(--category-color), var(--category-color-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; } .popup-label { font-size: 9px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; } .dark .modern-popup .leaflet-popup-tip { background: rgba(31, 41, 55, 0.9) !important; } .dark .popup-container { background: rgba(31, 41, 55, 0.85) !important; backdrop-filter: blur(10px) !important; border-color: rgba(255, 255, 255, 0.1); } .dark .popup-title { color: #f9fafb; } .dark .popup-subtitle { color: #d1d5db; } .dark .popup-percentage { } .dark .popup-label { color: #9ca3af; }`;
            document.head.appendChild(style);
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
        let featuresToRender = [];
        if (selectedKabupaten.length > 0 && (selectedCategories.length > 0 || isCustomRangeActive)) {
            featuresToRender = geojsonData.features.filter(feature => {
                const prevalensi = feature.properties.Data_Estim * 100;
                const kabupatenMatch = selectedKabupaten.includes(feature.properties.kdkab);
                if (!kabupatenMatch) return false;
                if (isCustomRangeActive) {
                    const min = customRange.min || 0;
                    const max = customRange.max || 100;
                    return prevalensi >= min && prevalensi <= max;
                }
                return selectedCategories.includes(getCategory(prevalensi).name);
            });
        }
        const filteredGeoJson = { type: 'FeatureCollection', features: featuresToRender };
        geoJsonLayerRef.current = L.geoJSON(filteredGeoJson, {
            style: (feature) => ({ fillColor: getCategory(feature.properties.Data_Estim * 100).color, weight: 1.5, opacity: 1, color: activeBasemap === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.8)', fillOpacity: 0.75, }),
            onEachFeature: (feature, layer) => { const props = feature.properties; const estimasi = (props.Data_Estim * 100); const category = getCategory(estimasi); const getLighterColor = (color) => { const colors = { '#dc2626': '#f87171', '#f97316': '#fb923c', '#eab308': '#facc15', '#16a34a': '#4ade80' }; return colors[color] || color; }; const administrativeType = props.kdkab.startsWith('71') ? 'Kota' : 'Kab.'; const popupContent = ` <div class="popup-container" style="--category-color: ${category.color}; --category-color-light: ${getLighterColor(category.color)};"> <div class="popup-header"> <div class="popup-badge"> ${category.icon} <span>${category.name}</span> </div> </div> <div class="popup-content-main"> <div class="popup-info"> <h3 class="popup-title">${props.nmkec}</h3> <p class="popup-subtitle">${administrativeType} ${props.nmkab}</p> </div> <div class="popup-stats"> <div class="popup-percentage">${estimasi.toFixed(1)}%</div> <div class="popup-label">Prevalensi</div> </div> </div> </div> `; layer.bindPopup(popupContent, { className: 'modern-popup', closeButton: false, autoPan: false, offset: L.point(0, -5) }); layer.on({ mouseover: (e) => { if (e.target !== highlightedLayerRef.current) { e.target.setStyle({ weight: 3, color: activeBasemap === 'dark' ? '#ffffff' : '#1f2937', fillOpacity: 0.9 }); e.target.bringToFront(); } e.target.openPopup(); }, mouseout: (e) => { if (e.target !== highlightedLayerRef.current) { geoJsonLayerRef.current.resetStyle(layer); } layer.closePopup(); }, click: (e) => { L.DomEvent.stopPropagation(e); resetHighlight(); setSelectedKabupaten([e.target.feature.properties.kdkab]); } }); },
        }).addTo(mapInstanceRef.current);
        if (featuresToRender.length > 0 && !highlightedKecamatan) {
            mapInstanceRef.current.fitBounds(geoJsonLayerRef.current.getBounds().pad(0.2));
        } else if (featuresToRender.length === 0) {
            mapInstanceRef.current.setView([-9.5, 122], 7);
        }
    }, [geojsonData, activeBasemap, selectedCategories, selectedKabupaten, isCustomRangeActive, customRange]);

    useEffect(() => {
        const map = mapInstanceRef.current;
        if (map) {
            setTimeout(() => { map.invalidateSize(); }, 400);
        }
        const handleEscKey = (event) => { if (event.key === 'Escape') setIsFullScreen(false); };
        if (isFullScreen) {
            window.addEventListener('keydown', handleEscKey);
        }
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isFullScreen]);

    const handleResetView = () => {
        setIsCustomRangeActive(false);
        setSelectedCategories(categoryOptions.map(opt => opt.value));
        setSelectedKabupaten(kabupatenOptions.map(opt => opt.value));
        resetHighlight();
    };

    const handleShowHighest = () => {
        setIsHighestFading(true);
        setTimeout(() => {
            setShowTopHighest(true);
            setIsHighestFading(false);
        }, 300);
    };

    const handleHideHighest = () => {
        setIsHighestFading(true);
        setTimeout(() => {
            setShowTopHighest(false);
            setIsHighestFading(false);
            resetHighlight();
        }, 300);
    };

    const handleShowLowest = () => {
        setIsLowestFading(true);
        setTimeout(() => {
            setShowTopLowest(true);
            setIsLowestFading(false);
        }, 300);
    };

    const handleHideLowest = () => {
        setIsLowestFading(true);
        setTimeout(() => {
            setShowTopLowest(false);
            setIsLowestFading(false);
            resetHighlight();
        }, 300);
    };

    const handleKecamatanClick = (kec) => {
        if (!mapInstanceRef.current || !geoJsonLayerRef.current) return;
        resetHighlight();
        const targetLayer = geoJsonLayerRef.current.getLayers().find(
            layer => layer.feature.properties.kdkec === kec.kdkec
        );
        if (targetLayer) {
            mapInstanceRef.current.flyToBounds(targetLayer.getBounds(), { padding: [50, 50], maxZoom: 13 });
            targetLayer.openPopup();
            targetLayer.setStyle({
                weight: 4,
                color: '#00FFFF',
                fillOpacity: 0.95
            });
            targetLayer.bringToFront();
            highlightedLayerRef.current = targetLayer;
            setHighlightedKecamatan(kec.kdkec);
        }
    };

    return (
        <>
            <style>{`
                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-15px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fadeInRight { from { opacity: 0; transform: translateX(15px); } to { opacity: 1; transform: translateX(0); } }
                .animate-fade-in-down { animation: fadeInDown 0.5s ease-out forwards; }
                .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
                .animate-fade-in-left { animation: fadeInLeft 0.5s ease-out forwards; opacity: 0; }
                .animate-fade-in-right { animation: fadeInRight 0.5s ease-out forwards; opacity: 0; }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .card-content-wrapper { position: relative; min-height: 140px; }
                .card-content { transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out; opacity: 1; transform: translateX(0); }
                .card-content.fading { opacity: 0; transform: translateX(-10px); }
                .card-content.entering { opacity: 0; transform: translateX(10px); animation: card-enter 0.3s ease-out forwards; }
                @keyframes card-enter { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
                .card { @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6; }
                .list-item-highlighted { @apply bg-blue-100 ring-2 ring-blue-400; }
                .card-highlighted { @apply shadow-2xl ring-2 ring-offset-2 ring-blue-500; }
                .scrollable-list { max-height: 140px; overflow-y: auto; padding-right: 8px; }
                .scrollable-list::-webkit-scrollbar { width: 6px; }
                .scrollable-list::-webkit-scrollbar-track { background: transparent; }
                .scrollable-list::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
                .scrollable-list::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
                .rank-circle { @apply flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex-shrink-0; }
                .fact-carousel { transition: opacity 0.5s ease-in-out; opacity: 1; }
                .fact-carousel.fading { opacity: 0; }
                
                /* Background Pattern - Updated untuk sesuai dengan Home */
                .bg-pattern {
                    position: relative;
                    background-color: white;
                }

                .bg-pattern::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 50vh; /* Pattern hanya setengah tinggi layar */
                    background-image: url('src/assets/Asset 4.svg');
                    background-size: auto 200px;
                    background-repeat: repeat;
                    background-position: center top;
                    filter: grayscale(100%) brightness(4) contrast(0.8);
                    opacity: 0.2;
                    z-index: 0;
                }

                .bg-pattern::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 50vh; /* Gradient overlay hanya setengah tinggi layar */
                    background: linear-gradient(to bottom, transparent 0%, white 80%);
                    z-index: 1;
                    pointer-events: none;
                }

                /* Pastikan konten utama berada di atas background */
                .bg-pattern > * {
                    position: relative;
                    z-index: 10;
                }
            `}</style>

            <div className={`min-h-screen bg-pattern relative ${activeBasemap === 'dark' ? 'dark' : ''}`}>
                <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    {!isFullScreen && (
                        <>
                            <div className="text-center space-y-4 animate-fade-in-down">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900"><span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Dashboard Prevalensi Stunting</span></h1>
                                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Level Kecamatan Provinsi Nusa Tenggara Timur tahun 2023</p>
                            </div>
                            
                            <div className="card animate-fade-in-up delay-100 relative overflow-hidden">
                                {/* Pattern Mega Mendung di kanan atas */}
                                <div className="absolute top-0 right-0 w-64 h-40 opacity-15 pointer-events-none">
                                    <svg 
                                        viewBox="0 0 200 120" 
                                        className="w-full h-full text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        {/* Pattern Mega Mendung - Motif Awan Tradisional */}
                                        
                                        {/* Baris pertama */}
                                        <path d="M20,20 Q30,10 45,20 Q55,10 70,20 Q80,10 95,20 Q105,10 120,20 Q130,10 145,20 Q155,10 170,20 Q180,10 190,20" 
                                              strokeLinecap="round" opacity="0.8"/>
                                        
                                        {/* Awan besar pertama */}
                                        <path d="M10,30 Q20,15 35,25 Q50,10 70,25 Q85,15 100,25 Q115,10 135,25 Q150,15 165,25 Q180,10 190,25" 
                                              strokeLinecap="round" opacity="0.7"/>
                                              
                                        {/* Spiral dalam awan */}
                                        <path d="M40,25 Q45,20 50,25 Q55,30 50,35 Q40,35 40,25" 
                                              strokeLinecap="round" opacity="0.6"/>
                                        <path d="M120,25 Q125,20 130,25 Q135,30 130,35 Q120,35 120,25" 
                                              strokeLinecap="round" opacity="0.6"/>
                                        
                                        {/* Baris kedua dengan offset */}
                                        <path d="M0,45 Q15,35 30,45 Q45,30 65,45 Q80,35 95,45 Q110,30 130,45 Q145,35 160,45 Q175,30 195,45" 
                                              strokeLinecap="round" opacity="0.6"/>
                                              
                                        {/* Awan menengah */}
                                        <path d="M25,55 Q35,45 50,55 Q65,40 85,55 Q100,45 115,55 Q130,40 150,55 Q165,45 180,55" 
                                              strokeLinecap="round" opacity="0.5"/>
                                              
                                        {/* Detail spiral kecil */}
                                        <path d="M70,55 Q73,52 76,55 Q79,58 76,61 Q70,61 70,55" 
                                              strokeLinecap="round" opacity="0.4"/>
                                        <path d="M140,55 Q143,52 146,55 Q149,58 146,61 Q140,61 140,55" 
                                              strokeLinecap="round" opacity="0.4"/>
                                        
                                        {/* Baris ketiga */}
                                        <path d="M15,70 Q25,60 40,70 Q55,55 75,70 Q90,60 105,70 Q120,55 140,70 Q155,60 170,70 Q185,55 200,70" 
                                              strokeLinecap="round" opacity="0.4"/>
                                              
                                        {/* Awan kecil */}
                                        <path d="M35,80 Q45,70 60,80 Q75,65 95,80 Q110,70 125,80 Q140,65 160,80 Q175,70 190,80" 
                                              strokeLinecap="round" opacity="0.3"/>
                                              
                                        {/* Baris bawah halus */}
                                        <path d="M5,95 Q20,85 35,95 Q50,80 70,95 Q85,85 100,95 Q115,80 135,95 Q150,85 165,95 Q180,80 195,95" 
                                              strokeLinecap="round" opacity="0.2"/>
                                              
                                        {/* Detail kecil tambahan */}
                                        <circle cx="55" cy="40" r="2" opacity="0.3" fill="currentColor"/>
                                        <circle cx="85" cy="65" r="1.5" opacity="0.25" fill="currentColor"/>
                                        <circle cx="155" cy="35" r="2" opacity="0.3" fill="currentColor"/>
                                        <circle cx="25" cy="75" r="1" opacity="0.2" fill="currentColor"/>
                                        
                                        {/* Garis halus penghubung */}
                                        <path d="M0,105 Q50,100 100,105 Q150,100 200,105" 
                                              strokeLinecap="round" opacity="0.15" strokeWidth="1"/>
                                    </svg>
                                </div>
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsStatsVisible(!isStatsVisible)}>
                                    <h2 className="text-2xl font-bold text-gray-900">Statistik Prevalensi Stunting</h2>
                                    <button
                                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                        aria-expanded={isStatsVisible}
                                        aria-controls="stats-content"
                                    >
                                        <span className="sr-only">Buka atau tutup statistik</span>
                                        {isStatsVisible ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </button>
                                </div>

                                <div
                                    id="stats-content"
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isStatsVisible ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 animate-fade-in-up delay-200 transition-all duration-300 hover:shadow-md flex flex-col">
                                            <div className="flex items-center space-x-3 mb-4"><div className="p-2 rounded-lg bg-red-100"><Target className="w-5 h-5 text-red-600" /></div><h3 className="text-sm font-semibold text-red-700">Prevalensi Provinsi</h3></div>
                                            <div className="text-5xl font-bold text-red-600 mb-2">{animatedPrevalence.toFixed(1)}<span className="text-xl">%</span></div>
                                            <div className="mt-auto space-y-2">
                                                <div className="min-h-[40px]">
                                                    <div className={`fact-carousel ${isFactFading ? 'fading' : ''}`}>
                                                        <div className={`flex items-start gap-2 text-xs font-medium ${stuntingFacts[currentFactIndex].color}`}>
                                                            <div className="flex-shrink-0 mt-0.5">{stuntingFacts[currentFactIndex].icon}</div>
                                                            <span>{stuntingFacts[currentFactIndex].text}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center gap-1.5 pt-1">
                                                    {stuntingFacts.map((_, index) => (
                                                        <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentFactIndex ? 'w-4 bg-red-500' : 'w-1.5 bg-red-200'}`}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 animate-fade-in-up delay-300 transition-all duration-300 hover:shadow-md">
                                            <div className="flex items-center space-x-3 mb-4"><div className="p-2 rounded-lg bg-blue-100"><PieChart className="w-5 h-5 text-blue-600" /></div><h3 className="text-sm font-semibold text-blue-700">Sebaran Kecamatan</h3></div>
                                            <div className="space-y-3 text-sm"><div className="flex justify-between items-center"><span className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span><span className="text-gray-700">Sangat Tinggi</span></span><span className="font-bold text-gray-900">{Math.round(animatedSangatTinggi)}</span></div><div className="flex justify-between items-center"><span className="flex items-center"><span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span><span className="text-gray-700">Tinggi</span></span><span className="font-bold text-gray-900">{Math.round(animatedTinggi)}</span></div><div className="flex justify-between items-center"><span className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span><span className="text-gray-700">Sedang</span></span><span className="font-bold text-gray-900">{Math.round(animatedSedang)}</span></div><div className="flex justify-between items-center"><span className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span><span className="text-gray-700">Rendah</span></span><span className="font-bold text-gray-900">{Math.round(animatedRendah)}</span></div></div>
                                        </div>
                                        <div className={`p-4 rounded-xl bg-orange-50 border border-orange-100 animate-fade-in-up delay-400 transition-all duration-300 hover:shadow-md ${highlightedKecamatan && topHighest.some(k => k.kdkec === highlightedKecamatan) ? 'card-highlighted' : ''}`}>
                                            <div className="flex items-center justify-between mb-4"><div className="flex items-center space-x-3"><div className="p-2 rounded-lg bg-orange-100"><ArrowUpCircle className="w-5 h-5 text-orange-600" /></div><h3 className="text-sm font-semibold text-orange-700">Kecamatan Tertinggi</h3></div><div className={`transition-opacity duration-300 ${showTopHighest ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><button onClick={handleHideHighest} className="text-xs font-semibold flex items-center text-orange-600 hover:text-orange-700"><ArrowLeft size={12} className="mr-1" />Kembali</button></div></div>
                                            <div className="card-content-wrapper">{topHighest.length > 0 ? (<><div className={`card-content ${isHighestFading || showTopHighest ? 'fading' : ''} ${!isHighestFading && !showTopHighest ? 'entering' : 'pointer-events-none'}`}><p className="text-base font-bold text-gray-900 leading-tight truncate mb-1">{topHighest[0].nmkec}</p><p className="text-xs text-gray-600 mb-3 truncate">{topHighest[0].kdkab.startsWith('71') ? 'Kota' : 'Kab.'} {topHighest[0].nmkab}</p><p className="text-2xl font-bold text-orange-600 mb-2">{animatedHighestValue.toFixed(1)}%</p><button onClick={handleShowHighest} className="text-xs font-medium text-orange-600 hover:text-orange-700 hover:underline">Lihat Selengkapnya →</button></div><div className={`absolute top-0 left-0 w-full card-content ${isHighestFading || !showTopHighest ? 'fading' : ''} ${!isHighestFading && showTopHighest ? 'entering' : 'pointer-events-none'}`}>
                                                <div className="space-y-1 text-xs scrollable-list">{topHighest.map((kec, index) => (
                                                    <div key={index} onClick={() => handleKecamatanClick(kec)} className={`flex items-center justify-between p-1.5 rounded-md cursor-pointer hover:bg-orange-100 transition-colors ${highlightedKecamatan === kec.kdkec ? 'list-item-highlighted' : ''}`}>
                                                        <div className="flex items-center flex-1 min-w-0"><div className="rank-circle mr-3">{index + 1}</div><div className="flex-1 min-w-0"><p className="font-semibold text-gray-900 truncate">{kec.nmkec}</p><p className="text-gray-600 truncate">{kec.kdkab.startsWith('71') ? 'Kota' : 'Kab.'} {kec.nmkab}</p></div></div>
                                                        <p className="font-bold text-orange-600 text-sm ml-2">{kec.prevalence.toFixed(1)}%</p>
                                                    </div>
                                                ))}</div>
                                            </div></>) : (<div className="flex items-center justify-center h-20 text-sm text-gray-400">Memuat data...</div>)}</div>
                                        </div>
                                        <div className={`p-4 rounded-xl bg-green-50 border border-green-100 animate-fade-in-up delay-500 transition-all duration-300 hover:shadow-md ${highlightedKecamatan && topLowest.some(k => k.kdkec === highlightedKecamatan) ? 'card-highlighted' : ''}`}>
                                            <div className="flex items-center justify-between mb-4"><div className="flex items-center space-x-3"><div className="p-2 rounded-lg bg-green-100"><ArrowDownCircle className="w-5 h-5 text-green-600" /></div><h3 className="text-sm font-semibold text-green-700">Kecamatan Terendah</h3></div><div className={`transition-opacity duration-300 ${showTopLowest ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><button onClick={handleHideLowest} className="text-xs font-semibold flex items-center text-green-600 hover:text-green-700"><ArrowLeft size={12} className="mr-1" />Kembali</button></div></div>
                                            <div className="card-content-wrapper">{topLowest.length > 0 ? (<><div className={`card-content ${isLowestFading || showTopLowest ? 'fading' : ''} ${!isLowestFading && !showTopLowest ? 'entering' : 'pointer-events-none'}`}><p className="text-base font-bold text-gray-900 leading-tight truncate mb-1">{topLowest[0].nmkec}</p><p className="text-xs text-gray-600 mb-3 truncate">{topLowest[0].kdkab.startsWith('71') ? 'Kota' : 'Kab.'} {topLowest[0].nmkab}</p><p className="text-2xl font-bold text-green-600 mb-2">{animatedLowestValue.toFixed(1)}%</p><button onClick={handleShowLowest} className="text-xs font-medium text-green-600 hover:text-green-700 hover:underline">Lihat Selengkapnya →</button></div><div className={`absolute top-0 left-0 w-full card-content ${isLowestFading || !showTopLowest ? 'fading' : ''} ${!isLowestFading && showTopLowest ? 'entering' : 'pointer-events-none'}`}>
                                                <div className="space-y-1 text-xs scrollable-list">{topLowest.map((kec, index) => (
                                                    <div key={index} onClick={() => handleKecamatanClick(kec)} className={`flex items-center justify-between p-1.5 rounded-md cursor-pointer hover:bg-green-100 transition-colors ${highlightedKecamatan === kec.kdkec ? 'list-item-highlighted' : ''}`}>
                                                        <div className="flex items-center flex-1 min-w-0"><div className="rank-circle mr-3">{index + 1}</div><div className="flex-1 min-w-0"><p className="font-semibold text-gray-900 truncate">{kec.nmkec}</p><p className="text-gray-600 truncate">{kec.kdkab.startsWith('71') ? 'Kota' : 'Kab.'} {kec.nmkab}</p></div></div>
                                                        <p className="font-bold text-green-600 text-sm ml-2">{kec.prevalence.toFixed(1)}%</p>
                                                    </div>
                                                ))}</div>
                                            </div></>) : (<div className="flex items-center justify-center h-20 text-sm text-gray-400">Memuat data...</div>)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    <div className={`card transition-all duration-300 ease-in-out ${isFullScreen ? 'fixed inset-0 z-[10000] rounded-none' : 'animate-fade-in-up delay-200'}`}>
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                            <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap flex-shrink-0">Peta Interaktif</h2>
                            <div className="flex w-full items-center justify-end gap-3 flex-nowrap">
                                <CustomMultiSelect options={categoryOptions} selectedValues={selectedCategories} onChange={setSelectedCategories} placeholder="Pilih Kategori/Rentang..." allSelectedText="Semua Kategori" isCustomMode={true} isCustomRangeActive={isCustomRangeActive} setIsCustomRangeActive={setIsCustomRangeActive} customRange={customRange} setCustomRange={setCustomRange} />
                                <CustomMultiSelect options={kabupatenOptions} selectedValues={selectedKabupaten} onChange={setSelectedKabupaten} placeholder="Pilih Kabupaten/Kota..." allSelectedText="Semua Kabupaten/Kota" />
                            </div>
                        </div>
                        <div className="relative" style={{ height: isFullScreen ? 'calc(100vh - 140px)' : '600px' }}>
                            <div ref={mapRef} className="w-full h-full rounded-xl border border-gray-200 overflow-hidden shadow-sm" />
                            <div className="absolute top-4 left-4 z-[1000] animate-fade-in-left delay-400">
                                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-2 flex flex-col gap-2">
                                    <button onClick={() => setActiveBasemap('light')} title="Mode Terang" className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${activeBasemap === 'light' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'}`}><Sun size={18} /></button>
                                    <button onClick={() => setActiveBasemap('dark')} title="Mode Gelap" className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${activeBasemap === 'dark' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'}`}><Moon size={18} /></button>
                                    <button onClick={() => setActiveBasemap('satellite')} title="Mode Satelit" className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${activeBasemap === 'satellite' ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'}`}><Satellite size={18} /></button>
                                    <div className="h-px bg-gray-200 mx-1" />
                                    <button onClick={handleResetView} title="Reset Tampilan" className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105"><Expand size={18} /></button>
                                    <button onClick={() => setIsFullScreen(!isFullScreen)} title={isFullScreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105">{isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}</button>
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 max-w-xs z-[1000] animate-fade-in-right delay-400">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center"><PieChart size={16} className="mr-2" />Prevalensi Stunting</h4>
                                <div className="space-y-2 text-xs text-gray-700">
                                    <div className="flex items-center justify-between"><div className="flex items-center"><span className="w-4 h-4 rounded-full mr-3" style={{ background: '#dc2626' }}></span><span>Sangat Tinggi</span></div><span className="text-gray-500">&gt;40%</span></div>
                                    <div className="flex items-center justify-between"><div className="flex items-center"><span className="w-4 h-4 rounded-full mr-3" style={{ background: '#f97316' }}></span><span>Tinggi</span></div><span className="text-gray-500">30-40%</span></div>
                                    <div className="flex items-center justify-between"><div className="flex items-center"><span className="w-4 h-4 rounded-full mr-3" style={{ background: '#eab308' }}></span><span>Sedang</span></div><span className="text-gray-500">20-30%</span></div>
                                    <div className="flex items-center justify-between"><div className="flex items-center"><span className="w-4 h-4 rounded-full mr-3" style={{ background: '#16a34a' }}></span><span>Rendah</span></div><span className="text-gray-500">&lt;20%</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;