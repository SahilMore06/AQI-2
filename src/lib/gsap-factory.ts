import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function buildSectionReveal(
  lineEl: HTMLElement | null,
  eyeEl: HTMLElement | null,
  titleEl: HTMLElement | null,
  contentCb?: (tl: gsap.core.Timeline) => void
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true })

  if (lineEl) {
    tl.fromTo(lineEl,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }
    )
  }

  if (eyeEl) {
    tl.fromTo(eyeEl,
      { y: '100%' },
      { y: '0%', duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
  }

  if (titleEl) {
    tl.fromTo(titleEl,
      { y: '105%' },
      { y: '0%', duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
  }

  // Call content callback for section-specific steps
  if (contentCb) {
    contentCb(tl)
  }

  return tl
}

export function buildHUDEntrance(triggerEl: string | HTMLElement): void {
  ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline()

      // Bar wipe
      tl.fromTo('.hud-bar',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' }
      )

      // Main cell from left
      tl.fromTo('.hud-main',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.2'
      )

      // Cells stagger up
      tl.fromTo('.hud-cell',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        '-=0.5'
      )

      // Progress bars fill
      tl.fromTo('.metric-bar-fill',
        { width: '0%' },
        { width: 'var(--bar-width)', stagger: 0.08, duration: 1.4, ease: 'power2.out' },
        '-=0.3'
      )
    }
  })
}

export function buildScrollyPins(
  triggerEl: string | HTMLElement,
  onUpdate: (phase: number) => void
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.4,
    onUpdate: (self) => {
      const phase = Math.min(Math.floor(self.progress * 6), 5)
      onUpdate(phase)
    }
  })
}

export function buildCardEntrance(
  cards: string | HTMLElement[],
  triggerEl: string | HTMLElement
): void {
  ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.fromTo(cards,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out'
        }
      )
    }
  })
}

export function buildRowEntrance(
  rows: string | HTMLElement[],
  triggerEl: string | HTMLElement,
  direction: 'left' | 'bottom' = 'left'
): void {
  const fromVars = direction === 'left'
    ? { x: -32, opacity: 0 }
    : { y: 30, opacity: 0 }

  const toVars = direction === 'left'
    ? { x: 0, opacity: 1 }
    : { y: 0, opacity: 1 }

  ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.fromTo(rows, fromVars, {
        ...toVars,
        stagger: direction === 'left' ? 0.07 : 0.12,
        duration: 0.6,
        ease: 'power3.out'
      })
    }
  })
}