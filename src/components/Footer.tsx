import Mission_logo from '../assets/Mission_logo.svg'

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-wrapper">
              <img src={Mission_logo} alt="Mission World Education" className="footer-logo" />
              <div className="brand-text">
                <h3 className="brand-name">Mission World Education</h3>
                <p className="footer-desc">
                  Empowering global learners through quality education and innovative programs.
                </p>
              </div>
            </div>
            <div className="accreditation">
              <span className="accreditation-badge">Accredited Institution</span>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Admissions Process</a></li>
              <li><a href="#" className="footer-link">Academic Programs</a></li>
              <li><a href="#" className="footer-link">Scholarships</a></li>
              <li><a href="#" className="footer-link">Campus Events</a></li>
              <li><a href="#" className="footer-link">Student Portal</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact Information</h4>
            <address className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  Tindobato/Naladobato<br />
                  Banepa, Kavre, Nepal
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <a href="tel:+9779851021384">+977 9851021384</a><br />
                  <a href='tel:+9779705426949'>+977 9705426949</a><br />
                  <a href="tel:+977011662440">011 662440</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <a href="mailto:missioneducation505@gmail.com">missioneducation505@gmail.com</a>
                </div>
              </div>
            </address>
          </div>

          <div className="footer-news">
            <h4 className="footer-heading">Stay Connected</h4>
            <div className="social-section">
              <h5 className="social-heading">Follow Us</h5>
              <div className="social-links">
                <a className="social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  {/* Facebook SVG */}
                  <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.24 10.44 22v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.86h2.74l-.44 2.9h-2.3V22C18.34 21.24 22 17.09 22 12.07z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a className="social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  {/* Instagram SVG */}
                  <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-map-section">
          <div className="footer-map">
            <iframe
              title="Mission World Education Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.777665286048!2d85.5188836!3d27.6314018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb0f32bf6d4795%3A0x9bcd198370f4bd!2sMission%20Computer%20%26%20Educational%20Institute!5e0!3m2!1sen!2snp!4v1762702759392!5m2!1sen!2snp"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Mission World Education. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="#" className="legal-link">Privacy Policy</a>
              <a href="#" className="legal-link">Terms of Service</a>
              <a href="#" className="legal-link">Accessibility</a>
              <a href="#" className="legal-link">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}