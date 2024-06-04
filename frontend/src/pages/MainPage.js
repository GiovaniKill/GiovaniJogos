import React from 'react';
import '../styles/MainPage.css';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';

const MainPage = () => {
  return (
    <div className='overflow-x-hidden bg-amber-50'>
      <div className='h-[100vh]'>
        <header className='flex justify-center'>
          <h1 className='my-11 text-5xl handrawn'>Giovani Jogos</h1>
          <a
            href='https://github.com/GiovaniKill'
            target='_blank'
            rel="noreferrer"
          >
            <img
              src='images/github-logo.svg'
              alt='github logo'
              className='w-[3vw] absolute right-[2vw] top-[2vh]
              opacity-70 hover:opacity-100 transition'
            />
          </a>
        </header>
        <nav className='grid md:grid-cols-2 lg:grid-cols-3
          gap-3 mx-3 justify-items-center'>
          <Link to='/palavrou'>
            <img
              className='rounded-lg border-2 border-solid
            border-black hover:border-yellow-400 hover:border-dashed
            w-[90vw] lg:w-[25vw]'
              src='images/palavrou-logo.svg'
            />
          </Link>
          <Link to='/adivinheacoisa'>
            <img
              className='rounded-lg border-2 border-solid
            border-black hover:border-yellow-400 hover:border-dashed
            w-[90vw] lg:w-[25vw]'
              src='images/adivinheacoisa-logo.svg'
            />
          </Link>
        </nav>
      </div>
      <Footer/>
    </div>
  );
};

export default MainPage;
