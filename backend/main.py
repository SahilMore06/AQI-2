# AURA AQI Monitor - Backend (Simulation Mode)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random
import os
import sqlite3

DB_NAME = "aqi.db"
MODE = os.getenv("MODE", "SIMULATION")


def init_db():
    """Initialize database table"""
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS readings
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  pm25 INTEGER,
                  mode TEXT,
                  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()


init_db()

app = FastAPI(title="AURA AQI Monitor", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _get_category(pm25):
    """Return (category, hex_color) for a PM2.5 value."""
    if pm25 is None:
        return "Unknown", "#808080"
    elif pm25 <= 50:
        return "Good", "#00e400"
    elif pm25 <= 100:
        return "Moderate", "#ffff00"
    elif pm25 <= 150:
        return "Unhealthy for Sensitive", "#ff7e00"
    elif pm25 <= 200:
        return "Unhealthy", "#ff0000"
    elif pm25 <= 300:
        return "Very Unhealthy", "#8f3f97"
    else:
        return "Hazardous", "#7e0023"


@app.get("/")
def root():
    return {"message": "🌍 AURA AQI Monitor API", "version": "1.0.0", "mode": MODE}


@app.get("/aqi")
def get_data():
    """Return current AQI reading."""
    pm25 = random.randint(20, 180)
    category, color = _get_category(pm25)

    try:
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute("INSERT INTO readings (pm25, mode) VALUES (?, ?)", (pm25, MODE))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"DB Error: {e}")

    return {
        "pm25": pm25,
        "mode": MODE,
        "category": category,
        "color": color,
        "time": datetime.now().strftime("%H:%M:%S"),
        "date": datetime.now().strftime("%Y-%m-%d"),
    }


@app.get("/history")
def get_history():
    """Return last 50 readings."""
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM readings ORDER BY id DESC LIMIT 50")
    rows = c.fetchall()
    conn.close()

    history = []
    for row in rows:
        pm25 = row["pm25"]
        category, color = _get_category(pm25)
        history.append({
            "pm25": pm25,
            "mode": row["mode"],
            "category": category,
            "color": color,
            "time": datetime.strptime(row["timestamp"], "%Y-%m-%d %H:%M:%S").strftime("%H:%M:%S")
                    if row["timestamp"] else "",
            "date": datetime.strptime(row["timestamp"], "%Y-%m-%d %H:%M:%S").strftime("%Y-%m-%d")
                    if row["timestamp"] else "",
        })
    return history


@app.get("/config")
def get_config():
    """Return system configuration."""
    return {"mode": MODE}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
