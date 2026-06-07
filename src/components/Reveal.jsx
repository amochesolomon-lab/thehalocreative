import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, className = '', delay = 0 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`reveal ${className}`.trim()}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
