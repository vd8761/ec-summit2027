"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import styles from "./InfiniteZoomScroll.module.css";

interface InfiniteZoomScrollProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function InfiniteZoomScroll({ containerRef }: InfiniteZoomScrollProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Animate images individually based on scroll
  
  // Left side images
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0]);
  
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]);

  // Right side images
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity3 = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 1, 0]);

  const y4 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity4 = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 0]);

  // Bottom images
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity5 = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 0]);

  const y6 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity6 = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 0]);

  return (
    <div className={styles.zoomContainer}>
      <motion.div className={styles.zoomLayer}>
        <motion.div className={`${styles.imageWrapper} ${styles.img1}`} style={{ y: y1, opacity: opacity1 }}><Image src="/photo1.webp" alt="Attendee" fill style={{ objectFit: 'cover' }} priority /></motion.div>
        <motion.div className={`${styles.imageWrapper} ${styles.img2}`} style={{ y: y2, opacity: opacity2 }}><Image src="/photo2.webp" alt="Attendee" fill style={{ objectFit: 'cover' }} priority /></motion.div>
        
        <motion.div className={`${styles.imageWrapper} ${styles.img3}`} style={{ y: y3, opacity: opacity3 }}><Image src="/photo3.webp" alt="Attendee" fill style={{ objectFit: 'cover' }} priority /></motion.div>
        <motion.div className={`${styles.imageWrapper} ${styles.img4}`} style={{ y: y4, opacity: opacity4 }}><Image src="/photo4.webp" alt="Attendee" fill style={{ objectFit: 'cover' }} priority /></motion.div>
        
        <motion.div className={`${styles.imageWrapper} ${styles.img5}`} style={{ y: y5, opacity: opacity5 }}><Image src="/photo5.webp" alt="Attendee" fill style={{ objectFit: 'cover' }} priority /></motion.div>
        <motion.div className={`${styles.imageWrapper} ${styles.img6}`} style={{ y: y6, opacity: opacity6 }}><Image src="/photo6.webp" alt="Attendee" fill style={{ objectFit: 'cover' }} priority /></motion.div>
      </motion.div>


      {/* Blend overlay so images don't overpower text */}
      <div className={styles.overlay}></div>
    </div>
  );
}
