import { AppShell } from './shell'

export function Layout() {
  return (
    <AppShell title="Dashboard">
      <div className="h-full mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="h-full grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="h-full grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 id="section-1-title" className="sr-only">
                Section title
              </h2>
              <div className="h-full rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 dark:bg-gray-800 dark:shadow-none dark:outline-1 dark:-outline-offset-1 dark:outline-white/10">
                {/* Your content */}
              </div>
            </section>
          </div>

          <div className="h-full grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 id="section-2-title" className="sr-only">
                Section title
              </h2>
              <div className="h-full rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 dark:bg-gray-800 dark:shadow-none dark:outline-1 dark:-outline-offset-1 dark:outline-white/10">
                {/* Your content */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
