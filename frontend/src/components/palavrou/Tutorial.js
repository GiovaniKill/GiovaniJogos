import React, {useState} from 'react';

const Tutorial = () => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className={`absolute inset-0 m-auto w-4/5 md:w-1/2 h-fit rounded-lg p-5
    bg-amber-100 flex flex-col items-center ${isHidden && 'hidden'}
    border-2 border-black border-double`}>
      <button
        onClick={() => setIsHidden(true)}
        className='absolute top-3 right-5 font-extrabold text-lg hover:text-xl'>
            X
      </button>
      <h2 className='my-3 handrawn text-3xl'>Como jogar</h2>
      <article className='indent-2 p-5'>
        Seu objetivo é encontrar a palavra secreta de 6 letras em 8 tentativas.
        Para isso, digite seu palpite nos quadradinhos, letra por letra. Após
        enviar, clincando &apos;Enter&apos;, será revelado o quão próximo você
        chegou da resposta através de cores
        <img src='images/tutorial-word.png' className='h-5 inline'/>.
        Se o campo ficar verde,
        você acertou a letra. Se ficar amarelo, a resposta contém a sua letra,
        mas em uma posição diferente à do seu palpite. Se ficar vermelho, a
        resposta não contém essa letra. Prossiga tentando na próxima fileira
        de quadradinhos. A palavra muda diariamente.
      </article>
    </div>
  );
};

export {Tutorial};
