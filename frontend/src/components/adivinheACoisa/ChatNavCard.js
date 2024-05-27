import React, {useContext, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';


const ChatNavCard = ({setActiveAssistant, setIsChatsNavBarActive,
  setIsChatActive, activeAssistant,
  assistant}) => {
  const {allConversationsMessages} = useContext(AdivinheACoisaContext);
  const [lastMessage, setLastMessage] = useState({role: 'assistant'});

  useEffect(() => {
    const conversationMessages = allConversationsMessages
        .filter((curr) => curr.assistantId === assistant.id);
    setLastMessage(() => (
      conversationMessages[conversationMessages.length - 1] || {}
    ));
  }, [allConversationsMessages]);

  return (
    <motion.li
      initial={{opacity: 0}}
      animate={{opacity: 1, staggerChildren: 0.5}}
      transition={{duration: 0.5}}
      className={`
            conversation-card 
            ${activeAssistant.name === assistant.name &&
              'bg-slate-300/70 dark:bg-gray-600/80'}
            `}
      onClick={() => {
        setActiveAssistant(assistant);
        setIsChatsNavBarActive(false);
        setIsChatActive(true);
      }}
    >
      <img
        src={assistant.profilePic}
        className='conversation-card-profile-pic'
      />
      <div className='conversation-card-name-and-last-message'>
        <p>{assistant.name}</p>
        <p className='conversation-card-last-message'>
          {lastMessage.role === 'user' ? 'Você: ' : ''}
          {lastMessage.message || ''}
        </p>
      </div>
    </motion.li>
  );
};

ChatNavCard.propTypes = {
  setActiveAssistant: PropTypes.func.isRequired,
  setIsChatsNavBarActive: PropTypes.func.isRequired,
  setIsChatActive: PropTypes.func.isRequired,
  activeAssistant: PropTypes.object.isRequired,
  assistant: PropTypes.object.isRequired,
};

export default ChatNavCard;
