import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './layouts/2-columns'
import { ReportsTable, type Person } from './components/reports-table'

import './tailwind.css'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const people: Person[] = [
  {
    name: 'Lindsay Walton',
    timestamp: '2024-12-01T08:30:00Z',
    image: 'https://example.com/image.jpg'
  },
  {
    name: 'Courtney Henry',
    timestamp: '2024-12-02T10:15:00Z',
    image: 'https://example.com/image.jpg'
  },
  {
    name: 'Tom Cook',
    timestamp: '2024-12-03T12:00:00Z',
    image: 'https://example.com/image.jpg'
  },
  {
    name: 'Whitney Francis',
    timestamp: '2024-12-04T15:45:00Z',
    image: 'https://example.com/image.jpg'
  },
  {
    name: 'Leonard Krasner',
    timestamp: '2024-12-05T09:05:00Z',
    image: 'https://example.com/image.jpg'
  },
  {
    name: 'Floyd Miles',
    timestamp: '2024-12-06T11:20:00Z',
    image: 'https://example.com/image.jpg'
  }
]

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
      leftColumnTitle="Table"
      leftColumnNode={<ReportsTable people={people} />}
      rightColumnTitle="Chat"
      rightColumnNode={<p>chat.</p>}
      navigation={navigation}
      user={user}
      userNavigation={userNavigation}
    />
  </StrictMode>
)
