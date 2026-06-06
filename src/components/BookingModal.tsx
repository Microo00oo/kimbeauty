"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SERVICES, Service } from "@/data/services";
import { STYLISTS, Stylist } from "@/data/stylists";
import styles from "./BookingModal.module.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStylistId: string | null;
}

interface DateSlot {
  dateString: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  isClosed: boolean;
}

export default function BookingModal({ isOpen, onClose, preselectedStylistId }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylistId, setSelectedStylistId] = useState<string>("any");
  const [selectedDate, setSelectedDate] = useState<DateSlot | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // Client details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  
  const [bookingRef, setBookingRef] = useState("");
  const [dates, setDates] = useState<DateSlot[]>([]);
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

  // Reset booking when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedService(null);
      setSelectedStylistId(preselectedStylistId || "any");
      setSelectedDate(null);
      setSelectedTime("");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      
      // Prevent body scrolling
      document.body.style.overflow = "hidden";
      
      // Generate next 12 days
      const generatedDates: DateSlot[] = [];
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      for (let i = 1; i <= 12; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        
        const dayOfWeekIndex = d.getDay();
        const isClosed = dayOfWeekIndex === 0; // Sunday closed
        
        generatedDates.push({
          dateString: d.toDateString(),
          dayName: daysOfWeek[dayOfWeekIndex],
          dayNumber: d.getDate(),
          monthName: months[d.getMonth()],
          isClosed
        });
      }
      setDates(generatedDates);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, preselectedStylistId]);

  // Handle step transitions
  const nextStep = () => {
    if (currentStep === 1 && !selectedService) return;
    if (currentStep === 3 && (!selectedDate || !selectedTime)) return;
    
    if (currentStep === 4) {
      if (!name.trim() || !email.trim() || !phone.trim()) return;
      
      // Save booking & transition to success step
      const ref = "KB-" + Math.floor(1000 + Math.random() * 9000);
      setBookingRef(ref);
      
      const newBooking = {
        ref,
        service: selectedService?.name,
        price: selectedService?.price,
        duration: selectedService?.duration,
        stylist: selectedStylistId === "any" ? "Any Available" : STYLISTS.find(s => s.id === selectedStylistId)?.name,
        date: selectedDate?.dateString,
        time: selectedTime,
        clientName: name
      };
      
      const existing = localStorage.getItem("salon_bookings");
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(newBooking);
      localStorage.setItem("salon_bookings", JSON.stringify(bookings));
      
      // Trigger a custom event to notify parent about new bookings
      window.dispatchEvent(new Event("booking_added"));
    }
    
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const getStylistDetails = () => {
    if (selectedStylistId === "any") return { name: "Any Available Stylist", image: "/images/hero_bg.png" };
    const found = STYLISTS.find((s) => s.id === selectedStylistId);
    return found ? { name: found.name, image: found.image } : { name: "Stylist", image: "/images/hero_bg.png" };
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${isOpen ? styles.modalVisible : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        {currentStep <= 4 && (
          <div className={styles.header}>
            <h2 className={styles.title}>Book Appointment</h2>
            
            {/* Step Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}></div>
              <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`${styles.stepDot} ${
                    currentStep === step
                      ? styles.stepDotActive
                      : currentStep > step
                      ? styles.stepDotCompleted
                      : ""
                  }`}
                >
                  {currentStep > step ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className={styles.content}>
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div className={styles.servicesList}>
              {SERVICES.map((cat, catIdx) => (
                <div key={catIdx} className={styles.categoryGroup}>
                  <h3 className={styles.categoryTitle}>{cat.category}</h3>
                  {cat.services.map((service) => (
                    <div
                      key={service.id}
                      className={`${styles.serviceItem} ${
                        selectedService?.id === service.id ? styles.serviceItemActive : ""
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className={styles.serviceDetails}>
                        <span className={styles.serviceName}>{service.name}</span>
                        <span className={styles.serviceMeta}>{service.duration}</span>
                        <p className={styles.serviceDesc}>{service.description}</p>
                      </div>
                      <div className={styles.servicePriceBlock}>
                        <span className={styles.servicePrice}>{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Select Stylist */}
          {currentStep === 2 && (
            <div className={styles.stylistGrid}>
              {/* Option: Any Available */}
              <div
                className={`${styles.stylistItem} ${
                  selectedStylistId === "any" ? styles.stylistItemActive : ""
                }`}
                onClick={() => setSelectedStylistId("any")}
              >
                <div className={styles.stylistAvatar}>
                  <Image
                    src="/images/hero_bg.png"
                    alt="Any Available Stylist"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.stylistInfo}>
                  <span className={styles.stylistName}>Any Available</span>
                  <span className={styles.stylistRole}>No preference</span>
                </div>
              </div>

              {/* Individual Stylists */}
              {STYLISTS.map((stylist) => (
                <div
                  key={stylist.id}
                  className={`${styles.stylistItem} ${
                    selectedStylistId === stylist.id ? styles.stylistItemActive : ""
                  }`}
                  onClick={() => setSelectedStylistId(stylist.id)}
                >
                  <div className={styles.stylistAvatar}>
                    <Image
                      src={stylist.image}
                      alt={stylist.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.stylistInfo}>
                    <span className={styles.stylistName}>{stylist.name}</span>
                    <span className={styles.stylistRole}>{stylist.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Select Date & Time */}
          {currentStep === 3 && (
            <div className={styles.datetimeWrapper}>
              <div>
                <h3 className={styles.gridTitle}>Select Date</h3>
                <div className={styles.dateGrid}>
                  {dates.map((dateObj, idx) => (
                    <button
                      key={idx}
                      disabled={dateObj.isClosed}
                      className={`${styles.dateCard} ${
                        selectedDate?.dateString === dateObj.dateString ? styles.dateCardActive : ""
                      }`}
                      onClick={() => {
                        setSelectedDate(dateObj);
                        setSelectedTime(""); // Reset time when date changes
                      }}
                      style={dateObj.isClosed ? { opacity: 0.35, cursor: "not-allowed" } : {}}
                    >
                      <span className={styles.dateDayName}>{dateObj.dayName}</span>
                      <span className={styles.dateDayNumber}>{dateObj.dayNumber}</span>
                      <span className={styles.dateMonthName}>
                        {dateObj.isClosed ? "Closed" : dateObj.monthName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className={styles.gridTitle}>Select Time</h3>
                  <div className={styles.timeGrid}>
                    {timeSlots.map((time, idx) => (
                      <button
                        key={idx}
                        className={`${styles.timeCard} ${
                          selectedTime === time ? styles.timeCardActive : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Contact & Summary */}
          {currentStep === 4 && (
            <div className={styles.formWrapper}>
              <div className={styles.inputGroup}>
                <label htmlFor="client-name">Full Name</label>
                <input
                  id="client-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="client-email">Email Address</label>
                <input
                  id="client-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="client-phone">Phone Number</label>
                <input
                  id="client-phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="booking-notes">Special Notes (Optional)</label>
                <textarea
                  id="booking-notes"
                  placeholder="Any specifics, hair history, or notes for the stylist..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={styles.inputField}
                  rows={3}
                />
              </div>

              {/* Summary Summary */}
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Appointment Summary</h3>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Service</span>
                  <span className={styles.summaryValue}>{selectedService?.name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Stylist</span>
                  <span className={styles.summaryValue}>{getStylistDetails().name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Date &amp; Time</span>
                  <span className={styles.summaryValue}>
                    {selectedDate?.dayName}, {selectedDate?.monthName} {selectedDate?.dayNumber} @ {selectedTime}
                  </span>
                </div>
                <div className={styles.summaryRow} style={{ borderTop: "1px dashed var(--border-light)", paddingTop: "0.75rem", marginTop: "0.75rem" }}>
                  <span className={styles.summaryLabel} style={{ fontWeight: 600, color: "var(--text-primary)" }}>Total Cost</span>
                  <span className={styles.summaryValue} style={{ fontSize: "1.2rem", color: "var(--accent-gold)" }}>{selectedService?.price}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success screen */}
          {currentStep === 5 && (
            <div className={styles.successWrapper}>
              <div className={styles.successIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className={styles.successTitle}>Booking Confirmed!</h2>
              <p style={{ color: "var(--text-secondary)", maxWidth: "80%" }}>
                Thank you for choosing Kim&apos;s House of Beauty. We have sent a confirmation email containing your details.
              </p>
              <div>
                <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", display: "block" }}>
                  Reservation Code
                </span>
                <div className={styles.successRef}>{bookingRef}</div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Need to cancel or reschedule? Call us at (201) 455-3107.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer / Navigation */}
        {currentStep <= 4 ? (
          <div className={styles.footer}>
            <div className={styles.actionButtons}>
              {currentStep > 1 && (
                <button onClick={prevStep} className="btn-secondary">
                  Back
                </button>
              )}
              
              {currentStep === 1 && (
                <button
                  disabled={!selectedService}
                  onClick={nextStep}
                  className="btn-primary"
                  style={!selectedService ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                  Continue
                </button>
              )}

              {currentStep === 2 && (
                <button onClick={nextStep} className="btn-primary">
                  Continue
                </button>
              )}

              {currentStep === 3 && (
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={nextStep}
                  className="btn-primary"
                  style={(!selectedDate || !selectedTime) ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                  Continue
                </button>
              )}

              {currentStep === 4 && (
                <button
                  disabled={!name.trim() || !email.trim() || !phone.trim()}
                  onClick={nextStep}
                  className="btn-primary"
                  style={(!name.trim() || !email.trim() || !phone.trim()) ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.footer}>
            <button onClick={onClose} className={`btn-primary ${styles.navBtnFull}`}>
              Close Wizard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
