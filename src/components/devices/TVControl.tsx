import { useState } from 'react';
import { Tv } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useHome } from '@/context/HomeContext';
import type { RoomName } from '@/context/HomeContext';

interface TVControlProps {
  room: RoomName;
}
export const TVControl: React.FC<TVControlProps> = ({ room }) => {
  const { state, dispatch } = useHome();
  const device = state.rooms[room]?.devices.tv;
  const [inputChannel, setInputChannel] = useState('');

  if (!device || device.type !== 'tv') {
    return null;
  }


  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TV', room });
  };

  const handleNextChannel = () => {
    const nextChannel = device.channel >= 999 ? 1 : device.channel + 1;
    dispatch({ type: 'SET_TV_CHANNEL', room, channel: nextChannel });
  };

  const handlePrevChannel = () => {
    const prevChannel = device.channel <= 1 ? 999 : device.channel - 1;
    dispatch({ type: 'SET_TV_CHANNEL', room, channel: prevChannel });
  };

  const handleSetChannel = () => {
    const channel = parseInt(inputChannel);
    if (!isNaN(channel)) {
      dispatch({ type: 'SET_TV_CHANNEL', room, channel });
      setInputChannel('');
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Tv className={`w-5 h-5 ${device.isOn ? 'text-purple-500' : 'text-gray-400'}`} />
          Televisor
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
          <div className="space-y-3">
            <div className="text-center p-4 bg-gray-900 rounded-lg">
              <p className="text-white text-3xl font-bold">{device.channel}</p>
              <p className="text-gray-400 text-xs mt-1">Canal actual</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handlePrevChannel}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Canal ←
              </Button>
              <Button
                onClick={handleNextChannel}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Canal →
              </Button>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="999"
                value={inputChannel}
                onChange={(e) => setInputChannel(e.target.value)}
                placeholder="Canal..."
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSetChannel();
                  }
                }}
              />
              <Button onClick={handleSetChannel} size="sm">
                Ir
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
