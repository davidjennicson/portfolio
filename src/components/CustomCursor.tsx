import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for the cursor
  const cursorX = useSpring(position.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(position.y, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [data-hover="true"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', () => setIsVisible(false));
    window.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Update springs when position changes
  useEffect(() => {
    cursorX.set(position.x);
    cursorY.set(position.y);
  }, [position, cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full blend-difference bg-white flex items-center justify-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        width: isHovering ? 80 : 20,
        height: isHovering ? 80 : 20,
      }}
      transition={{ type: 'tween', ease: 'circOut', duration: 0.3 }}
    >
      <motion.span 
        className="text-black font-sans text-[10px] uppercase font-bold tracking-widest text-center leading-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
