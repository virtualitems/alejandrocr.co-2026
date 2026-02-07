import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Router } from './Router'

import './tailwind.css'

const navigation = [
  { name: 'About', href: '#' },
  { name: 'Persons', href: '/persons' },
  { name: 'Inspector', href: '#' },
  { name: 'Reports', href: '/reports' },
  { name: 'Contact', href: '#' }
]

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Router navigation={navigation} />
    </BrowserRouter>
  </StrictMode>
)
