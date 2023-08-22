import { useEffect, useState } from 'react';
const LINK_PREV = 'https://cataas.com/cat/says/';

export const useCatImg = ({ catFact }) => {
  const [catImgUrl, setCatImgUrl] = useState('');

  useEffect(() => {
    if (!catFact) return;
    const primeraPalabra = catFact.split(' ', 1);

    const catImgUrl = `${LINK_PREV}${primeraPalabra}`;

    console.log(catImgUrl);
    setCatImgUrl(catImgUrl);
  }, [catFact]);

  return { catImgUrl };
};
