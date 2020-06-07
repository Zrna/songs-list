import React, { useState, useEffect } from 'react';

import { loadData } from '../../common/crud';
import { sortBy, sortById } from '../../common/sorting';

import AddSongForm from '../../components/AddSongForm';
import SongsList from '../../components/SongsList';

const HomePage = () => {
  const [ songsList, setSongsList ] = useState([]);
  const [ sortByValue, setSortByValue ] = useState('');
  const [ showInputs, setShowInputs ] = useState(false);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const fetchAndSetData = () => {
    const response = loadData();
    setSongsList(response);
  };

  const handleSort = e => {
    e.preventDefault();

    const selectedValue = e.target.value;
    selectedValue === 'sortById' ? sortById() : sortBy(selectedValue);

    setSortByValue(selectedValue);
    fetchAndSetData();
  };

  return (
    <>
      <header>Songs List</header>

      <span>Sort by: </span>
      <select value={sortByValue} onChange={handleSort}>
        <option value='sortById'>Id</option>
        <option value='sortByArtist'>Artist</option>
        <option value='sortBySongName'>Song Name</option>
      </select>

      <button onClick={() => setShowInputs(!showInputs)} disabled={showInputs}>Add New</button>
      {showInputs ?
        <AddSongForm
          setShowInputs={setShowInputs}
          songsList={songsList}
          fetchAndSetData={fetchAndSetData}
        />
        :
        null
      }
      
      <SongsList
        songsList={songsList}
        fetchAndSetData={fetchAndSetData}
      />
    </>
  )
}

export default HomePage;