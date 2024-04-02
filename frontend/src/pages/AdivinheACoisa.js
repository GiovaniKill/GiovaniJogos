import '../styles/AdivinheACoisa.css';
import React, {useEffect, useState} from 'react';
import Chat from '../components/adivinheACoisa/Chat';
import AssistantProfile from '../components/adivinheACoisa/AssistantProfile';
import ChatsNavBar from '../components/adivinheACoisa/ChatsNavBar';
import AdivinheACoisaProvider from '../contexts/AdivinheACoisaProvider';

const AdivinheACoisa = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isChatsNavBarActive, setIsChatsNavBarActive] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);

  const isMobile = () => {
    return window.innerWidth < 640;
  };

  useEffect(() => {
    setIsChatActive(!isMobile());
  }, []);

  return (
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
  );
};

export default AdivinheACoisa;
