import { setData } from './crud';

export const sortById = () => {
  const data = JSON.parse(localStorage.getItem('data'));
  const sorted = data.sort((a, b) => a.id - b.id);

  setData(sorted);
};

export const sortBy = selectedValue => {
  const data = JSON.parse(localStorage.getItem('data'));

  let value;
  if (selectedValue === 'sortByArtist') value = 'artist';
  if (selectedValue === 'sortBySongName') value = 'songName';

  const sorted = data.sort((a, b) => {
    return a[value].toLowerCase().localeCompare(b[value].toLowerCase());
  });

  setData(sorted);
};