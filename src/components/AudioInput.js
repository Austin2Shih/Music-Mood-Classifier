import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

import styles from './AudioInput.module.css'

export default function AudioInput({ setData }) {
    const [file, setFile] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFile(acceptedFiles[0])
        }
    }, [])

    const sendPayload = async () => {
        const formData = new FormData();
        formData.append('audioFile', file); 
        const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/api/mood`, {
            method: "POST",
            body: formData
        })

        const data = await res.json()

        setData({
            filePath: file.path,
            name: file.name,
            url: URL.createObjectURL(file),
            ...data,
        })
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
        'audio/*': []
    }
    })
    return (
    <div className={styles.input_container}>
        <div {...getRootProps({
            className: `${styles.drop_box}`
        })}>
        <input {...getInputProps()} />
        {
            isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        </div>
        { file && <>
            <div className={styles.accepted_file}>
                <p>{file.name}</p>
            </div>
            <button className={styles.submit_button} onClick={sendPayload}>CLASSIFY MOOD</button>
        </> }
    </div>
    )
}

