import { Routes, Route, Navigate } from 'react-router'
import { PersonsPage } from './pages/persons-page'
import { ReportsPage } from './pages/reports-page'
import { useNavigation } from './hooks/useNavigation'
import type { NavigationItem } from './types/navigation'

type Props = {
  navigation: NavigationItem[]
}

export function Router({ navigation }: Props) {
  const currentNavigation = useNavigation(navigation)

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/persons" replace />} />
      <Route path="/persons" element={<PersonsPage navigation={currentNavigation} />} />
      <Route path="/reports" element={<ReportsPage navigation={currentNavigation} />} />
    </Routes>
  )
}
