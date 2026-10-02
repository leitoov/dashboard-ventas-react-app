import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const CotizarPublico = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primaryGreen-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primaryBrown-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primaryGreen p-2 rounded-xl shadow-md">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">Eco<span className="text-primaryGreen">Ventas</span></span>
          </div>
          <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-primaryGreen transition-colors">
            Acceso Empleados
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Info Side */}
        <div className="w-full md:w-1/3 flex flex-col justify-center gap-6 pt-10 md:pt-0">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primaryBrown/10 text-primaryBrown font-semibold text-sm w-fit">
            Cotizaciones Instantáneas
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Descubre el valor de tu <span className="text-primaryGreen">proyecto</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Sube tus requerimientos en formato PDF o descríbenos lo que necesitas. Nuestro agente inteligente analizará tu solicitud y te enviará una cotización detallada en segundos.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1">
              <div className="text-2xl font-bold text-primaryGreen mb-1">24/7</div>
              <div className="text-sm text-gray-500 font-medium">Disponibilidad</div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1">
              <div className="text-2xl font-bold text-primaryBrown mb-1">100%</div>
              <div className="text-sm text-gray-500 font-medium">Precisión</div>
            </div>
          </div>
        </div>

        {/* Chat Side */}
        <div className="w-full md:w-2/3 h-[600px] shadow-2xl rounded-3xl overflow-hidden border-4 border-white/50 backdrop-blur-sm bg-white/40">
          <ChatInterface 
            title="Agente de Ventas" 
            description="Estoy listo para procesar tus requerimientos y cotizar."
            accentColor="primaryGreen"
            apiEndpoint="/api/chat/cotizar"
          />
        </div>

      </main>
    </div>
  );
};

export default CotizarPublico;
