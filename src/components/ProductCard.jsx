
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductCard.module.css';
import { formatCurrency } from '../utils/formatCurrency';

export default function ProductCard({ product }) {
    if (!product) return null;

    const { id, title, price, discountedPrice, image} = product;
    const hasDiscount = discountedPrice < price;
    const pct = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;

    return (
        <article className={styles.card}>
          <Link to={`/product/${id}`} className={styles.imageWrap} aria-label={`View ${title}`}>
            {image?.url ? (
              <img src={image.url} alt={image.alt || title} loading="lazy" />
            ) : (
              <div className={styles.placeholder} aria-hidden="true">No image</div>
            )}
            {hasDiscount && <span className={styles.badge}>Save {pct}%</span>}
          </Link>
          <div className={styles.body}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.prices}>
              <span className={styles.price}>{formatCurrency(discountedPrice)}</span>
              {hasDiscount && <span className={styles.strike}>{formatCurrency(price)}</span>}
            </div>
            <Link to={`/product/${id}`} className={styles.button}>View product</Link>
          </div>
        </article>
      );
    }
    