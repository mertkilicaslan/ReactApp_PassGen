import { useEffect, useState } from "react";
import PasswordRange from "./components/PasswordRange";
import PasswordCharset from "./components/PasswordCharset";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy as copyDone } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRotateRight,
  faCopy as copy,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";

import {
  CHARSET_LOWER,
  CHARSET_UPPER,
  CHARSET_NUM,
  CHARSET_SYMBOL,
} from "./utils/constants";

const App = () => {
  const [checkedBoxCount, setCheckedBoxCount] = useState(1);
  const [isCopyClipboard, setIsCopyClipboard] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");
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

    let passwordCharset = "";

    passwordCharset += includedCharsets.includeLower ? CHARSET_LOWER : "";
    passwordCharset += includedCharsets.includeUpper ? CHARSET_UPPER : "";
    passwordCharset += includedCharsets.includeNum ? CHARSET_NUM : "";
    passwordCharset += includedCharsets.includeSymbol ? CHARSET_SYMBOL : "";

    setGeneratedPass(generatePassword(passLength, passwordCharset));
  }, [passLength, includedCharsets, regeneratePass]);

  const generatePassword = (length, charset) => {
    let password = "";
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
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <PasswordRange
        handlePassLength={handlePassLength}
        passLength={passLength}
      />

      <div className="checkbox-container">
        <PasswordCharset
          id="lowerCb"
          name="includeLower"
          labelText="abc"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeLower}
        />

        <PasswordCharset
          id="upperCb"
          name="includeUpper"
          labelText="ABC"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeUpper}
        />

        <PasswordCharset
          id="numCb"
          name="includeNum"
          labelText="123"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeNum}
        />

        <PasswordCharset
          id="symbolCb"
          name="includeSymbol"
          labelText="!$#"
          handleIncludeCharSet={handleIncludeCharSet}
          checkedBoxCount={checkedBoxCount}
          includedCharset={includedCharsets.includeSymbol}
        />
      </div>
      <div>
        <button onClick={() => setReneratedPass((prevState) => !prevState)}>
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
