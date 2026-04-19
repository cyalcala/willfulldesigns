"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./ServicesV2.module.css";

gsap.registerPlugin(ScrollTrigger);

const mainServices = [
  {
    title: "CUSTOM WEB DESIGN",
    description: "Tailored, responsive experiences to prevent automation, and clean experiences.",
    tag: "CRAIL ACCENT",
  },
  {
    title: "TECHNICAL RELIABILITY",
    description: "Robust architecture and consistent performance for peace of mind.",
    tag: "CLOUDY GREY",
  },
  {
    title: "STRATEGIC COMMUNICATION",
    description: "Transparent processes and collaborative success. Easy to work with.",
    tag: "PAMPAS BEIGE",
  },
];

const values = [
  {
    title: "CONSISTENT QUALITY",
    description: "Steady, responsive experiences across all platforms.",
    icon: "🧭",
  },
  {
    title: "EASY PARTNERSHIPS",
    description: "We provide connections and building lasting partnerships.",
    icon: "🤝",
  },
  {
    title: "CLIENT FOCUS",
    description: "Your vision is our priority. Every step is tailored to you.",
    icon: "👥",
  },
];

export default function ServicesV2() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(`.${styles.cell}`);
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section className={styles.section} id="services">
      <div className="section-wrapper">
        <div className={styles.header}>
          <h2 className={styles.title}>OUR SERVICES<br />& VALUES</h2>
        </div>

        <div ref={containerRef} className={styles.grid}>
          {/* Row 1: Main Services */}
          {mainServices.map((service, i) => (
            <div key={i} className={`${styles.cell} ${styles.serviceCell}`}>
              <div className={styles.iconBox}>
                {/* Placeholder for line-art icons */}
                <div className={styles.placeholderIcon}>{i === 0 ? "🎨" : i === 1 ? "🛡️" : "💬"}</div>
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
