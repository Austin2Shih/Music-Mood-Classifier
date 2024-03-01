import styles from './MoodTimeline.module.css';

export default function MoodTimeline({ moodData }) {
  let totalCount = moodData.length;
  return (
    <div className={styles.timeline_container}>
      <h3>mood timeline</h3>
      <div className={styles.timeline}>
        {moodData.map((mood, index) => (
          <div
            key={index}
            className={styles.segment}
            style={{
              background: `var(--song-${mood})`,
              width: `calc(${1 / totalCount} * 100%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
