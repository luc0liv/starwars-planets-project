import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';

afterEach(() => jest.clearAllMocks());

it('teste se os elementos iniciais são renderizados', () => {
  render(<App/>);

  const nameInputElement = screen.getByTestId('name-filter');
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });
  const removeAllFiltersButton = screen.getByRole('button', {
    name: /remover todos os filtros/i
  });
  expect(nameInputElement).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();
  expect(removeAllFiltersButton).toBeInTheDocument();
});

it('teste se a API foi chamada', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act( async () => render(<App/>));
  expect(global.fetch).toHaveBeenCalled();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

  const nameHeader = screen.getByRole('columnheader', {
    name: /name/i
  });
  expect(nameHeader).toBeInTheDocument();
  const tableHeader = screen.getAllByRole('columnheader');
  expect(tableHeader).toHaveLength(13);
})
