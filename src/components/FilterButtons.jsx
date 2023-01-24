import React from 'react';
import PropTypes from 'prop-types';
import trashIcon from '../assets/img/trash-icon.svg';

function FilterButtons({ name, onClick }) {
  return (
    <button type="button" onClick={ onClick } className="delete-filter">
      {name}
      <img src={ trashIcon } alt="Lixeira" />
    </button>
  );
}

export default FilterButtons;

FilterButtons.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
