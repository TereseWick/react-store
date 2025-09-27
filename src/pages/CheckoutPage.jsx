
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/CheckoutPage.module.css';
import { formatCurrency } from '../utils/formatCurrency';

export default function CheckoutPage() {
  const { items, total, inc, dec, remove } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
        <Link to="/" className={styles.back}>Back to store</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>Cart</h1>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles.row}>
            <div className={styles.colMain}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.controls}>
                <button onClick={() => dec(item.id)} aria-label="Decrease">−</button>
                <span className={styles.qty}>{item.quantity}</span>
                <button onClick={() => inc(item.id)} aria-label="Increase">+</button>
                <button onClick={() => remove(item.id)} className={styles.remove}>Remove</button>
              </div>
            </div>
            <div className={styles.colPrice}>
              {formatCurrency(item.discountedPrice * item.quantity)}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total:</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
      <button className={styles.checkout} onClick={() => navigate('/checkout-success')}>Checkout</button>
    </div>
  );
}
