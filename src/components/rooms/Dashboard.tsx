import { Home, Lightbulb, Power } from 'lucide-react';
import { useHome } from '@/context/HomeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { state, dispatch } = useHome();

  const handleResetHome = () => {
    if (window.confirm('¿Estás seguro de que quieres resetear toda la casa al estado inicial?')) {
      dispatch({ type: 'RESET_HOME' });
    }
  };

  const countLightsOn = (roomDevices: any) => {
    return Object.values(roomDevices).filter(
      (device: any) => device.type === 'light' && device.isOn
    ).length;
  };

  const countActiveDevices = (roomDevices: any) => {
    return Object.values(roomDevices).filter((device: any) => {
      if (device.type === 'light' || device.type === 'tv' || device.type === 'oven') {
        return device.isOn;
      }
      if (device.type === 'fan') {
        return device.isOn;
      }
      return false;
    }).length;
  };

  const rooms = [
    { id: 'comedor', name: 'Comedor', path: '/comedor', icon: '🍽️' },
    { id: 'dormitorio', name: 'Dormitorio', path: '/dormitorio', icon: '🛏️' },
    { id: 'baño', name: 'Baño', path: '/baño', icon: '🚿' },
    { id: 'sala', name: 'Sala de Estar', path: '/sala', icon: '🛋️' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Home className="w-8 h-8 text-blue-600" />
            Control Domótico
          </h1>
          <p className="text-gray-500 mt-1">Gestiona todos los dispositivos de tu hogar</p>
        </div>
        <Button onClick={handleResetHome} variant="danger">
          <Power className="w-4 h-4 mr-2" />
          Reset Casa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((room) => {
          const roomData = state.rooms[room.id as keyof typeof state.rooms];
          const lightsOn = countLightsOn(roomData.devices);
          const activeDevices = countActiveDevices(roomData.devices);
          const totalDevices = Object.keys(roomData.devices).length;

          return (
            <Link key={room.id} to={room.path}>
              <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">{room.icon}</span>
                    {room.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Lightbulb
                      className={`w-4 h-4 ${lightsOn > 0 ? 'text-yellow-500' : 'text-gray-400'}`}
                    />
                    <span>
                      {lightsOn > 0 ? `${lightsOn} luz(es) encendida(s)` : 'Sin luces encendidas'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Power
                      className={`w-4 h-4 ${
                        activeDevices > 0 ? 'text-green-500' : 'text-gray-400'
                      }`}
                    />
                    <span>
                      {activeDevices} de {totalDevices} dispositivos activos
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estado General de la Casa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {rooms.map((room) => {
              const roomData = state.rooms[room.id as keyof typeof state.rooms];
              const activeDevices = countActiveDevices(roomData.devices);

              return (
                <div key={room.id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl mb-1">{room.icon}</p>
                  <p className="font-semibold text-sm">{room.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeDevices} activo{activeDevices !== 1 ? 's' : ''}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
