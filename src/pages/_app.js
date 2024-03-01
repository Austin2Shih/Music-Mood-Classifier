import '@/globals.css';
import Navbar from '@/components/Navbar';
import navLinks from '@data/navLinks.json';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar navLinks={navLinks}/>
      <Component {...pageProps} />
    </>
  );
}
