import React, {useState} from 'react';

const Tutorial = () => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className={`absolute inset-0 m-auto w-1/3 h-fit rounded-lg p-5
    bg-amber-100 flex flex-col items-center ${isHidden && 'hidden'}`}>
      <button
        onClick={() => setIsHidden(true)}
        className='absolute top-3 right-5 font-extrabold text-lg hover:text-xl'>
            X
      </button>
      <h2 className='my-3 handrawn text-3xl'>Como jogar</h2>
      <article className='indent-2 p-5'>
        Seu objetivo é encontrar a palavra secreta de 6 letras em 8 tentativas.
        Para isso, digite seu palpite nos quadradinhos, letra por letra. Após
        enviar, será revelado o quão próximo você chegou da resposta através
        de cores <img src='images/tutorial_word.png' className='h-5 inline'/>.
        Se o campo ficar verde,
        você acertou a letra. Se ficar amarelo, a resposta contém a sua letra,
        mas em uma posição diferente à do seu palpite. Se ficar vermelho, a
        resposta não contém essa letra.
      </article>
    </div>
  );
};

export {Tutorial};
