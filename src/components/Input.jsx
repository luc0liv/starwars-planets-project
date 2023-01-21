import React from 'react';
import PropTypes from 'prop-types';

function Input({ inputType, inputValue, onInputChange, testId }) {
  return (
    <input
      type={ inputType }
      value={ inputValue }
      onChange={ onInputChange }
      data-testid={ testId }
    />
  );
}

export default Input;

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};
