import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ChatsNavBar = ({assistants}) => {
  return (
    <motion.section
      className='chats-nav-bar'
    >
      <header className='chats-nav-bar-header'>
        <div className='home-page-arrow-container'>
          <Link to='/'>
            <img src='images/arrow_back.svg' className='home-page-arrow'/>
          </Link>
        </div>
      </header>

      <ol>
        {assistants.map((curr) => (
          <div key={curr.name}>
            <img src={curr.profilePic}/>
            <p>{curr.name}</p>
          </div>
        ))}
      </ol>
    </motion.section>
  );
};

ChatsNavBar.propTypes = {
  assistants: PropTypes.string.isRequired,
};

export {ChatsNavBar};
