"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./BeforeAfterSlider.module.css";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Hair before styling",
  afterAlt = "Hair after styling",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className={styles.sliderContainer}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Before Image (Background) */}
      <Image
        src={beforeImage}
        alt={beforeAlt}
        fill
        className={styles.image}
        priority
      />
      <span className={`${styles.label} ${styles.beforeLabel}`}>Before</span>

      {/* After Image (Foreground, clipped) */}
      <div
        className={styles.image}
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className={styles.image}
          priority
        />
      </div>
      <span className={`${styles.label} ${styles.afterLabel}`}>After</span>

      {/* Slider Handle Divider */}
      <div className={styles.handle} style={{ left: `${sliderPosition}%` }}>
        <div className={styles.handleButton}>
          <div className={styles.handleIcon}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
