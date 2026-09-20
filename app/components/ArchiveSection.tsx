import React from 'react';
import Image from 'next/image';
import styles from './SummitArchive.module.css';

export default function SummitArchive() {
  return (
    <section id="gallery" className={styles.archiveSection}>
      <div className={styles.archiveContainer}>
        <div className={styles.centerText}>
          <h2 className={styles.title}>THE SUMMIT<br/>ARCHIVE</h2>
        </div>

        {/* Scattered Images */}
        <div className={`${styles.imgWrapper} ${styles.img1}`}>
          <Image src="/photo1.webp" alt="Archive 1" fill style={{ objectFit: 'cover' }} />
        </div>
        
        <div className={`${styles.imgWrapper} ${styles.img2}`}>
          <Image src="/photo2.webp" alt="Archive 2" fill style={{ objectFit: 'cover' }} />
        </div>
        
        <div className={`${styles.imgWrapper} ${styles.img3}`}>
          <Image src="/photo3.webp" alt="Archive 3" fill style={{ objectFit: 'cover' }} />
        </div>
        
        <div className={`${styles.imgWrapper} ${styles.img4}`}>
          <Image src="/photo4.webp" alt="Archive 4" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </div>
        
        <div className={`${styles.imgWrapper} ${styles.img5}`}>
          <Image src="/photo5.webp" alt="Archive 5" fill style={{ objectFit: 'cover' }} />
        </div>
        
        <div className={`${styles.imgWrapper} ${styles.img6}`}>
          <Image src="/photo6.webp" alt="Archive 6" fill style={{ objectFit: 'cover' }} />
        </div>
        
        <div className={`${styles.imgWrapper} ${styles.img7}`}>
          <Image src="/photo8.webp" alt="Archive 7" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className={`${styles.imgWrapper} ${styles.img8}`}>
          <Image src="/photo7.webp" alt="Archive 8" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
}
