import React, { useState, useEffect } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import styles from './AudioDisplay.module.css'

import AudioPlayer from './AudioPlayer';

export default function AudioDisplay({ songData, setSongData }) {
    const { name, url, predictions, counts, sample_interval } = songData
    const [currentTime, setCurrentTime] = useState(0)
    const [mood, setMood] = useState(predictions[0])

    const getMood = (time) => {
      const index = Math.round(time/sample_interval)
      return predictions[Math.min(index, predictions.length - 1)]
    }

    useEffect(() => {
      setMood(getMood(currentTime))
    }, [currentTime])

    useEffect(() => {
      document.documentElement.style.setProperty('--active-color', `var(--song-${mood})`);
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
        <AudioPlayer audioFileUrl={url} setCurrentTime={setCurrentTime}/>
    </div>
    )
}