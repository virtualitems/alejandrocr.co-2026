import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '../catalyst-ui-kit/button'
import { Inspector, type StatusMessage } from '../../services/inspector'
import { Toast, useToast } from '../shared/toast'

export function CameraDetector() {
  const [isStreaming, setIsStreaming] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const containerRef = useRef<HTMLDivElement>(null)
  const inspectorRef = useRef<Inspector | null>(null)

  // Handle status messages
  const handleStatusChange = useCallback(
    (status: StatusMessage | null) => {
      if (status) {
        const type = status.type === 'error' ? 'error' : 'success'
        showToast(type, status.message)
      }
    },
    [showToast]
  )

  // Initialize inspector
  useEffect(() => {
    const inspector = new Inspector(
      {}, // Use default config
      {
        onStatusChange: handleStatusChange,
        onStreamingChange: setIsStreaming
      }
    )

    inspectorRef.current = inspector

    // Append canvas to container
    if (containerRef.current) {
      containerRef.current.appendChild(inspector.canvas)
    }

    return () => {
      inspector.destroy()
    }
  }, [handleStatusChange])

  const handleStart = () => {
    inspectorRef.current?.start()
  }

  const handleStop = () => {
    inspectorRef.current?.stop()
  }

  return (
    <>
      <div className="space-y-6">
        {/* Video Container */}
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <div
              ref={containerRef}
              className={`w-full ${isStreaming ? 'block' : 'hidden'}`}
              style={{ lineHeight: 0 }}
            />
            {!isStreaming && (
              <div className="flex min-h-80 items-center justify-center p-12 text-center">
                <div>
                  <div className="text-6xl">📷</div>
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                    Press "Start Camera" to begin
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            {!isStreaming ? (
              <Button color="indigo" onClick={handleStart} className="w-full cursor-pointer select-none">
                <span className="mr-1">🎥</span>
                Start Camera
              </Button>
            ) : (
              <Button color="red" onClick={handleStop} className="w-full cursor-pointer select-none">
                <span className="mr-1">⏹️</span>
                Stop
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
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
