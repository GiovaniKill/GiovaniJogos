import React from 'react';
import {motion} from 'framer-motion';

const ChatsNavBar = () => {
  return (
    <motion.section
      className='chats-nav-bar'
      initial={{
        width: 0,
      }}
      animate={{
        width: '20%',
      }}
    >
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
