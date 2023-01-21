import React from 'react';
import PropTypes from 'prop-types';

function Select({ options }) {
  return (
    <select name="" id="">
      { options
        .map((option) => (
          <option
            key={ option.value }
            value={ option.value }
          >
            {option.value}
          </option>))}
    </select>
  );
}

export default Select;

Select.propTypes = {
  options: PropTypes.arrayOf(Object).isRequired,
};
