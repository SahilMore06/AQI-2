import { useAQISimulation } from '../../lib/aqi-engine'

function Nav() {
  const { aqi } = useAQISimulation()

  const navLinks = ['Dashboard', 'Features', 'AQI Scale', 'Tech Stack']

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] h-[54px]"
      style={{
        background: 'rgba(7,13,26,0.85)',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(30, 58, 95, 0.3)'
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          {/* Logo Mark */}
          <div
            className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--primary-d), var(--accent-d))',
              boxShadow: '0 0 20px rgba(77, 148, 255, 0.3)'
            }}
          >
            <span className="font-mono text-[10px] font-bold text-black">AQ</span>
          </div>

          {/* Wordmark */}
          <div className="text-[14px] font-semibold">
            <span className="text-text">AQI </span>
            <span className="text-primary">Pulse</span>
          </div>
        </div>

        {/* Center: Nav Links (Hidden on mobile) */}
        <div className="hidden md:flex">
          {navLinks.map((link, index) => (
            <div
              key={link}
              className={`
                h-[54px] flex items-center px-5
                border-r border-border/30
                ${index === 0 ? 'border-l border-border/30' : ''}
                font-mono text-[10px] uppercase tracking-[0.1em] text-muted
                hover:text-text hover:bg-glass transition-all duration-300
                cursor-pointer relative group
              `}
              data-hover
            >
              <span className="relative z-10">{link}</span>
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Right: Live Pill + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Live AQI Pill */}
          <div
            className="border rounded-full px-4 py-2 flex items-center gap-2"
            style={{
              borderColor: 'rgba(0,255,204,0.25)',
              background: 'rgba(0,255,204,0.05)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {/* Live Dot */}
            <div
              className="w-[6px] h-[6px] rounded-full"
              style={{
                background: 'var(--good)',
                animation: 'livePulse 2s infinite'
              }}
            />

            {/* Text */}
            <span className="font-mono text-[11px] text-accent font-semibold">
              LIVE — AQI {aqi}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden w-8 h-8 flex items-center justify-center text-muted hover:text-text transition-colors" data-hover>
            <div className="w-4 h-3 flex flex-col justify-between">
              <span className="w-full h-[1px] bg-current" />
              <span className="w-full h-[1px] bg-current" />
              <span className="w-full h-[1px] bg-current" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
