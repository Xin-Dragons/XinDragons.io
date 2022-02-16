import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Container, Snackbar, Paper, CircularProgress } from '@material-ui/core';
import CTAButton from '../components/CTAButton';

import {
  Transaction,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  sendAndConfirmRawTransaction
} from '@solana/web3.js';

import toast from 'react-hot-toast';
import CountUp from 'react-countup';

import axios from 'axios';

import styles from '../styles/Home.module.scss'

export default function claim({ data }) {
  const wallet = useWallet();
  const { connection } = useConnection()
  const [loading, setLoading] = useState(false);
  const [tokensToClaim, setTokensToClaim] = useState();
  const [tokenBalance, setTokenBalance] = useState();

  useEffect(async () => {
    if (!wallet.publicKey) {
      return;
    }
    setLoading(true);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/staking/${wallet.publicKey}`)
    setLoading(false);
    const { data } = res;
    if (res.status === 200) {
      setTokensToClaim(data);
    }
  }, [wallet.publicKey]);

  useEffect(async () => {
    if (!wallet.publicKey) {
      return;
    }
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/get-token-balance/${wallet.publicKey}`)
    const { data } = res;
    if (res.status === 200) {
      setTokenBalance(data.amount);
    }
  }, [wallet.publicKey])

  async function claim() {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/staking/${wallet.publicKey}/claim`)
      let { transaction } = res.data;

      transaction.instructions = transaction.instructions.map(i => {
        return {
          ...i,
          data: new Buffer(i.data),
          programId: new PublicKey(i.programId),
          keys: i.keys.map(key => {
            return {
              ...key,
              pubkey: new PublicKey(key.pubkey)
            }
          })
        }
      })

      transaction.signatures = transaction.signatures.map(s => {
        return {
          ...s,
          publicKey: new PublicKey(s.publicKey),
          signature: s.signature
            ? new Buffer(s.signature)
            : null
        }
      });

      transaction = new Transaction(transaction);
      const signedTransaction = await wallet.signTransaction(transaction, connection);
      const isVerifiedSignature = signedTransaction.verifySignatures();

      if (!isVerifiedSignature) {
        throw new Error('Error signing transaction');
      }

      const rawTransaction = signedTransaction.serialize();

      await sendAndConfirmRawTransaction(connection, rawTransaction);
      await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/staking/${wallet.publicKey}/send`)

      toast.success('Claim successful!');
      setLoading(false);
      setTokenBalance(tokenBalance + tokensToClaim);
      setTokensToClaim(0);

    } catch (e) {
      console.log(e)
      toast.error('Claim Error:', e.message);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Container maxWidth="xs" style={{ position: 'relative' }}>
        <Paper
          style={{ padding: 24, backgroundColor: 'rgba(21, 26, 31, 0.8)', borderRadius: 6, marginBottom: 100 }}
        >

          <main className={styles.main}>
            <h2 className={classnames(styles.heading, styles.claimooor)}>The Claimooor</h2>
            <div className={styles.walletButtons}>
              <WalletMultiButton className={classnames({ [styles.disconnected]: !wallet.connected })} />
              {
                wallet.connected && <h4>$XIN balance: {tokenBalance}</h4>
              }
            </div>
            {
              wallet.connected && (
                <div className={styles.claim}>
                  <h3 className={classnames(styles.heading, styles.block)}>$XIN to claim:</h3>
                  <h2 className={classnames(styles.heading, styles.block, styles.center)}>
                    <CountUp
                      end={tokensToClaim}
                      prefix="$XIN "
                      separator=","
                    />
                  </h2>
                  <CTAButton disabled={loading || tokensToClaim === 0} onClick={claim}>
                    {
                      loading
                        ? <CircularProgress />
                        : 'Claim'
                    }
                  </CTAButton>
                </div>
              )
            }
          </main>
        </Paper>
      </Container>
    </Container>
  );
}
