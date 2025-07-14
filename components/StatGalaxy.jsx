import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function StatGalaxy({ repos }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {repos.map((repo, i) => (
        <mesh key={repo.id} position={[Math.sin(i) * 3, Math.cos(i) * 3, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
      ))}
    </Canvas>
  );
}
