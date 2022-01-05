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
    text: 'lorem ipsum'
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
    text: 'Lives in the seas, rivers, lakes, or underground. It can control the flow of rivers or streams.'
  },
  {
    src: '/xin.png',
    title: 'Xin',
    color: 'xin',
    text: 'Lucky Dragons, it is said that they bring luck to their holders'
  }
]

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
        <link rel="preload" href="Vermin-Vibes-1989.woff" as="font" crossOrigin="" type="font/woff" />
        <link rel="preload" href="Vermin-Vibes-1989.woff2" as="font" crossOrigin="" type="font/woff2" />
        <link rel="preload" href="TradeWinds.woff" as="font" crossOrigin="" type="font/woff" />
        <link rel="preload" href="TradeWinds.woff2" as="font" crossOrigin="" type="font/woff2" />
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
                  <Image src="/twitter.svg" alt="Xin Dragons Twitter" width={26} height={21} />
                </a>
              </Link>
              <Link href="https://twitter.com/XinDragons">
                <a>
                  <Image src="/discord.svg" alt="Xin Dragons Discord" width={26} height={20} />
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
            <p>Different types of dragons representing different things</p>

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
        <div className={styles['roadmap-inner']}>
          <h2 id="roadmap" className={styles.heading}>Roadmap</h2>
          <ol>
            <li>Mint of 887 Xin Dragons</li>
            <li>List on secondary marketplace</li>
            <li>Setup holder verification</li>
            <li>Create DAO</li>
            <li>$XIN token creation</li>
            <li>Release of Baby Xin Dragons</li>
          </ol>
        </div>
      </section>

      <div className={styles['dark-bg']}>
        <section className={styles.section}>
          <div className={styles.content}>
            <h2 id="babies" className={styles.heading}>Xin Dragon Babies</h2>

            <div className={classnames(styles.flex, styles.narrow)}>
              <img src="/baby.png" alt="Xin Dragon Baby" width={145} height={143} />

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo eros quis quam dapibus, vel finibus augue vehicula. Mauris semper neque ac lacus tincidunt auctor. Quisque nec arcu vel orci volutpat condimentum. Vivamus pellentesque diam non lectus laoreet, vitae congue quam fringilla. Fusce accumsan elit at metus lobortis, eu ullamcorper felis sagittis. Donec accumsan dui sed ornare luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.content}>
            <h2 id="token" className={styles.heading}>$XIN Token</h2>

            <div className={classnames(styles.flex, styles.narrow)}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo eros quis quam dapibus, vel finibus augue vehicula. Mauris semper neque ac lacus tincidunt auctor. Quisque nec arcu vel orci volutpat condimentum. Vivamus pellentesque diam non lectus laoreet, vitae congue quam fringilla. Fusce accumsan elit at metus lobortis, eu ullamcorper felis sagittis. Donec accumsan dui sed ornare luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
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
