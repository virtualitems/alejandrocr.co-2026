import { PencilSquareIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/20/solid'
import { Button } from '../catalyst-ui-kit/button'

export type Person = {
  id?: number
  name: string
  email: string
}

type Props = {
  data: Person[]
  onAdd?: () => void
  onUpdate?: (person: Person) => void
  onRemove?: (person: Person) => void
}

export function PersonsTable(props: Props) {
  const { data, onAdd, onUpdate, onRemove } = props
  const hasData = data.length > 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Persons</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Add people to enable report generation</p>
        </div>
        <Button type="button" onClick={onAdd} disabled={!onAdd} color="indigo" className="select-none cursor-pointer">
          <UserPlusIcon />
          Add person
        </Button>
      </div>

      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <table className="relative min-w-full divide-y divide-zinc-300 dark:divide-white/15">
              <thead className="bg-zinc-50 dark:bg-zinc-800/75">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-zinc-950 sm:pl-6 dark:text-zinc-200"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-950 dark:text-zinc-200"
                  >
                    Email
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 text-right text-sm font-semibold text-zinc-950 sm:pr-6 dark:text-zinc-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-white/10 dark:bg-zinc-800/50">
                {hasData ? (
                  data.map((person) => (
                    <tr key={person.id ?? person.email} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/75">
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-zinc-950 sm:pl-6 dark:text-white">
                        {person.name}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-zinc-600 dark:text-zinc-400">
                        {person.email}
                      </td>
                      <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                        <div className="inline-flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onUpdate?.(person)}
                            disabled={!onUpdate}
                            className="select-none cursor-pointer inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemove?.(person)}
                            disabled={!onRemove}
                            className="select-none cursor-pointer inline-flex items-center gap-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <TrashIcon className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-12 px-4 text-sm text-center text-zinc-500 dark:text-zinc-400">
                      <div className="flex flex-col items-center gap-2">
                        <UserPlusIcon className="size-12 text-zinc-400 dark:text-zinc-600" />
                        <p className="font-medium">No persons yet</p>
                        <p className="text-xs">Click "Add person" to create your first entry</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
