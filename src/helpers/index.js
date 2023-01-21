const formatHeaders = (header) => {
  const sliceSentence = header.charAt(0).toUpperCase() + header.slice(1);
  return sliceSentence.replaceAll('_', ' ');
};

export default formatHeaders;
