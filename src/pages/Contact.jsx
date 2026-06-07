import Reveal from '../components/Reveal';
import PageHeader from '../components/PageHeader';
import { socialLinks, site } from '../data/siteData';

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact"
        subtitle="Direct links, one page, minimal friction."
      />
      <section className="page-split page-split-contact">
        <Reveal className="page-copy">
          <p className="contact-hero">
            Have a brand, event, or web project that needs a clearer visual identity?
          </p>
          <a className="text-link" href={site.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </Reveal>

        <Reveal className="list-block" delay={120}>
          <p className="eyebrow">Links</p>
          <div className="contact-list">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </a>
            ))}
            <div>
              <span>{site.location}</span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
