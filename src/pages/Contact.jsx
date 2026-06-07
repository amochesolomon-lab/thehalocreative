import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Sparkles, Send, CheckCircle } from "lucide-react";
import { site } from "../data/siteData";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="page-container contact-page">
      <Reveal>
        <PageHeader
          eyebrow="Get In Touch"
          title="Contact"
          subtitle="For bookings, collaborations, media enquiries, or direct letters."
        />
      </Reveal>

      <div className="contact-split-layout">
        {/* Contact Info Column */}
        <Reveal className="contact-info-column">
          <div className="contact-info-block">
            <Calendar className="info-icon" size={24} />
            <div className="info-text">
              <h3>Bookings & collaborations</h3>
              <a
                href="https://wa.link/wctpny"
                target="_blank"
                rel="noreferrer"
                className="contact-detail-link"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-info-block">
            <Mail className="info-icon" size={24} />
            <div className="info-text">
              <h3>General enquiries</h3>
              <a href={`mailto:${site.email}`} className="contact-detail-link">
                {site.email}
              </a>
            </div>
          </div>

          <div className="contact-info-block">
            <Sparkles className="info-icon" size={24} />
            <div className="info-text">
              <h3>Follow</h3>
              <div className="social-links-vertical">
                <a href={site.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href={site.twitter} target="_blank" rel="noreferrer">
                  Twitter
                </a>
                <a href={site.youtube} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <a href={site.tiktok} target="_blank" rel="noreferrer">
                  Threads
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Contact Form Column */}
        <Reveal className="contact-form-column" delay={120}>
          <div className="form-card">
            {!success ? (
              <form onSubmit={handleSubmit} className="custom-contact-form">
                <div className="form-field-group">
                  <input
                    type="text"
                    required
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <input
                    type="email"
                    required
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <input
                    type="text"
                    required
                    placeholder="Subject*"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <textarea
                    required
                    placeholder="Your Message*"
                    rows="5"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="form-textarea"
                  />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? "Sending..." : "Send Message"}
                  <Send size={16} style={{ marginLeft: "8px" }} />
                </button>
              </form>
            ) : (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle size={48} className="success-icon" />
                <h3>Message Sent</h3>
                <p>
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => setSuccess(false)}
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
