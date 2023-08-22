import { createContext, useReducer } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cart';

//1 Crear contexto
export const CartContext = createContext();

function useCartReducer() {
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return { cart, addToCart, removeFromCart, clearCart };
}

//2 Crear provider
export default function CartProvider({ children }) {
  const { cart, addToCart, removeFromCart, clearCart } = useCartReducer();
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
