import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((res) => res.json())
      .then((res) => {
        const newPlanetsArray = res.results.map(({ residents, ...planet }) => planet);
        setPlanets(newPlanetsArray);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
