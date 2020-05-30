import React, { useEffect, useMemo, useReducer } from 'react';

import { REQUEST_STATES } from 'constants/network';
import { MoviesService } from 'services/movies';
import RatingMeter from 'components/RatingMeter';

import { reducer, initialState, ACTIONS } from './reducer';
import MoviesList from './components/MoviesList';
import SearchBar from './components/SearchBar';
import './styles.scss';


function Discover() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredMovies = useMemo(() => {
    return state.ratingFilter ? state.movies.filter(movie => movie.vote_average <= state.ratingFilter && movie.vote_average > state.ratingFilter - 2) : state.movies;
  }, [state.ratingFilter, state.movies]);

  const emptyResults = (!filteredMovies || filteredMovies.length <= 0) && state.queryStatus === REQUEST_STATES.DONE;
  const loading = state.queryStatus === REQUEST_STATES.LOADING;
  const isRatingMeterDisabled = loading || !state.movies || (state.movies && !state.movies.length);

  const getPopularMovies = () => {
    dispatch({ type: ACTIONS.GET_MOVIES });

    MoviesService.discover()
      .then(data => dispatch({ type: ACTIONS.GET_MOVIES_SUCCESS, payload: data.results }))
      .catch(err => dispatch({ type: ACTIONS.GET_MOVIES_FAILURE, payload: err }));
  };

  const searchMovie = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });

    MoviesService.search(query)
      .then(data => dispatch({ type: ACTIONS.SET_SEARCH_QUERY_SUCCESS, payload: data.results }))
      .catch(err => dispatch({ type: ACTIONS.SET_SEARCH_QUERY_FAILURE, payload: err }));
  }

  const handleSearch = (value) => {
    if (value && !!value.length) {
      searchMovie(value);
    } else {
      getPopularMovies();
    }
  };

  const handleFilter = (rating) => {
    dispatch({ type: ACTIONS.SET_RATING_FILTER, payload: rating });
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <section className="section section--discover">
      <div className="section__header">
        <h1 className="section__title">Everything you want to watch, the way you like it</h1>
        <SearchBar className="section__search-bar" onSearch={handleSearch} />
        <RatingMeter rating={state.ratingFilter} onChange={handleFilter} disabled={isRatingMeterDisabled} />
      </div>
      <MoviesList
        emptyResults={emptyResults}
        error={state.error}
        loading={loading}
        movies={filteredMovies}
      />
    </section>
  );
}

export default Discover;
