"use client";

import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <h2 className={styles.title}>Ready to <span className={styles.highlight}>Start?</span></h2>
          <p className={styles.subtitle}>
            Let&apos;s build something meaningful together. We make the process as smooth as the final product.
          </p>
          
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Your Name" className={styles.input} />
              <input type="email" placeholder="Your Email" className={styles.input} />
            </div>
            <textarea placeholder="Tell us about your project" className={styles.textarea}></textarea>
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.logo}>Willful <span className={styles.highlight}>Designs</span></div>
          <div className={styles.links}>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Dribbble</a>
          </div>
          <p className={styles.copy}>&copy; {new Date().getFullYear()} Willful Designs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
