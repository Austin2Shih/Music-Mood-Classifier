import Link from 'next/link';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';

import styles from './Navbar.module.css';
import useToggle from '@hooks/useToggle';

export default function Navbar({ navLinks }) {
  const [active, toggleActive, _, setInactive] = useToggle(false);
  return (
    <div className={styles.relative_wrapper}>
      <div className={styles.container}>
        <h2>LOGO IMG</h2>
        <div className={styles.nav_container}>
          <div className={`${styles.links} ${active ? styles.active : null}`}>
            {navLinks.map((link) => {
              return (
                <Link key={link.slug} href={link.slug} onClick={setInactive}>
                  {link.name}
                </Link>
              );
            })}
          </div>
          <button className={styles.menu} onClick={toggleActive}>
            {active ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>
    </div>
  );
}
