import React, { useEffect } from 'react';
import Router from './router';
import NavBar from './components/navBar/navBar'
import { useLocation } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
      <Router />
    </div>
  )
}

export default App;
