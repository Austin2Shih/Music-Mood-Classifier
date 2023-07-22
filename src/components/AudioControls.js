import { HiOutlinePlay, HiOutlinePause } from 'react-icons/hi2'
import styles from './AudioControls.module.css'
export default function AudioControls({ isPlaying, onPlayPauseClick }) {
    return (
    <div>
        {isPlaying ? (
        <button
            type="button"
            className={styles.pause}
            onClick={() => onPlayPauseClick(false)}
            aria-label="Pause"
        >
            <HiOutlinePause className={styles.pause_icon}/>
        </button>
        ) : (
        <button
            type="button"
            className={styles.play}
            onClick={() => onPlayPauseClick(true)}
            aria-label="Play"
        >
            <HiOutlinePlay className={styles.play_icon}/>
        </button>
        )}
    </div>)

}