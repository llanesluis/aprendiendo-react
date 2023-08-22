import { useState, useEffect, Children } from 'react';
import { EVENTS } from './consts';
import Page404 from './pages/404';
import { match } from 'path-to-regexp';
import { getCurrentPath } from './utils';

export default function Routes({
  children,
  routes = [],
  defaultComponent: DefaultComponent = Page404,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };
    //Escucha el evento de agregar
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    //Escucha el evento de quitar
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  //Add routes from children <Route /> components
  //Toma dos parametros, se le pasan los children y luego la funcion mapeadora
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === 'Route';

    //regresa un arreglo con {path: '/', Component: ƒ} para cada <Route /> hijo de <Router />
    return isRoute ? props : null;
  });

  //Juntamos los 2 arreglos, porque toma unos elementos por children y otros por props
  const allRoutes = routes.concat(routesFromChildren).filter(Boolean);
  // console.log(allRoutes);

  const Page = allRoutes.find(({ path }) => {
    if (path === currentPath) return true;

    //Usando "path-to-regexp" para detectar rutas dinamicas, ejemplo>> /search/:query
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath); //Compara la URL (.path) de la iteracion /search/:query con la del estado currentPath === 'search/javascript'
    if (!matched) return false; //Si no coincide la URL con el currentParh del estado

    //Guardar los parametros de la URL que eran dinamicos
    //que se han extraido con "path-to-regexp"
    //ejemplo: si la ruta es >> /search/:query <<
    //y la URL es >> /search/javascript <<
    //matched.params.query === 'javascript'

    routeParams = matched.params; // " matched.params" es un objeto que contiene los parametros  "matched.params.[query, lang, etc]"
    return true;
  })?.Component; //Toma la propiedad Component del objeto {path: '/', Component: ƒ} que regresa true
  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent />;
}
