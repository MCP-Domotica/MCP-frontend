import { Flame } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useHome } from '@/context/HomeContext';
import type { RoomName } from '@/context/HomeContext';

interface OvenControlProps {
  room: RoomName;
}
export const OvenControl: React.FC<OvenControlProps> = ({ room }) => {
  const { state, dispatch } = useHome();
  const device = state.rooms[room]?.devices.oven;

  if (!device || device.type !== 'oven') {
    return null;
  }

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_OVEN', room });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className={`w-5 h-5 ${device.isOn ? 'text-orange-500' : 'text-gray-400'}`} />
          Horno
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
            <div className="text-center p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
              <p className="text-orange-600 text-3xl font-bold">
                {device.temperature}°C
              </p>
              <p className="text-orange-500 text-xs mt-1">Temperatura configurada</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
              <Flame className="w-4 h-4" />
              <span>Horno precalentando...</span>
            </div>
          </div>
        )}

        {!device.isOn && (
          <p className="text-xs text-gray-500 text-center">
            El horno está apagado
          </p>
        )}
      </CardContent>
    </Card>
  );
};
