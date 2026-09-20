import React from 'react';
import Image from 'next/image';
import styles from './PartnersSection.module.css';

interface Partner {
  id: string;
  name: string;
  logoPath: string;
}

const partners: Partner[] = [
  { id: 'meta', name: 'Meta', logoPath: '/meta.png' },
  { id: 'cocacola', name: 'Coca-Cola', logoPath: '/cocacola_nb.png' },
  { id: 'zoho', name: 'Zoho', logoPath: '/zoho_nb.png' },
  { id: 'mckinsey', name: 'McKinsey & Company', logoPath: '/mckc_nb.png' },
  { id: 'tesla', name: 'Tesla', logoPath: '/tesl_nb.png' },
  { id: 'tcs', name: 'TCS', logoPath: '/tcs_nb.png' },
  { id: 'ibm', name: 'IBM', logoPath: '/ibm_nb.png' },
  { id: 'apple', name: 'Apple', logoPath: '/apple_nb.png' },
  { id: 'microsoft', name: 'Microsoft', logoPath: '/microsoft_nb.png' },
];

const row1 = partners.slice(0, 5);
const row2 = partners.slice(5);

export default function PartnersSection() {
  return (
    <section id="partners" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>IN ASSOCIATION WITH</h2>
        
        <div className={styles.marqueeContainer}>
          {/* Row 1: Left to Right */}
          <div className={`${styles.marqueeRow} ${styles.scrollRight}`}>
            {[...row1, ...row1, ...row1].map((partner, index) => (
              <div key={`row1-${partner.id}-${index}`} className={styles.card}>
                <div className={styles.logoWrapper}>
                  <Image
                    src={partner.logoPath}
                    alt={`${partner.name} logo`}
                    fill
                    className={styles.logo}
                  />
                </div>
                <div className={styles.badge}>
                  <span className={styles.executiveText}>EXICUTIVE</span>
                  <span className={styles.partnerText}>PARTNER</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Right to Left */}
          <div className={`${styles.marqueeRow} ${styles.scrollLeft}`}>
            {[...row2, ...row2, ...row2].map((partner, index) => (
              <div key={`row2-${partner.id}-${index}`} className={styles.card}>
                <div className={styles.logoWrapper}>
                  <Image
                    src={partner.logoPath}
                    alt={`${partner.name} logo`}
                    fill
                    className={styles.logo}
                  />
                </div>
                <div className={styles.badge}>
                  <span className={styles.executiveText}>EXICUTIVE</span>
                  <span className={styles.partnerText}>PARTNER</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
