import React from 'react';

import useImage from 'hooks/useImage';
import RatingMeter from 'components/RatingMeter';

import './styles.scss';

function MovieDetail({
  backdrop_path,
  genres,
  homepage,
  original_title,
  overview,
  poster_path,
  production_countries,
  runtime,
  tagline,
  title,
  vote_average
}) {
  const { posters, backdrops } = useImage({ backdrop_path, poster_path });
  const backdrop = backdrops[1];
  const poster = posters[5];

  return (
    <div className="detail">
      <div className="detail__header" style={{ backgroundImage: `url(${backdrop})` }}>
        {poster && <img className="header__poster" src={poster} alt={title} />}
        <div className="header__main-data">
          <h2 className="header__title">{original_title}</h2>
          {tagline && <h3 className="header__tagline">{tagline}</h3>}
          {vote_average && <RatingMeter className="header__rating" rating={vote_average} readOnly />}
          {runtime && <span className="header__runtime">{`${runtime} min`}</span>}
        </div>
      </div>
      <div className="detail__data">
        {title && (
          <div className="data">
            <h3 className="data__title">Title</h3>
            <p className="data__value">{title}</p>
          </div>
        )}
        {overview && (
          <div className="data">
            <h3 className="data__title">Overview</h3>
            <p className="data__value">{overview}</p>
          </div>
        )}
        {genres && !genres.length && (
          <div className="data">
            <h3 className="data__title">Genres</h3>
            <p className="data__value">
              {genres.map((genre) => <span>{genre.name}</span>)}
            </p>
          </div>
        )}
        {production_countries && !!production_countries.length && (
          <div className="data">
            <h3 className="data__title">Country</h3>
            <p className="data__value">
              {production_countries.map((country) => <span>{country.name}</span>)}
            </p>
          </div>
        )}
        {homepage && (
          <div className="data">
            <h3 className="data__title">Website</h3>
            <p className="data__value">
              <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
