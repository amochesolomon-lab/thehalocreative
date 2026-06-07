import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ children, className = '', delay = 0, y = 30 }) {
  const elementRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const el = elementRef.current;
    
    gsap.fromTo(el, 
      { 
        opacity: 0, 
        y: y 
      }, 
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, [delay, reducedMotion, y]);

  return (
    <div 
      ref={elementRef} 
      className={className}
      style={reducedMotion ? {} : { opacity: 0 }}
    >
      {children}
    </div>
  );
}
