import { useEffect } from 'react';
import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { aboutHighlights, portrait, tools } from '../data/siteData';

export default function About() {
  useEffect(() => {
    document.title = "About | Sol'o Mon";
  }, []);

  return (
    <div className="page-container about-page">
      <PageHeader
        eyebrow="Who I Am"
        title="About"
        subtitle="A creative designer and web developer working between identity, motion, and clean visual systems."
      />
      <section className="page-split">
        <Reveal className="page-media">
          <div className="portrait-wrapper">
            <img src={portrait} alt="Sol'o Mon portrait" />
          </div>
        </Reveal>
        <div className="page-copy">
          {aboutHighlights && aboutHighlights.map((line) => (
            <Reveal key={line}>
              <p>{line}</p>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <div className="list-block">
              <p className="eyebrow">Tools & Skills</p>
              <div className="inline-list">
                {tools && tools.map((tool) => (
                  <span key={tool} className="skill-tag">{tool}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
