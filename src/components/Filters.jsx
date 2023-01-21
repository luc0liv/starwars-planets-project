import React, { useState, useContext } from 'react';
import Select from './Select';
import Input from './Input';
import PlanetsContext from '../context/PlanetsContext';
import { columnFilter, comparisonFilter } from '../helpers';
import '../assets/css/filters.css';

function Filters() {
  const [input, setInput] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [columnValue, setColumnValue] = useState('population');
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const { filterPlanetsByName, getFilteringValues } = useContext(PlanetsContext);

  const handleNameChange = ({ target }) => {
    const { value } = target;
    setInput(value);
    filterPlanetsByName(value);
  };

  const handleChange = (target, setState) => setState(target.value);

  const sendFilterValues = () => {
    getFilteringValues(columnValue, comparisonValue, numberInput);
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
        testId="column-filter"
        options={ columnFilter }
        selectValue={ columnValue }
        selectName="columnValue"
        onSelectChange={ ({ target }) => handleChange(target, setColumnValue) }
      />
      <Select
        testId="comparison-filter"
        options={ comparisonFilter }
        selectValue={ comparisonValue }
        selectName="comparisonValue"
        onSelectChange={ ({ target }) => handleChange(target, setComparisonValue) }
      />
      <Input
        inputType="number"
        inputValue={ numberInput }
        onInputChange={ ({ target }) => handleChange(target, setNumberInput) }
        testId="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ sendFilterValues }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
