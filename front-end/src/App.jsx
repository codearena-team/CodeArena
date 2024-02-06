import React, { useEffect } from 'react';
import Router from './router';
import NavBar from './components/navBar/navBar'
import { useLocation } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <div className='font-sulight'>
      <NavBar />
      <Router />
    </div>
  )
}

export default App;
