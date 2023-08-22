import { useId } from 'react';
import useFilters from '../hooks/useFilters';
import '../styles/Filters.css';

export default function Filters() {
  //useFilter utiliza el contexto, ya hay un provider de primer nivel del cual se toman los datos...
  const { filters, setCategory, setPrice } = useFilters();

  //Asigna un ID unico y siempre igual que funciona en serverside rendring
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio</label>
        <input
          id={minPriceFilterId}
          type='range'
          min='0'
          max='1000'
          onChange={(e) => setPrice(e.target.value)}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoria</label>
        <select id={categoryFilterId} onChange={handleCategoryChange}>
          <option value='all'>All</option>
          <option value='smartphones'>Smartphones</option>
          <option value='laptops'>Laptops</option>
          <option value='groceries'>Groceries</option>
          <option value='skincare'>Skin Care</option>
          <option value='fragrances'>Fragences</option>
          <option value='home-decoration'>Home Decoration</option>
        </select>
      </div>
    </section>
  );
}
