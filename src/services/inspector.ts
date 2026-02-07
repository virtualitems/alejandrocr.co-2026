import {
  CameraInitializationError,
  CameraPermissionError,
  CameraNotFoundError,
  CanvasContextError,
  WebSocketConnectionError,
  FrameCaptureError
} from '../errors/inspector'

// Re-export errors for convenience
export {
  CameraInitializationError,
  CameraPermissionError,
  CameraNotFoundError,
  CanvasContextError,
  WebSocketConnectionError,
  FrameCaptureError
}

export type StatusType = 'info' | 'success' | 'error'

export type StatusMessage = {
  message: string
  type: StatusType
}

export type InspectorConfig = {
  wsHost?: string
  wsEndpoint?: string
  frameRate?: number
  videoConstraints?: MediaTrackConstraints
}

export type InspectorCallbacks = {
  onStatusChange?: (status: StatusMessage | null) => void
  onStreamingChange?: (isStreaming: boolean) => void
  onFrameReceived?: (imageData: string) => void
}

export class Inspector {
  // Media elements
  private videoElement: HTMLVideoElement
  private canvasElement: HTMLCanvasElement
  private canvasContext: CanvasRenderingContext2D

  // Media streams and connections
  private mediaStream: MediaStream | null = null
  private websocket: WebSocket | null = null
  private animationFrameId: number | null = null

  // State
  private _isStreaming = false

  // Configuration
  private config: Required<InspectorConfig>
  private callbacks: InspectorCallbacks

  constructor(
    config: InspectorConfig = {},
    callbacks: InspectorCallbacks = {}
  ) {
    // Set default configuration
    this.config = {
      wsHost: config.wsHost ?? 'ia.allup.com.co',
      wsEndpoint: config.wsEndpoint ?? '/vision/stream-safety',
      frameRate: config.frameRate ?? 10,
      videoConstraints: config.videoConstraints ?? {
        facingMode: 'environment',
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    }

    this.callbacks = callbacks

    // Create video element
    this.videoElement = document.createElement('video')
    this.videoElement.autoplay = true
    this.videoElement.playsInline = true
    this.videoElement.muted = true

    // Create canvas element
    this.canvasElement = document.createElement('canvas')
    this.canvasElement.style.width = '100%'
    this.canvasElement.style.display = 'block'
    const ctx = this.canvasElement.getContext('2d')
    if (!ctx) {
      throw new CanvasContextError()
    }
    this.canvasContext = ctx
  }

  // Public getters
  get isStreaming(): boolean {
    return this._isStreaming
  }

  get video(): HTMLVideoElement {
    return this.videoElement
  }

  get canvas(): HTMLCanvasElement {
    return this.canvasElement
  }

  // Private methods
  private notifyStatus(message: string, type: StatusType): void {
    this.callbacks.onStatusChange?.({ message, type })
  }

  private notifyStreamingChange(isStreaming: boolean): void {
    this._isStreaming = isStreaming
    this.callbacks.onStreamingChange?.(isStreaming)
  }

  private captureAndSendFrame = (): void => {
    if (
      !this._isStreaming ||
      !this.websocket ||
      this.websocket.readyState !== WebSocket.OPEN
    ) {
      return
    }

    if (!this.videoElement.videoWidth || !this.videoElement.videoHeight) {
      this.animationFrameId = window.setTimeout(
        this.captureAndSendFrame,
        1000 / this.config.frameRate
      )
      return
    }

    // Create temporary canvas to capture frame
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = this.videoElement.videoWidth
    tempCanvas.height = this.videoElement.videoHeight
    const tempCtx = tempCanvas.getContext('2d')

    if (tempCtx) {
      tempCtx.drawImage(this.videoElement, 0, 0)
      const frameData = tempCanvas.toDataURL('image/jpeg', 0.8)
      this.websocket.send(frameData)
    } else {
      throw new FrameCaptureError('Failed to get canvas context for frame capture')
    }

    // Schedule next frame
    this.animationFrameId = window.setTimeout(
      this.captureAndSendFrame,
      1000 / this.config.frameRate
    )
  }

  private setupWebSocket(): void {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    const wsHost = isLocalhost ? this.config.wsHost : window.location.host
    const wsProtocol = isLocalhost || window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${wsProtocol}//${wsHost}${this.config.wsEndpoint}`

    try {
      const ws = new WebSocket(wsUrl)
      this.websocket = ws

      ws.onopen = () => {
        this.notifyStatus('✅ Connected - Detection active', 'success')
        this.notifyStreamingChange(true)
        this.captureAndSendFrame()
      }

      ws.onmessage = (event) => {
        this.callbacks.onFrameReceived?.(event.data)
        this.renderFrame(event.data)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        const wsError = new WebSocketConnectionError('WebSocket connection failed', wsUrl)
        this.notifyStatus(`❌ ${wsError.message}`, 'error')
      }

      ws.onclose = () => {
        this.notifyStatus('🔌 Connection closed', 'info')
        if (this._isStreaming) {
          this.stop()
        }
      }
    } catch (error) {
      throw new WebSocketConnectionError(`Failed to create WebSocket connection to ${wsUrl}`, wsUrl)
    }
  }

  private renderFrame(imageData: string): void {
    const img = new Image()
    img.onload = () => {
      this.canvasContext.drawImage(
        img,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )
    }
    img.src = imageData
  }

  private async initializeCamera(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: this.config.videoConstraints,
        audio: false
      })

      this.mediaStream = stream
      this.videoElement.srcObject = stream
      await this.videoElement.play()

      // Configure canvas dimensions
      if (this.videoElement.videoWidth && this.videoElement.videoHeight) {
        this.canvasElement.width = this.videoElement.videoWidth
        this.canvasElement.height = this.videoElement.videoHeight
      }
    } catch (error) {
      if (error instanceof Error) {
        // Check for specific error types
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          throw new CameraPermissionError('Camera access was denied. Please allow camera permissions.')
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          throw new CameraNotFoundError('No camera device was found on this device.')
        } else {
          throw new CameraInitializationError(
            `Failed to initialize camera: ${error.message}`,
            error
          )
        }
      }
      throw new CameraInitializationError('An unknown error occurred while initializing the camera')
    }
  }

  // Public methods
  async start(): Promise<void> {
    try {
      this.notifyStatus('📡 Starting camera...', 'info')

      await this.initializeCamera()
      this.setupWebSocket()
    } catch (error) {
      console.error('Error starting inspector:', error)
      
      // Provide user-friendly error messages
      if (error instanceof CameraPermissionError) {
        this.notifyStatus(`❌ ${error.message}`, 'error')
      } else if (error instanceof CameraNotFoundError) {
        this.notifyStatus(`❌ ${error.message}`, 'error')
      } else if (error instanceof CameraInitializationError) {
        this.notifyStatus(`❌ Camera error: ${error.message}`, 'error')
      } else if (error instanceof WebSocketConnectionError) {
        this.notifyStatus(`❌ Connection failed: ${error.message}`, 'error')
      } else if (error instanceof Error) {
        this.notifyStatus(`❌ Error: ${error.message}`, 'error')
      } else {
        this.notifyStatus('❌ An unknown error occurred', 'error')
      }
      
      this.stop()
      throw error
    }
  }

  stop(): void {
    this.notifyStreamingChange(false)

    if (this.animationFrameId) {
      clearTimeout(this.animationFrameId)
      this.animationFrameId = null
    }

    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop())
      this.mediaStream = null
    }

    this.videoElement.srcObject = null
    this.callbacks.onStatusChange?.(null)
  }

  destroy(): void {
    this.stop()
    this.videoElement.remove()
    this.canvasElement.remove()
  }

  // Configuration methods
  updateConfig(config: Partial<InspectorConfig>): void {
    this.config = { ...this.config, ...config }
  }

  updateCallbacks(callbacks: Partial<InspectorCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }
}
