import React, { useId } from 'react';
import '../styles/Cart.css';
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from './Icons';
import useCart from '../hooks/useCart';
import CartItem from './CartItem';

export default function Cart() {
  const cartCheckboxId = useId();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
        {cart.length > 0 && <strong>{cart.length}</strong>}
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart?.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        {cart?.length > 0 ? (
          <button title='Clear cart' onClick={clearCart}>
            <ClearCartIcon />
          </button>
        ) : (
          <h3>Cart is empty</h3>
        )}
      </aside>
    </>
  );
}
