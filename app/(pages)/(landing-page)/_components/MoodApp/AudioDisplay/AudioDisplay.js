'use client';
import { useState, useEffect } from 'react';
import styles from './AudioDisplay.module.css';

import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import MoodRanking from './MoodRanking';
import MoodTimeline from './MoodTimeline';

export default function AudioDisplay({ songData }) {
  const { name, predictions, counts, sample_interval } = songData;
  const [currentTime, setCurrentTime] = useState(0);
  const [mood, setMood] = useState(predictions[0]);

  useEffect(() => {
    const getMood = (time) => {
      const index = Math.round(time / sample_interval);
      return predictions[Math.min(index, predictions.length - 1)];
    };
    setMood(getMood(currentTime));
  }, [currentTime, predictions, sample_interval]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--active-color',
      `var(--song-${mood})`
    );
  }, [mood]);

  return (
    <div className={styles.display_container}>
      <div className={styles.display_card}>
        <h3>{name}/</h3>
        <p>CURRENT MOOD</p>
        <p>{mood}</p>
        <AudioPlayer
          audioFileUrl={songData.url}
          setCurrentTime={setCurrentTime}
        />
      </div>
      <div className={styles.info_container}>
        <MoodRanking moodData={counts} />
        <MoodTimeline moodData={predictions} />
      </div>
    </div>
  );
}
