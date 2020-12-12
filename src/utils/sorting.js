export const sortById = data => {
  return data.sort((a, b) => a.id - b.id);
};

export const sortBy = (data, property) => {
  const sorted = data.sort((a, b) => {
    return a[property].toLowerCase().localeCompare(b[property].toLowerCase());
  });

  return sorted;
};