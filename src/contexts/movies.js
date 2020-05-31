import React, { useReducer, useEffect } from 'react';

import { REQUEST_STATES } from 'constants/network';
import { MoviesService } from 'services/movies';

export const MoviesContext = React.createContext();

export const ACTIONS = {
  GET_CONFIG: 'GET_CONFIG',
  GET_CONFIG_SUCCESS: 'GET_CONFIG_SUCCESS',
  GET_CONFIG_FAILURE: 'GET_CONFIG_FAILURE',
  SET_CURRENT_MOVIE_ID: 'SET_CURRENT_MOVIE_ID',
}

export const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.GET_CONFIG:
      return { ...state, configQueryStatus: REQUEST_STATES.LOADING };
    case ACTIONS.GET_CONFIG_SUCCESS:
      return { ...state, configQueryStatus: REQUEST_STATES.DONE, config: action.payload };
    case ACTIONS.GET_CONFIG_FAILURE:
      return { ...state, configQueryStatus: REQUEST_STATES.ERROR, error: action.payload };
    case ACTIONS.SET_CURRENT_MOVIE_ID:
      return { ...state, currentMovieId: action.payload };
    default:
      throw new Error();
  }
}

export const initialState = {
  config: null,
  configQueryStatus: REQUEST_STATES.NOT_REQUESTED,
  currentMovie: null,
};


function MoviesContextProvider({ children }) {
  const [{ config, currentMovieId }, dispatch] = useReducer(reducer, initialState);

  const getConfig = () => {
    dispatch({ type: ACTIONS.GET_CONFIG });

    MoviesService.configuration()
      .then(data => dispatch({ type: ACTIONS.GET_CONFIG_SUCCESS, payload: data }))
      .catch(err => dispatch({ type: ACTIONS.GET_CONFIG_FAILURE, payload: err }));
  }

  const setCurrentMovieId = (id) => {
    dispatch({ type: ACTIONS.SET_CURRENT_MOVIE_ID, payload: id });
  }

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <MoviesContext.Provider value={{ config, currentMovieId, setCurrentMovieId }}>
      {config && children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
