import { useAQISimulation } from '../../lib/aqi-engine'

function HUD() {
  const { aqi, category, color } = useAQISimulation()

  return (
    <section id="hud" className="bg-bg border-b border-border">
      {/* Header Bar */}
      <div className="surface bg-surface/80 backdrop-blur-sm border-b border-border h-[38px] flex items-center justify-between px-6">
        <div className="font-mono text-[10px] text-muted uppercase tracking-[0.14em] flex items-center gap-2">
          <span className="text-accent">●</span>
          AQI Pulse / Live Dashboard — FastAPI localhost:8000 — Mode: SIMULATION
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="flex items-center gap-1 text-good">
            <span style={{ animation: 'blinkCaret 0.9s infinite' }}>▶</span>
            LIVE
          </span>
          <span className="text-muted">·</span>
          <span className="text-muted">Riverpod StreamProvider</span>
          <span className="text-muted">·</span>
          <span className="text-muted">Poll 2s</span>
        </div>
      </div>

      {/* Main HUD Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] min-h-[180px]">
        {/* Primary AQI Display */}
        <div className="hud-main border-r-0 lg:border-r border-border p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl lg:text-8xl font-mono font-bold mb-3 leading-none" style={{ color }}>
              {aqi}
            </div>
            <div className="text-lg font-semibold mb-2 uppercase tracking-wide" style={{ color }}>
              {category}
            </div>
            <div className="text-sm text-muted font-mono">PM2.5 μg/m³</div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="w-20 h-1 mx-auto rounded-full" style={{ background: color }} />
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3">
          {/* Connection Status */}
          <div className="hud-cell border-b sm:border-b-0 sm:border-r border-border p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-muted uppercase tracking-wide">Connection</div>
                <div className="w-2 h-2 bg-good rounded-full animate-pulse" />
              </div>
              <div className="text-lg font-semibold text-good">ONLINE</div>
              <div className="text-xs text-muted">WebSocket Active</div>
            </div>
          </div>

          {/* Threshold */}
          <div className="hud-cell border-b sm:border-b-0 sm:border-r border-border p-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-muted uppercase tracking-wide">Threshold</div>
              <div className="text-2xl font-mono font-bold text-accent">100</div>
              <div className="text-xs text-muted">μg/m³ Alert Level</div>
            </div>
          </div>

          {/* Mode */}
          <div className="hud-cell p-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-muted uppercase tracking-wide">Mode</div>
              <div className="text-lg font-mono font-semibold text-primary">SIMULATION</div>
              <div className="text-xs text-muted">Real-time Data</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-border">
        {[
          { label: 'PM2.5', value: aqi, unit: 'μg/m³', color: color, status: 'Current' },
          { label: 'PM10', value: '65', unit: 'μg/m³', color: '#FFE57F', status: 'Moderate' },
          { label: 'CO₂', value: '415', unit: 'ppm', color: '#4D94FF', status: 'Normal' },
          { label: 'VOC', value: '0.18', unit: 'mg/m³', color: '#00FFCC', status: 'Low' },
        ].map((metric, i) => (
          <div key={i} className="border-r border-border last:border-r-0 p-5 hover:bg-glass transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-muted uppercase tracking-wide">{metric.label}</div>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: metric.color }} />
              </div>
              <div className="text-xl font-mono font-bold leading-none" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <div className="text-xs text-muted">{metric.unit}</div>
              <div className="text-xs font-mono text-muted/70">{metric.status}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HUD

export default HUD