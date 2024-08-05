import React from 'react';
import styles from '@/styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <a href="https://github.com/filipemsilv4" target="_blank" rel="noopener noreferrer" className={styles.link}>[ GitHub ]</a>
        <a href="mailto:contato@paulofilipe.com" className={styles.link}>[ Email ]</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[ Resume ]</a>
      </div>
    </footer>
  );
};

export default Footer;