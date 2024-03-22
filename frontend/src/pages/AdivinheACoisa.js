import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {postRequest} from '../services/requests';
import '../styles/AdivinheACoisa.css';

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

    if (textInput.length === 0) return;

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

    scrollChatToBottom();
  };

  return (
    <div className='aac-page'>
      <header className='header'>
        <div className='home-page-arrow-container'>
          <Link to='/'>
            <img src='images/arrow_back.svg' className='home-page-arrow'/>
          </Link>
        </div>

        <div className='profile-card'>
          <img src='images/assistant-profile-pic.svg' className='profile-pic'/>
          <h1 className='aac-title'>
            Advinhe a coisa
          </h1>
        </div>

        <div className='burger-menu-container'>
          <img src='images/burger-menu.svg' className='burger-menu'/>
        </div>
      </header>
      <section className='chat'>
        <section ref={conversationBox} className='conversation-box'>
          {messages.map((curr, index) => (
            <div key={index}
              className={`text-bubble 
              ${curr.role === 'user' ? 'user-bubble' : 'assistant-bubble'} 
              `}
            >
              {curr.message}
            </div>
          ))}
        </section>
        <form onSubmit={onQuestionSubmit} className='chat-form'>
          <input
            type='text'
            onChange={(e) => setTextInput(e.target.value)}
            placeholder='Faça sua pergunta'
            value={textInput}
            className='chat-input'
            maxLength={60}
          />
          <button
            type='submit'
            onClick={(e) => onQuestionSubmit(e)}
            className='chat-send-button'
          >
          Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdivinheACoisa;
