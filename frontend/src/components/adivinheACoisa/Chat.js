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

  const activeAssistantRef = useRef(activeAssistant);

  useEffect(() => {
    activeAssistantRef.current = activeAssistant;
  }, [activeAssistant]);

  const [isGameOver, setIsGameOver] = useState(false);

  const [currentConversationMessages,
    setCurrentConversationMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  const [showScrollBottomButton, setShowScrollBottomButton] = useState(false);
  const conversationBox = useRef();

  const [triesLeft, setTriesLeft] = useState(30);

  const [isFetchingMessages, setIsFetchingMessages] = useState(false);

  const [isFormBlocked, setIsFormBlocked] = useState(false);


  const setWelcomeMessage = () => {
    setIsTyping(true);
    setIsFormBlocked(true);
    getRequest(`adivinheacoisa/getwelcomemessage/${activeAssistant.id}`)
        .then((response) => {
          response = JSON.parse(response);
          addNewMessage({
            message: response.message,
            role: 'assistant',
            createdAt: response.createdAt,
            assistantId: response.assistantId,
          });
          setIsTyping(false);
          setIsFormBlocked(false);
        })
        .catch((e) => {
          window.alert('Error ao dar boas vindas :(');
          console.log(e);
          setIsTyping(false);
          setIsFormBlocked(false);
        });
  };

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
    if (currentConversationMessages.length === 0) {
      newMessage.firstMessage = true;
    }

    // Prevents message from going to the wrong chat
    if ((newMessage.role === 'assistant' &&
    newMessage.assistantId === activeAssistantRef.current.id) ||
    newMessage.role === 'user') {
      await setCurrentConversationMessages((prev) => [...prev, newMessage]);
    }
    setAllConversationsMessages((curr) =>(
      [...curr, newMessage]
    ));
    scrollChatToBottom();
  };

  const setGameAsDefeat = async () => {
    setIsGameOver(true);
    setIsTyping(true);
    await postRequest('adivinheacoisa/setgameover',
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
    if (scrollHeight > clientHeight &&
      scrollTop === 0 &&
      currentConversationMessages[0]?.firstMessage !== true &&
      !isFetchingMessages) {
      setIsFetchingMessages(true);
      getRequest(
          `adivinheacoisa/getlastmessagesfromreference/\
          ${activeAssistant.id}/${currentConversationMessages[0].createdAt}`)
          .then((response) => {
            response = JSON.parse(response);
            if (!response?.messages) return;

            setCurrentConversationMessages((prev) => [
              ...response.messages,
              ...prev,
            ]);
            setIsFetchingMessages(false);
          })
          .catch((e) => {
            setIsFetchingMessages(false);
            window.alert('Erro ao buscar mais mensagens');
          });
    }
  };

  const renderMessages = (messages) => {
    return messages.map((message, index) => {
      // Checks the need for a date divisor
      if (messages[index - 1]?.createdAt.slice(0, 10) <
        message.createdAt.slice(0, 10) || index === 0) {
        const formattedDate = message.createdAt.slice(0, 10)
            .split('-').reverse().join('/');
        return [
          <DateDivisor key={message.createdAt} date={formattedDate}/>,
          <ChatMessage
            key={message.createdAt + message.message + message.assistantId}
            message={message}/>,

        ];
      }
      return <ChatMessage
        key={message.createdAt + message.message + message.assistantId}
        message={message}/>;
    });
  };

  useEffect(() => {
    setCurrentConversationMessages(allConversationsMessages.filter(
        (message) => message.assistantId === activeAssistant.id) ||
        []);
    scrollChatToBottom();
  }, [activeAssistant]);

  // Game over and refocus input
  useEffect(() => {
    if (triesLeft === 0) {
      setIsGameOver(true);
      // Timeout for realism
      setTimeout(async () => setGameAsDefeat(), 1000);
    }
  }, [triesLeft]);

  // Component did mount
  useEffect(() => {
    getRequest('adivinheacoisa/getorcreategame')
        .then((response) => {
          response = JSON.parse(response);
          setTriesLeft(response.triesLeft);
          if (response.newGame) setWelcomeMessage();
          if (response.status === 'finished') setIsGameOver(() => true);
        })
        .catch((e) => {
          window.alert(`Programador aparentemente está de férias 😴.\
           Tente novamente mais tarde.`);
        });
    setTimeout(() => scrollChatToBottom(), 100);
  }, []);

  return (
    <motion.div
      key={'chat'}
      initial={{x: '50vh'}}
      animate={{x: 0}}
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
            setGameAsDefeat={setGameAsDefeat}
            isFormBlocked={isFormBlocked}
            setIsFormBlocked={setIsFormBlocked}
            setIsGameOver={setIsGameOver}
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
