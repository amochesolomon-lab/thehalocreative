import { motion, useReducedMotion } from 'framer-motion';

export default function Lightbox({ project, onClose }) {
  const reducedMotion = useReducedMotion();

  if (!project) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={project.title}>
      <button type="button" className="lightbox-backdrop" aria-label="Close preview" onClick={onClose} />
      <motion.div
        className="lightbox-panel"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.98, y: 18 }}
        animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <button type="button" className="lightbox-close" onClick={onClose}>
          ×
        </button>
        <img src={project.image} alt={project.title} />
        <div className="lightbox-caption">
          <span>{project.category}</span>
          <strong>{project.title}</strong>
        </div>
      </motion.div>
    </div>
  );
}
