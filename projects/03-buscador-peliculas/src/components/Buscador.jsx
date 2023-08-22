import React, { useCallback, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import debounce from 'just-debounce-it';

export default function Buscador({
  getMovies,
  search,
  updateSearch,
  error,
  sort,
  handleSort,
}) {
  // const { search, updateSearch, error } = useSearch();

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log('search: ', search);
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleChange = (event) => {
    const value = event.target.value;

    if (value.startsWith(' ')) return;

    console.log('Input changed'); //! Prueba consola
    updateSearch(value);
    //Debounce utilizando una dependencia just-debounce-it
    debouncedGetMovies(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search) return;
    getMovies({ search });

    // FORMAS DE OBTENER LOS IMPUT NO CONTROLADOS
    // >> Usando los campos extraidos desde el formulario
    // const fields = Object.fromEntries(new window.FormData(event.target));
    // const { query } = fields;
    // console.log(query);

    // >> Usando la ref se puede acceder al valor del input pero no es recomendable
    // const value = inputRef.current.value;
    // console.log(value);
  };

  // Un debounce simple con useEffect cada vez que se actualiza el valor de la busqueda "search"
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     getMovies({ search });
  //   }, 500);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [search]);

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={handleChange}
          name='query'
          placeholder='Avengers...'
        />
        <label>
          Sort
          <input type='checkbox' onChange={handleSort} value={sort} />
        </label>
        <button type='submit'>Buscar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
