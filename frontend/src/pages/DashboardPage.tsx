"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GradientButton } from "@/components/ui/gradient-button";
import { Wind, Droplets, User, Cpu, Zap, ArrowRight, RotateCcw, Radar } from "lucide-react";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { cn } from "@/lib/utils";
import { useRef, useState, useCallback, useEffect } from "react";

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

function StatusCard({
    icon: Icon,
    label,
    value,
    subtext,
    color,
    delay = 0,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    subtext?: string;
    color?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={cn(
                "glass-dark rounded-2xl p-3 sm:p-4 border border-white/10 overflow-hidden min-w-0",
                "hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            )}
        >
            <div className="flex items-center gap-2 mb-2">
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl flex-shrink-0"
                    style={{ backgroundColor: color ? `${color}20` : "rgba(59, 130, 246, 0.2)" }}
                >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: color || "#60a5fa" }} />
                </motion.div>
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-tight truncate">
                    {label}
                </span>
            </div>
            <motion.div
                className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 truncate"
                style={{ color }}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {value}
            </motion.div>
            {subtext && <p className="text-[10px] sm:text-xs text-gray-500 truncate">{subtext}</p>}
        </motion.div>
    );
}

// Pinch-to-zoom hook
function usePinchZoom(contentRef: React.RefObject<HTMLDivElement | null>) {
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const initialDistance = useRef(0);
    const initialScale = useRef(1);
    const lastTouchCenter = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const lastPanPoint = useRef({ x: 0, y: 0 });

    const getDistance = (touches: TouchList) => {
        return Math.hypot(
            touches[0].clientX - touches[1].clientX,
            touches[0].clientY - touches[1].clientY
        );
    };

    const getCenter = (touches: TouchList) => ({
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2,
    });

    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialDistance.current = getDistance(e.touches);
            initialScale.current = scale;
            lastTouchCenter.current = getCenter(e.touches);
        } else if (e.touches.length === 1 && scale > 1) {
            isDragging.current = true;
            lastPanPoint.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, [scale]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = getDistance(e.touches);
            const ratio = currentDistance / initialDistance.current;
            const newScale = Math.min(Math.max(initialScale.current * ratio, 0.5), 3);
            setScale(newScale);

            const center = getCenter(e.touches);
            const dx = center.x - lastTouchCenter.current.x;
            const dy = center.y - lastTouchCenter.current.y;
            setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            lastTouchCenter.current = center;
        } else if (e.touches.length === 1 && isDragging.current && scale > 1) {
            e.preventDefault();
            const dx = e.touches[0].clientX - lastPanPoint.current.x;
            const dy = e.touches[0].clientY - lastPanPoint.current.y;
            setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            lastPanPoint.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, [scale]);

    const handleTouchEnd = useCallback(() => {
        isDragging.current = false;
        // Snap back if zoomed out too much
        if (scale < 1) {
            setScale(1);
            setTranslate({ x: 0, y: 0 });
        }
    }, [scale]);

    const resetZoom = useCallback(() => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }, []);

    const zoomIn = useCallback(() => {
        setScale(prev => Math.min(prev + 0.3, 3));
    }, []);

    const zoomOut = useCallback(() => {
        const newScale = Math.max(scale - 0.3, 0.5);
        setScale(newScale);
        if (newScale <= 1) setTranslate({ x: 0, y: 0 });
    }, [scale]);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        el.addEventListener('touchstart', handleTouchStart, { passive: false });
        el.addEventListener('touchmove', handleTouchMove, { passive: false });
        el.addEventListener('touchend', handleTouchEnd);

        return () => {
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('touchmove', handleTouchMove);
            el.removeEventListener('touchend', handleTouchEnd);
        };
    }, [contentRef, handleTouchStart, handleTouchMove, handleTouchEnd]);

    return { scale, translate, resetZoom, zoomIn, zoomOut };
}

// Page transition variants
const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.85,
        filter: "blur(10px)",
    },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.08,
        },
    },
};

const childVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function DashboardPage({ data, threshold }: { data: AQIData | null; threshold: number }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const { scale, translate, resetZoom } = usePinchZoom(contentRef);

    if (!data) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center py-20"
            >
                <div className="text-center">
                    <motion.div
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-gray-400">Connecting to AQI System...</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            className="relative w-full min-h-full"
        >
            {/* Zoom controls floating button */}
            {scale !== 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-20 right-3 z-50 flex flex-col gap-2"
                >
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={resetZoom}
                        className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            )}

            {/* Zoom level indicator */}
            {scale !== 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed top-20 right-3 z-50 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md"
                >
                    <span className="text-[10px] text-gray-300 font-medium">{Math.round(scale * 100)}%</span>
                </motion.div>
            )}

            {/* Zoomable content */}
            <div
                ref={contentRef}
                className="touch-none"
                style={{
                    transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                    transformOrigin: 'center top',
                    transition: scale === 1 ? 'transform 0.3s ease' : 'none',
                }}
            >
                <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
                    <motion.div
                        variants={childVariants}
                        className="text-center mb-4 sm:mb-6"
                    >
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">
                            Real-time AQI Monitoring
                        </h1>
                        <p className="text-gray-400 text-sm mb-4">Live air quality data from sensors</p>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to="/controls">
                                <GradientButton>
                                    Adjust Threshold
                                </GradientButton>
                            </Link>
                            <Link to="/detection">
                                <GradientButton variant="variant">
                                    View Detection
                                </GradientButton>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div variants={childVariants} className="space-y-4 sm:space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                            <StatusCard
                                icon={Wind}
                                label="PM2.5"
                                value={data.pm25 ?? "--"}
                                subtext={data.category}
                                color={data.color}
                                delay={0.1}
                            />
                            <StatusCard
                                icon={Droplets}
                                label="Spray"
                                value={data.spray}
                                subtext={data.spray === "ON" ? "Spray active" : "System idle"}
                                color={data.spray === "ON" ? "#22c55e" : "#ef4444"}
                                delay={0.2}
                            />
                            <StatusCard
                                icon={User}
                                label="Detection"
                                value={data.human === 1 ? "Detected" : "Safe"}
                                subtext={data.human === 1 ? "Spray paused" : "No humans"}
                                color={data.human === 1 ? "#eab308" : "#22c55e"}
                                delay={0.3}
                            />
                            <StatusCard
                                icon={Cpu}
                                label="Mode"
                                value={data.mode}
                                subtext={`Threshold: ${data.threshold}`}
                                color="#a855f7"
                                delay={0.4}
                            />
                        </div>

                        {/* Detection Robot */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.45, type: "spring" }}
                            className="glass-dark rounded-2xl border border-white/10 overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-3 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className={cn(
                                            "p-1.5 rounded-lg",
                                            data.human === 1 ? "bg-yellow-500/20" : "bg-cyan-500/20"
                                        )}
                                    >
                                        <Radar className={cn(
                                            "w-4 h-4",
                                            data.human === 1 ? "text-yellow-400" : "text-cyan-400"
                                        )} />
                                    </motion.div>
                                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        AI Watchbot
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className={cn(
                                            "w-2 h-2 rounded-full",
                                            data.human === 1 ? "bg-yellow-500" : "bg-green-500"
                                        )}
                                    />
                                    <span className="text-[10px] text-gray-400">
                                        {data.human === 1 ? "Alert" : "Monitoring"}
                                    </span>
                                </div>
                            </div>

                            <div className="relative h-[250px] sm:h-[300px] bg-gradient-to-b from-zinc-900 to-black">
                                <InteractiveRobotSpline
                                    scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                                    className="absolute inset-0"
                                />

                                {/* Status overlay */}
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md",
                                            data.human === 1
                                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                : "bg-green-500/20 text-green-400 border border-green-500/30"
                                        )}
                                    >
                                        {data.human === 1 ? "👤 Human Detected" : "🤖 Area Clear"}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* System Logic */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="glass-dark rounded-2xl p-3 sm:p-4 border border-white/10"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="p-2 rounded-xl bg-purple-500/20"
                                >
                                    <Zap className="w-4 h-4 text-purple-400" />
                                </motion.div>
                                <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    System Logic
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={cn(
                                        "px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border transition-all font-medium",
                                        data.pm25 && data.pm25 > threshold
                                            ? "bg-green-500/20 border-green-500/40 text-green-400"
                                            : "bg-gray-500/20 border-gray-500/40 text-gray-400"
                                    )}>
                                    AQI &gt; {threshold} = {data.pm25 && data.pm25 > threshold ? "✅" : "❌"}
                                </motion.div>

                                <span className="text-gray-500 font-bold text-xs">AND</span>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={cn(
                                        "px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border transition-all font-medium",
                                        data.human === 0
                                            ? "bg-green-500/20 border-green-500/40 text-green-400"
                                            : "bg-red-500/20 border-red-500/40 text-red-400"
                                    )}>
                                    No Human = {data.human === 0 ? "✅" : "❌"}
                                </motion.div>

                                <span className="text-gray-500 font-bold text-xs">=</span>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    animate={data.spray === "ON" ? { boxShadow: ["0 0 15px rgba(34, 197, 94, 0.3)", "0 0 30px rgba(34, 197, 94, 0.5)", "0 0 15px rgba(34, 197, 94, 0.3)"] } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className={cn(
                                        "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border font-bold transition-all",
                                        data.spray === "ON"
                                            ? "bg-green-500/20 border-green-500/40 text-green-400"
                                            : "bg-red-500/20 border-red-500/40 text-red-400"
                                    )}>
                                    SPRAY {data.spray}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-center pb-4"
                        >
                            <Link to="/history">
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    View History <ArrowRight className="w-4 h-4" />
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
