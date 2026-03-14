'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { motion } from 'framer-motion';
import { Radar } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
    scene: string;
    className?: string;
    onLoad?: () => void;
}

// Lightweight fallback for Android/mobile where Spline crashes
function MobileFallback({ className }: { className?: string }) {
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black ${className}`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="mb-6"
            >
                <div className="relative w-32 h-32">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Radar className="w-16 h-16 text-cyan-400" />
                    </div>
                    {/* Scanning rings */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                            className="absolute inset-0 rounded-full border border-cyan-400/40"
                        />
                    ))}
                </div>
            </motion.div>
            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-cyan-400 text-sm font-medium"
            >
                Scanning Area...
            </motion.p>
            <p className="text-gray-500 text-xs mt-2">AI Detection Active</p>
        </div>
    );
}

export function InteractiveRobotSpline({ scene, className, onLoad }: InteractiveRobotSplineProps) {
    const [isNative, setIsNative] = useState(false);

    useEffect(() => {
        setIsNative(Capacitor.isNativePlatform());
    }, []);

    // Use lightweight fallback on native platforms (Spline 3D crashes Android WebView)
    if (isNative) {
        return <MobileFallback className={className} />;
    }

    return (
        <Suspense
            fallback={
                <div className={`w-full h-full flex items-center justify-center bg-gray-900/50 text-white ${className}`}>
                    <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
                    </svg>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
                onLoad={onLoad}
            />
        </Suspense>
    );
}
