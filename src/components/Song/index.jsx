import React, { useState } from 'react';

import { penIcon, trashIcon } from '../../assets';
import { deleteSong } from '../../crud';
import EditSongForm from '../EditSongForm';

import './styles.scss';

const Song = ({ info, songsList, fetchAndSetData }) => {
  const { id, artist, songName, link } = info;
  const [openModal, setOpenModal] = useState(false);

  const handleSongDelete = id => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${artist} - ${songName}"?`
    );

    if (confirmDelete) {
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

      {openModal && (
        <EditSongForm
          open={openModal}
          setOpen={setOpenModal}
          info={info}
          songsList={songsList}
          fetchAndSetData={fetchAndSetData}
        />
      )}
    </div>
  );
};

export default Song;