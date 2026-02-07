import { Routes, Route, Navigate } from 'react-router'
import { PersonsPage } from './pages/persons-page'
import { ReportsPage } from './pages/reports-page'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/persons" replace />} />
      <Route path="/persons" element={<PersonsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
    </Routes>
  )
}
