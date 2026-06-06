"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Scroll event listener for changing navbar height/background
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section on scroll
      const sections = ["home", "services", "stylists", "gallery", "about", "contact"];
      const currentScroll = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial theme detection
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
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
      setActiveSection(id);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={`${styles.navContainer} container`}>
          <a href="#home" onClick={(e) => handleLinkClick(e, "home")} className={styles.logo}>
            <span className={styles.logoMain}>Kim&apos;s</span>
            <span className={styles.logoSub}>House of Beauty</span>
          </a>

          {/* Desktop Nav Links */}
          <ul className={styles.navLinks}>
            {["home", "services", "stylists", "gallery", "about", "contact"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => handleLinkClick(e, section)}
                  className={`${styles.navLink} ${
                    activeSection === section ? styles.navLinkActive : ""
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop/Mobile Actions */}
          <div className={styles.actions}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button onClick={onBookClick} className={styles.bookButton}>
              Book Now
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className={`${styles.mobileToggle} ${isMobileOpen ? styles.mobileToggleOpen : ""}`}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide-out */}
      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          {["home", "services", "stylists", "gallery", "about", "contact"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(e) => handleLinkClick(e, section)}
                className={`${styles.mobileLink} ${
                  activeSection === section ? styles.mobileLinkActive : ""
                }`}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.mobileActions}>
          <button
            onClick={() => {
              setIsMobileOpen(false);
              onBookClick?.();
            }}
            className={`${styles.bookButton} ${styles.mobileBookButton}`}
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Overlay Backdrop */}
      <div
        className={`${styles.overlay} ${isMobileOpen ? styles.overlayVisible : ""}`}
        onClick={() => setIsMobileOpen(false)}
      ></div>
    </>
  );
}
