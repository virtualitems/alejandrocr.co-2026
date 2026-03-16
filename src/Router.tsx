import { Routes, Route, Navigate } from 'react-router'
import { PersonsPage } from './pages/persons-page'
import { ReportsPage } from './pages/reports-page'
import { InspectorPage } from './pages/inspector-page'
import { ContactPage } from './pages/contact-page'
import { AboutPage } from './pages/about-page'
import { useNavigation } from './hooks/useNavigation'
import type { NavigationItem } from './types/navigation'

type Props = {
  navigation: NavigationItem[]
}

export function Router({ navigation }: Props) {
  const currentNavigation = useNavigation(navigation)

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/about" element={<AboutPage navigation={currentNavigation} />} />
      <Route path="/persons" element={<PersonsPage navigation={currentNavigation} />} />
      <Route path="/inspector" element={<InspectorPage navigation={currentNavigation} />} />
      <Route path="/reports" element={<ReportsPage navigation={currentNavigation} />} />
      <Route path="/contact" element={<ContactPage navigation={currentNavigation} />} />
    </Routes>
  )
}
