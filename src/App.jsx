import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import Engagement from './pages/Engagement'
import ShoppingAssistant from './pages/ShoppingAssistant'
import Knowledge from './pages/Knowledge'
import Settings from './pages/Settings'
import Overview from './pages/reports/Overview'
import Sales from './pages/reports/Sales'
import Conversations from './pages/reports/Conversations'
import Quality from './pages/reports/Quality'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="engagement" element={<Engagement />} />
          <Route path="shopping-assistant" element={<ShoppingAssistant />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports">
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="sales" element={<Sales />} />
            <Route path="conversations" element={<Conversations />} />
            <Route path="quality" element={<Quality />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
