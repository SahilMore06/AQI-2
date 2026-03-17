import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface LoadingProps {
  onComplete: () => void
}

export default function Loading({ onComplete }: LoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete()
      }
    })

    // Animate progress number
    tl.to(
      {},
      {
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: function () {
          const val = Math.round(this.progress() * 100)
          setProgress(val)
        }
      },
      0
    )

    // Animate progress bar width
    if (progressBarRef.current) {
      tl.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 2.2,
          ease: 'power2.inOut',
          transformOrigin: 'left center'
        },
        0
      )
    }

    const messages = ['INITIALIZING_NETWORK', 'CALIBRATING_SENSORS', 'ACQUIRING_SIGNALS', 'SYSTEM_READY']
    let currentMsg = 0

    const textInterval = setInterval(() => {
      currentMsg++
      if (currentMsg < messages.length && textRef.current) {
        textRef.current.innerText = messages[currentMsg]
      }
    }, 550)

    // Outro animation: Slide up
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.2
      },
      '>'
    )

    return () => {
      clearInterval(textInterval)
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-zinc-400 font-mono"
    >
      <div className="w-full max-w-md px-8 flex flex-col items-center gap-12">
        {/* Brand */}
        <div className="text-2xl tracking-[0.25em] text-white font-light">
          NOTHING<span className="text-red-500 font-bold">.</span> AQI
        </div>

        <div className="w-full space-y-4">
          {/* Progress Bar Container */}
          <div className="w-full h-[2px] bg-zinc-800 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-red-500 w-full"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Status Text & Number */}
          <div className="w-full flex justify-between text-xs tracking-widest uppercase">
            <div ref={textRef} className="opacity-70">
              INITIALIZING_NETWORK
            </div>
            <div className="text-white tab-nums">
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
