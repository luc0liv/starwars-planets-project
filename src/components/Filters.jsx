import React, { useState, useContext } from 'react';
import Select from './Select';
import Input from './Input';
import FilterButtons from './FilterButtons';
import PlanetsContext from '../context/PlanetsContext';
import { comparisonFilter } from '../helpers';
import '../assets/css/filters.css';
import Button from './Button';

function Filters() {
  const {
    filterPlanetsByName,
    getFilteringValues,
    newColumnOptions,
    removeFilterOptionFromSelection,
    removeAllFilters,
    removeSelectedFilter,
    filters,
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
    removeFilterOptionFromSelection(columnValue);
    setColumnValue(newColumnOptions.current[0]);
    setInput('');
    setNumberInput(0);
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
      <Button
        name="Filtrar"
        testId="button-filter"
        onButtonClick={ sendFilterValues }
      />
      {filters.current.comparisons.map((comp, index) => (
        <div key={ index } data-testid="filter">
          <FilterButtons
            name={ `${comp.column} ${comp.comparison} ${comp.number}` }
            onClick={ () => removeSelectedFilter(comp) }
          />
        </div>
      ))}
      <Button
        testId="button-remove-filters"
        name="Remover todos os filtros"
        onButtonClick={ removeAllFilters }
      />
    </div>
  );
}

export default Filters;
