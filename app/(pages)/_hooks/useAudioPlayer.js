import { useState, useEffect } from 'react';

const useAudioPlayer = (audioRef) => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const updateDuration = () => {
      setDuration(audioRef.current.duration);
    };
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateTime);
      audioElement.addEventListener('loadedmetadata', updateDuration);
      audioElement.addEventListener('ended', handleAudioEnded); // Add event listener for audio ended
      setIsReady(true); // Mark the audio element as ready
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateTime);
        audioElement.removeEventListener('loadedmetadata', updateDuration);
        audioElement.removeEventListener('ended', handleAudioEnded); // Add event listener for audio ended
      }
    };
  }, [audioRef]);

  const playAudio = () => {
    if (isReady) {
      // Check if audio element is ready before accessing its methods
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (isReady) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const scrubAudio = (time) => {
    if (isReady) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const adjustVolume = (value) => {
    if (isReady) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  return {
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    playAudio,
    pauseAudio,
    scrubAudio,
    adjustVolume,
  };
};

export default useAudioPlayer;
