import { useEffect, useState } from 'react';

import { useMovies } from './hooks/useMovies';
import { Movies } from './components/Movies';
import Buscador from './components/Buscador';
import { useSearch } from './hooks/useSearch';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search, sort });

  useEffect(() => {
    console.log('rendered, created a new getMovies');
  }, [getMovies]);

  const handleSort = () => {
    setSort((prev) => !prev);
  };

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <Buscador
          getMovies={getMovies}
          search={search}
          updateSearch={updateSearch}
          error={error}
          sort={sort}
          handleSort={handleSort}
        />
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
