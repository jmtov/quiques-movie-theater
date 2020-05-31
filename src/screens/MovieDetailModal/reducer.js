import { REQUEST_STATES } from 'constants/network';

export const ACTIONS = {
  RESET_MOVIE_DETAIL: 'RESET_MOVIE_DETAIL',
  GET_MOVIE_DETAIL: 'GET_MOVIE_DETAIL',
  GET_MOVIE_DETAIL_SUCCESS: 'GET_MOVIE_DETAIL_SUCCESS',
  GET_MOVIE_DETAIL_FAILURE: 'GET_MOVIE_DETAIL_FAILURE',
}

export const initialState = {
  movie: null,
  queryStatus: REQUEST_STATES.NOT_REQUESTED,
};

export const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.GET_MOVIE_DETAIL:
      return { ...state, queryStatus: REQUEST_STATES.LOADING };
    case ACTIONS.GET_MOVIE_DETAIL_SUCCESS:
      return { ...state, queryStatus: REQUEST_STATES.DONE, movie: action.payload }
    case ACTIONS.GET_MOVIE_DETAIL_FAILURE:
      return { ...state, queryStatus: REQUEST_STATES.ERROR, error: action.payload }
    case ACTIONS.RESET_MOVIE_DETAIL:
      return { ...initialState }
    default:
      throw new Error();
  }
}
