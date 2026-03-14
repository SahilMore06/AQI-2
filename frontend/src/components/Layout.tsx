"use client";

import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";

interface LayoutProps {
    connected: boolean;
    mode?: string;
    date?: string;
    time?: string;
    threshold: number;
}

export function Layout({ connected, mode, date, time, threshold }: LayoutProps) {
    return (
        <div className="dark min-h-screen bg-neutral-950 flex flex-col">
            <Navbar
                connected={connected}
                mode={mode}
                date={date}
                time={time}
            />

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="glass-dark border-t border-white/10 py-4">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500 text-xs">
                        🌍 Smart AQI Control System v2.0 |
                        Phase: {mode || "SIMULATION"} |
                        Threshold: {threshold} |
                        Human Safety: Active
                    </p>
                </div>
            </footer>
        </div>
    );
}
