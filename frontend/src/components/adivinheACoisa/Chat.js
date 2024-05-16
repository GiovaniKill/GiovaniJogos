import React, {useContext, useEffect, useRef, useState} from 'react';
import {deleteRequest, getRequest, postRequest} from '../../services/requests';
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
    setAllConversationsMessages,
    allConversationsMessages} = useContext(AdivinheACoisaContext);

  const [isGameOver, setIsGameOver] = useState(false);

  const [isFormBlocked, setIsFormBlocked] = useState(false);

  const [currentDate, setCurrentDate] = useState('');

  const [currentConversationMessages,
    setCurrentConversationMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);

  const [textInput, setTextInput] = useState('');
  const conversationBox = useRef();
  const textInputField = useRef();

  const [triesLeft, setTriesLeft] = useState(30);

  const deleteMessages = () => {
    deleteRequest(`adivinheacoisa/deleteconversation/${activeAssistant.id}`)
        .then(() => {
          setAllConversationsMessages((curr) => (
            curr.filter((message) => message.assistantId !== activeAssistant.id)
          ));
          setCurrentConversationMessages([]);
        })
        .catch((e) => {
          window.alert('Error ao excluir as mensagens');
        });
  };

  const scrollChatToBottom = () => {
    requestAnimationFrame(() => {
      conversationBox.current.scrollTo(
          0,
          conversationBox.current.scrollHeight,
      );
    });
  };

  const addNewMessage = async (newMessage) => {
    await setCurrentConversationMessages((prev) => {
      const pastMessages = [...prev];
      const lastMessage = pastMessages[pastMessages.length - 1];

      const formattedDate = newMessage.createdAt
          .slice(0, 10).split('-').reverse().join('/');

      // Adds DateDivisor
      if (newMessage.createdAt > lastMessage?.createdAt ||
        lastMessage === undefined ||
        newMessage.message.includes('//newdate') /** For testing */) {
        pastMessages.push({role: 'date', date: formattedDate});
      }

      return [...pastMessages, newMessage];
    });
    await setAllConversationsMessages((prev) => {
      console.log(prev);
      [...prev, newMessage];
    });
  };

  const getGameOverMessage = async () => {
    setIsTyping(true);
    await postRequest('adivinheacoisa/getgameovermessage',
        {assistantId: activeAssistant.id})
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
          window.alert(`A tão temida inteligência artificial\
              parece estar descançando agora, tente de novo mais tarde`);
          console.log(error);
        });
  };

  const onQuestionSubmit = async (event) => {
    event?.preventDefault();

    if (textInput.length === 0) return;

    await postRequest('adivinheacoisa/createmessage', {
      assistantId: activeAssistant.id, message: textInput, role: 'user',
    })
        .then((response) => {
          addNewMessage({
            message: textInput,
            role: 'user',
            createdAt: response.createdAt,
          });
        })
        .catch((error) => {
          console.log(error);
          window.alert('Erro ao criar a mensagem');
        });

    setTextInput('');
    scrollChatToBottom();

    if (textInput.includes('//test')) {
      await addNewMessage({
        message: 'Teste aí, então.',
        role: 'assistant',
        createdAt: '9999-12-31',
      });

      scrollChatToBottom();
      if (triesLeft > 0) {
        setTriesLeft((curr) => curr - 1);
      };

      return;
    }

    if (!isGameOver) {
      setIsTyping(true);
      setIsFormBlocked(true);


      await postRequest('adivinheacoisa/ask',
          {question: textInput,
            assistantId: activeAssistant.id})
          .then((response) => {
            addNewMessage({
              message: response.message,
              role: 'assistant',
              createdAt: response.createdAt,
            });
            setIsTyping(false);
            if (triesLeft > 0) {
              setTriesLeft((curr) => curr - 1);
            };

            setIsFormBlocked(false);
          })
          .catch((error) => {
            setIsTyping(false);
            window.alert(`A tão temida inteligência artificial\
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

  useEffect(() => {
    console.log(allConversationsMessages);
    setCurrentConversationMessages(allConversationsMessages.map(
        (message) => message.assistantId === activeAssistant.id) ||
        []);
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
    getRequest('adivinheacoisa/getgame')
        .then((response) => {
          response = JSON.parse(response);
          setCurrentDate(
              (response.day.length === 2 ? response.day : '0' + response.day) +
          '/' +
          (response.month.length === 2 ?
            response.month : '0' + response.month) +
          '/' +
          response.year);
          setTriesLeft(response.triesLeft);
        })
        .catch((e) => {
          window.alert(`Programador aparentemente está de férias 😴.\
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
          <img src={activeAssistant?.profilePic} className='profile-card-pic'/>
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
          {currentConversationMessages.map((curr, index) => (
            <>
              {curr.role === 'date' ?
              <DateDivisor key={curr.date} date={curr.date}/> :
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
