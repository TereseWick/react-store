
import React, { createContext, useContext, useMemo, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const item = action.payload;
      const idx = state.items.findIndex(i => i.id === item.id);
      let items;
      if (idx === -1) {
        items = [...state.items, { ...item, quantity: 1 }];
      } else {
        items = state.items.map((i, k) => k === idx ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return { ...state, items };
    }
    case 'INC': {
      const id = action.payload;
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    case 'DEC': {
      const id = action.payload;
      const items = state.items
        .map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0);
      return { ...state, items };
    }
    case 'REMOVE': {
      const id = action.payload;
      return { ...state, items: state.items.filter(i => i.id !== id) };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

const initial = { items: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const addItem = useCallback((product) => dispatch({ type: 'ADD', payload: product }), [dispatch]);
  const inc = useCallback((id) => dispatch({ type: 'INC', payload: id }), [dispatch]);
  const dec = useCallback((id) => dispatch({ type: 'DEC', payload: id }), [dispatch]);
  const remove = useCallback((id) => dispatch({ type: 'REMOVE', payload: id }), [dispatch]);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [dispatch]);

  const itemCount =useMemo(
    () => state.items.reduce((n, i) => n + i.quantity, 0),
    [state.items]
  );

  const total = useMemo(
    () => state.items.reduce((sum, i) => sum + (i.discountedPrice ?? i.price) * i.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({ items: state.items, itemCount, total, addItem, inc, dec, remove, clearCart }),
    [state.items, itemCount, total, addItem, inc, dec, remove, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
