import { useState, useEffect } from 'react';

import AddSongForm from '../../components/AddSongForm';
import Search from '../../components/Search';
import SongsList from '../../components/SongsList';
import { setData, getSongs } from '../../crud';
import { sortBy, sortById } from '../../utils';

import './styles.scss';

const HomePage = () => {
  const [songsList, setSongsList] = useState([]);
  const [sortByValue, setSortByValue] = useState('');
  const [openAddNewModal, setOpenAddNewModal] = useState(false);
  const [filteredArtist, setFilteredArtist] = useState('');

  useEffect(() => fetchAndSetData(), []);

  const fetchAndSetData = () => {
    const songs = getSongs();
    setSongsList(songs);
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

  const filtereSongs = songsList.filter(({ artist }) =>
    artist.toLowerCase().includes(filteredArtist.toLowerCase())
  );

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
      <Search
        placeholder='Search the list by artist...'
        value={filteredArtist}
        onChange={e => setFilteredArtist(e.target.value.trimStart())}
      />
      <SongsList songsList={filtereSongs} fetchAndSetData={fetchAndSetData} />
      {openAddNewModal && (
        <AddSongForm
          openAddNewModal={openAddNewModal}
          setOpenAddNewModal={setOpenAddNewModal}
          songsList={songsList}
          fetchAndSetData={fetchAndSetData}
        />
      )}
    </>
  );
};

export default HomePage;
