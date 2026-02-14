import { useState, useEffect, useCallback } from 'react'

export type UseCameraDevicesReturn = {
  cameraDevices: MediaDeviceInfo[]
  currentCameraIndex: number
  currentCamera: MediaDeviceInfo | null
  nextCamera: () => void
  previousCamera: () => void
  setCurrentCameraIndex: (index: number) => void
}

export function useCameraDevices(): UseCameraDevicesReturn {
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([])
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0)

  // Fetch available camera devices
  useEffect(() => {
    const fetchCameraDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter((device) => device.kind === 'videoinput')
        setCameraDevices(cameras)
      } catch (error) {
        console.error('Error enumerating devices:', error)
      }
    }

    fetchCameraDevices()
  }, [])

  const nextCamera = useCallback(() => {
    if (cameraDevices.length === 0) return
    const newIndex = (currentCameraIndex + 1) % cameraDevices.length
    setCurrentCameraIndex(newIndex)
  }, [currentCameraIndex, cameraDevices.length])

  const previousCamera = useCallback(() => {
    if (cameraDevices.length === 0) return
    const newIndex = (currentCameraIndex - 1 + cameraDevices.length) % cameraDevices.length
    setCurrentCameraIndex(newIndex)
  }, [currentCameraIndex, cameraDevices.length])

  const currentCamera = cameraDevices.length > 0 ? cameraDevices[currentCameraIndex] : null

  return {
    cameraDevices,
    currentCameraIndex,
    currentCamera,
    nextCamera,
    previousCamera,
    setCurrentCameraIndex
  }
}
