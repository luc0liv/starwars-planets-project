import React, { useState, useContext } from 'react';
import Select from './Select';
import Input from './Input';
import PlanetsContext from '../context/PlanetsContext';
import { columnFilter, comparisonFilter } from '../helpers';
import '../assets/css/filters.css';

function Filters() {
  const [input, setInput] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [columnValue, setColumnValue] = useState('');
  const [comparisonValue, setComparisonValue] = useState('');
  const { filterPlanetsByName } = useContext(PlanetsContext);

  const handleNameChange = ({ target }) => {
    const { value } = target;
    setInput(value);
    filterPlanetsByName(value);
  };

  const handleNumberChange = ({ target }) => {
    const { value } = target;
    // console.log(value);
    setNumberInput(value);
  };

  const handleChange = (target, setState) => {
    const { value } = target;
    // console.log(value);
    setState(value);
  };

  return (
    <div className="filters-container">
      <Input
        inputType="text"
        inputValue={ input }
        onInputChange={ handleNameChange }
        testId="name-filter"
        placeholder="Pesquisa por nome"
      />
      <Select
        options={ columnFilter }
        selectValue={ columnValue }
        selectName="columnValue"
        onSelectChange={ ({ target }) => handleChange(target, setColumnValue) }
      />
      <Select
        options={ comparisonFilter }
        selectValue={ comparisonValue }
        selectName="comparisonValue"
        onSelectChange={ ({ target }) => handleChange(target, setComparisonValue) }
      />
      <Input
        inputType="number"
        inputValue={ numberInput }
        onInputChange={ handleNumberChange }
        testId="value-filter"
      />
    </div>
  );
}

export default Filters;
