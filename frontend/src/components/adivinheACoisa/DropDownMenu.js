import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const DropDownMenu = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const listVariants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
        delayChildren: 0.1,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        duration: 0.15,
        delay: 0.2,
      },
    },
  };

  const optionsVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <div
      className='menu-container'
      onClick={() => setIsMenuActive((curr) => !curr)}
    >
      <img src='images/menu.svg' className='menu'/>
      <AnimatePresence>
        {isMenuActive &&
       <motion.ol
         className='menu-options'
         variants={listVariants}
         initial='initial'
         animate='animate'
         exit='exit'
       >
         <motion.li
           className='menu-option'
           variants={optionsVariants}
         >
            Excluir mensagens
         </motion.li>
         <motion.li
           className='menu-option'
           variants={optionsVariants}
         >
            Habilitar modo escuro
         </motion.li>
       </motion.ol>}
      </AnimatePresence>
    </div>
  );
};

export default DropDownMenu;
