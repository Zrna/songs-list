import React, { useState } from 'react';

import './styles.scss';

import Song from '../Song';

const SongsList = ({ songsList, fetchAndSetData }) => {
  const [ filteredArtist, setFilteredArtist ] = useState('');
  const filteredData = songsList.filter(song => song.artist.toLowerCase().includes(filteredArtist.toLowerCase()));

  return (
    <div className='songs-list'>
      <input
        className='search'
        placeholder='Search list...'
        name='searchByArtist'
        onChange={e => setFilteredArtist(e.target.value.trim())}
      />
      
      <div className='columns'>
        <p className='id'>#</p>
        <p className='artist'>Artist</p>
        <p className='song-name'>Song Name</p>
        <p className='link'>Link</p>
      </div>

      {
        filteredData && filteredData.map(song => (
          <Song
            key={song.id}
            info={song}
            songsList={songsList}
            fetchAndSetData={fetchAndSetData}
          />
        ))
      }
    </div>
  )
}

export default SongsList;