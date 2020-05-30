import React, { useEffect } from 'react';

import Discover from '../../screens/Discover';
import MoviesContextProvider from 'context/movies';

function App() {
  useEffect(() => {
    // TODO: Add configuration request
  }, []);

  return (
    <div className="app">
      <MoviesContextProvider>
        <Discover />
      </MoviesContextProvider>
    </div>
  );
}

export default App;
