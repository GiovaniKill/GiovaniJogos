import React, {useState, useContext, useRef} from 'react';
import {postRequest} from '../../services/requests';
import AdivinheACoisaContext from '../../contexts/AdivinheACoisaContext';
import PropTypes from 'prop-types';


const ChatInput = ({addNewMessage, scrollChatToBottom,
  triesLeft, setTriesLeft, setIsTyping, isGameOver}) => {
  const {activeAssistant} = useContext(AdivinheACoisaContext);

  const [textInput, setTextInput] = useState('');
  const [isFormBlocked, setIsFormBlocked] = useState(false);

  const textInputField = useRef();


  const onQuestionSubmit = async (event) => {
    event?.preventDefault();

    setIsFormBlocked(true);

    if (textInput.length === 0) return;

    await postRequest('adivinheacoisa/createmessage', {
      assistantId: activeAssistant.id, message: textInput, role: 'user',
    })
        .then((response) => {
          response = JSON.parse(response);
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

      await postRequest('adivinheacoisa/ask',
          {question: textInput,
            assistantId: activeAssistant.id})
          .then((response) => {
            response = JSON.parse(response);
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
            textInputField.current.focus();
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

  return (
    <form onSubmit={onQuestionSubmit} className='conversation-form'>
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
  );
};

ChatInput.propTypes = {
  addNewMessage: PropTypes.func.isRequired,
  scrollChatToBottom: PropTypes.func.isRequired,
  triesLeft: PropTypes.number.isRequired,
  setTriesLeft: PropTypes.func.isRequired,
  setIsTyping: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool.isRequired,
};

export default ChatInput;
