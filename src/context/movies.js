import React, { useState, useEffect } from 'react';

import { MoviesService } from 'services/movies';
import { REQUEST_STATES } from 'constants/network';

export const MoviesContext = React.createContext();

function MoviesContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [requestState, setRequestState] = useState(REQUEST_STATES.NOT_REQUESTED);

  const handleError = err => {
    setRequestState(REQUEST_STATES.ERROR);
    console.error(err);
    setError(err);
  };

  const getPopularMovies = () => {
    setRequestState(REQUEST_STATES.LOADING);

    MoviesService.discover()
    .then(data => {
      setRequestState(REQUEST_STATES.DONE);
      setMovies(data.results);
    })
    .catch(err => handleError);
  };

  const getMoviesByQuery = (query) => {
    setRequestState(REQUEST_STATES.LOADING);

    MoviesService.search(query)
      .then(data => {
        setRequestState(REQUEST_STATES.DONE);
        setMovies(data.results);
      })
      .catch(err => handleError);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      getMoviesByQuery(searchQuery);
      return;
    }

    getPopularMovies();
  }, [searchQuery]);

  return (
    <MoviesContext.Provider value={{ error, movies, requestState, setMovies, setSearchQuery, setRequestState}}>
      {children}
    </MoviesContext.Provider>
  );
}


export default MoviesContextProvider;
