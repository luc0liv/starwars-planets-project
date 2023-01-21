import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Input from './Input';

function Table() {
  const { planets, filteredPlanets, filterPlanets } = useContext(PlanetsContext);
  const [input, setInput] = useState('');

  const formatHeaders = (header) => {
    const sliceSentence = header.charAt(0).toUpperCase() + header.slice(1);
    return sliceSentence.replaceAll('_', ' ');
  };

  const handleChange = ({ target }) => {
    setInput(target.value);
    filterPlanets(target.value);
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
            (filteredPlanets.length === 0 ? planets : filteredPlanets).map((planet) => (
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
