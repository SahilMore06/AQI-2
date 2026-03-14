"use client";

import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import {
    Home,
    LayoutDashboard,
    Settings,
    User,
    Clock,
    Calendar,
    Wifi,
    WifiOff,
} from "lucide-react";

interface NavbarProps {
    connected: boolean;
    mode?: string;
    date?: string;
    time?: string;
}

const navLinks = [
    { path: "/", label: "Home", icon: Home, color: "#60a5fa" },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#a855f7" },
    { path: "/controls", label: "Controls", icon: Settings, color: "#f97316" },
    { path: "/detection", label: "Detection", icon: User, color: "#22c55e" },
    { path: "/history", label: "History", icon: Clock, color: "#eab308" },
];

// Dock-style NavItem with magnification effect
function NavItem({
    path,
    label,
    icon: Icon,
    color,
    isActive,
    mouseX
}: {
    path: string;
    label: string;
    icon: typeof Home;
    color: string;
    isActive: boolean;
    mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
    const ref = useRef<HTMLAnchorElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Scale effect only - no width change to prevent overlap
    const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.15, 1]);
    const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

    // Y offset for "lift" effect
    const ySync = useTransform(distance, [-100, 0, 100], [0, -4, 0]);
    const y = useSpring(ySync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link ref={ref} to={path}>
            <motion.div
                style={{ scale, y }}
                className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                )}
            >
                {/* Active background */}
                {isActive && (
                    <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 rounded-xl"
                        style={{
                            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                            border: `1px solid ${color}40`
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                <Icon
                    className="w-4 h-4 relative z-10"
                    style={{ color: isActive ? color : undefined }}
                />
                <span className="relative z-10">{label}</span>

                {/* Active indicator dot */}
                {isActive && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                )}
            </motion.div>
        </Link>
    );
}

export function Navbar({ connected, mode: _mode, date, time }: NavbarProps) {
    const location = useLocation();
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-center relative">
                    {/* Logo - positioned left */}
                    <Link to="/" className="absolute left-0 flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.span
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(96, 165, 250, 0.5)",
                                        "0 0 20px rgba(168, 85, 247, 0.5)",
                                        "0 0 10px rgba(96, 165, 250, 0.5)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-xl sm:text-2xl"
                            >
                                🌍
                            </motion.span>
                        </motion.div>
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                        >
                            Smart AQI
                        </motion.h1>
                    </Link>

                    {/* Navigation with dock-style magnification */}
                    <motion.nav
                        onMouseMove={(e) => mouseX.set(e.pageX)}
                        onMouseLeave={() => mouseX.set(Infinity)}
                        className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-white/5 border border-white/10"
                    >
                        {navLinks.map((link) => (
                            <NavItem
                                key={link.path}
                                {...link}
                                isActive={location.pathname === link.path}
                                mouseX={mouseX}
                            />
                        ))}
                    </motion.nav>

                    {/* Status - positioned right */}
                    <div className="absolute right-0 flex items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all",
                                connected
                                    ? "bg-green-500/10 border-green-500/30"
                                    : "bg-red-500/10 border-red-500/30"
                            )}
                        >
                            <motion.div
                                animate={connected ? {
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.7, 1]
                                } : {}}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                {connected ? (
                                    <Wifi className="w-3.5 h-3.5 text-green-400" />
                                ) : (
                                    <WifiOff className="w-3.5 h-3.5 text-red-400" />
                                )}
                            </motion.div>
                            <span className={cn(
                                "text-xs font-medium",
                                connected ? "text-green-400" : "text-red-400"
                            )}>
                                {connected ? "Live" : "Offline"}
                            </span>
                        </motion.div>

                        {date && time && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                            >
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <Calendar className="w-3 h-3 text-blue-400" />
                                    {date}
                                </div>
                                <div className="w-px h-3 bg-white/20" />
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Clock className="w-3 h-3 text-purple-400" />
                                    </motion.div>
                                    {time}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <motion.nav
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    className="flex md:hidden items-center justify-between mt-2 px-1"
                >
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        const Icon = link.icon;
                        return (
                            <Link key={link.path} to={link.path}>
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className={cn(
                                        "flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-medium",
                                        isActive ? "text-white" : "text-gray-400"
                                    )}
                                    style={{
                                        background: isActive ? `linear-gradient(135deg, ${link.color}20, transparent)` : undefined,
                                        border: isActive ? `1px solid ${link.color}40` : undefined
                                    }}
                                >
                                    <Icon
                                        className="w-4 h-4"
                                        style={{ color: isActive ? link.color : undefined }}
                                    />
                                    {link.label}
                                </motion.div>
                            </Link>
                        );
                    })}
                </motion.nav>
            </div>
        </motion.header>
    );
}
