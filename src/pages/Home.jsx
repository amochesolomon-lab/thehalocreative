import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeSlides } from "../data/siteData";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.title = "Home | Sol'o Mon";
  }, []);

  // Cycle background slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      {/* Fullscreen Kenburns Slider */}
      <div className="kenburns-slider-container">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="kenburns-slide"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 0.45, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${homeSlides[currentSlide]})`,
            }}
          />
        </AnimatePresence>
        <div className="overlay-spotlight" />
      </div>

      {/* Floating Center Content Links */}
      <div className="home-links-grid">
        {/* Left Link - About */}
        <motion.div
          className="home-hover-block works-block"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="/about" className="home-hover-link">
            <span className="subtitle">the story behind</span>
            <h2 className="title">SOL'O MON</h2>
          </a>
        </motion.div>

        {/* Right Link - Catalogue */}
        <motion.div
          className="home-hover-block merch-block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="/catalogue" className="home-hover-link">
            <span className="subtitle">projects</span>
            <h2 className="title">See Works</h2>
          </a>
        </motion.div>
      </div>

      {/* Subtle brand caption */}
      <motion.div
        className="home-caption"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <p>Creative • Soulful • Curious</p>
      </motion.div>
    </div>
  );
}
