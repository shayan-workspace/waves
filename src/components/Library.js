import LibrarySong from './LibrarySong';

const Library = ({ songs, isLibraryOpen, selectSongHandler }) => {
  return (
    <div className={`library ${isLibraryOpen ? 'open' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            song={song}
            selectSongHandler={selectSongHandler}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
