import React from 'react';
import PropTypes from 'prop-types';

const ConversationCard = ({name}) => {
  return (
    <div>
      <img/>
      <p>Name</p>
      <p>Last Message</p>
    </div>
  );
};

ConversationCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ConversationCard;
