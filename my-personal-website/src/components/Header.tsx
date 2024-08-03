import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/profile-image.jpg"
            alt="Paulo Filipe"
            width={100}
            height={100}
            className={styles.profilePhoto}
          />
        </div>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Paulo Filipe</h1>
          <p className={styles.subtitle}>Computer Science Student | Bug Squasher | Recursive Acronym Enthusiast</p>
        </div>
      </div>
    </header>
  );
};

export default Header;