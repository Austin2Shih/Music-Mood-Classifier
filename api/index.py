from flask import Flask, request
import numpy as np
import io
import json
import math
import joblib
import librosa
from pydub import AudioSegment
from sklearn.preprocessing import OrdinalEncoder
from sklearn.ensemble import RandomForestClassifier

SAMPLE_INTERVAL = 3
SAMPLE_LENGTH = 5


class ModelWrapper:
    def __init__(self, model, inverse_transform_fn):
        self.model = model
        self.invert_encoding = inverse_transform_fn


app = Flask(__name__)


def get5sFeatures(file):
    output = []

    signal, sr = librosa.load(file)
    duration = librosa.get_duration(y=signal, sr=sr)

    for i in range(0, math.floor(duration) - SAMPLE_LENGTH, SAMPLE_INTERVAL):
        short_signal = signal[sr * i: sr * (i + SAMPLE_LENGTH)]

        tempo = librosa.beat.tempo(y=short_signal)
        output_row = np.array(tempo)
        stft = np.mean(librosa.feature.melspectrogram(
            y=short_signal).T, axis=0)
        output_row = np.hstack((output_row, stft))

        chroma = np.mean(librosa.feature.chroma_stft(y=short_signal).T, axis=0)
        output_row = np.hstack((output_row, chroma))

        mfccs = np.mean(librosa.feature.mfcc(y=short_signal).T, axis=0)
        output_row = np.hstack((output_row, mfccs))
        output.append(output_row)

    return np.array(output)


@app.route("/api/mood", methods=['POST'])
def getMoods():
    print(request.files)
    if 'audioFile' not in request.files:
        return 'No file part', 400

    audioFile = request.files['audioFile']
    if audioFile.filename == '':
        return 'No selected file', 400

    audio_data = audioFile.read()

    if audioFile.content_type == 'audio/mpeg':
        audio = AudioSegment.from_mp3(io.BytesIO(audio_data))
        audio_stream = io.BytesIO()
        audio.export(audio_stream, format='wav')
    else:
        audio_stream = io.BytesIO(audio_data)

    x = get5sFeatures(audio_stream)
    loaded_model_wrapper = joblib.load("mood-classification-model.joblib")
    encoded_preds = loaded_model_wrapper.model.predict(x).reshape(-1, 1)
    preds = loaded_model_wrapper.invert_encoding(encoded_preds)

    output_dict = {}
    for pred in preds:
        pred = pred[0]
        if pred in output_dict:
            output_dict[pred] += 1
        else:
            output_dict[pred] = 1

    output_dict = sorted(output_dict.items(), key=lambda x: -x[1])

    return json.dumps({
        'predictions': [x[0] for x in preds.tolist()],
        'counts': output_dict,
        'sample_interval': SAMPLE_INTERVAL,
    })


if __name__ == '__main__':
    app.run(port=5328)
