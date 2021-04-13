import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { errorIcon } from '../../assets';
import { addSong, getSongs } from '../../crud';
import '../../styles/_modal.scss';
import { onlySpaces } from '../../utils';

import Input from '../Input';

const AddSongForm = ({ isModalOpen, setIsModalOpen, fetchAndSetData }) => {
  const [newArtist, setNewArtist] = useState('');
  const [newSongName, setNewSongName] = useState('');
  const [newSongLink, setNewSongLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddSong = e => {
    e.preventDefault();
    const songs = getSongs();

    if (onlySpaces.test(newArtist) || onlySpaces.test(newSongName)) {
      setErrorMsg("Input fields can't be empty.");
    } else {
      const lastSongIdInList = Math.max.apply(
        Math,
        songs.map(song => song.id)
      );
      const newId = lastSongIdInList === -Infinity ? 1 : lastSongIdInList + 1;

      const newSong = {
        id: newId,
        artist: newArtist.trim(),
        songName: newSongName.trim(),
        link: newSongLink.trim(),
      };

      addSong(newSong);
      fetchAndSetData();
      resetForm();
    }
  };

  const resetForm = () => {
    setNewArtist('');
    setNewSongName('');
    setNewSongLink('');
    setErrorMsg('');
    setIsModalOpen(false);
  };

  return (
    <Modal
      classNames={{ modal: 'modal' }}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      center
    >
      <h2 className='title'>Add New Song</h2>
      {errorMsg && (
        <p className='error-message'>
          <img src={errorIcon} alt='Error' /> {errorMsg}
        </p>
      )}
      <form onSubmit={handleAddSong}>
        <Input
          isRequired
          label='Artist'
          placeholder='Artist Name'
          value={newArtist}
          onChange={e => setNewArtist(e.target.value)}
        />
        <Input
          isRequired
          label='Song Name'
          placeholder='Song Name'
          value={newSongName}
          onChange={e => setNewSongName(e.target.value)}
        />
        <Input
          isRequired
          label='Link'
          placeholder='Song Link'
          type='url'
          value={newSongLink}
          onChange={e => setNewSongLink(e.target.value)}
        />
        <button type='submit' className='confirm'>
          Confirm
        </button>
      </form>
      <button
        type='reset'
        className='cancel'
        onClick={() => setIsModalOpen(false)}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default AddSongForm;
