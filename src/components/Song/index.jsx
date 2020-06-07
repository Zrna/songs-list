import React, { useState } from 'react';
import './styles.scss';

import { deleteSong } from '../../common/crud';
import EditSongForm from '../EditSongForm';

const Song = ({ info, songsList, fetchAndSetData }) => {
  const { id, artist, songName, link } = info;
  const [ openModal, setOpenModal ] = useState(false);

  const handleSongDelete = id => {
    if (window.confirm('Are you sure you want to delete this song?')){
      deleteSong(id, songsList);
      fetchAndSetData();
    };
    return;
  }

  return (
    <div className='song'>
      <span className='id'>Id: {id}</span>
      <span className='artist'>Artist: {artist}</span>
      <span className='song-name'>Song: {songName}</span>
      <span className='link'>Link: <a href={link} target='_blank' rel="noopener noreferrer">{link}</a></span>

      <button className='delete' onClick={() => handleSongDelete(id)}>Delete</button>
      <button onClick={() => setOpenModal(!openModal)}>Edit song</button>

      {openModal ? 
        <EditSongForm
          open={openModal}
          setOpen={setOpenModal}
          info={info}
          songsList={songsList}
          fetchAndSetData={fetchAndSetData}
        />
        :
        null
      }
    </div>
  )
}

export default Song;