import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import ChatMessage from './ChatMessage';


const LoadingScreen = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 1}}
        exit={{opacity: 0}}
        className='h-screen w-screen dark:bg-slate-700 bg-slate-50
        flex justify-center items-center align-middle'
      >
        <motion.div
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
            delay: 2,
          }}
        />
        <ChatMessage
          message={{message: 'Adivinhe a coisa', role: 'assistant'}}/>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
