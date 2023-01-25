import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';

afterEach(() => jest.clearAllMocks());

it('teste se os elementos iniciais são renderizados', () => {
  render(<App/>);

  const nameInputElement = screen.getByTestId('name-filter');
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const removeAllFiltersButton = screen.getByRole('button', {
    name: /remover todos os filtros/i
  });

  expect(nameInputElement).toBeInTheDocument();
  expect(nameInputElement).toHaveValue('');
  expect(columnFilter).toBeInTheDocument();
  expect(columnFilter.children).toHaveLength(5);
  expect(columnFilter).toHaveValue('population');
  expect(comparisonFilter).toBeInTheDocument();
  expect(comparisonFilter.children).toHaveLength(3);
  expect(comparisonFilter).toHaveValue('maior que');
  expect(valueFilter).toBeInTheDocument();
  expect(valueFilter).toHaveValue(0);
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
  const tatooine = screen.getByRole('cell', {  name: /tatooine/i});
  expect(tatooine).toBeInTheDocument();
});

it('teste se ao digitar nome a tabela é atualizada', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act( async () => render(<App/>));

  const nameInput = screen.getByTestId('name-filter');
  userEvent.type(nameInput, 'tatooine');

  const tableRows = screen.getAllByRole('row');
  expect(tableRows).toHaveLength(2);

  const tatooine = screen.getByRole('cell', {  name: /tatooine/i});
  expect(tatooine).toBeInTheDocument();

  userEvent.clear(nameInput);
  const newTableRows = screen.getAllByRole('row');
  expect(newTableRows).toHaveLength(11);

  userEvent.type(nameInput, 'oo');
  expect(screen.getAllByRole('row')).toHaveLength(3);
});

it('teste adicionando e removendo um filtro', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  await act( async () => render(<App/>));
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  userEvent.click(filterButton);
  expect(screen.getAllByRole('row')).toHaveLength(9);

  const filter = screen.getByRole('button', {  name: /population maior que 0 lixeira/i});
  expect(filter).toBeInTheDocument();

  userEvent.click(filter);
  expect(screen.getAllByRole('row')).toHaveLength(11);
});

