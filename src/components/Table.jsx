import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { formatHeaders } from '../helpers';
import Filters from './Filters';

function Table() {
  const { planets, filteredPlanets } = useContext(PlanetsContext);
  const planetsList = filteredPlanets.length === 0 ? planets : filteredPlanets;

  return (
    <div>
      <Filters />
      <table>
        <thead>
          <tr>
            {!planetsList.length ? (
              <td>Carregando...</td>
            ) : (
              Object.keys(planetsList[0]).map((key, index) => (
                <th key={ `${key}-${index}` }>{formatHeaders(key)}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {!planetsList.length ? (
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
