import React, { useState } from 'react';
import Login from './components/Login';
import SeriesList from './components/SeriesList';
import axios from 'axios';

axios.defaults.withCredentials = true; // Enable session cookies

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <SeriesList setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;