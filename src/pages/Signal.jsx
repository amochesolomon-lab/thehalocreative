import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { signalConfig, signalSections, signalIssues } from '../data/siteData';
import Reveal from '../components/Reveal';

export default function Signal() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "The Creative Signal | Sol'o Mon";
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }, 800);
  };

  const featuredIssue = signalIssues.find(issue => issue.featured);

  return (
    <div className="signal-container">
      {/* Hero Section */}
      <section className="signal-hero">
        <div className="signal-hero-content">
          <Reveal delay={0}>
            <span className="signal-eyebrow">THE CREATIVE SIGNAL</span>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="signal-hero-title">
              Ideas at the intersection of design, technology and intentional creativity.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="signal-hero-subtitle">
              {signalConfig.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why It Exists Section */}
      <section className="signal-section signal-why">
        <Reveal>
          <div className="signal-section-content">
            <span className="signal-section-label">WHY IT EXISTS</span>
            <div className="signal-divider" />
            
            <p className="signal-why-text">
              The Creative Signal exists to document ideas, process, experiments and creative growth. 
              Rather than chasing trends or optimizing for algorithms, this publication prioritizes 
              authenticity and intentionality. Each issue explores real thinking, real workflows, and 
              real lessons learned while building brands and digital experiences.
            </p>
          </div>
        </Reveal>
      </section>

      {/* What You'll Find Section */}
      <section className="signal-section signal-what">
        <Reveal>
          <span className="signal-section-label">WHAT YOU'LL FIND</span>
        </Reveal>
        
        <div className="signal-divider" />

        <div className="signal-sections-grid">
          {signalSections.map((section, index) => (
            <Reveal key={section.id} delay={index * 100}>
              <motion.div 
                className="signal-section-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="signal-card-title">{section.title}</h3>
                <p className="signal-card-description">{section.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Issue Preview Section */}
      {featuredIssue && (
        <section className="signal-section signal-featured">
          <Reveal>
            <span className="signal-section-label">FIRST ISSUE</span>
          </Reveal>

          <div className="signal-divider" />

          <Reveal delay={100}>
            <div className="signal-featured-issue-preview">
              <div className="signal-featured-meta">
                <span className="signal-issue-number">Issue {featuredIssue.number}</span>
                <span className="signal-issue-date">
                  {new Date(featuredIssue.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <h2 className="signal-featured-title">{featuredIssue.title}</h2>

              <div className="signal-featured-content">
                <div className="signal-markdown-body">
                  <ReactMarkdown>
                    {featuredIssue.content}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="signal-featured-ctas">
                <motion.button
                  className="signal-read-btn"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => alert('Issue coming soon')}
                >
                  There's more in the Signal
                </motion.button>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Enter The Signal CTA Section - EXTERNAL LINK PLACEHOLDER */}
      <section className="signal-section signal-external-link">
        <Reveal>
          <div className="signal-external-wrapper">
            <h2 className="signal-external-title">Read all issues</h2>
            <p className="signal-external-desc">
              Visit The Creative Signal website to explore all published issues and archive, Every Sunday, 10AM.
            </p>
            <a 
              href="PLACEHOLDER_EXTERNAL_URL" 
              target="_blank" 
              rel="noreferrer"
              className="signal-external-link-btn"
            >
              <motion.button
                className="signal-external-btn"
                whileHover={{ opacity: 0.9, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                Visit The Creative Signal →
              </motion.button>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Subscribe Section */}
      <section className="signal-section signal-subscribe">
        <Reveal>
          <div className="signal-subscribe-content">
            <h2 className="signal-subscribe-heading">Receive future editions.</h2>

            <div className="signal-subscribe-form-wrapper">
              {subscribed ? (
                <Reveal>
                  <div className="signal-success-message">
                    <p className="signal-success-text">✓ Welcome to The Creative Signal</p>
                    <p className="signal-success-note">Check your email for confirmation.</p>
                  </div>
                </Reveal>
              ) : (
                <form onSubmit={handleSubscribe} className="signal-subscribe-form">
                  <input
                    type="email"
                    className="signal-email-input"
                    placeholder="your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <motion.button
                    type="submit"
                    className="signal-subscribe-btn"
                    disabled={loading}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    {loading ? 'Subscribing...' : 'Join The Creative Signal'}
                  </motion.button>
                </form>
              )}
            </div>

            <p className="signal-subscribe-note">
              <span className="note-point">Occasional emails.</span>
              <span className="note-point">No spam.</span>
              <span className="note-point">Always intentional.</span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* Transmission Complete Footer */}
      <section className="signal-transmission">
        <Reveal>
          <p className="signal-transmission-text">Transmission complete.</p>
        </Reveal>
      </section>
    </div>
  );
}