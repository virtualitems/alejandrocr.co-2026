import { useState, useRef, useEffect, useCallback } from 'react'
import { Inspector, type StatusMessage } from '../services/inspector'

export type UseInspectorOptions = {
  onStatusChange?: (status: StatusMessage | null) => void
}

export type UseInspectorReturn = {
  inspector: Inspector | null
  isStreaming: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
  start: () => void
  stop: () => void
  captureFrame: () => Promise<Blob | null>
  updateCamera: (deviceId: string) => void
}

export function useInspector(options: UseInspectorOptions = {}): UseInspectorReturn {
  const [isStreaming, setIsStreaming] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inspectorRef = useRef<Inspector | null>(null)

  const { onStatusChange } = options

  // Initialize inspector
  useEffect(() => {
    const inspector = new Inspector(
      {}, // Use default config
      {
        onStatusChange,
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
  }, [onStatusChange])

  const start = useCallback(() => {
    inspectorRef.current?.start()
  }, [])

  const stop = useCallback(() => {
    inspectorRef.current?.stop()
  }, [])

  const captureFrame = useCallback(async (): Promise<Blob | null> => {
    return (await inspectorRef.current?.captureFrameAsBlob()) || null
  }, [])

  const updateCamera = useCallback(async (deviceId: string) => {
    const inspector = inspectorRef.current
    if (!inspector) return

    // Stop the current stream
    inspector.stop()

    // Create a new inspector with the updated camera
    const newInspector = new Inspector(
      {
        videoConstraints: {
          deviceId: { exact: deviceId },
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      },
      {
        onStatusChange,
        onStreamingChange: setIsStreaming
      }
    )

    // Replace the old inspector
    inspectorRef.current = newInspector

    // Replace the canvas in the container
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(newInspector.canvas)
    }

    // Start the new inspector
    await newInspector.start()
  }, [onStatusChange])

  return {
    inspector: inspectorRef.current,
    isStreaming,
    containerRef,
    start,
    stop,
    captureFrame,
    updateCamera
  }
}
