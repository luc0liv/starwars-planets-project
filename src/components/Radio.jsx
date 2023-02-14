import React from 'react';

function Radio({
  radioLabel,
  radioName,
  radioId,
  radioValue,
  testId,
  isChecked,
  onRadioChange,
}) {
  return (
    <label htmlFor={ radioId }>
      {radioLabel}
      <input
        type="radio"
        name={ radioName }
        id={ radioId }
        value={ radioValue }
        defaultChecked={ isChecked }
        data-testid={ testId }
        onChange={ onRadioChange }
      />
    </label>
  );
}

export default Radio;

Radio.propTypes = ({}).isRequired;
