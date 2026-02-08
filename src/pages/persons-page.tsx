import { useState } from 'react'
import { Layout } from '../layouts/1-column'
import { PersonsTable, type Person } from '../components/persons/persons-table'
import { PersonFormDialog } from '../components/persons/person-form-dialog'
import { DeletePersonDialog } from '../components/persons/delete-person-dialog'
import { Toast, useToast } from '../components/shared/toast'
import { usePersons } from '../hooks/usePersons'

type Props = {
  navigation: { name: string; href: string; current: boolean }[]
}

type DialogState = {
  type: 'create' | 'edit' | 'delete' | null
  person: Person | null
}

export function PersonsPage({ navigation }: Props) {
  const { persons, loading, error, create, update, remove, refresh } = usePersons()
  const { toast, showToast, hideToast } = useToast()
  const [dialog, setDialog] = useState<DialogState>({ type: null, person: null })
  const [isDeleting, setIsDeleting] = useState(false)

  const handleAdd = () => {
    setDialog({ type: 'create', person: null })
  }

  const handleUpdate = (person: Person) => {
    setDialog({ type: 'edit', person })
  }

  const handleRemove = (person: Person) => {
    setDialog({ type: 'delete', person })
  }

  const handleFormSubmit = async (data: { name: string; email: string }) => {
    try {
      if (dialog.type === 'create') {
        await create(data)
        showToast('success', 'Person created', `${data.name} has been added successfully.`)
      } else if (dialog.type === 'edit' && dialog.person?.id) {
        await update(dialog.person.id, data)
        showToast('success', 'Person updated', `${data.name} has been updated successfully.`)
      }
      setDialog({ type: null, person: null })
    } catch (err) {
      showToast('error', 'Operation failed', err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }

  const handleDeleteConfirm = async () => {
    if (!dialog.person?.id) return

    setIsDeleting(true)
    try {
      await remove(dialog.person.id)
      showToast('success', 'Person deleted', `${dialog.person.name} has been removed successfully.`)
      setDialog({ type: null, person: null })
    } catch (err) {
      showToast('error', 'Delete failed', err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  const closeDialog = () => {
    if (!isDeleting) {
      setDialog({ type: null, person: null })
    }
  }

  if (loading) {
    return (
      <Layout
        columnTitle="Persons"
        columnNode={
          <div className="flex items-center justify-center p-8">
            <div className="text-zinc-500 dark:text-zinc-400">Loading persons...</div>
          </div>
        }
        navigation={navigation}
      />
    )
  }

  if (error) {
    return (
      <Layout
        columnTitle="Persons"
        columnNode={
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-500/15 dark:outline dark:outline-red-500/25">
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-medium">Error loading persons</p>
              <p className="mt-1">{error}</p>
              <button
                onClick={refresh}
                className="mt-2 text-red-700 underline hover:text-red-600 dark:text-red-300 dark:hover:text-red-200"
              >
                Try again
              </button>
            </div>
          </div>
        }
        navigation={navigation}
      />
    )
  }

  return (
    <>
      <Layout
        columnTitle="Persons"
        columnNode={
          <PersonsTable
            data={persons}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        }
        navigation={navigation}
      />

      <PersonFormDialog
        isOpen={dialog.type === 'create' || dialog.type === 'edit'}
        onClose={closeDialog}
        onSubmit={handleFormSubmit}
        person={dialog.person}
        mode={dialog.type === 'edit' ? 'edit' : 'create'}
      />

      <DeletePersonDialog
        isOpen={dialog.type === 'delete'}
        onClose={closeDialog}
        onConfirm={handleDeleteConfirm}
        person={dialog.person}
        isDeleting={isDeleting}
      />

      <Toast
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={hideToast}
      />
    </>
  )
}
