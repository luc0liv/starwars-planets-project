export const formatHeaders = (header) => {
  const sliceSentence = header.charAt(0).toUpperCase() + header.slice(1);
  return sliceSentence.replaceAll('_', ' ');
};

export const columnFilter = [
  { value: 'population', name: 'Population' },
  { value: 'orbital_period', name: 'Orbital period' },
  { value: 'diameter', name: 'Diameter' },
  { value: 'rotation_period', name: 'Rotation period' },
  { value: 'surface_water', name: 'Surface water' },
];

export const comparisonFilter = [
  { name: 'maior que', value: '>' },
  { name: 'menor que', value: '<' },
  { name: 'igual a', value: '===' },
];
