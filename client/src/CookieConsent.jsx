import { useState, useEffect } from "react";

const CONSENT_KEY = "portfolio_cookie_consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setTimeout(() => setShow(true), 1500);
    }
    const openPolicy = () => setShowPolicy(true);
    window.addEventListener("open-privacy-policy", openPolicy);
    return () => window.removeEventListener("open-privacy-policy", openPolicy);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
  };

  return (
    <>
      {/* ── Cookie Banner ── */}
      {show && (
        <div className="cookie-banner">
          <div className="cookie-banner-content">
            <span className="cookie-icon">🍪</span>
            <p>
              This site uses cookies and analytics to improve your experience and measure visitor behaviour.
              By clicking <strong>Accept</strong>, you agree to our{" "}
              <button className="cookie-link" onClick={() => setShowPolicy(true)}>
                Privacy &amp; Cookie Policy
              </button>.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button className="btn-cookie-decline" onClick={decline}>Decline</button>
            <button className="btn-cookie-accept" onClick={accept}>Accept</button>
          </div>
        </div>
      )}

      {/* ── Privacy Policy Modal ── */}
      {showPolicy && (
        <div className="policy-overlay" onClick={() => setShowPolicy(false)}>
          <div className="policy-modal" onClick={e => e.stopPropagation()}>
            <button className="cs-close" onClick={() => setShowPolicy(false)}>✕</button>
            <h2>Privacy &amp; Cookie Policy</h2>
            <p className="policy-date">Last updated: July 2026</p>

            <div className="policy-section">
              <h3>1. Who We Are</h3>
              <p>
                This portfolio website is owned and operated by <strong>Ogaga Ejairu</strong>, a Full Stack Software Engineer.
                Contact: <a href="mailto:ejairuogaga@gmail.com">ejairuogaga@gmail.com</a>
              </p>
            </div>

            <div className="policy-section">
              <h3>2. Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Contact form submissions</strong> — name, email address, and message content when you contact us.</li>
                <li><strong>Reviews</strong> — name, star rating, and comment when you leave a review.</li>
                <li><strong>Usage data</strong> — pages visited, time on site, device type, browser, and approximate location via Google Analytics.</li>
                <li><strong>Cookies</strong> — small files stored in your browser to remember your preferences.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3>3. How We Use Your Information</h3>
              <ul>
                <li>To respond to your contact form messages.</li>
                <li>To display reviews on the portfolio.</li>
                <li>To understand how visitors use the site and improve the experience.</li>
                <li>To measure the effectiveness of the portfolio using Google Analytics.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3>4. Cookies We Use</h3>
              <table className="policy-table">
                <thead>
                  <tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>portfolio_cookie_consent</td><td>Stores your cookie consent preference</td><td>Persistent</td></tr>
                  <tr><td>portfolio_music_on</td><td>Remembers your music player preference</td><td>Persistent</td></tr>
                  <tr><td>_ga, _ga_*</td><td>Google Analytics — tracks site usage anonymously</td><td>2 years</td></tr>
                  <tr><td>_gtm</td><td>Google Tag Manager — manages analytics tags</td><td>Session</td></tr>
                </tbody>
              </table>
            </div>

            <div className="policy-section">
              <h3>5. Third-Party Services</h3>
              <ul>
                <li><strong>Google Analytics</strong> — visitor behaviour tracking. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a></li>
                <li><strong>Google Tag Manager</strong> — manages analytics scripts.</li>
                <li><strong>Resend</strong> — used to deliver contact form emails securely.</li>
                <li><strong>MongoDB Atlas</strong> — stores contact form submissions and reviews.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3>6. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Decline cookies using the banner on first visit.</li>
                <li>Clear cookies at any time via your browser settings.</li>
                <li>Request deletion of any personal data submitted via the contact form by emailing <a href="mailto:ejairuogaga@gmail.com">ejairuogaga@gmail.com</a>.</li>
              </ul>
            </div>

            <div className="policy-section">
              <h3>7. Data Retention</h3>
              <p>
                Contact form messages and reviews are stored securely in MongoDB Atlas and retained for as long as necessary to maintain the portfolio.
                You may request deletion at any time.
              </p>
            </div>

            <div className="policy-section">
              <h3>8. Contact</h3>
              <p>
                For any privacy-related questions, contact us at{" "}
                <a href="mailto:ejairuogaga@gmail.com">ejairuogaga@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
