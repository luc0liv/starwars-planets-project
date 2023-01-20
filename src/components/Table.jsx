import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);

  const formatHeaders = (header) => {
    const sliceSentence = header.charAt(0).toUpperCase() + header.slice(1);
    return sliceSentence.replaceAll('_', ' ');
  };

  return (
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
          planets.map((planet) => (
            <tr key={ planet.name }>
              {Object.keys(planet).map((key) => (
                <td key={ key }>{planet[key]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
