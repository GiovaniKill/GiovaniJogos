import '../styles/AdivinheACoisa.css';
import React, {useEffect, useState} from 'react';
import Chat from '../components/adivinheACoisa/Chat';
import AssistantProfile from '../components/adivinheACoisa/AssistantProfile';
import ChatsNavBar from '../components/adivinheACoisa/ChatsNavBar';
import AdivinheACoisaProvider from '../contexts/AdivinheACoisaProvider';
import Login from '../components/adivinheACoisa/Login';
import {getRequest} from '../services/requests';

const AdivinheACoisa = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isChatsNavBarActive, setIsChatsNavBarActive] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateAuthentication = () => {
    getRequest('adivinheacoisa/validateandrenew', true)
        .then((response) => {
          if (response.status === 202) {
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          setIsAuthenticated(false);
        });
  };

  const isMobile = () => {
    return window.innerWidth < 640;
  };


  useEffect(() => {
    setIsChatActive(!isMobile());

    validateAuthentication();
  }, []);

  return (
    <div className='h-[100dvh]'>
      {!isAuthenticated ?
      <Login setIsAuthenticated={setIsAuthenticated}/> :
      <AdivinheACoisaProvider>
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
      </AdivinheACoisaProvider>
      }
    </div>
  );
};

export default AdivinheACoisa;
