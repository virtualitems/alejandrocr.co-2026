import { Layout } from '../layouts/1-column'
import { PersonsTable, type Person } from '../components/persons/persons-table'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const persons: Person[] = [
  { id: 1, name: 'Lindsay Walton', email: 'lindsay.walton@example.com' },
  { id: 2, name: 'Courtney Henry', email: 'courtney.henry@example.com' },
  { id: 3, name: 'Tom Cook', email: 'tom.cook@example.com' },
  { id: 4, name: 'Whitney Francis', email: 'whitney.francis@example.com' },
  { id: 5, name: 'Leonard Krasner', email: 'leonard.krasner@example.com' },
  { id: 6, name: 'Floyd Miles', email: 'floyd.miles@example.com' }
]

const navigation = [
  { name: 'About', href: '#', current: false },
  { name: 'Persons', href: '/persons', current: true },
  { name: 'Inspector', href: '#', current: false },
  { name: 'Reports', href: '/reports', current: false },
  { name: 'Contact', href: '#', current: false }
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' }
]

export function PersonsPage() {
  return (
    <Layout
      columnTitle="Persons"
      columnNode={<PersonsTable data={persons} />}
      navigation={navigation}
      user={user}
      userNavigation={userNavigation}
    />
  )
}
