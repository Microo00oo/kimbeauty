"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} container`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <span className={styles.logoMain}>Kim&apos;s</span>
            <span className={styles.logoSub}>House of Beauty</span>
          </div>
          <p className={styles.description}>
            Experience the art of luxury hair styling and texturizing treatments at Bayonne&apos;s premier boutique salon. Our team is dedicated to elevating your confidence and natural beauty.
          </p>
          <ul className={styles.socials}>
            <li>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </li>
            <li>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
              </a>
            </li>
            <li>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className={styles.colHeader}>Navigate</h3>
          <ul className={styles.links}>
            <li className={styles.linkItem}>
              <a href="#home" onClick={(e) => handleLinkClick(e, "home")}>Home</a>
            </li>
            <li className={styles.linkItem}>
              <a href="#services" onClick={(e) => handleLinkClick(e, "services")}>Services</a>
            </li>
            <li className={styles.linkItem}>
              <a href="#stylists" onClick={(e) => handleLinkClick(e, "stylists")}>Our Stylists</a>
            </li>
            <li className={styles.linkItem}>
              <a href="#gallery" onClick={(e) => handleLinkClick(e, "gallery")}>Work Gallery</a>
            </li>
            <li className={styles.linkItem}>
              <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>About Us</a>
            </li>
            <li className={styles.linkItem}>
              <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>Contact</a>
            </li>
          </ul>
        </div>

        {/* Working Hours Column */}
        <div>
          <h3 className={styles.colHeader}>Hours</h3>
          <div className={styles.hoursList}>
            <div className={styles.hoursRow}>
              <span className={styles.hoursDay}>Mon - Fri</span>
              <span className={styles.hoursTime}>9:00 AM - 7:00 PM</span>
            </div>
            <div className={styles.hoursRow}>
              <span className={styles.hoursDay}>Saturday</span>
              <span className={styles.hoursTime}>9:00 AM - 6:00 PM</span>
            </div>
            <div className={styles.hoursRow}>
              <span className={styles.hoursDay}>Sunday</span>
              <span className={styles.hoursTime}>Closed</span>
            </div>
          </div>
        </div>

        {/* Contact Info Column */}
        <div>
          <h3 className={styles.colHeader}>Salon Info</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div className={styles.contactText}>
                528 Broadway<br />Bayonne, NJ 07002
              </div>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div className={styles.contactText}>
                <a href="tel:+12014553107">(201) 455-3107</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div className={styles.contactText}>
                <a href="mailto:info@kimshouseofbeauty.com">info@kimshouseofbeauty.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.bottom} container`}>
        <p>&copy; {new Date().getFullYear()} Kim&apos;s House of Beauty. All rights reserved.</p>
        <p>Designed for Ultimate Luxury &amp; Glamour.</p>
      </div>
    </footer>
  );
}
