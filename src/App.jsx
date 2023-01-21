import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);
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
      const filterByName = planets
        .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
      return setFilteredPlanets(filterByName);
    }

    return setFilteredPlanets('');
  };

  return (
    <PlanetsContext.Provider value={ { planets, filteredPlanets, filterPlanetsByName } }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
