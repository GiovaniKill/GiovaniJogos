import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {postRequest} from '../../services/requests';
import '../../styles/AdivinheACoisa.css';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';

const Chat = ({setIsProfileActive, isProfileActive}) => {
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
    <div className={`chat ${isProfileActive ? 'w-[80%]' : 'w-[100%]'}`}>
      <header className='chat-header'>
        <div className='home-page-arrow-container'>
          <Link to='/'>
            <img src='images/arrow_back.svg' className='home-page-arrow'/>
          </Link>
        </div>

        <div
          className='profile-card'
          onClick={() => setIsProfileActive((curr) => !curr)}
        >
          <img src='images/assistant-profile-pic.svg' className='profile-pic'/>
          <h1 className='card-name'>
            Advinhe a coisa
          </h1>
        </div>

        <div className='burger-menu-container'>
          <img src='images/burger-menu.svg' className='burger-menu'/>
        </div>
      </header>
      <section className='conversation'>
        <section ref={conversationBox} className='conversation-box'>
          {messages.map((curr, index) => (
            <motion.div
              key={index}
              className={`text-bubble 
              ${curr.role === 'user' ? 'user-bubble' : 'assistant-bubble'} 
              `}
              initial = {{
                y: '8vw',
              }}
              animate = {{
                y: 0,
              }}
              transition={{
                type: 'tween',
              }}
            >
              {curr.message}
            </motion.div>
          ))}
        </section>
        <form onSubmit={onQuestionSubmit} className='conversation-form'>
          <input
            type='text'
            onChange={(e) => setTextInput(e.target.value)}
            placeholder='Faça sua pergunta'
            value={textInput}
            className='conversation-input'
            maxLength={60}
          />
          <button
            type='submit'
            onClick={(e) => onQuestionSubmit(e)}
            className='conversation-send-button'
          >
          Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

Chat.propTypes = {
  isChatNavBarOpen: PropTypes.bool.isRequired,
  isProfileActive: PropTypes.bool.isRequired,
  setIsProfileActive: PropTypes.func.isRequired,
};

export default Chat;
