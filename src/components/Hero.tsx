"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import ThreeScene from "./ThreeScene";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Hero() {
  const glassRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const primaryBtnRef = useMagnetic(0.4);
  const secondaryBtnRef = useMagnetic(0.3);

  useEffect(() => {
    // Entrance Animation
    const tl = gsap.timeline();
    tl.fromTo(
      glassRef.current,
      { opacity: 0, y: 100, rotateX: 10 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: "power4.out" }
    );
    tl.fromTo(
      [titleRef.current, subtitleRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=1"
    );

    // Mouse Parallax Tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (!glassRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 10; // Max 5deg tilt
      const yPos = (clientY / innerHeight - 0.5) * -10;
      
      gsap.to(glassRef.current, {
        rotateY: xPos,
        rotateX: yPos,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
          <ThreeScene />
          <Environment preset="city" />
          <ContactShadows opacity={0.1} scale={15} blur={2.5} far={4.5} />
        </Canvas>
      </div>

      <div ref={glassRef} className={`${styles.glassPanel} glass`}>
        <div className={styles.header}>
          <div className={styles.logo}>Willful <span className={styles.logoAccent}>Designs</span></div>
          <nav className={styles.nav}>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </nav>
          <button className={styles.navBtn}>Start Project</button>
        </div>

        <div className={styles.content}>
          <div className={styles.textWrapper}>
            <h1 ref={titleRef} className={styles.title}>
              We build human-centric digital experiences with an <span className={styles.accent}>easygoing approach.</span>
            </h1>
            <p ref={subtitleRef} className={styles.subtitle}>
              A premium design partner for brands that value intentional design, reliability, and authentic connection.
            </p>
            <div className={styles.ctaGroup}>
              <button ref={primaryBtnRef} className={styles.primaryCta}>Let&apos;s create together</button>
              <button ref={secondaryBtnRef} className={styles.secondaryCta}>Explore our work</button>
            </div>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.trustInfo}>Trusted by forward-thinking brands</div>
          <div className={styles.scrollHint}>↓ Scroll to explore</div>
        </div>
      </div>
    </section>
  );
}
