"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Environment, Capsule } from "@react-three/drei";
import styles from "./ServicesV2.module.css";

gsap.registerPlugin(ScrollTrigger);

const mainServices = [
  {
    title: "CUSTOM WEB DESIGN",
    description: "Tailored, responsive experiences that embody your brand soul and conversion goals.",
    tag: "CRAIL ACCENT",
    icon: "🎨"
  },
  {
    title: "TECHNICAL RELIABILITY",
    description: "Robust architecture and consistent performance. We build for the long haul.",
    tag: "CLOUDY GREY",
    icon: "🛡️"
  },
  {
    title: "STRATEGIC COMMUNICATION",
    description: "Transparent processes and collaborative success. We speak your language.",
    tag: "PAMPAS BEIGE",
    icon: "💬"
  },
];

const values = [
  {
    title: "CONSISTENT QUALITY",
    description: "Steady, premium experiences delivered with zero friction.",
    icon: "🧭",
  },
  {
    title: "EASY PARTNERSHIPS",
    description: "Transparent collaboration that feels like an extension of your team.",
    icon: "🤝",
  },
  {
    title: "CLIENT FOCUS",
    description: "Your vision is the compass. We listen more than we talk.",
    icon: "👥",
  },
];

function BackgroundAccents() {
  return (
    <div className={styles.accentsContainer}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
          <Sphere args={[0.6, 32, 32]} position={[-3, 2, -2]}>
            <meshStandardMaterial color="#f4f3ee" roughness={0.3} metalness={0.8} />
          </Sphere>
        </Float>
        <Float speed={3} rotationIntensity={1} floatIntensity={2}>
          <Capsule args={[0.3, 0.6, 4, 16]} position={[4, -2, -3]} rotation={[0.5, 0.5, 0]}>
            <meshStandardMaterial color="#c15f3c" roughness={0.5} />
          </Capsule>
        </Float>
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

export default function ServicesV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cells = gridRef.current.querySelectorAll(`.${styles.cell}`);
      
      // Line drawing animation simulation via opacity and stagger
      gsap.fromTo(
        cells,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section className={styles.section} id="services">
      <BackgroundAccents />
      <div className="section-wrapper">
        <div className={styles.header}>
          <span className={styles.overline}>Expertise & Values</span>
          <h2 className={styles.title}>OUR SERVICES<br />& VALUES</h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {/* Row 1: Main Services */}
          {mainServices.map((service, i) => (
            <div key={i} className={`${styles.cell} ${styles.serviceCell}`}>
              <div className={styles.iconBox}>
                <div className={styles.placeholderIcon}>{service.icon}</div>
              </div>
              <h3 className={styles.cellTitle}>{service.title}</h3>
              <p className={styles.cellText}>{service.description}</p>
              <span className={styles.badge}>{service.tag}</span>
            </div>
          ))}

          {/* Row 2: Values */}
          {values.map((val, i) => (
            <div key={i} className={`${styles.cell} ${styles.valueCell}`}>
              <div className={styles.valHeader}>
                <div className={styles.valIcon}>{val.icon}</div>
                <div className={styles.valContent}>
                  <h3 className={styles.cellTitle}>{val.title}</h3>
                  <p className={styles.cellText}>{val.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
