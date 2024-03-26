import React from 'react';
import {motion} from 'framer-motion';

const AssistantProfile = () => {
  return (
    <motion.section
      className='assistant-profile'
      initial={{
        width: 0,
      }}
      animate={{
        width: '20%',
      }}
    >
      <img src='images/assistant-profile-pic.svg' className='profile-pic'/>
      <p> assistant name</p>
      <p> this is the description of
          the AI assistant, wether you like it or not</p>
    </motion.section>
  );
};

export {AssistantProfile};
