import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './layouts/1-column'

import './tailwind.css'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <Layout pageTitle='My Portfolio' columnTitle='About Me' columnNode={<p>This is the about me section.</p>} />
  </StrictMode>
)
