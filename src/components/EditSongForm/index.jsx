import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { errorIcon } from '../../assets';
import { updateSong } from '../../crud';
import '../../styles/_modal.scss';
import { onlySpaces } from '../../utils';

import Input from '../Input';

const EditSong = ({ isModalOpen, setIsModalOpen, song, fetchAndSetData }) => {
  const { id, artist, songName, link } = song;

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

      updateSong(updatedSong);
      fetchAndSetData();
      setIsModalOpen(false);
      setErrorMsg('');
    }
  };

  return (
    <Modal
      classNames={{ modal: 'modal' }}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
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
        <Input isDisabled label='ID' value={id} />
        <Input
          isRequired
          label='Artist'
          placeholder='Artist Name'
          value={editArtist}
          onChange={e => setEditArtist(e.target.value)}
        />
        <Input
          isRequired
          label='Song Name'
          placeholder='Song Name'
          value={editSongName}
          onChange={e => setEditSongName(e.target.value)}
        />
        <Input
          isRequired
          label='Link'
          placeholder='Song Link'
          type='url'
          value={editLink}
          onChange={e => setEditLink(e.target.value)}
        />
        <button className='confirm' type='submit'>
          Save changes
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

export default EditSong;
