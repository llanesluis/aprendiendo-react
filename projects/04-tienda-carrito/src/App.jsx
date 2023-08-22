import Products from './components/Products';
import Header from './components/Header';
import Cart from './components/Cart';
import CartProvider from './context/cart';

function App() {
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products />
    </CartProvider>
  );
}

export default App;
