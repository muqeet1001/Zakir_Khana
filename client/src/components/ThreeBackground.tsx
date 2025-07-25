import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import zakirHero from '../../../attached_assets/imgi_21_wp8181852_1753118680314.png';
import { Html } from '@react-three/drei';
import { useLocation } from 'wouter';

const QUOTES = [
  'Sakht launda hun main',
  'Delivery boy nahi hun main',
  'A little laughter makes life lighter',
  'Mic drop moment!',
  'Bas dil se soft',
];

function OrbitingMic({ angle, radius, speed, mouse }: { angle: number; radius: number; speed: number; mouse: { x: number; y: number } }) {
  const mesh = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime() * speed;
      const a = angle + t;
      mesh.current.position.x = Math.cos(a) * radius + mouse.x * 0.3;
      mesh.current.position.y = 0.7 + Math.sin(a) * 0.5 + mouse.y * 0.1;
      mesh.current.position.z = Math.sin(a) * radius * 0.7;
      mesh.current.rotation.y = a + Math.PI / 2;
    }
  });
  return (
    <group ref={mesh}>
      {/* Mic body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 16]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Mic head */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function ZakirPlane({ mouse }: { mouse: { x: number; y: number } }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useMemo(() => new THREE.TextureLoader().load(zakirHero), []);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.x = -mouse.x * 0.5;
      mesh.current.position.y = Math.sin(clock.getElapsedTime() * 1.2) * 0.13 - mouse.y * 0.2;
      mesh.current.rotation.y = mouse.x * 0.13;
      mesh.current.rotation.x = mouse.y * 0.09;
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.7) * 0.03;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0.7, 0]} castShadow>
      <planeGeometry args={[1.7, 2.3]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

function QuoteBubble({ text, y, fade }: { text: string; y: number; fade: number }) {
  return (
    <group position={[0, y, 0.7]}>
      <mesh>
        <planeGeometry args={[1.6, 0.5]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.7 * fade} />
      </mesh>
      <Html center style={{ opacity: fade, fontSize: '1.1rem', color: '#2C2C2C', fontWeight: 700, pointerEvents: 'none', textAlign: 'center', width: '100%' }}>
        {text}
      </Html>
    </group>
  );
}

function FloatingQuotes() {
  // Animate quote bubbles upward and fade out
  const [bubbles, setBubbles] = useState<{ text: string; start: number }[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (bubbles.length === 0 || t - bubbles[bubbles.length - 1].start > 5) {
      setBubbles((prev) => [...prev.slice(-2), { text: QUOTES[Math.floor(Math.random() * QUOTES.length)], start: t }]);
    }
  });
  return (
    <>
      {bubbles.map((b, i) => {
        const t = (performance.now() / 1000) - b.start;
        const y = 1.7 + t * 0.7;
        const fade = Math.max(0, 1 - t / 3);
        if (fade <= 0) return null;
        return <QuoteBubble key={b.start} text={b.text} y={y} fade={fade} />;
      })}
    </>
  );
}

function Spotlights({ mouse }: { mouse: { x: number; y: number } }) {
  // Two animated spotlights
  const left = useRef<THREE.SpotLight>(null!);
  const right = useRef<THREE.SpotLight>(null!);
  useFrame(() => {
    if (left.current && right.current) {
      left.current.target.position.x = -0.7 + mouse.x * 0.5;
      left.current.target.position.y = 0.7 - mouse.y * 0.2;
      right.current.target.position.x = 0.7 + mouse.x * 0.5;
      right.current.target.position.y = 0.7 - mouse.y * 0.2;
      left.current.target.updateMatrixWorld();
      right.current.target.updateMatrixWorld();
    }
  });
  return (
    <>
      <spotLight
        ref={left}
        position={[-2.2, 3.5, 2.5]}
        angle={0.45}
        penumbra={0.7}
        intensity={1.2}
        color="#FFD700"
        castShadow
      />
      <spotLight
        ref={right}
        position={[2.2, 3.5, 2.5]}
        angle={0.45}
        penumbra={0.7}
        intensity={1.2}
        color="#FF6B35"
        castShadow
      />
    </>
  );
}

function GoldenParticles() {
  // Simple floating golden sparkles
  const mesh = useRef<THREE.Points>(null!);
  const count = 48;
  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const y = -0.7 + Math.random() * 2.7;
      positions.set([
        Math.cos(theta) * r,
        y,
        Math.sin(theta) * r,
      ], i * 3);
    }
    return { positions };
  }, []);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.1;
    }
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.18} color="#FFD700" opacity={0.18} transparent depthWrite={false} />
    </points>
  );
}

export function ThreeHeroStage({ children }: { children?: React.ReactNode }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [, setLocation] = useLocation();

  const navigateToShows = () => {
    // playInteractionSound(); // Assuming playInteractionSound is defined elsewhere
    setLocation('/shows');
  };

  const navigateToStore = () => {
    // playInteractionSound(); // Assuming playInteractionSound is defined elsewhere
    setLocation('/shop');
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 1.2, 7], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        shadows
        style={{ width: '100%', height: '100%' }}
        onPointerMove={e => {
          setMouse({
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
          });
        }}
      >
        <color attach="background" args={["#1a1a2e"]} />
        <ambientLight intensity={0.5} />
        <SceneGroup mouse={mouse} />
      </Canvas>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

function SceneGroup({ mouse }: { mouse: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.07) * 0.08;
    }
  });
  return (
    <group ref={group}>
      <GoldenParticles />
      <Spotlights mouse={mouse} />
      <ZakirPlane mouse={mouse} />
      <OrbitingMic angle={0} radius={2.2} speed={0.63} mouse={mouse} />
      <OrbitingMic angle={Math.PI * 2 / 3} radius={2.2} speed={0.63} mouse={mouse} />
      <OrbitingMic angle={Math.PI * 4 / 3} radius={2.2} speed={0.63} mouse={mouse} />
      <FloatingQuotes />
    </group>
  );
}
