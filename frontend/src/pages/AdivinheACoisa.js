import React, {useState} from 'react';
import Chat from '../components/adivinheACoisa/Chat';
import {AssistantProfile} from '../components/adivinheACoisa/AssistantProfile';
import {ChatsNavBar} from '../components/adivinheACoisa/ChatsNavBar';

const AdivinheACoisa = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);


  return (
    <div className='adivinhe-a-coisa'>
      <ChatsNavBar/>
      <Chat
        isProfileActive={isProfileActive}
        setIsProfileActive={setIsProfileActive}
      />
      {isProfileActive && <AssistantProfile
        setIsProfileActive={setIsProfileActive}/>}
    </div>
  );
};

export default AdivinheACoisa;
