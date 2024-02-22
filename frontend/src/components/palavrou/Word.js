import React, {useState, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

const Word = ({attemptNumber, wordNumber, checkAttempt,
  response, blockTyping, setBlockTyping}) => {
  const [classNames, setClassNames] = useState(['disabled letter',
    'disabled letter', 'disabled letter', 'disabled letter',
    'disabled letter', 'disabled letter']);
  const _classNames = useRef(classNames);

  const [typedLetters, setTypedLetters] = useState(['', '', '', '', '', '']);
  const _typedLetters = useRef(typedLetters);

  const [isActive, setIsActive] = useState(false);

  const wordRef = useRef();

  // Hidden input for keyboard trigger in smartphones
  const hiddenInputRef = useRef();

  const validLetters = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e',
    'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K',
    'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r',
    'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X',
    'y', 'Y', 'z', 'Z'];

  const inputRefs = [React.createRef(), React.createRef(), React.createRef(),
    React.createRef(), React.createRef(), React.createRef()];

  const handleKeyPress = useCallback((e) => {
    if (validLetters.includes(e.key)) {
      const currentSelection = _classNames.current.
          findIndex((name) => name.includes('selected'));

      setTypedLetters((prev) => {
        const newTypedLetters = [...prev];
        newTypedLetters[currentSelection] = e.key.toUpperCase();
        return newTypedLetters;
      });
      changeSelection('+');
    } else if (e.key === 'ArrowRight') {
      changeSelection('+');
    } else if (e.key === 'ArrowLeft') {
      changeSelection('-');
    } else if (e.key === 'Enter') {
      setBlockTyping(true);
      checkAttempt(_typedLetters.current.join(''));
    } else if (e.key === 'Backspace') {
      const currentSelection = _classNames.current.
          findIndex((name) => name.includes('selected'));

      setTypedLetters((prev) => {
        const newTypedLetters = [...prev];

        // Mimics backspace behaviour
        if (newTypedLetters[currentSelection] === '') {
          newTypedLetters[currentSelection - 1] = '';
          changeSelection('-');
        } else {
          newTypedLetters[currentSelection] = '';
        }
        return newTypedLetters;
      });
    }
  }, []);

  const selectLetter = (index) => {
    setClassNames((prev) => {
      const newClassNames = [...prev];
      const unselectedClassNames = newClassNames.
          map((name) => name.replace('selected', ''));
      unselectedClassNames[index] += ' selected';

      _classNames.current = unselectedClassNames;
      return unselectedClassNames;
    });
  };

  const changeSelection = (direction) => {
    setClassNames((prev) => {
      const currentSelection = prev.
          findIndex((name) => name.includes('selected'));
      if (currentSelection === -1) return prev;
      if (direction === '+' && currentSelection === 5) return prev;
      if (direction === '-' && currentSelection === 0) return prev;


      const newClassNames = [...prev];
      newClassNames[currentSelection] = newClassNames[currentSelection].
          replace('selected', '');

      direction === '+' ? newClassNames[currentSelection + 1] += ' selected' :
          newClassNames[currentSelection - 1] += ' selected';

      _classNames.current = newClassNames;
      return newClassNames;
    });
  };

  const enableLetters = () => {
    setClassNames((prev) => {
      const newClassNames = [...prev];
      let enabledClassNames = newClassNames.
          map((name) => name.replace('disabled', ''));
      enabledClassNames = enabledClassNames.
          map((name) => `${name} hover:bg-slate-100`);

      if (!enabledClassNames[0].includes('selected')) {
        enabledClassNames[0] += ' selected';
      }
      _classNames.current = enabledClassNames;

      return enabledClassNames;
    });
    window.addEventListener('keydown', handleKeyPress);
    wordRef.current.scrollIntoView(
        {behavior: 'smooth', block: 'end', inline: 'nearest'},
    );
  };

  const disableLetters = () => {
    setClassNames((prev) => {
      const newClassNames = [...prev];
      const unselectedClassNames = newClassNames.map((name) =>
        ( name.includes('selected') ? name.replace('selected', '') : name),
      );
      let disabledClassNames = unselectedClassNames.map((name) =>
        (name.includes('disabled') ? name : name + ' disabled'),
      );
      disabledClassNames = disabledClassNames.map((name) =>
        (name.includes('hover:bg-slate-100') ?
        name.replace('hover:bg-slate-100', '') : name),
      );
      _classNames.current = disabledClassNames;

      return disabledClassNames;
    });
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

  useEffect(() => {
    _typedLetters.current = typedLetters;
  }, [typedLetters]);

  useEffect(() => {
    if (isActive && response.evaluation.length) {
      // Change classes to correponding colors
      setClassNames((prev) => prev.map((curr, index) => {
        return curr += ' ' + response.evaluation[index];
      }));
      // Reveal accentuated answer
      if (response.evaluation.every((elem) => elem === 'right')) {
        setTypedLetters(() =>
          (response.accentuatedAnswer.toUpperCase().split('')),
        );
      }
    }
  }, [response.evaluation]);

  return (
    <tr ref={wordRef}>
      <td>
        <input type='text' className='hidden' ref={hiddenInputRef}/>
      </td>
      <td>
        <div ref={inputRefs[0]} className={classNames[0]}
          id="square1" onClick={(e) =>{
            !e.target.classList.contains('disabled') && selectLetter(0);
            hiddenInputRef.current.focus();
          }
          }
        >
          {typedLetters[0]}
        </div>
      </td>
      <td>
        <div ref={inputRefs[1]} className={classNames[1]}
          id="square2" onClick={(e) =>
            (!e.target.classList.contains('disabled') && selectLetter(1))}>
          {typedLetters[1]}
        </div>
      </td>
      <td>
        <div ref={inputRefs[2]} className={classNames[2]}
          id="square3" onClick={(e) =>
            (!e.target.classList.contains('disabled') && selectLetter(2))}>
          {typedLetters[2]}
        </div>
      </td>
      <td>
        <div ref={inputRefs[3]} className={classNames[3]}
          id="square4" onClick={(e) =>
            (!e.target.classList.contains('disabled') && selectLetter(3))}>
          {typedLetters[3]}
        </div>
      </td>
      <td>
        <div ref={inputRefs[4]} className={classNames[4]}
          id="square5" onClick={(e) =>
            (!e.target.classList.contains('disabled') && selectLetter(4))}>
          {typedLetters[4]}
        </div>
      </td>
      <td>
        <div ref={inputRefs[5]} className={classNames[5]}
          id="square6" onClick={(e) =>
            (!e.target.classList.contains('disabled') && selectLetter(5))}>
          {typedLetters[5]}
        </div>
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
