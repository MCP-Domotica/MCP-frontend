import { Lightbulb, LightbulbOff } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useHome } from '@/context/HomeContext';
import type { RoomName } from '@/context/HomeContext';

interface LightControlProps {
  room: RoomName;
  deviceId?: string;
  title?: string;
}

export const LightControl: React.FC<LightControlProps> = ({ 
  room, 
  deviceId = 'light',
  title = 'Luz'
}) => {
  const { state, dispatch } = useHome();
  const device = state.rooms[room]?.devices[deviceId];

  if (!device || device.type !== 'light') {
    return null;
  }

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_LIGHT', room, deviceId });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {device.isOn ? (
            <Lightbulb className="w-5 h-5 text-yellow-500" />
          ) : (
            <LightbulbOff className="w-5 h-5 text-gray-400" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {device.isOn ? 'Encendida' : 'Apagada'}
          </span>
          <Switch checked={device.isOn} onCheckedChange={handleToggle} />
        </div>
      </CardContent>
    </Card>
  );
};
