"use client";

import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Capacitor } from "@capacitor/core";

// Pages
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import ControlsPage from "@/pages/ControlsPage";
import DetectionPage from "@/pages/DetectionPage";
import HistoryPage from "@/pages/HistoryPage";

// Configure API URL - use machine IP for native, localhost for web
const getApiUrl = () => {
    if (Capacitor.isNativePlatform()) {
        // Android emulator uses 10.0.2.2 to reach host machine's localhost
        // For real device, use your computer's local IP (e.g. 192.168.x.x)
        return "http://10.0.2.2:8000";
    }
    return "http://localhost:8000";
};

const API_URL = getApiUrl();

interface AQIData {
    pm25: number | null;
    spray: string;
    human: number;
    mode: string;
    threshold: number;
    category: string;
    color: string;
    time: string;
    date: string;
}

// Animated Routes Component
function AnimatedRoutes({
    data,
    history,
    threshold,
    onThresholdChange,
}: {
    data: AQIData | null;
    history: AQIData[];
    threshold: number;
    onThresholdChange: (value: number) => void;
}) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/dashboard"
                    element={<DashboardPage data={data} threshold={threshold} />}
                />
                <Route
                    path="/controls"
                    element={
                        <ControlsPage
                            threshold={threshold}
                            onThresholdChange={onThresholdChange}
                        />
                    }
                />
                <Route
                    path="/detection"
                    element={<DetectionPage humanDetected={data?.human === 1} />}
                />
                <Route
                    path="/history"
                    element={<HistoryPage history={history} />}
                />
            </Routes>
        </AnimatePresence>
    );
}

// Layout wrapper with navbar
function AppLayout({
    children,
    connected,
    data,
    threshold,
}: {
    children: React.ReactNode;
    connected: boolean;
    data: AQIData | null;
    threshold: number;
}) {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div className="dark min-h-screen bg-neutral-950 flex flex-col safe-area-inset">
            {/* Only show navbar on non-home pages */}
            {!isHome && (
                <Navbar
                    connected={connected}
                    mode={data?.mode}
                    date={data?.date}
                    time={data?.time}
                />
            )}

            <main className="flex-1 overflow-y-auto">{children}</main>

            {/* Footer only on non-home pages */}
            {!isHome && (
                <footer className="glass-dark border-t border-white/10 py-4 pb-safe">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-500 text-xs">
                            🌍 Smart AQI Control System v2.0 |
                            Phase: {data?.mode || "SIMULATION"} |
                            Threshold: {threshold} |
                            Human Safety: Active
                        </p>
                    </div>
                </footer>
            )}
        </div>
    );
}

// Main App Component
export default function App() {
    const [data, setData] = useState<AQIData | null>(null);
    const [history, setHistory] = useState<AQIData[]>([]);
    const [threshold, setThreshold] = useState(100);
    const [connected, setConnected] = useState(false);

    // Fetch AQI data every 2 seconds
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/aqi`);
                setData(response.data);
                setConnected(true);

                // Add new reading to history live
                setHistory((prev) => {
                    // Avoid duplicates
                    if (prev.length > 0 && prev[0].time === response.data.time) return prev;
                    const newHistory = [response.data, ...prev].slice(0, 50);
                    return newHistory;
                });
            } catch (err) {
                setConnected(false);
            }
        };

        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${API_URL}/history`);
                setHistory(response.data);
            } catch (err) {
                console.error("Failed to fetch history:", err);
            }
        };

        fetchHistory();
        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    // Update threshold
    const handleThresholdChange = async (value: number) => {
        setThreshold(value);
        try {
            await axios.post(`${API_URL}/threshold/${value}`);
        } catch (err) {
            console.error("Failed to update threshold:", err);
        }
    };

    return (
        <HashRouter>
            <AppLayout connected={connected} data={data} threshold={threshold}>
                <AnimatedRoutes
                    data={data}
                    history={history}
                    threshold={threshold}
                    onThresholdChange={handleThresholdChange}
                />
            </AppLayout>
        </HashRouter>
    );
}
