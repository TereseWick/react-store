
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from './CartIcon';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>EverShop</Link>
        <nav className={styles.nav}>
          <NavLink to="/" end className={({isActive}) => isActive ? styles.active : undefined}>Home</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? styles.active : undefined}>Contact</NavLink>
        </nav>
        <CartIcon />
      </div>
    </header>
  );
}