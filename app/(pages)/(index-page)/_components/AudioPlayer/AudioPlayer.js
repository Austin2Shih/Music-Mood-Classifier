import React, { useRef, useEffect } from 'react';

import { IoMdPause, IoMdPlay } from 'react-icons/io'

import styles from './AudioPlayer.module.css'
import useAudioPlayer from '@hooks/useAudioPlayer';

export default function AudioPlayer({ audioFileUrl, setCurrentTime }) {
  const audioRef = useRef(null)

  useEffect(() => {
    // Define the audio element when the component mounts (client-side)
    audioRef.current = new Audio();
    audioRef.current.src = audioFileUrl;
  }, [audioFileUrl]);

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    playAudio,
    pauseAudio,
    scrubAudio,
    adjustVolume,
  } = useAudioPlayer(audioRef);

  useEffect(() => {
    if (setCurrentTime)
        setCurrentTime(currentTime)
  }, [currentTime])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // Pause the audio when unmounting
        audioRef.current = null; // Reset the audioRef
      }
    };
  }, []);

  // Seek to a specific time in the audio
  const handleScrub = (e) => {
    const time = e.target.value;
    scrubAudio(time);
  };

  // Adjust the volume
  const handleVolumeChange = (e) => {
    const volumeLevel = e.target.value;
    adjustVolume(volumeLevel);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={styles.player_container}>
      <div className={styles.timing_controls}>
        <button onClick={isPlaying ? pauseAudio : playAudio}>
          <p className={styles.pause_play}>
            {isPlaying ? <IoMdPause/> : <IoMdPlay/>}
          </p>
        </button>
        <div className={styles.progress_bar_container}>
            <input
            className={styles.player_progress}
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleScrub}
            />
            <div 
            className={styles.progress_trail} 
            style={{width: `calc(${currentTime/duration} * calc(100% - 12px) + 6px)`}}
            />
        </div>
        <p>
          <span>{formatTime(currentTime)}</span>
          <span> / </span>
          <span>{formatTime(duration)}</span>
        </p>
      </div>
      <div className={styles.volume_container}>
        <input
          className={styles.volume_bar}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
