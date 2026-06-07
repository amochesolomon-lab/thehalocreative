import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { aboutHighlights, portrait, tools } from '../data/siteData';

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Who I Am"
        title="About"
        subtitle="A creative designer and web developer working between identity, motion, and clean visual systems."
      />
      <section className="page-split">
        <Reveal className="page-media">
          <img src={portrait} alt="Sol'o Mon portrait" />
        </Reveal>
        <div className="page-copy">
          {aboutHighlights.map((line) => (
            <Reveal key={line}>
              <p>{line}</p>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <div className="list-block">
              <p className="eyebrow">Tools & Skills</p>
              <div className="inline-list">
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
