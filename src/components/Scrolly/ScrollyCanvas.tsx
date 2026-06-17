import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'

// Total number of frames in the sequence
const FRAME_COUNT = 89

function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Map scroll progress (0-1) to frame index (0-88)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])

  // Preload all WebP frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = []
    let loadedCount = 0

    const handleImageLoad = () => {
      loadedCount++
      if (loadedCount === FRAME_COUNT) {
        setImagesLoaded(true)
        console.log(`✓ Loaded ${FRAME_COUNT} frames`)
      }
    }

    // Preload frames
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      const frameNumber = String(i).padStart(3, '0')
      img.src = `/sequence/frame_${frameNumber}.webp`
      img.onload = handleImageLoad
      img.onerror = () => {
        console.warn(`Failed to load frame ${frameNumber}`)
        handleImageLoad() // Continue even if a frame fails
      }
      loadedImages.push(img)
    }

    setImages(loadedImages)
  }, [])

  // Render frame based on scroll position
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const unsubscribe = frameIndex.on('change', (latest) => {
      const index = Math.round(latest)
      const validIndex = Math.max(0, Math.min(index, images.length - 1))

      const img = images[validIndex]
      if (!img || !img.complete) return

      // Set canvas size to match window
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.scale(dpr, dpr)

      // Calculate dimensions to fit image (object-fit: cover behavior)
      const imgAspect = img.width / img.height
      const canvasAspect = window.innerWidth / window.innerHeight

      let drawWidth = window.innerWidth
      let drawHeight = window.innerHeight
      let offsetX = 0
      let offsetY = 0

      if (imgAspect > canvasAspect) {
        // Image is wider - fit to height
        drawWidth = window.innerHeight * imgAspect
        offsetX = (window.innerWidth - drawWidth) / 2
      } else {
        // Image is taller - fit to width
        drawHeight = window.innerWidth / imgAspect
        offsetY = (window.innerHeight - drawHeight) / 2
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      context.setTransform(1, 0, 0, 1, 0, 0) // Reset transform
    })

    return () => unsubscribe()
  }, [imagesLoaded, images, frameIndex])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Trigger frame re-render by updating frameIndex
      frameIndex.set(frameIndex.get())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [frameIndex])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '500vh' }} // 5x viewport height for scroll duration
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 h-screen w-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ objectFit: 'cover' }}
        />

        {/* Loading Indicator */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto" />
              <p className="text-white/60 text-sm font-mono uppercase tracking-wider">
                Loading sequence...
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ScrollyCanvas
