import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Palavrou from './pages/Palavrou';
import MainPage from './pages/MainPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';

/**
 * Routing
 * @return {Routes}
 */
function App() {
  return (
    <Routes>
      <Route path="/palavrou" element={ <Palavrou /> } />
      <Route path="/termosdeservico" element={ <TermsOfService /> } />
      <Route path="/politicadeprivacidade" element={ <PrivacyPolicy /> } />
      <Route path="/politicadecookies" element={ <CookiesPolicy /> } />
      <Route exact path="/" element={ <MainPage /> } />
    </Routes>
  );
}

export default App;
