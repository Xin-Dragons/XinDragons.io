import classnames from 'classnames';
import * as anchor from '@project-serum/anchor';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Container, Snackbar, Paper, CircularProgress } from '@material-ui/core';
import CTAButton from '../components/CTAButton';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  Transaction,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  sendAndConfirmRawTransaction
} from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

import styles from '../styles/Home.module.scss';

const xinTokenMint = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

export default function Swop() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    if (wallet.publicKey) {
      updateTokenBalance();
    }
  }, [wallet.publicKey, wallet.connected])

  const swapActive = Boolean(process.env.NEXT_PUBLIC_SWAP_ACTIVE);

  async function updateTokenBalance() {
    if (wallet && wallet.publicKey) {
      const key = wallet.publicKey.toString();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/get-token-balance/${key}`);

      const { amount } = response.data;

      setTokenBalance(amount);
    }
  }

  function onChange(e) {
    let { value } = e.target;

    if (value) {
      value = parseInt(value, 10);
    }

    setTokens(value);
  }

  function setMax(e) {
    e.preventDefault()

    const max = parseInt(process.env.NEXT_PUBLIC_MAX_TOKEN_SWAP, 10);

    const val = tokenBalance > max
      ? max
      : tokenBalance

    setTokens(val);
  }

  function onInputClick(e) {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  async function swap() {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/swap-xin`, { tokens, publicKey: wallet.publicKey })
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

      toast.success('Swap successful!');
      setLoading(false);
      setTokenBalance(tokenBalance - tokens);
      setTokens(0);

    } catch (e) {
      toast.error('Swap Error:', e.message);
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
            <h2 className={styles.gradient}>The Swappooor</h2>

            {
              !swapActive
                ? <h2 className={styles.swapper}>SWAP OFFLINE</h2>
                : (
                  <>
                    <div className={styles.walletButtons}>
                      <WalletMultiButton className={classnames({ [styles.disconnected]: !wallet.connected })} />
                      {
                        wallet.connected && <h4>$XIN balance: {tokenBalance}</h4>
                      }
                    </div>
                    {
                      wallet.connected && (
                        <>
                          <div className={styles.inputWapper}>
                            <input
                              className={styles.xinput}
                              type="text"
                              value={tokens}
                              onChange={onChange}
                              onClick={onInputClick}
                            />
                            <a href="#" onClick={setMax}>Max</a>
                          </div>
                          <p className={styles.exchange}>210 XIN = 0.69 SOL</p>

                          <CTAButton onClick={swap} disabled={loading || !tokens}>
                            {
                              loading
                                ? <CircularProgress style={{ color: '#7C5D1E' }} />
                                : 'SWOP'
                            }
                          </CTAButton>
                        </>
                      )
                    }
                  </>
                )
              }
          </main>
      </Paper>
    </Container>
    </Container>
  );
}
