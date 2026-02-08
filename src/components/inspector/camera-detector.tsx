import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '../catalyst-ui-kit/button'
import { Select } from '../catalyst-ui-kit/select'
import { Inspector, type StatusMessage } from '../../services/inspector'
import { Toast, useToast } from '../shared/toast'
import { PersonsService, type Person } from '../../services/persons'

export function CameraDetector() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [persons, setPersons] = useState<Person[]>([])
  const [selectedPersonId, setSelectedPersonId] = useState<string>('')
  const [isLoadingPersons, setIsLoadingPersons] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const containerRef = useRef<HTMLDivElement>(null)
  const inspectorRef = useRef<Inspector | null>(null)
  const personsService = useRef(new PersonsService())

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

  // Fetch persons on mount
  useEffect(() => {
    const fetchPersons = async () => {
      setIsLoadingPersons(true)
      try {
        const data = await personsService.current.getAll()
        setPersons(data)
      } catch (error) {
        console.error('Error fetching persons:', error)
        showToast('error', 'Failed to load persons')
      } finally {
        setIsLoadingPersons(false)
      }
    }

    fetchPersons()
  }, [showToast])

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
      <div className="w-full flex flex-col gap-4">
        {/* Video Container */}
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
        <div className="w-full">
          {!isStreaming ? (
            <Button
              color="indigo"
              onClick={handleStart}
              className="w-full cursor-pointer select-none"
            >
              <span className="mr-1">🎥</span>
              Start Camera
            </Button>
          ) : (
            <Button
              color="red"
              onClick={handleStop}
              className="w-full cursor-pointer select-none"
            >
              <span className="mr-1">⏹️</span>
              Stop
            </Button>
          )}
        </div>

        {/* Person Selector */}
        <div className="w-full">
          <Select
            id="person-select"
            name="person"
            className="w-full select-none cursor-pointer"
            value={selectedPersonId}
            onChange={(e) => setSelectedPersonId(e.target.value)}
            disabled={isLoadingPersons}
          >
            <option value="">
              {isLoadingPersons
                ? 'Loading...'
                : persons.length === 0
                  ? 'No persons available'
                  : 'Select a person'}
            </option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name} ({person.email})
              </option>
            ))}
          </Select>
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
