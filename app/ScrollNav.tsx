"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./scrollNav.module.css";

export default function ScrollNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 21,
    minutes: 17,
    seconds: 8
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const targetDate = new Date("January 8, 2027 08:00:00").getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        setIsLoaded(true);
        return false;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
      setIsLoaded(true);
      return true;
    };

    calculateTimeLeft();
    const interval = setInterval(() => {
      const shouldContinue = calculateTimeLeft();
      if (!shouldContinue) clearInterval(interval);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "about", label: "ABOUT" },
    { id: "venue", label: "VENUE" },
    { id: "why-it-matters", label: "WHY IT MATTERS" },
    { id: "keynote", label: "KEYNOTE" },
    { id: "panellist", label: "PANELLIST" },
    { id: "agenda", label: "AGENDA" },
    { id: "passess", label: "PASSESS" },
    { id: "gallery", label: "GALLERY" },
  ];

  const topNavRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is NOT intersecting, it means we have scrolled past it, so nav is sticky
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: [0], rootMargin: "0px 0px 0px 0px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -79% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100, // offset for the sticky nav height
        behavior: "smooth",
      });
      setActiveSection(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      {/* Sentinel for sticky intersection observer */}
      <div ref={sentinelRef} style={{ width: '100%', height: '1px' }} aria-hidden="true" />
      {/* Top Sticky Nav */}
      <div 
        ref={topNavRef}
        className={`${styles.topNavWrapper} ${isScrolled ? styles.topNavSticky : ""}`}
      >
        <div className={styles.navContainer}>
          <Link href="/">
            <Image src="/EC_logo.png" alt="EC Summit Logo" width={120} height={32} style={{ objectFit: 'contain' }} />
          </Link>
          
          <div className={styles.rightContent}>
            {/* MENU text (visible when NOT scrolled) */}
            <div 
              className={`${styles.menuTextWrapper} ${isScrolled || isMobileMenuOpen ? styles.hideMenu : styles.showMenu}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span>MENU</span>
            </div>
            
            {/* Desktop Links */}
            <div className={`${styles.navLinksWrapper} ${isScrolled ? styles.showLinks : styles.hideLinks}`}>
              <ul className={styles.navList}>
                {navItems.map((item) => (
                  <li key={item.id} className={`${styles.navItem} ${activeSection === item.id ? styles.active : ""}`}>
                    <a href={`#${item.id}`} onClick={(e) => handleSmoothScroll(e, item.id)} className={styles.navLink}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Burger Icon */}
            <div 
              className={`${styles.burgerWrapper} ${isScrolled || isMobileMenuOpen ? styles.showBurger : styles.hideBurger}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`${styles.burgerIcon} ${isMobileMenuOpen ? styles.burgerOpen : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ""}`}>
        <div className={styles.mobileOverlayHeader}>
          <Image src="/EC_logo.png" alt="EC Summit Logo" width={120} height={32} style={{ objectFit: 'contain' }} />
          <div className={styles.mobileCloseBtn} onClick={() => setIsMobileMenuOpen(false)}>
            <div className={styles.burgerIconX}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className={styles.mobileOverlayContent}>
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => {
                handleSmoothScroll(e, item.id);
                setIsMobileMenuOpen(false);
              }} 
              className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.mobileNavActive : ""}`}
            >
              {item.label}
            </a>
          ))}
          <button 
            className={styles.mobileSecureBtn}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('passess');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsMobileMenuOpen(false);
              } else {
                window.location.href = '/#passess';
              }
            }}
          >
            SECURE YOUR PASS
          </button>
        </div>
      </div>

      {/* Bottom Sticky Countdown Bar */}
      <div className={`${styles.bottomNav} ${isScrolled ? styles.bottomNavVisible : ""}`}>
        <div className={styles.bottomNavContainer}>
          <div className={styles.countdownWrapper}>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberDark : styles.skeletonText}>{isLoaded ? String(timeLeft.days).padStart(2, '0') : '00'}</span>
              <span className={styles.countdownLabel}>DAYS</span>
            </div>
            <div className={styles.countdownDivider}></div>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberDark : styles.skeletonText}>{isLoaded ? String(timeLeft.hours).padStart(2, '0') : '00'}</span>
              <span className={styles.countdownLabel}>HOURS</span>
            </div>
            <div className={styles.countdownDivider}></div>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberDark : styles.skeletonText}>{isLoaded ? String(timeLeft.minutes).padStart(2, '0') : '00'}</span>
              <span className={styles.countdownLabel}>MINUTES</span>
            </div>
            <div className={styles.countdownDivider}></div>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberGradient : styles.skeletonText}>{isLoaded ? String(timeLeft.seconds).padStart(2, '0') : '00'}</span>
              <span className={styles.countdownLabel}>SECONDS</span>
            </div>
          </div>
          
          <button 
            className={styles.securePassBtn}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('passess');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.href = '/#passess';
              }
            }}
          >
            SECURE YOUR PASS
          </button>
        </div>
      </div>
    </>
  );
}
