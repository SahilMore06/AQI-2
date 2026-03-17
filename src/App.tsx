import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Import components
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Ticker from './components/Ticker/Ticker'
import HUD from './components/HUD/HUD'
import ScrollySection from './components/Scrolly/ScrollySection'
import FeaturesGrid from './components/Features/FeaturesGrid'
import AQIScale from './components/AQIScale/AQIScale'
import TechStack from './components/TechStack/TechStack'
import CTA from './components/CTA/CTA'
import StatusBar from './components/StatusBar/StatusBar'
import Footer from './components/Footer/Footer'
import Loading from './components/Loading/Loading'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorRing = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    // Feed Lenis into GSAP ticker for perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
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
    document.querySelectorAll('a, button, input, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Start ring animation
    animateRing()

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.querySelectorAll('a, button, input, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })

      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div id="cursor-dot" ref={cursorDot} />
      <div id="cursor-ring" ref={cursorRing} />

      {/* Loading Sequence */}
      {isLoading && <Loading onComplete={() => setIsLoading(false)} />}

      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        {/* Ambient Background Blobs */}
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />

      {/* Navigation */}
      <Nav />

      {/* Main Content with proper spacing for fixed nav */}
      <main className="pt-[54px]">
        <Hero />
        <Ticker />
        <HUD />
        <ScrollySection />
        <FeaturesGrid />
        <AQIScale />
        <TechStack />
        <CTA />
      </main>

      {/* Footer Elements */}
        <StatusBar />
        <Footer />
      </div>
    </>
  )
}

export default App