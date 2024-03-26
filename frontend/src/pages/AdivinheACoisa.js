/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Chat from '../components/adivinheACoisa/Chat';
import {AssistantProfile} from '../components/adivinheACoisa/AssistantProfile';
import {ChatsNavBar} from '../components/adivinheACoisa/ChatsNavBar';

const AdivinheACoisa = () => {
  const [isChatNavBarOpen, setIsChatNavBarOpen] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);


  return (
    <div className='adivinhe-a-coisa'>
      <ChatsNavBar/>
      <Chat
        isChatNavBarOpen={isChatNavBarOpen}
        isProfileActive={isProfileActive}
        setIsProfileActive={setIsProfileActive}
      />
      {isProfileActive && <AssistantProfile/>}
    </div>
  );
};

export default AdivinheACoisa;
