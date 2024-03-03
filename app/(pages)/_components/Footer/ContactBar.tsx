import {
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineInstagram,
} from 'react-icons/ai';

import styles from './ContactBar.module.scss';

export default function ContactBar() {
  return (
    <div className={styles.container}>
      <a
        href="https://www.linkedin.com/in/austin-shih/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillLinkedin></AiFillLinkedin>
      </a>
      <a
        href="https://www.instagram.com/austin.shihh/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiOutlineInstagram></AiOutlineInstagram>
      </a>
      <a
        href="https://github.com/Austin2Shih"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillGithub></AiFillGithub>
      </a>
    </div>
  );
}
