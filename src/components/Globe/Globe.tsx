import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import GlobeMesh from './GlobeMesh'

function Globe() {
  return (
    <Canvas
      camera={{ fov: 40, position: [0, 0, 3.2] }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <GlobeMesh />
    </Canvas>
  )
}

export default Globe