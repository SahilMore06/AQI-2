function StatusBar() {
  return (
    <div className="h-10 border-t border-primary/30 bg-surface flex items-center justify-between px-6">
      <div className="flex items-center gap-6 font-mono text-[9px] text-muted">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-good rounded-full" />
          <span className="text-good">CONNECTION</span>
        </div>
        <div>AQI: <span className="text-primary">42</span> — <span className="text-primary">GOOD</span></div>
        <div>BACKEND: <span className="text-primary">localhost:8000</span></div>
        <div>POLL: <span className="text-primary">2s</span></div>
      </div>
      <div className="font-mono text-[9px] text-muted">
        AQI PULSE — MODE: SIMULATION — ALL SYSTEMS OPERATIONAL
      </div>
    </div>
  )
}

export default StatusBar