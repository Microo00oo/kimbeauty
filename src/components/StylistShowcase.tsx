"use client";

import { useState } from "react";
import Image from "next/image";
import { STYLISTS, Stylist } from "@/data/stylists";
import styles from "./StylistShowcase.module.css";

interface StylistShowcaseProps {
  onBookWithStylist: (stylistId: string) => void;
}

export default function StylistShowcase({ onBookWithStylist }: StylistShowcaseProps) {
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPortfolio = (stylist: Stylist) => {
    setSelectedStylist(stylist);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
  };

  const closePortfolio = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedStylist(null);
      document.body.style.overflow = "unset";
    }, 400); // Wait for transition out
  };

  const handleBookClick = (stylistId: string) => {
    closePortfolio();
    onBookWithStylist(stylistId);
  };

  return (
    <section id="stylists" className="container reveal-item">
      <div className={styles.sectionHeader}>
        <span className={styles.subTitle}>Creative Team</span>
        <h2 className={styles.title}>Meet Our Master Stylists</h2>
        <p className="gold-text-gradient" style={{ fontSize: "1.1rem" }}>
          Click on any stylist to explore their exclusive portfolio of work
        </p>
      </div>

      <div className={styles.grid}>
        {STYLISTS.map((stylist) => (
          <div
            key={stylist.id}
            className={styles.card}
            onClick={() => openPortfolio(stylist)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={stylist.image}
                alt={`${stylist.name} - ${stylist.role}`}
                fill
                className={styles.image}
                priority
              />
              <div className={styles.cardOverlay}>
                <h3 className={styles.name}>{stylist.name}</h3>
                <span className={styles.role}>{stylist.role}</span>
                <div className={styles.specialties}>
                  {stylist.specialization.slice(0, 2).map((spec, index) => (
                    <span key={index} className={styles.tag}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stylist Portfolio Modal */}
      <div
        className={`${styles.modalOverlay} ${isModalOpen ? styles.modalOverlayVisible : ""}`}
        onClick={closePortfolio}
      >
        {selectedStylist && (
          <div
            className={`${styles.modalContent} ${
              isModalOpen ? styles.modalContentVisible : ""
            }`}
            onClick={(e) => e.stopPropagation()} // Stop closing on clicking modal content
          >
            <button
              className={styles.closeButton}
              onClick={closePortfolio}
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Sidebar / Headshot */}
            <div className={styles.modalSidebar}>
              <Image
                src={selectedStylist.image}
                alt={selectedStylist.name}
                fill
                className={styles.modalSidebarImage}
              />
            </div>

            {/* Main Content */}
            <div className={styles.modalBody}>
              <h3 className={styles.modalName}>{selectedStylist.name}</h3>
              <span className={styles.modalRole}>{selectedStylist.role}</span>
              <p className={styles.modalBio}>{selectedStylist.bio}</p>

              {/* Specialization Tags */}
              <div className={styles.specSection}>
                <span className={styles.sectionLabel}>Expertise</span>
                <div className={styles.specTags}>
                  {selectedStylist.specialization.map((spec, index) => (
                    <span key={index} className={styles.specTag}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio Works Gallery */}
              <div className={styles.gallerySection}>
                <span className={styles.sectionLabel}>Portfolio Gallery</span>
                <div className={styles.galleryGrid}>
                  {selectedStylist.portfolio.map((work) => (
                    <div key={work.id} className={styles.galleryItem}>
                      <Image
                        src={work.image}
                        alt={work.caption}
                        fill
                        className={styles.galleryImg}
                      />
                      <div className={styles.galleryOverlay}>{work.caption}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <div className={styles.modalAction}>
                <button
                  onClick={() => handleBookClick(selectedStylist.id)}
                  className={`btn-primary ${styles.modalBookBtn}`}
                >
                  Book with {selectedStylist.name}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
