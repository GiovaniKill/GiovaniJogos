import React, {useContext, useEffect, useRef, useState} from 'react';
import {getRequest, postRequest} from '../../services/requests';
import {AnimatePresence, motion} from 'framer-motion';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';
import DropDownMenu from './DropDownMenu';
import ChatMessage from './ChatMessage';
import DateDivisor from './DateDivisor';

const Chat = ({
  setIsProfileActive,
  isProfileActive,
  isChatsNavBarActive,
  setIsChatsNavBarActive,
  setIsChatActive,
}) => {
  const {activeAssistant,
    setAllMessages,
    allMessages} = useContext(AdivinheACoisaContext);

  const [isGameOver, setIsGameOver] = useState(false);

  const [isFormBlocked, setIsFormBlocked] = useState(false);

  const [currentWordID, setCurrentWordID] = useState('');

  const [currentDate, setCurrentDate] = useState('');

  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);

  const [textInput, setTextInput] = useState('');
  const conversationBox = useRef();
  const textInputField = useRef();

  const [triesLeft, setTriesLeft] = useState(30);

  const deleteMessages = () => {
    setAllMessages((curr) => ({
      ...curr,
      [activeAssistant.name]: [],
    }));
    setMessages([]);

    localStorage.setItem('chatMessages', JSON.stringify(allMessages));
  };

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

  const addNewMessage = async (newMessage) => {
    await setMessages((prev) => {
      const pastMessages = [...prev];
      const formatedNewMessageDate = newMessage?.date?.split('/')
          .reverse().join('/');
      const formatedLastMessageDate = pastMessages[pastMessages.length - 1]
          ?.date.split('/').reverse().join('/');

      console.log(formatedLastMessageDate);

      // Adds a date divisor
      if (formatedNewMessageDate > formatedLastMessageDate ||
        formatedLastMessageDate === undefined ||
        newMessage.message.includes('//newdate')) {
        pastMessages.push({role: 'date', date: newMessage?.date});
      }

      return [...pastMessages, newMessage];
    });
  };

  const discountTriesLeft = () => {
    const priorGames = JSON.parse(localStorage.getItem('gameHistory')) || {};

    setTriesLeft((curr) => {
      localStorage.setItem('gameHistory', JSON.stringify({
        ...priorGames,
        [currentDate]: {
          ...priorGames[currentDate],
          triesLeft: curr - 1,
        },
      }));

      return curr - 1;
    });
  };

  const getGameOverMessage = async () => {
    setIsTyping(true);
    await postRequest('adivinheacoisa/getgameovermessage',
        {assistant: activeAssistant.name,
          wordID: currentWordID})
        .then((response) => {
          addNewMessage({
            message: JSON.parse(response),
            role: 'assistant',
            date: currentDate,
          });
          setIsTyping(false);
          scrollChatToBottom();
        })
        .catch((error) => {
          setIsTyping(false);
          window.alert(`A tão temida inteligência artificial
              parece estar descançando agora, tente de novo mais tarde`);
          console.log(error);
        });
  };

  const onQuestionSubmit = async (event) => {
    event?.preventDefault();

    if (textInput.length === 0) return;

    addNewMessage({
      message: textInput,
      role: 'user',
      date: currentDate,
    });

    setTextInput('');
    scrollChatToBottom();

    if (textInput.includes('//test')) {
      await addNewMessage({
        message: 'Teste aí, então.',
        role: 'assistant',
        date: currentDate,
      });

      scrollChatToBottom();
      if (triesLeft > 0) {
        discountTriesLeft();
      };

      return;
    }

    if (!isGameOver) {
      setIsTyping(true);
      setIsFormBlocked(true);


      await postRequest('adivinheacoisa/ask',
          {question: textInput,
            assistant: activeAssistant.name,
            wordID: currentWordID})
          .then((response) => {
            addNewMessage({
              message: JSON.parse(response),
              role: 'assistant',
              date: currentDate,
            });
            setIsTyping(false);
            if (triesLeft > 0) {
              discountTriesLeft();
            };

            setIsFormBlocked(false);
          })
          .catch((error) => {
            setIsTyping(false);
            window.alert(`A tão temida inteligência artificial
            parece estar descançando agora, tente de novo mais tarde`);
            console.log(error);
          });
    }

    scrollChatToBottom();
  };

  const handleScroll = (e) => {
    const {scrollTop, scrollHeight, clientHeight} = e.target;
    if (scrollHeight - clientHeight > scrollTop) {
      setShowScrollBottomButton(true);
    } else {
      setShowScrollBottomButton(false);
    }
  };

  const handleGameHistory = (wordID, day, month, year) => {
    const priorGames = JSON.parse(localStorage.getItem('gameHistory')) || {};

    const date = `${day}/${month}/${year}`;

    if (Object.keys(priorGames).some((curr) => curr === date)) {
      setTriesLeft(priorGames[date]?.triesLeft || 30);
      return;
    }

    localStorage.setItem('gameHistory', JSON.stringify({
      ...priorGames,
      [date]: {
        wordID,
        date,
        triesLeft: 30,
      },
    }));
  };


  useEffect(() => {
    setAllMessages((curr) => (
      {...curr, [activeAssistant.name]: messages}
    ));

    setLocalStorageMessages();
  }, [messages]);


  useEffect(() => {
    setMessages(allMessages[activeAssistant?.name] || []);
    scrollChatToBottom();
  }, [activeAssistant]);

  // Game over
  useEffect(() => {
    if (triesLeft === 0) {
      setIsGameOver(true);
      // Timeout for realism
      setTimeout(async () => getGameOverMessage(), 1000);
    }

    textInputField.current.focus();
  }, [triesLeft]);

  // Component did mount
  useEffect(() => {
    getRequest('adivinheacoisa/getthinginfo')
        .then((response) => {
          response = JSON.parse(response);
          setCurrentWordID(response.wordID);
          handleGameHistory(response.wordID, response.day,
              response.month + 1, response.year);
          setCurrentDate(
              `${response.day}/${response.month + 1}/${response.year}`);
        })
        .catch((e) => {
          console.log(e);
          window.alert(`Programador aparentemente ta de férias 😴.
           Tente novamente mais tarde.`);
        });
  }, []);


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
            src='images/arrow-back.svg'
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

        <DropDownMenu deleteMessages={deleteMessages}/>
      </header>
      <section className='conversation'>
        <div className='tries-left'>Tentativas restantes: {triesLeft}</div>
        <section
          ref={conversationBox}
          className='conversation-box'
          onScroll={(e) => handleScroll(e) }
        >
          {messages.map((curr, index) => (
            <>
              {curr.role === 'date' ?
              <DateDivisor date={curr.date}/> :
              <ChatMessage key={index} message={curr}/>}
            </>
          ))}
        </section>

        <form onSubmit={onQuestionSubmit} className='conversation-form'>
          <AnimatePresence>
            {showScrollBottomButton &&
          <motion.button
            onClick={scrollChatToBottom}
            className='scroll-bottom-button'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 0.1}}}
          >
            <img src='images/arrow-down.svg' className='scroll-bottom-icon'/>
          </motion.button>
            }
          </AnimatePresence>
          <input
            type='text'
            ref={textInputField}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder='Faça sua pergunta'
            value={textInput}
            className='conversation-input'
            maxLength={80}
            disabled={isFormBlocked}
          />
          <button
            type='submit'
            onClick={(e) => onQuestionSubmit(e)}
            className='conversation-send-button'
            disabled={isFormBlocked}
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