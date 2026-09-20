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
  
  const vipSpotsLeft = config?.vipSpotsLeft || "10";

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
        {/* Early Bird Pass */}
        <div className={`${styles.card} ${styles.cardEarlyBird} ${isEarlyBirdExpired ? styles.cardExpired : ''}`}>
          <div className={styles.tagsRow}>
            <span className={`${styles.tag} ${styles.tagBlue}`}>EARLY BIRD PASS</span>
            {isEarlyBirdExpired ? (
              <>
                <div className={styles.tagDivider}></div>
                <span className={`${styles.tag} ${styles.tagOutline}`}>CLOSED</span>
              </>
            ) : earlyBirdValidUntil ? (
              <>
                <div className={styles.tagDivider}></div>
                <span className={`${styles.tag} ${styles.tagBlue}`}>VALID UNTIL {formatDate(earlyBirdValidUntil)}</span>
              </>
            ) : null}
          </div>
          
          <h3 className={styles.price}>{earlyBirdPrice}</h3>
          <p className={styles.priceSubtext}>Per person • Inclusive of all taxes</p>
          
          {isEarlyBirdExpired ? (
            <button className={`${styles.reserveBtn} ${styles.btnDisabled}`} disabled>
              Closed
            </button>
          ) : (
            <Link href="/reserve?type=earlybird" style={{ width: '100%' }}>
              <button className={`${styles.reserveBtn} ${styles.btnBlue}`}>
                Apply now
              </button>
            </Link>
          )}
          
          <div className={styles.featuresDivider}></div>
          <h4 className={styles.featuresTitle}>WHAT&apos;S INCLUDED</h4>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <CheckIcon /> Full event access
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Networking sessions
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Refreshments
            </li>
          </ul>
        </div>

        {/* Standard Pass */}
        <div className={`${styles.card} ${styles.cardStandard}`}>
          <div className={styles.tagsRow}>
            <span className={`${styles.tag} ${styles.tagOutline}`}>STANDARD PASS</span>
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
          
          <h3 className={styles.price}>{standardPrice}</h3>
          <p className={styles.priceSubtext}>Per person • Inclusive of all taxes</p>
          
          {isStandardExpired ? (
            <button className={`${styles.reserveBtn} ${styles.btnDisabled}`} disabled>
              Closed
            </button>
          ) : (
            <Link href="/reserve?type=standard" style={{ width: '100%' }}>
              <button className={`${styles.reserveBtn} ${styles.btnBlue}`}>
                Apply now
              </button>
            </Link>
          )}
          
          <div className={styles.featuresDivider}></div>
          <h4 className={styles.featuresTitle}>WHAT&apos;S INCLUDED</h4>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <CheckIcon /> Full event access
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Networking sessions
            </li>
            <li className={styles.featureItem}>
              <CheckIcon /> Refreshments
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
                <span className={`${styles.tag} ${styles.tagGradient}`}>{vipSpotsLeft} SPOTS LEFT</span>
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
          <h4 className={styles.featuresTitle}>INCLUDES EVERYTHING IN STANDARD PLAN +</h4>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> VIP Priority seating
            </li>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> Meet & greet
            </li>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> All Standard benefits
            </li>
            <li className={styles.featureItem}>
              <CheckIcon gradient /> Hoodies and bags
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
