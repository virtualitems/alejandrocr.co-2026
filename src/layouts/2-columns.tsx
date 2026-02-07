import { AppShell } from './shell'

type ColumnSpan = 1 | 2 | 3

type Props = {
  pageTitle?: string
  leftColumnTitle?: string
  rightColumnTitle?: string
  leftColumnNode?: React.ReactNode
  rightColumnNode?: React.ReactNode
  leftColumnSpan?: ColumnSpan
  rightColumnSpan?: ColumnSpan
  navigation: { name: string; href: string; current?: boolean }[]
}

const spanClasses = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3'
}

export function Layout(props: Props) {
  const {
    pageTitle,
    leftColumnTitle,
    rightColumnTitle,
    leftColumnNode,
    rightColumnNode,
    leftColumnSpan = 2,
    rightColumnSpan = 1,
    navigation
  } = props
  return (
    <AppShell
      title={pageTitle}
      navigation={navigation}
    >
      <div className="h-full mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="h-full grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-8">
          <div className={`h-full grid grid-cols-1 gap-4 ${spanClasses[leftColumnSpan]}`}>
            <section aria-labelledby="section-1-title">
              <h2 id="section-1-title" className="sr-only">
                {leftColumnTitle}
              </h2>
              <div className="h-full rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 dark:bg-gray-800 dark:shadow-none dark:outline-1 dark:-outline-offset-1 dark:outline-white/10">
                {leftColumnNode}
              </div>
            </section>
          </div>

          <div className={`h-full grid grid-cols-1 gap-4 ${spanClasses[rightColumnSpan]}`}>
            <section aria-labelledby="section-2-title">
              <h2 id="section-2-title" className="sr-only">
                {rightColumnTitle}
              </h2>
              <div className="h-full rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 dark:bg-gray-800 dark:shadow-none dark:outline-1 dark:-outline-offset-1 dark:outline-white/10">
                {rightColumnNode}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
