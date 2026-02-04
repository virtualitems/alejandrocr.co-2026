import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './layouts/1-column'

import './tailwind.css'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const navigation = [
  { name: 'About', href: '#', current: true },
  { name: 'Persons', href: '#', current: false },
  { name: 'Inspector', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
  { name: 'Contact', href: '#', current: false }
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' }
]

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <Layout
      pageTitle="My Portfolio"
      columnTitle="About Me"
      columnNode={<p>This is the about me section.</p>}
      navigation={navigation}
      user={user}
      userNavigation={userNavigation}
    />
  </StrictMode>
)
