import { useState, useEffect } from 'react';

export function Product3D() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + (isHovered ? 2 : 1));
    }, 50);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="product-3d rounded-2xl cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary via-accent to-secondary opacity-80 rounded-2xl"></div>
      
      {/* CSS 3D Product Representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-32 h-32 transition-all duration-300 ease-in-out preserve-3d"
          style={{
            transform: `rotateX(${isHovered ? 15 : 0}deg) rotateY(${rotation}deg) rotateZ(${isHovered ? 5 : 0}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg shadow-2xl border-2 border-white/20"
            style={{ transform: 'translateZ(16px)' }}
          >
            <div className="absolute inset-4 border border-white/30 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">ZK</span>
            </div>
          </div>
          
          {/* Back Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-lg shadow-2xl border-2 border-white/20"
            style={{ transform: 'translateZ(-16px) rotateY(180deg)' }}
          >
            <div className="absolute inset-4 border border-white/30 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">SAKHT</span>
            </div>
          </div>
          
          {/* Top Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg shadow-xl border-2 border-white/20"
            style={{ 
              transform: 'rotateX(90deg) translateZ(16px)',
              height: '32px',
              top: '0'
            }}
          />
          
          {/* Bottom Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-lg shadow-xl border-2 border-white/20"
            style={{ 
              transform: 'rotateX(-90deg) translateZ(16px)',
              height: '32px',
              bottom: '0'
            }}
          />
          
          {/* Left Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-primary to-accent rounded-lg shadow-xl border-2 border-white/20"
            style={{ 
              transform: 'rotateY(-90deg) translateZ(16px)',
              width: '32px',
              left: '0'
            }}
          />
          
          {/* Right Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-accent to-primary rounded-lg shadow-xl border-2 border-white/20"
            style={{ 
              transform: 'rotateY(90deg) translateZ(16px)',
              width: '32px',
              right: '0'
            }}
          />
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-4 h-4 bg-primary rounded-full animate-bounce opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-3 h-3 bg-accent rounded-full animate-pulse opacity-60"></div>
      
      <div className="absolute bottom-4 left-4 text-white text-sm opacity-75">
        Hover to interact • Auto-rotating
      </div>
    </div>
  );
}
