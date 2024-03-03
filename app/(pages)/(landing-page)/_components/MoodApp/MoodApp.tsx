import styles from './MoodApp.module.scss';
import AudioInput from './AudioInput/AudioInput';
import { Dispatch, SetStateAction } from 'react';

export default function MoodApp({
  setSongData,
}: {
  setSongData: Dispatch<SetStateAction<null>>;
}) {
  return (
    <div className={styles.container}>
      <h3>Try it out</h3>
      <div className={styles.text_container}>
        <p>
          You'll need to find a YouTube to MP3 converter if you would like to
          try on a song of your choice.{' '}
          <span>Beware of popups and advertisements on these sites!</span>
        </p>
        <p>
          If you'd like, you can just use the demo using one of my favorite
          songs of all time!
        </p>
      </div>
      <AudioInput setData={setSongData} />
    </div>
  );
}
