
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/ProductPage.module.css';
import { formatCurrency } from '../utils/formatCurrency';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addItem } = useCart();

    useEffect(() => {
        const ctrl = new AbortController();
        (async () => {
            try {
                setError(null);
                setLoading(true);
                const res = await fetch(`https://v2.api.noroff.dev/online-shop/${encodeURIComponent(id)}`, { signal: ctrl.signal });
                if (!res.ok) throw new Error('Failed to load product');
                const json = await res.json();
                setProduct(json.data);
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
        return () => ctrl.abort();
    }, [id]);

    if (loading) return <div className={styles.state}>Loading…</div>;
  if (error) return <div className={styles.state}>Error: {error}</div>;
  if (!product) return <div className={styles.state}>Product not found</div>;

  const { title, description, price, discountedPrice, image, reviews = [] } = product;
  const hasDiscount = discountedPrice < price;
  const discountPct = hasDiscount ? Math.round(((price - discountedPrice)/price)*100) : 0;

  return (
    <div className={styles.page}>
      <div className={styles.media}>
        {image?.url ? (
          <img src={image.url} alt={image.alt || title} />
        ) : (
          <div className={styles.placeholder}>No image</div>
        )}
      </div>
      <div className={styles.info}>
        <h1>{title}</h1>
        <p className={styles.desc}>{description}</p>
        <div className={styles.prices}>
          <span className={styles.price}>{formatCurrency(discountedPrice)}</span>
          {hasDiscount && <span className={styles.strike}>{formatCurrency(price)}</span>}
          {hasDiscount && <span className={styles.badge}>Save {discountPct}%</span>}
        </div>
        <button className={styles.add} onClick={() => addItem(product)}>Add to cart</button>

        <section className={styles.reviews}>
          <h2>Reviews</h2>
          {reviews.length === 0 && <div>No reviews yet.</div>}
          {reviews.map((r, idx) => (
            <article key={idx} className={styles.review}>
              <div className={styles.rating}>★ {r.rating}</div>
              <div className={styles.body}>{r.description}</div>
              {r.username && <div className={styles.user}>— {r.username}</div>}
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
