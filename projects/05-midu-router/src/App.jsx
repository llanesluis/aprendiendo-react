import { lazy, Suspense } from 'react';
import Router from './Router';
import Routes from './Routes';
import Route from './Route';

// import HomePage from './pages/Home'; //Import estatico
const HomePage = lazy(() => import('./pages/Home.jsx'));
const AboutPage = lazy(() => import('./pages/About.jsx'));
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'));

const appRoutes = [
  // { path: '/', Component: HomePage },
  {
    path: '/:lang/about',
    Component: AboutPage,
  },
  {
    path: '/search/:query',
    Component: SearchPage,
  },
];

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <Routes routes={appRoutes}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={AboutPage} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
