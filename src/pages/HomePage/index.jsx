import React, { useState, useEffect } from 'react';

import AddSongForm from '../../components/AddSongForm';
import SongsList from '../../components/SongsList';
import { setData, loadData } from '../../crud';
import { sortBy, sortById } from '../../utils';

import './styles.scss';

const HomePage = () => {
  const [songsList, setSongsList] = useState([]);
  const [sortByValue, setSortByValue] = useState('');
  const [openAddNewModal, setOpenAddNewModal] = useState(false);

  useEffect(() => fetchAndSetData(), []);

  const fetchAndSetData = () => {
    const response = loadData();
    setSongsList(response);
  };

  const handleSort = e => {
    e.preventDefault();
    const sortType = e.target.value;

    let sortedSongsList;
    if (sortType === 'sortById') {
      sortedSongsList = sortById(songsList);
    } else {
      const property = sortType === 'sortBySongName' ? 'songName' : 'artist';
      sortedSongsList = sortBy(songsList, property);
    }

    setData(sortedSongsList);
    setSortByValue(sortType);
    fetchAndSetData();
  };

  return (
    <>
      <header>
        <h1>Songs List</h1>
        <select value={sortByValue} onChange={handleSort}>
          <option value='' disabled>
            Sort by
          </option>
          <option value='sortById'>Id</option>
          <option value='sortByArtist'>Artist</option>
          <option value='sortBySongName'>Song Name</option>
        </select>
        <span className='add-new' onClick={() => setOpenAddNewModal(true)}>
          Add New Song
        </span>
      </header>

      {openAddNewModal && (
        <AddSongForm
          openAddNewModal={openAddNewModal}
          setOpenAddNewModal={setOpenAddNewModal}
          songsList={songsList}
          fetchAndSetData={fetchAndSetData}
        />
      )}

      <SongsList songsList={songsList} fetchAndSetData={fetchAndSetData} />
    </>
  );
};

export default HomePage;
