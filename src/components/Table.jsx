import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import formatHeaders from '../helpers';
import Input from './Input';

function Table() {
  const { planets, filteredPlanets, filterPlanetsByName } = useContext(PlanetsContext);
  const [input, setInput] = useState('');
  const planetsList = filteredPlanets.length === 0 ? planets : filteredPlanets;

  const handleChange = ({ target }) => {
    const { value } = target;
    setInput(value);
    filterPlanetsByName(value);
  };

  return (
    <div>
      <Input
        inputValue={ input }
        onInputChange={ handleChange }
        testId="name-filter"
      />
      <table>
        <thead>
          <tr>
            {!planets.length ? (
              <td>Carregando...</td>
            ) : (
              Object.keys(planets[0]).map((key, index) => (
                <th key={ `${key}-${index}` }>{formatHeaders(key)}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {!planets.length ? (
            <tr>
              <td>Carregando... </td>
            </tr>
          ) : (
            planetsList.map((planet) => (
              <tr key={ planet.name }>
                {Object.keys(planet).map((key) => (
                  <td key={ key }>{planet[key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
