import { PencilSquareIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/20/solid'

export type Person = {
  id?: string | number
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
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Persons</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Add people to enable report generation</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={!onAdd}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          <UserPlusIcon className="size-5" aria-hidden="true" />
          Add person
        </button>
      </div>

      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead className="bg-gray-50 dark:bg-gray-800/75">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-gray-200"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                  >
                    Email
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 text-right text-sm font-semibold text-gray-900 sm:pr-6 dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                {hasData ? (
                  data.map((person) => (
                    <tr key={person.id ?? person.email}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                        {person.name}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {person.email}
                      </td>
                      <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                        <div className="inline-flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onUpdate?.(person)}
                            disabled={!onUpdate}
                            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-60 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <PencilSquareIcon className="size-5" aria-hidden="true" />
                            Edit
                            <span className="sr-only">{person.name}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemove?.(person)}
                            disabled={!onRemove}
                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="size-5" aria-hidden="true" />
                            Remove
                            <span className="sr-only">{person.name}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 px-4 text-sm text-center text-gray-500 dark:text-gray-400">
                      No persons yet. Use "Add person" to create one.
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
