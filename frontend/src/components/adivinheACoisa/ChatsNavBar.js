import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';
import PropTypes from 'prop-types';
import ChatNavCard from './ChatNavCard';

const ChatsNavBar = ({setIsChatActive, setIsChatsNavBarActive}) => {
  const {
    activeAssistant,
    setActiveAssistant,
    assistants,
    allConversationsMessages,
  } = useContext(AdivinheACoisaContext);

  return (
    <motion.section
      initial={{x: '-80vh'}}
      animate={{
        x: 0,
        transition: {
          type: 'spring',
          duration: 0.3,
          ease: 'easeOut',
        },
      }}
      exit={{x: '100vh'}}
      className={`chats-nav-bar`}
    >
      <header className='chats-nav-bar-header'>
        <Link to='/'>
          <div className='home-page-arrow-container' title='giovanijogos.fun'>
            <img src='images/arrow-back.svg' className='home-page-arrow'/>
          </div>
        </Link>
        <p className='mr-10'>Conversas</p>
      </header>

      <motion.ol
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        {assistants.map((curr) => (
          <ChatNavCard
            key={curr.name}
            activeAssistant={activeAssistant}
            setActiveAssistant={setActiveAssistant}
            allConversationsMessages={allConversationsMessages}
            setIsChatsNavBarActive={setIsChatsNavBarActive}
            setIsChatActive={setIsChatActive}
            assistant={curr} />
        ))}
      </motion.ol>
    </motion.section>
  );
};

ChatsNavBar.propTypes = {
  isChatsNavBarActive: PropTypes.bool.isRequired,
  setIsChatsNavBarActive: PropTypes.func.isRequired,
  setIsChatActive: PropTypes.func.isRequired,
};

export default ChatsNavBar;
