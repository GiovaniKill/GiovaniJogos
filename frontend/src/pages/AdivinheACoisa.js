import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {postRequest} from '../services/requests';

const AdivinheACoisa = () => {
  const [messages, setMessages] = useState([]);

  const [textInput, setTextInput] = useState('');
  const conversationBox = useRef();

  const scrollChatToBottom = () => {
    requestAnimationFrame(() => {
      conversationBox.current.scrollTo(
          0,
          conversationBox.current.scrollHeight,
      );
    });
  };

  const onQuestionSubmit = async (event) => {
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

    scrollChatToBottom();

    if (textInput.includes('//test')) {
      await setMessages((prev) => [...prev, {
        message: 'Teste aí, então.',
        role: 'assistant',
      }]);

      scrollChatToBottom();

      return;
    }


    await postRequest('adivinheacoisa/ask', {question: textInput})
        .then((response) => setMessages((prev) => [...prev, {
          message: JSON.parse(response),
          role: 'assistant',
        }]))
        .catch((error) => {
          window.alert(`A tão temida inteligência artificial
            parece estar descançando agora, tente de novo mais tarde`);
          console.log(error);
        });

    console.log('fim');
    scrollChatToBottom();
  };

  return (
    <div className='flex flex-col justify-center align-middle bg-slate-800'>
      <header className='flex'>
        <Link to='/'>
          <h2
            className={`absolute top-0 left-0 p-1
            duration-100 hover:bg-slate-700`}
          >
            <img
              src='images/arrow_back.svg'
              className='h-10'
            />
          </h2>
        </Link>

        <h1 className="text-5xl max-w-min mx-auto my-5 doodle">
          Advinhe a coisa
        </h1>
      </header>
      <section
        id='chat'
        className='flex flex-col justify-start
         items-center h-screen'
      >
        <section
          ref={conversationBox}
          className={`w-1/2 h-3/5
          flex flex-col overflow-y-scroll scroll-smooth bg-gray-700
          rounded-lg`}
        >
          {messages.map((curr, index) => (
            <div key={index}
              className={`flex 
              ${curr.role === 'user' ?
              'self-end justify-end bg-blue-300 bg-opacity-50' :
              'self-start bg-green-300 bg-opacity-50'} 
              m-3 w-fit max-w-96 rounded-lg p-1`}
            >
              {curr.message}
            </div>
          ))}
        </section>
        <form
          onSubmit={onQuestionSubmit}
          className='w-1/2 my-1'
        >
          <input
            type='text'
            onChange={(e) => setTextInput(e.target.value)}
            placeholder='Faça sua pergunta'
            value={textInput}
            className='w-5/6 rounded-s-lg outline-none pl-1'
            maxLength={60}
          />
          <button
            type='submit'
            onClick={(e) => onQuestionSubmit(e)}
            className={`w-1/6 rounded-e-lg bg-white
            hover:bg-gray-100 hover:pr-5 transition-all
            duration-800 hover:font-medium`}
          >
          Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export {AdivinheACoisa};
