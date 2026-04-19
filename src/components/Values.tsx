"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Values.module.css";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Reliability",
    description: "We don't just design; we deliver. Our processes are built on trust and timely communication.",
    icon: "🤝",
  },
  {
    title: "Consistency",
    description: "Every pixel serves a purpose. We maintain high standards across all brand touchpoints.",
    icon: "✨",
  },
  {
    title: "Transparency",
    description: "No hidden fees, no jargon. Just honest collaboration and clear roadmaps.",
    icon: "💎",
  },
  {
    title: "Client-Centric",
    description: "Your goals are our compass. We listen, adapt, and build what actually works for you.",
    icon: "🌱",
  },
];

export default function Values() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(`.${styles.valueCard}`);
      
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section className={styles.valuesSection}>
      <div className={styles.wrapper}>
        <h2 ref={titleRef} className={styles.sectionTitle}>
          Our <span className={styles.highlight}>Ethos</span>
        </h2>
        <div ref={containerRef} className={styles.grid}>
          {values.map((val, idx) => (
            <div key={idx} className={styles.valueCard}>
              <div className={styles.icon}>{val.icon}</div>
              <h3 className={styles.cardTitle}>{val.title}</h3>
              <p className={styles.cardDescription}>{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
