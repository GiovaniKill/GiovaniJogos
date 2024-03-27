import React, {useEffect, useState} from 'react';
import Chat from '../components/adivinheACoisa/Chat';
import {AssistantProfile} from '../components/adivinheACoisa/AssistantProfile';
import {ChatsNavBar} from '../components/adivinheACoisa/ChatsNavBar';
import {getRequest} from '../services/requests';

const AdivinheACoisa = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);

  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    getRequest('adivinheacoisa/getassistants')
        .then(async (data) => {
          const parsedData = await JSON.parse(data);
          const objWithConvertedImages = parsedData.map((curr) => ({
            ...curr,
            profilePic: 'data:image/svg+xml;base64,' + curr.profilePic,
          }));
          setAssistants(objWithConvertedImages);
        })
        .catch((e) => {
          window.alert('Zap caiu 😮‍💨, tente de novo mais tarde');
          console.log(e);
        });
  }, []);


  return (
    <div className='adivinhe-a-coisa'>
      <ChatsNavBar assistants={assistants}/>
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
