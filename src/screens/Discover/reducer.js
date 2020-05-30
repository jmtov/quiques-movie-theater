import { REQUEST_STATES } from 'constants/network';

export const ACTIONS = {
  GET_MOVIES: 'GET_MOVIES',
  GET_MOVIES_SUCCESS: 'GET_MOVIES_SUCCESS',
  GET_MOVIES_FAILURE: 'GET_MOVIES_FAILURE',
  SET_RATING_FILTER: 'SET_RATING_FILTER',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_QUERY_SUCCESS: 'SET_SEARCH_QUERY_SUCCESS',
  SET_SEARCH_QUERY_FAILURE: 'SET_SEARCH_QUERY_FAILURE',
}

export const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.GET_MOVIES:
      return { ...state, queryStatus: REQUEST_STATES.LOADING };
    case ACTIONS.GET_MOVIES_SUCCESS:
      return { ...state, queryStatus: REQUEST_STATES.DONE, movies: action.payload }
    case ACTIONS.GET_MOVIES_FAILURE:
      return { ...state, queryStatus: REQUEST_STATES.ERROR, error: action.payload }
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, queryStatus: REQUEST_STATES.LOADING, searchQuery: action.payload };
    case ACTIONS.SET_SEARCH_QUERY_SUCCESS:
      return { ...state, queryStatus: REQUEST_STATES.DONE, movies: action.payload }
    case ACTIONS.SET_SEARCH_QUERY_FAILURE:
      return { ...state, queryStatus: REQUEST_STATES.ERROR, error: action.payload }
    case ACTIONS.SET_RATING_FILTER:
      const newRatingFilter = action.payload === state.ratingFilter ? null : action.payload;
      return { ...state, ratingFilter: newRatingFilter };
    default:
      throw new Error();
  }
}

export const initialState = {
  movies: [],
  queryStatus: REQUEST_STATES.NOT_REQUESTED,
  ratingFilter: null,
  searchQuery: '',
};
