import React, { useEffect, useState } from 'react';
import Router from './router';
import NavBar from './components/navBar/navBar'
import { useLocation } from 'react-router-dom';
import './index.css';

function App() {
  const location = useLocation()
  const [isArena, setIsArena] = useState(false)

  useEffect(()=> {
    const path = location.pathname
    console.log(path);
    if (path.includes('game-list') && !(path === '/game-list/competition' || path === '/game-list/group')  ) {
      setIsArena(true)
    } else {
      setIsArena(false)
    }
  },[location.pathname])



  return (
    <div className='font-sulight'>
      {
        isArena ?
          null
        :
          <NavBar />
      }
      
      <Router />
    </div>
  )
}

export default App;
