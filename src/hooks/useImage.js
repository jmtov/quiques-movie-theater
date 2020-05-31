import { useContext, useState, useEffect } from 'react';
import { MoviesContext } from 'contexts/movies';

function useImage({ backdrop_path, poster_path }) {
  const [posters, setPosters] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const { config } = useContext(MoviesContext);
  const { images: { backdrop_sizes, poster_sizes, secure_base_url }} = config;

  useEffect(() => {
    if (poster_path) {
      const mappedPosterSizes = poster_sizes.map(posterSize => `${secure_base_url}${posterSize}${poster_path}`);
      setPosters(mappedPosterSizes);
    } else {
      setPosters([]);
    }

    if (backdrop_path) {
      const mappedBackdropSizes = backdrop_sizes.map(backdropSize => `${secure_base_url}${backdropSize}${backdrop_path}`);
      setBackdrops(mappedBackdropSizes);
    } else {
      setBackdrops([]);
    }
  }, [backdrop_path, backdrop_sizes, poster_sizes, secure_base_url, poster_path])

  return { posters, backdrops };
}

export default useImage;
