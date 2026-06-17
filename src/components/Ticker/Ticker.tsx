function Ticker() {
  const items = [
    { text: 'DELHI — AQI 42 — GOOD', color: '#00E676' },
    { text: 'MUMBAI — AQI 87 — MODERATE', color: '#FFE57F' },
    { text: 'KOLKATA — AQI 118 — UNHEALTHY', color: '#FF9E40' },
    { text: 'PUNE — AQI 62 — MODERATE', color: '#FFE57F' },
    { text: 'BACKEND — localhost:8000 — ONLINE', color: '#00FFCC' },
    { text: 'SENSORS — 12 ACTIVE — STREAMING', color: '#4D94FF' }
  ]

  return (
    <div className="h-[36px] border-y border-border bg-surface/60 backdrop-blur-sm overflow-hidden relative">
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent z-10" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'tickerScroll 40s linear infinite' }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="border-r border-border/50 h-[36px] flex items-center px-8 gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted hover:text-text transition-colors"
          >
            <div
              className="w-[6px] h-[6px] rounded-full animate-pulse"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ticker
