import React from 'react';
import '../Css/LegalPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
        <div className="legal-container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: January 16, 2025</p>

          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Hood Shop. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul>
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes payment card details (processed securely through our payment providers).</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              <li><strong>Profile Data:</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul>
              <li>To process and deliver your orders</li>
              <li>To manage payments, fees and charges</li>
              <li>To collect and recover money owed to us</li>
              <li>To send you order confirmations and shipping updates</li>
              <li>To provide customer support</li>
              <li>To personalize your shopping experience</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To detect and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data
              to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
            <p>
              All payment transactions are encrypted and processed through secure payment gateways. We do not store
              complete payment card details on our servers.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for,
              including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            <p>
              To determine the appropriate retention period for personal data, we consider the amount, nature, and
              sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, the purposes
              for which we process your personal data, and applicable legal requirements.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            <ul>
              <li><strong>Request access</strong> to your personal data</li>
              <li><strong>Request correction</strong> of your personal data</li>
              <li><strong>Request erasure</strong> of your personal data</li>
              <li><strong>Object to processing</strong> of your personal data</li>
              <li><strong>Request restriction</strong> of processing your personal data</li>
              <li><strong>Request transfer</strong> of your personal data</li>
              <li><strong>Withdraw consent</strong> at any time</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Cookies</h2>
            <p>
              Our website uses cookies to distinguish you from other users. This helps us to provide you with a good
              experience when you browse our website and also allows us to improve our site. A cookie is a small file of
              letters and numbers that we store on your browser or the hard drive of your computer.
            </p>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access
              cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible
              or not function properly.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins and applications. Clicking on those links or
              enabling those connections may allow third parties to collect or share data about you. We do not control these
              third-party websites and are not responsible for their privacy statements.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly collect personal information
              from children under 13. If you are a parent or guardian and believe your child has provided us with personal
              information, please contact us so we can delete such information.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              privacy policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us:
            </p>
            <ul>
              <li>Email: privacy@hoodshop.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Hood Street, Shop City, ST 12345</li>
            </ul>
          </section>
        </div>
      </div>
  );
};

export default PrivacyPolicy;
