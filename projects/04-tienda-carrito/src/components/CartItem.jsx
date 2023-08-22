import { RemoveFromCartIcon } from './Icons';

export default function CartItem({
  thumbnail,
  title,
  price,
  quantity,
  addToCart,
  removeFromCart,
}) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Quantity: {quantity}</small>
        <button onClick={addToCart}>+</button>
        <button title='Remove product' onClick={removeFromCart}>
          <RemoveFromCartIcon />
        </button>
      </footer>
    </li>
  );
}
