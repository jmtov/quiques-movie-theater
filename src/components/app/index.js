import React, { useEffect } from 'react';
import { MoviesService } from '../../services/movies';

import Discover from '../../screens/Discover';

function App() {
  useEffect(() => {
    MoviesService.discover()
    .then(data => {
      console.log(data);
    })
  }, []);

  return (
    <div className="app">
      <Discover />
    </div>
  );
}

export default App;
