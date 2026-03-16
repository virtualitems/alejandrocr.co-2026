import { Layout } from '../layouts/1-column'
import type { NavigationItem } from '../types/navigation'

type Props = {
  navigation: NavigationItem[]
}

export function ContactPage({ navigation }: Props) {
  return (
    <Layout
      navigation={navigation}
      columnTitle="Contact"
      columnWidth="4xl"
      columnNode={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Contact page content will go here.
          </p>
        </div>
      }
    />
  )
}
