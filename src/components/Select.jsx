import React from 'react';
import PropTypes from 'prop-types';

function Select({ options, onSelectChange, selectName, selectValue, testId }) {
  return (
    <select
      data-testid={ testId }
      id={ selectName }
      name={ selectName }
      value={ selectValue }
      onChange={ onSelectChange }
    >
      { options
        .map((option, index) => (
          <option
            key={ index }
            value={ !option.value ? option : option.value }
          >
            {!option.name ? option : option.name}
          </option>))}
    </select>
  );
}

export default Select;

Select.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  selectName: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(Object).isRequired,
};
