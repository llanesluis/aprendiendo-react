import React from 'react';
import '../styles/Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';

import useFilters from '../hooks/useFilters';
import { products as initialProducts } from '../mocks/products.json';
import useCart from '../hooks/useCart';

export default function Products() {
  const { filterProducts } = useFilters();
  const { cart, addToCart, removeFromCart } = useCart();

  //Filtrar los productos que coincidan con el estadop interno del reducer que viene del hook
  const filteredProducts = filterProducts(initialProducts);

  //Verifica que ya exista el producto en el carrito, regresa true de ser asi
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className='products'>
      <ul>
        {filteredProducts.map((product) => {
          const isProductInCart = checkProductInCart(product);
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={`Image for ${product.title}`} />

              <div>
                <strong>{product.title}</strong> -{' '}
                <small>${product.price}</small>
              </div>

              <div>
                <button
                  title={isProductInCart ? 'Remove from cart' : 'Add to cart'}
                  style={
                    isProductInCart
                      ? { backgroundColor: 'darkred' }
                      : { backgroundColor: 'darkblue' }
                  }
                  onClick={
                    isProductInCart
                      ? () => removeFromCart(product)
                      : () => addToCart(product)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
                {isProductInCart && (
                  <button className='add' onClick={() => addToCart(product)}>
                    {' '}
                    <strong>+</strong>{' '}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
