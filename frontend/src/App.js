import {Routes, Route} from 'react-router-dom';
import React from 'react';
import Palavrou from './pages/Palavrou';
import MainPage from './pages/MainPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';
import AdivinheACoisa from './pages/AdivinheACoisa';
import GiovaniJogosProvider from './contexts/GiovaniJogosProvider';

/**
 * Routing
 * @return {Routes}
 */
function App() {
  return (
    <GiovaniJogosProvider>
      <Routes>
        <Route exact path="/palavrou" element={ <Palavrou /> } />
        <Route exact path="/adivinheacoisa" element={ <AdivinheACoisa /> } />
        <Route exact path="/termosdeservico" element={ <TermsOfService /> } />
        <Route exact path="/politicadeprivacidade" element={ <PrivacyPolicy /> } />
        <Route exact path="/politicadecookies" element={ <CookiesPolicy /> } />
        <Route path="/" element={ <MainPage /> } />
      </Routes>
    </GiovaniJogosProvider>

  );
}

export default App;
