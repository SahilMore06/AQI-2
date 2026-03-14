"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, BarChart3, ArrowLeft, RefreshCw } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

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

interface HistoryPageProps {
    history: AQIData[];
}

export default function HistoryPage({ history }: HistoryPageProps) {
    // Calculate stats
    const avgPm25 = history.length > 0
        ? Math.round(history.reduce((sum, h) => sum + (h.pm25 || 0), 0) / history.length)
        : 0;
    const sprayOnCount = history.filter(h => h.spray === "ON").length;
    const humanDetections = history.filter(h => h.human === 1).length;

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Reading History
                </h1>
                <p className="text-gray-400 mb-6">Recent sensor readings and system activity</p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/dashboard">
                        <GradientButton>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Dashboard
                        </GradientButton>
                    </Link>
                    <Link to="/controls">
                        <GradientButton variant="variant">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Controls
                        </GradientButton>
                    </Link>
                </div>
            </motion.div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                {[
                    { icon: TrendingUp, value: avgPm25, label: "Avg PM2.5", color: "blue" },
                    { icon: BarChart3, value: sprayOnCount, label: "Spray Events", color: "green" },
                    { icon: Clock, value: humanDetections, label: "Human Detections", color: "yellow" },
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="glass-dark rounded-xl p-4 border border-white/10 text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            <item.icon className={`w-6 h-6 text-${item.color}-400 mx-auto mb-2`} />
                        </motion.div>
                        <motion.div
                            className="text-2xl font-bold text-white"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {item.value}
                        </motion.div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* History Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-dark rounded-2xl border border-white/10 overflow-hidden max-w-4xl mx-auto"
            >
                <div className="flex items-center gap-3 p-5 border-b border-white/10">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="p-2.5 rounded-xl bg-indigo-500/20"
                    >
                        <Clock className="w-5 h-5 text-indigo-400" />
                    </motion.div>
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Recent Readings ({history.length})
                    </span>
                </div>

                {history.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-12 text-center"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        </motion.div>
                        <p className="text-gray-500">No readings yet. Data will appear here as the system runs.</p>
                    </motion.div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {/* Header */}
                        <div className="grid grid-cols-5 gap-4 px-5 py-3 bg-white/5 text-xs font-semibold text-gray-400 uppercase">
                            <div>Time</div>
                            <div>PM2.5</div>
                            <div>Category</div>
                            <div>Spray</div>
                            <div>Human</div>
                        </div>

                        {/* Rows */}
                        {history.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * index }}
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="grid grid-cols-5 gap-4 px-5 py-4 transition-colors"
                            >
                                <div className="text-gray-400 text-sm">{item.time}</div>
                                <motion.div
                                    className="font-semibold"
                                    style={{ color: item.color }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {item.pm25}
                                </motion.div>
                                <div className="text-sm" style={{ color: item.color }}>
                                    {item.category}
                                </div>
                                <div className={cn(
                                    "font-semibold text-sm",
                                    item.spray === "ON" ? "text-green-400" : "text-red-400"
                                )}>
                                    {item.spray}
                                </div>
                                <div className={cn(
                                    "text-sm",
                                    item.human === 1 ? "text-yellow-400" : "text-green-400"
                                )}>
                                    {item.human === 1 ? "👤 Yes" : "✅ No"}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
