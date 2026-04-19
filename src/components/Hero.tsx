"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import styles from "./Hero.module.css";

function FloatingObjects() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]} position={[-2, 1, 0]} scale={0.8}>
          <MeshDistortMaterial color="#C15F3C" distort={0.3} speed={2} roughness={0.1} metalness={0.5} />
        </Sphere>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2.5, -1.5, -1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#B1ADA1" roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]} position={[3, 2, -2]}>
          <meshStandardMaterial color="#1A2B4C" metalness={0.8} roughness={0.2} />
        </Sphere>
      </Float>
    </>
  );
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );
    tl.fromTo(
      [titleRef.current, subtitleRef.current],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <FloatingObjects />
          <Environment preset="studio" />
          <ContactShadows opacity={0.2} scale={10} blur={2} far={4.5} />
        </Canvas>
      </div>

      <div ref={containerRef} className={`${styles.glassPanel} glass`}>
        <div className={styles.header}>
          <div className={styles.logo}>Willful <span className={styles.accent}>Designs</span></div>
          <nav className={styles.nav}>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
          </nav>
          <button className={styles.navBtn}>Start Project</button>
        </div>

        <div className={styles.content}>
          <h1 ref={titleRef} className={styles.title}>
            We build human-centric digital experiences with an <span className={styles.accent}>easygoing approach.</span>
          </h1>
          <p ref={subtitleRef} className={styles.subtitle}>
            A premium agency for brands that value thoughtful design and authentic connection.
          </p>
          <button className={styles.cta}>Let&apos;s create together</button>
          
          <div className={styles.scrollHint}>
            <span className={styles.arrow}>↓</span> Explore our work
          </div>
        </div>
      </div>
    </section>
  );
}
