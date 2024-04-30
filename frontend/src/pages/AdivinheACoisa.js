import '../styles/AdivinheACoisa.css';
import React, {useEffect, useState} from 'react';
import Chat from '../components/adivinheACoisa/Chat';
import AssistantProfile from '../components/adivinheACoisa/AssistantProfile';
import ChatsNavBar from '../components/adivinheACoisa/ChatsNavBar';
import AdivinheACoisaProvider from '../contexts/AdivinheACoisaProvider';
import Login from '../components/adivinheACoisa/Login';
import {jwtDecode} from 'jwt-decode';

const AdivinheACoisa = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isChatsNavBarActive, setIsChatsNavBarActive] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateAuthentication = (cookies) => {
    const token = cookies?.split('; ')
        .find((c) => c.startsWith('jwtToken')).split('=')[1];
    if (token) {
      try {
        jwtDecode(token);
      } catch (error) {
        setIsAuthenticated(false);
        return;
      }
    } else {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
  };

  const isMobile = () => {
    return window.innerWidth < 640;
  };


  useEffect(() => {
    setIsChatActive(!isMobile());

    validateAuthentication(document.cookies);
  }, []);

  return (
    <AdivinheACoisaProvider>
      {!isAuthenticated ?
      <Login /> :
      <div className='adivinhe-a-coisa'>
        {(isChatsNavBarActive || !isMobile()) &&
        <ChatsNavBar
          isChatsNavBarActive={isChatsNavBarActive}
          setIsChatsNavBarActive={setIsChatsNavBarActive}
          setIsChatActive={setIsChatActive}
        />}
        {isChatActive &&
        <Chat
          isProfileActive={isProfileActive}
          setIsProfileActive={setIsProfileActive}
          isChatsNavBarActive={isChatsNavBarActive}
          setIsChatsNavBarActive={setIsChatsNavBarActive}
          setIsChatActive={setIsChatActive}
        />}
        {isProfileActive &&
        <AssistantProfile
          setIsProfileActive={setIsProfileActive}/>}
      </div>
      }
    </AdivinheACoisaProvider>
  );
};

export default AdivinheACoisa;
