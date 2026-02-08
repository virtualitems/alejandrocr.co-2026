declare module 'lightbox2' {
  export interface LightboxOptions {
    albumLabel?: string
    alwaysShowNavOnTouchDevices?: boolean
    fadeDuration?: number
    fitImagesInViewport?: boolean
    imageFadeDuration?: number
    maxWidth?: number
    maxHeight?: number
    positionFromTop?: number
    resizeDuration?: number
    showImageNumberLabel?: boolean
    wrapAround?: boolean
    disableScrolling?: boolean
    sanitizeTitle?: boolean
  }

  export interface Lightbox {
    option(options: LightboxOptions): void
    init(): void
  }

  const lightbox: Lightbox
  export default lightbox
}
