import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './CustomCursor.css';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });
  const [label, setLabel] = useState('');
  const [variant, setVariant] = useState('default');
  const [coarse] = useState(() => window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setVariant(target.dataset.cursor || 'view');
        setLabel(target.dataset.cursorLabel || '');
      } else {
        setVariant('default');
        setLabel('');
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  if (coarse) return null;

  return (
    <motion.div
      className={`cursor cursor--${variant}`}
      style={{ translateX: springX, translateY: springY }}
    >
      <span className="cursor__dot" />
      {label && <span className="cursor__label">{label}</span>}
    </motion.div>
  );
}
