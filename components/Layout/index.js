import { Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';


const fonts = [
  'Vermin-Vibes-1989',
  'TradeWinds',
  'Roboto-Bold',
  'Roboto-Medium',
  'Roboto-Regular',
  'IBMPlexSans-Regular'
];

import styles from './style.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>

      <Head>
        <title>Xin Dragons</title>
        <meta name="description" content="Xin Dragons" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {
          fonts.map((font, index) => (
            <Fragment key={index}>
              <link rel="preload" href={`${font}.woff`} as="font" crossOrigin="" type="font/woff" />
              <link rel="preload" href={`${font}.woff2`} as="font" crossOrigin="" type="font/woff2" />
            </Fragment>
          ))
        }
      </Head>

      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {/* <li>
              <Link href="https://stakooor.xindragons.io/">Stakooor</Link>
            </li>
            <li>
              <Link href="https://rafflooor.xindragons.io/">Rafflooor</Link>
            </li>
            <li>
              <Link href="https://mutatooor.xindragons.io/">Mutatooor</Link>
            </li> */}
            <li>
              <Link href="/#lore">Lore</Link>
            </li>
            <li>
              <Link href="/#buy">Buy a dragon</Link>
            </li>
            <li>
              <Link href="/#team">Team</Link>
            </li>
            <li>
              <Link href="https://xinlabs.io">XINLABS</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.social}>
          <Link href="https://twitter.com/XinDragons">

            <img src="/twitter.svg" alt="Xin Dragons Twitter" width={26} height={21} />

          </Link>
          <Link href="https://discord.gg/4U4jYMW6dy">

            <img src="/discord.svg" alt="Xin Dragons Discord" width={26} height={20} />

          </Link>
        </div>
        {/* <div className={styles.baby}>
          <Image src="/bebe.png" alt="Xin Dragons Baby" width={161} height={280} />
        </div> */}

        <h1 className={styles.title}>
          <Image src="/logo.png" alt="Xin Dragons" width={409} height={353} />
        </h1>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles['footer-socials']}>
          <Link href="https://twitter.com/XinDragons">

            <img src="/twitter-2.svg" alt="Xin Dragons Twitter" />

          </Link>
          <Link href="https://discord.gg/4U4jYMW6dy">

            <img src="/discord-2.svg" alt="Xin Dragons Discord" />

          </Link>
        </div>
        <p>{(new Date()).getFullYear()} Xin Dragons All rights reserved</p>
      </footer>
    </div>
  )
}
