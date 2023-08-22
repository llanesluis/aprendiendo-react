import React from 'react';
import { useCatImg } from '../hooks/useCatImg';

const Ejemplo = () => {
  const { catImgUrl } = useCatImg({ catFact: 'Random fact xd' });
  return <img src={catImgUrl} alt='' />;
};

export default Ejemplo;
