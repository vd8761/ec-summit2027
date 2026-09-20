import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Anton } from 'next/font/google';
import styles from './FooterSection.module.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const NAV_LINKS = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'WHY IT MATTERS', href: '/#why-it-matters' },
  { label: 'KEYNOTE', href: '/#keynote' },
  { label: 'SPEAKERS', href: '/#keynote' }, // Speakers are in the keynote section
  { label: 'VENUE', href: '/#venue' },
  { label: 'PANELLIST', href: '/#panels' },
  { label: 'AGENDA', href: '/#agenda' },
  { label: 'GALLERY', href: '/#gallery' },
  { label: 'TESTIMONIALS', href: '/#testimonials' },
  { label: 'PASSESS', href: '/#passess' },
  { label: 'PARTNERS', href: '/#partners' }
];

const SOCIAL_LINKS = [
  { id: 'linkedin', path: '/linkedin.svg', alt: 'LinkedIn', url: 'https://www.linkedin.com/company/executivescollaborationbusinessnetwork' },
  { id: 'instagram', path: '/instagram.svg', alt: 'Instagram', url: 'https://www.instagram.com/executivescollaboration/' },
  { id: 'facebook', path: '/facebook.svg', alt: 'Facebook', url: 'https://www.facebook.com/executivescollaboration/' },
  { id: 'youtube', path: '/youtube.svg', alt: 'YouTube', url: 'https://www.youtube.com/@ExecutivesCollaboration' },
];

export default function FooterSection() {
  return (
    <footer className={styles.section}>
      <div className={styles.topContainer}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <Image
            src="/EC_logo.svg"
            alt="Executives Collaboration"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Massive Typography */}
        <div className={`${styles.titleWrapper} ${anton.className}`}>
          <span className={styles.millionaireSummit}>MILLIONAIRE SUMMIT</span>
          <span className={styles.year}>2027</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarContainer}>
          
          <div className={styles.bottomLeftGroup}>
            <div className={styles.bottomText}>
              ALL RIGHTS RESERVED @ EXECUTIVE COLOBORATION
            </div>
            <div className={styles.links}>
              <Link href="/privacy-policy" className={styles.bottomText}>PRIVACY POLICY</Link>
              <span className={styles.separator}>|</span>
              <Link href="/terms-and-conditions" className={styles.bottomText}>TERMS OF SERVICES</Link>
            </div>
          </div>

          <div className={styles.socials}>
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.id} 
                href={social.url}
                target={social.url !== '#' ? "_blank" : undefined}
                rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                className={styles.socialIconWrapper}
              >
                <Image
                  src={social.path}
                  alt={social.alt}
                  width={12}
                  height={12}
                  className={styles.socialIcon}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
