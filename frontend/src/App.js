import './App.css';
import React, { useState } from 'react';
import { Word } from './components/Word';
import { requestData } from './services/requests';
import sixLetterWords from './six_letter_words';

const App = () => {
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState({evaluation: [], accentuatedAnswer: ''});

  const checkAttempt = (attempt) => {
    if(attempt.length < 6){
        setMessage(() => 'Digite as 6 letras');
        return
    }

    if(!sixLetterWords.includes(attempt.toLowerCase())){
        setMessage(() => 'Palavra inválida');
        return
    }

    requestData(`check/${attempt.toLowerCase()}`)
    .then((response) => {
      console.log(response);
      if(response.evaluation.every((elem) => elem === 'right')){
        setResponse(() => response);
        setTimeout(() => setMessage(() => 'Parabéns!'), 3000);
      } else {
        setResponse(() => response);
        setMessage(() => '');
        setTimeout(() => setAttemptNumber((prev) => prev + 1), 3000);
      }
    })
    .catch((error) => {
      console.log(error);
      setMessage(() => 'Falha ao se conectar ao servidor: ' + error);
    })
  }

  return (
    <div className="App">
      <div>{message}</div>
      <table>
        <tbody>
          <Word wordNumber={0} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
          <Word wordNumber={1} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
          <Word wordNumber={2} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
          <Word wordNumber={3} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
          <Word wordNumber={4} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
          <Word wordNumber={5} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
          <Word wordNumber={6} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
          <Word wordNumber={7} attemptNumber={attemptNumber} response={response}checkAttempt={checkAttempt}/>
        </tbody>
      </table>
    </div>
  );
}

export default App;
