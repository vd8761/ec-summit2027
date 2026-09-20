import React from 'react';
import styles from './EventBannerSection.module.css';

export default function EventBannerSection() {
  const marqueeItems = [
    "KEYNOTES",
    "HIGH NETWORKING",
    "INDUSTRY PANELS",
    "FOOD AND DRINKS",
    "VISIONARY KEYNOTES"
  ];

  return (
    <section id="venue" className={styles.section}>
      <div className={styles.bannerWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.leftContent}>
            <span className={styles.dayText}>FRIDAY</span>
            <h2 className={styles.dateNumber}>08</h2>
            <span className={styles.monthYear}>JANUARY 2027</span>
          </div>

          <div className={styles.verticalDivider}></div>

          <div className={styles.rightContent}>
            <div className={styles.timeText}>
              08:00 AM - 05:00 PM IST
            </div>
            <div className={styles.venueText}>
              <span className={styles.venueBold}>Feathers A Radha Hotel</span> (Carnation Hall Ground Floor),<br />
              Chennai Tamil Nadu, India
            </div>

            <div className={styles.divider}></div>

            <div className={styles.contactRow}>
              <span className={styles.contactText}>{process.env.NEXT_PUBLIC_WEBSITE_PHONE_NUMBER}</span>
              <span className={styles.contactText}>{process.env.NEXT_PUBLIC_WEBSITE_EMAIL_ADDRESS}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.marqueeBar}>
        <div className={styles.marqueeContent}>
          {/* We duplicate the array 4 times to ensure seamless infinite scrolling */}
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, index) => (
            <div key={index} className={styles.marqueeItem}>
              <span className={styles.marqueeText}>{text}</span>
              <div className={styles.glowDot}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
