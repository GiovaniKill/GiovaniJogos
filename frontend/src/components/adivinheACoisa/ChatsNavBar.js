import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const ChatsNavBar = () => {
  return (
    <motion.section
      className='chats-nav-bar'
      initial={{
        x: 50,
      }}
      animate={{
        x: 0,
      }}
    >
      <header className='chats-nav-bar-header'>
        <div className='home-page-arrow-container'>
          <Link to='/'>
            <img src='images/arrow_back.svg' className='home-page-arrow'/>
          </Link>
        </div>
      </header>

      <ol>
        <li>Conversa 1</li>
        <li>Conversa 1</li>
        <li>Conversa 1</li>
        <li>Conversa 1</li>
      </ol>
    </motion.section>
  );
};

export {ChatsNavBar};
