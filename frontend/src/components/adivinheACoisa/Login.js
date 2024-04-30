import React, {useEffect} from 'react';
import {postRequest} from '../../services/requests';
import PropTypes from 'prop-types';

const Login = ({setIsAuthenticated}) => {
  const handleCredentialResponse = (response) => {
    postRequest('adivinheacoisa/googlelogin',
        {googleJWT: response.credential}, true)
        .then((r) => {
          setIsAuthenticated(true);
        })
        .catch((r) => {
          if (r.message === 'User not verified') {
            window.alert(`Sua conta google deve ser verificada`);
          } else {
            window.alert(`Falha com o login com Google,
              tente novamente mais tarde. Detalhes: ${r}`);
          }
        });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      // eslint-disable-next-line max-len
      client_id: '694200844341-ll77juns94ifr3ueov3udqkkug7tl3et.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
        document.getElementById('googleLogin'),
        {theme: 'outline', size: 'large'},
    );
  }, []);

  return (
    <div
      className='absolute w-screen h-full bg-black bg-opacity-30 z-50'
    >
      <section className='absolute inset-0 m-auto
        w-[90vw] phone:h-[50vh] md:w-[35vw] h-[50vh]
        p-[1.5vw] bg-white dark:bg-gray-800 dark:text-white
        flex flex-col items-center justify-between shadow-2xl fullhd:text-3xl
        fourk:text-5xl'>

        <h1>Para jogar, faça Login</h1>

        <form className='flex flex-col items-center justify-center w-[90%]'>
          <input
            type='text'
            placeholder='Email'
            className='mb-[1vh] border border-black w-full
            ps-1 dark:bg-gray-300 text-black'
          />
          <input
            type='password'
            placeholder='Senha'
            className='mb-[1vh] border border-black w-full
            ps-1 dark:bg-gray-300 text-black'
          />
          <button
            type='submit'
            className='border fourk:border-4 transition
          border-gray-300 hover:border-gray-600 p-1'
          >
            Entrar
          </button>
        </form>

        <p>ou Cadastre-se</p>

        <button
          id='googleLogin'
          className='fullhd:scale-150 fourk:scale-[2.5]'
        />

        <p
          className='text-xs fourk:text-2xl text-center
          text-gray-600 dark:text-gray-400'
        >
        Ao continuar com o login, você concorda com nossos {' '}
          <a
            href='https://giovanijogos.fun/termosdeservico'
            className='text-blue-600 hover:text-blue-700 hover:underline'
            target='popup'
          >
            Termos de Serviço
          </a>
        , nossa {' '}
          <a
            href='https://giovanijogos.fun/politicadeprivacidade'
            className='text-blue-600 hover:text-blue-700 hover:underline'
            target='popup'
          >
            Política de Privacidade
          </a>
          {' '} e nossa {' '}
          <a
            href='https://giovanijogos.fun/politicadecookies'
            className='text-blue-600 hover:text-blue-700 hover:underline'
            target='popup'
          >
            Política de Cookies
          </a>
        </p>

      </section>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};


export default Login;
