import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface Spec {
  category: string
  items: Array<{
    label: string
    value: string
  }>
}

const specs: Spec[] = [
  {
    category: 'Display',
    items: [
      { label: 'Size', value: '6.67" LTPO OLED' },
      { label: 'Resolution', value: '2772 × 1344 pixels' },
      { label: 'Refresh Rate', value: '1-120Hz adaptive' },
      { label: 'Peak Brightness', value: '2400 nits' },
      { label: 'HDR Support', value: 'HDR10+, Dolby Vision' }
    ]
  },
  {
    category: 'Performance',
    items: [
      { label: 'Processor', value: 'Snapdragon 8s Gen 4' },
      { label: 'Process', value: '4nm TSMC' },
      { label: 'RAM', value: '12GB LPDDR5X' },
      { label: 'Storage', value: '256GB / 512GB UFS 4.0' },
      { label: 'GPU', value: 'Adreno 750' }
    ]
  },
  {
    category: 'Camera',
    items: [
      { label: 'Main', value: '50MP Sony IMX890, f/1.8, OIS' },
      { label: 'Ultra-wide', value: '50MP Samsung JN1, f/2.2, 114°' },
      { label: 'Telephoto', value: '32MP Samsung GD1, f/2.4, 2x' },
      { label: 'Front', value: '32MP Sony IMX615, f/2.45' },
      { label: 'Video', value: '8K@30fps, 4K@60fps, OIS+EIS' }
    ]
  },
  {
    category: 'Glyph Interface',
    items: [
      { label: 'LED Zones', value: '26 individual zones' },
      { label: 'Color Range', value: '2.5 billion combinations' },
      { label: 'Customization', value: 'App-specific patterns' },
      { label: 'Brightness', value: 'Auto-adjusting' },
      { label: 'Integration', value: 'Notification, charging, music' }
    ]
  },
  {
    category: 'Battery & Charging',
    items: [
      { label: 'Capacity', value: '5000 mAh' },
      { label: 'Wired Charging', value: '45W fast charge' },
      { label: 'Wireless Charging', value: '15W Qi-certified' },
      { label: 'Reverse Wireless', value: '5W' },
      { label: 'Battery Life', value: 'Up to 2 days typical use' }
    ]
  },
  {
    category: 'Design & Build',
    items: [
      { label: 'Dimensions', value: '162.1 × 76.4 × 8.5 mm' },
      { label: 'Weight', value: '195g' },
      { label: 'Back', value: 'Transparent glass with Glyph' },
      { label: 'Frame', value: 'Recycled aluminum' },
      { label: 'Water Resistance', value: 'IP54' }
    ]
  },
  {
    category: 'Connectivity',
    items: [
      { label: '5G', value: 'Sub-6GHz, mmWave' },
      { label: 'WiFi', value: 'WiFi 7 (802.11be)' },
      { label: 'Bluetooth', value: '5.4 with LE Audio' },
      { label: 'NFC', value: 'Yes' },
      { label: 'USB', value: 'USB-C 3.2 Gen 2' }
    ]
  },
  {
    category: 'Software',
    items: [
      { label: 'OS', value: 'Nothing OS 3.0' },
      { label: 'Based on', value: 'Android 15' },
      { label: 'Updates', value: '4 years OS, 5 years security' },
      { label: 'UI', value: 'Minimal, clean, focused' },
      { label: 'Bloatware', value: 'None' }
    ]
  }
]

function SpecsTable() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.specs-header',
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

      // Spec categories staggered animation
      specs.forEach((_specCategory, index) => {
        const delay = index * 0.05

        gsap.fromTo(`.spec-category-${index}`,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.spec-category-${index}`,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="bg-white py-24 px-6 lg:px-20"
    >
      {/* Header */}
      <div className="specs-header text-center mb-20 opacity-0">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5 font-mono text-[10px] text-black/60 uppercase tracking-[0.15em]">
            TECHNICAL SPECIFICATIONS
          </span>
        </div>
        <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-black">
          Tech Specs.
        </h2>
        <p className="text-lg text-black/60 max-w-2xl mx-auto leading-relaxed">
          Complete technical details and specifications.
        </p>
      </div>

      {/* Specs Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {specs.map((specCategory, categoryIndex) => (
            <div
              key={specCategory.category}
              className={`spec-category-${categoryIndex} opacity-0`}
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold text-black mb-6 pb-3 border-b-2 border-black">
                {specCategory.category}
              </h3>

              {/* Spec Items */}
              <div className="space-y-4">
                {specCategory.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between items-start gap-4 py-2"
                  >
                    <span className="text-sm font-mono text-black/50 uppercase tracking-wide flex-shrink-0">
                      {item.label}
                    </span>
                    <span className="text-sm text-black text-right font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-black/10">
        <p className="text-xs text-black/40 text-center leading-relaxed">
          Specifications are subject to change without notice. Actual battery life varies by usage patterns.
          Display measurements are diagonal. Some features may vary by region.
        </p>
      </div>
    </section>
  )
}

export default SpecsTable
