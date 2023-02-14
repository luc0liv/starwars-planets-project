import React from 'react';
import PropTypes from 'prop-types';

function Select({ options, onSelectChange, selectName, selectValue, testId, label }) {
  return (
    <label htmlFor={ selectName }>
      { label }
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
              value={ option }
            >
              { option }
            </option>))}
      </select>
    </label>
  );
}

export default Select;

Select.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selectName: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(Object).isRequired,
};
