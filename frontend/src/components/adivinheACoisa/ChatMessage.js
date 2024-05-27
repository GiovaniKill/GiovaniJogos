import React from 'react';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';

const ChatMessage = ({message}) => {
  return (
    <motion.div
      className={`
              text-bubble
              ${message.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`
      }
      initial = {{
        y: '4vh',
        opacity: 0.1,
      }}
      animate = {{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: 'tween',
      }}
    >
      {message.message}
    </motion.div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

export default ChatMessage;
