import Link from 'next/link'

import styles from './SubmissionPopup.module.css'

export default function SubmissionPopup({ pending }) {
    return (
        <>
        { pending && 
            <div className={styles.confirmation_backdrop}>
                <div className={styles.confirmation_container}>
                    <div className={styles.loading_container}>
                        <h3>Hold on while we process the song...</h3>
                        <div className={styles.loader}></div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}