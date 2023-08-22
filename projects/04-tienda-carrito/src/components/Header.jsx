import React from 'react';
import Filters from './Filters';
import FiltersProvider from '../context/filters';

export default function Header() {
  return (
    <header>
      <h1>React Shop</h1>
      <Filters />
    </header>
  );
}
