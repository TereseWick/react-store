import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ContactPage from './pages/ContactPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<div style={{padding:'2rem'}}>Page not found</div>} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
