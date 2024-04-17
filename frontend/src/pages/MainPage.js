import React from 'react';
import '../styles/MainPage.css';
import {Link} from 'react-router-dom';

const MainPage = () => {
  return (
    <div className='bg-amber-50 h-screen'>
      <header className='flex justify-center'>
        <h1 className='my-11 text-5xl handrawn'>Giovani Jogos</h1>
      </header>
      <nav className='grid md:grid-cols-2 lg:grid-cols-3
      gap-3 mx-3 justify-items-center'>
        <Link to='/palavrou'>
          <img
            className='rounded-lg border-2 border-solid
          border-black hover:border-yellow-400 hover:border-dashed
          w-[25vw]'
            src='images/palavrou-logo.svg'
          />
        </Link>
        <Link to='/adivinheacoisa'>
          <img
            className='rounded-lg border-2 border-solid
          border-black hover:border-yellow-400 hover:border-dashed
          w-[25vw]'
            src='images/adivinheacoisa-logo.svg'
          />
        </Link>
      </nav>
    </div>
  );
};

export default MainPage;
