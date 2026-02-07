import { AppShell } from './shell'

type ColumnWidth =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'

type Props = {
  columnTitle?: string
  columnNode?: React.ReactNode
  columnWidth?: ColumnWidth
  navigation: { name: string; href: string; current?: boolean }[]
  user: { name: string; email: string; imageUrl: string }
}

const widthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
}

export function Layout(props: Props) {
  const {
    columnTitle,
    columnNode,
    columnWidth = '7xl',
    navigation,
    user
  } = props

  return (
    <AppShell
      navigation={navigation}
      user={user}
    >
      <div
        className={`mx-auto ${widthClasses[columnWidth]} px-4 pb-12 sm:px-6 lg:px-8`}
      >
        <section aria-labelledby="section-1-title">
          <h2 id="section-1-title" className="sr-only">
            {columnTitle}
          </h2>
          <div className="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 dark:bg-gray-800 dark:shadow-none dark:outline-1 dark:-outline-offset-1 dark:outline-white/10">
            {columnNode}
          </div>
        </section>
      </div>
    </AppShell>
  )
}
