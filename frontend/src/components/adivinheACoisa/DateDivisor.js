/* eslint-disable max-len */
import React from 'react';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';


const DateDivisor = ({date}) => {
  return (
    <motion.div
      className='date-divisor'
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
      <hr className='date-divisor-line' />
      <div className='mx-[2vw]' >{date}</div>
      <hr className='date-divisor-line' />
    </motion.div>
  );
};

DateDivisor.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateDivisor;
