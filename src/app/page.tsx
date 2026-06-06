"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import StylistShowcase from "@/components/StylistShowcase";
import BookingModal from "@/components/BookingModal";
import { SERVICES, Service } from "@/data/services";
import styles from "./page.module.css";

interface ActiveBooking {
  ref: string;
  service: string;
  price: string;
  duration: string;
  stylist: string;
  date: string;
  time: string;
}

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedStylistId, setPreselectedStylistId] = useState<string | null>(null);
  
  // Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [quizRecommendation, setQuizRecommendation] = useState<{
    service: Service;
    stylistName: string;
    stylistId: string;
    description: string;
  } | null>(null);

  // Storage State
  const [upcomingBooking, setUpcomingBooking] = useState<ActiveBooking | null>(null);

  // Load bookings from localStorage
  const loadLatestBooking = () => {
    const saved = localStorage.getItem("salon_bookings");
    if (saved) {
      try {
        const bookings = JSON.parse(saved) as ActiveBooking[];
        if (bookings.length > 0) {
          // Get the most recent booking
          setUpcomingBooking(bookings[bookings.length - 1]);
        }
      } catch (err) {
        console.error("Failed to parse bookings", err);
      }
    }
  };

  useEffect(() => {
    loadLatestBooking();

    // Listen for booking added event
    window.addEventListener("booking_added", loadLatestBooking);

    // Scroll reveal animation logic
    const handleScrollReveal = () => {
      const reveals = document.querySelectorAll(".reveal-item");
      const windowHeight = window.innerHeight;

      reveals.forEach((reveal) => {
        const rect = reveal.getBoundingClientRect();
        if (rect.top < windowHeight - 80) {
          reveal.classList.add("active");
        }
      });
    };

    // Run once initially
    handleScrollReveal();
    window.addEventListener("scroll", handleScrollReveal);

    return () => {
      window.removeEventListener("booking_added", loadLatestBooking);
      window.removeEventListener("scroll", handleScrollReveal);
    };
  }, []);

  const handleOpenBooking = () => {
    setPreselectedStylistId(null);
    setIsBookingOpen(true);
  };

  const handleBookWithStylist = (stylistId: string) => {
    setPreselectedStylistId(stylistId);
    setIsBookingOpen(true);
  };

  const handleBookWithService = (service: Service) => {
    // For direct service bookings, we can default stylist to "any"
    setPreselectedStylistId("any");
    setIsBookingOpen(true);
  };

  // Quiz handler
  const handleQuizAnswer = (answerCode: string) => {
    let recServiceId = "sig_cut";
    let stylistId = "kim";
    let stylistName = "Kim";
    let desc = "";

    if (answerCode === "color") {
      recServiceId = "balayage";
      stylistId = "chloe";
      stylistName = "Chloe";
      desc = "Based on your dream of multi-dimensional color, we recommend a Custom Balayage hand-painted by Chloe, our Senior Color Specialist. She will craft a natural grow-out tailored to your facial features.";
    } else if (answerCode === "frizz") {
      recServiceId = "keratin";
      stylistId = "marcus";
      stylistName = "Marcus";
      desc = "To eliminate frizz and block humidity, our Brazilian Keratin smoothing treatment is perfect. Marcus, our hair-health doctor, will restore your hair's inner protein layers and leave it ultra-silky.";
    } else if (answerCode === "length") {
      recServiceId = "extensions";
      stylistId = "marcus";
      stylistName = "Marcus";
      desc = "For gorgeous length and immediate volume, we recommend tape-in or micro-link extensions installed by Marcus. He is certified in multiple installation methods for damage-free length.";
    } else {
      // style / cut
      recServiceId = "sig_cut";
      stylistId = "kim";
      stylistName = "Kim";
      desc = "A signature cut and blowout with Kim is perfect for refreshing your shape. Kim has 15+ years of experience crafting personalized, versatile scissor-work styles.";
    }

    // Find the actual service object
    let foundService: Service | undefined;
    for (const category of SERVICES) {
      const s = category.services.find((serv) => serv.id === recServiceId);
      if (s) {
        foundService = s;
        break;
      }
    }

    if (foundService) {
      setQuizRecommendation({
        service: foundService,
        stylistName,
        stylistId,
        description: desc,
      });
      setQuizStep(2);
    }
  };

  const handleBookRecommendation = () => {
    if (quizRecommendation) {
      setPreselectedStylistId(quizRecommendation.stylistId);
      setIsBookingOpen(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizRecommendation(null);
  };

  return (
    <div className={styles.main}>
      <Navbar onBookClick={handleOpenBooking} />

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <Image
          src="/images/hero_bg.png"
          alt="Luxury Salon Interior"
          fill
          className={styles.heroBg}
          priority
        />
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} container`}>
          <span className={styles.heroSub}>Est. 2018 | Bayonne, NJ</span>
          <h1 className={styles.heroTitle}>
            Where Hair Becomes <br />
            <span className="gold-text-gradient">A Masterpiece</span>
          </h1>
          <p className={styles.heroDesc}>
            Step into a world of ultimate glamour and tailored care. We specialize in custom hand-painted balayages, premium hair health treatments, precision cuts, and luxury extensions.
          </p>
          <div className={styles.heroActions}>
            <button onClick={handleOpenBooking} className="btn-primary">
              Book Appointment
            </button>
            <a href="#services" className="btn-secondary">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Feature Ticker / Stats */}
      <section className={styles.ticker}>
        <div className={`${styles.tickerGrid} container`}>
          <div className={styles.tickerItem}>
            <span className={styles.tickerNum}>15+</span>
            <span className={styles.tickerText}>Years Expertise</span>
          </div>
          <div className={styles.tickerItem}>
            <span className={styles.tickerNum}>3</span>
            <span className={styles.tickerText}>Master Stylists</span>
          </div>
          <div className={styles.tickerItem}>
            <span className={styles.tickerNum}>4.9★</span>
            <span className={styles.tickerText}>Client Rating</span>
          </div>
        </div>
      </section>

      {/* Upcoming Bookings Panel (Sticky Helper if user has booked) */}
      {upcomingBooking && (
        <div className="container reveal-item">
          <div className={styles.bookingsPanel}>
            <div className={styles.bookingsInfo}>
              <div className={styles.bookingsIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className={styles.bookingsText}>
                <span className={styles.bookingsLabel}>Your Upcoming Appointment</span>
                <span className={styles.bookingsDetail}>
                  {upcomingBooking.service} with {upcomingBooking.stylist} on {upcomingBooking.date} @ {upcomingBooking.time} (Ref: {upcomingBooking.ref})
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setPreselectedStylistId(null);
                setIsBookingOpen(true);
              }}
              className="btn-secondary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
            >
              Book Another
            </button>
          </div>
        </div>
      )}

      {/* Transformations Slider Section */}
      <section className={`${styles.section} reveal-item`}>
        <div className={styles.sectionHeader}>
          <span className={styles.secSub}>The Proof</span>
          <h2 className={styles.secTitle}>Stunning Transformations</h2>
          <p className={styles.quizDesc}>Drag the center slider handle left and right to inspect the magical change</p>
        </div>
        <div className="container">
          <BeforeAfterSlider
            beforeImage="/images/before_hair.png"
            afterImage="/images/after_hair.png"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`${styles.section} reveal-item`} style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className={styles.sectionHeader}>
          <span className={styles.secSub}>Our Expertise</span>
          <h2 className={styles.secTitle}>Signature Services</h2>
          <p className={styles.quizDesc}>All services include a customized consultation, hair analysis, and luxury blowout finish.</p>
        </div>
        <div className={`${styles.servicesGrid} container`}>
          {SERVICES.map((cat, index) => (
            <div key={index} className={styles.serviceCol}>
              <h3 className={styles.serviceColHeader}>
                {cat.category === "Cuts & Styling" && (
                  <svg className={styles.serviceColIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12l4 6-10 13L2 9z"/></svg>
                )}
                {cat.category === "Color Services" && (
                  <svg className={styles.serviceColIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                )}
                {cat.category === "Hair Treatments & Extensions" && (
                  <svg className={styles.serviceColIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                )}
                {cat.category}
              </h3>
              <div className={styles.serviceList}>
                {cat.services.map((service) => (
                  <div
                    key={service.id}
                    className={styles.serviceCard}
                    onClick={() => handleBookWithService(service)}
                  >
                    <div className={styles.serviceHeader}>
                      <span className={styles.serviceName}>{service.name}</span>
                      <span className={styles.servicePrice}>{service.price}</span>
                    </div>
                    <div className={styles.serviceMeta}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {service.duration}
                    </div>
                    <p className={styles.serviceDesc}>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stylists Section */}
      <section className={styles.section}>
        <StylistShowcase onBookWithStylist={handleBookWithStylist} />
      </section>

      {/* Interactive Style Finder Quiz */}
      <section className={`${styles.section} reveal-item`}>
        <div className="container">
          <div className={styles.quizCard}>
            {quizStep === 1 ? (
              <div>
                <div className={styles.quizHeader}>
                  <span className={styles.secSub}>Interactive Finder</span>
                  <h3 className={styles.quizTitle}>Find Your Dream Style</h3>
                  <p className={styles.quizDesc}>Answer a simple question and let our AI matching system find the perfect service and stylist for you.</p>
                </div>
                <div className={styles.quizFlow}>
                  <p className={styles.quizQuestion}>What is your primary hair objective?</p>
                  <div className={styles.quizOptions}>
                    <button onClick={() => handleQuizAnswer("color")} className={styles.quizOptionBtn}>
                      ✨ Seamless, low-maintenance color change &amp; blonde updates
                    </button>
                    <button onClick={() => handleQuizAnswer("frizz")} className={styles.quizOptionBtn}>
                      💆‍♀️ Smooth down frizzy layers, block moisture, and cut styling time
                    </button>
                    <button onClick={() => handleQuizAnswer("length")} className={styles.quizOptionBtn}>
                      💇‍♀️ Add immediate length, volume, and thickness
                    </button>
                    <button onClick={() => handleQuizAnswer("cut")} className={styles.quizOptionBtn}>
                      ✂️ A fresh, modern cut shape and voluminous designer blowout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.quizResult}>
                <span className={styles.secSub}>Your Recommendation</span>
                {quizRecommendation && (
                  <>
                    <h3 className={styles.quizResultTitle}>
                      {quizRecommendation.service.name} with {quizRecommendation.stylistName}
                    </h3>
                    <p className={styles.quizResultDesc}>{quizRecommendation.description}</p>
                    <div className={styles.heroActions}>
                      <button onClick={handleBookRecommendation} className="btn-primary">
                        Book Recommended Slots
                      </button>
                      <button onClick={resetQuiz} className="btn-secondary">
                        Take Quiz Again
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section id="gallery" className={`${styles.section} reveal-item`} style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className={styles.sectionHeader}>
          <span className={styles.secSub}>Client Showcase</span>
          <h2 className={styles.secTitle}>Recent Salon Work</h2>
          <p className={styles.quizDesc}>Actual hairstyles, colors, and cuts crafted by our stylists inside the boutique.</p>
        </div>
        <div className={`${styles.galleryGrid} container`}>
          <div className={styles.galleryItem}>
            <Image src="/images/portfolio_balayage.png" alt="Balayage Hair Styling" fill className={styles.galleryImg} />
            <div className={styles.galleryOverlay}>
              <span className={styles.galleryTag}>Balayage</span>
              <h4 className={styles.galleryTitle}>Rose Gold Waves</h4>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <Image src="/images/portfolio_cut.png" alt="Sleek Bob Cut" fill className={styles.galleryImg} />
            <div className={styles.galleryOverlay}>
              <span className={styles.galleryTag}>Haircuts</span>
              <h4 className={styles.galleryTitle}>Asymmetrical Bob</h4>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <Image src="/images/portfolio_extension.png" alt="Tape in Extensions" fill className={styles.galleryImg} />
            <div className={styles.galleryOverlay}>
              <span className={styles.galleryTag}>Extensions</span>
              <h4 className={styles.galleryTitle}>Choc-Brown Volume</h4>
            </div>
          </div>
          <div className={styles.galleryItem}>
            <Image src="/images/portfolio_styling.png" alt="Bridal Hair Updo" fill className={styles.galleryImg} />
            <div className={styles.galleryOverlay}>
              <span className={styles.galleryTag}>Styling</span>
              <h4 className={styles.galleryTitle}>Bridal Braided Updo</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.section} reveal-item`}>
        <div className={styles.sectionHeader}>
          <span className={styles.secSub}>Reviews</span>
          <h2 className={styles.secTitle}>What Our Clients Say</h2>
        </div>
        <div className={`${styles.testimonialSlider} container`}>
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>
              &quot;Chloe is an absolute magician with color! I went in with damaged brassy hair and left with the most beautiful, seamless rose-gold balayage. The salon is gorgeous and feels like pure luxury.&quot;
            </p>
            <div className={styles.clientInfo}>
              <div className={styles.clientMeta}>
                <span className={styles.clientName}>Jessica M.</span>
                <span className={styles.clientDate}>Bayonne, NJ</span>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>
              &quot;Kim has been cutting my hair for 5 years now, and I wouldn&apos;t go anywhere else. Her scissor work is extremely precise and holds shape for months. The booking wizard is so simple and fast!&quot;
            </p>
            <div className={styles.clientInfo}>
              <div className={styles.clientMeta}>
                <span className={styles.clientName}>David K.</span>
                <span className={styles.clientDate}>Jersey City, NJ</span>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>
              &quot;Marcus did a Keratin Treatment on my coarse hair and it is a total game changer. Drying time went from 30 minutes to 5 minutes, and it stays perfectly straight even in Jersey humidity.&quot;
            </p>
            <div className={styles.clientInfo}>
              <div className={styles.clientMeta}>
                <span className={styles.clientName}>Samantha L.</span>
                <span className={styles.clientDate}>Hoboken, NJ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Location & Contact Section */}
      <section id="contact" className={`${styles.section} reveal-item`} style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Hour Card */}
            <div className={styles.contactInfo}>
              <div>
                <span className={styles.secSub}>Come Visit Us</span>
                <h2 className={styles.secTitle} style={{ textAlign: "left" }}>Location &amp; Hours</h2>
              </div>
              
              <div className={styles.contactCard}>
                <h3 className={styles.contactTitle}>Operating Hours</h3>
                <div className={styles.contactRows}>
                  <div className={styles.contactRow}>
                    <span>Monday - Friday</span>
                    <span className="gold-text-gradient" style={{ fontWeight: 600 }}>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className={styles.contactRow}>
                    <span>Saturday</span>
                    <span className="gold-text-gradient" style={{ fontWeight: 600 }}>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className={styles.contactRow}>
                    <span>Sunday</span>
                    <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Closed for relaxation</span>
                  </div>
                </div>
              </div>

              <div className={styles.contactCard}>
                <h3 className={styles.contactTitle}>Direct Support</h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  Have questions about pricing, special event bridal packages, or custom extensions?
                  Call us at <a href="tel:+12014553107" className="gold-text-gradient" style={{ fontWeight: 700 }}>(201) 455-3107</a> or drop by Broadway.
                </p>
              </div>
            </div>

            {/* Embedded Dark Theme Custom Map */}
            <div className={styles.mapWrapper}>
              <iframe
                title="Salon Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.356230691515!2d-74.12056082343201!3d40.6660859404285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2512a515f40f3%3A0xe54e601bfbf7c756!2s528%20Broadway%2C%20Bayonne%2C%20NJ%2007002!5e0!3m2!1sen!2sus!4v1717670000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Large Booking CTA Banner */}
          <div className={styles.bookingCTA}>
            <h3 className={styles.ctaTitle}>Ready for your transformation?</h3>
            <p className={styles.ctaText}>Select your stylist, pick a time slot, and lock in your appointment in seconds.</p>
            <button onClick={handleOpenBooking} className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1rem" }}>
              Book Your Appointment Now
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Wizard Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedStylistId={preselectedStylistId}
      />
    </div>
  );
}
