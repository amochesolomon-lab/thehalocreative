import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navigation, site } from "../data/siteData";
import { warnOnce } from "framer-motion";

export default function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const firstLink = drawerRef.current?.querySelector("a");
    firstLink?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className={`site-nav ${open ? "menu-open" : ""}`}>
      <NavLink to="/" className="brand" aria-label="Home">
        <img
          src="/assets/pics/logo.png"
          alt="Sol'o Mon"
          className="brand-logo"
        />
      </NavLink>

      <button
        type="button"
        className={`menu-toggle ${open ? "open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="primary-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div ref={drawerRef} className={`nav-drawer ${open ? "open" : ""}`}>
        <nav id="primary-menu" className="nav-links" aria-label="Primary">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${item.cta ? "cta" : ""} ${isActive ? "active" : ""}`.trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-meta">
          <span>{site.location}</span>
          <div className="nav-social-row">
            <a href="https://wa.link/wctpny" target="_blank" rel="noreferrer">
              WhatsApp{" "}
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
