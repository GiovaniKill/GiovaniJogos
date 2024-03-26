import React from 'react';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';

const AssistantProfile = ({setIsProfileActive}) => {
  return (
    <motion.section
      className='assistant-profile'
      initial={{
        x: 50,
      }}
      animate={{
        x: 0,
      }}
      transition={{
        type: 'spring',
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <header className='assistant-profile-header'>
        <button onClick={() => setIsProfileActive((curr) => !curr)}>
          X
        </button>
      </header>
      <img src='images/assistant-profile-pic.svg' className='profile-pic'/>
      <p> assistant name</p>
      <p> this is the description of
          the AI assistant, wether you like it or not</p>
    </motion.section>
  );
};

AssistantProfile.propTypes = {
  setIsProfileActive: PropTypes.bool.isRequired,
};

export {AssistantProfile};
