import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import Engagement from './pages/Engagement'
import EngagementBuilder from './pages/EngagementBuilder'
import ShoppingAssistant from './pages/ShoppingAssistant'
import ShoppingAssistantBuilder from './pages/ShoppingAssistantBuilder'
import Knowledge from './pages/Knowledge'
import KnowledgeCatalog from './pages/KnowledgeCatalog'
import KnowledgeFaq from './pages/KnowledgeFaq'
import Settings from './pages/Settings'
import Overview from './pages/reports/Overview'
import Sales from './pages/reports/Sales'
import Conversations from './pages/reports/Conversations'
import Quality from './pages/reports/Quality'
import TestPreview from './pages/TestPreview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test-preview" element={<TestPreview />} />
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="engagement" element={<Engagement />} />
          <Route path="engagement/builder" element={<EngagementBuilder />} />
          <Route path="shopping-assistant" element={<ShoppingAssistant />} />
          <Route path="shopping-assistant/builder" element={<ShoppingAssistantBuilder />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="knowledge/catalog" element={<KnowledgeCatalog />} />
          <Route path="knowledge/faq" element={<KnowledgeFaq />} />
          <Route path="settings">
            <Route index element={<Navigate to="page-types" replace />} />
            <Route path="page-types" element={<Settings section="pagetypes" />} />
            <Route path="users" element={<Settings section="users" />} />
            <Route path="integration" element={<Settings section="integration" />} />
            <Route path="consent" element={<Settings section="consent" />} />
          </Route>
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
