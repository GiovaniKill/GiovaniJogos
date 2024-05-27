import '../styles/Palavrou.css';
import React, {useEffect, useRef, useState} from 'react';
import {Word} from '../components/palavrou/Word';
import {getRequest} from '../services/requests';
import sixLetteredWords from '../sixLetteredWords';
import {Scoreboard} from '../components/palavrou/Scoreboard';
import {Link} from 'react-router-dom';
import {Tutorial} from '../components/palavrou/Tutorial';
import Footer from '../components/Footer';

const Palavrou = () => {
  const [attemptNumber, setAttemptNumber] = useState(0);
  const _attemptNumber = useRef(attemptNumber);
  const [message, _setMessage] = useState('');
  const setMessage = (arg) => {
    _setMessage(arg);
    setMessageAnimation(true);
    setTimeout(() => setMessageAnimation(false), 500);
  };

  const [response, setResponse] =
    useState({evaluation: [], accentuatedAnswer: ''});
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [blockTyping, setBlockTyping] = useState(false);

  const [messageAnimation, setMessageAnimation] = useState(false);

  const messages = {
    unknownWord: [
      'Que palavra é essa? 🧐', 'Essa eu não conheço não 😐',
      'Português, por favor', 'Para de inventar palavra 😤',
      'Desculpe 😓, não conheço essa palavra',
      'Essa palavra não existe, certamente...',
    ],
    wrongLengthWord: [
      '6 letras, S - E - I - S. Desculpe, fui grosso 😔',
      'Número errado de letras', 'A palavra deve conter 6 letras',
      'Preencha todos os campos', 'A resposta contém 6 letras',
    ]};

  const scoreTemplate = {
    attemptsPerTry: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0},
    wins: 0,
    losses: 0,
    timesPlayed: 0,
    streak: 0,
  };

  const checkAttempt = (attempt) => {
    if (attempt.length < 6) {
      setMessage(() => messages.wrongLengthWord[Math.
          floor(Math.random() * messages.wrongLengthWord.length)]);
      setBlockTyping(false);
      return;
    }

    if (!sixLetteredWords.includes(attempt.toLowerCase())) {
      setMessage(() => messages.unknownWord[Math.
          floor(Math.random() * messages.unknownWord.length)]);
      setBlockTyping(false);
      return;
    }

    getRequest(`palavrou/check/${attempt.toLowerCase()}`)
        .then((response) => {
          if (response.evaluation.every((elem) => elem === 'right')) {
            const score = JSON.
                parse(localStorage.getItem('score')) || scoreTemplate;
            score.wins += 1;
            score.attemptsPerTry[_attemptNumber.current + 1] += 1;
            score.timesPlayed += 1;
            score.streak += 1;
            localStorage.setItem('score', JSON.stringify(score));

            setResponse(() => response);
            setTimeout(() => setMessage(() => 'Top de linha...'), 3500);
            setTimeout(() => setShowScoreboard(true), 4500);
          } else if (_attemptNumber.current === 7) {
            const score = JSON.
                parse(localStorage.getItem('score')) || scoreTemplate;
            score.losses += 1;
            score.streak = 0;
            score.timesPlayed += 1;
            localStorage.setItem('score', JSON.stringify(score));

            setResponse(() => response);
            setTimeout(() => setMessage(() => 'Estudar mais né, sei lá'), 3500);
            setTimeout(() => setShowScoreboard(true), 4500);
          } else {
            setResponse(() => response);
            setMessage(() => '');
            setTimeout(() => setAttemptNumber((prev) => prev + 1), 3500);
            setTimeout(() => setBlockTyping(false), 3500);
          }
        })
        .catch((error) => {
          console.log(error);
          setMessage(() => 'Falha ao se conectar ao servidor: ' + error);
        });
  };

  useEffect(() => {
    _attemptNumber.current = attemptNumber;
  }, [attemptNumber]);


  return (
    <div className='overflow-hidden flex flex-col'>
      <section className='bg-[#fffbfb] h-screen flex-grow'>
        <header className='flex'>
          <Link to='/'>
            <h2
              className='text-2xl absolute top-5 left-5
            handrawn hover:text-2.1xl opacity-0 sm:opacity-100'
            >
            &lt;- Giovani Jogos
            </h2>
          </Link>

          <h1 className="text-5xl max-w-min mx-auto my-5 doodle">
          PALAVROU
          </h1>
        </header>

        <Tutorial/>

        <div className={`my-2 mx-auto max-w-min
      whitespace-nowrap text-sm ${(messageAnimation ? 'animate-wiggle' : '')}`}>
          {message}
        </div>
        <div className="flex justify-center align-middle">
          <table>
            <tbody>
              <Word
                wordNumber={0} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
              <Word
                wordNumber={1} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
              <Word
                wordNumber={2} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
              <Word
                wordNumber={3} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
              <Word
                wordNumber={4} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
              <Word
                wordNumber={5} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
              <Word
                wordNumber={6} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
              <Word
                wordNumber={7} attemptNumber={attemptNumber} response={response}
                checkAttempt={checkAttempt} blockTyping={blockTyping}
                setBlockTyping={setBlockTyping}
              />
            </tbody>
          </table>
        </div>
        {showScoreboard && <Scoreboard/>}
      </section>
      <Footer/>
    </div>
  );
};

export default Palavrou;
