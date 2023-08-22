import { navigation } from '../Link';
import Link from '../Link';

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description:
      'Esta es la pagina Sobre nosotros para crear el Router desde cero',
    buttonText: 'Ir al Inicio',
  },
  en: {
    title: 'About us',
    description: 'This is the About us page to create the Router from scratch',
    buttonText: 'Go to Home page',
  },
};

function useI18n(lang) {
  return i18n[lang] || i18n.es;
}
export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es');
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to='/'>{i18n.buttonText}</Link>
    </>
  );
}
