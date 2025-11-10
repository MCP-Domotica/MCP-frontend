import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';


export type DeviceType = 'light' | 'fan' | 'tv' | 'thermostat' | 'oven';

export type RoomName = 'comedor' | 'dormitorio' | 'baño' | 'sala';

export type FanSpeed = 'off' | 'baja' | 'media' | 'alta';

export interface LightState {
  type: 'light';
  isOn: boolean;
}

export interface FanState {
  type: 'fan';
  isOn: boolean;
  speed: FanSpeed;
}

export interface TVState {
  type: 'tv';
  isOn: boolean;
  channel: number;
}

export interface ThermostatState {
  type: 'thermostat';
  temperature: number;
  minTemp: number;
  maxTemp: number;
}

export interface OvenState {
  type: 'oven';
  isOn: boolean;
  temperature: number;
}

export type DeviceState = LightState | FanState | TVState | ThermostatState | OvenState;

export interface RoomState {
  name: string;
  devices: {
    [key: string]: DeviceState;
  };
}

export interface HomeState {
  rooms: {
    [key in RoomName]: RoomState;
  };
}

export type HomeAction =
  | { type: 'TOGGLE_LIGHT'; room: RoomName; deviceId?: string }
  | { type: 'TOGGLE_FAN'; room: RoomName }
  | { type: 'SET_FAN_SPEED'; room: RoomName; speed: FanSpeed }
  | { type: 'TOGGLE_TV'; room: RoomName }
  | { type: 'SET_TV_CHANNEL'; room: RoomName; channel: number }
  | { type: 'SET_TEMPERATURE'; room: RoomName; temperature: number }
  | { type: 'TOGGLE_OVEN'; room: RoomName }
  | { type: 'RESET_HOME' };

const initialState: HomeState = {
  rooms: {
    comedor: {
      name: 'Comedor',
      devices: {
        light: { type: 'light', isOn: false },
        oven: { type: 'oven', isOn: false, temperature: 180 },
      },
    },
    dormitorio: {
      name: 'Dormitorio',
      devices: {
        light: { type: 'light', isOn: false },
        fan: { type: 'fan', isOn: false, speed: 'off' },
      },
    },
    baño: {
      name: 'Baño',
      devices: {
        light: { type: 'light', isOn: false },
      },
    },
    sala: {
      name: 'Sala de Estar',
      devices: {
        light: { type: 'light', isOn: false },
        tv: { type: 'tv', isOn: false, channel: 1 },
        thermostat: { type: 'thermostat', temperature: 22, minTemp: 16, maxTemp: 30 },
      },
    },
  },
};

const loadStateFromLocalStorage = (): HomeState => {
  try {
    const savedState = localStorage.getItem('homeState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error al cargar el estado desde localStorage:', error);
  }
  return initialState;
};

const saveStateToLocalStorage = (state: HomeState): void => {
  try {
    localStorage.setItem('homeState', JSON.stringify(state));
  } catch (error) {
    console.error('Error al guardar el estado en localStorage:', error);
  }
};

const homeReducer = (state: HomeState, action: HomeAction): HomeState => {
  let newState: HomeState;

  switch (action.type) {
    case 'TOGGLE_LIGHT': {
      const deviceId = action.deviceId || 'light';
      const device = state.rooms[action.room].devices[deviceId];
      
      if (!device || device.type !== 'light') {
        toast.error('Dispositivo de luz no encontrado');
        return state;
      }

      const newIsOn = !device.isOn;
      newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            devices: {
              ...state.rooms[action.room].devices,
              [deviceId]: {
                ...device,
                isOn: newIsOn,
              },
            },
          },
        },
      };

      toast.success(
        `Luz de ${state.rooms[action.room].name} ${newIsOn ? 'encendida' : 'apagada'}`
      );
      break;
    }

    case 'TOGGLE_FAN': {
      const device = state.rooms[action.room].devices.fan;
      
      if (!device || device.type !== 'fan') {
        toast.error('Ventilador no encontrado');
        return state;
      }

      const newIsOn = !device.isOn;
      const newSpeed: FanSpeed = newIsOn ? 'media' : 'off';
      
      newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            devices: {
              ...state.rooms[action.room].devices,
              fan: {
                ...device,
                isOn: newIsOn,
                speed: newSpeed,
              },
            },
          },
        },
      };

      toast.success(
        `Ventilador ${newIsOn ? 'encendido' : 'apagado'}`
      );
      break;
    }

    case 'SET_FAN_SPEED': {
      const device = state.rooms[action.room].devices.fan;
      
      if (!device || device.type !== 'fan') {
        toast.error('Ventilador no encontrado');
        return state;
      }

      const validSpeeds: FanSpeed[] = ['off', 'baja', 'media', 'alta'];
      if (!validSpeeds.includes(action.speed)) {
        toast.error('Velocidad inválida. Usa: baja, media o alta');
        return state;
      }

      const isOn = action.speed !== 'off';

      newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            devices: {
              ...state.rooms[action.room].devices,
              fan: {
                ...device,
                isOn,
                speed: action.speed,
              },
            },
          },
        },
      };

      if (action.speed === 'off') {
        toast.success('Ventilador apagado');
      } else {
        toast.success(`Ventilador: velocidad ${action.speed}`);
      }
      break;
    }

    case 'TOGGLE_TV': {
      const device = state.rooms[action.room].devices.tv;
      
      if (!device || device.type !== 'tv') {
        toast.error('Televisor no encontrado');
        return state;
      }

      const newIsOn = !device.isOn;
      
      newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            devices: {
              ...state.rooms[action.room].devices,
              tv: {
                ...device,
                isOn: newIsOn,
              },
            },
          },
        },
      };

      toast.success(
        `TV ${newIsOn ? `encendida (Canal ${device.channel})` : 'apagada'}`
      );
      break;
    }

    case 'SET_TV_CHANNEL': {
      const device = state.rooms[action.room].devices.tv;
      
      if (!device || device.type !== 'tv') {
        toast.error('Televisor no encontrado');
        return state;
      }

      if (action.channel < 1 || action.channel > 999) {
        toast.error('Canal inválido (1-999)');
        return state;
      }

      newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            devices: {
              ...state.rooms[action.room].devices,
              tv: {
                ...device,
                channel: action.channel,
              },
            },
          },
        },
      };

      if (device.isOn) {
        toast.success(`Canal cambiado a ${action.channel}`);
      }
      break;
    }

    case 'SET_TEMPERATURE': {
      const device = state.rooms[action.room].devices.thermostat;
      
      if (!device || device.type !== 'thermostat') {
        toast.error('Termostato no encontrado');
        return state;
      }

      if (action.temperature < device.minTemp || action.temperature > device.maxTemp) {
        toast.error(`Temperatura debe estar entre ${device.minTemp}°C y ${device.maxTemp}°C`);
        return state;
      }

      newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            devices: {
              ...state.rooms[action.room].devices,
              thermostat: {
                ...device,
                temperature: action.temperature,
              },
            },
          },
        },
      };

      toast.success(`Temperatura ajustada a ${action.temperature}°C`);
      break;
    }

    case 'TOGGLE_OVEN': {
      const device = state.rooms[action.room].devices.oven;
      
      if (!device || device.type !== 'oven') {
        toast.error('Horno no encontrado');
        return state;
      }

      const newIsOn = !device.isOn;
      
      newState = {
        ...state,
        rooms: {
          ...state.rooms,
          [action.room]: {
            ...state.rooms[action.room],
            devices: {
              ...state.rooms[action.room].devices,
              oven: {
                ...device,
                isOn: newIsOn,
              },
            },
          },
        },
      };

      toast.success(
        `Horno ${newIsOn ? `encendido (${device.temperature}°C)` : 'apagado'}`
      );
      break;
    }

    case 'RESET_HOME': {
      newState = initialState;
      toast.success('Casa reseteada al estado inicial');
      break;
    }

    default:
      return state;
  }

  saveStateToLocalStorage(newState);
  return newState;
};

interface HomeContextType {
  state: HomeState;
  dispatch: React.Dispatch<HomeAction>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(homeReducer, initialState, loadStateFromLocalStorage);

  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

  return (
    <HomeContext.Provider value={{ state, dispatch }}>
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
