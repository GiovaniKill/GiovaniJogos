import React, {useContext, useEffect, useRef, useState} from 'react';
import {postRequest} from '../../services/requests';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';

const Chat = ({
  setIsProfileActive,
  isProfileActive,
  isChatsNavBarActive,
  setIsChatsNavBarActive,
  setIsChatActive,
}) => {
  const {activeAssistant, setAllMessages} = useContext(AdivinheACoisaContext);

  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

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

  const setLocalStorageMessages = () => {
    const pastMessages = JSON.parse(localStorage.getItem('chatMessages')) || {};
    if (messages.length !== 0) {
      localStorage.setItem('chatMessages', JSON.stringify({
        ...pastMessages,
        [activeAssistant.name]: messages,
      }));
    }
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

    setIsTyping(true);

    await postRequest('adivinheacoisa/ask', {question: textInput})
        .then((response) => {
          setMessages((prev) => [...prev, {
            message: JSON.parse(response),
            role: 'assistant',
          }]);
          setIsTyping(false);
        })
        .catch((error) => {
          setIsTyping(false);
          window.alert(`A tão temida inteligência artificial
            parece estar descançando agora, tente de novo mais tarde`);
          console.log(error);
        });

    scrollChatToBottom();
  };


  useEffect(() => {
    setAllMessages((curr) => (
      {...curr, [activeAssistant.name]: messages}
    ));

    setLocalStorageMessages();
  }, [messages]);


  useEffect(() => {
    const localStorageMessages = JSON.parse(
        localStorage.getItem('chatMessages'))?.
        [activeAssistant.name] || [];

    setMessages(localStorageMessages);
  }, [activeAssistant]);

  return (
    <motion.div
      key={'chat'}
      initial={{x: '50vh'}}
      animate={{x: 0}}
      exit={{background: 'red', rotate: '180deg'}}
      transition={{
        type: 'spring',
        duration: 0.2,
        ease: 'easeOut',
      }}
      className={
        `chat w-[100%] sm:w-[70%]
        ${isProfileActive ? 'md:w-[50%]' : 'md:w-[70%]'}`
      }
    >
      <header className='chat-header'>
        <button
          className='button-to-chats-nav-bar'
          onClick={() => {
            setIsChatsNavBarActive(true);
            setIsChatActive(false);
          }}
        >
          <img
            src='images/arrow_back.svg'
            className='button-icon-to-chats-nav-bar'
          />
        </button>
        <div
          className='profile-card'
          onClick={() => setIsProfileActive((curr) => !curr)}
        >
          <img src={activeAssistant.profilePic} className='profile-card-pic'/>
          <div className='card-name-and-typing-status'>
            <h1 className='card-name'>
              {activeAssistant.name}
            </h1>
            {isTyping && <p className='typing-status'>Digitando...</p>}
          </div>
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
                y: '4vw',
                opacity: 0.1,
              }}
              animate = {{
                y: 0,
                opacity: 1,
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
    </motion.div>
  );
};

Chat.propTypes = {
  isProfileActive: PropTypes.bool.isRequired,
  setIsProfileActive: PropTypes.func.isRequired,
  isChatsNavBarActive: PropTypes.bool.isRequired,
  setIsChatsNavBarActive: PropTypes.func.isRequired,
  setIsChatActive: PropTypes.func.isRequired,
};

export default Chat;
