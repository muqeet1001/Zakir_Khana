import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function usePageLoader() {
  const [location] = useLocation();

  useEffect(() => {
    // Show loader
    const overlay = document.getElementById('loader-overlay');
    if (overlay) overlay.style.display = 'flex';

    // Hide loader after a short delay (simulate loading)
    const timeout = setTimeout(() => {
      if (overlay) overlay.style.display = 'none';
    }, 1200); // Adjust as needed

    return () => clearTimeout(timeout);
  }, [location]);
} 