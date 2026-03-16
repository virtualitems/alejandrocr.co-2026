import { Layout } from '../layouts/1-column'
import type { NavigationItem } from '../types/navigation'

type Props = {
  navigation: NavigationItem[]
}

export function AboutPage({ navigation }: Props) {
  return (
    <Layout
      navigation={navigation}
      columnTitle="About"
      columnWidth="4xl"
      columnNode={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            About
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            About page content will go here.
          </p>
        </div>
      }
    />
  )
}
