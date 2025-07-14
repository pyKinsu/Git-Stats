import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export default function StatGalaxy({ repos }) {
  return (
    <div className="h-[80vh] mx-auto max-w-5xl rounded-lg border border-white/10 m-4 shadow-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <OrbitControls enableZoom={true} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        {repos.map((repo, i) => (
          <mesh
            key={repo.id}
            position={[Math.sin(i) * 3, Math.cos(i) * 3, (i % 2) * 2 - 1]}
          >
            <sphereGeometry args={[0.3 + (repo.stargazers_count / 50), 32, 32]} />
            <meshStandardMaterial color="#00bcd4" emissive="#00bcd4" emissiveIntensity={0.4} />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}
