import React from 'react';

import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../util/constants';

const PasswordRange = (props) => {
  const { handlePassLength, passLength } = props;

  return (
    <>
      <label htmlFor="passLength">Length: {passLength} </label>
      <button
        onClick={(e) => handlePassLength(e, passLength - 1)}
        disabled={passLength <= MIN_PASSWORD_LENGTH}
      >
        -
      </button>
      <input
        type="range"
        id="passLength"
        name="passLength"
        min={MIN_PASSWORD_LENGTH}
        max={MAX_PASSWORD_LENGTH}
        onChange={handlePassLength}
        value={passLength}
      />
      <button
        onClick={(e) => handlePassLength(e, passLength + 1)}
        disabled={passLength >= MAX_PASSWORD_LENGTH}
      >
        +
      </button>
    </>
  );
};

export default PasswordRange;
