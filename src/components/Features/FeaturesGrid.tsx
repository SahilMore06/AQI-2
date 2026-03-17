import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  const features = [
    {
      id: 'realtime',
      type: 'large',
      title: 'Real-time monitoring.',
      subtitle: 'Live data streams from 12 active sensors',
      description: 'WebSocket connections provide instant updates every 2 seconds. Monitor PM2.5, PM10, CO₂, and VOC levels with microsecond precision.',
      icon: '⚡',
      color: '#4D94FF',
      metrics: ['2s', 'poll rate', '12', 'sensors', '99.9%', 'uptime']
    },
    {
      id: 'ai',
      type: 'medium',
      title: 'AI predictions.',
      subtitle: 'Machine learning forecasts',
      description: 'Advanced algorithms predict air quality trends 24 hours ahead using historical patterns and weather data.',
      icon: '🧠',
      color: '#00FFCC',
      metrics: ['24h', 'forecast', '94%', 'accuracy']
    },
    {
      id: 'alerts',
      type: 'medium',
      title: 'Smart alerts.',
      subtitle: 'Threshold-based notifications',
      description: 'Intelligent alert system with customizable thresholds. Real-time notifications when air quality reaches critical levels.',
      icon: '🚨',
      color: '#FF5252',
      metrics: ['<100ms', 'response', 'custom', 'thresholds']
    },
    {
      id: 'visualization',
      type: 'large',
      title: 'Interactive globe.',
      subtitle: '3D visualization powered by Three.js',
      description: 'Drag and explore air quality data across major cities worldwide. Real-time city pinpoints with color-coded AQI levels.',
      icon: '🌍',
      color: '#00E676',
      metrics: ['60fps', 'rendering', '50+', 'cities', '3D', 'interactive']
    },
    {
      id: 'api',
      type: 'small',
      title: 'FastAPI backend.',
      subtitle: 'High-performance Python API',
      icon: '🔌',
      color: '#FFE57F'
    },
    {
      id: 'glassmorphic',
      type: 'small',
      title: 'Dark design.',
      subtitle: 'Glassmorphic UI system',
      icon: '🎨',
      color: '#CE93D8'
    },
    {
      id: 'performance',
      type: 'small',
      title: 'Optimized.',
      subtitle: 'Vite + React + TypeScript',
      icon: '🚀',
      color: '#FF9E40'
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.features-header',
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          }
        }
      )

      // Feature cards staggered animation
      features.forEach((feature, index) => {
        const delay = index * 0.1

        gsap.fromTo(`.feature-${feature.id}`,
          {
            opacity: 0,
            y: 100,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: delay,
            scrollTrigger: {
              trigger: `.feature-${feature.id}`,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Hover effects for interactive cards
        if (feature.type !== 'small') {
          ScrollTrigger.create({
            trigger: `.feature-${feature.id}`,
            start: 'top 80%',
            onEnter: () => {
              gsap.set(`.feature-${feature.id} .feature-icon`, {
                rotation: 0,
                scale: 1
              })

              gsap.to(`.feature-${feature.id} .feature-icon`, {
                rotation: 360,
                scale: 1.2,
                duration: 2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
              })
            }
          })
        }
      })

      // Metrics counter animations
      gsap.set('.metric-value', { opacity: 0, scale: 0.5 })

      ScrollTrigger.batch('.metric-value', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
          })
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-bg border-t border-border py-24 px-6 lg:px-20"
    >
      {/* Header */}
      <div className="features-header text-center mb-16 opacity-0">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card font-mono text-[11px] text-accent uppercase tracking-[0.15em]">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Feature Showcase
          </span>
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-text">Built for</span><br />
          <span className="gradient-text">performance.</span>
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Advanced air quality monitoring with real-time data processing,
          AI-powered predictions, and interactive 3D visualization.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`
              feature-${feature.id}
              ${feature.type === 'large' ? 'lg:col-span-2 lg:row-span-2' :
                feature.type === 'medium' ? 'lg:col-span-1 lg:row-span-2' :
                'lg:col-span-1 lg:row-span-1'}
              glass-card p-8 rounded-2xl relative overflow-hidden cursor-pointer
              transform transition-all duration-300
              hover:scale-[1.02] hover:bg-glass-h
              opacity-0
            `}
            style={{
              borderColor: `${feature.color}20`
            }}
          >
            {/* Background Glow */}
            <div
              className="absolute inset-0 opacity-5 rounded-2xl"
              style={{
                background: `radial-gradient(circle at center, ${feature.color}, transparent 70%)`
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div className="feature-icon text-4xl mb-6" style={{ color: feature.color }}>
                {feature.icon}
              </div>

              {/* Title & Subtitle */}
              <div className="mb-4">
                <h3 className="text-xl lg:text-2xl font-bold mb-2 text-text leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted font-medium">
                  {feature.subtitle}
                </p>
              </div>

              {/* Description */}
              {feature.description && (
                <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">
                  {feature.description}
                </p>
              )}

              {/* Metrics */}
              {feature.metrics && (
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  {feature.metrics.map((metric, index) => (
                    <div key={index} className={index % 2 === 0 ? 'text-center' : 'text-center'}>
                      {index % 2 === 0 ? (
                        <div className="metric-value text-2xl font-mono font-bold" style={{ color: feature.color }}>
                          {metric}
                        </div>
                      ) : (
                        <div className="text-xs font-mono text-muted uppercase tracking-wide">
                          {metric}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" style={{ color: feature.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20">
        <button
          className="group px-8 py-4 glass-card text-text hover:bg-glass-h transition-all duration-300 rounded-lg font-semibold"
          data-hover
        >
          <span className="flex items-center gap-2">
            Explore All Features
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>
    </section>
  )
}

export default FeaturesGrid
