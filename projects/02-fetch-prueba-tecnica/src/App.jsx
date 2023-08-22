import { useCatImg } from './hooks/useCatImg';
import { useCatFact } from './hooks/useCatFact';
import Ejemplo from './components/Ejemplo';

function App() {
  //CUSTOM HOOKS
  const { catFact, getNewFact } = useCatFact(); //Obtiene el fact
  const { catImgUrl } = useCatImg({ catFact }); //Obtiene la imagen dependiendo del fact

  const handleClick = async () => {
    getNewFact();
  };

  return (
    <>
      <button onClick={handleClick}>Get new fact</button>
      <h2>{catFact}</h2>

      {catImgUrl && <img src={catImgUrl} alt='Cat img' />}

      <Ejemplo />
    </>
  );
}

export default App;
