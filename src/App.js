import { useRef, useState } from 'react';

import Nav from './components/Nav';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';

import './styles/app.scss';

import data from './data';

const App = () => {
  const [songs, setSongs] = useState(data());
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const audioRef = useRef(null);

  function playSongHandler() {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  }

  function skipHandler(direction) {
    const currentSong = fetchCurrentSong(songs);
    const currentIndex = songs.indexOf(currentSong);

    if (direction === 'forward') {
      const nextIndex = currentIndex + 1;
      if (nextIndex !== songs.length) {
        selectSongHandler(songs[nextIndex]);
      } else {
        selectSongHandler(songs[0]);
      }
      // another solution
      // setCurrentSong(songs[nextIndex % songs.length]);
    }

    if (direction === 'backward') {
      const prevIndex = currentIndex - 1;
      if (prevIndex !== -1) {
        selectSongHandler(songs[prevIndex]);
      } else {
        selectSongHandler(songs[songs.length - 1]);
      }
    }
  }

  function selectSongHandler(song) {
    const newSongs = songs.map((mapedSong) => {
      if (mapedSong.id === song.id) {
        return {
          ...mapedSong,
          active: true,
        };
      } else {
        return {
          ...mapedSong,
          active: false,
        };
      }
    });

    setSongs(newSongs);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 150);
    }
  }

  function timeUpdateHandler(event) {
    const { currentTime, duration } = event.target;
    const animationPercentage = (currentTime / duration) * 100;
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage,
    });
  }

  function dragHandler(event) {
    const currentTime = event.target.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  }

  function songEndedHandler() {
    skipHandler('forward');
  }

  function formatTime(time) {
    if (isNaN(time)) {
      return '0:00';
    } else {
      return (
        Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
      );
    }
  }

  function fetchCurrentSong(songs) {
    return songs.filter((song) => song.active)[0];
  }

  return (
    <div className={`app ${isLibraryOpen ? 'library-active' : ''}`}>
      <Nav isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      <Song currentSong={fetchCurrentSong(songs)} />
      <Player
        songInfo={songInfo}
        isPlaying={isPlaying}
        currentSong={fetchCurrentSong(songs)}
        playSongHandler={playSongHandler}
        skipHandler={skipHandler}
        dragHandler={dragHandler}
        formatTime={formatTime}
      />
      <Library
        songs={songs}
        isLibraryOpen={isLibraryOpen}
        selectSongHandler={selectSongHandler}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        onEnded={songEndedHandler}
        ref={audioRef}
        src={fetchCurrentSong(songs).audio}
      ></audio>
    </div>
  );
};

export default App;
