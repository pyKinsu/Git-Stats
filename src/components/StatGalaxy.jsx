import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function StatGalaxy({ repos }) {
  return (
    <div className="h-[80vh] rounded-lg border border-white/10 m-4 shadow-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <OrbitControls enableZoom={true} />
        {repos.map((repo, i) => (
          <mesh key={repo.id} position={[Math.sin(i) * 3, Math.cos(i) * 3, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#00bcd4" />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}
