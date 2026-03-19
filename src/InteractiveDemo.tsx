import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Smartphone, MessageCircle, CheckCircle, Database, ArrowRight, ScanLine, Loader2 } from 'lucide-react';

import { Package } from 'lucide-react';

const steps = [
  {
    id: 'start',
    title: 'Paso 1: Inicio del Proceso',
    description: 'El usuario escanea un código QR ubicado en el punto de venta o material publicitario.',
    icon: <QrCode className="w-8 h-8 text-blue-500" />
  },
  {
    id: 'whatsapp',
    title: 'Paso 2: Conexión Automática',
    description: 'WhatsApp se abre automáticamente en el dispositivo del usuario sin necesidad de guardar el número.',
    icon: <Smartphone className="w-8 h-8 text-green-500" />
  },
  {
    id: 'chat',
    title: 'Paso 3 & 4: Interacción y Datos',
    description: 'El bot da la bienvenida y solicita Nombre, RUT y Mail. Una vez completado, pide foto del producto.',
    icon: <MessageCircle className="w-8 h-8 text-green-600" />
  },
  {
    id: 'product-ai',
    title: 'Paso 5: Validación de Producto',
    description: 'El usuario envía la foto del producto por WhatsApp. La IA lo reconoce, confirma el producto detectado, pregunta la cantidad comprada y luego solicita la boleta.',
    icon: <Package className="w-8 h-8 text-orange-500" />
  },
  {
    id: 'receipt-ai',
    title: 'Paso 6: Validación de Boleta',
    description: 'El usuario sube la boleta. Nuestra IA la procesa, valida y extrae datos clave (Monto, Fecha, N° Boleta, etc.).',
    icon: <ScanLine className="w-8 h-8 text-purple-500" />
  },
  {
    id: 'success',
    title: 'Paso 7: Confirmación',
    description: 'El usuario recibe un mensaje de éxito indicando que sus datos fueron procesados correctamente.',
    icon: <CheckCircle className="w-8 h-8 text-green-500" />
  },
  {
    id: 'sheets',
    title: 'Paso 8: Respaldo en la Nube',
    description: 'Se guardan en Google Sheets los datos solicitados: Mes, Fecha, Cliente, Marca, Producto, Código EAN, Monto Boleta, Monto Producto, Unidades y PVPO.',
    icon: <Database className="w-8 h-8 text-yellow-500" />
  }
];

export const InteractiveDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
        setCurrentStep(0); // Loop back or just stop
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-slate-50 py-4 px-4 md:px-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:h-[700px]">
        
        {/* Left Panel: Navigation & Description */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-900 text-white p-6 flex flex-col h-full shrink-0">
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
            <h2 className="text-2xl font-bold mb-2">Flujo de Automatización</h2>
            <p className="text-slate-400 text-sm mb-6">Demostración interactiva</p>
            
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center space-x-2 p-1.5 rounded-lg transition-colors cursor-pointer ${index === currentStep ? 'bg-slate-800 border-l-4 border-blue-500' : 'hover:bg-slate-800/50 opacity-50'}`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`p-1 rounded-full shrink-0 ${index <= currentStep ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <span className="text-[10px] font-bold block w-4 h-4 text-center leading-4">{index + 1}</span>
                  </div>
                  <span className="text-xs font-medium line-clamp-2">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-4 pt-4 border-t border-slate-700 shrink-0">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className="px-3 py-2 text-sm rounded bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700 transition"
            >
              Anterior
            </button>
            <button 
              onClick={nextStep} 
              className="px-3 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-500 transition flex items-center"
            >
              {currentStep === steps.length - 1 ? 'Reiniciar' : 'Siguiente'} 
              {currentStep !== steps.length - 1 && <ArrowRight className="ml-2 w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Panel: Visualization */}
        <div className="w-full md:w-2/3 lg:w-3/4 bg-slate-100 relative overflow-hidden flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center items-center"
            >
               {renderVisual(currentStep)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-2xl text-slate-500 text-sm">
        <p>{steps[currentStep].description}</p>
      </div>
    </div>
  );
};

// Helper to render the specific visual for each step
function renderVisual(stepIndex: number) {
  switch (stepIndex) {
    case 0: // Scan QR
      return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-md border-2 border-slate-200">
                    <QrCode className="w-full h-full text-slate-800" />
                </div>
                <motion.div 
                    animate={{ y: [0, 160, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                />
            </div>
            <p className="mt-4 text-slate-600 font-medium">Escaneando...</p>
        </div>
      );
    case 1: // WhatsApp Opens
      return (
        <div className="flex flex-col items-center">
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-64 h-auto bg-green-500 rounded-3xl p-6 text-white shadow-xl flex flex-col items-center"
             >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <Smartphone className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-bold">WhatsApp</h3>
                <p className="text-sm opacity-90 text-center mt-2">Abriendo chat con la empresa...</p>
                <div className="mt-6 w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
             </motion.div>
        </div>
      );
    case 2: // Chat Interaction
      return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-[#075E54] p-4 text-white flex items-center shrink-0">
                <div className="w-8 h-8 bg-slate-200 rounded-full mr-2" />
                <span className="font-semibold">Bot Asistente</span>
            </div>
            <div className="flex-1 bg-[#E5DDD5] p-6 space-y-4 overflow-y-auto flex flex-col scrollbar-hide text-sm sm:text-base">
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm"
                >
                    Hola! 👋 Bienvenido. Para participar, por favor indícame tu Nombre.
                </motion.div>
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none self-end max-w-[85%] shadow-sm"
                >
                    Juan Pérez
                </motion.div>
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm"
                >
                    Mucho gusto Juan. Ahora, por favor ingresa tu RUT.
                </motion.div>
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.6 }}
                    className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none self-end max-w-[85%] shadow-sm"
                >
                    18.123.456-7
                </motion.div>
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 3.4 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm"
                >
                    Gracias. ¿Cuál es tu mail (correo electrónico)?
                </motion.div>
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 4.2 }}
                    className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none self-end max-w-[85%] shadow-sm"
                >
                    juan.perez@email.com
                </motion.div>
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 5.0 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm"
                >
                    ¡Excelente! Ahora, por favor envía una foto del producto participante que compraste. 📷
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6.0 }}
                    className="self-center mt-2 text-[10px] text-slate-500 bg-white/50 px-2 py-1 rounded-full"
                >
                    Esperando foto del producto...
                </motion.div>
            </div>
        </div>
      );
    case 3: // Product AI Analysis
      return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-[#075E54] p-4 text-white flex items-center shrink-0">
                <div className="w-8 h-8 bg-slate-200 rounded-full mr-2" />
                <span className="font-semibold">Bot Asistente (IA)</span>
            </div>
            <div className="flex-1 bg-[#E5DDD5] p-6 space-y-4 overflow-y-auto flex flex-col scrollbar-hide text-sm sm:text-base">
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none self-end max-w-[60%] shadow-sm flex flex-col items-center"
                >
                    <div className="w-full h-24 bg-slate-300 rounded mb-2 flex items-center justify-center overflow-hidden relative">
                        <Package className="w-10 h-10 text-slate-500" />
                        <motion.div 
                            animate={{ left: ["-10%", "110%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute top-0 w-1 h-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]"
                        />
                    </div>
                    <span>Foto enviada</span>
                </motion.div>
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.0 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm"
                >
                    🤖 IA: ¡Producto reconocido! He validado exitosamente el producto "Act II Mantequilla" en tu foto. ✅
                </motion.div>
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 3.5 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm"
                >
                    Y por favor, indícanos: ¿qué cantidad de este producto compraste? 🔢
                </motion.div>
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 5.0 }}
                    className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none self-end max-w-[85%] shadow-sm"
                >
                    Compré 2 unidades
                </motion.div>
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 6.5 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm"
                >
                    Por último, por favor sube la foto de tu boleta para validar la compra. 🧾
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 7.5 }}
                    className="self-center mt-2 text-[10px] text-slate-500 bg-white/50 px-2 py-1 rounded-full"
                >
                    Esperando archivo...
                </motion.div>
            </div>
        </div>
      );
    case 4: // Receipt AI Analysis
      return (
        <div className="flex flex-col items-center">
            <div className="relative w-64 h-80 bg-white shadow-lg border border-slate-200 p-4 rotate-2">
                <div className="w-full h-full bg-slate-50 flex flex-col space-y-2 p-2">
                    <div className="h-4 bg-slate-200 w-3/4 self-center rounded" />
                    <div className="h-20" />
                    <div className="h-2 bg-slate-200 w-full rounded" />
                    <div className="h-2 bg-slate-200 w-5/6 rounded" />
                    <motion.div 
                        initial={{ backgroundColor: "#e2e8f0" }}
                        animate={{ backgroundColor: "#86efac" }} // Highlights green
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="h-4 w-1/2 self-end rounded mt-4" 
                    />
                    <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 1.5 }}
                         className="absolute right-6 bottom-24 text-sm text-green-600 font-bold bg-green-100 px-2 py-1 rounded shadow-sm"
                    >
                        $12.500
                    </motion.div>
                </div>
                
                {/* Scanning Laser */}
                <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute left-0 w-full h-1 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10"
                />
            </div>
            <div className="mt-4 flex items-center space-x-2 text-purple-600 font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analizando boleta...</span>
            </div>
        </div>
      );
    case 5: // Success
      return (
        <div className="flex flex-col items-center justify-center h-full">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
                <CheckCircle className="w-16 h-16 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-800">¡Datos Validados!</h3>
            <p className="text-slate-500 text-center mt-2 px-8">La boleta es válida y la información ha sido extraída correctamente.</p>
        </div>
      );
    case 6: // Google Sheets
      return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-green-600 p-4 flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                    <Database className="w-6 h-6" />
                    <span className="font-semibold text-base">Base de Datos - Google Sheets</span>
                </div>
                <div className="text-sm bg-green-700 px-3 py-1.5 rounded-md font-medium">En línea</div>
            </div>
            <div className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-600 border-b">
                        <tr>
                            <th className="p-4 font-semibold whitespace-nowrap">Mes</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Fecha</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Cliente</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Marca</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Producto</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Código EAN</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Monto Boleta</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Monto Prod. Comprado</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Unidades Compradas</th>
                            <th className="p-4 font-semibold whitespace-nowrap">PVPO</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                        <tr className="border-b opacity-50">
                            <td className="p-4 whitespace-nowrap">Octubre</td>
                            <td className="p-4 whitespace-nowrap">10/10/23</td>
                            <td className="p-4 whitespace-nowrap">María González</td>
                            <td className="p-4 whitespace-nowrap">Act II</td>
                            <td className="p-4 whitespace-nowrap">Mantequilla</td>
                            <td className="p-4 whitespace-nowrap">CABRICARA161</td>
                            <td className="p-4 whitespace-nowrap">$8.990</td>
                            <td className="p-4 whitespace-nowrap">$1.600</td>
                            <td className="p-4 whitespace-nowrap">1</td>
                            <td className="p-4 whitespace-nowrap">$1.600</td>
                        </tr>
                         <motion.tr 
                            initial={{ backgroundColor: "#f0fdf4", opacity: 0 }}
                            animate={{ backgroundColor: "#ffffff", opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="border-b font-medium bg-yellow-50"
                        >
                            <td className="p-4 whitespace-nowrap">Octubre</td>
                            <td className="p-4 whitespace-nowrap">Hoy</td>
                            <td className="p-4 whitespace-nowrap">Juan Pérez</td>
                            <td className="p-4 whitespace-nowrap">Act II</td>
                            <td className="p-4 whitespace-nowrap">Mantequilla</td>
                            <td className="p-4 whitespace-nowrap font-bold text-blue-600">CABRICARA161</td>
                            <td className="p-4 whitespace-nowrap">$15.990</td>
                            <td className="p-4 whitespace-nowrap text-green-600">$3.200</td>
                            <td className="p-4 whitespace-nowrap">2</td>
                            <td className="p-4 whitespace-nowrap text-green-600">$1.600</td>
                        </motion.tr>
                    </tbody>
                </table>
            </div>
        </div>
      );
    default:
      return null;
  }
}

export default InteractiveDemo;