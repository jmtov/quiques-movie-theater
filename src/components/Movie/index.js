import React from 'react';
import { func, number, string } from 'prop-types';

import { cn } from 'utils/styles';
import useImage from 'hooks/useImage';

import './styles.scss';

function Movie({ backdrop_path, className, id, onSelect, poster_path, release_date, title }) {
  const { posters } = useImage({ poster_path, backdrop_path });
  const poster = posters[3];

  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div className={cn("movie", className, !poster && 'movie--no-poster')} onClick={handleClick} tabIndex={0}>
      <div className="movie__poster-container">
        {poster && <img className="movie__poster" src={poster} alt={title} />}
      </div>
      <div className="movie__data-container">
        <h3 className="movie__title">{title}</h3>
        {release_date && <p className="movie__release-date">{release_date.split('-')[0]}</p>}
      </div>
    </div>
  )
}

Movie.propTypes = {
  className: string,
  id: number.isRequired,
  onSelect: func.isRequired,
  poster_path: string.isRequired,
  release_date: string.isRequired,
  title: string.isRequired,
}

export default Movie;
