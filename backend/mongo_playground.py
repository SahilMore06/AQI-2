
import pymongo
from datetime import datetime
import random
import time

# ==========================================
# 🍃 Smart AQI - MongoDB Playground
# ==========================================
# This script demonstrates how to interact with MongoDB
# for the AQI project. It connects to a local MongoDB
# instance, creates a database, inserts data, and queries it.

# 1. Connect to MongoDB
# ---------------------
# Ensure MongoDB is running locally on port 27017
# Download: https://www.mongodb.com/try/download/community
try:
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB!")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    print("Please ensure MongoDB is running.")
    exit()

# 2. Select Database and Collection
# ---------------------------------
db = client["aqi_system"]
collection = db["history"]

# 3. Simulate and Insert Data
# ---------------------------
print("\n📝 Inserting simulation data...")

modes = ["SIMULATION", "PIR", "ML"]
spray_states = ["ON", "OFF"]

# Create a sample reading
reading = {
    "pm25": random.randint(30, 180),
    "human": random.choice([0, 0, 0, 1]),  # 25% chance of human
    "mode": random.choice(modes),
    "threshold": 100,
    "timestamp": datetime.now()
}

# Determine spray logic (AQI > 100 AND No Human)
if reading["pm25"] > reading["threshold"] and reading["human"] == 0:
    reading["spray"] = "ON"
else:
    reading["spray"] = "OFF"

# Insert into MongoDB
result = collection.insert_one(reading)
print(f"   Ref ID: {result.inserted_id}")
print(f"   Data: {reading}")

# 4. Query Data
# -------------
print("\n📊 Fetching last 5 readings:")
# Sort by timestamp descending (-1) and limit to 5
cursor = collection.find().sort("timestamp", -1).limit(5)

for doc in cursor:
    # Format timestamp for display
    ts = doc["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
    print(f"   [{ts}] PM2.5: {doc['pm25']} | Human: {doc['human']} | Spray: {doc['spray']}")

# 5. Aggregation Example (Optional)
# ---------------------------------
print("\n📈 Aggregation Stats:")
pipeline = [
    {"$group": {
        "_id": None,
        "avg_pm25": {"$avg": "$pm25"},
        "total_readings": {"$sum": 1},
        "spray_activations": {
            "$sum": {"$cond": [{"$eq": ["$spray", "ON"]}, 1, 0]}
        }
    }}
]

stats = list(collection.aggregate(pipeline))
if stats:
    s = stats[0]
    print(f"   Total Readings: {s['total_readings']}")
    print(f"   Avg PM2.5: {s['avg_pm25']:.1f}")
    print(f"   Spray Activations: {s['spray_activations']}")

print("\n✅ Playground execution complete.")
