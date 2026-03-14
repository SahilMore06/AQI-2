"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
    width?: number
    height?: number
    className?: string
    onCountryClick?: (country: string) => void
}

export default function RotatingEarth({
    width = 800,
    height = 600,
    className = "",
    onCountryClick: _onCountryClick
}: RotatingEarthProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        // Set up responsive dimensions
        const containerWidth = Math.min(width, window.innerWidth - 40)
        const containerHeight = Math.min(height, window.innerHeight - 100)
        const radius = Math.min(containerWidth, containerHeight) / 2.5

        const dpr = window.devicePixelRatio || 1
        canvas.width = containerWidth * dpr
        canvas.height = containerHeight * dpr
        canvas.style.width = `${containerWidth}px`
        canvas.style.height = `${containerHeight}px`
        context.scale(dpr, dpr)

        // Create projection and path generator for Canvas
        const projection = d3
            .geoOrthographic()
            .scale(radius)
            .translate([containerWidth / 2, containerHeight / 2])
            .clipAngle(90)

        const path = d3.geoPath().projection(projection).context(context)

        const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
            const [x, y] = point
            let inside = false

            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const [xi, yi] = polygon[i]
                const [xj, yj] = polygon[j]

                if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
                    inside = !inside
                }
            }

            return inside
        }

        const pointInFeature = (point: [number, number], feature: any): boolean => {
            const geometry = feature.geometry

            if (geometry.type === "Polygon") {
                const coordinates = geometry.coordinates
                if (!pointInPolygon(point, coordinates[0])) {
                    return false
                }
                for (let i = 1; i < coordinates.length; i++) {
                    if (pointInPolygon(point, coordinates[i])) {
                        return false
                    }
                }
                return true
            } else if (geometry.type === "MultiPolygon") {
                for (const polygon of geometry.coordinates) {
                    if (pointInPolygon(point, polygon[0])) {
                        let inHole = false
                        for (let i = 1; i < polygon.length; i++) {
                            if (pointInPolygon(point, polygon[i])) {
                                inHole = true
                                break
                            }
                        }
                        if (!inHole) {
                            return true
                        }
                    }
                }
                return false
            }

            return false
        }

        const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
            const dots: [number, number][] = []
            const bounds = d3.geoBounds(feature)
            const [[minLng, minLat], [maxLng, maxLat]] = bounds

            const stepSize = dotSpacing * 0.08

            for (let lng = minLng; lng <= maxLng; lng += stepSize) {
                for (let lat = minLat; lat <= maxLat; lat += stepSize) {
                    const point: [number, number] = [lng, lat]
                    if (pointInFeature(point, feature)) {
                        dots.push(point)
                    }
                }
            }

            return dots
        }

        interface DotData {
            lng: number
            lat: number
            visible: boolean
        }

        const allDots: DotData[] = []
        let landFeatures: any

        const render = () => {
            context.clearRect(0, 0, containerWidth, containerHeight)

            const currentScale = projection.scale()
            const scaleFactor = currentScale / radius

            // Draw ocean (globe background)
            context.beginPath()
            context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
            context.fillStyle = "#0a0a0a"
            context.fill()
            context.strokeStyle = "#60a5fa"
            context.lineWidth = 2 * scaleFactor
            context.stroke()

            if (landFeatures) {
                // Draw graticule
                const graticule = d3.geoGraticule()
                context.beginPath()
                path(graticule())
                context.strokeStyle = "#3b82f6"
                context.lineWidth = 0.5 * scaleFactor
                context.globalAlpha = 0.2
                context.stroke()
                context.globalAlpha = 1

                // Draw land outlines
                context.beginPath()
                landFeatures.features.forEach((feature: any) => {
                    path(feature)
                })
                context.strokeStyle = "#a855f7"
                context.lineWidth = 1.5 * scaleFactor
                context.stroke()

                // Draw halftone dots
                allDots.forEach((dot) => {
                    const projected = projection([dot.lng, dot.lat])
                    if (
                        projected &&
                        projected[0] >= 0 &&
                        projected[0] <= containerWidth &&
                        projected[1] >= 0 &&
                        projected[1] <= containerHeight
                    ) {
                        context.beginPath()
                        context.arc(projected[0], projected[1], 1.5 * scaleFactor, 0, 2 * Math.PI)
                        context.fillStyle = "#c4b5fd"
                        context.fill()
                    }
                })
            }
        }

        const loadWorldData = async () => {
            try {
                setIsLoading(true)

                const response = await fetch(
                    "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
                )
                if (!response.ok) throw new Error("Failed to load land data")

                landFeatures = await response.json()

                landFeatures.features.forEach((feature: any) => {
                    const dots = generateDotsInPolygon(feature, 16)
                    dots.forEach(([lng, lat]) => {
                        allDots.push({ lng, lat, visible: true })
                    })
                })

                render()
                setIsLoading(false)
            } catch (err) {
                setError("Failed to load map data")
                setIsLoading(false)
            }
        }

        // Set up rotation and interaction
        const rotation: [number, number, number] = [0, 0, 0]
        let autoRotate = true
        const rotationSpeed = 0.3

        const rotate = () => {
            if (autoRotate) {
                rotation[0] += rotationSpeed
                projection.rotate(rotation as [number, number] | [number, number, number])
                render()
            }
        }

        const rotationTimer = d3.timer(rotate)

        const handleMouseDown = (event: MouseEvent) => {
            autoRotate = false
            const startX = event.clientX
            const startY = event.clientY
            const startRotation = [...rotation]

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const sensitivity = 0.5
                const dx = moveEvent.clientX - startX
                const dy = moveEvent.clientY - startY

                rotation[0] = startRotation[0] + dx * sensitivity
                rotation[1] = startRotation[1] - dy * sensitivity
                rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

                projection.rotate(rotation as [number, number] | [number, number, number])
                render()
            }

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)

                setTimeout(() => {
                    autoRotate = true
                }, 10)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault()
            const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
            const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
            projection.scale(newRadius)
            render()
        }

        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("wheel", handleWheel)

        loadWorldData()

        return () => {
            rotationTimer.stop()
            canvas.removeEventListener("mousedown", handleMouseDown)
            canvas.removeEventListener("wheel", handleWheel)
        }
    }, [width, height])

    if (error) {
        return (
            <div className={`flex items-center justify-center bg-neutral-900 rounded-2xl p-8 ${className}`}>
                <div className="text-center">
                    <p className="text-red-400 font-semibold mb-2">Error loading Earth visualization</p>
                    <p className="text-gray-500 text-sm">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/80 rounded-2xl z-10">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-400">Loading globe...</p>
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="w-full h-auto rounded-2xl bg-neutral-950 cursor-grab active:cursor-grabbing"
                style={{ maxWidth: "100%", height: "auto" }}
            />
            <div className="absolute bottom-4 left-4 text-xs text-gray-500 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                🌍 Drag to rotate • Scroll to zoom
            </div>
        </div>
    )
}
