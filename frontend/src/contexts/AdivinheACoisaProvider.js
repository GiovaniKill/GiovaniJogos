import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from './AdivinheACoisaContext';
import {getRequest} from '../services/requests';

const AdivinheACoisaProvider = ({children}) => {
  const [assistants, setAssistants] = useState([]);

  const [allMessages, setAllMessages] = useState({});

  const [activeAssistant, setActiveAssistant] = useState({});

  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  useEffect(() => {
    // Getting assistant from API
    getRequest('adivinheacoisa/getassistants')
        .then(async (data) => {
          const parsedAssistants = await JSON.parse(data);
          const assistantsWithConvertedImages = parsedAssistants.map(
              (curr) => ({
                ...curr,
                profilePic: 'data:image/svg+xml;base64,' + curr.profilePic,
              }));
          setAssistants(assistantsWithConvertedImages);
          setActiveAssistant(assistantsWithConvertedImages[0]);
        })
        .catch((e) => {
          window.alert('Zap caiu 😮‍💨, tente de novo mais tarde');
          console.log(e);
        });

    // Retrieving messages from local storage
    const localStorageMessages = JSON.parse(
        localStorage.getItem('chatMessages')) || [];

    setAllMessages(localStorageMessages);

    // Setting prefered theme
    if (window.matchMedia('prefers-color-scheme:dark').matches) {
      setIsDarkModeOn(true);
    } else {
      setIsDarkModeOn(false);
    }
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
        allMessages,
        setAllMessages,
        isDarkModeOn,
        setIsDarkModeOn,
      }}
    >
      {children}
    </AdivinheACoisaContext.Provider>
  );
};

AdivinheACoisaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdivinheACoisaProvider;
