import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, FileText, Loader2, Bot, User } from 'lucide-react';

const ChatInterface = ({ title, description, accentColor = 'primaryGreen', onSendMessage, initialMessage, storageKey }) => {
  const loadInitialMessages = () => {
    if (storageKey) {
      const saved = localStorage.getItem(`chat_messages_${storageKey}`);
      if (saved) return JSON.parse(saved);
    }
    return [{ id: 1, sender: 'bot', text: initialMessage || `¡Hola! Bienvenido a ${title}. ¿En qué te puedo ayudar hoy?`, file: null }];
  };

  const [messages, setMessages] = useState(loadInitialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const accentClass = accentColor === 'primaryBrown' ? 'bg-primaryBrown' : 'bg-primaryGreen';
  const textAccentClass = accentColor === 'primaryBrown' ? 'text-primaryBrown' : 'text-primaryGreen';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(`chat_messages_${storageKey}`, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Por favor, selecciona un archivo PDF.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !selectedFile) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      file: selectedFile ? selectedFile.name : null
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    
    const currentInput = inputMessage;
    const currentFile = selectedFile;
    
    setInputMessage('');
    setSelectedFile(null);

    if (onSendMessage) {
      try {
        const botResponses = await onSendMessage(currentInput, currentFile);
        if (botResponses) {
          if (Array.isArray(botResponses)) {
            setMessages(prev => [...prev, ...botResponses]);
          } else {
            setMessages(prev => [...prev, botResponses]);
          }
        }
      } catch (error) {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Ocurrió un error de comunicación.' }]);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden m-4 relative z-0">
      {/* Header */}
      <div className={`p-5 border-b border-gray-100 flex flex-col gap-1 ${accentClass} bg-opacity-10`}>
        <h2 className={`text-xl font-bold ${textAccentClass}`}>{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${accentClass} text-white shadow-md`}>
                <Bot className="w-6 h-6" />
              </div>
            )}
            
            <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm relative group ${
              msg.sender === 'user' 
                ? 'bg-white border border-gray-100 text-gray-800 rounded-tr-sm' 
                : `${accentClass} text-white rounded-tl-sm`
            }`}>
              {msg.text && <p className="leading-relaxed">{msg.text}</p>}
              {msg.file && (
                <div className={`mt-3 flex items-center gap-2 p-3 rounded-xl border ${msg.sender === 'user' ? 'bg-gray-50 border-gray-200' : 'bg-white/20 border-white/20'}`}>
                  <FileText className={`w-5 h-5 ${msg.sender === 'user' ? textAccentClass : 'text-white'}`} />
                  <span className={`text-sm font-medium truncate ${msg.sender === 'user' ? 'text-gray-700' : 'text-white'}`}>{msg.file}</span>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200 text-gray-600 shadow-inner">
                <User className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${accentClass} text-white shadow-md`}>
              <Bot className="w-6 h-6" />
            </div>
            <div className={`rounded-2xl p-4 shadow-sm ${accentClass} text-white rounded-tl-sm flex items-center gap-2`}>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Procesando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        {selectedFile && (
          <div className="mb-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 w-fit max-w-full">
            <div className={`p-2 rounded-lg ${accentClass} bg-opacity-20`}>
              <FileText className={`w-5 h-5 ${textAccentClass}`} />
            </div>
            <div className="flex-1 truncate text-sm font-medium text-gray-700">
              {selectedFile.name}
            </div>
            <button 
              onClick={() => setSelectedFile(null)}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex gap-3 relative">
          <input
            type="file"
            id="file-upload"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <label 
            htmlFor="file-upload"
            className={`flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:${textAccentClass} transition-colors cursor-pointer group`}
            title="Adjuntar PDF"
          >
            <Paperclip className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </label>
          
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primaryGreen focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
          />
          
          <button 
            type="submit"
            disabled={!inputMessage.trim() && !selectedFile || isLoading}
            className={`px-5 py-3 rounded-xl flex items-center justify-center transition-all ${
              (!inputMessage.trim() && !selectedFile) || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : `${accentClass} text-white shadow-md hover:shadow-lg hover:-translate-y-0.5`
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
