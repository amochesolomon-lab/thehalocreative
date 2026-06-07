import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import {
  achievements,
  featuredCollections,
  heroStats,
  philosophy,
  portrait,
  services,
  site,
} from '../data/siteData';

export default function Home({ onPreview }) {
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-grid">
          <Reveal className="hero-stack">
            <p className="eyebrow hero-eyebrow">Creative Director / Designer / Developer</p>
            <h1 className="hero-title">
              The Seraphic
              <span>Designer</span>
            </h1>
            <p className="hero-intro">{site.intro}</p>
            <div className="hero-links">
              <Link to="/catalogue">Catalogue</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="hero-meta">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="hero-visual" delay={120}>
            <div className="hero-panel">
              <img src={portrait} alt="Sol'o Mon portrait" className="hero-panel-image" />
              <div className="hero-panel-overlay">
                <span className="hero-chip">visual direction</span>
                <span className="hero-chip">editorial motion</span>
                <span className="hero-chip">brand systems</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="archive-shell">
        <Reveal className="section-heading">
          <p className="eyebrow">Selected Works</p>
          <h2>Archive</h2>
        </Reveal>

        <div className="archive-list">
          {featuredCollections.map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <ProjectCard project={project} onPreview={onPreview} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-split home-story">
        <Reveal className="page-copy">
          <p className="eyebrow">About</p>
          <h2 className="story-title">Created to create with clarity, atmosphere, and intent.</h2>
          <p>
            I build digital experiences that feel composed, premium, and emotionally aware. My
            work lives at the intersection of story, structure, and visual calm.
          </p>
        </Reveal>
        <Reveal className="list-block" delay={120}>
          <p className="eyebrow">Expertise</p>
          <div className="inline-list">
            {services.map((service) => (
              <span key={service.name}>{service.name}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="archive-shell">
        <Reveal className="section-heading">
          <p className="eyebrow">Selected Achievements</p>
          <h2>Highlights</h2>
        </Reveal>
        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <div className="achievement-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-split philosophy-grid">
        <Reveal className="list-block">
          <p className="eyebrow">Creative philosophy</p>
          <div className="philosophy-list">
            {philosophy.map((line, index) => (
              <p key={line}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {line}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal className="page-copy" delay={120}>
          <p className="eyebrow">Experience</p>
          <p>
            Designed for premium brands, churches, events, and creative projects that need a
            stronger visual voice and a more memorable digital presence.
          </p>
          <div className="hero-links hero-links-left">
            <Link to="/services">Services</Link>
            <Link to="/catalogue">Catalogue</Link>
          </div>
        </Reveal>
      </section>

      <section className="contact-banner">
        <Reveal className="contact-banner-inner">
          <p className="eyebrow">Contact</p>
          <h2>Let’s make the next project feel like a statement.</h2>
          <div className="hero-links hero-links-left">
            <Link to="/contact">Start a conversation</Link>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
