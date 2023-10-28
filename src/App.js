import { useEffect, useState } from 'react';
import PasswordRange from './components/PasswordRange';
import PasswordCharset from './components/PasswordCharset';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy as copyDone } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRotateRight,
  faCopy as copy,
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

import {
  CHARSET_LOWER,
  CHARSET_UPPER,
  CHARSET_NUM,
  CHARSET_SYMBOL,
} from './util/constants';

const App = () => {
  const [checkedBoxCount, setCheckedBoxCount] = useState(1);
  const [isCopyClipboard, setIsCopyClipboard] = useState(false);
  const [generatedPass, setGeneratedPass] = useState('');
  const [regeneratePass, setReneratedPass] = useState(false);
  const [passLength, setPassLength] = useState(15);
  const [includedCharsets, setIncludedCharsets] = useState({
    includeLower: true,
    includeUpper: false,
    includeNum: false,
    includeSymbol: false,
  });

  useEffect(() => {
    const newCount = Object.values(includedCharsets).filter(Boolean).length;
    setCheckedBoxCount(newCount);

    let passwordCharset = '';

    passwordCharset += includedCharsets.includeLower ? CHARSET_LOWER : '';
    passwordCharset += includedCharsets.includeUpper ? CHARSET_UPPER : '';
    passwordCharset += includedCharsets.includeNum ? CHARSET_NUM : '';
    passwordCharset += includedCharsets.includeSymbol ? CHARSET_SYMBOL : '';

    setGeneratedPass(generatePassword(passLength, passwordCharset));
  }, [passLength, includedCharsets, regeneratePass]);

  const generatePassword = (length, charset) => {
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handlePassLength = (event, increment = 0) => {
    setPassLength(+event.target.value + increment);
  };

  const handleIncludeCharSet = ({ target: { name, checked } }) => {
    setIncludedCharsets((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(generatedPass)
      .then(() => {
        setIsCopyClipboard(true);
        setTimeout(() => setIsCopyClipboard(false), 750);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      <PasswordRange
        handlePassLength={handlePassLength}
        passLength={passLength}
      />

      <fieldset>
        <legend>Characters used</legend>

        <PasswordCharset
          id="lowerInput"
          name="includeLower"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeLower}
        />

        <PasswordCharset
          id="upperInput"
          name="includeUpper"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeUpper}
        />

        <PasswordCharset
          id="numInput"
          name="includeNum"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeNum}
        />

        <PasswordCharset
          id="symbolInput"
          name="includeSymbol"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeSymbol}
        />
      </fieldset>

      <div>
        <button
          onClick={() => {
            setReneratedPass((prevState) => !prevState);
          }}
        >
          <FontAwesomeIcon icon={faArrowRotateRight} size="lg" />
        </button>
        <p>{generatedPass}</p>
        <button onClick={handleCopyClick}>
          <FontAwesomeIcon icon={isCopyClipboard ? copy : copyDone} size="lg" />
        </button>
      </div>
    </>
  );
};

export default App;
