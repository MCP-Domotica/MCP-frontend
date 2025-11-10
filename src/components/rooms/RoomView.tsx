import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Lightbulb, Thermometer, Wind, Tv, Flame } from 'lucide-react';
import { useHome, type Device, type RoomDetail } from '@/context/HomeContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChatWidget } from '../chat/ChatWidget';

// Mapeo de iconos por tipo de dispositivo
const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'light':
      return <Lightbulb className="w-5 h-5" />;
    case 'thermostat':
      return <Thermometer className="w-5 h-5" />;
    case 'fan':
      return <Wind className="w-5 h-5" />;
    case 'tv':
      return <Tv className="w-5 h-5" />;
    case 'oven':
      return <Flame className="w-5 h-5" />;
    default:
      return <Lightbulb className="w-5 h-5" />;
  }
};

// Mapeo de nombres de tipos en español
const getDeviceTypeName = (type: string): string => {
  const typeNames: Record<string, string> = {
    light: 'Luz',
    thermostat: 'Termostato',
    fan: 'Ventilador',
    tv: 'Televisor',
    oven: 'Horno',
  };
  return typeNames[type] || type;
};

const DeviceStateDisplay: React.FC<{ device: Device }> = ({ device }) => {
  const renderState = () => {
    switch (device.type) {
      case 'light':
        return (
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                device.state ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' : 'bg-gray-300'
              }`}
            />
            <span className={device.state ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
              {device.state ? 'Encendida' : 'Apagada'}
            </span>
          </div>
        );
      
      case 'thermostat':
        return (
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 font-medium">{device.state}°C</span>
          </div>
        );
      
      case 'fan':
        const fanSpeed = typeof device.state === 'number' ? device.state : 0;
        return (
          <div className="flex items-center gap-2">
            <Wind className={`w-4 h-4 ${fanSpeed > 0 ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className={fanSpeed > 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              {fanSpeed > 0 ? `Velocidad ${fanSpeed}` : 'Apagado'}
            </span>
          </div>
        );
      
      case 'oven':
        const ovenState = device.state as any;
        const isOn = ovenState?.isOn || ovenState === true;
        return (
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isOn ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-300'
              }`}
            />
            <span className={isOn ? 'text-red-600 font-medium' : 'text-gray-500'}>
              {isOn ? `${ovenState?.temperature || 180}°C` : 'Apagado'}
            </span>
          </div>
        );
      
      case 'tv':
        const tvState = device.state as any;
        const isTvOn = tvState?.isOn || tvState === true;
        return (
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isTvOn ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-300'
              }`}
            />
            <span className={isTvOn ? 'text-green-600 font-medium' : 'text-gray-500'}>
              {isTvOn ? `Canal ${tvState?.channel || 1}` : 'Apagado'}
            </span>
          </div>
        );
      
      default:
        return <span className="text-gray-500">Estado: {JSON.stringify(device.state)}</span>;
    }
  };

  return <div className="mt-3">{renderState()}</div>;
};

export const RoomView: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>();
  const { fetchRoomDetails } = useHome();
  const [roomData, setRoomData] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRoomData = async () => {
    if (!roomName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchRoomDetails(roomName);
      if (data) {
        setRoomData(data);
      } else {
        setError('No se pudieron cargar los datos de la habitación');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar la habitación');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoomData();
  }, [roomName]);

  const handleRefresh = async () => {
    await loadRoomData();
  };

  const handleChatAction = async () => {
    await handleRefresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando habitación...</p>
        </div>
      </div>
    );
  }

  if (error || !roomData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error || 'Habitación no encontrada'}</p>
          <div className="flex gap-2 justify-center">
            <Link to="/">
              <Button variant="outline">Volver al Dashboard</Button>
            </Link>
            <Button onClick={handleRefresh}>Reintentar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold capitalize">{roomData.room}</h1>
              <p className="text-gray-500 mt-1">
                {roomData.devices.length} dispositivo{roomData.devices.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        {roomData.devices.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay dispositivos en esta habitación</h3>
              <p className="text-gray-500 mb-4">
                Usa el chat para agregar dispositivos a esta habitación
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roomData.devices.map((device) => (
              <Card key={device.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getDeviceIcon(device.type)}
                    <span>
                      {getDeviceTypeName(device.type)}
                      <span className="text-xs text-gray-500 ml-2">({device.id})</span>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DeviceStateDisplay device={device} />
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Usa el chat para controlar este dispositivo
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Resumen de la Habitación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Lightbulb className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-yellow-600">{roomData.light_count}</p>
                <p className="text-xs text-gray-600">Luces</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Thermometer className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-blue-600">{roomData.thermostat_count}</p>
                <p className="text-xs text-gray-600">Termostatos</p>
              </div>
              <div className="text-center p-3 bg-cyan-50 rounded-lg">
                <Wind className="w-6 h-6 text-cyan-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-cyan-600">{roomData.fan_count}</p>
                <p className="text-xs text-gray-600">Ventiladores</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <Flame className="w-6 h-6 text-red-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-red-600">{roomData.oven_count}</p>
                <p className="text-xs text-gray-600">Hornos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ChatWidget onActionComplete={handleChatAction} />
    </>
  );
};
