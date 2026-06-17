import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface Feature {
  id: string
  title: string
  subtitle: string
  description: string
  imagePosition: 'left' | 'right'
  stats?: Array<{ value: string; label: string }>
}

const features: Feature[] = [
  {
    id: 'display',
    title: '6.67" LTPO OLED',
    subtitle: 'Adaptive 1-120Hz',
    description: '2400 nits peak brightness with True-to-Life color accuracy. The display intelligently adapts its refresh rate from 1Hz to 120Hz, balancing smoothness with battery efficiency.',
    imagePosition: 'right',
    stats: [
      { value: '2400', label: 'nits peak' },
      { value: '120Hz', label: 'adaptive' },
      { value: 'LTPO', label: 'technology' }
    ]
  },
  {
    id: 'processor',
    title: 'Snapdragon 8s Gen 4',
    subtitle: '4nm powerhouse',
    description: 'Next-generation 4nm architecture with 12GB LPDDR5X RAM delivers exceptional performance while maintaining thermal efficiency. Built for demanding multitasking and gaming.',
    imagePosition: 'left',
    stats: [
      { value: '4nm', label: 'process' },
      { value: '12GB', label: 'RAM' },
      { value: 'LPDDR5X', label: 'memory' }
    ]
  },
  {
    id: 'camera',
    title: 'Triple Camera System',
    subtitle: 'Professional photography',
    description: '50MP Sony IMX890 main sensor with OIS, 50MP ultra-wide, and 32MP telephoto lens. Capture stunning photos in any lighting condition with advanced computational photography.',
    imagePosition: 'right',
    stats: [
      { value: '50MP', label: 'main' },
      { value: '50MP', label: 'ultra-wide' },
      { value: '32MP', label: 'telephoto' }
    ]
  },
  {
    id: 'glyph',
    title: 'Glyph Interface',
    subtitle: '26 LED zones',
    description: '2.5 billion color combinations create a unique language of light. Customize notifications, calls, and app alerts with precise LED control. Your phone communicates without words.',
    imagePosition: 'left',
    stats: [
      { value: '26', label: 'LED zones' },
      { value: '2.5B', label: 'colors' },
      { value: 'Custom', label: 'alerts' }
    ]
  },
  {
    id: 'battery',
    title: '5000 mAh Battery',
    subtitle: 'All-day power',
    description: '45W wired fast charging and 15W wireless charging. IP54 water resistance protects against splashes and dust. Power through your entire day and beyond.',
    imagePosition: 'right',
    stats: [
      { value: '5000', label: 'mAh' },
      { value: '45W', label: 'wired' },
      { value: '15W', label: 'wireless' }
    ]
  },
  {
    id: 'design',
    title: 'Transparent Design',
    subtitle: 'Nothing OS 3.0',
    description: 'Transparent back glass reveals the engineered beauty within. Premium aluminum frame with minimalist aesthetics. Nothing OS 3.0 delivers a clean, focused software experience.',
    imagePosition: 'left',
    stats: [
      { value: 'Glass', label: 'back' },
      { value: 'Aluminum', label: 'frame' },
      { value: 'IP54', label: 'rated' }
    ]
  }
]

function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.features-header',
        { opacity: 0, y: 60 },
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

      // Feature rows staggered animation
      features.forEach((feature) => {
        const featureClass = `.feature-row-${feature.id}`

        // Fade in with slide
        gsap.fromTo(featureClass,
          {
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featureClass,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Stats animation
        if (feature.stats) {
          gsap.fromTo(`${featureClass} .stat-item`,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: featureClass,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-white py-24 px-6 lg:px-20"
    >
      {/* Header */}
      <div className="features-header text-center mb-20 opacity-0">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 font-mono text-[10px] text-black/60 uppercase tracking-[0.15em]">
            FEATURES
          </span>
        </div>
        <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-black">
          Engineered to<br />perfection.
        </h2>
        <p className="text-lg text-black/60 max-w-2xl mx-auto leading-relaxed">
          Every detail meticulously crafted for an exceptional experience.
        </p>
      </div>

      {/* Feature Rows */}
      <div className="max-w-7xl mx-auto space-y-32">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`feature-row-${feature.id} opacity-0`}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              feature.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Image Placeholder */}
              <div className={`${feature.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="aspect-[4/3] bg-gradient-to-br from-black/5 to-black/10 rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-black/40 text-sm font-mono uppercase tracking-wider">
                      {feature.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${feature.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="max-w-lg">
                  {/* Title */}
                  <h3 className="text-4xl lg:text-5xl font-bold text-black mb-3 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xl lg:text-2xl text-black/50 font-light mb-6">
                    {feature.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base lg:text-lg text-black/70 leading-relaxed mb-10">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  {feature.stats && (
                    <div className="grid grid-cols-3 gap-6">
                      {feature.stats.map((stat, index) => (
                        <div key={index} className="stat-item text-center opacity-0">
                          <div className="text-2xl lg:text-3xl font-bold text-black mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs lg:text-sm text-black/50 uppercase tracking-wider font-mono">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Divider (except last) */}
            {features.indexOf(feature) !== features.length - 1 && (
              <div className="mt-32 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesGrid
