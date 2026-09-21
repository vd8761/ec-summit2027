"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import styles from "./reserve.module.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase();
};

const isDateExpired = (dateString: string) => {
  if (!dateString || dateString === 'NIL') return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date < new Date();
};

const getPassData = (config: any) => {
  const earlyBirdBadges = [{ text: "EARLY BIRD PASS", style: "badgeBlue" }];
  if (config.earlyBirdValidUntil && config.earlyBirdValidUntil !== 'NIL') {
    if (isDateExpired(config.earlyBirdValidUntil)) {
      earlyBirdBadges.push({ text: "CLOSED", style: "badgeOutline" });
    } else {
      earlyBirdBadges.push({ text: `VALID UNTIL ${formatDate(config.earlyBirdValidUntil)}`, style: "badgeBlue" });
    }
  }

  const standardBadges = [{ text: "STANDARD PASS", style: "badgeOutline" }];
  if (config.standardValidUntil && config.standardValidUntil !== 'NIL') {
    if (isDateExpired(config.standardValidUntil)) {
      standardBadges.push({ text: "CLOSED", style: "badgeOutline" });
    } else {
      standardBadges.push({ text: `VALID UNTIL ${formatDate(config.standardValidUntil)}`, style: "badgeOutline" });
    }
  }

  const vipBadges = [{ text: "VIP PASS", style: "badgeGradient" }];
  if (config.vipValidUntil && config.vipValidUntil !== 'NIL') {
    if (isDateExpired(config.vipValidUntil)) {
      vipBadges.push({ text: "CLOSED", style: "badgeOutline" });
    } else {
      vipBadges.push({ text: `VALID UNTIL ${formatDate(config.vipValidUntil)}`, style: "badgeGradient" });
    }
  }
  if (config.vipSpotsLeft) {
    vipBadges.push({ text: `${config.vipSpotsLeft} SPOTS LEFT`, style: "badgeGradient" });
  }

  return {
    earlybird: {
      badges: earlyBirdBadges,
      price: `₹${Number(config.earlyBirdPrice).toLocaleString('en-IN')}`,
      buttonText: `Pay ₹${Number(config.earlyBirdPrice).toLocaleString('en-IN')}`,
      buttonClass: "btnBlue",
      image: "/earlybird_pass_portrait.jpg",
      rawPrice: Number(config.earlyBirdPrice)
    },
    standard: {
      badges: standardBadges,
      price: `₹${Number(config.standardPrice).toLocaleString('en-IN')}`,
      buttonText: `Pay ₹${Number(config.standardPrice).toLocaleString('en-IN')}`,
      buttonClass: "btnBlue",
      image: "/standard_pass_portrait.jpg",
      rawPrice: Number(config.standardPrice)
    },
    vip: {
      badges: vipBadges,
      price: `₹${Number(config.vipPrice).toLocaleString('en-IN')}`,
      buttonText: `Pay ₹${Number(config.vipPrice).toLocaleString('en-IN')}`,
      buttonClass: "btnGradient",
      image: "/vip_pass_portrait.jpg",
      rawPrice: Number(config.vipPrice)
    }
  };
};

function ReserveContent({ config }: { config: any }) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "vip";

  const passData = getPassData(config);
  // Type casting ensures we fall back to 'vip' if an invalid type is passed
  const data = (passData as any)[type] || passData["vip"];

  const checkIsExpired = (passType: string) => {
    let validUntil = null;
    if (passType === 'earlybird') validUntil = config?.earlyBirdValidUntil;
    if (passType === 'standard') validUntil = config?.standardValidUntil;
    if (passType === 'vip') validUntil = config?.vipValidUntil;

    if (validUntil && validUntil !== 'NIL') {
      const expiryDate = new Date(validUntil);
      if (!isNaN(expiryDate.getTime()) && expiryDate < new Date()) {
        return true;
      }
    }
    return false;
  };

  const isExpired = checkIsExpired(type);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    terms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    if (!formData.terms) newErrors.terms = "You must accept the terms and conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!executeRecaptcha) {
      setPaymentError("Security check is not loaded yet. Please wait a moment and try again.");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      const token = await executeRecaptcha('reserve');
      const recaptchaRes = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const recaptchaData = await recaptchaRes.json();
      
      if (!recaptchaData.success) {
        setPaymentError("Security verification failed. Please refresh the page and try again.");
        setIsProcessing(false);
        return;
      }
    } catch (e) {
      setPaymentError("Security check failed. Please refresh the page and try again.");
      setIsProcessing(false);
      return;
    }
    
    // Start payment processing
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setPaymentError("Payment gateway failed to load. Please check your connection.");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketTier: type,           // server resolves authoritative price from this
          name:        formData.fullName,
          email:       formData.email,
          phone:       formData.phone,
          company:     formData.company,
          designation: formData.designation,
        })
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to create order');
      }

      const options = {
        key: resData.key_id,
        amount: resData.order.amount,
        currency: resData.order.currency,
        name: "Millionaire Summit 2027",
        description: `${data.badges[0].text} Reservation`,
        order_id: resData.order.id,
        handler: async function (response: any) {
          try {
            setIsVerifying(true);
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                formData: formData,
                passType: data.badges[0].text,
                ticketTier: type,
                // amount intentionally omitted — server fetches from Razorpay API
              })
            });
            
            const verifyData = await verifyRes.json();
            
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
            
            setIsSuccess(true);
            setIsVerifying(false);
            setIsProcessing(false);
          } catch (error: any) {
            console.error('Verification Error:', error);
            setPaymentError(error.message || 'Payment successful but verification failed.');
            setIsVerifying(false);
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#003DFF"
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        setPaymentError(response.error.description || "Payment failed. Please try again.");
        setIsProcessing(false);
      });
      paymentObject.open();

    } catch (error: any) {
      console.error(error);
      setPaymentError(error.message || "Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };
  if (isSuccess) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', flexDirection: 'column', width: '100%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative Background Elements */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0, 61, 255, 0.06) 0%, rgba(255,255,255,0) 70%)', zIndex: -1, pointerEvents: 'none' }}></div>

        {/* Premium Icon Container */}
        <div style={{ 
          width: '96px', 
          height: '96px', 
          background: 'linear-gradient(135deg, #ffffff 0%, #f4f7ff 100%)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '32px',
          color: '#003DFF',
          boxShadow: '0 16px 40px rgba(0, 61, 255, 0.12), inset 0 2px 0 rgba(255,255,255,1)',
          border: '1px solid rgba(0, 61, 255, 0.08)'
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="url(#blueOrangeGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="blueOrangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#003DFF" />
                <stop offset="100%" stopColor="#FF8800" />
              </linearGradient>
            </defs>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        {/* Elegant Typography */}
        <h2 style={{ fontSize: '3.5rem', fontWeight: '400', marginBottom: '16px', fontFamily: 'var(--font-geist)', color: '#000', textAlign: 'center', letterSpacing: '-0.04em', lineHeight: '1.1' }}>
          Seat Secured.
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#555', marginBottom: '48px', fontFamily: 'var(--font-geist)', textAlign: 'center', maxWidth: '580px', lineHeight: '1.7', fontWeight: '300' }}>
          Your payment was successful and your reservation is confirmed for <strong>{formData.fullName}</strong>. Get ready to experience the most powerful gathering of minds at the Millionaire Summit & Awards 2027.
        </p>

        {/* Premium Button */}
        <Link href="/">
          <button className={`${styles.payButton} ${styles.btnGradient}`} style={{ padding: '18px 54px', width: 'auto', borderRadius: '99px', fontSize: '1rem', fontWeight: '500', boxShadow: '0 12px 28px rgba(0, 61, 255, 0.25)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 0 }}>
            Back to Homepage
          </button>
        </Link>
      </div>
    );
  }


  if (isVerifying && !isSuccess) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', flexDirection: 'column', width: '100%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0, 61, 255, 0.04) 0%, rgba(255,255,255,0) 70%)', zIndex: -1, pointerEvents: 'none' }}></div>

        {/* Loading Spinner */}
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          border: '4px solid rgba(0, 61, 255, 0.1)',
          borderTopColor: '#003DFF',
          animation: 'spin 1s ease-in-out infinite',
          marginBottom: '32px'
        }}>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: '400', marginBottom: '16px', fontFamily: 'var(--font-geist)', color: '#000', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
          Verifying Payment...
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#555', fontFamily: 'var(--font-geist)', textAlign: 'center', maxWidth: '500px', lineHeight: '1.6', fontWeight: '300' }}>
          Please wait while we confirm your transaction and secure your seat.
        </p>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', flexDirection: 'column', width: '100%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative Background Elements for Premium Feel */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(16, 52, 166, 0.04) 0%, rgba(255,255,255,0) 70%)', zIndex: -1, pointerEvents: 'none' }}></div>

        {/* Premium Icon Container */}
        <div style={{ 
          width: '88px', 
          height: '88px', 
          background: 'linear-gradient(135deg, #ffffff 0%, #f4f7ff 100%)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '32px',
          color: '#1034A6',
          boxShadow: '0 12px 32px rgba(16, 52, 166, 0.08), inset 0 2px 0 rgba(255,255,255,1)',
          border: '1px solid rgba(16, 52, 166, 0.06)'
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        {/* Elegant Typography */}
        <h2 style={{ fontSize: '3.2rem', fontWeight: '400', marginBottom: '16px', fontFamily: 'var(--font-geist)', color: '#000', textAlign: 'center', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
          Pass Unavailable
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#555', marginBottom: '48px', fontFamily: 'var(--font-geist)', textAlign: 'center', maxWidth: '540px', lineHeight: '1.6', fontWeight: '300' }}>
          The registration window for the <strong>{data.badges[0].text}</strong> has officially closed. We invite you to explore our other available pass options.
        </p>

        {/* Premium Button */}
        <Link href="/#passess">
          <button className={`${styles.payButton} ${styles.btnBlue}`} style={{ padding: '18px 48px', width: 'auto', borderRadius: '99px', fontSize: '0.95rem', fontWeight: '500', boxShadow: '0 12px 28px rgba(16, 52, 166, 0.25)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Explore Available Passes
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.splitContent}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <div className={styles.contentWrapper}>
          <div style={{ display: 'flex', gap: '8px', background: '#f5f5f5', padding: '6px', borderRadius: '12px', marginBottom: '32px' }}>
            {isDateExpired(config?.earlyBirdValidUntil) ? (
              <div style={{ flex: 1, padding: '10px', textAlign: 'center', borderRadius: '8px', background: 'transparent', color: '#999', fontWeight: '400', fontSize: '0.9rem', fontFamily: 'var(--font-geist)', opacity: 0.7, cursor: 'not-allowed' }}>
                Early Bird (Closed)
              </div>
            ) : (
              <Link href="?type=earlybird" style={{ flex: 1, textDecoration: 'none' }}>
                <div style={{ padding: '10px', textAlign: 'center', borderRadius: '8px', background: type === 'earlybird' ? '#fff' : 'transparent', boxShadow: type === 'earlybird' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', color: type === 'earlybird' ? '#1034A6' : '#666', fontWeight: type === 'earlybird' ? '600' : '400', fontSize: '0.9rem', fontFamily: 'var(--font-geist)', transition: 'all 0.2s' }}>
                  Early Bird
                </div>
              </Link>
            )}
            
            {isDateExpired(config?.standardValidUntil) ? (
              <div style={{ flex: 1, padding: '10px', textAlign: 'center', borderRadius: '8px', background: 'transparent', color: '#999', fontWeight: '400', fontSize: '0.9rem', fontFamily: 'var(--font-geist)', opacity: 0.7, cursor: 'not-allowed' }}>
                Standard (Closed)
              </div>
            ) : (
              <Link href="?type=standard" style={{ flex: 1, textDecoration: 'none' }}>
                <div style={{ padding: '10px', textAlign: 'center', borderRadius: '8px', background: type === 'standard' ? '#fff' : 'transparent', boxShadow: type === 'standard' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', color: type === 'standard' ? '#1034A6' : '#666', fontWeight: type === 'standard' ? '600' : '400', fontSize: '0.9rem', fontFamily: 'var(--font-geist)', transition: 'all 0.2s' }}>
                  Standard
                </div>
              </Link>
            )}
            
            {isDateExpired(config?.vipValidUntil) ? (
              <div style={{ flex: 1, padding: '10px', textAlign: 'center', borderRadius: '8px', background: 'transparent', color: '#999', fontWeight: '400', fontSize: '0.9rem', fontFamily: 'var(--font-geist)', opacity: 0.7, cursor: 'not-allowed' }}>
                VIP (Closed)
              </div>
            ) : (
              <Link href="?type=vip" style={{ flex: 1, textDecoration: 'none' }}>
                <div style={{ padding: '10px', textAlign: 'center', borderRadius: '8px', background: type === 'vip' ? '#fff' : 'transparent', boxShadow: type === 'vip' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', color: type === 'vip' ? '#1034A6' : '#666', fontWeight: type === 'vip' ? '600' : '400', fontSize: '0.9rem', fontFamily: 'var(--font-geist)', transition: 'all 0.2s' }}>
                  VIP
                </div>
              </Link>
            )}
          </div>

          <div className={styles.badges}>
            {data.badges.map((badge: { text: string; style: string }, index: number) => (
              <div key={index} className={`${styles.badge} ${styles[badge.style]}`}>
                {badge.text}
              </div>
            ))}
          </div>

          <div className={styles.price}>{data.price}</div>
          <div className={styles.subtitle}>Per person • Inclusive of all taxes</div>

          <div className={styles.divider}></div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {paymentError && (
                <div style={{ padding: '12px 16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontFamily: 'var(--font-geist)', fontSize: '0.9rem', border: '1px solid #fca5a5', lineHeight: '1.4' }}>
                  {paymentError}
                </div>
              )}
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name <span className={styles.asterisk}>*</span></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`} placeholder="Enter your name" />
              {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address <span className={styles.asterisk}>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={`${styles.input} ${errors.email ? styles.inputError : ""}`} placeholder="Enter your email address" />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number <span className={styles.asterisk}>*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`${styles.input} ${errors.phone ? styles.inputError : ""}`} placeholder="Enter your phone number" />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Company <span className={styles.asterisk}>*</span></label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className={`${styles.input} ${errors.company ? styles.inputError : ""}`} placeholder="Enter your Company name" />
              {errors.company && <span className={styles.errorText}>{errors.company}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Designation <span className={styles.asterisk}>*</span></label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} className={`${styles.input} ${errors.designation ? styles.inputError : ""}`} placeholder="Enter your designation" />
              {errors.designation && <span className={styles.errorText}>{errors.designation}</span>}
            </div>

            <div className={styles.checkboxGroup}>
              <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} id="terms" className={styles.checkbox} />
              <label htmlFor="terms" className={styles.termsText}>
                I agree to pay the ticket fee and accept the terms and conditions. <span className={styles.asterisk}>*</span>
              </label>
            </div>
            {errors.terms && <div className={styles.errorText} style={{marginTop: '-12px', marginBottom: '12px'}}>{errors.terms}</div>}

            <button 
              type="submit" 
              className={`${styles.payButton} ${styles[data.buttonClass]}`}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : data.buttonText}
            </button>
          </form>

          <div className={styles.secureText}>
            Payments secured by <span>Razor Pay</span>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div className={styles.imageWrapper}>
          <Image
            src={data.image}
            alt={`${type} Pass`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className={styles.imageOverlay}></div>
        </div>
      </div>
    </div>
  );
}

export default function ReserveClient({ config }: { config: any }) {
  return (
    <div className={styles.main}>
      {/* Full Width Header */}
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/EC_logo.png"
            alt="Executives Collaboration"
            width={120}
            height={32}
            style={{ objectFit: "contain" }}
          />
        </Link>
        <div className={styles.menuText}>MENU</div>
      </header>

      {/* Split Content Area inside Suspense boundary */}
      <Suspense fallback={<div style={{ padding: "5%" }}>Loading...</div>}>
        <ReserveContent config={config} />
      </Suspense>
    </div>
  );
}
