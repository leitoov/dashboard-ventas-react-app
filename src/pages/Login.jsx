import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Leaf, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (username && password) {
        const data = await api.login(username, password);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Credenciales inválidas o error de servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primaryGreen-dark to-primaryBrown-dark p-4">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primaryGreen-light rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-primaryBrown-light rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-primaryGreen-dark p-3 rounded-2xl mb-6 shadow-lg inline-block">
            <Leaf className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Bienvenido de nuevo</h2>
          <p className="text-gray-600 mb-8 text-center">Inicia sesión para acceder al panel de control</p>
          
          <form className="w-full space-y-5" onSubmit={handleLogin}>
            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Usuario</label>
              <input 
                type="text" 
                id="username" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primaryGreen focus:border-transparent transition-all outline-none bg-white/50 backdrop-blur-sm"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primaryGreen focus:border-transparent transition-all outline-none bg-white/50 backdrop-blur-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primaryGreen hover:bg-primaryGreen-dark text-white rounded-xl font-bold text-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:hover:-translate-y-0"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
