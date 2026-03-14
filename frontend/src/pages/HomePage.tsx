"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { GradientButton } from "@/components/ui/gradient-button";

export default function HomePage() {
    const navigate = useNavigate();
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background with Globe */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 z-10" />

                {/* Globe in background */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute"
                >
                    <RotatingEarth
                        width={Math.min(900, window.innerWidth)}
                        height={Math.min(700, window.innerHeight)}
                    />
                </motion.div>
            </div>

            {/* Animated background orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl z-0"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl z-0"
            />

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 text-center px-4"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">AI-Powered Air Quality Monitoring</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Smart AQI
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        System
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-gray-400 text-lg md:text-xl max-w-md mx-auto mb-10"
                >
                    Real-time air quality monitoring with intelligent spray control and human detection
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                >
                    <GradientButton onClick={() => navigate("/dashboard")}>
                        Enter Dashboard
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </GradientButton>
                </motion.div>
            </motion.div>

            {/* Fullscreen Globe Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center"
                    >
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            onClick={() => setIsFullscreen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <RotatingEarth
                                width={Math.min(900, window.innerWidth - 40)}
                                height={Math.min(700, window.innerHeight - 100)}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6"
                        >
                            <GradientButton onClick={() => navigate("/dashboard")}>
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </GradientButton>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
