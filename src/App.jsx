import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import ChatGeneral from './pages/dashboard/ChatGeneral'
import ChatProductos from './pages/dashboard/ChatProductos'
import CotizarPublico from './pages/CotizarPublico'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas Privadas del Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="chat-general" replace />} />
          <Route path="chat-general" element={<ChatGeneral />} />
          <Route path="chat-productos" element={<ChatProductos />} />
        </Route>

        {/* Ruta Pública */}
        <Route path="/cotizar" element={<CotizarPublico />} />
      </Routes>
    </Router>
  )
}

export default App
