import React, {useState, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

const Word = ({attemptNumber, wordNumber, checkAttempt,
  response, blockTyping, setBlockTyping}) => {
  const [classNames, setClassNames] = useState(['disabled letter',
    'disabled letter', 'disabled letter', 'disabled letter',
    'disabled letter', 'disabled letter']);
  const _classNames = useRef(classNames);

  const [isActive, setIsActive] = useState(false);

  const wordRef = useRef();

  const validLetters = /[a-zA-Z]/;

  const inputRefs = useRef([React.createRef(), React.createRef(),
    React.createRef(), React.createRef(), React.createRef(),
    React.createRef()]);


  const handleKeyPress = useCallback((e) => {
    if (e.key === 'ArrowRight') {
      changeFocus('right');
    } else if (e.key === 'ArrowLeft') {
      changeFocus('left');
    } else if (e.key === 'Enter') {
      setBlockTyping(true);

      const answer = inputRefs.current.
          map(({current}) => current.value).join('');
      checkAttempt(answer);
    }
  }, []);

  // Filters letters, controls backspace behaviour and allows changing
  // filled field
  const handleKeyDown = (e, ref) => {
    if (!validLetters.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    } else if (e.key === 'Backspace' && e.target.value === '') {
      inputRefs.current[ref - 1]?.current.focus();
    } else if (e.target.value.length > 0 && !validLetters.test(e.key)) {
      e.target.value = '';
      // Had to include foreign keys because they trigger onChange
    } else if (e.key.length === 1 && validLetters.test(e.key)) {
      e.target.value = '';
    }
  };

  // Advances fields
  const handleFields = (e, ref) => {
    e.target.value = e.target.value.toUpperCase();

    // For max length does not work on mobile
    e.target.value = e.target.value.slice(-1);

    if (e.target.value !== '') {
      inputRefs.current[ref + 1]?.current.focus();
    }
  };

  const changeFocus = (direction) => {
    const activeElement = document.activeElement.id;
    if (activeElement.includes('square')) {
      const activeElementId = +activeElement.slice(-1);
      if (direction === 'right' && activeElementId < 5) {
        inputRefs.current[activeElementId + 1].current.focus();
      } else if (direction === 'left' && activeElementId > 0) {
        inputRefs.current[activeElementId - 1].current.focus();
      }
    }
  };

  const enableLetters = () => {
    setClassNames((prev) => {
      const newClassNames = [...prev];
      let enabledClassNames = newClassNames.
          map((name) => name.replace('disabled', ''));
      enabledClassNames = enabledClassNames.
          map((name) => `${name} sm:hover:border-2`);

      // Selects first field by default
      inputRefs.current[0].current.focus();

      _classNames.current = enabledClassNames;

      return enabledClassNames;
    });

    // Couldn't use forEach because of preventExtensions bug
    for (let i = 0; i < inputRefs.current.length; i++) {
      inputRefs.current[i].current.disabled = false;
    }

    window.addEventListener('keydown', handleKeyPress);

    wordRef.current.scrollIntoView(
        {behavior: 'smooth', block: 'end', inline: 'nearest'},
    );
  };

  const disableLetters = () => {
    setClassNames((prev) => {
      const newClassNames = [...prev];
      let disabledClassNames = newClassNames.map((name) =>
        (name.includes('disabled') ? name : name + ' disabled'),
      );
      disabledClassNames = disabledClassNames.map((name) =>
        (name.includes('md:hover:border-2') ?
        name.replace('md:hover:border-2', '') : name),
      );
      _classNames.current = disabledClassNames;


      return disabledClassNames;
    });

    // Couldn't use forEach because of preventExtensions bug
    for (let i = 0; i < inputRefs.current.length; i++) {
      inputRefs.current[i].current.disabled = true;
    }

    window.removeEventListener('keydown', handleKeyPress);
  };

  // Enables and disables component
  useEffect(() => {
    setIsActive((prev) => {
      const turnComparison = attemptNumber === wordNumber;

      // Muda apenas se o estado alternou
      if (turnComparison !== prev) {
        if (turnComparison) {
          enableLetters();
        } else {
          disableLetters();
        }
      }

      if (!blockTyping && turnComparison) {
        enableLetters();
      } else {
        disableLetters();
      }

      return turnComparison;
    });
  }, [attemptNumber, blockTyping]);

  useEffect(() => {
    _classNames.current = classNames;
  }, [classNames]);

  // For when the evaluation comes in
  useEffect(() => {
    if (isActive && response.evaluation.length) {
      // Change classes to correponding colors
      setClassNames((prev) => prev.map((curr, index) => {
        return curr += ' ' + response.evaluation[index];
      }));
      // Reveal accentuated answer
      if (response.evaluation.every((elem) => elem === 'right')) {
        for (let i = 0; i < inputRefs.current.length; i++) {
          inputRefs.current[i].current.value = response.
              accentuatedAnswer[i].toUpperCase();
        }
      }
    }
  }, [response.evaluation]);

  return (
    <tr ref={wordRef}>
      <td className=''>
        <input
          ref={inputRefs.current[0]}
          type='text'
          className=
            {`${classNames[0]} caret-transparent focus:border-2
          focus:border-amber-500 shadow-md`}
          id="square0"
          onKeyDown={(e) => handleKeyDown(e, 0)}
          onChange={(e) => handleFields(e, 0)}
        />
      </td>
      <td>
        <input
          ref={inputRefs.current[1]}
          type='text'
          className=
            {`${classNames[1]} caret-transparent focus:border-2
          focus:border-amber-500 shadow-md`}
          id="square1"
          onKeyDown={(e) => handleKeyDown(e, 1)}
          onChange={(e) => handleFields(e, 1)}
        />
      </td>
      <td>
        <input
          ref={inputRefs.current[2]}
          type='text'
          className=
            {`${classNames[2]} caret-transparent focus:border-2
          focus:border-amber-500 shadow-md`}
          id="square2"
          onKeyDown={(e) => handleKeyDown(e, 2)}
          onChange={(e) => handleFields(e, 2)}
        />
      </td>
      <td>
        <input
          ref={inputRefs.current[3]}
          type='text'
          className=
            {`${classNames[3]} caret-transparent focus:border-2
          focus:border-amber-500 shadow-md`}
          id="square3"
          onKeyDown={(e) => handleKeyDown(e, 3)}
          onChange={(e) => handleFields(e, 3)}
        />
      </td>
      <td>
        <input
          ref={inputRefs.current[4]}
          type='text'
          className=
            {`${classNames[4]} caret-transparent focus:border-2
          focus:border-amber-500 shadow-md`}
          id="square4"
          onKeyDown={(e) => handleKeyDown(e, 4)}
          onChange={(e) => handleFields(e, 4)}
        />
      </td>
      <td>
        <input
          ref={inputRefs.current[5]}
          type='text'
          className=
            {`${classNames[5]} caret-transparent focus:border-2
          focus:border-amber-500 shadow-md`}
          id="square5"
          onKeyDown={(e) => handleKeyDown(e, 5)}
          onChange={(e) => handleFields(e, 5)}
        />
      </td>
    </tr>
  );
};

Word.propTypes = {
  attemptNumber: PropTypes.number.isRequired,
  wordNumber: PropTypes.number.isRequired,
  checkAttempt: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired,
  blockTyping: PropTypes.bool.isRequired,
  setBlockTyping: PropTypes.func.isRequired,
};

export {Word};
