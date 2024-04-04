import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';
import PropTypes from 'prop-types';

const ChatsNavBar = ({setIsChatActive, setIsChatsNavBarActive}) => {
  const {
    setActiveAssistant,
    assistants,
    allMessages,
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
          <motion.li
            initial={{opacity: 0}}
            animate={{opacity: 1, staggerChildren: 0.5}}
            transition={{duration: 0.5}}
            key={curr.name}
            className='conversation-card'
            onClick={() => {
              setActiveAssistant(curr);
              setIsChatsNavBarActive(false);
              setIsChatActive(true);
            }}
          >
            <img
              src={curr.profilePic}
              className='conversation-card-profile-pic'
            />
            <div className='conversation-card-name-and-last-message'>
              <p>{curr.name}</p>
              <p className='conversation-card-last-message'>
                {allMessages[curr.name]?.role === 'assistant' ? '' : 'Você: '}
                {allMessages[curr.name]?.
                    [allMessages[curr.name].length - 1]?.message || ''}
              </p>
            </div>
          </motion.li>
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
