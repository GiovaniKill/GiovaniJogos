import React, {useContext, useEffect, useRef, useState} from 'react';
import {deleteRequest, getRequest, postRequest} from '../../services/requests';
import {AnimatePresence, motion} from 'framer-motion';
import PropTypes from 'prop-types';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';
import DropDownMenu from './DropDownMenu';
import ChatMessage from './ChatMessage';
import DateDivisor from './DateDivisor';
import ChatInput from './ChatInput';

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

  const [currentConversationMessages,
    setCurrentConversationMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);
  const conversationBox = useRef();

  const [triesLeft, setTriesLeft] = useState(30);

  const deleteMessages = () => {
    deleteRequest(`adivinheacoisa/deleteconversation/${activeAssistant.id}`)
        .then(() => {
          setAllConversationsMessages((curr) => (
            curr.filter((message) => message.assistantId !== activeAssistant.id,
            )
          ));
          setCurrentConversationMessages([]);
        })
        .catch((e) => {
          window.alert('Error ao excluir mensagens');
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
    await setCurrentConversationMessages((prev) => [...prev, newMessage]);
    setAllConversationsMessages((curr) =>(
      [...curr, newMessage]
    ));
  };

  const getGameOverMessage = async () => {
    setIsTyping(true);
    await postRequest('adivinheacoisa/getgameovermessage',
        {assistantId: activeAssistant.id})
        .then((response) => {
          response = JSON.parse(response);
          addNewMessage({
            message: response.message,
            role: 'assistant',
            createdAt: response.createdAt,
            assistantId: activeAssistant.id,
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

  const handleScroll = (e) => {
    const {scrollTop, scrollHeight, clientHeight} = e.target;
    if (scrollHeight - clientHeight > scrollTop) {
      setShowScrollBottomButton(true);
    } else {
      setShowScrollBottomButton(false);
    }
  };

  useEffect(() => {
    setCurrentConversationMessages(allConversationsMessages.filter(
        (message) => message.assistantId === activeAssistant.id) ||
        []);
    scrollChatToBottom();
  }, [activeAssistant]);

  const renderMessages = (messages) => {
    return messages.map((message, index) => {
      // Checks the need for a date divisor
      if (messages[index - 1]?.createdAt.slice(0, 10) <
        message.createdAt.slice(0, 10) || index === 0) {
        const formattedDate = message.createdAt.slice(0, 10)
            .split('-').reverse().join('/');
        return (
          <React.Fragment
            key={message.createdAt + message.message + message.assistantId}>
            <DateDivisor date={formattedDate}/>
            <ChatMessage message={message}/>
          </React.Fragment>
        );
      }
      return <ChatMessage
        key={message.createdAt + message.message}
        message={message}/>;
    });
  };


  // Game over and refocus input
  useEffect(() => {
    if (triesLeft === 0) {
      setIsGameOver(true);
      // Timeout for realism
      setTimeout(async () => getGameOverMessage(), 1000);
    }
  }, [triesLeft]);

  // Component did mount
  useEffect(() => {
    getRequest('adivinheacoisa/getgame')
        .then((response) => {
          response = JSON.parse(response);
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
          {renderMessages(currentConversationMessages)}
        </section>

        <section className='flex flex-col items-center w-full'>
          <AnimatePresence>
            {showScrollBottomButton &&
              <motion.button
                onClick={scrollChatToBottom}
                className='scroll-bottom-button'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0, transition: {duration: 0.1}}}
              >
                <img
                  src='images/arrow-down.svg'
                  className='scroll-bottom-icon'/>
              </motion.button>
            }
          </AnimatePresence>
          <ChatInput
            addNewMessage={addNewMessage}
            scrollChatToBottom={scrollChatToBottom}
            triesLeft={triesLeft}
            setTriesLeft={setTriesLeft}
            setIsTyping={setIsTyping}
            isGameOver={isGameOver}
          />
        </section>
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
