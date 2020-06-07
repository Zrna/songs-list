import React, { useState } from 'react';

import Song from '../Song';

const SongsList = ({ songsList, fetchAndSetData }) => {
  const [ filteredArtist, setFilteredArtist ] = useState('');
  const filteredData = songsList.filter(song => song.artist.toLowerCase().includes(filteredArtist.toLowerCase()));

  return (
    <>
      <input name='searchByArtist' onChange={e => setFilteredArtist(e.target.value.trim())} />

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
    </>
  )
}

export default SongsList;