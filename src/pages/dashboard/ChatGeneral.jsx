import React, { useState } from 'react';
import ChatInterface from '../../components/ChatInterface';
import { api } from '../../services/api';

const ChatGeneral = () => {
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('chat_general_session_id') || `chat-${Date.now()}`;
  });

  React.useEffect(() => {
    localStorage.setItem('chat_general_session_id', sessionId);
  }, [sessionId]);

  const handleSendMessage = async (instruction, file) => {
    // Nota: El backend de ventas (salesAgent) actualmente recibe sessionId e instruction por JSON.
    // Si necesitas mandar archivos aquí en el futuro, la API deberá soportar multipart.
    const response = await api.salesAgent(sessionId, instruction);
    
    const messages = [];
    messages.push({ id: Date.now(), sender: 'bot', text: response.message });
    
    if (response.cart && response.cart.length > 0) {
      const cartText = response.cart.map(i => `${i.quantity}x ${i.name} ($${i.subtotal})`).join('\n');
      messages.push({ id: Date.now() + 1, sender: 'bot', text: `Carrito actual:\n${cartText}` });
    }

    if (response.quotePdfBase64) {
      messages.push({ id: Date.now() + 2, sender: 'bot', text: 'Aquí tienes tu cotización en PDF (Base64 listo para descargar).' });
      // TODO: Handle base64 PDF rendering/download here
    }

    return messages;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-800">IA de Asistencia General</h1>
        <p className="text-gray-500 text-sm mt-1">Chat de ventas interactivo. Agrega productos al carrito y genera cotizaciones en PDF.</p>
      </div>
      <div className="flex-1 overflow-hidden p-2">
        <ChatInterface 
          title="Agente de Ventas" 
          description="Escribe: 'Quiero cotizar 2 Zapatillas Nike'"
          accentColor="primaryGreen"
          onSendMessage={handleSendMessage}
          storageKey="general"
        />
      </div>
    </div>
  );
};

export default ChatGeneral;
