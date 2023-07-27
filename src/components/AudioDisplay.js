import React, { useState, useEffect, useRef } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import styles from './AudioDisplay.module.css'

import AudioControls from './AudioControls';
export default function AudioDisplay({ songData, setSongData }) {
    const { name, url, predictions, counts, sample_interval } = songData
    const audioElement = new Audio(url);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mood, setMood] = useState(predictions[0])

    const audioRef = useRef(audioElement);
    const intervalRef = useRef();

    const { duration } = audioRef.current;

    useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
          startTimer()
        } else {
          audioRef.current.pause();
        }
      }, [isPlaying]);

      useEffect(() => {
        // Pause and clean up on unmount
        return () => {
          audioRef.current.pause();
          clearInterval(intervalRef.current);
        }
      }, []);

      const getMood = (time) => {
        const index = Math.round(time/sample_interval)
        return predictions[Math.min(index, predictions.length - 1)]
      }

      const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
  
        intervalRef.current = setInterval(() => {
          if (audioRef.current.ended) {
            setTrackProgress(0);
            setIsPlaying(false)
          } else {
            setTrackProgress(audioRef.current.currentTime);
            setMood(getMood(audioRef.current.currentTime))
          }
        }, [1000]);
      }

    const onScrub = (value) => {
      // Clear any timers already running
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setTrackProgress(audioRef.current.currentTime);
    }
    
    const onScrubEnd = () => {
      // If not already playing, start
      if (!isPlaying) {
        setIsPlaying(true);
      }
      startTimer();
    }
    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;

    const getMoodColor = () => {
        return `var(--song-${mood})`
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--active-color', getMoodColor());
      }, [mood]);

    return (
    <div className={styles.display_container}>
        <div
          onClick={() => setSongData(null)} 
          className={styles.back_container}
        >
          <IoReturnUpBackOutline/>
          <p>back to home</p>
        </div>
        <h3>{name}/</h3>
        <p>{JSON.stringify(counts)}</p>
        <p>CURRENT MOOD</p>
        <p>{mood}</p>
        <div className={styles.audio_player}>
            <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying}/>
            <div className={styles.progress_bar_wrapper}>
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className={styles.progress_bar}
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{background: trackStyling}}
                />
            </div>
        </div>
    </div>)
}