"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle, ArrowLeft, Eye, Radar } from "lucide-react";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

interface DetectionPageProps {
    humanDetected: boolean;
}

export default function DetectionPage({ humanDetected }: DetectionPageProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    AI Human Detection
                </h1>
                <p className="text-gray-400 mb-6">Safety system monitoring with interactive 3D visualization</p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/dashboard">
                        <GradientButton>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Dashboard
                        </GradientButton>
                    </Link>
                    <Link to="/controls">
                        <GradientButton variant="variant">
                            <Eye className="w-4 h-4 mr-2" />
                            Controls
                        </GradientButton>
                    </Link>
                </div>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Status Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className={cn(
                        "p-6 rounded-2xl border flex items-center gap-4",
                        humanDetected
                            ? "bg-yellow-500/10 border-yellow-500/30"
                            : "bg-green-500/10 border-green-500/30"
                    )}
                >
                    <motion.div
                        animate={humanDetected ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                        } : {
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={cn(
                            "p-3 rounded-xl",
                            humanDetected ? "bg-yellow-500/20" : "bg-green-500/20"
                        )}
                    >
                        {humanDetected ? (
                            <AlertTriangle className="w-8 h-8 text-yellow-400" />
                        ) : (
                            <Shield className="w-8 h-8 text-green-400" />
                        )}
                    </motion.div>
                    <div>
                        <h2 className={cn(
                            "text-xl font-bold",
                            humanDetected ? "text-yellow-400" : "text-green-400"
                        )}>
                            {humanDetected ? "⚠️ Human Detected in Area" : "✅ Area Clear - Safe Zone"}
                        </h2>
                        <p className="text-gray-400">
                            {humanDetected
                                ? "Water spray system is paused for safety"
                                : "Water spray can operate safely when AQI threshold is exceeded"
                            }
                        </p>
                    </div>
                </motion.div>

                {/* 3D Robot */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-dark rounded-2xl border border-white/10 overflow-hidden"
                >
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className={cn(
                                    "p-2 rounded-xl",
                                    humanDetected ? "bg-yellow-500/20" : "bg-cyan-500/20"
                                )}
                            >
                                <Radar className={cn(
                                    "w-5 h-5",
                                    humanDetected ? "text-yellow-400" : "text-cyan-400"
                                )} />
                            </motion.div>
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                Interactive 3D Watchbot
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className={cn(
                                    "w-2 h-2 rounded-full",
                                    humanDetected ? "bg-yellow-500" : "bg-green-500"
                                )}
                            />
                            <span className="text-xs text-gray-400">
                                {humanDetected ? "Alert Mode" : "Monitoring"}
                            </span>
                        </div>
                    </div>

                    <div className="relative h-[400px] md:h-[500px] bg-gradient-to-b from-zinc-900 to-black">
                        <InteractiveRobotSpline
                            scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                            className="absolute inset-0"
                        />

                        {/* Status overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md",
                                    humanDetected
                                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                                )}
                            >
                                {humanDetected ? "👤 Motion Detected" : "🤖 Monitoring Area"}
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/10 text-gray-300 border border-white/20"
                            >
                                Move cursor to interact
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: "📡", title: "PIR Sensor", desc: "Passive infrared motion detection", color: "cyan" },
                        { icon: "🧠", title: "ML Model", desc: "AI-powered human recognition", color: "purple" },
                        { icon: "🛡️", title: "Safety First", desc: "Automatic spray pause on detection", color: "green" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="glass-dark rounded-xl p-4 border border-white/10"
                        >
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className={`text-${item.color}-400 font-semibold mb-1`}>{item.title}</div>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
