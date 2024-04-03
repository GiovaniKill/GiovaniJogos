import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from './AdivinheACoisaContext';
import {getRequest} from '../services/requests';

const AdivinheACoisaProvider = ({children}) => {
  const [assistants, setAssistants] = useState([]);

  const [allMessages, setAllMessages] = useState({});

  const [activeAssistant, setActiveAssistant] = useState({});

  useEffect(() => {
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
  }, []);

  return (
    <AdivinheACoisaContext.Provider
      value={{
        activeAssistant,
        setActiveAssistant,
        assistants,
        allMessages,
        setAllMessages,
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
