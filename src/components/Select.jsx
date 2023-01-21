import React from 'react';
import PropTypes from 'prop-types';

function Select({ options, onSelectChange, selectName, selectValue }) {
  return (
    <select
      id={ selectName }
      name={ selectName }
      value={ selectValue }
      onChange={ onSelectChange }
    >
      { options
        .map((option) => (
          <option
            key={ option.value }
            value={ option.value }
          >
            {option.name}
          </option>))}
    </select>
  );
}

export default Select;

Select.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
  selectName: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(Object).isRequired,
};
