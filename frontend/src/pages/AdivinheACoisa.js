import React, {useState} from 'react';
import Chat from '../components/adivinheACoisa/Chat';
import {AssistantProfile} from '../components/adivinheACoisa/AssistantProfile';
import {ChatsNavBar} from '../components/adivinheACoisa/ChatsNavBar';
import AdivinheACoisaProvider from '../contexts/AdivinheACoisaProvider';

const AdivinheACoisa = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);

  return (
    <AdivinheACoisaProvider>
      <div className='adivinhe-a-coisa'>
        <ChatsNavBar/>
        <Chat
          isProfileActive={isProfileActive}
          setIsProfileActive={setIsProfileActive}
        />
        {isProfileActive && <AssistantProfile
          setIsProfileActive={setIsProfileActive}/>}
      </div>
    </AdivinheACoisaProvider>
  );
};

export default AdivinheACoisa;
