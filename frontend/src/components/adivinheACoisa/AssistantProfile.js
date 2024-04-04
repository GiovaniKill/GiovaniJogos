import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';

const AssistantProfile = ({setIsProfileActive}) => {
  const {activeAssistant} = useContext(AdivinheACoisaContext);

  return (
    <motion.section
      key={'assistant-profile'}
      className='assistant-profile'
      initial={{x: '50vh'}}
      animate={{x: 0}}
      exit={{opacity: 0}}
      transition={{
        type: 'spring',
        duration: 0.3,
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

        <p
          className='contact-details-text'
        >
          Informações do contato
        </p>

      </header>
      <section className='assistant-profile-content'>
        <img
          src={activeAssistant.profilePic}
          className='assistant-profile-pic'
        />
        <p
          className='assistant-profile-name'
        >
          {activeAssistant.name}
        </p>
        <p
          className='assistant-profile-description'
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

export default AssistantProfile;
