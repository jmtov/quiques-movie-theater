import React, { useEffect, useState } from 'react';

import { MoviesService } from '../../services/movies';
import { REQUEST_STATES } from '../../constants/network';

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
      <h1>Movies</h1>
      {!loadingList && (
        movies.map(movie => (
          <h3 key={movie.id}>{movie.title}</h3>
        ))
      )}
      {loadingList && <h2>Loading movies...</h2>}
    </section>
  );
}

export default Discover;
