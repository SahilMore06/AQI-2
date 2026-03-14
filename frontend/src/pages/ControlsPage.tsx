"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Gauge, Zap } from "lucide-react";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { GradientButton } from "@/components/ui/gradient-button";

interface ControlsPageProps {
    threshold: number;
    onThresholdChange: (value: number) => void;
}

export default function ControlsPage({ threshold, onThresholdChange }: ControlsPageProps) {
    const getThresholdColor = () => {
        if (threshold <= 100) return "#22c55e";
        if (threshold <= 200) return "#eab308";
        return "#ef4444";
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    System Controls
                </h1>
                <p className="text-gray-400 mb-6">Configure thresholds and view architecture</p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/dashboard">
                        <GradientButton>
                            View Dashboard
                        </GradientButton>
                    </Link>
                    <Link to="/detection">
                        <GradientButton variant="variant">
                            Human Detection
                        </GradientButton>
                    </Link>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Threshold Control */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-dark rounded-2xl p-6 border border-white/10"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <motion.div
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="p-2.5 rounded-xl bg-orange-500/20"
                        >
                            <Gauge className="w-6 h-6 text-orange-400" />
                        </motion.div>
                        <div>
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Threshold Control
                            </span>
                            <p className="text-xs text-gray-500">Set AQI trigger level</p>
                        </div>
                    </div>

                    <motion.div
                        className="text-6xl font-bold mb-6 text-center"
                        style={{ color: getThresholdColor() }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {threshold}
                    </motion.div>

                    <input
                        type="range"
                        min="50"
                        max="300"
                        value={threshold}
                        onChange={(e) => onThresholdChange(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />

                    <div className="flex justify-between text-sm text-gray-500 mt-3">
                        <span className="text-green-400">50 (Good)</span>
                        <span className="text-yellow-400">150 (Unhealthy)</span>
                        <span className="text-red-400">300 (Hazardous)</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-white">Auto-Spray Logic</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            When PM2.5 exceeds <span className="font-bold" style={{ color: getThresholdColor() }}>{threshold}</span> and no humans are detected,
                            the water spray activates automatically.
                        </p>
                    </motion.div>
                </motion.div>

                {/* System Architecture */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-dark rounded-2xl p-6 border border-white/10"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-2.5 rounded-xl bg-cyan-500/20"
                        >
                            <Cpu className="w-6 h-6 text-cyan-400" />
                        </motion.div>
                        <div>
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                System Architecture
                            </span>
                            <p className="text-xs text-gray-500">Hardware connections</p>
                        </div>
                    </div>

                    <div className="h-48 flex items-center justify-center">
                        <CpuArchitecture
                            text="AQI"
                            className="w-full h-full"
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                        {[
                            { label: "Sensor", sub: "PM2.5", color: "blue" },
                            { label: "CPU", sub: "Raspberry Pi", color: "purple" },
                            { label: "Output", sub: "Water Spray", color: "green" },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className={`p-2 bg-${item.color}-500/10 rounded-lg border border-${item.color}-500/20`}
                            >
                                <div className={`text-${item.color}-400 font-semibold`}>{item.label}</div>
                                <div className="text-gray-500">{item.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-8"
            >
                <Link to="/history">
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        View Reading History <ArrowRight className="w-4 h-4" />
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    );
}
