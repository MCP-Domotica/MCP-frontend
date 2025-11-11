import { useEffect } from 'react';
import { Home, Lightbulb, Power, RefreshCw, Thermometer, Wind, Flame } from 'lucide-react';
import { useHome } from '@/context/HomeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ChatWidget } from '../chat/ChatWidget';

// Mapeo de iconos por tipo de habitación
const getRoomIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    'comedor': '🍽️',
    'dining': '🍽️',
    'dormitorio': '🛏️',
    'bedroom': '🛏️',
    'baño': '🚿',
    'bathroom': '🚿',
    'bath': '🚿',
    'sala': '🛋️',
    'living': '🛋️',
    'cocina': '🍳',
    'kitchen': '🍳',
  };
  
  return iconMap[type.toLowerCase()] || '🏠';
};

export const Dashboard: React.FC = () => {
  const { rooms, systemStatus, loading, error, fetchSystemStatus, refreshData } = useHome();

  useEffect(() => {
    fetchSystemStatus();
  }, [fetchSystemStatus]);

  const handleRefresh = () => {
    refreshData();
  };

  if (loading && rooms.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando habitaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={handleRefresh}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Home className="w-8 h-8 text-blue-600" />
              Control Domótico
            </h1>
            <p className="text-gray-500 mt-1">Gestiona todos los dispositivos de tu hogar</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        {rooms.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay habitaciones disponibles</h3>
              <p className="text-gray-500 mb-4">
                Usa el chat para crear habitaciones y agregar dispositivos
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rooms.map((room) => {
                const icon = getRoomIcon(room.type);
                const lightsOn = room.light_count || 0;
                const totalDevices = room.total_devices || 0;

                return (
                  <Link key={room.name} to={`/room/${encodeURIComponent(room.name)}`}>
                    <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="text-2xl">{icon}</span>
                          {room.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Lightbulb
                            className={`w-4 h-4 ${
                              lightsOn > 0 ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                          />
                          <span>
                            {lightsOn > 0 ? `${lightsOn} luz(es)` : 'Sin luces'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Power
                            className={`w-4 h-4 ${
                              totalDevices > 0 ? 'text-green-500' : 'text-gray-400'
                            }`}
                          />
                          <span>{totalDevices} dispositivo{totalDevices !== 1 ? 's' : ''}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {systemStatus && (
              <Card>
                <CardHeader>
                  <CardTitle>Estado General del Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">
                        {systemStatus.total_rooms}
                      </p>
                      <p className="text-sm text-gray-600">Habitaciones</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <Power className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">
                        {systemStatus.total_devices}
                      </p>
                      <p className="text-sm text-gray-600">Dispositivos</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg text-center">
                      <Lightbulb className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-yellow-600">
                        {systemStatus.devices.filter((d) => d.type === 'light').length}
                      </p>
                      <p className="text-sm text-gray-600">Luces</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">
                        {systemStatus.devices.filter((d) => d.type === 'thermostat').length}
                      </p>
                      <p className="text-sm text-gray-600">Termostatos</p>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg text-center">
                      <Wind className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-cyan-600">
                        {systemStatus.devices.filter((d) => d.type === 'fan').length}
                      </p>
                      <p className="text-sm text-gray-600">Ventiladores</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg text-center">
                      <Flame className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-red-600">
                        {systemStatus.devices.filter((d) => d.type === 'oven').length}
                      </p>
                      <p className="text-sm text-gray-600">Hornos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <ChatWidget onActionComplete={refreshData} />
    </>
  );
};
