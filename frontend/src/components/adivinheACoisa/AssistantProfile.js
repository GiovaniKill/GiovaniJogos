import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';

const AssistantProfile = ({setIsProfileActive}) => {
  const {activeAssistant} = useContext(AdivinheACoisaContext);

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
        <button
          onClick={() => setIsProfileActive((curr) => !curr)}
          className='assistant-profile-close-button'
        >
          <img src='images/close-x.svg'/>
        </button>

      </header>
      <section className='assistant-profile-content'>
        <img
          src={activeAssistant.profilePic}
          className='assistant-profile-pic'
        />
        <p
          className='text-xl text-white font-bold mb-2'
        >
          {activeAssistant.name}
        </p>
        <p
          className='text-center text-white'
        >
          {activeAssistant.description}
        </p>
      </section>
    </motion.section>
  );
};

AssistantProfile.propTypes = {
  setIsProfileActive: PropTypes.bool.isRequired,
};

export {AssistantProfile};
