const API_BASE_URL = 'http://localhost:3000';

// Tipos para las respuestas del backend
export interface Device {
  id: string;
  type: 'light' | 'thermostat' | 'fan' | 'oven' | 'tv';
  room: string;
  state: boolean | number | any;
}

export interface Room {
  name: string;
  type: string;
  light_count: number;
  thermostat_count: number;
  fan_count: number;
  oven_count: number;
  total_devices: number;
}

export interface RoomDetail {
  room: string;
  type: string;
  devices: Device[];
  light_count: number;
  thermostat_count: number;
  fan_count: number;
  oven_count: number;
}

export interface SystemStatus {
  rooms: Room[];
  devices: Device[];
  total_rooms: number;
  total_devices: number;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const sendChatMessage = async (message: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  return handleResponse(response);
};

export const getRooms = async (): Promise<{ rooms: Room[] }> => {
  const response = await fetch(`${API_BASE_URL}/rooms`);
  return handleResponse(response);
};

export const getRoomDetails = async (roomName: string): Promise<RoomDetail> => {
  const response = await fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomName)}`);
  return handleResponse(response);
};

export const getDevices = async (roomFilter?: string): Promise<{ devices: Device[] }> => {
  const url = roomFilter 
    ? `${API_BASE_URL}/devices?room=${encodeURIComponent(roomFilter)}` 
    : `${API_BASE_URL}/devices`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const getDeviceById = async (deviceId: string): Promise<Device> => {
  const response = await fetch(`${API_BASE_URL}/devices/${encodeURIComponent(deviceId)}`);
  return handleResponse(response);
};

export const getSystemStatus = async (): Promise<SystemStatus> => {
  const response = await fetch(`${API_BASE_URL}/status`);
  return handleResponse(response);
};
