const LibrarySong = ({ song, selectSongHandler }) => {
  return (
    <div
      onClick={() => {
        selectSongHandler(song);
      }}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
