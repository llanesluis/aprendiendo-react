import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import { searchMovies } from '../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const prevSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === prevSearch.current) return;

    try {
      setIsLoading(true);
      prevSearch.current = search;

      console.log(`Llamada a API: ${prevSearch.current}`); //! Prueba consola

      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  //localeCompare toma en cuenta los acentos, con o sin acento van juntas.

  const sortedMovies = useMemo(() => {
    // console.log('Movies rendered'); //! Prueba consola
    return movies && sort
      ? movies.toSorted((a, b) => a.title.localeCompare(b.title)) //movies.toSorted(.....) con el nuevio metodo no muteable para hacer sort de javascript
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, error, isLoading, getMovies };
}
