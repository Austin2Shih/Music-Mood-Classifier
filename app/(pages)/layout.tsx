import '@globals/styles/colors.scss';
import '@globals/styles/spacers.scss';
import '@globals/styles/variables.scss';
import '@globals/styles/globals.scss';
import fonts from '@globals/fonts';
import metadata from '@globals/metadata.json';

import navLinks from '@data/navLinks.json';
import Navbar from '@components/Navbar/Navbar';
import Footer from './_components/Footer/Footer';

export { metadata };

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts}>
        {/* <Navbar navLinks={navLinks} /> */}
        {children}
        {/* <Footer navLinks={navLinks} /> */}
      </body>
    </html>
  );
}
