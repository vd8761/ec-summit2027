import React from 'react';
import Image from 'next/image';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        {/* Left Side: Image */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <div className={styles.accentBorder}></div>
            <Image 
              src="/Testimonial_photos.png" 
              alt="Monishwar Rajasekaran" 
              width={500} 
              height={500} 
              className={styles.personImage} 
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className={styles.contentColumn}>
          <span className={styles.subtitle}>TESTIMONIALS</span>
          
          <h2 className={styles.quote}>
            &ldquo;The <span className={styles.highlight}>Millionaire Summit &amp; Awards</span> brings together visionary entrepreneurs, business leaders, investors, and changemakers for a powerful exchange of ideas, connections, and opportunities.&rdquo;
          </h2>

          <div className={styles.authorNavRow}>
            <div className={styles.authorInfo}>
              <h4 className={styles.authorName}>MONISHWAR RAJASEKARAN</h4>
              <p className={styles.authorTitle}>UI/UX Designer</p>
            </div>
            
            <div className={styles.navArrows}>
              <button className={styles.arrowPrev} aria-label="Previous testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <button className={styles.arrowNext} aria-label="Next testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>

          <div className={styles.logosRow}>
            <Image src="/meta.png" alt="Meta" width={0} height={0} sizes="100vw" className={styles.logo} style={{ height: '42px', width: 'auto' }} />
            <Image src="/cocacola.png" alt="Coca-Cola" width={0} height={0} sizes="100vw" className={styles.logo} style={{ height: '28px', width: 'auto' }} />
            <Image src="/zoho.png" alt="Zoho" width={0} height={0} sizes="100vw" className={styles.logo} style={{ height: '28px', width: 'auto' }} />
            <Image src="/mskinsey.png" alt="McKinsey & Company" width={0} height={0} sizes="100vw" className={styles.logo} style={{ height: '28px', width: 'auto' }} />
            <Image src="/microsoft.png" alt="Microsoft" width={0} height={0} sizes="100vw" className={styles.logo} style={{ height: '20px', width: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
