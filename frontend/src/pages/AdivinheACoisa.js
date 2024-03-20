import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {postRequest} from '../services/requests';

const AdivinheACoisa = () => {
  const [messages, setMessages] = useState([]);

  const [textInput, setTextInput] = useState('');
  const conversationBox = useRef();

  const onQuestionSubmit = (event) => {
    event?.preventDefault();

    if (textInput.length === 0) {
      window.alert('Não deixe a IA no vácuo, digite alguma coisa');
      return;
    }

    setMessages((prev) => [...prev, {
      message: textInput,
      role: 'user',
    }]);

    setTextInput('');

    if (textInput === '//test') {
      setMessages((prev) => [...prev, {
        message: 'Teste aí, então.',
        role: 'assistant',
      }]);

      return;
    }

    postRequest('adivinheacoisa/ask', {question: textInput})
        .then((response) => setMessages((prev) => [...prev, {
          message: JSON.parse(response),
          role: 'assistant',
        }]))
        .catch((error) => {
          window.alert(`A tão temida inteligência artificial
            parece estar descançando agora, tente de novo mais tarde`);
          console.log(error);
        });
  };

  return (
    <div className='flex flex-col justify-center align-middle'>
      <header className='flex'>
        <Link to='/'>
          <h2
            className='text-2xl absolute top-5 left-5
            handrawn hover:text-2.1xl opacity-0 sm:opacity-100'
          >
            Giovani Jogos
          </h2>
        </Link>

        <h1 className="text-5xl max-w-min mx-auto my-5 doodle">
          Advinhe a coisa
        </h1>
      </header>
      <section ref={conversationBox}>
        {messages.map((curr, index) => (
          <div key={index} className=''>
            {curr.message}
          </div>
        ))}
      </section>
      <form onSubmit={onQuestionSubmit}>
        <input
          type='text'
          onChange={(e) => setTextInput(e.target.value)}
          placeholder='Faça sua pergunta'
          value={textInput}
        />
        <button type='submit' onClick={(e) => onQuestionSubmit(e)}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export {AdivinheACoisa};
