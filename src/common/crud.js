import initialData from '../initialData';

export const setData = (data = initialData) => {
  localStorage.setItem('data', JSON.stringify(data));
  console.log('set data', data);
};

export const loadData = () => {
  const localStorageExists = localStorage.hasOwnProperty('data');
  console.log('load data');
  if (!localStorageExists) setData();
  return JSON.parse(localStorage.getItem('data'));
};

export const deleteSong = (id, songsList) => {
  const updatedList = songsList.filter(song => song.id !== id);

  setData(updatedList);
};

export const addSong = (newSong, songsList) => {
  const updatedList = [
    ...songsList,
    newSong
  ];

  setData(updatedList);
};

export const updateSong = (updatedSong, songsList) => {
  const updatedList = [...songsList];
  const songIndex = songsList.findIndex(song => song.id === updatedSong.id);
  updatedList[songIndex] = updatedSong;

  setData(updatedList);
};
