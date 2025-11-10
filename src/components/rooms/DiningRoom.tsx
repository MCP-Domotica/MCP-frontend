import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { LightControl } from '../devices/LightControl';
import { OvenControl } from '../devices/OvenControl';

export const DiningRoom: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-3xl">🍽️</span>
            Comedor
          </h1>
          <p className="text-gray-500 mt-1">Controla los dispositivos del comedor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LightControl room="comedor" title="Luz del Comedor" />
        <OvenControl room="comedor" />
      </div>
    </div>
  );
};
