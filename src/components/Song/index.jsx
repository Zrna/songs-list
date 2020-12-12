import React, { useState } from 'react';
import './styles.scss';

import { deleteSong } from '../../crud';
import EditSongForm from '../EditSongForm';

import penIcon from '../../assets/pen.svg';
import trashIcon from '../../assets/trash.svg';

const Song = ({ info, songsList, fetchAndSetData }) => {
  const { id, artist, songName, link } = info;
  const [openModal, setOpenModal] = useState(false);

  const handleSongDelete = id => {
    if (
      window.confirm(
        `Are you sure you want to delete "${artist} - ${songName}"?`
      )
    ) {
      deleteSong(id, songsList);
      fetchAndSetData();
    }
    return;
  };

  return (
    <div className='song'>
      <p className='id'>{id}</p>
      <p className='artist'>{artist}</p>
      <p className='song-name'>{songName}</p>
      <a className='link' href={link} target='_blank' rel='noopener noreferrer'>
        {link}
      </a>
      <div className='actions'>
        <img src={penIcon} alt='Edit' onClick={() => setOpenModal(true)} />
        <img
          src={trashIcon}
          alt='Delete'
          onClick={() => handleSongDelete(id)}
        />
      </div>

      {openModal ? (
        <EditSongForm
          open={openModal}
          setOpen={setOpenModal}
          info={info}
          songsList={songsList}
          fetchAndSetData={fetchAndSetData}
        />
      ) : null}
    </div>
  );
};

export default Song;
