import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Import Nothing Phone 3 components
import NavNothing from './components/Nav/NavNothing'
import ScrollyCanvas from './components/Scrolly/ScrollyCanvas'
import Overlay from './components/Scrolly/Overlay'
import FeaturesGridNothing from './components/Features/FeaturesGridNothing'
import SpecsTable from './components/Specs/SpecsTable'
import PricingSection from './components/Pricing/PricingSection'
import FooterNothing from './components/Footer/FooterNothing'

gsap.registerPlugin(ScrollTrigger)

function AppNothing() {
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorRing = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    })

    // Feed Lenis into GSAP ticker for perfect sync
    const lenisRaf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger defaults
    ScrollTrigger.defaults({ scroller: document.body })

    // Custom cursor setup
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }

      // Update dot position immediately
      if (cursorDot.current) {
        cursorDot.current.style.left = `${e.clientX}px`
        cursorDot.current.style.top = `${e.clientY}px`
      }
    }

    // Lag ring animation
    const animateRing = () => {
      const { x: mx, y: my } = mousePosRef.current
      const { x: rx, y: ry } = ringPosRef.current

      ringPosRef.current.x += (mx - rx) * 0.12
      ringPosRef.current.y += (my - ry) * 0.12

      if (cursorRing.current) {
        cursorRing.current.style.left = `${ringPosRef.current.x}px`
        cursorRing.current.style.top = `${ringPosRef.current.y}px`
      }

      requestAnimationFrame(animateRing)
    }

    // Hover effects
    const handleMouseEnter = () => {
      document.body.classList.add('cursor-hover')
    }

    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-hover')
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    const hoverElements = document.querySelectorAll('a, button, input, [data-hover]')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Start ring animation
    animateRing()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })

      lenis.destroy()
      gsap.ticker.remove(lenisRaf)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div id="cursor-dot" ref={cursorDot} />
      <div id="cursor-ring" ref={cursorRing} />

      {/* Navigation */}
      <NavNothing />

      {/* Main Content */}
      <main className="bg-white">
        {/* Scrollytelling Canvas Section with Text Overlay */}
        <div className="relative">
          <ScrollyCanvas />
          <Overlay />
        </div>

        {/* Features Grid */}
        <FeaturesGridNothing />

        {/* Specs Table */}
        <SpecsTable />

        {/* Pricing Section */}
        <PricingSection />
      </main>

      {/* Footer */}
      <FooterNothing />
    </>
  )
}

export default AppNothing
