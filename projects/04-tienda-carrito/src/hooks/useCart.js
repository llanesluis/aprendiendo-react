import { useContext } from 'react';
import { CartContext } from '../context/cart';

export default function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw Error('useCart must be used within a CartProvider');
  }

  return context;
}
