import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { services } from '../data/siteData';

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="What I Offer"
        title="Services"
        subtitle="A focused set of creative services presented with the same restraint as the rest of the site."
      />
      <section className="archive-shell">
        <div className="archive-list">
          {services.map((service, index) => (
            <Reveal key={service.name} delay={index * 70}>
              <article className="release-row">
                <span className="release-number">{service.number}</span>
                <div className="release-copy">
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                  <div className="inline-list">
                    {service.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
