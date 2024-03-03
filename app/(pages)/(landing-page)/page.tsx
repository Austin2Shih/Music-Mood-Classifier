'use client';
import React, { useState } from 'react';

import styles from './page.module.scss';
import AudioInput from './_components/AudioInput/AudioInput';
import AudioDisplay from './_components/AudioDisplay/AudioDisplay';
import AdditionalInfo from './_components/AdditionalInfo/AdditionalInfo';
export default function Index() {
  const [songData, setSongData] = useState(null);
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1 className={styles.title}>Moodify</h1>
        <h3 className={styles.subtitle}>A SHORT INTRODUCTION</h3>
        <h3 className={styles.intro}>
          Classify segments of raw audio files into one of 5 moods and get back
          a full mood breakdown of a song as well as a dynamic visual
          representation of the song based on mood.
          <span>{` (currently only works on songs with no vocals)`}</span>
        </h3>
      </div>
      <div className={styles.divider} />
      <div className={styles.mood_app_container}>
        {songData ? (
          <AudioDisplay songData={songData} setSongData={setSongData} />
        ) : (
          <AudioInput setData={setSongData} />
        )}
      </div>
      <div className={styles.divider} />
      <AdditionalInfo />
    </div>
  );
}
