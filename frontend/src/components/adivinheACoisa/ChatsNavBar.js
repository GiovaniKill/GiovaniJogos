import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';

const ChatsNavBar = () => {
  const {
    setActiveAssistant,
    assistants,
    lastMessages} = useContext(AdivinheACoisaContext);

  console.log(lastMessages);

  return (
    <motion.section
      className='chats-nav-bar'
    >
      <header className='chats-nav-bar-header'>
        <Link to='/'>
          <div className='home-page-arrow-container' title='giovanijogos.fun'>
            <img src='images/arrow_back.svg' className='home-page-arrow'/>
          </div>
        </Link>
        <p className='mr-10'>Conversas</p>
      </header>

      <ol>
        {assistants.map((curr) => (
          <div
            key={curr.name}
            className='conversation-card'
            onClick={() => setActiveAssistant(curr)}
          >
            <img
              src={curr.profilePic}
              className='conversation-card-profile-pic'
            />
            <div className='conversation-card-name-and-last-message'>
              <p>{curr.name}</p>
              <p className='text-xs'>
                {lastMessages[curr.name]?.role === 'assistant' ? '' : 'Você: '}
                {lastMessages[curr.name]?.message || ''}
              </p>
            </div>
          </div>
        ))}
      </ol>
    </motion.section>
  );
};

export {ChatsNavBar};
