import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { errorIcon } from '../../assets';
import { addSong } from '../../crud';
import '../../styles/_modal.scss';
import { onlySpaces } from '../../utils';

const AddSongForm = ({
  openAddNewModal,
  setOpenAddNewModal,
  songsList,
  fetchAndSetData,
}) => {
  const [newArtist, setNewArtist] = useState('');
  const [newSongName, setNewSongName] = useState('');
  const [newSongLink, setNewSongLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddSong = e => {
    e.preventDefault();

    if (onlySpaces.test(newArtist) || onlySpaces.test(newSongName)) {
      setErrorMsg("Input fields can't be empty.");
    } else {
      const lastSongIdInList = Math.max.apply(
        Math,
        songsList.map(song => song.id)
      );
      const newId = lastSongIdInList === -Infinity ? 1 : lastSongIdInList + 1;

      const newSong = {
        id: newId,
        artist: newArtist.trim(),
        songName: newSongName.trim(),
        link: newSongLink.trim(),
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
    <Modal
      classNames={{ modal: 'modal' }}
      open={openAddNewModal}
      onClose={() => setOpenAddNewModal(false)}
      center
    >
      <h2 className='title'>Add New Song</h2>
      {errorMsg && (
        <p className='error-message'>
          <img src={errorIcon} alt='Error' /> {errorMsg}
        </p>
      )}

      <form onSubmit={handleAddSong}>
        <label htmlFor='newArtist'>Artist:</label>
        <input
          type='text'
          name='newArtist'
          placeholder='Artist Name'
          value={newArtist}
          onChange={e => setNewArtist(e.target.value)}
          required
        />

        <label htmlFor='newSongName'>Song Name:</label>
        <input
          type='text'
          name='newSongName'
          placeholder='Song Name'
          value={newSongName}
          onChange={e => setNewSongName(e.target.value)}
          required
        />

        <label htmlFor='newSongLink'>Link:</label>
        <input
          type='url'
          name='newSongLink'
          placeholder='Song Link'
          value={newSongLink}
          onChange={e => setNewSongLink(e.target.value)}
          required
        />

        <button type='submit' className='confirm'>
          Confirm
        </button>
      </form>
      <button
        type='reset'
        className='cancel'
        onClick={() => setOpenAddNewModal(false)}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default AddSongForm;
