import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/commons.css';

function Button({ onButtonClick, name, testId }) {
  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ onButtonClick }
      className="default-button"
    >
      { name }
    </button>
  );
}

export default Button;

Button.propTypes = (PropTypes.shape({})).isRequired;
