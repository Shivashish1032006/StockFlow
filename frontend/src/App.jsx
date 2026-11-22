import { useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import StockAnomalies from './pages/StockAnomalies'
import BatchExpiry from './pages/BatchExpiry'
import Notifications from './pages/Notifications'
import ProfitAnalytics from './pages/ProfitAnalytics'
import Inventory from './pages/Inventory'
import Suppliers from './pages/Suppliers'
import Orders from './pages/Orders'
import SalesForecasting from './pages/SalesForecasting'
import AuthPage from './pages/AuthPage'

const titles = { '/': 'Overview', '/inventory': 'Inventory', '/suppliers': 'Suppliers', '/orders': 'Orders', '/forecasting': 'Sales forecasting', '/anomalies': 'Stock anomalies', '/batches': 'Batch & expiry', '/notifications': 'Notifications', '/analytics': 'Profit & loss' }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('stockflow-demo-user')) } catch { return null }
  })
  const location = useLocation()
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('stockflow-demo-user')
    setUser(null)
    navigate('/login')
  }

  return <Routes>
    <Route path="/login" element={user ? <Navigate to="/" replace/> : <AuthPage mode="login" onAuthenticated={setUser}/>}/>
    <Route path="/signup" element={user ? <Navigate to="/" replace/> : <AuthPage mode="signup" onAuthenticated={setUser}/>}/>
    <Route path="/*" element={user ? (
      <div className="app-shell">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logout}/>
        <main className="main-area">
          <Topbar onMenu={() => setMenuOpen(true)}/>
          <div className="mobile-page-label">{titles[location.pathname] || 'StockFlow'}</div>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/inventory" element={<Inventory/>}/>
            <Route path="/suppliers" element={<Suppliers/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/forecasting" element={<SalesForecasting/>}/>
            <Route path="/anomalies" element={<StockAnomalies/>}/>
            <Route path="/batches" element={<BatchExpiry/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/analytics" element={<ProfitAnalytics/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
          <footer className="app-footer"><span>© 2026 StockFlow. Built for smarter operations.</span><span>Inventory intelligence, made simple.</span></footer>
        </main>
      </div>
    ) : <Navigate to="/login" replace/>}/>
  </Routes>
}
