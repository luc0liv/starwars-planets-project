import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';
import { columnFilter } from './helpers';

function App() {
  const [planets, setPlanets] = useState([]);
  const newColumnOptions = useRef(columnFilter);

  const filters = useRef({
    name: '',
    comparisons: [],
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((res) => res.json())
      .then((res) => {
        const newPlanetsArray = res.results.map(({ residents, ...planet }) => planet);
        setPlanets(newPlanetsArray);
      })
      .catch((error) => console.error(error));
  }, []);

  const filterPlanetsByName = (name) => {
    if (name !== '') {
      const saveName = { ...filters.current, name };
      filters.current = saveName;
      const filterByName = planets
        .filter((planet) => planet.name.toLowerCase()
          .includes(filters.current.name.toLowerCase()));
      return setFilteredPlanets(filterByName);
    }

    return setFilteredPlanets('');
  };

  const getFilteringValues = (column, comparison, number) => {
    const newFilters = {
      name: filters.current.name,
      comparisons: [...filters.current.comparisons, { column, comparison, number }],
    };
    filters.current = newFilters;
    return filters.current.comparisons.map((comp) => {
      const conditional = !filteredPlanets.length ? planets : filteredPlanets;
      const treatComparisons = {
        'maior que': conditional.filter((planet) => +planet[column] > +number),
        'menor que': conditional.filter((planet) => +planet[column] < +number),
        'igual a': conditional.filter((planet) => +planet[column] === +number),
      };

      const filtered = treatComparisons[comp.comparison];
      return setFilteredPlanets(filtered);
    });
  };

  const removeFilters = (columnValue) => {
    const filterOptions = newColumnOptions.current.filter((col) => col !== columnValue);
    newColumnOptions.current = filterOptions;
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        filteredPlanets,
        filters,
        newColumnOptions,
        removeFilters,
        filterPlanetsByName,
        getFilteringValues } }
    >
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
