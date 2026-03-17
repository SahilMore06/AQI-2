import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import { CITY_COORDS, CITY_COLORS } from '../../lib/constants'

function GlobeMesh() {
  const globeRef = useRef<Group>(null)
  const pointsRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)
  const isDragging = useRef(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInScrollySection, setIsInScrollySection] = useState(false)

  const { size } = useThree()

  // Convert lat/lon to 3D coordinates
  const cityPositions = useMemo(() => {
    return CITY_COORDS.map(([lat, lon]) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)

      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.cos(phi)
      const z = Math.sin(phi) * Math.sin(theta)

      return [x, y, z]
    })
  }, [])

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)

      // Check if we're in the scrolly section
      const scrollySection = document.getElementById('scrolly')
      if (scrollySection) {
        const rect = scrollySection.getBoundingClientRect()
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0
        setIsInScrollySection(isInView)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state, delta) => {
    if (!globeRef.current) return

    // Base rotation speed modified by scroll
    let baseSpeed = 0.0025
    let scaleMultiplier = 1
    let opacity = 0.7

    if (isInScrollySection) {
      // In scrolly section: faster rotation and dynamic effects
      baseSpeed = 0.008 + (scrollProgress * 0.002)
      scaleMultiplier = 0.8 + (Math.sin(state.clock.elapsedTime * 0.5) * 0.1)
      opacity = 0.9
    } else if (scrollProgress > 0.1) {
      // After hero section: slower, more contemplative
      baseSpeed = 0.001 + (scrollProgress * 0.001)
      opacity = 0.5 + (scrollProgress * 0.3)
    }

    if (!isDragging.current) {
      // Auto-rotation based on scroll context
      globeRef.current.rotation.y += baseSpeed

      // Scale animation in scrolly section
      if (isInScrollySection) {
        globeRef.current.scale.setScalar(scaleMultiplier)
      }

      if (ringRef.current) {
        ringRef.current.rotation.y += baseSpeed * 1.2
      }
    }

    // Update point materials opacity based on scroll
    if (pointsRef.current && pointsRef.current.material) {
      (pointsRef.current.material as any).opacity = opacity
    }

    // Pulse effect during scrolly section
    if (isInScrollySection && ringRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.6
      if (ringRef.current.material) {
        (ringRef.current.material as any).opacity = pulse
      }
    }
  })

  const handlePointerDown = (event: any) => {
    isDragging.current = true
    event.target.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: any) => {
    if (isDragging.current && globeRef.current) {
      const deltaX = event.movementX / size.width * 2
      const deltaY = event.movementY / size.height * 2

      globeRef.current.rotation.y += deltaX * 2
      globeRef.current.rotation.x -= deltaY * 2

      // Clamp X rotation
      globeRef.current.rotation.x = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, globeRef.current.rotation.x)
      )
    }
  }

  const handlePointerUp = (event: any) => {
    isDragging.current = false
    event.target.releasePointerCapture(event.pointerId)
  }

  // Calculate city pin sizes based on scroll progress
  const getCityPinSize = (index: number) => {
    const baseSize = 0.042
    if (isInScrollySection) {
      // Make pins more prominent during scrolly section
      const pulse = Math.sin(Date.now() * 0.001 + index) * 0.5 + 1
      return baseSize * pulse
    }
    return baseSize
  }

  return (
    <group ref={globeRef}>
      {/* Globe Points */}
      <points ref={pointsRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <pointsMaterial
          color={0x4D94FF}
          size={isInScrollySection ? 0.028 : 0.022}
          transparent
          opacity={0.7}
        />
      </points>

      {/* Torus Ring */}
      <mesh
        ref={ringRef}
        rotation-x={Math.PI / 2.4}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <torusGeometry args={[1.03, 0.003, 8, 100]} />
        <meshBasicMaterial
          color={isInScrollySection ? 0x00E676 : 0x00FFCC}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Secondary Ring (appears during scrolly) */}
      {isInScrollySection && (
        <mesh rotation-x={Math.PI / 2.8}>
          <torusGeometry args={[1.15, 0.002, 6, 80]} />
          <meshBasicMaterial
            color={0x4D94FF}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* City Sensor Pins */}
      {cityPositions.map((position, index) => (
        <group key={index}>
          {/* Main pin */}
          <mesh position={position as [number, number, number]}>
            <sphereGeometry args={[getCityPinSize(index), 12, 12]} />
            <meshBasicMaterial
              color={CITY_COLORS[index]}
              transparent
              opacity={isInScrollySection ? 1 : 0.8}
            />
          </mesh>

          {/* Glow effect during scrolly section */}
          {isInScrollySection && (
            <mesh position={position as [number, number, number]}>
              <sphereGeometry args={[getCityPinSize(index) * 2, 8, 8]} />
              <meshBasicMaterial
                color={CITY_COLORS[index]}
                transparent
                opacity={0.1}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Invisible interaction sphere */}
      <mesh
        scale={[1.2, 1.2, 1.2]}
        visible={false}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <sphereGeometry />
        <meshBasicMaterial />
      </mesh>

      {/* Data streams (visible during scrolly) */}
      {isInScrollySection && (
        <>
          {cityPositions.slice(0, 3).map((position, index) => (
            <mesh key={`stream-${index}`} position={position as [number, number, number]}>
              <cylinderGeometry args={[0.001, 0.001, 0.5]} />
              <meshBasicMaterial
                color={0x00FFCC}
                transparent
                opacity={Math.sin(Date.now() * 0.003 + index) * 0.3 + 0.2}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}

export default GlobeMesh