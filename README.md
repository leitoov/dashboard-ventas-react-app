# Dashboard Ventas & Cotizador IA - React App

Este proyecto es una aplicación web modular desarrollada con React, enfocada en la gestión de ventas, cotizaciones e integración con Inteligencia Artificial mediante chats interactivos.

## Paleta de Colores
El diseño visual está centrado en una estética natural, profesional y amigable, utilizando una paleta de colores personalizada basada en **verdes y marrones**.

## Tecnologías Principales
- **React**: Biblioteca principal para la construcción de interfaces de usuario mediante componentes.
- **Tailwind CSS**: Framework de utilidades CSS para el diseño rápido, responsivo y la implementación de la paleta de colores personalizada.
- **Arquitectura Modular**: Componentes altamente reutilizables, separación de responsabilidades y gestión de rutas eficiente.

---

## Definiciones Funcionales

La aplicación se divide principalmente en tres grandes áreas o módulos funcionales:

### 1. Sistema de Autenticación
- **Login**: Acceso seguro al dashboard para administradores o personal interno mediante correo electrónico (`email`) y contraseña (`password`). 
- Toda la validación de credenciales se realiza comunicándose con una API externa.

### 2. Dashboard Privado (Administración)
Una vez autenticado, el usuario ingresa a un panel de control con las siguientes herramientas:
- **Chat General con IA**: Una interfaz de comunicación que interactúa con una API de Inteligencia Artificial. Este chat permite a los usuarios adjuntar y enviar archivos en formato **PDF** para que la IA los analice o responda en base a ellos.
- **Chat Gestor de Productos**: Un canal o instancia de chat independiente dentro del dashboard, diseñado específicamente para dar instrucciones de **crear o modificar productos** en la base de datos a través de la comunicación natural y la integración con la API.

### 3. Área Pública - Sección "Cotizar"
Una vista completamente independiente del dashboard y del login, orientada directamente a los clientes compradores:
- **Chat de Cotizaciones**: Los compradores ingresan a una landing/vista de cotización donde son recibidos por un chat interactivo.
- **Carga de Archivos**: Al igual que en el dashboard, los compradores pueden adjuntar archivos **PDF** (ej. requerimientos, planos, listas de materiales) al chat.
- **Respuestas Automatizadas**: El sistema procesa los archivos y mensajes del comprador a través de la API y el chat responde automáticamente con la información, preguntas de seguimiento o la cotización generada.

---

## Definiciones Técnicas

### Arquitectura y Estructura de Directorios
Se empleará una estructura escalable y basada en módulos (Feature-Sliced Design o similar):
- `src/components/`: Componentes UI reutilizables y atómicos (Botones, Inputs, Componentes de Chat, Carga de Archivos).
- `src/layouts/`: Estructuras base de página (Layout Público, Layout Dashboard Auth).
- `src/pages/` (o `views/`): Componentes a nivel de página (Login, Dashboard, Cotizar).
- `src/services/`: Lógica para peticiones HTTP/APIs (Fetch/Axios). Contendrá la comunicación con los endpoints de Auth, Productos e IA.
- `src/hooks/`: Custom hooks de React para extraer lógica compleja de los componentes (ej. `useChat`, `useAuth`, `useFileUpload`).
- `src/context/`: Contextos globales (ej. estado de sesión/usuario autenticado).

### Integración con APIs
- **Auth API**: Endpoint tipo `POST /api/auth/login` que recibe `email` y `password` y retorna un token de sesión (JWT).
- **Chat API**: Endpoints capaces de recibir datos mixtos (texto y binarios). Se utilizará `multipart/form-data` para poder enviar los mensajes del chat junto con los archivos **PDF**.
- **Gestión de estado del Chat**: Posible uso de WebSockets o Server-Sent Events (SSE) si la API soporta respuestas en streaming, o polling en su defecto.

### Estilos y Diseño (Tailwind)
Se modificará el archivo de configuración `tailwind.config.js` para registrar la paleta de colores oficial.
Ejemplo de configuración esperada:
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: {
          light: '#A3B18A', // Ejemplos
          DEFAULT: '#588157',
          dark: '#3A5A40',
        },
        primaryBrown: {
          light: '#DDA15E',
          DEFAULT: '#BC6C25',
          dark: '#8C4A1A',
        }
      }
    },
  },
  plugins: [],
}
```

