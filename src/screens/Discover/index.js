import React, { useContext, useCallback } from 'react';

import { REQUEST_STATES } from 'constants/network';
import { INPUT_TYPES } from 'constants/form';
import { MoviesContext } from 'context/movies';
import { debounce } from 'utils/debounce';
import Movie from 'components/Movie';
import Field from 'components/Field';

import { DISCOVER_FIELDS } from './constants';
import './styles.scss';

function Discover({ emptyResults, error, loading, movies, setSearchQuery }) {
  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, [setSearchQuery]);

  return (
    <section className="section section--discover">
      <div className="section__header">
        <h1 className="section__title">Everything you want to watch, the way you like it</h1>
        <Field
          className="section__search-input"
          type={INPUT_TYPES.SEARCH}
          name={DISCOVER_FIELDS.SEARCH}
          label="Look for a movie"
          onChange={handleSearch}
        />
      </div>
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
    </section>
  );
}

function DiscoverContainer() {
  const { error, movies, requestState, setSearchQuery } = useContext(MoviesContext);
  const debouncedSetSearchQuery = debounce(setSearchQuery);
  const emptyResults = (!movies || movies.length <= 0) && requestState === REQUEST_STATES.DONE;
  const loading = requestState === REQUEST_STATES.LOADING;

  return (
    <Discover
      emptyResults={emptyResults}
      error={error}
      loading={loading}
      movies={movies}
      setSearchQuery={debouncedSetSearchQuery}
    />
  )
}

export default DiscoverContainer;
