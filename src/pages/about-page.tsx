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
            This platform supports occupational safety and health programs by
            creating formal reports when required protective equipment is not
            used, such as reflective vests, masks, and helmets.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Artificial intelligence analyzes camera feeds to detect missing PPE
            (Personal Protective Equipment) and captures evidence of violations
            so teams can respond quickly and consistently.
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            The reporting chatbot also uses AI to consolidate data from the
            database into clear, actionable answers, making compliance insights
            easy to access for supervisors and safety leads.
          </p>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              How it works
            </h2>
            <ol className="mt-3 space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Step 1:
                </span>{' '}
                Create people in the system so they can be referenced in future
                reports.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Step 2:
                </span>{' '}
                Create reports by selecting one of the registered people and
                capturing the missing PPE incident.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Step 3:
                </span>{' '}
                Review report data through the visual table and the AI chatbot
                to explore insights and compliance trends.
              </li>
            </ol>
          </div>
        </div>
      }
    />
  )
}
