import { socialLinks, site } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-label">Contact</p>
        <a href={site.whatsapp} target="_blank" rel="noreferrer" className="footer-link">
          WhatsApp
        </a>
      </div>
      <div>
        <p className="footer-label">Location</p>
        <span className="footer-copy">{site.location}</span>
      </div>
      <div className="footer-socials">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
      <p className="footer-meta">Copyright © 2026. All Rights Reserved.</p>
    </footer>
  );
}
