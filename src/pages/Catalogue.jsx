import { useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

const categories = [
  {
    title: "Event Designs",
    image: "/assets/Church/FESTIVAL OF WORSHIP full.webp",
    link: "https://solomon83.pixieset.com/eventflyers/",
  },
  {
    title: "Birthday Designs",
    image: "/assets/birthday/Mummy Happi.webp",
    link: "https://solomon83.pixieset.com/birthdaydesigns/",
  },
  {
    title: "Social Media Designs",
    image: "/assets/Social-media/21 Days TFPCPR.webp",
    link: "https://solomon83.pixieset.com/socialmedia/",
  },
  {
    title: "Branding Designs",
    image: "/assets/wealthspring/Wealthspring ad 5.webp",
    link: "https://solomon83.pixieset.com/brandingprojects/",
  },
  {
    title: "Wealthspring Properties Website",
    image: "/assets/websitescreenshts/Screenshot_20260715_103008.webp",
    link: "https://wealthspring.vercel.app/",
  },
  {
    title: "YVN Academy Website",
    image: "/assets/websitescreenshts/Screenshot_20260715_103134.webp",
    link: "https://yvnacademy.vercel.app/",
  },
  {
    title: "The Creative Signal",
    image: "/assets/websitescreenshts/Screenshot_20260715_103055.webp",
    link: "https://thecreativesignal.vercel.app/",
  },
];

export default function Catalogue() {
  useEffect(() => {
    document.title = "Catalogue | Sol'o Mon";
  }, []);

  return (
    <div className="page-container catalogue-page">
      <Reveal>
        <PageHeader
          eyebrow="Portfolio"
          title="Catalogue"
          subtitle="Explore our curated collection of works across various categories."
        />
      </Reveal>

      <div className="music-grid">
        {categories.map((item, index) => (
          <Reveal key={item.title} delay={index * 100}>
            <div className="album-card">
              <a href={item.link} target="_blank" rel="noreferrer" className="album-link-wrapper">
                <div className="album-cover-wrapper zoomable">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="album-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="album-hover-overlay">
                    <span className="stream-cta-text">View Gallery →</span>
                  </div>
                </div>

                <div className="album-details">
                  <h3 className="album-title">{item.title}</h3>
                </div>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
