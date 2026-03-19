# Automatización de Boletas - Demo y Flujo Técnico

Esta aplicación web presenta el proceso de automatización de recepción y validación de boletas mediante WhatsApp e IA.

## Características

### 1. Diagrama de Flujo Técnico
Una visualización técnica del proceso completo, desde el escaneo del QR hasta el almacenamiento en Google Sheets. Utiliza `reactflow` para diagramar los nodos y conexiones.

### 2. Demo Interactiva para Clientes
Una guía paso a paso diseñada para explicar el funcionamiento de la aplicación a clientes finales de manera visual y sencilla.
- **Paso 1: Inicio (QR)** - Simulación de escaneo.
- **Paso 2: Conexión** - Apertura automática de WhatsApp.
- **Paso 3 & 4: Interacción** - Chat simulado con el bot.
- **Paso 5: Análisis IA** - Visualización del proceso de extracción de datos.
- **Paso 6: Confirmación** - Mensaje de éxito.
- **Paso 7: Respaldo** - Visualización de la integración con Google Sheets.

## Tecnologías Utilizadas
- React + Vite
- Tailwind CSS
- Framer Motion (Animaciones)
- React Flow (Diagramas)
- Lucide React (Iconos)

## Cómo ejecutar
1. Instalar dependencias: `npm install`
2. Correr en desarrollo: `npm run dev`
3. Construir para producción: `npm run build`
