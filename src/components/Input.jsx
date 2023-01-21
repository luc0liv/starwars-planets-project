import React from 'react';
import PropTypes from 'prop-types';

function Input({ inputType, inputValue, onInputChange, testId, placeholder }) {
  return (
    <input
      type={ inputType }
      value={ inputValue }
      onChange={ onInputChange }
      data-testid={ testId }
      placeholder={ placeholder }
    />
  );
}

export default Input;

Input.defaultProps = { placeholder: '' };
Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onInputChange: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};
