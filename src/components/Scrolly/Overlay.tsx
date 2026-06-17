import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

interface Phase {
  id: string
  position: 'center' | 'left' | 'right'
  title: string
  subtitle: string
  description?: string
  scrollStart: number // 0-100
  scrollEnd: number // 0-100
}

const phases: Phase[] = [
  {
    id: 'intro',
    position: 'center',
    title: 'Nothing Phone 3.',
    subtitle: 'Engineered to be seen through.',
    scrollStart: 0,
    scrollEnd: 15
  },
  {
    id: 'glyph',
    position: 'left',
    title: 'Glyph Interface.',
    subtitle: 'A language of light.',
    description: '26 LED zones. 2.5 billion color combinations. Your notifications, reimagined.',
    scrollStart: 15,
    scrollEnd: 28
  },
  {
    id: 'processor',
    position: 'right',
    title: 'Snapdragon 8s Gen 4.',
    subtitle: 'Raw power inside.',
    description: '4nm architecture. 12GB LPDDR5X RAM. Built for performance.',
    scrollStart: 28,
    scrollEnd: 42
  },
  {
    id: 'camera',
    position: 'left',
    title: 'Triple Camera System.',
    subtitle: '50MP + 50MP + 32MP.',
    description: 'Sony IMX890 main sensor. Ultra-wide and telephoto precision.',
    scrollStart: 42,
    scrollEnd: 57
  },
  {
    id: 'battery',
    position: 'right',
    title: '5000 mAh.',
    subtitle: 'All day. All night.',
    description: '45W fast charging. 15W wireless. IP54 water resistance.',
    scrollStart: 57,
    scrollEnd: 72
  },
  {
    id: 'display',
    position: 'left',
    title: '6.67" LTPO OLED.',
    subtitle: '1-120Hz adaptive refresh.',
    description: '2400 nits peak brightness. True-to-life colors.',
    scrollStart: 72,
    scrollEnd: 100
  }
]

function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Convert scroll progress (0-1) to percentage (0-100)
  const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10">
      {phases.map((phase) => {
        // Calculate opacity based on scroll position
        const opacity = useTransform(
          scrollPercent,
          [
            phase.scrollStart - 5,
            phase.scrollStart,
            phase.scrollEnd - 5,
            phase.scrollEnd
          ],
          [0, 1, 1, 0]
        )

        // Calculate Y position for parallax effect
        const y = useTransform(
          scrollPercent,
          [phase.scrollStart, phase.scrollEnd],
          [100, -50]
        )

        // Calculate X position based on alignment
        const getJustifyClass = () => {
          if (phase.position === 'center') return 'justify-center items-center'
          if (phase.position === 'left') return 'justify-start items-center pl-8 md:pl-16 lg:pl-32'
          return 'justify-end items-center pr-8 md:pr-16 lg:pr-32'
        }

        return (
          <motion.div
            key={phase.id}
            className={`absolute inset-0 flex ${getJustifyClass()}`}
            style={{ opacity }}
          >
            <motion.div
              className={`max-w-lg ${phase.position === 'center' ? 'text-center' : ''}`}
              style={{ y }}
            >
              {/* Main Title */}
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white mb-3">
                {phase.title}
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light mb-6">
                {phase.subtitle}
              </p>

              {/* Description */}
              {phase.description && (
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-md">
                  {phase.description}
                </p>
              )}

              {/* Progress Indicator */}
              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-white/80 to-white/20" />
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    {String(Math.round(phase.scrollStart)).padStart(2, '0')}%
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default Overlay
