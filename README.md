# Moodify Machine Learning Music Mood Classifier
### Classify segments of raw audio files into one of 5 moods and get back a full mood breakdown of a song as well as a dynamic visual representation of the song based on mood.
![](https://austinshih.com/static/media/moodify.abc2147eaf3f3f341658.png)

## How it works
Moodify's ML model was trained with a Random Forest using a dataset found on Kaggle. To perform dimensionality reduction and only provide the necessary data to my model, I used the Python Music Processing Library, Librosa, to gather features such as MFCCs, mel-spectrograms, chromagrams, and simpler ones such as tempo. The original code can be found [here](https://www.kaggle.com/code/austinhshih/music-mood-classification) on Kaggle. The frontend was built with Next.js and the backend is a Flask server deployed on AWS EC2 using Gunicorn and an Nginx server.

To use the app, you must have access to a raw audio file in `.mp3` or `.wav` format (mp3 preferred). To gain access to one of these files, I recommend using a YouTube to mp3 converter but beware of ads and popups as these sites frequently have such traps. After you have the file, simply drag and drop the file into the box, verify that the file looks correct, and then click the button to send your song over to the backend server for processing!

## Motivations
Machine Learning and Artificial Intelligence have been taking over the tech industry, so I thought it was due time for me to learn ML over the summer. The best way for me to learn is to have a goal or project in mind, and since I am extremely passionate about music (Spotify please consider me for your internship🙏), I decided to solve a problem in the music world that was previously difficult to solve with Machine Learning. Thus, I spent 2 weeks reading through a hands-on Machine Learning book in Python and made sure to build up a solid foundation of knowledge for the future. Additionally, I knew that I needed to understand Music Information Retrieval techniques and DSP so I could engineer and provide quality data to my model so I spent a week consuming endless resources for MIR. Finally, I decided to find a dataset on Kaggle to put my skills to the test. After trying a couple of Machine Learning techniques, I found that the Random Forest worked best with a surprisingly high 90%+ accuracy with no apparent sign of overfitting. Due to the success of my model, I decided to build out an entire app to showcase my work!

## Conclusion
