import Song from '../Song';

import './styles.scss';

const SongsList = ({ songsList, fetchAndSetData }) => {
  return (
    <div className='songs-list'>
      <div className='columns'>
        <p className='id'>#</p>
        <p className='artist'>Artist</p>
        <p className='song-name'>Song Name</p>
        <p className='link'>Link</p>
      </div>

      {!songsList.length ? (
        <p>No data.</p>
      ) : (
        songsList.map(song => (
          <Song key={song.id} song={song} fetchAndSetData={fetchAndSetData} />
        ))
      )}
    </div>
  );
};

export default SongsList;
