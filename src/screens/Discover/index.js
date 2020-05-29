import React, { useEffect, useState } from 'react';

import { MoviesService } from 'services/movies';
import { REQUEST_STATES } from 'constants/network';
import Movie from 'components/Movie';

import './styles.scss';

function Discover() {
  const [movies, setMovies] = useState([]);
  const [requestState, setRequestState] = useState(REQUEST_STATES.NOT_REQUESTED);
  const loadingList = requestState === REQUEST_STATES.LOADING;

  useEffect(() => {
    setRequestState(REQUEST_STATES.LOADING);

    MoviesService.discover()
    .then(data => {
      setRequestState(REQUEST_STATES.DONE);
      setMovies(data.results);
    })
  }, []);

  return (
    <section className="section section--discover">
      <h1>Everything you want to watch, the way you like it</h1>
      <div className="movies-list">
        {!loadingList && (
          movies.map(movie => (
            <Movie key={movie.id} className="discover__movie" {...movie} />
          ))
        )}
        {loadingList && <h2>Loading movies...</h2>}
      </div>
    </section>
  );
}

export default Discover;
