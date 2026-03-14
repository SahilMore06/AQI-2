# 🌍 Smart AQI Control System

> Real-time Air Quality Monitoring with Human Safety & Water Spray Control

---

## 📋 Project Overview

This system:
1. **Measures air quality** (PM2.5) from sensors or simulation
2. **Controls water spray** when AQI exceeds threshold
3. **Detects humans** to pause spraying for safety
4. **Displays live data** on a web dashboard

```
Sensors → Raspberry Pi → FastAPI Backend → React Dashboard
             ↓
          Relay → Water Pump
             ↓
     PIR / ML Camera (Human Safety)
```

---

## 🚀 Quick Start (Simulation Mode)

### 1. Start Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs at: `http://localhost:8000`

### 2. Start Frontend

```bash
cd frontend
npm install
npm run dev -- --host
```

Dashboard runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
AQI/
├── backend/
│   ├── main.py              # FastAPI server (all modes)
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Configuration
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # React dashboard
│   │   ├── index.css        # Styles
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── start.bat                # Windows launcher
└── README.md
```

---

## 🔧 Phases

### Phase 2: Simulation (Software Only)
- No hardware needed
- Random AQI and human detection values
- Perfect for development and demo

### Phase 3: PIR Sensor (Hardware)
- Real PM2.5 readings from PMS5003
- PIR sensor for human detection
- Relay controls water pump

### Phase 4: ML Camera (Advanced)
- YOLO-based person detection
- Camera module for human detection
- Most accurate safety system

---

## 🔌 Hardware Connections (Phase 3)

### PMS5003 AQI Sensor
| PMS5003 | Pi Pin | GPIO |
|---------|--------|------|
| VCC     | Pin 2  | 5V   |
| GND     | Pin 6  | GND  |
| TX      | Pin 10 | GPIO15 |
| RX      | Pin 8  | GPIO14 |

⚠️ **Note**: TX ↔ RX (cross-wire)

### PIR Sensor
| PIR | Pi Pin | GPIO |
|-----|--------|------|
| VCC | Pin 4  | 5V   |
| GND | Pin 9  | GND  |
| OUT | Pin 16 | GPIO23 |

### Relay Module
| Relay | Pi Pin | GPIO |
|-------|--------|------|
| VCC   | Pin 2  | 5V   |
| GND   | Pin 14 | GND  |
| IN    | Pin 12 | GPIO18 |

---

## ⚙️ Raspberry Pi Setup

### Enable UART (for PMS5003)
```bash
sudo raspi-config
# Interface → Serial
# Login shell → NO
# Serial → YES
sudo reboot
```

### Enable Camera (for ML mode)
```bash
sudo raspi-config
# Interface → Camera → Enable
sudo reboot
```

### Test camera
```bash
libcamera-still -o test.jpg
```

---

## 🧠 System Logic

```
IF (AQI > threshold) AND (human == 0):
    spray = ON
ELSE:
    spray = OFF
```

| Condition | Spray Status |
|-----------|--------------|
| AQI > 100, No human | ✅ ON |
| AQI > 100, Human detected | ❌ OFF |
| AQI ≤ 100, No human | ❌ OFF |
| AQI ≤ 100, Human detected | ❌ OFF |

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info |
| `/aqi` | GET | Current AQI data |
| `/config` | GET | System config |
| `/threshold/{value}` | POST | Update threshold |

### Example Response (`/aqi`)
```json
{
  "pm25": 120,
  "spray": "ON",
  "human": 0,
  "mode": "SIMULATION",
  "threshold": 100,
  "category": "Unhealthy for Sensitive",
  "color": "#ff7e00",
  "time": "14:30:25",
  "date": "2026-02-08"
}
```

---

## 🎨 Dashboard Features

- **Real-time PM2.5 display** with color-coded categories
- **Spray status indicator** (ON/OFF with animation)
- **Human detection status** 
- **Threshold control slider**
- **Logic visualization** (shows why spray is ON/OFF)
- **Reading history** (last 10 entries)
- **Connection status**

---

## 📝 Configuration

Edit `.env` in backend folder:

```env
MODE=SIMULATION    # SIMULATION, PIR, or ML
AQI_THRESHOLD=100  # Spray threshold
HOST=0.0.0.0
PORT=8000
```

---

## 🏆 Viva Points

> "We first simulated AQI using software, then integrated real sensors, ensured human safety using PIR, and finally upgraded the system using AI-based human detection."

**Key Technical Points:**
- FastAPI backend with three operational modes
- Real-time WebSocket-like polling (2-second interval)
- GPIO control for relay and PIR sensor
- YOLO ML model for advanced human detection
- React frontend with glassmorphism UI
- Complete safety logic implementation

---

## 📜 License

MIT License - Educational Project
