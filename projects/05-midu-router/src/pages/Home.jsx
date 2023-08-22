import { navigation } from '../Link';
import Link from '../Link';

export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>Esta es la pagina Home para crear el Router desde cero</p>
      <Link to='/about'>Ir a Sobre nosotros</Link>
    </>
  );
}
