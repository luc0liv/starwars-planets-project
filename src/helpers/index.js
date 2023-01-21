export const formatHeaders = (header) => {
  const sliceSentence = header.charAt(0).toUpperCase() + header.slice(1);
  return sliceSentence.replaceAll('_', ' ');
};

export const columnFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const comparisonFilter = [
  { name: 'maior que', value: '>' },
  { name: 'menor que', value: '<' },
  { name: 'igual a', value: '===' },
];
