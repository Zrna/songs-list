import React, { useState } from 'react';

import { addSong } from '../../common/crud';
import { onlySpaces } from '../../common/regex';

const AddSongForm = ({ setShowInputs, songsList, fetchAndSetData }) => {
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
      const lastSongIdInList = songsList[songsList.length - 1].id;

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
    setShowInputs(false);
  };

  return (
    <>
      {errorMsg && <p>{errorMsg}</p>}
      <form onSubmit={handleAddSong}>
        <input
          type='text'
          name='newArtist'
          placeholder='Artist Name'
          value={newArtist}
          onChange={handleInputChange}
          required={true}
        />

        <input
          type='text'
          name='newSongName'
          placeholder='Song Name'
          value={newSongName}
          onChange={handleInputChange}
          required={true}
        />

        <input
          type='url'
          name='newSongLink'
          placeholder='Song Link'
          value={newSongLink}
          onChange={handleInputChange}
          required={true}
        />

        <button type='submit'>Add</button>
      </form>
      <button type='reset' onClick={() => setShowInputs(false)}>Cancel</button>
    </>
  )
}

export default AddSongForm;