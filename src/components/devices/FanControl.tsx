import { Fan } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useHome } from '@/context/HomeContext';
import type { RoomName, FanSpeed } from '@/context/HomeContext';

interface FanControlProps {

  room: RoomName;
}

export const FanControl: React.FC<FanControlProps> = ({ room }) => {
  const { state, dispatch } = useHome();
  const device = state.rooms[room]?.devices.fan;

  if (!device || device.type !== 'fan') {
    return null;
  }

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_FAN', room });
  };

  const handleSpeedChange = (speed: FanSpeed) => {
    if (speed === 'off') {
      dispatch({ type: 'TOGGLE_FAN', room });
    } else {
      dispatch({ type: 'SET_FAN_SPEED', room, speed });
    }
  };

  const speeds: FanSpeed[] = ['baja', 'media', 'alta'];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Fan 
            className={`w-5 h-5 ${device.isOn ? 'text-blue-500 animate-spin' : 'text-gray-400'}`}
            style={{ animationDuration: device.isOn ? '2s' : undefined }}
          />
          Ventilador
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {device.isOn ? 'Encendido' : 'Apagado'}
          </span>
          <Switch checked={device.isOn} onCheckedChange={handleToggle} />
        </div>

        {device.isOn && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Velocidad</p>
            <div className="flex gap-2">
              {speeds.map((speed) => (
                <Button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  variant={device.speed === speed ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 capitalize"
                >
                  {speed}
                </Button>
              ))}
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Actual: <span className="font-semibold capitalize">{device.speed}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
