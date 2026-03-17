# 🌍 AQI PULSE - Awwwards Level Air Quality App

> Real-time Air Quality Monitoring with Glassmorphic Dark Science Design

---

## 📋 Project Overview

Awwwards-level web application featuring:
1. **Interactive 3D Globe** - React Three Fiber with city sensor pins
2. **Advanced Animations** - GSAP ScrollTrigger + SplitText + Framer Motion
3. **Live AQI Simulation** - Real-time data with smooth transitions
4. **Glassmorphic UI** - Dark science aesthetic with custom cursor
5. **Smooth Scrolling** - Lenis integration with GSAP ticker

```
Backend (FastAPI) ← → Vite + React App (Awwwards Design)
     ↓
  Port 8000              Port 3000+
```

---

## 🚀 Quick Start

### Use the Launcher (Recommended)
```bash
start.bat
```

Choose from menu:
- `[1]` Start Everything (Backend + Vite App)
- `[2]` Vite → Dev Server
- `[3]` Vite → Build Production

### Manual Start

#### 1. Start Backend
```bash
cd backend
python main.py
```

#### 2. Start Vite App
```bash
npm install
npm run dev
```

**URLs:**
- Backend: `http://localhost:8000`
- Vite App: `http://localhost:3000+` (auto-port selection)

---

## 📁 Project Structure

```
AQI/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt     # Python dependencies
│   └── aqi.db              # SQLite database
│
├── src/
│   ├── lib/
│   │   ├── constants.ts     # AQI helpers, city coords, data
│   │   ├── aqi-engine.ts    # useAQISimulation hook
│   │   └── gsap-factory.ts  # Reusable GSAP animations
│   ├── components/
│   │   ├── Globe/           # R3F 3D globe with interactions
│   │   ├── Hero/            # GSAP SplitText hero section
│   │   ├── Nav/             # Fixed nav with live AQI pill
│   │   ├── HUD/             # Live dashboard with SVG gauge
│   │   ├── Scrolly/         # 600vh narrative ScrollTrigger
│   │   └── ...              # Features, AQIScale, etc.
│   ├── App.tsx              # Lenis + custom cursor + layout
│   ├── main.tsx             # React 18 entry point
│   └── index.css            # CSS variables + animations
│
├── package.json             # Vite + React + Three.js deps
├── tailwind.config.js       # Glassmorphic color tokens
└── start.bat               # Windows launcher
```

---

## 🎨 Glassmorphic Dark Science Design

### Color Palette
- **Background**: `#070D1A`
- **Primary**: `#4D94FF` (Blue)
- **Accent**: `#00FFCC` (Cyan)
- **Typography**: Inter (UI) + JetBrains Mono (data)

### Key Features
- **3D Globe**: Interactive R3F canvas with city pins and drag controls
- **Custom Cursor**: Dot + ring system with hover states
- **CRT Effects**: Scanline overlay and ambient blob animations
- **Smooth Scroll**: Lenis integration feeding GSAP ticker
- **Live Data**: useAQISimulation hook with 2s polling intervals

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info |
| `/aqi` | GET | Current AQI data |
| `/config` | GET | System config |
| `/history` | GET | Reading history |

### Example Response (`/aqi`)
```json
{
  "pm25": 120,
  "mode": "SIMULATION",
  "category": "Unhealthy for Sensitive",
  "color": "#ff7e00",
  "time": "14:30:25",
  "date": "2026-03-17"
}
```

---

## 🚀 Tech Stack

### Frontend (Vite + React)
- **Framework**: Vite 8.0 + React 18 + TypeScript
- **3D Graphics**: React Three Fiber + Drei
- **Animation**: GSAP 3.14 + ScrollTrigger + SplitText
- **UI Animation**: Framer Motion 12
- **Styling**: Tailwind CSS 4.2 + CSS variables
- **Smooth Scroll**: Lenis integration
- **Fonts**: Inter + JetBrains Mono (@fontsource)

### Backend (FastAPI)
- **Framework**: FastAPI with Uvicorn
- **Database**: SQLite for AQI history
- **Simulation**: Live AQI engine with smooth fluctuation
- **CORS**: Enabled for Vite dev server

---

## ✨ Animation Features

- **Hero SplitText**: GSAP character-by-character reveal
- **ScrollTrigger**: 600vh narrative with phase transitions
- **Globe Interactions**: Drag controls with auto-rotation
- **Card Entrances**: Clip-path reveals with stagger
- **Custom Cursor**: Smooth lag animation with hover states
- **Live Updates**: Spring animations for data changes

---

## 📝 License

MIT License - Educational Project