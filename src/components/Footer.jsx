
import React from 'react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>© {new Date().getFullYear()} EverShop</div>
    </footer>
  );
}
