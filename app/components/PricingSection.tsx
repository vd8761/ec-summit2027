import React from 'react';
import Link from 'next/link';
import styles from './PricingSection.module.css';

export default function PricingSection({ config }: { config?: any }) {
  const CheckIcon = ({ gradient = false }: { gradient?: boolean }) => (
    <div className={`${styles.checkIcon} ${gradient ? styles.checkIconGradient : ''}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );

  // Configuration parsing with fallbacks
  const earlyBirdPrice = config?.earlyBirdPrice ? `₹${Number(config.earlyBirdPrice).toLocaleString('en-IN')}` : "₹5,000";
  const standardPrice = config?.standardPrice ? `₹${Number(config.standardPrice).toLocaleString('en-IN')}` : "₹10,000";
  const vipPrice = config?.vipPrice ? `₹${Number(config.vipPrice).toLocaleString('en-IN')}` : "₹20,000";

  const earlyBirdValidUntil = config?.earlyBirdValidUntil && config.earlyBirdValidUntil !== 'NIL' ? config.earlyBirdValidUntil : null;
  const standardValidUntil = config?.standardValidUntil && config.standardValidUntil !== 'NIL' ? config.standardValidUntil : null;
  const vipValidUntil = config?.vipValidUntil && config.vipValidUntil !== 'NIL' ? config.vipValidUntil : null;

  const vipSpotsLeft = config?.vipSpotsLeft || "19";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase();
  };

  const isDateExpired = (dateString: string | null) => {
    if (!dateString || dateString === 'NIL') return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date < new Date();
  };

  const isEarlyBirdExpired = isDateExpired(earlyBirdValidUntil);
  const isStandardExpired = isDateExpired(standardValidUntil);
  const isVipExpired = isDateExpired(vipValidUntil);

  return (
    <section id="passess" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>
          RESERVE YOUR SEAT
        </span>
        <h2 className={styles.title}>GET YOUR PASS</h2>
      </div>

      <div className={styles.cardsContainer}>
        {/* Standard Pass */}
        <div className={`${styles.card} ${styles.cardStandard}`}>
          <div className={styles.tagsRow}>
            <span className={`${styles.tag} ${styles.tagOutline}`}>STANDARD PASS</span>
            <div className={styles.tagDivider}></div>
            <span className={`${styles.tag} ${styles.tagEarlyBirdBadge}`}>EARLY BIRD PASS</span>
            {isStandardExpired ? (
              <>
                <div className={styles.tagDivider}></div>
                <span className={`${styles.tag} ${styles.tagOutline}`}>CLOSED</span>
              </>
            ) : standardValidUntil ? (
              <>
                <div className={styles.tagDivider}></div>
                <span className={`${styles.tag} ${styles.tagOutline}`}>VALID UNTIL {formatDate(standardValidUntil)}</span>
              </>
            ) : null}
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.originalPrice}>₹10,000</span>
            <span className={styles.offerPrice}>{earlyBirdPrice}</span>
          </div>
          <p className={styles.priceSubtext}>Per person • Inclusive of all taxes</p>

          {isStandardExpired ? (
            <button className={`${styles.reserveBtn} ${styles.btnDisabled}`} disabled>
              Closed
            </button>
          ) : (
            <Link href="/reserve?type=standard" style={{ width: '100%' }}>
              <button className={`${styles.reserveBtn} ${styles.btnBlue}`}>
                Apply Now
              </button>
            </Link>
          )}

          <div className={styles.featuresDivider}></div>
          <h4 className={styles.featuresTitle}>WHAT&apos;S INCLUDED</h4>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <CheckIcon /> Standard Seating with delegated
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Full event access
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Hi-Tea Networking
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Business Lunch
            </li>
          </ul>

          {/* Early Bird Callout Card Box */}
          <div className={styles.earlyBirdCardBox}>
            <div className={styles.earlyBirdBoxTop}>
              <span className={styles.earlyBirdPillBadge}>EARLY BIRD SPECIAL</span>
              <span className={styles.earlyBirdDiscount}>SAVE 50%</span>
            </div>
            <p className={styles.earlyBirdBoxDesc}>
              Seats filling fast! Grab the <strong>{earlyBirdPrice}</strong> early bird rate before it increases to <strong>₹10,000</strong>.
            </p>
          </div>
        </div>

        {/* Executive Round Table Pass */}
        <div className={`${styles.card} ${styles.cardExecutive}`}>
          {/* Top Tab: Limited to 70 Seats */}
          <div className={styles.limitedSeatsTab}>
            LIMITED TO 70 SEATS
          </div>

          {/* Diagonal Red Ribbon: Sold Out */}
          <div className={styles.ribbonWrapper}>
            <div className={styles.soldOutRibbon}>
              Sold Out
            </div>
          </div>

          <div className={styles.tagsRow}>
            <span className={`${styles.tag} ${styles.tagOutline}`}>EXECUTIVE ROUND TABLE PASS</span>
            <div className={styles.tagDivider}></div>
            <span className={`${styles.tag} ${styles.tagOutline}`}>SOLD OUT</span>
          </div>

          <h3 className={styles.price} style={{ color: '#888' }}>₹12,000</h3>
          <p className={styles.priceSubtext}>Per person • Exclusive round table access</p>

          <button className={`${styles.reserveBtn} ${styles.btnDisabled}`} disabled>
            Sold Out
          </button>

          <div className={styles.featuresDivider}></div>
          <h4 className={styles.featuresTitle}>WHAT&apos;S INCLUDED</h4>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <CheckIcon /> Round table seating millionaires, awardees & executives collaboration members closer
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Full event access + Executives Networking Access
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Hi-Tea Networking
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Business Lunch
            </li>
          </ul>
        </div>

        {/* VIP Pass */}
        <div className={`${styles.card} ${styles.cardVip}`}>
          <div className={styles.tagsRow}>
            <span className={`${styles.tag} ${styles.tagGradient}`}>VIP PASS</span>
            {vipSpotsLeft && (
              <>
                <div className={styles.tagDivider}></div>
                <span className={`${styles.tag} ${styles.tagGradient}`}>ONLY {vipSpotsLeft} SPOTS LEFT</span>
              </>
            )}
            {isVipExpired ? (
              <>
                <div className={styles.tagDivider}></div>
                <span className={`${styles.tag} ${styles.tagOutline}`}>CLOSED</span>
              </>
            ) : vipValidUntil ? (
              <>
                <div className={styles.tagDivider}></div>
                <span className={`${styles.tag} ${styles.tagGradient}`}>VALID UNTIL {formatDate(vipValidUntil)}</span>
              </>
            ) : null}
          </div>

          <h3 className={styles.price}>{vipPrice}</h3>
          <p className={styles.priceSubtext}>Per person • Inclusive of all taxes</p>

          {isVipExpired ? (
            <button className={`${styles.reserveBtn} ${styles.btnDisabled}`} disabled>
              Closed
            </button>
          ) : (
            <Link href="/reserve?type=vip" style={{ width: '100%' }}>
              <button className={`${styles.reserveBtn} ${styles.btnGradient}`}>
                Reserve VIP Spot
              </button>
            </Link>
          )}

          <div className={styles.featuresDivider}></div>
          <h4 className={styles.featuresTitle}>WHAT&apos;S INCLUDED</h4>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> VIP Seating with Speakers, Panelists, & Distinguished Guest
            </li>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> Full event access + VIP Networking Access
            </li>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> Hi-Tea Networking
            </li>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> Business Lunch
            </li>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> Special Attender Appointed To Serve Your Needs
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
