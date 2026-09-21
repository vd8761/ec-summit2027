"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';
import ScrollNav from "./ScrollNav";
import scheduleStyles from "./schedule.module.css";
import ArchiveSection from "./components/ArchiveSection";
import EventBannerSection from "./components/EventBannerSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PricingSection from "./components/PricingSection";
import PartnersSection from "./components/PartnersSection";
import FooterSection from "./components/FooterSection";

const scheduleData = [
  {
    time: "08:00 AM",
    title: <>REGISTRATION &<br />NETWORKING</>,
    miniTitle: "",
    desc: "Exploring how a new generation of entrepreneurs is redefining growth, innovation, leadership, and success.",
  },
  {
    time: "09:00 AM",
    title: <>OPENING<br />CEREMONY</>,
    miniTitle: "",
    desc: <>Welcome to the <strong>Millionaire Summit & Awards.</strong> Setting the stage for a day of ideas, conversations, and possibilities.</>,
  },
  {
    time: "09:30 AM",
    title: <>KEYNOTE<br />SESSION</>,
    miniTitle: "",
    desc: "Hear from a visionary leader on ambition, leadership, innovation, and building businesses that create lasting impact.",
  },
  {
    time: "10:30 AM",
    title: <>THE FUTURE<br />OF BUSINESS</>,
    miniTitle: "Executive Panel Discussion",
    desc: "A powerful conversation exploring growth, leadership, innovation, investment, and the forces shaping tomorrow's businesses.",
  },
  {
    time: "12:00 PM",
    title: <>EXECUTIVE<br />NETWORKING</>,
    miniTitle: "",
    desc: "Connect with entrepreneurs, founders, investors, and industry leaders in an environment built for meaningful conversations.",
  },
  {
    time: "01:00 PM",
    title: <>NETWORKING<br />LUNCH</>,
    miniTitle: "",
    desc: "An opportunity to continue conversations, exchange ideas, and build valuable relationships over lunch.",
  },
  {
    time: "02:30 PM",
    title: <>STRATEGIC<br />CONVERSATIONS</>,
    miniTitle: "",
    desc: "Exploring new perspectives, emerging opportunities, and the decisions shaping the future of business.",
  },
  {
    time: "03:30 PM",
    title: <>THE NEW AGE OF<br />ENTREPRENEURSHIP</>,
    miniTitle: "Executive Panel Discussion",
    desc: "A conversation on building, scaling, adapting, and creating businesses for a rapidly evolving world.",
  },
  {
    time: "04:30 PM",
    title: <>MILLIONAIRE<br />AWARDS</>,
    miniTitle: "",
    desc: "Celebrating exceptional entrepreneurs, leaders, businesses, and achievements that inspire progress and create impact.",
    isGradient: true,
  },
  {
    time: "05:00 PM",
    title: <>CLOSING &<br />NETWORKING</>,
    miniTitle: "",
    desc: "Take the conversations beyond the summit. Connect, collaborate, and explore what comes next.",
  }
];

export default function Home({ pricingConfig }: { pricingConfig?: any }) {
  const heroRef = useRef<HTMLElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 21,
    minutes: 17,
    seconds: 8
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const targetDate = new Date("January 8, 2027 08:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsLoaded(true);
        return false;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
      setIsLoaded(true);
      return true;
    };

    calculateTimeLeft();
    const interval = setInterval(() => {
      const shouldContinue = calculateTimeLeft();
      if (!shouldContinue) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoCenter}>
            <Image src="/EC_logo.png" alt="EC Summit Logo" width={150} height={40} style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </header>

      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image src="/Hero_banner_background.png" alt="Hero Background" fill style={{ objectFit: 'contain', objectPosition: 'bottom' }} priority />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>MILLIONAIRE</span>
            <span className={styles.titleLine}>SUMMIT &</span>
            <span className={styles.titleGradient}>AWARDS 2027</span>
          </h1>
          <p className={styles.heroLocation}>08 JANUARY 2027, CHENNAI</p>

          <div className={styles.countdownContainer}>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberDark : styles.skeletonText}>{isLoaded ? String(timeLeft.days).padStart(2, '0') : '00'}</span>
              <label className={styles.countdownLabel}>DAYS</label>
            </div>
            <div className={styles.countdownDivider}></div>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberDark : styles.skeletonText}>{isLoaded ? String(timeLeft.hours).padStart(2, '0') : '00'}</span>
              <label className={styles.countdownLabel}>HOURS</label>
            </div>
            <div className={styles.countdownDivider}></div>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberDark : styles.skeletonText}>{isLoaded ? String(timeLeft.minutes).padStart(2, '0') : '00'}</span>
              <label className={styles.countdownLabel}>MINUTES</label>
            </div>
            <div className={styles.countdownDivider}></div>
            <div className={styles.countdownItem}>
              <span className={isLoaded ? styles.countdownNumberGradient : styles.skeletonText}>{isLoaded ? String(timeLeft.seconds).padStart(2, '0') : '00'}</span>
              <label className={styles.countdownLabel}>SECONDS</label>
            </div>
          </div>

          <div className={styles.heroActions}>
            <button
              className={styles.btnSecure}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('passess');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              SECURE YOUR PASS
            </button>
            <button
              className={styles.btnRecap}
              onClick={() => setIsVideoOpen(true)}
            >
              SUMMIT 2026 RECAP
            </button>
          </div>

          <div className={styles.scrollIndicator}>
            <div className={styles.mouse}>
              <div className={styles.wheel}></div>
            </div>
            <div className={styles.arrowDown}></div>
          </div>
        </div>
      </section>

      <ScrollNav />

      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutLabelContainer}>
            <span className={styles.aboutLabel}>
              <span className={styles.gradientTextOrangeToBlue}>ABOUT</span>
            </span>
          </div>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              The <span className={styles.textBlueBold}>Millionaire Summit & Awards</span> brings together visionary entrepreneurs, business leaders, investors, and changemakers for a powerful exchange of ideas, connections, and opportunities.
            </p>
            <p className={styles.aboutText}>
              An exclusive platform for high-value conversations, executive collaboration, strategic networking, and recognition—bringing ambitious minds together to shape what comes next.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.groupPhotoSection}>
        <div className={styles.groupPhotoWrapper}>
          <Image
            src="/about_group_photo.png"
            alt="Millionaire Summit Attendees"
            fill
            quality={100}
            unoptimized={true}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className={styles.statsBanner}>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>522<span className={styles.statOrange}>+</span></h3>
            <p className={styles.statLabel}>ATTENDEES</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3 className={`${styles.statNumber} ${styles.statGradientText}`}>10<span>+</span></h3>
            <p className={styles.statLabel}>PANEL DISCUSSION</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>90<span className={styles.statOrange}>+</span></h3>
            <p className={styles.statLabel}>SPEAKERS</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3 className={`${styles.statNumber} ${styles.statGradientReverseText}`}>5B<span>+</span></h3>
            <p className={styles.statLabel}>NET WORTH REPRESENTED</p>
          </div>
        </div>
      </section>

      <section id="why-it-matters" className={styles.mattersSection}>
        <div className={styles.container}>
          <div className={styles.mattersHeader}>
            <div className={styles.mattersTitleBox}>
              <p className={styles.mattersSubheading}>
                <span className={styles.gradientTextOrangeToBlue}>WHY IT MATTERS</span>
              </p>
              <h2 className={styles.mattersTitle}>
                WHERE CONNECTIONS<br />
                <span className={styles.titleIndent}>BECOME POSSIBILITIES.</span>
              </h2>
            </div>
            <div className={styles.mattersDescBox}>
              <p className={styles.mattersDesc}>
                Bringing Together People Who Are Building, Investing,<br />
                Leading, And Shaping The Future Of Business.
              </p>
            </div>
          </div>

          <div className={styles.mattersGrid}>
            {/* Card 1 */}
            <div className={styles.matterCard}>
              <h3 className={styles.cardTitle}>CONNECT</h3>
              <div className={styles.cardIconWrapper}>
                <Image src="/connect.png" alt="Connect" width={100} height={100} />
              </div>
              <p className={styles.cardDesc}>Meet Accomplished Leaders,<br />Investors, And Changemakers.</p>
            </div>
            {/* Card 2 */}
            <div className={styles.matterCard}>
              <h3 className={styles.cardTitle}>COLLABORATE</h3>
              <div className={styles.cardIconWrapper}>
                <Image src="/collaborate.svg" alt="Collaborate" width={100} height={100} />
              </div>
              <p className={styles.cardDesc}>Exchange Ideas And Build<br />Meaningful Partnerships.</p>
            </div>
            {/* Card 3 */}
            <div className={styles.matterCard}>
              <h3 className={styles.cardTitle}>CREATE</h3>
              <div className={styles.cardIconWrapper}>
                <Image src="/create.png" alt="Create" width={100} height={100} />
              </div>
              <p className={styles.cardDesc}>Turn Conversations Into<br />Opportunities And Action.</p>
            </div>
            {/* Card 4 */}
            <div className={styles.matterCard}>
              <h3 className={styles.cardTitle}>GROW</h3>
              <div className={styles.cardIconWrapper}>
                <Image src="/grow.svg" alt="Grow" width={100} height={100} />
              </div>
              <p className={styles.cardDesc}>Scale Your Business With<br />Exclusive Resources And Mentorship.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="keynote" className={styles.keynoteSection}>
        <div className={styles.keynoteHeader}>
          <div className={styles.keynoteBadge}>
            <span className={styles.gradientTextOrangeToBlue}>KEY NOTES</span>
          </div>
        </div>

        {/* Marquee Banner */}
        <div className={styles.speakersBannerContainer}>
          <div className={styles.speakersBannerTrack}>
            {/* We duplicate the content a few times for smooth infinite scrolling */}
            {[1, 2, 3].map((group) => (
              <div key={group} className={styles.speakersBannerGroup}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={styles.speakersBannerItem}>
                    <div className={styles.gradientDot}></div>
                    <span className={styles.speakersBannerText}>SPEAKERS</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Speakers Grid */}
        <div className={styles.keynoteContainer}>
          <div className={styles.speakersGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              return (
                <div key={num} className={styles.keynoteCard}>
                  <div className={styles.keynoteCardTop}>
                    <div className={styles.keynoteRole}>SPEAKER</div>
                    <div className={styles.keynoteName}>TO BE ANNOUNCED</div>
                  </div>
                  <div className={styles.keynoteCardImage} style={{ backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: '#444', fontSize: '1rem', letterSpacing: '4px', fontWeight: 500, textAlign: 'center', textTransform: 'uppercase' }}>
                      Revealing<br />Soon
                    </div>
                    <div className={styles.cardLogoOverlay}>
                      <Image src="/EC_logo.png" alt="EC Logo" width={120} height={32} style={{ objectFit: 'contain' }} className={styles.logoInvert} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="panels" className={styles.panelSection}>
        <div className={styles.container}>
          <div className={styles.panelSectionHeader}>
            <div className={styles.smallSubtitle}>
              <span className={styles.gradientTextOrangeToBlue}>CONVERSATIONS</span>
            </div>
            <h2 className={styles.sectionTitleLeft}>PANEL DISCUSSIONS</h2>
          </div>

          <div className={styles.panelGrid}>
            <div className={styles.panelHeaderBlock}>
              <div className={`${styles.panelNumber} ${styles.colSpan2}`}>
                <span className={styles.textGradient}>01</span>
              </div>
              <div className={`${styles.panelHeaderTitle} ${styles.colSpan5}`}>
                The new Age of <br />
                <strong>Entrepreneurship</strong>
              </div>
              <div className={`${styles.panelHeaderDesc} ${styles.colSpan5}`}>
                Exploring How A New Generation Of Entrepreneurs Is<br className={styles.hideMobile} /> Redefining Growth, Innovation, Leadership, And<br className={styles.hideMobile} /> Success.
              </div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className={styles.panelCard}>
                <div className={styles.panelCardTop}>
                  <div className={styles.keynoteRole}>PANELIST</div>
                  <div className={styles.keynoteName}>TO BE ANNOUNCED</div>
                </div>
                <div className={styles.panelCardImage} style={{ backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#444', fontSize: '0.9rem', letterSpacing: '3px', fontWeight: 500, textAlign: 'center', textTransform: 'uppercase' }}>
                    Revealing<br />Soon
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.panelCardEmpty}></div>
          </div>

          <div className={styles.panelGrid}>
            <div className={styles.panelHeaderBlock}>
              <div className={`${styles.panelNumber} ${styles.colSpan3}`}>
                <span className={styles.textGradient}>02</span>
              </div>
              <div className={`${styles.panelHeaderTitle} ${styles.colSpan4}`}>
                From Vision to <br />
                <strong>Global Impact</strong>
              </div>
              <div className={`${styles.panelHeaderDesc} ${styles.colSpan5}`}>
                Turning Bold Ideas Into Scalable Businesses,<br className={styles.hideMobile} /> Meaningful Influence, And Lasting Global Impact.
              </div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={`panel2-${num}`} className={styles.panelCard}>
                <div className={styles.panelCardTop}>
                  <div className={styles.keynoteRole}>PANELIST</div>
                  <div className={styles.keynoteName}>TO BE ANNOUNCED</div>
                </div>
                <div className={styles.panelCardImage} style={{ backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#444', fontSize: '0.9rem', letterSpacing: '3px', fontWeight: 500, textAlign: 'center', textTransform: 'uppercase' }}>
                    Revealing<br />Soon
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.panelCardEmpty}></div>
          </div>
        </div>
      </section>


      <section id="agenda" className={scheduleStyles.scheduleSection}>
        <div className={styles.container}>
          <div className={scheduleStyles.scheduleSectionHeader}>
            <span className={scheduleStyles.scheduleSubtitle}>EVENT SCHEDULE</span>
            <h2 className={scheduleStyles.scheduleTitle}>THE DAY, BY DESIGN</h2>
          </div>
          <div className={scheduleStyles.scheduleGrid}>
            {scheduleData.map((item, index) => (
              <div key={index} className={scheduleStyles.scheduleRow}>
                <div className={scheduleStyles.scheduleTime}>{item.time}</div>
                <div className={scheduleStyles.scheduleRowTitleBlock}>
                  {item.miniTitle && <span className={scheduleStyles.scheduleRowMiniTitle}>{item.miniTitle}</span>}
                  <span className={`${scheduleStyles.scheduleRowTitle} ${item.isGradient ? scheduleStyles.gradientTitle : ''}`}>{item.title}</span>
                </div>
                <div className={scheduleStyles.scheduleRowDesc}>{item.desc}</div>
                <div className={`${scheduleStyles.scheduleRowImage} ${scheduleStyles.schedulePlaceholder}`}>
                  Revealing<br />Soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArchiveSection />

      <TestimonialsSection />

      <PricingSection config={pricingConfig} />

      <EventBannerSection />

      <PartnersSection />

      <FooterSection />

      <ModalVideo 
        channel='youtube' 
        isOpen={isVideoOpen} 
        videoId="ZDXvlawsykE" 
        onClose={() => setIsVideoOpen(false)} 
        youtube={{ rel: 0, autoplay: 1 }}
      />
    </main>
  );
}
