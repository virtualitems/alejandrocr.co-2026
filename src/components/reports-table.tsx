import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import type { Report } from '../services/reports'
import 'lightbox2/dist/css/lightbox.min.css'
import 'lightbox2'

type Props = {
  reports: Report[]
  page?: number
  pageSize?: number
  total?: number
  onPageChange?: (page: number) => void
  onDelete?: (reportId: number) => void
  isLoading?: boolean
}

export function ReportsTable(props: Props) {
  const { reports = [], page: pageProp, pageSize: pageSizeProp, total: totalProp, onPageChange, onDelete, isLoading } = props
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reportToDelete, setReportToDelete] = useState<number | null>(null)
  const [observationDialogOpen, setObservationDialogOpen] = useState(false)
  const [selectedObservation, setSelectedObservation] = useState<string>('')

  const pageSize = pageSizeProp ?? (reports.length || 10)
  const total = totalProp ?? (reports.length || 0)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(Math.max(pageProp ?? 1, 1), totalPages)
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)
  const canGoPrev = page > 1 && Boolean(onPageChange)
  const canGoNext = page < totalPages && Boolean(onPageChange)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDeleteClick = (reportId: number) => {
    setReportToDelete(reportId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (reportToDelete !== null) {
      onDelete?.(reportToDelete)
      setDeleteDialogOpen(false)
      setReportToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setReportToDelete(null)
  }

  const handleShowObservation = (observation: string) => {
    setSelectedObservation(observation)
    setObservationDialogOpen(true)
  }

  const handleCloseObservation = () => {
    setObservationDialogOpen(false)
    setSelectedObservation('')
  }

  return (
    <div className="space-y-3">
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
                    Person Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                  >
                    Observations
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
                  >
                    Evidence
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:pr-6 dark:text-gray-200"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-800/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      Loading reports...
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      No reports found
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">
                        {report.person.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                        <button
                          type="button"
                          onClick={() => handleShowObservation(report.observations || '')}
                          className="select-none cursor-pointer text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                        >
                          Show
                        </button>
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {formatDate(report.created_at)}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        <a
                          href={report.evidence}
                          data-lightbox={`report-${report.id}`}
                          data-title={`${report.person.name} - ${formatDate(report.created_at)}`}
                          className="select-none cursor-pointer text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View Image
                        </a>
                      </td>
                      <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(report.id)}
                          className="select-none cursor-pointer inline-flex items-center gap-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-white/10 dark:bg-transparent">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            type="button"
            disabled={!canGoPrev}
            onClick={() => canGoPrev && onPageChange?.(page - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={!canGoNext}
            onClick={() => canGoNext && onPageChange?.(page + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:shadow-none">
              <button
                type="button"
                disabled={!canGoPrev}
                onClick={() => canGoPrev && onPageChange?.(page - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-60 dark:inset-ring-gray-700 dark:hover:bg-white/5"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </button>
              <span className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 dark:bg-indigo-500">
                {page}
              </span>
              <button
                type="button"
                disabled={!canGoNext}
                onClick={() => canGoNext && onPageChange?.(page + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-60 dark:inset-ring-gray-700 dark:hover:bg-white/5"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Observations Dialog */}
      <Dialog open={observationDialogOpen} onClose={handleCloseObservation} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
            >
              <div>
                <div className="mt-2">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                    Observations
                  </DialogTitle>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedObservation || <span className="italic text-gray-400">No observations</span>}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleCloseObservation}
                  className="select-none cursor-pointer inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10 dark:bg-red-500/10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                    Delete Report
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this report? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="select-none cursor-pointer inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="select-none cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
