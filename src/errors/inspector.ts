/**
 * Base error class for Inspector-related errors
 */
export class InspectorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InspectorError'
    Object.setPrototypeOf(this, InspectorError.prototype)
  }
}

/**
 * Error thrown when camera initialization fails
 */
export class CameraInitializationError extends InspectorError {
  originalError?: Error

  constructor(message: string = 'Failed to initialize camera', originalError?: Error) {
    super(message)
    this.name = 'CameraInitializationError'
    this.originalError = originalError
    Object.setPrototypeOf(this, CameraInitializationError.prototype)
  }
}

/**
 * Error thrown when camera access is denied
 */
export class CameraPermissionError extends InspectorError {
  constructor(message: string = 'Camera access denied by user') {
    super(message)
    this.name = 'CameraPermissionError'
    Object.setPrototypeOf(this, CameraPermissionError.prototype)
  }
}

/**
 * Error thrown when no camera is found
 */
export class CameraNotFoundError extends InspectorError {
  constructor(message: string = 'No camera device found') {
    super(message)
    this.name = 'CameraNotFoundError'
    Object.setPrototypeOf(this, CameraNotFoundError.prototype)
  }
}

/**
 * Error thrown when WebSocket connection fails
 */
export class WebSocketConnectionError extends InspectorError {
  url?: string

  constructor(
    message: string = 'Failed to establish WebSocket connection',
    url?: string
  ) {
    super(message)
    this.name = 'WebSocketConnectionError'
    this.url = url
    Object.setPrototypeOf(this, WebSocketConnectionError.prototype)
  }
}

/**
 * Error thrown when WebSocket connection is lost
 */
export class WebSocketDisconnectedError extends InspectorError {
  constructor(message: string = 'WebSocket connection lost') {
    super(message)
    this.name = 'WebSocketDisconnectedError'
    Object.setPrototypeOf(this, WebSocketDisconnectedError.prototype)
  }
}

/**
 * Error thrown when frame capture fails
 */
export class FrameCaptureError extends InspectorError {
  constructor(message: string = 'Failed to capture video frame') {
    super(message)
    this.name = 'FrameCaptureError'
    Object.setPrototypeOf(this, FrameCaptureError.prototype)
  }
}

/**
 * Error thrown when canvas context cannot be created
 */
export class CanvasContextError extends InspectorError {
  constructor(message: string = 'Failed to create canvas 2D context') {
    super(message)
    this.name = 'CanvasContextError'
    Object.setPrototypeOf(this, CanvasContextError.prototype)
  }
}

/**
 * Error thrown when Inspector is used in an invalid state
 */
export class InvalidStateError extends InspectorError {
  currentState: string

  constructor(message: string, currentState: string) {
    super(message)
    this.name = 'InvalidStateError'
    this.currentState = currentState
    Object.setPrototypeOf(this, InvalidStateError.prototype)
  }
}

/**
 * Error thrown when configuration is invalid
 */
export class InvalidConfigError extends InspectorError {
  configKey?: string

  constructor(message: string, configKey?: string) {
    super(message)
    this.name = 'InvalidConfigError'
    this.configKey = configKey
    Object.setPrototypeOf(this, InvalidConfigError.prototype)
  }
}
