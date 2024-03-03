import styles from './AdditonalInfo.module.scss';

const introInfo = [
  {
    title: 'HOW IT WORKS',
    text: [
      "I used the Python library, Librosa, to extract features from the raw audio files such as MFCC's, spectrograms, chromagrams, and tempo.",
      'The dataset I trained on only had 5 second clips of instrumental audio so I break each song into segments and classify based off of 5 second intervals to make sure my predictions are using a similar environment that the model was trained with.',
      'I used a Random Forest and achieved ~95% accuracy on my test data with an F1 score of ~0.95. My model is hosted reliably on a Flask with AWS EC2 deployed using Gunicorn and Nginx.',
    ],
  },
  {
    title: 'MOTIVATIONS',
    text: [
      "I've always been passionate learning new skills and since music is a huge part of my life, I decided to learn both machine learning and DSP over the summer and use this as a sort of capstone project.",
      "Since I'm also well versed in full stack web development, I decided to build out a quick Next.js app with a custom Audio Player and file uploader.",
      '(Spotify please consider me for your internship 🙏)',
    ],
  },
  {
    title: 'THE FUTURE',
    text: [
      'There are known limitations with my model such as loudness and drums corresponding to aggresivness even if the drums are backing happy instrumentals.',
      "I believe that the biggest improvement to my model can only be made by training with better data. Unfortunately, good data is difficult to come by since not many datasets provide mood and raw audio files. I've already tried a few other datasets but upon data exploration, I decided they weren't fit for training.",
      "Once I find a better dataset, I'll attempt to train a more powerful model using Convolutional Neural Networks. Feel free to contact me with recommendations for datasets. Any help would be greatly appreciated!",
    ],
  },
];

export default function AdditionalInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <h3>a little more about this project</h3>
        <div className={styles.intro_segments}>
          {introInfo.map((segment, index) => (
            <div
              key={index}
              className={styles.segment}
              style={{ width: `${100 / introInfo.length}%` }}
            >
              <h3>{segment.title}</h3>
              <div className={styles.divider} />
              <div className={styles.text_container}>
                {segment.text.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
