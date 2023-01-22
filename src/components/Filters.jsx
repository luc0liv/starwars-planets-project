import React, { useState, useContext } from 'react';
import Select from './Select';
import Input from './Input';
// import FilterButtons from './FilterButtons';
import PlanetsContext from '../context/PlanetsContext';
import { comparisonFilter } from '../helpers';
import '../assets/css/filters.css';

function Filters() {
  const {
    filterPlanetsByName,
    getFilteringValues,
    newColumnOptions,
    removeFilters,
    // filters,
  } = useContext(PlanetsContext);
  const [input, setInput] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [columnValue, setColumnValue] = useState('population');

  const handleNameChange = ({ target }) => {
    const { value } = target;
    setInput(value);
    filterPlanetsByName(value);
  };

  const handleChange = (target, setState) => setState(target.value);

  const sendFilterValues = () => {
    getFilteringValues(columnValue, comparisonValue, numberInput);
    removeFilters(columnValue);
    setColumnValue(newColumnOptions.current[0]);
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
        options={ newColumnOptions.current }
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
      {/* <div>
        { filters.current.comparisons
          .map((comp) => (<FilterButtons
            key={ comp.column }
            name={ `${comp.column} ${comp.comparison} ${comp.number}` }
          />))}
      </div> */}
    </div>
  );
}

export default Filters;
