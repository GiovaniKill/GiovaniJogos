import React from 'react';
import PropTypes from 'prop-types';
import GiovaniJogosContext from './GiovaniJogosContext';

const GiovaniJogosProvider = ({children}) => {
  return (
    <GiovaniJogosContext.Provider
      value={{

      }}
    >
      {children}
    </GiovaniJogosContext.Provider>
  );
};

GiovaniJogosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GiovaniJogosProvider;
