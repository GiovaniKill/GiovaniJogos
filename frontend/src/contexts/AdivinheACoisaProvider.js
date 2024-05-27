import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from './AdivinheACoisaContext';
import {getRequest} from '../services/requests';
import LoadingScreen from '../components/adivinheACoisa/LoadingScreen';

const AdivinheACoisaProvider = ({children}) => {
  const [assistants, setAssistants] = useState([]);

  const [allConversationsMessages, setAllConversationsMessages] = useState([]);

  const [activeAssistant, setActiveAssistant] = useState({});

  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Setting prefered theme
    if (window.matchMedia('prefers-color-scheme:dark').matches) {
      setIsDarkModeOn(true);
    } else {
      setIsDarkModeOn(false);
    }

    // Getting assistants from API
    getRequest('adivinheacoisa/getassistants')
        .then(async (data) => {
          const parsedAssistants = await JSON.parse(data);
          const assistantsWithConvertedImages = parsedAssistants.map(
              (curr) => ({
                ...curr,
                profilePic: 'data:image/svg+xml;base64,' + curr.profilePic,
              }));
          setAssistants(assistantsWithConvertedImages);
          const randomAssistant = assistantsWithConvertedImages[
              Math.floor(Math.random() * assistantsWithConvertedImages.length)
          ];
          setActiveAssistant(randomAssistant);
        })
        .catch((e) => {
          window.alert('Zap caiu 😮‍💨, tente de novo mais tarde');
          console.log(e);
        });

    // Retrieving messages from database
    getRequest('adivinheacoisa/getalllastmessages')
        .then(async (data) => {
          const parsedMessages = await JSON.parse(data);
          await setAllConversationsMessages(parsedMessages.messages);
        })
        .catch((e) => {
          window.alert('Erro ao recuperar mensagens');
          console.log(e);
        });

    setTimeout(() => setIsLoading(false), 2500);
  }, []);

  useEffect(() => {
    if (isDarkModeOn) {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
      }
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkModeOn]);

  return (
    <AdivinheACoisaContext.Provider
      value={{
        activeAssistant,
        setActiveAssistant,
        assistants,
        allConversationsMessages,
        setAllConversationsMessages,
        isDarkModeOn,
        setIsDarkModeOn,
      }}
    >
      {isLoading ? <LoadingScreen/> : children}
    </AdivinheACoisaContext.Provider>
  );
};

AdivinheACoisaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdivinheACoisaProvider;
