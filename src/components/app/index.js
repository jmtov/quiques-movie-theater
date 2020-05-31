import React from 'react';

import MoviesContextProvider from 'contexts/movies';
import Discover from 'screens/Discover';
import MovieDetailModal from 'screens/MovieDetailModal';

function App() {
  return (
    <div className="app">
      <MoviesContextProvider>
        <Discover />
        <MovieDetailModal />
      </MoviesContextProvider>
    </div>
  );
}

export default App;
