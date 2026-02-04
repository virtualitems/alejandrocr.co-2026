import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersonsPage } from './pages/persons-page'

import './tailwind.css'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <PersonsPage />
  </StrictMode>
)
