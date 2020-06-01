import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';

import Movie from 'components/Movie';
import { moviePropType } from 'propTypes/movie';

import './styles.scss';

function MoviesList({ emptyResults, error, loading, movies, onMovieSelect }) {

  return (
    <div className="list">
      {loading && <h2>Loading movies...</h2>}
      {emptyResults && <h2>No results ¯\_(ツ)_/¯</h2>}
      {error && <h2>{error}</h2>}
      {!loading && movies && !!movies.length && (
        movies.map(movie => (
          <Movie
            key={movie.id}
            className="list__item"
            onSelect={onMovieSelect}
            {...movie}
          />
        ))
      )}
    </div>
  );
};

MoviesList.propTypes = {
  emptyResults: bool,
  error: string,
  loading: bool,
  movies: arrayOf(moviePropType),
  onMovieSelect: func.isRequired,
};

export default MoviesList;
