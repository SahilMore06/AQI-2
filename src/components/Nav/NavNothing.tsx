import { useState, useEffect } from 'react'

function NavNothing() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        ${scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/10'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div>
          <a
            href="#"
            className="text-xl font-bold text-black tracking-tight hover:opacity-60 transition-opacity"
          >
            Nothing.
          </a>
        </div>

        {/* Right: Product Name */}
        <div>
          <span className="text-sm font-medium text-black/60">
            Phone (3)
          </span>
        </div>
      </div>
    </nav>
  )
}

export default NavNothing
