import React from 'react';

import Movie from 'components/Movie';

import './styles.scss';

function MoviesList({ emptyResults, error, loading, movies, ratingFilter }) {
  return (
    <div className="movies-list">
      {loading && <h2>Loading movies...</h2>}
      {emptyResults && <h2>No results ¯\_(ツ)_/¯</h2>}
      {error && <h2>{error}</h2>}
      {!loading && movies && !!movies.length && (
        movies.map(movie => (
          <Movie key={movie.id} className="discover__movie" {...movie} />
        ))
      )}
    </div>
  );
}

export default MoviesList;
