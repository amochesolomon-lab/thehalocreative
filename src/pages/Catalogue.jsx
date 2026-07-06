import { useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

const categories = [
  {
    title: "Event Designs",
    image: "/assets/Church/FESTIVAL OF WORSHIP full.png",
    link: "https://solomon83.pixieset.com/eventflyers/",
  },
  {
    title: "Birthday Designs",
    image: "/assets/birthday/Mummy Happi.png",
    link: "https://solomon83.pixieset.com/birthdaydesigns/",
  },
  {
    title: "Social Media Designs",
    image: "/assets/Social-media/21 Days TFPCPR.png",
    link: "https://solomon83.pixieset.com/socialmedia/",
  },
  {
    title: "Branding Designs",
    image: "/assets/wealthspring/Wealthspring ad 5.png",
    link: "https://solomon83.pixieset.com/brandingprojects/",
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
