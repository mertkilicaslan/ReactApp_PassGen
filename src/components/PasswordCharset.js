import React from 'react';

const PasswordCharset = (props) => {
  const { id, name, includedCharset, handleIncludeCharSet, checkedBoxCount } =
    props;

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={handleIncludeCharSet}
        checked={includedCharset}
        disabled={includedCharset && checkedBoxCount === 1}
      />
      <label className="checkbox-label" htmlFor={id}>
        {name}
      </label>
    </div>
  );
};

export default PasswordCharset;
