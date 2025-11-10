# Sistema Domótico - Frontend

Frontend de un sistema domótico que permite gestionar habitaciones y dispositivos a través de un chat conversacional conectado a un backend.

## 🚀 Características

- **Dashboard Dinámico**: Visualización de todas las habitaciones y dispositivos desde el backend
- **Chat Inteligente**: Control de dispositivos mediante lenguaje natural
- **Vistas de Habitaciones**: Cada habitación muestra sus dispositivos en tiempo real
- **Sin Estado Local**: Toda la información se obtiene del backend (no usa localStorage)
- **Responsive Design**: Interfaz adaptable a diferentes tamaños de pantalla

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- Backend corriendo en `http://localhost:3000`

## 🔧 Instalación

```bash
npm install
```

## ▶️ Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── chat/
│   │   └── ChatWidget.tsx          # Widget de chat flotante
│   ├── rooms/
│   │   ├── Dashboard.tsx           # Vista principal con todas las habitaciones
│   │   └── RoomView.tsx            # Vista genérica de habitación
│   └── ui/                         # Componentes UI reutilizables
├── context/
│   └── HomeContext.tsx             # Context API para estado global
├── services/
│   └── api.ts                      # Funciones para comunicación con backend
└── App.tsx                         # Configuración de rutas
```

## 🎯 Uso

### Dashboard
- Muestra todas las habitaciones obtenidas del backend
- Click en una tarjeta para ver detalles de la habitación
- Botón "Actualizar" para refrescar los datos

### Vista de Habitación
- Muestra todos los dispositivos de la habitación
- Indicadores visuales del estado de cada dispositivo
- Usa el chat para controlar los dispositivos

### Chat
- **Posición**: Esquina inferior derecha (botón flotante)
- **Función**: Envía comandos en lenguaje natural al backend

#### Ejemplos de comandos:
```
- "Encender luz del living"
- "Apagar horno de la cocina"
- "Subir termostato del dormitorio a 25 grados"
- "Crear habitación cocina"
- "Agregar luz al baño"
- "Ajustar velocidad del ventilador a 3"
```

## 🔌 Endpoints del Backend

El frontend consume los siguientes endpoints:

- `POST /chat` - Enviar comandos
- `GET /rooms` - Obtener todas las habitaciones
- `GET /rooms/{room_name}` - Detalles de una habitación
- `GET /devices` - Obtener todos los dispositivos
- `GET /devices/{device_id}` - Detalles de un dispositivo
- `GET /status` - Estado general del sistema

## 🎨 Tipos de Dispositivos Soportados

### Luz (`light`)
- Estado: Encendida/Apagada
- Disponible en cualquier habitación

### Termostato (`thermostat`)
- Estado: Temperatura (16-32°C)
- Disponible en cualquier habitación

### Ventilador (`fan`)
- Estado: Velocidad (0-5)
- Disponible en cualquier habitación

### Horno (`oven`)
- Estado: Temperatura (160-240°C) y temporizador
- Solo disponible en cocina

### TV (`tv`)
- Estado: Encendido/Apagado y canal
- Disponible en cualquier habitación

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos
- **Vite** - Build tool

## 📝 Notas Importantes

1. **Backend Requerido**: El backend debe estar corriendo en `http://localhost:3000` antes de iniciar el frontend
2. **Sin Estado Local**: No se usa localStorage, todo se obtiene del backend
3. **Chat para Interacciones**: Los usuarios no pueden interactuar directamente con los dispositivos, deben usar el chat
4. **Rutas Dinámicas**: Las rutas se generan basándose en las habitaciones del backend

## 🐛 Solución de Problemas

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa la consola del navegador para errores de CORS

### No aparecen habitaciones
- Asegúrate de que el backend tenga habitaciones creadas
- Usa el chat para crear habitaciones: "Crear habitación living"

### Los dispositivos no se actualizan
- Click en el botón "Actualizar" para refrescar los datos
- Después de enviar un comando en el chat, la vista se actualiza automáticamente


## 👨‍💻 Desarrolladores

- **González, Cristian David** - [GitHub](https://github.com/CrisDeCrisis)
- **Vega, Tobías Joaquín** - [GitHub](https://github.com/Tobias-Vega)

---

## 🎓 Contexto Académico

**Proyecto:** Trabajo Práctico Integrador - Sistema Domótico con MCP

**Asignatura:** Modelos de Aplicación de la Inteligencia Artificial

**Docentes:**

- Acosta Gabriel
- Flavian Dante

**Institución:** Instituto Politécnico Formosa

**Programa Académico:** Tecnicatura Superior en Desarrollo de Software Multiplataforma