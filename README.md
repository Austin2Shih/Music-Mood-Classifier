# Moodify Machine Learning Music Mood Classifier
### Classify segments of raw audio files into one of 5 moods and get back a full mood breakdown of a song as well as a dynamic visual representation of the song based on mood.
![](https://austinshih.com/static/media/moodify.abc2147eaf3f3f341658.png)

## How it works
Moodify's ML model was trained with a Random Forest using a dataset found on Kaggle. To perform dimensionality reduction and only provide the necessary data to my model, I used the Python Music Processing Library, Librosa, to gather features such as MFCCs, mel-spectrograms, chromagrams, and simpler ones such as tempo. The original code can be found (here)[https://www.kaggle.com/code/austinhshih/music-mood-classification] on Kaggle. The frontend was built with Next.js and the backend is a Flask server deployed on AWS EC2 using Gunicorn and an Nginx server.

To use the app, you must have access to a raw audio file in `.mp3` or `.wav` format (mp3 preferred). To gain access to one of these files, I recommend using a YouTube to mp3 converter but beware of ads and popups as these sites frequently have such traps. After you have the file, simply drag and drop the file into the box, verify that the file looks correct, and then click the button to send your song over to the backend server for processing!

## Motivations
