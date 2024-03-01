import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './AudioInput.module.css';
import SubmissionPopup from './SubmissionPopup';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

export default function AudioInput({ setData }) {
  const [file, setFile] = useState(null);
  const [pending, setPending] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const sendPayload = async () => {
    if (file) {
      setPending(true);
      const formData = new FormData();
      formData.append('audioFile', file);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FLASK_ENDPOINT}/api/mood`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      setData({
        filePath: file.path,
        name: file.name,
        url: URL.createObjectURL(file),
        ...data,
      });
      setPending(false);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': [],
    },
  });
  return (
    <div className={styles.input_container}>
      <div
        {...getRootProps({
          className: `${styles.drop_box}`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      <div className={styles.input_options}>
        <div className={styles.selected_file}>
          <h2 className={styles.selected_file_header}>Selected File</h2>
          <div className={styles.accepted_file}>
            <p>{file ? file.name : 'No File Selected'}</p>
            {fileUrl && <AudioPlayer audioFileUrl={fileUrl} />}
          </div>
        </div>
        <button
          className={`${styles.submit_button} ${file ? null : styles.inactive}`}
          onClick={sendPayload}
        >
          <p>CLASSIFY MOOD</p>
        </button>
      </div>
      <SubmissionPopup pending={pending} />
    </div>
  );
}
