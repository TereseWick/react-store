
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ products = [] }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(p => p.title?.toLowerCase().includes(q)).slice(0, 8);
  }, [query, products]);

  function onSelect(id) {
    setQuery('');
    navigate(`/product/${id}`);
  }

  return (
    <div className={styles.wrap}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search products…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search products"
      />
      {results.length > 0 && (
        <ul className={styles.dropdown} role="listbox">
          {results.map(r => (
            <li key={r.id} role="option" aria-selected="false">
              <button
                  type="button"
                  className={styles.option}
                  onClick={() => onSelect(r.id)}>
                {r.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
