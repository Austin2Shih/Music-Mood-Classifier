import React, { useRef, useEffect } from 'react';
import useAudioPlayer from '@/hooks/useAudioPlayer';

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
    setCurrentTime(currentTime)
  }, [currentTime])

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
    <div>
      <div>
        <button onClick={isPlaying ? pauseAudio : playAudio}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleScrub}
        />
        <span>{formatTime(currentTime)}</span>
        <span> / </span>
        <span>{formatTime(duration)}</span>
      </div>
      <div>
        <input
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
