import { AppShell } from './shell'

export function Layout() {
  return (
    <AppShell title="Dashboard">
      <div className="h-full mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <section aria-labelledby="section-1-title" className="h-full">
          <h2 id="section-1-title" className="sr-only">
            Section title
          </h2>
          <div className="h-full rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 dark:bg-gray-800 dark:shadow-none dark:outline-1 dark:-outline-offset-1 dark:outline-white/10">
            {/* Your content */}
          </div>
        </section>
      </div>
    </AppShell>
  )
}
