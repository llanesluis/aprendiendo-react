const API_KEY = '4287ad07';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export const searchMovies = async ({ search }) => {
  if (search === '') return null;

  try {
    const resp = await fetch(`${API_URL}${search}`);
    const json = await resp.json();

    const movies = json.Search;

    //Mapped movies es para no utilizar el contrato de la api directamente
    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

    return mappedMovies;
  } catch (e) {
    throw new Error('Error searching movies');
  }
};
