import React from 'react';
import Image from 'next/image';
import styles from './SeatLayoutSection.module.css';

export default function SeatLayoutSection() {
  return (
    <section id="seating-layout" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>FLOOR PLAN & SEATING</span>
        <h2 className={styles.title}>SEAT AVAILABILITY & SUMMIT ARENA</h2>
        <p className={styles.description}>
          Get a complete overview of the summit arena layout, stage proximity, and designated pass seating zones.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src="/seat-layout.webp"
            alt="Millionaire Summit & Awards 2027 Hall Layout and Seat Availability"
            width={1400}
            height={950}
            className={styles.layoutImage}
            priority={false}
          />
        </div>

        <div className={styles.legendBar}>
          <div className={styles.legendItem}>
            <span className={`${styles.statusIndicator} ${styles.indicatorVip}`}></span>
            <span className={styles.legendText}>VIP Pass</span>
            <span className={`${styles.legendBadge} ${styles.badgeVip}`}>Few Spots Left</span>
          </div>

          <div className={styles.legendItem}>
            <span className={`${styles.statusIndicator} ${styles.indicatorExecutive}`}></span>
            <span className={styles.legendText}>Executive Round Table</span>
            <span className={`${styles.legendBadge} ${styles.badgeExecutive}`}>Sold Out</span>
          </div>

          <div className={styles.legendItem}>
            <span className={`${styles.statusIndicator} ${styles.indicatorStandard}`}></span>
            <span className={styles.legendText}>Standard Pass</span>
            <span className={`${styles.legendBadge} ${styles.badgeStandard}`}>Filling Fast</span>
          </div>
        </div>
      </div>
    </section>
  );
}
