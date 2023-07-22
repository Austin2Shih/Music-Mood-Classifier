import styles from './index.module.css'

import MoodApp from '@/components/MoodApp';

export default function Index() {
  return (
    <div className={styles.homepage_container}>
      <h1>Music Mood Classifier</h1>
      <p>{`(currently only works on songs with no vocals)`}</p>
      <MoodApp/>
      <a href='https://tomp3.cc/youtube-to-mp3/'>Link to Youtube to MP3 Converter</a>
    </div>
  );
}
