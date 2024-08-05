import React from 'react';
import styles from '@/styles/TronBackground.module.css';

const TronBackground: React.FC = () => {
  return (
    <div className={styles.tronBackground}>
      <div className={styles.gridContainer}>
        <div className={styles.grid}></div>
      </div>
    </div>
  );
};

export default TronBackground;