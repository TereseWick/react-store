
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/CheckoutSuccessPage.module.css';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  useEffect(() => { clearCart(); }, [clearCart]);
  return (
    <div className={styles.page}>
      <h1>Order successful 🎉</h1>
      <p>Thank you for your purchase. Your order has been placed.</p>
      <Link to="/" className={styles.link}>Back to store</Link>
    </div>
  );
}
