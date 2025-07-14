import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';

function RepoSphere({ position, size, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function GalaxyScene({ repos }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={2000} factor={4} />
      {repos.map((repo, i) => {
        const angle = (i / repos.length) * 2 * Math.PI;
        const radius = 3 + (i % 5);
        const x = radius * Math.cos(angle);
        const y = (i % 3) - 1.5;
        const z = radius * Math.sin(angle);
        return (
          <RepoSphere
            key={repo.id}
            position={[x, y, z]}
            size={0.3 + Math.log2(repo.stargazers_count + 1) * 0.1}
            color={`hsl(${(i * 30) % 360}, 100%, 70%)`}
          />
        );
      })}
      <OrbitControls enableZoom={true} />
    </>
  );
}

export default function StatGalaxy({ repos }) {
  return (
    <div className="h-[500px] rounded-xl overflow-hidden border border-border shadow bg-card mb-6">
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <GalaxyScene repos={repos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
