import { useState } from 'react';

import Song from '../Song';

import './styles.scss';

const SongsList = ({ songsList, fetchAndSetData }) => {
  const [filteredArtist, setFilteredArtist] = useState('');
  const filteredData = songsList.filter(({ artist }) =>
    artist.toLowerCase().includes(filteredArtist.toLowerCase())
  );

  return (
    <div className='songs-list'>
      <input
        className='search'
        placeholder='Search the list by artist...'
        name='searchByArtist'
        onChange={e => setFilteredArtist(e.target.value.trim())}
      />

      <div className='columns'>
        <p className='id'>#</p>
        <p className='artist'>Artist</p>
        <p className='song-name'>Song Name</p>
        <p className='link'>Link</p>
      </div>

      {!filteredData.length ? (
        <p>No data.</p>
      ) : (
        filteredData &&
        filteredData.map(song => (
          <Song
            key={song.id}
            info={song}
            songsList={songsList}
            fetchAndSetData={fetchAndSetData}
          />
        ))
      )}
    </div>
  );
};

export default SongsList;
