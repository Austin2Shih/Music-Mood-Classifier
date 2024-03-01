import styles from './MoodRanking.module.css'

export default function MoodRanking({ moodData }) {
    let totalCount = 0
    moodData.forEach(moodPair => totalCount += moodPair[1]);
    return (<div className={styles.ranking_container}>
        <h3>song breakdown</h3>
        <div className={styles.bar_chart_container}>
            { moodData.map((moodPair, index) => {
                const [mood, count] = moodPair
                const moodRatio = count/totalCount
                const displayRatio = count/moodData[0][1]
                return (
                    <div className={styles.bar_container}>
                        <div 
                        className={styles.bar} 
                        key={index}
                        style={{
                            background: `var(--song-${mood})`,
                            width: `${displayRatio * 100}%`
                        }}
                        >
                            <p>{mood}</p>
                        </div>
                        <p>{`${Number.parseFloat(moodRatio * 100).toFixed(2)}%`}</p>
                    </div>
                )
            })}
        </div>
    </div>)
}