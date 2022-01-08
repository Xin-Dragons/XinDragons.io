import { Fragment } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import classnames from 'classnames';
import styles from '../styles/Home.module.scss'

const cards = [
  {
    src: '/chromatic.png',
    title: 'Xin Chromatic',
    color: 'chromatic',
    text: 'It can change into different shapes, even human beings. It is said that it can control all the seas'
  },
  {
    src: '/gold.png',
    title: 'Crystal Gold',
    color: 'gold',
    text: 'Protects hidden treasures or personal wealth.'
  },
  {
    src: '/neon.png',
    title: 'Chinese Neon',
    color: 'neon',
    text: 'It is said that the coiling dragon can control time.'
  },
  {
    src: '/sea.png',
    title: 'Deep Sea',
    color: 'sea',
    text: 'Lives in the seas, rivers, lakes, or underground. It can control the flow of rivers or streams.'
  },
  {
    src: '/gargoyle-purple.png',
    title: 'Gargoyle Purple',
    color: 'gargoyle-purple',
    text: 'Powerful and evil dragon that often makes floods.'
  },
  {
    src: '/chinese.png',
    title: 'Chinese',
    color: 'chinese',
    text: 'It controls the four seasons and descendants of the Yellow Emperor'
  },
  {
    src: '/crystal.png',
    title: 'Crystal',
    color: 'crystal',
    text: 'It can fly through thick cloud and make rain.'
  },
  {
    src: '/swamp.png',
    title: 'Swamp',
    color: 'swamp',
    text: 'The green dragon represents the east and controls rain and wind.'
  },
  {
    src: '/gargoyle.png',
    title: 'Gargoyle',
    color: 'gargoyle',
    text: 'In ancient China, this dragon is often linked to catastrophes like storms and floods.'
  },
  {
    src: '/xin.png',
    title: 'Xin',
    color: 'xin',
    text: 'Lucky Dragons, it is said that they bring luck to their holders'
  }
];

const phases = [
  {
    title: 'Starting up',
    color: 'grey-green',
    align: 'left',
    offset: 100,
    steps: [
      'Minting of 887 Xin Dragons',
      'Listing them on secondary Marketplace',
      'Setup holder verification'
    ]
  },
  {
    title: 'The dragons are sleeping',
    color: 'neon',
    align: 'right',
    offset: 160,
    steps: [
      '@Hal, @The Gentlemonke and @zeyfromdiscord take over the lead of the project',
      'Community building, hiring a team of terrific mods',
      'Updated Roadmap is created'
    ]
  },
  {
    title: 'The awakening',
    color: 'light-gold',
    align: 'left',
    offset: 410,
    steps: [
      '$XIN Token is created',
      'First DAO investment - $SHDW',
      'Second DAO investment - $IN',
      'XinDragons.io launched',
    ]
  },

  {
    title: 'The babies',
    color: 'blue',
    align: 'right',
    offset: 490,
    steps: [
      'Baby XIN Dragons minting and publishing on ME',
      'Holders of 3 Xin Dragons will be entitled to a FREE baby',
      '**50%** of all royalties from gen 2 secondary sales will be paid to gen 1 holders'
    ]
  },
  {
    title: 'XinDAO Investment Fund',
    color: 'purple',
    align: 'left',
    offset: 720,
    steps: [
      '50% of gen2 mint proceeds set aside for XinDAO',
      'Investments voted on by XinDAO',
      'Profit taking amount/frequency voted on by XinDAO',
      'Profits shared with all DAO members'
    ]
  }
]

const fonts = [
  'Vermin-Vibes-1989',
  'TradeWinds',
  'Roboto-Bold',
  'Roboto-Medium',
  'Roboto-Regular'
];

export default function Home() {
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

      <main className={styles.main}>
        <div className={styles.content}>
          <header className={styles.header}>
            <nav>
              <ul>
                <li>
                  <Link href="/"><a>Home</a></Link>
                </li>
                <li>
                  <Link href="#lore"><a>Lore</a></Link>
                </li>
                <li>
                  <Link href="#roadmap"><a>Roadmap</a></Link>
                </li>
                <li>
                  <Link href="#babies"><a>Babies</a></Link>
                </li>
                <li>
                  <Link href="#token"><a>Token</a></Link>
                </li>
              </ul>
            </nav>
            <div className={styles.social}>
              <Link href="https://twitter.com/XinDragons">
                <a>
                  <img src="/twitter.svg" alt="Xin Dragons Twitter" width={26} height={21} />
                </a>
              </Link>
              <Link href="https://twitter.com/XinDragons">
                <a>
                  <img src="/discord.svg" alt="Xin Dragons Discord" width={26} height={20} />
                </a>
              </Link>
            </div>
          </header>

          <div className={styles.baby}>
            <Image src="/bebe.png" alt="Xin Dragons Baby" width={161} height={280} />
          </div>

          <h1 className={styles.title}>
            <Image src="/logo.png" alt="Xin Dragons" width={409} height={353} />
          </h1>

          <section className={styles.section}>
            <h2 id="lore" className={styles.heading}>Lore</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo eros quis quam dapibus, vel finibus augue vehicula. Mauris semper neque ac lacus tincidunt auctor. Quisque nec arcu vel orci volutpat condimentum. Vivamus pellentesque diam non lectus laoreet, vitae congue quam fringilla. Fusce accumsan elit at metus lobortis, eu ullamcorper felis sagittis. Donec accumsan dui sed ornare luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec porta ex eu pretium semper. Etiam at sapien massa. Integer fringilla iaculis orci, in blandit neque dapibus nec. Sed facilisis massa orci, aliquet bibendum magna dictum tristique.</p>

            <p>Ut vitae venenatis sapien, sit amet lacinia ex. Aenean finibus nulla quis ex tincidunt bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla elementum, ante ut pellentesque ultricies, purus est lobortis enim, eget tempus justo dui nec mauris. Proin mollis nisl vitae tellus feugiat fringilla.</p>
          </section>

          <section className={classnames(styles.section, styles.dragons)}>
            <h2 id="dragons" className={styles.heading}>Dragons</h2>

            <div className={styles.grid}>
              {
                cards.map((card, index) => (
                  <div key={index} className={styles.card}>
                    <Image src={card.src} alt={card.title} width={165} height={165} />
                    <h3 className={classnames(styles.heading, styles[card.color])}>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                ))
              }
            </div>
          </section>
        </div>
      </main>

      <section className={classnames(styles.section, styles.roadmap)}>
        <h2 id="roadmap" className={styles.heading}>Roadmap</h2>

        <div className={styles['roadmap-inner']}>
          {
            phases.map((phase, index) => (
              <div key={index} className={classnames(styles.phase, styles[phase.align])} style={{ top: `${phase.offset}px` }}>
                <h3 className={classnames(styles.heading, styles[phase.color])}>{`Phase ${index + 1} - ${phase.title}`}</h3>
                <div className={styles['phase-inner']}>
                  {
                    Array.isArray(phase.steps)
                      ? (
                        <ul>
                          {
                            phase.steps.map((step, index) => <li key={index}>{step}</li>)
                          }
                        </ul>
                      )
                      : <p>{phase.steps}</p>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <div className={styles['dark-bg']}>
        <section className={styles.section}>
          <div className={styles.content}>
            <h2 id="babies" className={classnames(styles.heading, styles['babies-header'])}>Xin Dragon Babies</h2>

            <div className={classnames(styles.flex, styles.narrow)}>
              <img src="/baby.png" alt="Xin Dragon Baby" width={145} height={143} />

              <ul className={styles['align-left']}>
                <li>Xin Dragon Babies will be cute remastered descendants of their more ferocious parents</li>
                <li>Striking and instantly recognizable PFPs, with their own rarity and traits</li>
                <li>Holders of 3 dragons will be able to mint a FREE baby</li>
                <li>Delisted dragons will be airdropped daily $XIN tokens</li>
                <li>After the airdrop period, all holders of 3 dragons will have accumulated enought $XIN to mint a free baby</li>
                <li>WEN MINT? - TBD</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.content}>
            <h2 id="token" className={classnames(styles.heading, styles['token-header'])}>$XIN Token</h2>

            <div className={classnames(styles.flex, styles.narrow)}>
              <ul className={styles['align-right']}>
                <li>$XIN token has already been minted</li>
                <li>Supply is 10,000,000</li>
                <li>$XIN will not be listed on DEX (for now)</li>
                <li>$XIN will be be used to power the Xin ecosystem</li>
                <li>First use will be for minting a free baby</li>
                <li>Other uses will be announced in the near future...</li>
              </ul>
              <img src="/xin-token-lg.png" alt="XIN Token" width={216} height={216} />
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles['footer-socials']}>
            <Link href="https://twitter.com/XinDragons">
              <a>
                <img src="/twitter-2.svg" alt="Xin Dragons Twitter"/>
              </a>
            </Link>
            <Link href="https://twitter.com/XinDragons">
              <a>
                <img src="/discord-2.svg" alt="Xin Dragons Discord"/>
              </a>
            </Link>
          </div>
          <p>{(new Date()).getFullYear()} Xin Dragons All rights reserved</p>
        </footer>

      </div>
    </div>
  )
}
