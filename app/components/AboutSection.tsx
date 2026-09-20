import React from 'react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>ABOUT</div>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            The Millionaire Summit & Awards brings together visionary entrepreneurs, business leaders, investors, and changemakers for a powerful exchange of ideas, connections, and opportunities.
          </p>
          <p className={styles.paragraph}>
            An exclusive platform for high-value conversations, executive collaboration, strategic networking, and recognition—bringing ambitious minds together to shape what comes next.
          </p>
        </div>
      </div>
    </section>
  );
}
