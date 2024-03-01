'use client';
import React, { useState } from 'react'

import styles from './page.module.scss'
import AudioInput from './_components/AudioInput/AudioInput'
import AudioDisplay from './_components/AudioDisplay/AudioDisplay'
export default function Index() {
    const [songData, setSongData] = useState(null)
    return (<div className={styles.app_container}>
        { songData? 
            <AudioDisplay songData={songData} setSongData={setSongData}/> : 
            <AudioInput setData={setSongData}/> 
        }   
    </div>)
}