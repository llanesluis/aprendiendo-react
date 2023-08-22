//Extraccion de la logica para obtener un nuevo fact
export const getRandomFact = async () => {
  const res = await fetch('https://catfact.ninja/fact');
  const data = await res.json();
  const { fact } = data;
  return fact;
};
