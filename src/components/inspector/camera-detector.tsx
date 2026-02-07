import { useState, useRef, useEffect } from 'react'
import { Button } from '../catalyst-ui-kit/button'
import { Inspector, type StatusMessage } from '../../services/inspector'

export function CameraDetector() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [status, setStatus] = useState<StatusMessage | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const inspectorRef = useRef<Inspector | null>(null)

  // Initialize inspector
  useEffect(() => {
    const inspector = new Inspector(
      {}, // Use default config
      {
        onStatusChange: setStatus,
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
  }, [])

  const handleStart = () => {
    inspectorRef.current?.start()
  }

  const handleStop = () => {
    inspectorRef.current?.stop()
  }

  return (
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
            <Button color="indigo" onClick={handleStart} className="w-full">
              <span className="mr-1">🎥</span>
              Start Camera
            </Button>
          ) : (
            <Button color="red" onClick={handleStop} className="w-full">
              <span className="mr-1">⏹️</span>
              Stop
            </Button>
          )}
        </div>

        {/* Status Message */}
        {status && (
          <div
            className={`rounded-lg p-4 ${
              status.type === 'error'
                ? 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400'
                : status.type === 'success'
                ? 'bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-400'
                : 'bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400'
            }`}
          >
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
