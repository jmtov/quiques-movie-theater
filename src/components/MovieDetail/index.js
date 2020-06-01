import React from 'react';

import useImage from 'hooks/useImage';
import RatingMeter from 'components/RatingMeter';

import styles from './styles.module.scss';

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
    <div className={styles['movie-detail']}>
      <div className={styles['movie-detail__header']} style={{ backgroundImage: `url(${backdrop})` }}>
        {poster && <img className={styles['header__poster']} src={poster} alt={title} />}
        <div className={styles['header__main-data']}>
          <h2 className={styles['header__title']}>{original_title}</h2>
          {tagline && <h3 className={styles['header__tagline']}>{tagline}</h3>}
          {vote_average && <RatingMeter className={styles['header__rating']} rating={vote_average} readOnly />}
          {runtime && <span className={styles['header__runtime']}>{`${runtime} min`}</span>}
        </div>
      </div>
      <div className={styles['movie-detail__data']}>
        {title && (
          <div className={styles['data-bit']}>
            <h3 className={styles['data-bit__title']}>Title</h3>
            <p className={styles['data-bit__value']}>{title}</p>
          </div>
        )}
        {overview && (
          <div className={styles['data-bit']}>
            <h3 className={styles['data-bit__title']}>Overview</h3>
            <p className={['data-bitstyles__value']}>{overview}</p>
          </div>
        )}
        {genres && !genres.length && (
          <div className={styles['data-bit']}>
            <h3 className={styles['data-bit__title']}>Genres</h3>
            <p className={styles['data-bit__value']}>
              {genres.map((genre) => <span>{genre.name}</span>)}
            </p>
          </div>
        )}
        {production_countries && !!production_countries.length && (
          <div className={styles['data-bit']}>
            <h3 className={styles['data-bit__title']}>Country</h3>
            <p className={styles['data-bit__value value-list']}>
              {production_countries.map((country) => <span className={styles['value-list__item']}>{country.name}</span>)}
            </p>
          </div>
        )}
        {homepage && (
          <div className={styles['data-bit']}>
            <h3 className={styles['data-bit__title']}>Website</h3>
            <p className={styles['data-bit__value']}>
              <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
