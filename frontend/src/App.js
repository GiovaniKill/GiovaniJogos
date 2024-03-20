import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Palavrou from './pages/Palavrou';
import MainPage from './pages/MainPage';
import {AdvinheACoisa} from './pages/AdvinheACoisa';

/**
 * Routing
 * @return {Routes}
 */
function App() {
  return (
    <Routes>
      <Route path="/palavrou" element={ <Palavrou /> } />
      <Route exact path="/advinheacoisa" element={ <AdvinheACoisa /> } />
      <Route exact path="/" element={ <MainPage /> } />
    </Routes>
  );
}

export default App;
