import { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ThreeBackgroundProps {
  children?: React.ReactNode;
  particleCount?: number;
}

export function ThreeBackground({ children, particleCount = 50 }: ThreeBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    const colors = ['#FF6B35', '#F7931E', '#ffffff'];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [particleCount]);

  return (
    <div className="canvas-container relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black animate-pulse"></div>
      
      {/* CSS Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animationDelay: `${index * 0.1}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-primary rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-accent rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-4 h-12 bg-primary opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {children}
    </div>
  );
}
