import React, { useState } from 'react';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import '../../styles/_modal.scss';
import errorIcon from '../../assets/error.svg';

import { addSong } from '../../common/crud';
import { onlySpaces } from '../../common/regex';

const AddSongForm = ({ openAddNewModal, setOpenAddNewModal, songsList, fetchAndSetData }) => {
  const [ newArtist, setNewArtist ] = useState('');
  const [ newSongName, setNewSongName ] = useState('');
  const [ newSongLink, setNewSongLink ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');

  const handleInputChange = e => {
    if (e.target.name === 'newArtist') setNewArtist(e.target.value);
    if (e.target.name === 'newSongName') setNewSongName(e.target.value);
    if (e.target.name === 'newSongLink') setNewSongLink(e.target.value);
  };

  const handleAddSong = e => {
    e.preventDefault();

    if (onlySpaces.test(newArtist) || onlySpaces.test(newSongName)) {
      setErrorMsg('Input fields can\'t be empty.');
    } else {
      const lastSongIdInList = Math.max.apply(Math, songsList.map(song => song.id));

      const newSong = {
        id: lastSongIdInList + 1,
        artist: newArtist,
        songName: newSongName,
        link: newSongLink
      };

      addSong(newSong, songsList);
      fetchAndSetData();
      resetForm();
    }
  };

  const resetForm = () => {
    setNewArtist('');
    setNewSongName('');
    setNewSongLink('');
    setErrorMsg('');
    setOpenAddNewModal(false);
  };

  return (
    <Modal classNames={{ modal: 'modal' }} open={openAddNewModal} onClose={() => setOpenAddNewModal(false)} center>
      <h2 className='title'>Add New Song</h2>
      {errorMsg && <p className='error-message'><img src={errorIcon} alt='Error' /> {errorMsg}</p>}

      <form onSubmit={handleAddSong}>
      <label htmlFor='newArtist'>Artist:</label>
        <input
          type='text'
          name='newArtist'
          placeholder='Artist Name'
          value={newArtist}
          onChange={handleInputChange}
          required={true}
        />

        <label htmlFor='newSongName'>Song Name:</label>
        <input
          type='text'
          name='newSongName'
          placeholder='Song Name'
          value={newSongName}
          onChange={handleInputChange}
          required={true}
        />

        <label htmlFor='newSongLink'>Link:</label>
        <input
          type='url'
          name='newSongLink'
          placeholder='Song Link'
          value={newSongLink}
          onChange={handleInputChange}
          required={true}
        />

        <button className='confirm' type='submit'>Confirm</button>
      </form>
      <button className='cancel' type='reset' onClick={() => setOpenAddNewModal(false)}>Cancel</button>
    </Modal>
  )
}

export default AddSongForm;