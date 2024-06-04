import React from 'react';

const Footer = () => {
  return (
    <footer
      className={`
        flex justify-evenly items-center w-[100vw] bg-orange-900
        p-[2vh] mt-[10vh] absolute bottom-0
      `}
    >
      <a
        href='https://giovanijogos.fun/politicadeprivacidade'
        className='hover:underline'
      >
        Política de privacidade
      </a>

      <a
        href='https://giovanijogos.fun/termosdeservico'
        className='hover:underline'
      >
        Termos de serviço
      </a>

      <a
        href='https://giovanijogos.fun/politicadecookies'
        className='hover:underline'
      >
        Política de cookies
      </a>
    </footer>
  );
};

export default Footer;
