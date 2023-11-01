import './App.css';
import React, { useState } from 'react';
import { Word } from './components/Word';
import { requestData } from './services/requests';

const App = () => {
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [message, setMessage] = useState('');
  const [evaluation, setEvaluation] = useState([]);

  const checkAttempt = (attempt) => {
    if(attempt.length < 6){
        setMessage(() => 'Digite as 6 letras');
        return
    }

    requestData(`check/${attempt.toLowerCase()}`)
    .then(({ evaluation }) => {
      if(evaluation.every((elem) => elem === 'right')){
        setEvaluation(() => evaluation);
        setTimeout(() => setMessage(() => 'Parabéns!'), 3000);
      } else {
        console.log(evaluation);
        setEvaluation(() => evaluation);
        setMessage(() => '');
        setTimeout(() => setAttemptNumber((prev) => prev + 1), 3000);
      }
    })
    .catch((error) => {
      setMessage(() => 'Falha ao se conectar ao servidor: ' + error);
    })
  }

  return (
    <div className="App">
      <div>{message}</div>
      <table>
        <tbody>
          <Word wordNumber={0} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
          <Word wordNumber={1} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
          <Word wordNumber={2} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
          <Word wordNumber={3} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
          <Word wordNumber={4} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
          <Word wordNumber={5} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
          <Word wordNumber={6} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
          <Word wordNumber={7} attemptNumber={attemptNumber} evaluation={evaluation}checkAttempt={checkAttempt}/>
        </tbody>
      </table>
    </div>
  );
}

export default App;
