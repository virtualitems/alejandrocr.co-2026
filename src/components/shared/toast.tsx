'use client'

import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

type ToastType = 'success' | 'error'

type ToastProps = {
  show: boolean
  type: ToastType
  title: string
  message?: string
  onClose: () => void
  duration?: number
}

export function Toast({ show, type, title, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  const Icon = type === 'success' ? CheckCircleIcon : XCircleIcon
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400'

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition show={show}>
          <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg outline-1 outline-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0 dark:bg-zinc-800 dark:-outline-offset-1 dark:outline-white/10">
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  <Icon aria-hidden="true" className={`size-6 ${iconColor}`} />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{title}</p>
                  {message && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{message}</p>}
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex rounded-md text-zinc-400 hover:text-zinc-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:hover:text-white dark:focus:outline-indigo-500"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

type ToastState = {
  show: boolean
  type: ToastType
  title: string
  message?: string
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    title: '',
    message: undefined,
  })

  const showToast = (type: ToastType, title: string, message?: string) => {
    setToast({ show: true, type, title, message })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }))
  }

  return {
    toast,
    showToast,
    hideToast,
  }
}
