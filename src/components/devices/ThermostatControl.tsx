import { Thermometer } from 'lucide-react';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useHome } from '@/context/HomeContext';
import type { RoomName } from '@/context/HomeContext';

interface ThermostatControlProps {
  room: RoomName;
}

export const ThermostatControl: React.FC<ThermostatControlProps> = ({ room }) => {
  const { state, dispatch } = useHome();
  const device = state.rooms[room]?.devices.thermostat;

  if (!device || device.type !== 'thermostat') {
    return null;
  }

  const handleTemperatureChange = (temperature: number) => {
    dispatch({ type: 'SET_TEMPERATURE', room, temperature });
  };

  const handleIncrease = () => {
    if (device.temperature < device.maxTemp) {
      handleTemperatureChange(device.temperature + 1);
    }
  };

  const handleDecrease = () => {
    if (device.temperature > device.minTemp) {
      handleTemperatureChange(device.temperature - 1);
    }
  };

  const getTemperatureColor = () => {
    if (device.temperature <= 18) return 'text-blue-500';
    if (device.temperature <= 24) return 'text-green-500';
    return 'text-red-500';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Thermometer className={`w-5 h-5 ${getTemperatureColor()}`} />
          Termostato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className={`text-5xl font-bold ${getTemperatureColor()}`}>
            {device.temperature}°
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Rango: {device.minTemp}° - {device.maxTemp}°
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            onClick={handleDecrease}
            variant="outline"
            size="sm"
            disabled={device.temperature <= device.minTemp}
            className="w-10 h-10 p-0 text-xl"
          >
            −
          </Button>
          <div className="flex-1">
            <Slider
              value={device.temperature}
              onValueChange={handleTemperatureChange}
              min={device.minTemp}
              max={device.maxTemp}
              step={1}
            />
          </div>
          <Button
            onClick={handleIncrease}
            variant="outline"
            size="sm"
            disabled={device.temperature >= device.maxTemp}
            className="w-10 h-10 p-0 text-xl"
          >
            +
          </Button>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Frío</span>
          <span>Templado</span>
          <span>Caliente</span>
        </div>
      </CardContent>
    </Card>
  );
};
