import { Layout } from '../layouts/1-column'
import { PersonsTable, type Person } from '../components/persons/persons-table'

const persons: Person[] = [
  { id: 1, name: 'Lindsay Walton', email: 'lindsay.walton@example.com' },
  { id: 2, name: 'Courtney Henry', email: 'courtney.henry@example.com' },
  { id: 3, name: 'Tom Cook', email: 'tom.cook@example.com' },
  { id: 4, name: 'Whitney Francis', email: 'whitney.francis@example.com' },
  { id: 5, name: 'Leonard Krasner', email: 'leonard.krasner@example.com' },
  { id: 6, name: 'Floyd Miles', email: 'floyd.miles@example.com' }
]

type Props = {
  navigation: { name: string; href: string; current: boolean }[]
}

export function PersonsPage({ navigation }: Props) {
  return (
    <Layout
      columnTitle="Persons"
      columnNode={<PersonsTable data={persons} />}
      navigation={navigation}
    />
  )
}
