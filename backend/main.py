# Smart AQI Control System - Backend
# Phase 2: Simulation Mode (No Hardware Required)
# Phase 3: PIR Mode (With Hardware)
# Phase 4: ML Mode (With AI Camera)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random
import os
import sqlite3

# Database setup
DB_NAME = "aqi.db"

def init_db():
    """Initialize database table"""
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS readings
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  pm25 INTEGER,
                  spray TEXT,
                  human INTEGER,
                  mode TEXT,
                  threshold INTEGER,
                  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

# Initialize DB on start
init_db()

app = FastAPI(title="Smart AQI Control System", version="1.0.0")

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
AQI_THRESHOLD = 100
MODE = os.getenv("MODE", "SIMULATION")  # SIMULATION, PIR, or ML

# Hardware components (initialized based on mode)
relay = None
pir = None
ser = None
model = None
cap = None


def init_hardware():
    """Initialize hardware components for PIR mode"""
    global relay, pir, ser
    try:
        from gpiozero import LED, MotionSensor
        import serial
        
        relay = LED(18)
        pir = MotionSensor(23)
        ser = serial.Serial("/dev/serial0", 9600, timeout=2)
        return True
    except Exception as e:
        print(f"Hardware init failed: {e}")
        return False


def init_ml():
    """Initialize ML components for AI camera mode"""
    global model, cap, relay
    try:
        from gpiozero import LED
        from ultralytics import YOLO
        import cv2
        
        relay = LED(18)
        model = YOLO("best.pt")
        cap = cv2.VideoCapture(0)
        return True
    except Exception as e:
        print(f"ML init failed: {e}")
        return False


def read_pm25_simulation():
    """Simulate PM2.5 reading"""
    return random.randint(20, 180)


def read_pm25_hardware():
    """Read PM2.5 from PMS5003 sensor"""
    if ser is None:
        return None
    try:
        data = ser.read(32)
        if len(data) == 32 and data[0] == 0x42:
            return data[12] * 256 + data[13]
    except Exception as e:
        print(f"Sensor read error: {e}")
    return None


def detect_human_simulation():
    """Simulate human detection"""
    return random.choice([0, 0, 0, 1])  # 25% chance of human


def detect_human_pir():
    """Detect human using PIR sensor"""
    if pir is None:
        return 0
    return 1 if pir.motion_detected else 0


def detect_human_ml():
    """Detect human using ML camera"""
    if model is None or cap is None:
        return 0
    try:
        ret, frame = cap.read()
        if not ret:
            return 0
        results = model(frame)
        for box in results[0].boxes:
            if model.names[int(box.cls[0])] == "person":
                return 1
    except Exception as e:
        print(f"ML detection error: {e}")
    return 0


def control_relay(spray_on: bool):
    """Control the relay/pump"""
    if relay is not None:
        if spray_on:
            relay.on()
        else:
            relay.off()


@app.on_event("startup")
async def startup():
    """Initialize system based on mode"""
    global MODE
    if MODE == "PIR":
        if not init_hardware():
            MODE = "SIMULATION"
            print("Falling back to SIMULATION mode")
    elif MODE == "ML":
        if not init_ml():
            MODE = "SIMULATION"
            print("Falling back to SIMULATION mode")
    print(f"🚀 System started in {MODE} mode")


@app.get("/")
def root():
    """API root endpoint"""
    return {
        "message": "🌍 Smart AQI Control System API",
        "version": "1.0.0",
        "mode": MODE,
        "threshold": AQI_THRESHOLD
    }
@app.get("/history")
def get_history():
    """Get last 50 readings"""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM readings ORDER BY id DESC LIMIT 50")
    rows = c.fetchall()
    conn.close()
    
    history = []
    for row in rows:
        # Reconstruct AQI category/color logic for history items
        pm25 = row["pm25"]
        if pm25 is None:
            cat, color = "Unknown", "#808080"
        elif pm25 <= 50:
            cat, color = "Good", "#00e400"
        elif pm25 <= 100:
            cat, color = "Moderate", "#ffff00"
        elif pm25 <= 150:
            cat, color = "Unhealthy for Sensitive", "#ff7e00"
        elif pm25 <= 200:
            cat, color = "Unhealthy", "#ff0000"
        elif pm25 <= 300:
            cat, color = "Very Unhealthy", "#8f3f97"
        else:
            cat, color = "Hazardous", "#7e0023"
            
        history.append({
            "pm25": pm25,
            "spray": row["spray"],
            "human": row["human"],
            "mode": row["mode"],
            "threshold": row["threshold"],
            "category": cat,
            "color": color,
            "time": datetime.strptime(row["timestamp"], "%Y-%m-%d %H:%M:%S").strftime("%H:%M:%S") if row["timestamp"] else "",
            "date": datetime.strptime(row["timestamp"], "%Y-%m-%d %H:%M:%S").strftime("%Y-%m-%d") if row["timestamp"] else ""
        })
    return history

@app.get("/aqi")
def get_data():
    """Get current AQI data and control spray system"""
    
    # Read PM2.5 based on mode
    if MODE == "SIMULATION":
        pm25 = read_pm25_simulation()
        human = detect_human_simulation()
    elif MODE == "PIR":
        pm25 = read_pm25_hardware()
        human = detect_human_pir()
    elif MODE == "ML":
        pm25 = read_pm25_simulation()  # Can still use simulation for AQI
        human = detect_human_ml()
    else:
        pm25 = read_pm25_simulation()
        human = detect_human_simulation()
    
    # Determine spray status
    # Logic: Spray ON only if AQI > threshold AND no human detected
    spray = "ON" if pm25 and pm25 > AQI_THRESHOLD and human == 0 else "OFF"
    
    # Control relay
    control_relay(spray == "ON")
    
    # Calculate AQI category
    if pm25 is None:
        aqi_category = "Unknown"
        aqi_color = "#808080"
    elif pm25 <= 50:
        aqi_category = "Good"
        aqi_color = "#00e400"
    elif pm25 <= 100:
        aqi_category = "Moderate"
        aqi_color = "#ffff00"
    elif pm25 <= 150:
        aqi_category = "Unhealthy for Sensitive"
        aqi_color = "#ff7e00"
    elif pm25 <= 200:
        aqi_category = "Unhealthy"
        aqi_color = "#ff0000"
    elif pm25 <= 300:
        aqi_category = "Very Unhealthy"
        aqi_color = "#8f3f97"
    else:
        aqi_category = "Hazardous"
        aqi_color = "#7e0023"
    
    # Save to database
    try:
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute("INSERT INTO readings (pm25, spray, human, mode, threshold) VALUES (?, ?, ?, ?, ?)",
                  (pm25, spray, human, MODE, AQI_THRESHOLD))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"DB Error: {e}")

    return {
        "pm25": pm25,
        "spray": spray,
        "human": human,
        "mode": MODE,
        "threshold": AQI_THRESHOLD,
        "category": aqi_category,
        "color": aqi_color,
        "time": datetime.now().strftime("%H:%M:%S"),
        "date": datetime.now().strftime("%Y-%m-%d")
    }


@app.get("/config")
def get_config():
    """Get system configuration"""
    return {
        "mode": MODE,
        "threshold": AQI_THRESHOLD,
        "spray_logic": "AQI > threshold AND human == 0"
    }


@app.post("/threshold/{value}")
def set_threshold(value: int):
    """Update AQI threshold"""
    global AQI_THRESHOLD
    if 50 <= value <= 500:
        AQI_THRESHOLD = value
        return {"message": f"Threshold updated to {value}", "threshold": AQI_THRESHOLD}
    return {"error": "Threshold must be between 50 and 500"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
