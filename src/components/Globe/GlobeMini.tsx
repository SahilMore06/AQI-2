import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import GlobeMesh from './GlobeMesh'

export interface GlobeMiniRef {
  show: () => void
  hide: () => void
}

const GlobeMini = forwardRef<GlobeMiniRef>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    show: () => {
      if (containerRef.current) {
        containerRef.current.classList.add('opacity-100')
        containerRef.current.classList.remove('opacity-0')
      }
    },
    hide: () => {
      if (containerRef.current) {
        containerRef.current.classList.add('opacity-0')
        containerRef.current.classList.remove('opacity-100')
      }
    }
  }))

  return (
    <div
      ref={containerRef}
      className="fixed top-[60px] right-[24px] z-[400] w-[42px] h-[42px] opacity-0 transition-opacity duration-500 glass-dark rounded-lg border border-border"
    >
      <Canvas
        camera={{ fov: 50, position: [0, 0, 3.5] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Stars
          radius={50}
          depth={25}
          count={1000}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />
        <GlobeMesh />
      </Canvas>
    </div>
  )
})

GlobeMini.displayName = 'GlobeMini'

export default GlobeMini