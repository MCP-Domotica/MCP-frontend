import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomeProvider } from './context/HomeContext';
import { Dashboard } from './components/rooms/Dashboard';
import { RoomView } from './components/rooms/RoomView';
import './App.css';

function App() {
  return (
    <HomeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/room/:roomName" element={<RoomView />} />
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