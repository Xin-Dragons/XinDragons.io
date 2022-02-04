import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Alert from '@material-ui/lab/Alert';
import CTAButton from '../components/CTAButton';
import { Container, Snackbar, Paper } from '@material-ui/core';

import Mint from '../components/Mint';

import styles from '../styles/Home.module.scss';

const Home: NextPage = (props) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: undefined,
  });
  const wallet = useWallet();
  const [tokenBalance, setTokenBalance] = useState(0);

  async function updateTokenBalance() {
    if (wallet && wallet.publicKey) {
      const key = wallet.publicKey.toString();
      const response = await axios.get(`http://localhost:3000/api/get-token-balance/${key}`);

      const { amount } = response.data;

      setTokenBalance(amount);
    }
  }

  useEffect(() => {
    if (wallet.publicKey) {
      updateTokenBalance();
    }
  }, [wallet.publicKey, wallet.connected])

  return (
    <Container>
      <Container maxWidth="xs" style={{ position: 'relative' }}>
        <Paper
          style={{ padding: 24, backgroundColor: 'rgba(21, 26, 31, 0.8)', borderRadius: 6, marginBottom: 100 }}
        >
          <Toaster />

          <main className={styles.main}>
            <div className={styles.walletButtons}>
              <WalletMultiButton />
              {
                wallet.connected && <h4>$XIN balance: {tokenBalance}</h4>
              }
            </div>

            {
              wallet.connected && <Mint {...props} tokenBalance={tokenBalance} />
            }
          </main>


      </Paper>
    </Container>

    <Snackbar
      open={alertState.open}
      autoHideDuration={6000}
      onClose={() => setAlertState({ ...alertState, open: false })}
    >
      <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        severity={alertState.severity}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  </Container>

  );
};

export default Home;
