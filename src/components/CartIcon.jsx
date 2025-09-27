
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/CartIcon.module.css';

export default function CartIcon() {
  const { itemCount } = useCart();
  return (
    <Link to="/checkout" className={styles.cart}>
      <span aria-hidden="true">🛒</span>
      <span className={styles.badge} aria-label={`Items in cart: ${itemCount}`}>{itemCount}</span>
    </Link>
  );
}
