import React, { useEffect, useReducer, useState, useContext } from 'react';

import { cn } from 'utils/styles';
import { ReactComponent as CancelIcon } from 'assets/cancel.svg';
import { REQUEST_STATES } from 'constants/network';
import { MoviesService } from 'services/movies';
import { MoviesContext } from 'contexts/movies';
import MovieDetail from 'components/MovieDetail';

import { ACTIONS, initialState, reducer } from './reducer';
import './styles.scss';

function MovieDetailModal() {
  const [{ movie, queryStatus }, dispatch] = useReducer(reducer, initialState);
  const { currentMovieId, setCurrentMovieId } = useContext(MoviesContext);
  const [visible, setVisible] = useState(false);

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      setVisible(false);
    }
  };

  const handleTransitionEnd = () => {
    if (!visible) {
      setCurrentMovieId(null);
      dispatch({ type: ACTIONS.RESET_MOVIE_DETAIL });
    }
  }

  const getMovieDetail = () => {
    if (currentMovieId) {
      dispatch({ type: ACTIONS.GET_MOVIE_DETAIL });

      MoviesService.movieDetail(currentMovieId)
        .then(data => dispatch({ type: ACTIONS.GET_MOVIE_DETAIL_SUCCESS, payload: data }))
        .catch(err => dispatch({ type: ACTIONS.GET_MOVIE_DETAIL_FAILURE, payload: err }));
    }
  };

  useEffect(() => {
    if (currentMovieId) {
      setVisible(true);
      getMovieDetail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovieId]);

  return currentMovieId ? (
    <div className={cn("modal", !visible && 'modal--hidden')} onClick={handleClick} onTransitionEnd={handleTransitionEnd}>
      <div className="modal__content-wrapper">
        {queryStatus === REQUEST_STATES.LOADING && <h3>Loading Movie Data...</h3>}
        {queryStatus === REQUEST_STATES.DONE && movie && <MovieDetail {...movie} />}
        <button className="modal__close-button" onClick={handleClick}>
          <CancelIcon />
        </button>
      </div>
    </div>
  ) : null;
}

export default MovieDetailModal;
