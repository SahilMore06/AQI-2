import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

function AQIScale() {
  const sectionRef = useRef<HTMLElement>(null)

  const aqiLevels = [
    { level: 'Good', range: '0-50', color: '#00E676', description: 'Air quality is satisfactory' },
    { level: 'Moderate', range: '51-100', color: '#FFE57F', description: 'Acceptable for most people' },
    { level: 'Unhealthy for Sensitive Groups', range: '101-150', color: '#FF9E40', description: 'May cause issues for sensitive individuals' },
    { level: 'Unhealthy', range: '151-200', color: '#FF5252', description: 'Health warnings of emergency conditions' },
    { level: 'Very Unhealthy', range: '201-300', color: '#CE93D8', description: 'Health alert: everyone may experience effects' },
    { level: 'Hazardous', range: '300+', color: '#8E24AA', description: 'Emergency conditions: entire population affected' }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.aqiscale-header',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
          }
        }
      )

      // AQI level cards staggered reveal
      aqiLevels.forEach((_, index) => {
        gsap.fromTo(`.aqi-level-${index}`,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotationY: index % 2 === 0 ? -15 : 15
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.aqi-level-${index}`,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Progress bar animation
        gsap.fromTo(`.aqi-progress-${index}`,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: `.aqi-level-${index}`,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Scale visual effect
      gsap.fromTo('.aqi-scale-visual',
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: 'elastic.out(1, 0.8)',
          scrollTrigger: {
            trigger: '.aqi-scale-visual',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="aqiscale" className="bg-bg py-24 px-6 lg:px-20 border-t border-border">
      {/* Header */}
      <div className="aqiscale-header text-center mb-16 opacity-0">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card font-mono text-[11px] text-accent uppercase tracking-[0.15em]">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            AQI Reference Guide
          </span>
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-text">Understand</span><br />
          <span className="gradient-text">air quality.</span>
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          The Air Quality Index (AQI) translates air quality data into numbers and colors
          that help people understand when to take action to protect their health.
        </p>
      </div>

      {/* AQI Scale Visual */}
      <div className="aqi-scale-visual max-w-5xl mx-auto mb-16 opacity-0">
        <div className="relative">
          {/* Scale Bar */}
          <div className="h-16 rounded-2xl overflow-hidden flex shadow-2xl">
            {aqiLevels.map((level, index) => (
              <div
                key={index}
                className="flex-1 relative"
                style={{ backgroundColor: level.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              </div>
            ))}
          </div>

          {/* Scale Numbers */}
          <div className="flex justify-between mt-4 px-2">
            <span className="font-mono text-sm text-muted">0</span>
            <span className="font-mono text-sm text-muted">50</span>
            <span className="font-mono text-sm text-muted">100</span>
            <span className="font-mono text-sm text-muted">150</span>
            <span className="font-mono text-sm text-muted">200</span>
            <span className="font-mono text-sm text-muted">300+</span>
          </div>
        </div>
      </div>

      {/* AQI Level Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {aqiLevels.map((level, index) => (
          <div
            key={index}
            className={`aqi-level-${index} glass-card p-8 rounded-2xl relative overflow-hidden opacity-0`}
            style={{ borderColor: `${level.color}30` }}
          >
            {/* Background Glow */}
            <div
              className="absolute inset-0 opacity-5 rounded-2xl"
              style={{
                background: `radial-gradient(circle at top-left, ${level.color}, transparent 70%)`
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text mb-1">{level.level}</h3>
                  <div className="font-mono text-sm text-muted">AQI {level.range}</div>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-black text-sm"
                  style={{ backgroundColor: level.color }}
                >
                  {level.range.split('-')[0]}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-4">
                <div className="h-2 bg-dim rounded-full overflow-hidden">
                  <div
                    className={`aqi-progress-${index} h-full rounded-full origin-left`}
                    style={{ backgroundColor: level.color, transform: 'scaleX(0)' }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed">
                {level.description}
              </p>

              {/* Health Recommendations */}
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${level.color}10` }}>
                <div className="text-xs font-mono text-muted uppercase tracking-wide mb-2">
                  Health Impact
                </div>
                <div className="text-sm text-text">
                  {index <= 1 ? 'Safe for outdoor activities' :
                   index <= 2 ? 'Limit prolonged outdoor exertion' :
                   index <= 3 ? 'Avoid outdoor activities' :
                   index <= 4 ? 'Stay indoors when possible' :
                   'Emergency conditions - avoid all outdoor exposure'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="text-center mt-16">
        <div className="glass-card p-6 rounded-2xl inline-block">
          <div className="font-mono text-sm text-muted uppercase tracking-wide mb-2">
            Live AQI Monitoring
          </div>
          <div className="text-lg text-text font-semibold">
            Real-time data updates every 2 seconds from 12 active sensors
          </div>
        </div>
      </div>
    </section>
  )
}

export default AQIScale