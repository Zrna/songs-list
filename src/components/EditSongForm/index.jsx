import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { errorIcon } from '../../assets';
import { updateSong } from '../../crud';
import '../../styles/_modal.scss';
import { onlySpaces } from '../../utils';

const EditSong = ({ open, setOpen, info, songsList, fetchAndSetData }) => {
  const { id, artist, songName, link } = info;
  const [editArtist, setEditArtist] = useState(artist);
  const [editSongName, setEditSongName] = useState(songName);
  const [editLink, setEditLink] = useState(link);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEditSong = e => {
    e.preventDefault();

    if (onlySpaces.test(editArtist) || onlySpaces.test(editSongName)) {
      setErrorMsg("Input fields can't be empty");
    } else {
      const updatedSong = {
        id,
        artist: editArtist.trim(),
        songName: editSongName.trim(),
        link: editLink.trim(),
      };

      updateSong(updatedSong, songsList);
      fetchAndSetData();
      setOpen(false);
      setErrorMsg('');
    }
  };

  return (
    <Modal
      classNames={{ modal: 'modal' }}
      open={open}
      onClose={() => setOpen(false)}
      center
    >
      <h2 className='title'>Edit song</h2>
      <h4>
        {artist} - {songName}
      </h4>

      {errorMsg && (
        <p className='error-message'>
          <img src={errorIcon} alt='Error' /> {errorMsg}
        </p>
      )}

      <form onSubmit={handleEditSong}>
        <label htmlFor='id'>ID:</label>
        <input type='number' name='id' placeholder='ID' value={id} disabled />

        <label htmlFor='editArtist'>Artist:</label>
        <input
          type='text'
          name='editArtist'
          placeholder='Artist Name'
          value={editArtist}
          onChange={e => setEditArtist(e.target.value)}
          required
        />

        <label htmlFor='editSongName'>Song Name:</label>
        <input
          type='text'
          name='editSongName'
          placeholder='Song Name'
          value={editSongName}
          onChange={e => setEditSongName(e.target.value)}
          required
        />

        <label htmlFor='editLink'>Link:</label>
        <input
          type='url'
          name='editLink'
          placeholder='Song Link'
          value={editLink}
          onChange={e => setEditLink(e.target.value)}
          required
        />
        <button className='confirm' type='submit'>
          Save changes
        </button>
      </form>
    </Modal>
  );
};

export default EditSong;
