'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/TerminalSection.module.css';

const TerminalSection: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = `
> Paulo Filipe Moreira da Silva
> Computer Science Student
> Bug Squasher since 2019
> Competitive Programming Enthusiast
> ICPC World Finals Aspirant
> Recursive Acronym Lover
  `;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.terminal}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalButton}></div>
        <div className={styles.terminalButton}></div>
        <div className={styles.terminalButton}></div>
      </div>
      <div className={styles.terminalBody}>
        <pre>{text}</pre>
        <div className={styles.cursor}></div>
      </div>
    </section>
  );
};

export default TerminalSection;