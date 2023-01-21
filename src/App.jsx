import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);
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
  }, [filters, filteredPlanets]);

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

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        filteredPlanets,
        filterPlanetsByName,
        getFilteringValues } }
    >
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
