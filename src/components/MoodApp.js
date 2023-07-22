import React, { useState } from 'react'

import styles from './MoodApp.module.css'
import AudioInput from './AudioInput'
import AudioDisplay from './AudioDisplay'
export default function MainApp() {
    const [songData, setSongData] = useState(null)
    return (<div className={styles.app_container}>
        { songData ? <AudioDisplay songData={songData}/> : <AudioInput setData={setSongData}/> }   
    </div>)
}