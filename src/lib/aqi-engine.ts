import { useState, useEffect, useRef, useCallback } from 'react'
import { aqiColor, aqiCategory } from './constants'

export interface AQIState {
  aqi: number
  pm25: number
  pm10: number
  co2: number
  voc: number
  category: string
  color: string
  pct: number            // 0–1, capped at aqi/200
  threshold: number
  setThreshold: (v: number) => void
  connected: boolean
  mode: string
  sensorCount: number
}

export function useAQISimulation(): AQIState {
  // Live AQI reference for smooth fluctuation
  const liveAqi = useRef(42)

  // Displayed state
  const [aqi, setAqi] = useState(42)
  const [pm25, setPm25] = useState(42)
  const [pm10, setPm10] = useState(65)
  const [co2, setCo2] = useState(415)
  const [voc, setVoc] = useState(0.18)
  const [category, setCategory] = useState('GOOD')
  const [color, setColor] = useState('#00E676')
  const [pct, setPct] = useState(0.21)
  const [threshold, setThresholdState] = useState(100)
  const [connected, setConnected] = useState(true)
  const [sensorCount, setSensorCount] = useState(0)

  // Debounced threshold setter with API call
  const setThreshold = useCallback((value: number) => {
    setThresholdState(value)

    // Debounce API call
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:8000/threshold/${value}`, {
          method: 'POST',
        })
        if (!response.ok) {
          console.warn('Failed to update threshold on backend')
        }
      } catch (error) {
        console.warn('Backend not available for threshold update')
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    // Main AQI simulation interval (2000ms)
    const aqiInterval = setInterval(() => {
      // Smooth fluctuation with bounds
      liveAqi.current = Math.max(8, Math.min(180,
        liveAqi.current + (Math.random() - 0.48) * 5
      ))

      const v = Math.round(liveAqi.current)
      setAqi(v)
      setPct(Math.min(v / 200, 1))
      setCategory(aqiCategory(v))
      setColor(aqiColor(v))
      setPm25(v)
    }, 2000)

    // Micro-fluctuation for other metrics (3000ms)
    const microInterval = setInterval(() => {
      setPm10(Math.round(58 + Math.random() * 14))
      setCo2(Math.round(408 + Math.random() * 22))
      setVoc(parseFloat((0.14 + Math.random() * 0.09).toFixed(2)))
    }, 3000)

    // Sensor count animation (130ms intervals, 0→12)
    const sensorInterval = setInterval(() => {
      setSensorCount(prev => {
        if (prev >= 12) {
          clearInterval(sensorInterval)
          return 12
        }
        return prev + 1
      })
    }, 130)

    // CRT screen flicker effect (700ms intervals)
    const flickerInterval = setInterval(() => {
      if (Math.random() < 0.012) {
        document.body.style.filter = 'brightness(1.012)'
        setTimeout(() => {
          document.body.style.filter = ''
        }, 40)
      }
    }, 700)

    // Cleanup all intervals
    return () => {
      clearInterval(aqiInterval)
      clearInterval(microInterval)
      clearInterval(sensorInterval)
      clearInterval(flickerInterval)
    }
  }, [])

  return {
    aqi,
    pm25,
    pm10,
    co2,
    voc,
    category,
    color,
    pct,
    threshold,
    setThreshold,
    connected,
    mode: 'SIMULATION',
    sensorCount,
  }
}