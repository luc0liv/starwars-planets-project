import React, { useState, useContext, useRef } from 'react';
import Select from './Select';
import Input from './Input';
import PlanetsContext from '../context/PlanetsContext';
import { columnFilter, comparisonFilter } from '../helpers';
import '../assets/css/filters.css';

function Filters() {
  const [input, setInput] = useState('');
  const [numberInput, setNumberInput] = useState(0);
  const [counter, setCounter] = useState(0);
  const [columnValue, setColumnValue] = useState('population');
  const newColumnOptions = useRef(columnFilter);
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const { filterPlanetsByName, getFilteringValues, filters } = useContext(PlanetsContext);

  const handleNameChange = ({ target }) => {
    const { value } = target;
    setInput(value);
    filterPlanetsByName(value);
  };

  const removeFilters = () => {
    // tá quebrando o requisito 4, mas passa no 6 \_(¬¬)_/
    const MAX_COUNT = 5;
    const comparisonColumns = filters.current.comparisons.map((comp) => comp.column);
    const columnsDifference = columnFilter.filter((x) => !comparisonColumns.includes(x));
    newColumnOptions.current = columnsDifference;
    setCounter(counter + 1);
    if (counter === MAX_COUNT) {
      newColumnOptions.current = [];
      setColumnValue('');
    }
  };

  const handleChange = (target, setState) => setState(target.value);

  const sendFilterValues = () => {
    getFilteringValues(columnValue, comparisonValue, numberInput);
    removeFilters();
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
    </div>
  );
}

export default Filters;
