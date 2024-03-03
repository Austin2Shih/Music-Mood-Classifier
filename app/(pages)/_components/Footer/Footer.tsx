import Link from 'next/link';
import { GoLocation } from 'react-icons/go';
import { AiOutlineMail } from 'react-icons/ai';
import { GiSmartphone } from 'react-icons/gi';

import contactData from '@data/contactData.json';
import ContactBar from './ContactBar';
import styles from './Footer.module.scss';

export default function Contact() {
  return (
    <div className={styles.container}>
      <h3>CONTACT</h3>
      <div className={styles.icon_container}>
        <div>
          <p className={styles.icon}>
            <GoLocation />
          </p>
          <h3>WHERE TO FIND ME</h3>
          <p>{contactData.location}</p>
        </div>
        <div>
          <p className={styles.icon}>
            <AiOutlineMail />
          </p>
          <h3>EMAIL ME AT</h3>
          <Link href={`mailto: ${contactData.email}`}>{contactData.email}</Link>
        </div>
        <div>
          <p className={styles.icon}>
            <GiSmartphone />
          </p>
          <h3>CALL ME AT</h3>
          <Link href="tel:+15107373634">{contactData.phone}</Link>
        </div>
      </div>
      <ContactBar />
    </div>
  );
}
