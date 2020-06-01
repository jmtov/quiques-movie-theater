import React, { useEffect, useMemo, useReducer, useContext, useState } from 'react';

import EMLogo from 'assets/logo.png';
import { REQUEST_STATES } from 'constants/network';
import { MoviesContext } from 'contexts/movies';
import { MoviesService } from 'services/movies';
import RatingMeter from 'components/RatingMeter';

import { ACTIONS, reducer, initialState } from './reducer';
import MoviesList from './components/MoviesList';
import SearchBar from './components/SearchBar';
import './styles.scss';

const DEFAULT_LIST_TITLE = 'Popular Now';

function Discover() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setCurrentMovieId } = useContext(MoviesContext);
  const [listTitle, setListTitle] = useState(DEFAULT_LIST_TITLE);

  const filteredMovies = useMemo(() => {
    return state.ratingFilter ? state.movies.filter(movie => movie.vote_average <= state.ratingFilter && movie.vote_average > state.ratingFilter - 1) : state.movies;
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
  };

  const handleSearch = (value) => {
    if (value && !!value.length) {
      setListTitle(`Search results for: ${value}`);
      searchMovie(value);
    } else {
      setListTitle(DEFAULT_LIST_TITLE);
      getPopularMovies();
    }
  };

  const handleFilter = (rating) => {
    dispatch({ type: ACTIONS.SET_RATING_FILTER, payload: rating });
  };

  const handleMovieSelect = (id) => {
    setCurrentMovieId(id);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <section className="section section--discover">
      <div className="section__header">
        <div className="content-wrapper">
          <img src={EMLogo} className="header__logo" alt="Quique's Cinema" />
          <h1 className="header__title">Everything you want to watch, the way you like it</h1>
          <SearchBar className="header__search-bar" onSearch={handleSearch} />
        </div>
      </div>
      <div className="section__content">
        <div className="list-header">
          <div className="content-wrapper">
            <h3 className="list-header__title">{listTitle}</h3>
            <div className="list-header__filter">
              <span className="filter__title"> Filter by rating: </span>
              <RatingMeter rating={state.ratingFilter} onChange={handleFilter} disabled={isRatingMeterDisabled} />
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <MoviesList
            emptyResults={emptyResults}
            error={state.error}
            loading={loading}
            movies={filteredMovies}
            onMovieSelect={handleMovieSelect}
          />
        </div>
      </div>
    </section>
  );
}

export default Discover;
