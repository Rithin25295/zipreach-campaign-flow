
import { useCallback } from 'react';

export const useConfetti = () => {
  const triggerConfetti = useCallback((element?: HTMLElement) => {
    // Create confetti particles
    const colors = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    const particles = 50;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      
      // Position at click location or center of element
      const rect = element?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      
      document.body.appendChild(particle);
      
      // Animate particle
      const angle = (Math.PI * 2 * i) / particles;
      const velocity = 100 + Math.random() * 100;
      const gravity = 300;
      
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity;
      let currentX = x;
      let currentY = y;
      
      const animate = () => {
        currentX += vx * 0.016;
        currentY += vy * 0.016;
        vy += gravity * 0.016;
        
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
        particle.style.opacity = String(Math.max(0, 1 - (currentY - y) / 300));
        
        if (currentY < window.innerHeight + 100) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, []);

  return { triggerConfetti };
};
