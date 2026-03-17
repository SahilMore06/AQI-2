function Footer() {
  return (
    <footer className="bg-surface border-t border-border px-10 py-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, var(--primary-d), var(--accent-d))' }}
        >
          <span className="font-mono text-[8px] font-bold text-black">AQ</span>
        </div>
        <span className="font-semibold">AQI Pulse</span>
      </div>

      <div className="flex items-center gap-6 font-mono text-[9px] text-muted">
        <a href="#" className="hover:text-accent transition">Privacy</a>
        <a href="#" className="hover:text-accent transition">API Docs</a>
        <a href="#" className="hover:text-accent transition">GitHub</a>
        <a href="#" className="hover:text-accent transition">About</a>
      </div>

      <div className="font-mono text-[9px] text-dim">
        © 2026
      </div>
    </footer>
  )
}

export default Footer