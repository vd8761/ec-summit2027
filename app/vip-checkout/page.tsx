"use client";

import styles from "./vip.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function VIPCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleCheckout = async () => {
    if (!executeRecaptcha) {
      setPaymentError("Security check is not loaded yet. Please wait a moment.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      const token = await executeRecaptcha('vip_checkout');
      const recaptchaRes = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const recaptchaData = await recaptchaRes.json();
      
      if (!recaptchaData.success) {
        setPaymentError("Security verification failed. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      // Verification succeeded. (Implement actual payment logic here later)
      alert("Verification successful! (Payment integration pending)");
      setIsProcessing(false);
    } catch (e) {
      setPaymentError("Security check failed. Please refresh the page and try again.");
      setIsProcessing(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutHeader}>
          <Link href="/" className={styles.backLink}>&larr; Back to Summit</Link>
          <Image src="/EC_logo.png" alt="EC Logo" width={180} height={60} className={styles.logo} />
        </div>

        <div className={styles.checkoutGrid}>
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            <div className={styles.summaryCard}>
              <h3>VIP Summit Pass</h3>
              <p className={styles.passDesc}>Full access to 3-day EC Millionaire Summit 2027 including masterclasses and VIP networking events.</p>
              <div className={styles.priceRow}>
                <span>Price</span>
                <span>$1,299.00</span>
              </div>
              <div className={styles.priceRow}>
                <span>Taxes & Fees</span>
                <span>$49.00</span>
              </div>
              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span>Total Due</span>
                <span>$1,348.00</span>
              </div>
            </div>

            <div className={styles.perksList}>
              <h4>VIP Perks Included:</h4>
              <ul>
                <li>✓ Priority seating</li>
                <li>✓ Exclusive VIP Networking Lunch</li>
                <li>✓ 1-on-1 Mentorship Sessions</li>
              </ul>
            </div>
          </div>

          <div className={styles.checkoutForm}>
            <h2>Checkout Details</h2>
            <form className={styles.form}>
              {paymentError && (
                <div style={{ padding: '12px 16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                  {paymentError}
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="john@company.com" required />
              </div>

              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input type="text" placeholder="Acme Corp" />
              </div>

              <h3 className={styles.paymentTitle}>Payment Information</h3>
              <div className={styles.formGroup}>
                <label>Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" required />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Expiry (MM/YY)</label>
                  <input type="text" placeholder="12/28" required />
                </div>
                <div className={styles.formGroup}>
                  <label>CVC</label>
                  <input type="text" placeholder="123" required />
                </div>
              </div>

              <button type="button" className={styles.submitBtn} onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Verifying Security..." : "Pay $1,348.00 securely"}
              </button>
              <p className={styles.secureText}>🔒 Payments are secure and encrypted.</p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
