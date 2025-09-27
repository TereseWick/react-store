
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import styles from '../styles/HomePage.module.css';

const URL = 'https://v2.api.noroff.dev/online-shop';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(URL, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  if (loading) return <div className={styles.state}>Loading products…</div>;
  if (error) return <div className={styles.state}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <SearchBar products={products} />
      <div className={styles.grid}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
