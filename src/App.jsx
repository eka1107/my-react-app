import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import WebStory from './pages/WebStory';
import Dashboard from './pages/Dashboard';
import ThematicMap from './pages/ThematicMap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/story" element={<WebStory />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<ThematicMap />} />
        </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Stunting NTT Visualizer. All rights reserved.</p>
                <p>Data Source: SSGI 2023, BPS, Kemenkes</p>
            </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
