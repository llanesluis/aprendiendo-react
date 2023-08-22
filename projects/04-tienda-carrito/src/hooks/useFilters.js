import { useContext } from 'react';
import { FiltersContext } from '../context/filters';

export default function useFilters() {
  const context = useContext(FiltersContext);

  if (context === undefined) {
    throw Error('useFilters must be used within a FiltersProvider');
  }

  return context;
}
