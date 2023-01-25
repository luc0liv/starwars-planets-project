import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';


describe('teste a aplicação Star Wars Planet Search', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  })
  });

  afterEach(() => jest.clearAllMocks());

  it('teste se os elementos iniciais são renderizados', async () => {
    await act( async () => render(<App/>));

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
    const filterAfter = screen.queryByRole('button', {  name: /population maior que 0 lixeira/i});
    expect(filterAfter).not.toBeInTheDocument();
  });

  it('adicionando e removendo múltiplos filtros', async () => {
    await act( async () => render(<App/>));
    const filterButton = screen.getByTestId('button-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    await act(async () => {
      userEvent.selectOptions(columnFilter, ['orbital_period']);
      userEvent.selectOptions(comparisonFilter, ['maior que']);
      expect(columnFilter).toHaveValue('orbital_period');
      expect(comparisonFilter).toHaveValue('maior que');
      userEvent.clear(valueFilter);
      userEvent.type(valueFilter, "500");
      userEvent.click(filterButton);
    });

    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(columnFilter.children).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(4);

    await act(async () => {
      userEvent.selectOptions(columnFilter, ['diameter']);
      userEvent.selectOptions(comparisonFilter, ['maior que']);
      expect(columnFilter).toHaveValue('diameter');
      expect(comparisonFilter).toHaveValue('maior que');
      userEvent.clear(valueFilter);
      userEvent.type(valueFilter, "7200");
      userEvent.click(filterButton);
    });

    expect(screen.getAllByTestId('filter')).toHaveLength(2);
    expect(columnFilter.children).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(3);

   await act(async () => {
    userEvent.clear(valueFilter);
    userEvent.click(screen.getByTestId('filter-button-diameter maior que 7200'));
   })
    expect(screen.getAllByRole('row')).toHaveLength(4);
    expect(columnFilter.children).toHaveLength(4);

    await act(async () => {
      userEvent.click(screen.getByTestId('filter-button-orbital_period maior que 500'))
    })

    expect(columnFilter.children).toHaveLength(5);
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('adicionando vários filtros e removendo com o botão de remover todos os filtros', async () => {
    await act( async () => render(<App/>));
    const filterButton = screen.getByTestId('button-filter');
    const removeAllButton = screen.getByTestId('button-remove-filters');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    await act(async () => {
      userEvent.selectOptions(columnFilter, ['rotation_period']);
      userEvent.selectOptions(comparisonFilter, ['menor que']);
      userEvent.clear(valueFilter);
      userEvent.type(valueFilter, "26");
      userEvent.click(filterButton);
    });

    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(columnFilter.children).toHaveLength(4);
    expect(screen.getAllByRole('row')).toHaveLength(9);

    await act(async () => {
      userEvent.selectOptions(columnFilter, ['surface_water']);
      userEvent.selectOptions(comparisonFilter, ['maior que']);
      userEvent.clear(valueFilter);
      userEvent.type(valueFilter, "8");
      userEvent.click(filterButton);
    });

    expect(screen.getAllByTestId('filter')).toHaveLength(2);
    expect(columnFilter.children).toHaveLength(3);
    expect(screen.getAllByRole('row')).toHaveLength(3);

    await act(async () => {;
      userEvent.click(removeAllButton);
    });

    expect(screen.getAllByRole('row')).toHaveLength(11);
  })
})

