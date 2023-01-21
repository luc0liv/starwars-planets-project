import React from 'react';
import PropTypes from 'prop-types';

function Input({ inputValue, onInputChange, testId }) {
  return (
    <input
      type="text"
      value={ inputValue }
      onChange={ onInputChange }
      data-testid={ testId }
    />
  );
}

export default Input;

Input.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};
