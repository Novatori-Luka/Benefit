'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const isHoveringRef = useRef(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const handleMouseEnter = () => { isHoveringRef.current = true; };
    const handleMouseLeave = () => { isHoveringRef.current = false; };

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Ring */}
      <motion.div
        className="custom-cursor w-6 h-6 rounded-full border border-white mix-blend-difference pointer-events-none"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      {/* Dot */}
      <motion.div
        className="custom-cursor w-1.5 h-1.5 rounded-full bg-white mix-blend-difference pointer-events-none"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
