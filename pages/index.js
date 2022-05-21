import { Fragment } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import classnames from 'classnames';
import styles from '../styles/Home.module.scss'

const cards = [
  {
    src: '/chromatic.png',
    title: 'Xin Chromatic',
    color: 'xin-chromatic',
    text: 'Masters of light and colour, you see only what they want you to see. A rainbow is a sure sign that a Xin Chromatic was flying free. '
  },
  {
    src: '/gold.png',
    title: 'Crystal Gold',
    color: 'crystal-gold',
    text: 'Protectors of Peace are the diplomats of the Xin Dragons. Constantly communicating with the many races to maintain the fragile balance of the world.'
  },
  {
    src: '/neon.png',
    title: 'Chinese Neon',
    color: 'chinese-neon',
    text: 'The Lords of Time command great respect within the Xin Dragons. Whether time crawls or hours go by in a flash, that is the domain of the Chinese Neon. '
  },
  {
    src: '/sea.png',
    title: 'Deep Sea',
    color: 'deep-sea',
    text: 'Denizens of the Deep that maintain the oceans and the seas. All life underwater defers to their rule, and the tides ebb and flow to their moods. '
  },
  {
    src: '/gargoyle-purple.png',
    title: 'Gargoyle Purple',
    color: 'gargoyle-purple',
    text: 'They are one with the earth, the mountains and the hills and they can mould dust and dirt to their will. When angered the earth quakes.'
  },
  {
    src: '/chinese.png',
    title: 'Chinese',
    color: 'chinese',
    text: 'Friends of the Forest where they dwell they dictate the colour of the leaves cells. A flash of yellow in the jungle does not bode well. '
  },
  {
    src: '/crystal.png',
    title: 'Crystal',
    color: 'crystal',
    text: 'Nomads that scour the skies, they shape the storms and all it implies. Their breath makes rain and creates ice and when they ride lightning thunder roars through the air.'
  },
  {
    src: '/swamp.png',
    title: 'Swamp',
    color: 'swamp',
    text: 'Makers of the cool currents and the billowing breeze these Dragons are rarely heard or seen. They rid the world of stagnant scenes while staying hidden in their den. '
  },
  {
    src: '/gargoyle.png',
    title: 'Gargoyle',
    color: 'gargoyle',
    text: 'The underworld is their home where they tend to the diamonds and gold. If you find yourself lost in a cave then call for a gargoyle and chances are you will be saved. '
  },
  {
    src: '/xin.png',
    title: 'Xin',
    color: 'xin',
    text: 'None know the true purpose of the Xin. They wander the world bringing luck to the few that they bless. Perhaps soon the world will reveal their real roles.  '
  }
];

const oldphases = [
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
      // 'Holders of 3 Xin Dragons will be entitled to a FREE baby',
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

const phases = [
  {
    title: 'Staking for $XIN',
    color: 'green',
    align: 'left',
    offset: 50,
    image: 'cards-1.png',
    steps: [
      'Babies will pay their parents $XIN when located in the same wallet (Maximum 3 babies per parent)',
      'Rarer Gen1 AND Gen2 will pay more $XIN',
      'Special bonus for matching special skins (TBC)'
    ]
  },
  {
    title: 'Dragon Balls',
    color: 'pink',
    align: 'right',
    image: 'cards-2.png',
    steps: [
      'Can only be bought from the $XIN vending machine',
      'Can be used to evolve a Gen1 dragon into a Super Dragon',
      'Special bonus for collecting all Dragon Balls (1-7)'
    ]
  },
  {
    title: 'Super Dragons',
    align: 'left',
    image: 'cards-3.png',
    steps: [
      'A Gen1 Dragon is evolved with remastered artwork',
      'Super Dragon is forever bound to the wallet from which they were evolved',
      'Super Dragons receive 100% of royalties from all future sales',
    ]
  },
  {
    title: 'The Fusion',
    color: 'blue',
    align: 'right',
    image: 'cards-4.png',
    offset: 50,
    steps: [
      'Up to 3 babies can be included in The Fusion',
      '100% of all future royalties from these babies paid to Fused wallet',
      'Babies can only be refused if used in another evolution'
    ]
  },
  {
    title: 'Coming Soon',
    color: 'red',
    align: 'right',
    marginTop: 80,
    steps: [
      // 'Up to 3 babies can be included in The Fusion',
    ]
  },
]


export default function Home() {
  return (
    <>
      <section className={classnames(styles.section)}>
        <div className={styles['section-inner']}>
          <h2 id="lore" className={styles.heading}>Lore</h2>

          <p>Since the beginning of time, the XIN Dragons have kept peace and order across the world. They protected the sky and the sea, controlled the seasons and protected mother nature. They lived in harmony with humans who worshipped them.</p>

          <p>Not so long ago came a big storm, and with it the dark forces prevailed. Some of the dragons became greedy, and their evil caused chaos around the world. In their pursuit to become immortal Superdragons, the detractors captured all the Baby Dragons and demanded XIN tokens from their parents to release them. The precious Xin tokens are the only way to unlock the prized Dragonballs, which must be collected and combined with a parent dragon to ultimately become a never-before-seen Superdragon!</p>

          <p>The whole world is now mobilized to help the righteous XIN Dragons bring the Baby Dragons back and restore peace, order and harmony.</p>

          <p>An epic battle is in sight... Are you going to be the one to pave the way... Which path will you choose?</p>

          <video autoPlay muted loop width="100%">
            <source src="/lore.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
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
        <h2 id="roadmap" className={styles.heading}>The Evolved Roadmap</h2>
        <br />
        <div className={styles['roadmap-inner']}>
          {
            phases.map((phase, index) => (
              <div key={index} className={classnames(styles.phase, styles[phase.align])} style={phase.marginTop ? { marginTop: `${phase.marginTop}px` } : {}}>
                <h3 className={classnames(styles.heading, styles[phase.color])}>{`Phase ${index + 1} - ${phase.title}`}</h3>
                <div className={classnames(styles['phase-inner'], styles[phase.align])}>
                  <img src={phase.image} alt="Cards" style={phase.offset ? { [phase.align]: `-${phase.offset}px` } : {}} />
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


      <section id="the-chosen" className={classnames(styles.section, styles['the-chosen'])}>
        <div className={styles['section-inner']}>
        <div className={classnames(styles.flex)}>
          <div className={styles['align-right']}>
            <h2 className={styles.heading}>The Chosen</h2>
            <p className={styles.uppercase}>There are 11 Chosen</p>
            <p className={styles.uppercase}>One from each ancient dragon family... and one mysterious overlord who reigns supreme over the entire weyr, from the deepest depths of the darkest corner of the universe...</p>
            <p>Each Chosen rules over its <span className={styles.lighter}>ENTIRE</span> clan, and demands that a <span className={styles.lighter}>TAX</span> is paid, in <span className={styles.lighter}>SOL</span>, every time one of its loyal subjects is traded in common barter (or via Magic Eden marketplace).</p>

            <p>That tax will be paid at a rate of <span className={styles.lighter}>8%</span> of the total royalties received.</p>

            <p>And for the one true overlord, a smaller tax must be paid for <span className={styles.lighter}>EVERY</span> dragon traded. This tax is set at <span className={styles.lighter}>3%</span> of <span className={styles.lighter}>ALL FUTURE ROYALTIES</span> from <span className={styles.lighter}>EVERY SINGLE SALE</span></p>
          </div>
          <img src="/the-chosen.png" alt="The Chosen" width={500} className={styles.chosen}/>
        </div>
        </div>
      </section>

      <div className={styles["dark-bg"]}>
        <section className={styles.section}>
          <div className={styles["section-inner"]}>
            <h2
              id="team"
              className={classnames(styles.heading, styles["token-header"])}
            >
              Team
            </h2>

            <div className={styles.team}>
              <div className={styles["team-member"]}>
                <img src="/gentlemonke.png" />
                <p>
                  The Gentlemonke
                  <br />
                  Development Lead
                </p>
              </div>

              <div className={styles["team-member"]}>
                <img src="/hal.png" />
                <p>
                  Hal
                  <br />
                  Business Operations Lead
                </p>
              </div>

              <div className={styles["team-member"]}>
                <img src="/akarune.webp" />
                <p>
                  Akarune
                  <br />
                  Community Lead and Project Management
                </p>
              </div>
              <div className={styles["team-member"]}>
                <img src="/groovy.gif" />
                <p>
                  GroovyEnzio 🍉
                  <br />
                  Partner Relations and Business Advisory
                </p>
              </div>
              <div className={styles["team-member"]}>
                <img src="/alex-sm.gif" />
                <p>
                  Alex
                  <br />
                  Chief Design Officer
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
