import React, { useEffect, useState } from 'react';
import { number, string } from 'prop-types';

import { cn } from 'utils/styles';

import './styles.scss';

function Movie({ className, id, title, poster_path, release_date }) {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    // TODO: Add logic to get movie poster
    setPoster(null);
  }, []);

  return (
    <div className={cn("movie", className)}>
      <div className="movie__data-container">
        <h3 className="movie__title">{title}</h3>
        <p className="movie__release-date">{release_date}</p>
      </div>
      <div className="movie__poster-container">
        {poster && <img className="movie__poster" alt={title} />}
      </div>
    </div>
  )
}

Movie.propTypes = {
  title: string.isRequired,
  release_date: string.isRequired,
  className: string,
  id: number.isRequired,
  poster_path: string.isRequired
}

export default Movie;
