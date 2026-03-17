export const AQI_COLORS = {
  good:       '#00E676',
  moderate:   '#FFE57F',
  unhealthy:  '#FF9E40',
  vunhealthy: '#FF5252',
  hazardous:  '#CE93D8',
} as const

export function aqiColor(v: number): string {
  if (v <= 50)  return AQI_COLORS.good
  if (v <= 100) return AQI_COLORS.moderate
  if (v <= 150) return AQI_COLORS.unhealthy
  if (v <= 200) return AQI_COLORS.vunhealthy
  return AQI_COLORS.hazardous
}

export function aqiCategory(v: number): string {
  if (v <= 50)  return 'GOOD'
  if (v <= 100) return 'MODERATE'
  if (v <= 150) return 'UNHEALTHY'
  if (v <= 200) return 'VERY UNHEALTHY'
  return 'HAZARDOUS'
}

export const CITY_COORDS: [number, number][] = [
  [28.6, 77.2],   // Delhi
  [19.1, 72.9],   // Mumbai
  [22.6, 88.4],   // Kolkata
  [12.9, 77.6],   // Bengaluru
  [18.5, 73.9],   // Pune
]

export const CITY_COLORS = [
  '#00E676', '#FFE57F', '#FF9E40', '#00E676', '#4D94FF',
]

export const TICKER_ITEMS = [
  { label: 'DELHI — AQI 42 — GOOD',              type: 'good' },
  { label: 'MUMBAI — AQI 87 — MODERATE',          type: 'moderate' },
  { label: 'KOLKATA — AQI 118 — UNHEALTHY',       type: 'bad' },
  { label: 'PUNE — AQI 62 — MODERATE',            type: 'good' },
  { label: 'BACKEND — localhost:8000 — ONLINE',   type: 'good' },
  { label: 'POLL INTERVAL — 2s — p95 <200ms',     type: 'moderate' },
  { label: 'RIVERPOD STREAM — ACTIVE',            type: 'good' },
  { label: 'FLUTTER 3.22+ · DART 3.4+',           type: 'moderate' },
]

export const SCROLLY_PHASES = [
  {
    pos: 'center',
    tag: 'Glassmorphic Dark Science — AQI Pulse v1.0',
    headline: 'Smart Air Quality\nIntelligence.',
    spec: 'SCROLL TO EXPLORE EVERY FEATURE ↓',
    specs: [
      { k: 'Version', v: '1.0.0' },
      { k: 'Stack', v: 'Vite + React 18' },
      { k: 'Backend', v: 'FastAPI 0.110' },
    ],
  },
  {
    pos: 'left',
    tag: 'F08 — Globe Landing — P1',
    headline: 'Spinning globe.\nWorld-scale\nawareness.',
    spec: '3D GLOBE AT 60FPS · 15°/SECOND\nAQI SENSOR PINS ON SURFACE\nSCROLL TRIGGERS DASHBOARD TRANSITION',
    specs: [
      { k: 'Feature', v: 'F08 — P1' },
      { k: 'FPS', v: '60 target' },
      { k: 'Transition', v: '400ms' },
    ],
  },
  {
    pos: 'right',
    tag: 'F01 — AQI Gauge — P0',
    headline: 'Radial arc.\nReal-time\nprecision.',
    spec: '270° SWEEP · SPRING ANIMATION\nPM2.5 COLOR INTERPOLATION\nDISPLAY-XL 48SP · UPDATES ≤ 2S',
    specs: [
      { k: 'Feature', v: 'F01 — P0' },
      { k: 'Sweep', v: '270° arc' },
      { k: 'Update', v: '≤ 2s' },
    ],
  },
  {
    pos: 'left',
    tag: 'F05 — API Polling — P0',
    headline: 'Live data.\nZero latency.',
    spec: 'FETCH + STREAMPROVIDER\n2-SECOND POLL CYCLE\nAUTO-RECONNECT ON TIMEOUT',
    specs: [
      { k: 'Feature', v: 'F05 — P0' },
      { k: 'Interval', v: '2 seconds' },
      { k: 'Retry', v: 'Auto' },
    ],
  },
  {
    pos: 'right',
    tag: 'F09 + F10 — Maps & Heatmap — P1',
    headline: 'Geospatial\nAQI narrative.',
    spec: 'REACT THREE FIBER GLOBE\nAQI HEATMAP — 500M RADIUS\nSENSOR PINS + TOOLTIP',
    specs: [
      { k: 'Feature', v: 'F09+F10 P1' },
      { k: 'Tech', v: 'R3F + Drei' },
      { k: 'Radius', v: '500m' },
    ],
  },
  {
    pos: 'left',
    tag: 'F04 — Threshold Control — P0',
    headline: 'Fine-tune\nyour alerts.',
    spec: 'RANGE: 0 – 300 AQI\nPOST /threshold/{value} ON RELEASE\n300MS DEBOUNCE · AUTO SYNCED',
    specs: [
      { k: 'Feature', v: 'F04 — P0' },
      { k: 'Range', v: '0–300 AQI' },
      { k: 'Debounce', v: '300ms' },
    ],
  },
]

export const FEATURE_CARDS = [
  { num: 'F01 — Priority 0', icon: '◉', title: 'AQI Gauge',          tag: 'P0 — MUST HAVE', tagBlue: true,
    desc: 'Radial arc gauge (270° sweep) animated on data change with spring curve. PM2.5 in display-xl. Arc color transitions via gradient matching AQI color tokens.',
    spec: 'DISPLAY-XL 48SP · SPRING CURVE\nCOLOR GRADIENT INTERPOLATION' },
  { num: 'F05 — Priority 0', icon: '⚡', title: 'API Polling Engine', tag: 'P0 — MUST HAVE', tagBlue: true,
    desc: '2-second interval via custom hook. Auto-reconnect on timeout. Error toast on failure. Typed exceptions: NetworkException, TimeoutException.',
    spec: 'FETCH STREAMPROVIDER\nAUTO-RECONNECT · ERROR TOAST' },
  { num: 'F06 — Priority 0', icon: '≡', title: 'Reading History',    tag: 'P0 — MUST HAVE', tagBlue: true,
    desc: 'Scrollable list of last 50 readings. Newest first. Columns: timestamp, AQI, PM2.5, category badge. Oldest reading auto-removed.',
    spec: '50 READINGS · NEWEST FIRST\nTIMESTAMP + AQI + CATEGORY' },
  { num: 'F04 — Priority 0', icon: '⊟', title: 'Threshold Slider',   tag: 'P0 — MUST HAVE', tagBlue: true,
    desc: 'Custom slider range 0–300. Value tooltip appears above on drag. POST /threshold/{value} on release with 300ms debounce.',
    spec: 'POST /THRESHOLD/{VALUE}\n300MS DEBOUNCE · SYNCED' },
  { num: 'F08 — Priority 1', icon: '🌍', title: 'Globe Landing',     tag: 'P1 — SHOULD HAVE', tagBlue: false,
    desc: 'Full-viewport R3F hero with dark starfield. Globe rotates at 15°/second. AQI sensor locations as colored orbs. Scroll triggers scale + fade.',
    spec: '60FPS · REACT THREE FIBER\nSCROLL TRANSITION: 400MS' },
  { num: 'F09 — Priority 1', icon: '◎', title: 'Sensor Map',        tag: 'P1 — SHOULD HAVE', tagBlue: false,
    desc: 'R3F globe with 5 Indian city sensor pins. AQI heatmap radial overlays. Click any pin for station details, PM2.5, and category.',
    spec: 'R3F + DREI · CIRCLE OVERLAYS\n5 SENSORS · TOOLTIP POPUP' },
  { num: 'F07 — Priority 1', icon: '⊙', title: 'Scroll Narrative',  tag: 'P1 — SHOULD HAVE', tagBlue: false,
    desc: '600vh sticky scroll section with 6 feature overlay phases. GSAP scrub maps scroll progress to phase index. Dashboard preview card center.',
    spec: 'GSAP SCROLLTRIGGER SCRUB\n6 PHASES · SMOOTH TRANSITION' },
  { num: 'F11 — Priority 2', icon: '◑', title: 'Dark Mode Only',    tag: 'P2 — NICE TO HAVE', tagBlue: false,
    desc: 'Pure dark mode glassmorphic science aesthetic. CSS custom properties for all tokens. AnimatePresence for section transitions.',
    spec: 'FRAMER MOTION VARIANTS\nCSSVARS TOKEN SWAP' },
  { num: 'F12 — Priority 2', icon: '◈', title: 'Connection Status', tag: 'P2 — NICE TO HAVE', tagBlue: false,
    desc: 'Green dot when connected, red on error. Retry button on failure. Live polling latency. Auto-reconnect with exponential backoff.',
    spec: 'GREEN / RED INDICATOR\nRETRY · EXPONENTIAL BACKOFF' },
]

export const TECH_ROWS = [
  { layer: 'Dev Server',   pkg: 'vite@5',                  purpose: 'Sub-50ms HMR. Native ES modules. No SSR overhead.' },
  { layer: 'UI Framework', pkg: 'react@18',                purpose: 'Component tree for Framer layout animations and R3F.' },
  { layer: 'Scroll Anim', pkg: 'gsap@3.12 + ScrollTrigger',purpose: 'Scroll-scrubbed timelines, section wipes, split-text.' },
  { layer: 'UI Anim',     pkg: 'framer-motion@11',         purpose: 'Layout animations, exit transitions, whileHover/tap.' },
  { layer: 'Smooth Scroll',pkg: 'lenis',                   purpose: 'Feeds into GSAP RAF ticker — perfectly synced.' },
  { layer: '3D Globe',    pkg: '@react-three/fiber + drei', purpose: 'Declarative Three.js. useScroll for canvas scroll-scrub.' },
  { layer: 'Styling',     pkg: 'tailwindcss + CSS vars',   purpose: 'Design tokens in config. Glassmorphic card utilities.' },
  { layer: 'Typography',  pkg: '@fontsource/inter + mono',  purpose: 'Inter for UI · JetBrains Mono for all data readouts.' },
  { layer: 'Backend',     pkg: 'FastAPI + uvicorn',         purpose: 'localhost:8000 · GET /aqi · POST /threshold/{value}' },
]