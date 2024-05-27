import React, {useContext, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';
import {deleteRequest} from '../../services/requests';

const DropDownMenu = ({deleteMessages}) => {
  const {isDarkModeOn, setIsDarkModeOn} = useContext(AdivinheACoisaContext);

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

  const logout = () => {
    deleteRequest('adivinheacoisa/logout')
        .then((res) => {
          window.location.reload();
        })
        .catch((e) => {
          window.alert('Error ao fazer logout');
          console.log(e);
        });
  };

  return (
    <div
      className='menu-container'
      onClick={() => setIsMenuActive((curr) => !curr)}
    >
      <img src='images/menu.svg' className='menu-icon'/>
      <AnimatePresence>
        {isMenuActive &&
       <motion.ol
         className='menu-list'
         variants={listVariants}
         initial='initial'
         animate='animate'
         exit='exit'
       >
         <motion.li
           className='menu-option'
           variants={optionsVariants}
           onClick={deleteMessages}
         >
            Excluir mensagens
         </motion.li>
         <motion.li
           className='menu-option'
           variants={optionsVariants}
           onClick={() => setIsDarkModeOn((curr) => !curr)}
         >
           {isDarkModeOn ? 'Ativar modo claro' : 'Ativar modo escuro'}
         </motion.li>
         <motion.li
           className='menu-option'
           variants={optionsVariants}
           onClick={logout}
         >
           Fazer Logout
         </motion.li>
       </motion.ol>}
      </AnimatePresence>
    </div>
  );
};

DropDownMenu.propTypes = {
  deleteMessages: PropTypes.func.isRequired,
};

export default DropDownMenu;
