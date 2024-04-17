import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className={`
        flex justify-evenly w-[100vw] bg-orange-900
        py-[2vh] mt-[50vh]
      `}
    >
      <Link to='/politicadeprivacidade' className='hover:underline'>
        Política de privacidade
      </Link>

      <Link to='/termosdeservico' className='hover:underline'>
        Termos de serviço
      </Link>
    </footer>
  );
};

export default Footer;
