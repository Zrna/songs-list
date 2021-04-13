import initialData from '../initialData';

export const setData = (data = initialData) => {
  localStorage.setItem('data', JSON.stringify(data));
};

export const getSongs = () => {
  const localStorageExists = localStorage.hasOwnProperty('data');

  if (!localStorageExists) setData();

  return JSON.parse(localStorage.getItem('data'));
};

export const deleteSong = id => {
  const songs = getSongs();
  const updatedList = songs.filter(song => song.id !== id);

  setData(updatedList);
};

export const addSong = newSong => {
  const songs = getSongs();
  const updatedList = [...songs, newSong];

  setData(updatedList);
};

export const updateSong = updatedSong => {
  const songs = getSongs();

  const updatedList = [...songs];
  const songIndex = songs.findIndex(song => song.id === updatedSong.id);
  updatedList[songIndex] = updatedSong;

  setData(updatedList);
};
