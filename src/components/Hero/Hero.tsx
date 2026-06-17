import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Globe from '../Globe/Globe'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Parallax Globe - moves slower than scroll
      gsap.to(globeRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Main Content Parallax - moves faster, creating depth
      gsap.to(contentRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      })

      // Staggered fade out on scroll
      gsap.set([badgeRef.current, titleRef.current, descRef.current, buttonsRef.current], {
        opacity: 1
      })

      gsap.to([badgeRef.current, titleRef.current, descRef.current, buttonsRef.current], {
        opacity: 0,
        y: -100,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'center top',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Scale and fade background gradient on scroll
      gsap.to('.hero-gradient', {
        scale: 1.2,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen overflow-hidden bg-bg -mt-[54px] pt-[54px]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="hero-gradient w-full h-full bg-gradient-to-b from-transparent via-transparent to-bg/60" />
      </div>

      {/* Globe with Parallax */}
      <div ref={globeRef} className="absolute inset-0 z-[1]">
        <Globe />
      </div>

      {/* Hero Content with Parallax */}
      <div ref={contentRef} className="absolute inset-0 z-[10] flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Badge */}
          <div ref={badgeRef} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card font-mono text-[11px] text-accent uppercase tracking-[0.15em]">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              Glassmorphic Dark Science — AQI Pulse v1.0
            </span>
          </div>

          {/* Main Heading */}
          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8">
            <div className="mb-2">
              <span className="text-text">Smart Air Quality</span>
            </div>
            <div className="mb-2">
              <span className="gradient-text">Pulse</span>
            </div>
            <div className="text-outline text-4xl md:text-6xl lg:text-7xl">
              Monitor
            </div>
          </h1>

          {/* Description */}
          <p ref={descRef} className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time air quality monitoring with advanced analytics, predictive intelligence,
            and glassmorphic dark science design.
          </p>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group px-8 py-4 bg-gradient-to-r from-primary-d to-primary text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(77,148,255,0.3)] hover:scale-105"
              data-hover
            >
              <span className="flex items-center gap-2">
                View Live Dashboard
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
            <button
              className="px-8 py-4 glass-card text-text hover:bg-glass-h transition-all duration-300 rounded-lg font-semibold"
              data-hover
            >
              Explore Features
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[10]">
        <div className="text-center">
          <div className="font-mono text-[10px] text-muted uppercase tracking-[0.1em] mb-3">
            Scroll to monitor
          </div>
          <div className="w-px h-12 mx-auto bg-gradient-to-b from-accent to-transparent rounded-full"
               style={{ animation: 'scrollBar 2.2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}

export default Hero