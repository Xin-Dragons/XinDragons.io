import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig } from '@nfteyez/sol-rayz';
import styles from '../styles/Home.module.scss';
import mints from '../data/mints.json';
import sortBy from 'lodash/sortBy';

function getAttribute(card, trait) {
  return card.attributes.find(a => a.trait_type === trait)
}

const getProvider = () => {
  if ('solana' in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
};

function SelectedCard({ card, dismiss }) {
  const skin = getAttribute(card, 'Skin').value;
  const color = skin.replace(' ', '-').toLowerCase();
  return (
    <div className={styles.modal} onClick={dismiss}>
      <div className={styles['modal-inner']}>
        <img src={card.image} />
        <h3 className={classnames(styles.heading, styles[color])}>{card.name}</h3>
        <dl>
          {
            card.attributes.map((attr, index) => (
              <Fragment key={index}>
                <dt>{attr.trait_type}</dt>
                <dd>{attr.value}</dd>
              </Fragment>
            ))
          }
        </dl>
      </div>
    </div>
  )
}

export default function Wallet({ ranks }) {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [wallet, setWallet] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if ('solana' in window) {
      setIsConnected(window.solana.isConnected);
    }
  });

  useEffect(() => {
    async function getMintsIfConnected() {
      if (isConnected) {
        await getAllMints()
      } else {
        setWallet(null);
        setCards([]);
      }
    }

    getMintsIfConnected();

  }, [isConnected])

  async function connect() {
    if (isConnected) {
      await window.solana.disconnect();
      return setIsConnected(window.solana.isConnected);
    }

    await window.solana.connect();
    setIsConnected(window.solana.isConnected);
  }

  const getAllNftData = async () => {
    try {
      const connect = createConnectionConfig('https://ssc-dao.genesysgo.net/');
      const provider = getProvider();
      let ownerToken = provider.publicKey;

      setWallet(ownerToken.toString());

      const result = isValidSolanaAddress(ownerToken);
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: ownerToken,
        connection: connect,
        serialization: true,
      });
      return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  async function pushCard(card) {
    return setCards(oldCards => [...oldCards, card], 'rank')
  }

  const getAllMints = async () => {
    try {
      const nftData = await getAllNftData();
      var data = Object.keys(nftData).map((key) => nftData[key]).filter(d => mints.includes(d.mint))
      let arr = [];
      let n = data.length;
      for (let i = 0; i < n; i++) {
        let val = await axios.get(data[i].data.uri);
        const mint = data[i].mint;
        await pushCard({
          mint,
          rank: ranks[mint],
          ...val.data
        });
      }
      return arr;

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        selectedCard && <SelectedCard card={selectedCard} dismiss={() => setSelectedCard(null)} />
      }
      <section className={classnames(styles.section, styles.dragons)}>
        <div className={styles['section-inner']}>
          <h2 id="dragons" className={styles.heading}>My Dragons</h2>
          {
            isConnected
              ? <p>Connected to {wallet}</p>
              : <p>Connect wallet to see your dragons...</p>
          }

          {
            cards.length > 0
              && (
                <div className={styles.grid}>
                  {
                    cards.map((card, index) => {
                      const skin = getAttribute(card, 'Skin').value;
                      const color = skin.replace(' ', '-').toLowerCase();
                      return (
                        <div key={index} className={classnames(styles.card, styles['wallet-card'])} onClick={() => setSelectedCard(card)}>
                          <img src={card.image} alt={card.name} width={165} height={165} />
                          <h3 className={classnames(styles.heading, styles[color])}>{card.name}</h3>
                          <p>{skin}</p>
                          <div className={styles.moonrank}>
                            <span className={styles['moonrank']}>⍜</span><span className={styles['rank']}>{card.rank}</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
          }
          <button className={styles.button} onClick={connect}>
            <span>{ isConnected ? 'Disconnect' : 'Connect' }</span>
          </button>
        </div>
      </section>

    </>
  )
}

export async function getStaticProps() {
  const response = await axios.get('https://moonrank.app/mints/xin_dragons');

  const ranks = response.data.mints.reduce((obj, item) => {
    return {
      ...obj,
      [item.mint]: item.rank
    }
  }, {});

  return {
    props: {
      ranks
    }
  }
}
