import { useEffect, useState, useRef } from 'react';

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState('');
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacia');
      return;
    }

    if (search.length <= 1) {
      setError('La busqueda debe tener al menos 2 caracteres');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
