import React from 'react';

export function ListOfMovies({ movies }) {
  return (
    <ul className='movies'>
      {movies?.map((movie) => (
        <li key={movie.id} className='movie'>
          <h3 className='title'>{movie.title}</h3>
          <h4>{movie.year}</h4>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

export function NoMoviesFound() {
  return <h3>No movies found...</h3>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesFound />;
}
