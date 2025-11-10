import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getRooms, getRoomDetails, getDevices, getSystemStatus, type Room, type Device, type RoomDetail, type SystemStatus } from '@/services/api';

// Re-exportar tipos del API para uso en componentes
export type { Room, Device, RoomDetail, SystemStatus };

interface HomeContextType {
  rooms: Room[];
  devices: Device[];
  systemStatus: SystemStatus | null;
  loading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  fetchRoomDetails: (roomName: string) => Promise<RoomDetail | null>;
  fetchDevices: (roomFilter?: string) => Promise<void>;
  fetchSystemStatus: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRooms();
      setRooms(data.rooms);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar habitaciones';
      setError(errorMessage);
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoomDetails = useCallback(async (roomName: string): Promise<RoomDetail | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRoomDetails(roomName);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar detalles de habitación';
      setError(errorMessage);
      console.error('Error fetching room details:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDevices = useCallback(async (roomFilter?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDevices(roomFilter);
      setDevices(data.devices);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar dispositivos';
      setError(errorMessage);
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSystemStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSystemStatus();
      setSystemStatus(data);
      setRooms(data.rooms);
      setDevices(data.devices);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar estado del sistema';
      setError(errorMessage);
      console.error('Error fetching system status:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await fetchSystemStatus();
  }, [fetchSystemStatus]);

  return (
    <HomeContext.Provider
      value={{
        rooms,
        devices,
        systemStatus,
        loading,
        error,
        fetchRooms,
        fetchRoomDetails,
        fetchDevices,
        fetchSystemStatus,
        refreshData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHome debe ser usado dentro de un HomeProvider');
  }
  return context;
};

