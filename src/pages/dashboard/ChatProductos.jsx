import React, { useState } from 'react';
import ChatInterface from '../../components/ChatInterface';
import { api } from '../../services/api';

const ChatProductos = () => {
  const [sessionId, setSessionId] = useState(null);

  const handleSendMessage = async (instruction, file) => {
    const response = await api.productAgent(instruction, file, sessionId);
    
    if (response.sessionId && !sessionId) {
      setSessionId(response.sessionId);
    }
    
    let botText = response.question || 'Procesado.';
    if (response.status === 'COMPLETE') {
      botText = `¡Producto ${response.operation === 'CREATE' ? 'creado' : 'procesado'} exitosamente! ${response.product?.name ? `(${response.product.name})` : ''}`;
    }

    return { id: Date.now(), sender: 'bot', text: botText };
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Inventario (IA)</h1>
        <p className="text-gray-500 text-sm mt-1">Interactúa con este chat para crear nuevos productos, modificar precios o actualizar descripciones en tiempo real.</p>
      </div>
      <div className="flex-1 overflow-hidden p-2">
        <ChatInterface 
          title="Asistente de Productos" 
          description="Escribe tus instrucciones: 'Crea un producto llamado Silla de Madera a $50'"
          accentColor="primaryBrown"
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatProductos;
