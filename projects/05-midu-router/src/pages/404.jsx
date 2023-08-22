import Link from '../Link';

export default function Page404() {
  return (
    <>
      <div>
        <h3>This page couldn't be found!</h3>
        <Link to='/'>Go to Home page</Link>
        <img
          src='https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=2000'
          alt='Page not found'
        />
      </div>
    </>
  );
}
