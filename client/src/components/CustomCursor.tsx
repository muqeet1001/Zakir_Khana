import { useState, useEffect } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('interactive-cursor') || 
          target.closest('.interactive-cursor')) {
        setIsActive(true);
        setIsExpanded(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('interactive-cursor') || 
          target.closest('.interactive-cursor')) {
        setIsExpanded(false);
        setTimeout(() => setIsActive(false), 150);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-cursor');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      className={`custom-cursor ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
      }}
    />
  );
}