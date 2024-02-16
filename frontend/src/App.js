import './App.css';
import React, { useState } from 'react';
import { Word } from './components/Word';
import { requestData } from './services/requests';
import sixLetterWords from './six_letter_words';
import { Scoreboard } from './components/Scoreboard';

const App = () => {
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState({evaluation: [], accentuatedAnswer: ''});
  const [showScoreboard, setShowScoreboard] = useState(false);

  const scoreTemplate = {attemptsPerTry: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0,}, wins: 0, losses: 0, timesPlayed: 0, streak: 0}

  const checkAttempt = (attempt) => {
    if(attempt.length < 6){
        setMessage(() => 'Escreve direito');
        return
    }

    if(!sixLetterWords.includes(attempt.toLowerCase())){
        setMessage(() => 'Desconheço essa palavra aí');
        return
    }

    requestData(`check/${attempt.toLowerCase()}`)
    .then((response) => {
      if(response.evaluation.every((elem) => elem === 'right')){
        let score = JSON.parse(localStorage.getItem('score')) || scoreTemplate;
        score.wins += 1;
        score.attemptsPerTry[attemptNumber + 1] += 1;
        score.timesPlayed += 1;
        score.streak += 1;
        localStorage.setItem('score', JSON.stringify(score));

        setResponse(() => response);
        setTimeout(() => setMessage(() => 'Top de linha...'), 3500);
        setTimeout(() => setShowScoreboard(true), 4500);
      } else if(attemptNumber === 7){
        let score = JSON.parse(localStorage.getItem('score')) || scoreTemplate;
        score.losses += 1;
        score.streak = 0;
        score.timesPlayed += 1;
        localStorage.setItem('score', JSON.stringify(score));

        setTimeout(() => setMessage(() => 'Estudar mais né, sei lá'), 3500);
      } else {
        setResponse(() => response);
        setMessage(() => '');
        setTimeout(() => setAttemptNumber((prev) => prev !== 7 ? prev + 1 : 7), 3500);
      }
    })
    .catch((error) => {
      console.log(error);
      setMessage(() => 'Falha ao se conectar ao servidor: ' + error);
    })
  }

  return (
    <div className="">
      <h1 className="text-5xl my-5 mx-auto max-w-min">PALAVROU</h1>
      <div className="my-2 mx-auto max-w-min whitespace-nowrap text-sm">{message}</div> 
      <div className="flex justify-center align-middle">
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
        {showScoreboard && <Scoreboard/>}
    </div>
  );
}

export default App;
