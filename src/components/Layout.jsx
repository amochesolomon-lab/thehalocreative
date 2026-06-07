import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import AudioPlayer from './AudioPlayer';

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrolled(scrollY > 24);
      setShowTop(scrollY > 440);
      setProgress(Math.min(1, Math.max(0, scrollY / height)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.add('page-ready');
    return () => document.documentElement.classList.remove('page-ready');
  }, []);

  return (
    <div className={`app-shell ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-bar" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      
      {/* Navigation Header */}
      <Nav />
      
      {/* Page Content with Router Outlets and Page Transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          className="site-main"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.99, y: 8 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 1.01, y: -8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Footer Content */}
      <Footer />
      
      {/* Back to Top Trigger */}
      <button
        className={`back-to-top ${showTop ? 'visible' : ''}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* Ambient Audio Player */}
      <AudioPlayer />
    </div>
  );
}
