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

  const getPlanetsFilteredByComparison = (item) => filters.current.comparisons
    .map((comp) => {
      const conditional = !filteredPlanets.length ? planets : filteredPlanets;
      const treatComparisons = {
        'maior que': conditional.filter((planet) => +planet[item.column] > +item.number),
        'menor que': conditional.filter((planet) => +planet[item.column] < +item.number),
        'igual a': conditional.filter((planet) => +planet[item.column] === +item.number),
      };
      const filtered = treatComparisons[comp.comparison];
      return setFilteredPlanets(filtered);
    });

  const getFilteringValues = (column, comparison, number) => {
    const newFilters = {
      name: filters.current.name,
      comparisons: [...filters.current.comparisons, { column, comparison, number }],
    };
    filters.current = newFilters;
    return getPlanetsFilteredByComparison({ column, comparison, number });
  };

  const removeFilterOptionFromSelection = (option) => {
    const filterOptions = newColumnOptions.current.filter((col) => col !== option);
    newColumnOptions.current = filterOptions;
  };

  const removeAllFilters = () => {
    // botão p/ remover todos os filtros;
    const newFilters = ({
      name: '',
      comparisons: [],
    });
    filters.current = newFilters;
    newColumnOptions.current = columnFilter;
    setFilteredPlanets(planets);
  };

  const removeSelectedFilter = (selection) => {
    // remove o filtro selecionado
    const filtersList = filters.current.comparisons.filter((c) => c !== selection);
    const newFilters = {
      name: '',
      comparisons: filtersList,
    };
    filters.current = newFilters;
    let planetsAfterRemove = [];
    filters.current.comparisons.forEach((comp) => {
      const treatComparisons = {
        'maior que': planets.filter((planet) => +planet[comp.column] > +comp.number),
        'menor que': planets.filter((planet) => +planet[comp.column] < +comp.number),
        'igual a': planets.filter((planet) => +planet[comp.column] === +comp.number),
      };

      const filtered = treatComparisons[comp.comparison];
      planetsAfterRemove = [...filtered];
    });
    newColumnOptions.current = [...newColumnOptions.current, selection.column];
    return setFilteredPlanets(planetsAfterRemove);
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        filteredPlanets,
        filters,
        newColumnOptions,
        removeFilterOptionFromSelection,
        removeAllFilters,
        removeSelectedFilter,
        filterPlanetsByName,
        getFilteringValues } }
    >
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
