import { getRandomFact } from '../services/fact';
import { useState, useEffect } from 'react';

export function useCatFact() {
  const [catFact, setCatFact] = useState('');

  const getNewFact = () => {
    getRandomFact().then((randomFact) => setCatFact(randomFact));
  };
  //Con async-await, porque la funcion getRandomFact() es asincrona, regresa una promesa
  // const getNewFact = async () => {
  //   const newFact = await getRandomFact();
  //   setCatFact(newFact);
  // };

  useEffect(() => {
    getNewFact();
  }, []);
  //Tambien se puede resumir asi cuando solo se le pasa una funcion
  // useEffect(getNewFact, []);

  return { catFact, getNewFact };
}
