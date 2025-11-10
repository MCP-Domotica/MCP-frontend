import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomeProvider } from './context/HomeContext';
import { Dashboard } from './components/rooms/Dashboard';
import { DiningRoom } from './components/rooms/DiningRoom';
import { BedRoom } from './components/rooms/BedRoom';
import { BathRoom } from './components/rooms/Bathroom';
import { LivingRoom } from './components/rooms/LivingRoom';
import './App.css';

function App() {
  return (
    <HomeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/comedor" element={<DiningRoom />} />
              <Route path="/dormitorio" element={<BedRoom />} />
              <Route path="/baño" element={<BathRoom />} />
              <Route path="/sala" element={<LivingRoom />} />
            </Routes>
          </div>
        </div>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </HomeProvider>
  );
}

export default App;