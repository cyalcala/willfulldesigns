"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Services.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Bespoke Web Design",
    description: "Unique, high-end interfaces tailored to your brand's unique soul and mission.",
    tag: "Visual Excellence",
  },
  {
    title: "Creative Development",
    description: "Turning designs into reality with modern frameworks and immersive 3D interactions.",
    tag: "Technical Mastery",
  },
  {
    title: "Brand Systems",
    description: "Holistic design languages that ensure consistency across every single pixel.",
    tag: "Consistent Identity",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(`.${styles.serviceItem}`);
      
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.servicesSection}>
      <div className={styles.header}>
        <span className={styles.overline}>What we do</span>
        <h2 className={styles.title}>Premium <span className={styles.highlight}>Services</span></h2>
      </div>

      <div className={styles.list}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceItem}>
            <div className={styles.content}>
              <span className={styles.tag}>{service.tag}</span>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
            <div className={styles.visualPlaceholder}>
              {/* This would ideally be a high-end image or 3D asset */}
              <div className={styles.accentCircle}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
