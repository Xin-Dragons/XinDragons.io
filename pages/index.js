import { Fragment } from 'react';
import Head from 'next/head'
import Image from 'next/image'
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
      '@Hal and @The Gentlemonke take over the lead of the project (WEN DOXX??)',
      'Community building, hiring a team of terrific Mods, Dragon Council and Elite Alpha Team',
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
      '**50%** of all royalties from gen 2 secondary sales will be paid to gen 1 holders',
      'Further $XIN Utility to come after babies...'
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

export default function Home() {
  return (
    <>
      <section className={classnames(styles.section, styles.dragons)}>
        <div className={styles['section-inner']}>
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
        </div>
      </section>

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

        <section className={classnames(styles.section)}>
          <div className={styles['section-inner']}>
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
          <div className={styles['section-inner']}>
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

        <section className={styles.section}>
          <div className={styles['section-inner']}>
            <h2 id="team" className={classnames(styles.heading, styles['token-header'])}>Team</h2>

            <div className={styles.team}>
              <div className={styles['team-member']}>
                <Image src="/gentlemonke.png" height={150} width={150} />
                <p>The Gentlemonke<br />Development Lead</p>
              </div>

              <div className={styles['team-member']}>
                <Image src="/hal.png" height={150} width={150} />
                <p>Hal<br />Community Lead</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
