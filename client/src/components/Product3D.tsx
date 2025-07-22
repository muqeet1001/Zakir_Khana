import { useEffect, useState } from 'react';

interface Product3DProps {
  className?: string;
}

export function Product3D({ className = "" }: Product3DProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full h-64 flex items-center justify-center ${className}`}>
      <div className="relative w-48 h-48 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Rotating background pattern */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center'
          }}
        />
        
        {/* Product mockup text */}
        <div className="relative z-10 text-center text-white">
          <div className="text-4xl font-bold mb-2">Sakht</div>
          <div className="text-2xl font-medium">Launda</div>
          <div className="mt-4 px-4 py-2 bg-white/20 rounded-full text-sm">
            Premium Merch
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-white/50 rounded-full animate-bounce" />
        <div className="absolute bottom-6 right-6 w-3 h-3 bg-accent/70 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-4 w-1 h-1 bg-white/60 rounded-full animate-ping" />
      </div>
    </div>
  );
}