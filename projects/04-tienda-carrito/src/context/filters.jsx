import { createContext, useReducer } from 'react';
import filterReducer from '../reducers/filters';

const initialState = { category: 'all', minPrice: 0 };

//Crear el contexto
export const FiltersContext = createContext();

function useFiltersReducer() {
  const [filters, dispatch] = useReducer(filterReducer, initialState);

  const filterProducts = (products) => {
    return products.filter(
      (product) =>
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
    );
  };

  const setCategory = (categoria) => {
    dispatch({
      type: 'CHANGE_CATEGORY',
      category: categoria,
    });
  };

  const setPrice = (price) => {
    dispatch({
      type: 'CHANGE_PRICE',
      minPrice: price,
    });
  };

  return { filters, filterProducts, setCategory, setPrice };
}

//Crear el provider
export default function FiltersProvider({ children }) {
  const { filters, filterProducts, setCategory, setPrice } =
    useFiltersReducer();
  return (
    <FiltersContext.Provider
      value={{ filters, filterProducts, setCategory, setPrice }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
