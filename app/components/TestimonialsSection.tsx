"use client";

import React, { useState, useEffect } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonialsData = [
  {
    id: 1,
    type: "youtube",
    videoId: "zluEFLUGoNY",
    quote: "Innovating tradition without compromising on craft. Manickavasagam, Director at RmKV Silks, discusses transforming legacy silk saree designs to meet evolving customer demands.\n\nFaced with feedback about repetitive patterns, RmKV introduced groundbreaking designs—like weaving Bharathiyar’s songs into borders with unique Bharatanatyam dance poses. By prioritizing quality and constant innovation, RmKV established a strong brand identity that draws customers globally.",
    authorName: "MANICKAVASAGAM",
    authorTitle: "Director at RmKV Silks"
  },
  {
    id: 2,
    type: "instagram",
    videoId: "DbZgzt1h7XV",
    quote: "How do you scale centuries-old textile traditions into a modern global brand without losing their soul? When Aparna Thiyagarajan took the stage, she broke down how Shobitam is bridging the gap between traditional Indian craftsmanship and the global market.\n\nBuilding a global enterprise isn’t just about the products being sold; it’s about nurturing a thriving ecosystem. From championing traditional artisans to bridging gender gaps and scaling regional startup energy onto the world stage, this is what modern, impact-driven entrepreneurship looks like.",
    authorName: "APARNA THIYAGARAJAN",
    authorTitle: "Shobitam"
  },
  {
    id: 3,
    type: "youtube",
    videoId: "EzS44lZLXjc",
    quote: "Bootstrapping a startup from ₹20 Lakhs to a $10M–$12M enterprise requires shifting your strategy as technology evolves.\n\nWhen scaling a tech business, technical capability gets you started, but client relationship alignment drives sustainable growth. Understanding your client’s core business vision and goals is what transforms a simple service provider into a long-term strategic partner.\n\nAs the industry matures, the balance between technical development and strategic sales shifts dramatically. Scaling to an international level depends on building dedicated global sales teams that can communicate value, connect solutions to business outcomes, and maintain client trust.",
    authorName: "SPEAKER THREE",
    authorTitle: "Tech Founder"
  },
  {
    id: 4,
    type: "instagram",
    videoId: "DcxD6hmTX5C",
    quote: "You can’t scale a business past your own limits—unless you build a team that is smarter than you.\n\nTo transition from an individual contributor to a true leader, you must step beyond single-handed execution. Relying solely on your personal skills caps your capacity and limits your growth. Scaling a business requires a fundamental mindset shift: trading personal ego for organizational security.\n\nReal leadership begins when you hire talent that exceeds your own capabilities across marketing, technology, and operations. Surrounding yourself with experts who complement your skill set unlocks sustainable, long-term growth.",
    authorName: "SPEAKER FOUR",
    authorTitle: "Leadership & Strategy"
  },
  {
    id: 5,
    type: "instagram",
    videoId: "Dc7XFi2BdZp",
    quote: "Protecting the soul of a brand means prioritizing impact over quick expansion.\n\nWhen scale threatens purpose, true leaders choose to safeguard their core vision. In this discussion from the Executives Collaboration Millionaire Summit, the speaker highlights how preserving traditional artisan heritage takes precedence over rapid growth.\n\nFor many traditional weaving families, younger generations often turn away from artisan crafts due to a perceived lack of social respect or economic stability. Rather than chasing volume, true disruption comes from transforming this industry narrative—ensuring artisans lead a life of dignity while acting as genuine custodians of cultural heritage.",
    authorName: "SPEAKER FIVE",
    authorTitle: "Conscious Entrepreneurship"
  },
  {
    id: 6,
    type: "youtube",
    videoId: "_kBOtZ5ye0I",
    quote: "Failing to protect your brand identity early can cost you your market dominance.\n\nWhen scaling an innovative product, product validation is only half the battle—protecting your Intellectual Property (IP) and brand trademark is critical. In the early stages, skipping proper legal advisory and failing to register IP leads straight into the “Copycat Trap.” When competitors realize a business model is profitable, unbranded products get genericized and copied across the market.\n\nTo stand out from identical market options, building strong brand positioning under a registered identity like Aaladipattiyan establishes immediate recall. Establishing a trademarked signature menu item—such as Karupatti Coffee—turns a generic commodity into a high-margin brand asset.",
    authorName: "SPEAKER SIX",
    authorTitle: "Aaladipattiyan Karupatti Coffee"
  },
  {
    id: 7,
    type: "instagram",
    videoId: "DcSKVaNTNiQ",
    quote: "Empowering Business Leadership, AI Innovation & Global Strategic Alliances!\n\nTrue organizational transformation happens when visionary leaders gather to exchange high-impact insights and actionable knowledge. Hear from Anandhi, Director of Moti Solutions and Founder of Mrania Consulting, as she shares her inspiring reflections from the Millionaire Summit & Awards 2026.\n\nShe praised Mr. Aditya’s insightful keynote on AI innovation and the technological shifts set to define the upcoming decade. She also underscored the value of panel discussions, noting how candid leadership experiences provided answers to strategic questions many entrepreneurs hadn’t even thought to ask.",
    authorName: "ANANDHI",
    authorTitle: "Director of Moti Solutions & Founder of Mrania Consulting"
  },
  {
    id: 8,
    type: "instagram",
    videoId: "DcUvJoDBtSi",
    quote: "Mental wellness isn’t just a personal journey—it’s a corporate responsibility.\n\nIn this insightful highlight from the Millionaire Summit & Awards, Mr. Mohammed Hanifa Tajudin shares key takeaways on why employee mental health and community-first initiatives are essential for long-term business growth and national prosperity.\n\n“Corporate success isn’t just about financial gains—it’s about creating sustainable value for people and society.”",
    authorName: "MR. MOHAMMED HANIFA TAJUDIN",
    authorTitle: "Director, Singapore"
  },
  {
    id: 9,
    type: "instagram",
    videoId: "DcNA0NYTE0z",
    quote: "Unlocking Global Financial Strategies & Empowering Enterprise Growth!\n\nNavigating modern financial ecosystems requires strategic vision, global insight, and strong collaboration. Hear from Prakash, Financial Consultant at SB Financial Services, as he highlights his key takeaways from the Millionaire Summit & Awards.\n\nHe emphasized the significance of international setup opportunities—such as insights into corporate setup and tax advisory mechanisms in financial hubs like Singapore—that empower enterprises to scale beyond local boundaries.",
    authorName: "PRAKASH",
    authorTitle: "Financial Consultant at SB Financial Services"
  },
  {
    id: 10,
    type: "instagram",
    videoId: "DcH3JdVzDV4",
    quote: "Lifelong Learning & Scaling Business Legacies Across Generations!\n\nGrowth in entrepreneurship has no age limit. Hear from Manoharan, Founder of Sterling Forms, as he reflects on his experience attending the Millionaire Summit & Awards 2026.\n\nEven with decades of industry experience, Mr. Manoharan shared how valuable it was to connect with diverse leaders and gather fresh insights. He highlighted two key themes from the summit’s discussions: Building a Sustainable Business Legacy that endures across generations, and prioritizing personal well-being (“Me Time”) as a critical foundation for effective leadership and sustainable productivity.",
    authorName: "MANOHARAN",
    authorTitle: "Founder of Sterling Forms"
  },
  {
    id: 11,
    type: "instagram",
    videoId: "DcPlhqkTktf",
    quote: "Bridging Cross-Border Business Opportunities & Holistic Well-being!\n\nTrue leadership isn’t just about scaling numbers; it’s about nurturing the mind and body behind the vision. Hear from Gopinath Subramani, Director for the Career Development Center at KSR Institutions, as he shares his experience at the Millionaire Summit & Awards 2026.\n\nReflecting on the summit’s unique focus, Mr. Subramani emphasized the valuable discussions around expanding business corridors between India and Singapore, alongside insightful sessions centered on health and holistic well-being for leaders.",
    authorName: "GOPINATH SUBRAMANI",
    authorTitle: "Director for the Career Development Center at KSR Institutions"
  },
  {
    id: 12,
    type: "instagram",
    videoId: "DcKb9bkzXyf",
    quote: "Transforming Business Growth Through Global Connections & Strategic Innovation!\n\nFinding the right community can be a total game-changer for your professional trajectory. Hear from Suresh, CEO of Xpert Rolex, a leader in automation and security systems, as he shares his experience at the Millionaire Summit & Awards 2026.\n\nInitially attending out of curiosity, Suresh quickly realized the immense value of being part of an elite ecosystem. He highlighted how the summit provided unprecedented opportunities to network globally, exchange high-level insights, and discover strategic tools needed to scale modern tech enterprises.",
    authorName: "SURESH",
    authorTitle: "CEO of Xpert Rolex"
  },
  {
    id: 13,
    type: "instagram",
    videoId: "DcFSZOhzyKA",
    quote: "Unlocking Authentic Leadership & Building Global Business Networks!\n\nGreat leaders don’t just build businesses—they create legacies that inspire future generations! Hear from Lokesh Rajendra Babu as he shares his experience attending the Millionaire Summit & Awards 2026.\n\nHe noted that the highlight of the summit was the series of deep, insightful panel discussions. These conversations shed light on what true leadership entails and why building a sustainable legacy is crucial for every growing enterprise today.",
    authorName: "LOKESH RAJENDRA BABU",
    authorTitle: "Entrepreneur"
  },
  {
    id: 14,
    type: "instagram",
    videoId: "DcDTJW0h8nC",
    quote: "A lot of small community meetings and business meetings are booming right now. To enhance the meeting with crisp reach and punchy delivery, 3 adjustments can practically improve your meeting quality.\n\nNo more hearing muffled voices or unclear speeches. First, have great quality speakers. Second, make sure the microphone is from a branded company. Third, a mixer is a must to equalise the voice control.\n\nThese practical tips ensure entrepreneurs and businesses can plan and execute internal meetings with the highest professional quality.",
    authorName: "SPEAKER FOURTEEN",
    authorTitle: "Entrepreneur"
  },
  {
    id: 15,
    type: "instagram",
    videoId: "DcCtoYRTsEy",
    quote: "Empowering the Next Generation of Visionaries Through Technology & Innovation!\n\nBridging the gap between academia, business, and tech innovation is essential for shaping future industry leaders. Hear from Dr. Janaki from the SRM Institute of Science and Technology, an awardee at the Millionaire Summit & Awards 2026.\n\nDr. Janaki shared her inspiring experience connecting with visionary entrepreneurs and industry leaders at the summit. She highlighted her passion for carrying the key takeaways back to her students—emphasizing how emerging technologies will transform the future, presenting both mesmerizing opportunities and exciting challenges for the decades to come.",
    authorName: "DR. JANAKI",
    authorTitle: "SRM Institute of Science and Technology"
  },
  {
    id: 16,
    type: "instagram",
    videoId: "DcAIxX6z5Wc",
    quote: "Uniting Leaders, Accelerating Growth & Expanding B2B Networks!\n\nCross-industry collaboration is the key to unlocking new business channels! Hear from Dhanasekar, Founder of Ruchi Catering, as he shares his experience attending the Millionaire Summit & Awards 2026.\n\nMr. Dhanasekar shared how the summit brought together entrepreneurs across diverse sectors. He highlighted how delegates shared transparent insights on marketing strategies, sales generation, and operational scaling, while enabling service providers like Ruchi Catering to directly showcase their services to prospective corporate clients.",
    authorName: "DHANASEKAR",
    authorTitle: "Founder of Ruchi Catering"
  },
  {
    id: 17,
    type: "instagram",
    videoId: "Db9kAprzoPF",
    quote: "Empowering SMEs & Celebrating Grassroots Leadership!\n\nSustainable economic growth starts with empowering businesses at every level. Hear from Visukumar Gopal, CEO & Founder of Suvi, as he shares his reflections on the Millionaire Summit & Awards 2026.\n\nIn his testimonial, he highlighted the importance of recognizing leaders who are actively engaging and empowering business communities in rural and suburban areas. He noted that the summit provided authentic, unscripted panel discussions where entrepreneurs shared relatable, real-world stories of growth, challenges, and triumph.",
    authorName: "VISUKUMAR GOPAL",
    authorTitle: "CEO & Founder of Suvi"
  },
  {
    id: 18,
    type: "instagram",
    videoId: "Db6_K2EBuZv",
    quote: "Unlocking Pan-India Collaboration & Global Sales Opportunities!\n\nTrue business growth happens when visionaries come together across industries and geographies! Hear from Gopal Krishan Sharma, who traveled all the way from Jaipur, Rajasthan, to attend the Millionaire Summit & Awards 2026.\n\nMr. Sharma shared how the summit provided a high-value ecosystem to network with business leaders, interact with industry pioneers across diverse verticals, and unlock fresh sales strategy insights. From insightful panel discussions to high-impact networking sessions, the experience created powerful scope for sustainable growth and sales pipeline expansion.",
    authorName: "GOPAL KRISHAN SHARMA",
    authorTitle: "Entrepreneur"
  },
  {
    id: 19,
    type: "instagram",
    videoId: "Db4aW_Fzsn-",
    quote: "Connecting Industry Experts & Expanding Business Horizons!\n\nHigh-level collaboration leads to transformative industry growth. Hear from K.S. Dhanasekaran Kamal, expert in industrial laser screed flooring solutions, as he highlights his key takeaways from the Millionaire Summit & Awards 2026.\n\nMr. Dhanasekaran shared how the summit provided a premier platform to connect with prospective clients, exchange strategic insights, and build long-term corporate relationships. The summit continues to serve as an international stage where leaders across manufacturing, construction, executive services, and emerging industries gather to form strategic partnerships.",
    authorName: "K.S. DHANASEKARAN KAMAL",
    authorTitle: "Expert in Industrial Laser Screed Flooring Solutions"
  },
  {
    id: 20,
    type: "instagram",
    videoId: "Db11laqT7eX",
    quote: "Empowering Entrepreneurs & Heritage Craftsmanship at the Millionaire Summit 2026!\n\nReal success is about learning, connecting, and elevating traditional craft to a global scale. Hear from Kritika, Founder of Kritik’s Melange, as she shares her inspiring journey.\n\nHailing from a proud weaving background based in Virugambakkam, Chennai, Kritika specializes in authentic, high-quality silk sarees crafted with tradition and fair pricing at heart. After stepping back into her business journey after a long break, attending the summit served as a powerful catalyst for growth, providing immense wisdom, actionable takeaways, and personal connections that inspired her to scale new heights.",
    authorName: "KRITIKA",
    authorTitle: "Founder of Kritik's Melange"
  },
  {
    id: 21,
    type: "instagram",
    videoId: "DbzQxKqzJlf",
    quote: "When leaders connect, industries transform.\n\nHear from Mr. Jothimani, Founder & CEO of Eraalam Chemical Industries, as he shares his experience attending the Millionaire Summit & Awards 2026. With over 25 years of expertise manufacturing industrial detergents and supplying major institutions across hospitality and healthcare, Mr. Jothimani highlighted key event moments—from insightful keynote sessions by leading experts to high-value networking with business leaders across diverse sectors.\n\nThe Millionaire Summit continues to build a powerful global ecosystem where industry veterans, entrepreneurs, and innovators come together to exchange ideas, foster strategic partnerships, and accelerate growth.",
    authorName: "MR. JOTHIMANI",
    authorTitle: "Founder & CEO of Eraalam Chemical Industries"
  },
  {
    id: 22,
    type: "instagram",
    videoId: "Dbwr-yNT1qQ",
    quote: "At the Millionaire Summit & Awards 2026 hosted by Executives Collaboration, leaders from across industries came together to celebrate real-world impact and excellence.\n\nAmong the distinguished honorees was Divya Swapna Raj, Founder & Chairperson of the Women’s League Foundation (WLF), who was awarded for her remarkable dedication to community development and empowering lives. Platforms like the Millionaire Summit go beyond traditional success—they recognize community developers, grassroots innovators, and social impact leaders who are actively shaping a better future.\n\nHard work, purpose, and perseverance always find their stage. To every entrepreneur, leader, and change-maker striving to make a difference: Keep pushing boundaries—your work matters!",
    authorName: "DIVYA SWAPNA RAJ",
    authorTitle: "Founder & Chairperson of the Women's League Foundation (WLF)"
  },
  {
    id: 23,
    type: "instagram",
    videoId: "DbuHP2Sz_Od",
    quote: "“True growth happens when visionaries come together under one roof.”\n\nInspiring words from Dr. Sri Prathap, Psychiatrist & Chairman of a 200-bed psychiatric hospital, sharing his takeaway from the Millionaire Summit & Awards 2026.\n\nWhy Networking Matters: Meeting leaders across diverse industries opens doors to fresh perspectives, game-changing collaborations, and long-term strategic partnerships. Celebrating Excellence: As Dr. Prathap highlighted, formal recognition of hard work isn’t just an award—it’s the fuel that drives leaders to scale even higher.",
    authorName: "DR. SRI PRATHAP",
    authorTitle: "Psychiatrist & Chairman"
  },
  {
    id: 24,
    type: "instagram",
    videoId: "DbriY8GTTSY",
    quote: "Moving toward a self-reliant future—“Viksit Bharat”—requires a monumental shift from job-seeking to job-creating.\n\nAt the Millionaires Summit & Awards, instilling an entrepreneurial mindset in every individual. While traditional paths often focus solely on employment, remarkable platforms like this highlight that every person possesses the potential to lead a business.\n\nBringing together entrepreneurs, managing directors, and industry leaders from across Tamil Nadu and beyond, this summit stands as a true testament to collective business excellence and leadership.",
    authorName: "SPEAKER TWENTY-FOUR",
    authorTitle: "Entrepreneur"
  },
  {
    id: 25,
    type: "instagram",
    videoId: "Dbo9oiAz9zo",
    quote: "What if the key to building a high-impact global enterprise isn’t just working harder, but redefining your perspective on life and “me time”?\n\nAt the Millionaires Summit & Awards, Mr. Siva Saravanan, Co-founder of Rigo Global Films Private Limited, shared how stepping into a premier business summit completely shifted his outlook.\n\nBeyond corporate metrics, true entrepreneurial success requires carving out personal balance, finding genuine happiness, and looking at life through a refreshed lens. High-level networking events do more than open doors for collaboration—they offer profound eye-openers that transform how we lead both our companies and our lives.",
    authorName: "MR. SIVA SARAVANAN",
    authorTitle: "Co-founder of Rigo Global Films Private Limited"
  },
  {
    id: 26,
    type: "instagram",
    videoId: "DbmY4_0zOVe",
    quote: "How can traditional processing industries leverage cutting-edge tech and artificial intelligence to scale new heights?\n\nAt the Millionaires Summit & Awards, Mr. Sathish, representing Regal Commodities Pvt Ltd, shared his fascinating perspective as a first-time attendee.\n\nOperating deeply within the cashew processing sector, he highlighted how eye-opening it was to explore cross-industry concepts like AI integration, powerful morning keynotes, and advanced time management strategies. True business evolution happens when traditional manufacturing meets modern entrepreneurial innovation.",
    authorName: "MR. SATHISH",
    authorTitle: "Regal Commodities Pvt Ltd"
  },
  {
    id: 27,
    type: "instagram",
    videoId: "Dbj0DJETjtj",
    quote: "Where do visionary leaders, global trailblazers, and international industry pioneers converge to shape the future of business?\n\nAt the Millionaires Summit & Awards 2026 in Chennai, Mrs. Sathya Priya Chidambaram, Trade Ambassador for the Singapore South Asia Chamber of Commerce and Industry, shared her inspiring perspective on what makes this landmark gathering so extraordinary.\n\nFeaturing over 55 awards recognizing exceptional business excellence, this premier event brought together remarkable visionaries and elite leadership to kickstart the year with high-impact collaboration and cross-border innovation.",
    authorName: "MRS. SATHYA PRIYA CHIDAMBARAM",
    authorTitle: "Trade Ambassador, Singapore South Asia Chamber of Commerce and Industry"
  },
  {
    id: 28,
    type: "instagram",
    videoId: "DbhPOeCKIWz",
    quote: "What happens when visionary leadership meets grassroots determination?\n\nReflecting on his experience at the Millionaires Summit & Awards 2026, a panelist shares what makes this platform truly unique. Moving far beyond traditional business events, this initiative is actively shining a spotlight on real entrepreneurs from Tier 2 and Tier 3 cities who are making a genuine, lasting impact in their communities.\n\nDrawing inspiration from Dr. A.P.J. Abdul Kalam’s visionary ethos, platforms that recognize grassroots changemakers and regional founders are building the true foundation for global economic growth.",
    authorName: "PANELIST",
    authorTitle: "Entrepreneur"
  },
  {
    id: 29,
    type: "instagram",
    videoId: "Dbeqf-4TVLf",
    quote: "How often do busy founders and professionals actually pause to invest in themselves?\n\nAt the Millionaires Conference, CA Adarsh shared his key takeaways from the event. Beyond the high-level networking and incredible business connections, one of the most powerful insights highlighted was the importance of personal well-being—making time for reading, exercising, and stepping back from relentless work schedules to prevent burnout.\n\nWhen you surround yourself with visionaries, learn from industry experts, and prioritize your personal growth alongside professional scale, everything changes.",
    authorName: "CA ADARSH",
    authorTitle: "Founder of NCS Accountants"
  },
  {
    id: 30,
    type: "instagram",
    videoId: "DbZg1-7hHKg",
    quote: "Where do high-achieving entrepreneurs, founders, and industry leaders go to scale their vision?\n\nAt the Millionaires Conference, brilliant minds gather not just to share insights, but to build a powerful ecosystem of growth and collaboration. As Dr. Chackochen Mathai shared after moderating and participating in the panels, events like this offer unmatched value for anyone looking to learn from real-world success stories, connect with high-energy leaders, and expand their business footprint.\n\nNetworking isn’t just about exchanging business cards—it’s about surrounding yourself with people who challenge you to think bigger and execute better.",
    authorName: "DR. CHACKOCHEN MATHAI",
    authorTitle: "Founder & CEO of Franchising Rightway"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const currentItem = testimonialsData[currentIndex];
  const progressPercentage = ((currentIndex + 1) / testimonialsData.length) * 100;

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        {/* Left Side: Image / Video */}
        <div 
          className={styles.imageColumn}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.accentBorder}></div>
          <div className={styles.imageWrapper}>
            {currentItem.type === 'instagram' ? (
              <iframe 
                key={currentItem.videoId}
                src={`https://www.instagram.com/reel/${currentItem.videoId}/embed/`}
                width="100%" 
                style={{ 
                  border: 'none', 
                  width: '100%', 
                  height: 'calc(100% + 225px)', 
                  marginTop: '-55px' 
                }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
              />
            ) : (
              <iframe 
                key={currentItem.videoId}
                src={`https://www.youtube.com/embed/${currentItem.videoId}?rel=0&modestbranding=1`}
                width="100%" 
                style={{ border: 'none', width: '100%', height: '100%' }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
              />
            )}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className={styles.contentColumn}>
          <span className={styles.subtitle}>TESTIMONIALS</span>
          
          <h2 className={styles.quote} style={{ fontSize: '1rem', lineHeight: '1.5', fontWeight: 500 }}>
            &ldquo;
            {currentItem.quote.split('\n\n').map((paragraph, i) => (
              <React.Fragment key={i}>
                {paragraph}
                {i !== currentItem.quote.split('\n\n').length - 1 && <><br/></>}
              </React.Fragment>
            ))}
            &rdquo;
          </h2>

          <div className={styles.authorNavRow}>
            <div className={styles.authorInfo}>
              <h4 className={styles.authorName}>{currentItem.authorName}</h4>
              <p className={styles.authorTitle}>{currentItem.authorTitle}</p>
            </div>
            
            <div className={styles.navArrows}>
              <button className={styles.arrowPrev} aria-label="Previous testimonial" onClick={handlePrev}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <button className={styles.arrowNext} aria-label="Next testimonial" onClick={handleNext}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
