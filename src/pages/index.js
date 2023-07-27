import styles from './index.module.css'

import MoodApp from '@/components/MoodApp';

export default function Index() {
  return (
    <div className={styles.homepage_container}>
      <h1>Music Mood Classifier</h1>
      <h2>{`(currently only works on songs with no vocals)`}</h2>
      <MoodApp/>
    </div>
  );
}
