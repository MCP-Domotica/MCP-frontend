# 🏠 Sistema de Control Domótico

Aplicación web de control domótico desarrollada con **React**, **TypeScript** y **Tailwind CSS**. Permite gestionar dispositivos inteligentes en cuatro habitaciones: comedor, dormitorio, baño y sala de estar.

## 🚀 Características

### Habitaciones y Dispositivos

#### 🍽️ Comedor
- **Luz**: Interruptor on/off
- **Horno**: Control de encendido/apagado con indicador de temperatura

#### 🛏️ Dormitorio
- **Lámpara**: Interruptor on/off
- **Ventilador**: Control de encendido/apagado y velocidad (baja, media, alta)

#### 🚿 Baño
- **Luz**: Interruptor on/off

#### 🛋️ Sala de Estar
- **Luz**: Interruptor on/off
- **Televisor**: Encendido/apagado y cambio de canal
- **Termostato**: Ajuste de temperatura (16°C - 30°C)

### Funcionalidades Principales

✅ **Dashboard Principal**: Vista general con acceso rápido a todas las habitaciones y estado de dispositivos

✅ **Navegación por Habitaciones**: Sistema de rutas con React Router para acceder a cada habitación

✅ **Estado Global**: Context API con useReducer para gestión centralizada del estado

✅ **Persistencia**: El estado se guarda automáticamente en localStorage

✅ **Reset de Casa**: Botón para restaurar todos los dispositivos al estado inicial

✅ **Notificaciones**: Toasts informativos para cada acción realizada

✅ **Validación de Datos**: Manejo de errores para acciones inválidas

✅ **Interfaz Responsive**: Diseño adaptable a diferentes tamaños de pantalla

✅ **Iconos Interactivos**: Lucide React para visualización clara del estado

## 📋 Requisitos Previos

- **Node.js** 18 o superior
- **npm** o **yarn**

## 🔧 Instalación

1. Clona el repositorio o navega a la carpeta del proyecto:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── devices/          # Componentes de dispositivos
│   │   │   ├── LightControl.tsx
│   │   │   ├── FanControl.tsx
│   │   │   ├── TVControl.tsx
│   │   │   ├── ThermostatControl.tsx
│   │   │   └── OvenControl.tsx
│   │   ├── rooms/             # Vistas de habitaciones
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Comedor.tsx
│   │   │   ├── Dormitorio.tsx
│   │   │   ├── Baño.tsx
│   │   │   └── Sala.tsx
│   │   └── ui/                # Componentes de UI reutilizables
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── switch.tsx
│   │       └── slider.tsx
│   ├── context/
│   │   └── HomeContext.tsx    # Estado global y lógica
│   ├── lib/
│   │   └── utils.ts           # Utilidades
│   ├── App.tsx                # Componente principal
│   └── main.tsx               # Punto de entrada
├── package.json
└── README.md
```

## 🎨 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación entre páginas
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos
- **React Hot Toast** - Notificaciones
- **class-variance-authority** - Variantes de componentes

## 💡 Uso de la Aplicación

### Dashboard
1. Accede a la página principal para ver el resumen de todas las habitaciones
2. Haz clic en cualquier habitación para acceder a sus controles
3. Usa el botón "Reset Casa" para restaurar todo al estado inicial

### Control de Dispositivos

**Luces**: Usa el switch para encender/apagar

**Ventilador**: 
- Switch para encender/apagar
- Botones de velocidad cuando está encendido

**Televisor**:
- Switch para encender/apagar
- Botones ← y → para cambiar canales
- Input para ingresar canal específico

**Termostato**:
- Slider para ajuste fino
- Botones + y - para incrementos de 1°C

**Horno**:
- Switch para encender/apagar
- Muestra temperatura configurada cuando está encendido

## 🔒 Persistencia de Datos

El estado de todos los dispositivos se guarda automáticamente en `localStorage` bajo la clave `homeState`. Esto significa que:

- Los cambios persisten al recargar la página
- El estado se mantiene entre sesiones
- El botón "Reset Casa" borra esta información y restaura los valores por defecto

## 📝 Documentación del Código

Todos los componentes y funciones incluyen:
- Comentarios JSDoc/TSDoc
- Descripción de parámetros
- Tipos TypeScript completos
- Validación de errores

## 🐛 Manejo de Errores

La aplicación incluye validación para:
- Velocidades inválidas del ventilador
- Canales de TV fuera de rango (1-999)
- Temperaturas fuera del rango permitido (16°C-30°C)
- Dispositivos no encontrados

Todos los errores muestran notificaciones toast amigables al usuario.

## 🔮 Futuras Mejoras (No implementadas)

Este proyecto está preparado para:
- Integración con backend real
- Conexión con Model Context Protocol (MCP)
- Control de dispositivos IoT reales
- Autenticación de usuarios
- Historial de uso

## 👨‍💻 Desarrollo

Para contribuir al proyecto:

1. Crea una rama para tu feature
2. Asegúrate de que el código pase el linter (`npm run lint`)
3. Documenta nuevas funciones con JSDoc
4. Prueba en diferentes tamaños de pantalla

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

**¡Disfruta controlando tu hogar inteligente! 🏡✨**
