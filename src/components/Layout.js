import Head from 'next/head';
import styles from '../styles/layout.module.css';
import Navbar from './Navbar';
import Socials from './Socials';
import NavbarButton from './images/navButton.svg';
import NavbarButtonClose from './images/cross.svg';
import LogoSVG from './images/terminalLogo.svg';
import React, { useState } from "react";
import Link from 'next/link';

export const siteTitle = 'Kadir Tabak • Portfolio • Game Developer';

export default function Layout({ children }) {
  const [openActive, setOpenActive] = useState(true);

  const toggleMobileNavbar = () => {
    setOpenActive(!openActive);
  };

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <base target="_blank"></base>
        <meta
          name="description"
          content=""
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        <LogoSVG className={styles.logo} />
        <div className="sideMenu">
          <Navbar /><Socials /> <div className={styles.copyText}>Designed & Created By <Link className={styles.copyLink} href="https://github.com/jeduf" >Kadir Tabak</Link> </div>
        </div>
        <div className={`${openActive ? styles.mobileNavbar : styles.mobileNavbar__open}`}><Navbar toggleMobileNavbar={toggleMobileNavbar} /><Socials /> <div className={styles.copyTextMobile}>Designed & Created By <Link className={styles.copyLink} href="https://github.com/jeduf" >Kadir Tabak</Link> </div></div>
        <NavbarButton className={`${openActive ? styles.mobileNavButtons : styles.mobileNavButtons__closed}`} onClick={() => {
          toggleMobileNavbar();
        }
        } />
        <NavbarButtonClose className={`${openActive ? styles.mobileNavButtons__closed : styles.mobileNavButtons}`} onClick={() => {
          toggleMobileNavbar();
        }} />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}