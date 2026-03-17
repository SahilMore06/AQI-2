import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useAQISimulation } from '../../lib/aqi-engine'

function ScrollySection() {
  const { aqi, category, color } = useAQISimulation()
  const containerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  // Scroll phases data - similar to Nothing Phone workflow
  const phases = [
    {
      id: 'intro',
      position: 'center',
      title: 'AQI Pulse.',
      subtitle: 'Real-time air quality intelligence.',
      progress: 0
    },
    {
      id: 'sensors',
      position: 'left',
      title: 'Sensors everywhere.',
      subtitle: 'PM2.5 • PM10 • CO₂ • VOC • Temperature • Humidity',
      description: '12 active monitoring stations streaming data every 2 seconds.',
      progress: 16
    },
    {
      id: 'data',
      position: 'right',
      title: 'Intelligence layer.',
      subtitle: 'Machine learning predictions powered by historical patterns.',
      description: 'Advanced algorithms analyze air quality trends and predict pollution events before they happen.',
      progress: 32
    },
    {
      id: 'alerts',
      position: 'left',
      title: 'Alert system.',
      subtitle: 'Threshold-based notifications and emergency protocols.',
      description: 'Instant alerts when AQI levels exceed safe thresholds. WebSocket real-time communication.',
      progress: 48
    },
    {
      id: 'visualization',
      position: 'right',
      title: 'Live visualization.',
      subtitle: '3D globe interface with interactive city pinpoints.',
      description: 'React Three.js powered globe showing real-time air quality data across major cities worldwide.',
      progress: 64
    },
    {
      id: 'api',
      position: 'left',
      title: 'FastAPI backend.',
      subtitle: 'High-performance Python API with real-time data streaming.',
      description: 'localhost:8000 • REST endpoints • WebSocket connections • Real-time simulation engine',
      progress: 80
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Background color transitions
      const bgColors = ['#070D1A', '#0A0F1D', '#0D1220', '#101523', '#131826', '#161B29']

      phases.forEach((phase, index) => {
        const isLast = index === phases.length - 1

        // Phase content animations
        const phaseElement = `.phase-${phase.id}`

        // Fade in animation
        gsap.fromTo(phaseElement,
          {
            opacity: 0,
            y: 100,
            x: phase.position === 'left' ? -100 : phase.position === 'right' ? 100 : 0
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${phase.progress}% center`,
              end: `${phase.progress + 10}% center`,
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Fade out animation (except for last phase)
        if (!isLast) {
          gsap.to(phaseElement, {
            opacity: 0,
            y: -50,
            x: phase.position === 'left' ? -50 : phase.position === 'right' ? 50 : 0,
            duration: 1,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${phase.progress + 16}% center`,
              end: `${phase.progress + 20}% center`,
              scrub: 1
            }
          })
        }

        // Background color transitions
        if (index < bgColors.length) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: `${phase.progress}% top`,
            end: `${phase.progress + 16}% top`,
            onEnter: () => {
              gsap.to(stickyRef.current, {
                backgroundColor: bgColors[index],
                duration: 0.8,
                ease: 'power2.out'
              })
            },
            onEnterBack: () => {
              gsap.to(stickyRef.current, {
                backgroundColor: bgColors[index],
                duration: 0.8,
                ease: 'power2.out'
              })
            }
          })
        }
      })

      // Live AQI counter animation
      gsap.to('.live-aqi-counter', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="scrolly"
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* Sticky Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: '#070D1A' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 border border-primary/20 rounded-full"
            style={{ animation: 'spin 60s linear infinite' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 border border-accent/20 rounded-full"
            style={{ animation: 'spin 40s linear infinite reverse' }}
          />
        </div>

        {/* Live AQI Display - Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="live-aqi-counter mb-4">
            <div className="text-6xl font-mono font-bold mb-2" style={{ color }}>
              {aqi}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wide" style={{ color }}>
              {category}
            </div>
            <div className="w-20 h-1 mx-auto mt-3 rounded-full" style={{ background: color }} />
          </div>
        </div>

        {/* Phase Content Overlays */}
        {phases.map((phase) => (
          <div
            key={phase.id}
            className={`phase-${phase.id} absolute inset-0 flex items-center ${
              phase.position === 'center' ? 'justify-center' :
              phase.position === 'left' ? 'justify-start pl-16 lg:pl-32' :
              'justify-end pr-16 lg:pr-32'
            } z-20`}
            style={{ opacity: 0 }}
          >
            <div className={`max-w-lg ${phase.position === 'center' ? 'text-center' : ''}`}>
              {/* Main Title */}
              <div className="mb-4">
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-text mb-2">
                  {phase.title}
                </h2>
                <div className="text-lg lg:text-xl text-accent font-semibold">
                  {phase.subtitle}
                </div>
              </div>

              {/* Description */}
              {phase.description && (
                <p className="text-muted leading-relaxed text-sm lg:text-base max-w-md">
                  {phase.description}
                </p>
              )}

              {/* Progress Indicator */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-gradient-to-r from-primary to-accent" />
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">
                    {String(phase.progress).padStart(2, '0')}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center gap-2">
            {phases.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === 0 ? 'bg-accent' : 'bg-border'
                }`}
                style={{
                  animation: `pulse 2s infinite ${index * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ScrollySection
