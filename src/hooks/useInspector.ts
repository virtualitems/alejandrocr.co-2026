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

  const updateCamera = useCallback((deviceId: string) => {
    inspectorRef.current?.updateConfig({
      videoConstraints: {
        deviceId: { exact: deviceId },
        facingMode: 'environment',
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    })
  }, [])

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
