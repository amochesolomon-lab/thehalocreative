import { site } from "../data/siteData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-left">
        <p className="footer-label">Connect</p>
        <div className="footer-socials">
          <a href="https://wa.link/wctpny" target="_blank" rel="noreferrer">
            WhatApp
          </a>
          <a href={site.spotify} target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={site.twitter} target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href={site.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={site.threads} target="_blank" rel="noreferrer">
            Threads
          </a>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-label">Enquiries</p>
        <a href={`mailto:${site.email}`} className="footer-link">
          {site.email}
        </a>
      </div>
      <div className="footer-meta">
        <span>
          Copyright © {currentYear} {site.name}. All Rights Reserved.
        </span>
        <span>creative / curious</span>
      </div>
    </footer>
  );
}
