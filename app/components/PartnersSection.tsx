import React from 'react';
import Image from 'next/image';
import styles from './PartnersSection.module.css';

interface Partner {
  id: string;
  name: string;
  logoPath: string;
  wrapperClass: string;
}

const partners: Partner[] = [
  {
    id: 'vgro',
    name: 'VGRO Global Finser',
    logoPath: '/vgro_global_finser_pvt_ltd_logo.webp',
    wrapperClass: styles.wrapperVgro,
  },
  {
    id: 'contus',
    name: 'Contus Tech',
    logoPath: '/contus_logo.webp',
    wrapperClass: styles.wrapperContus,
  },
  {
    id: 'solidpro',
    name: 'Solidpro',
    logoPath: '/headr-nslog-logo.webp',
    wrapperClass: styles.wrapperSolidpro,
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>IN ASSOCIATION WITH</h2>
        
        <div className={styles.cardsContainer}>
          {partners.map((partner) => (
            <div key={partner.id} className={styles.card}>
              <div className={`${styles.logoWrapper} ${partner.wrapperClass}`}>
                <Image
                  src={partner.logoPath}
                  alt={`${partner.name} logo`}
                  fill
                  className={styles.logo}
                  sizes="(max-width: 768px) 220px, 280px"
                  unoptimized
                />
              </div>
              <div className={styles.badge}>
                <span className={styles.executiveText}>EXECUTIVE</span>
                <span className={styles.partnerText}>PARTNER</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
