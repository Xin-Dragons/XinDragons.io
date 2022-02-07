import classnames from 'classnames';
import * as anchor from '@project-serum/anchor';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Container, Snackbar, Paper } from '@material-ui/core';
import CTAButton from '../components/CTAButton';
import axios from 'axios';
import { Transaction, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

import styles from '../styles/Home.module.scss';

const xinTokenMint = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

export default function Swop() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    if (wallet.publicKey) {
      updateTokenBalance();
    }
  }, [wallet.publicKey, wallet.connected])

  async function updateTokenBalance() {
    if (wallet && wallet.publicKey) {
      const key = wallet.publicKey.toString();
      const response = await axios.get(`http://localhost:3000/api/get-token-balance/${key}`);

      const { amount } = response.data;

      setTokenBalance(amount);
    }
  }

  useEffect(() => {
    console.log({ tokens })
  }, [tokens])

  function onChange(e) {
    let { value } = e.target;

    if (value) {
      value = parseFloat(value);
    }

    setTokens(value);
  }

  function setMax(e) {
    e.preventDefault()
    setTokens(tokenBalance);
  }

  async function swap() {
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

    transaction = new Transaction(transaction)

    // const xinToken = new Token(
    //   connection,
    //   xinTokenMint,
    //   TOKEN_PROGRAM_ID,
    //   wallet.publicKey
    // );

    // const fromTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(wallet.publicKey)
    // const toTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(new PublicKey(process.env.NEXT_PUBLIC_XIN_WALLET))
    //
    // console.log(fromTokenAccount.amount.toString());
    // console.log(toTokenAccount.amount.toString())
    //
    // console.log('transferring', tokens, tokens * 1000000);

    // transaction = new Transaction()
    //   .add(
    //     Token.createTransferInstruction(
    //       TOKEN_PROGRAM_ID,
    //       fromTokenAccount.address,
    //       toTokenAccount.address,
    //       wallet.publicKey,
    //       [],
    //       tokens * 1000000
    //     )
    //   )
    //   .add(SystemProgram.transfer({
    //     fromPubkey: new PublicKey(process.env.NEXT_PUBLIC_XIN_WALLET),
    //     toPubkey: wallet.publicKey,
    //     lamports: tokens * parseFloat(process.env.NEXT_PUBLIC_XIN_COST_IN_SOL) * LAMPORTS_PER_SOL,
    //   }))

    // transaction.recentBlockhash = (await connection.getRecentBlockhash('singleGossip')).blockhash;
    // transaction.setSigners(wallet.publicKey, new PublicKey(process.env.NEXT_PUBLIC_XIN_WALLET));
    //
    // let transactionBuffer = transaction.serializeMessage();
    // const signature = nacl.sign.detached(
    //   new Uint8Array(transactionBuffer),
    //   new Uint8Array(
    //     JSON.parse(
    //       bs58
    //         .decode(process.env.NEXT_PUBLIC_XIN_WALLET_SECRET)
    //         .toString()
    //     )
    //   )
    // );

    // transaction.setSigners(
    //   // fee payed by the wallet owner
    //   wallet.publicKey,
    //   new PublicKey(process.env.NEXT_PUBLIC_XIN_WALLET)
    // );

    // transaction.addSignature(new PublicKey(process.env.NEXT_PUBLIC_XIN_WALLET), signature);

    console.log(transaction)

    const signed = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signed, 'processed');

  }

  return (
    <Container>
      <Container maxWidth="xs" style={{ position: 'relative' }}>
        <Paper
          style={{ padding: 24, backgroundColor: 'rgba(21, 26, 31, 0.8)', borderRadius: 6, marginBottom: 100 }}
        >

          <main className={styles.main}>
            <h2 className={styles.swapper}>The Swappooor</h2>

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
                    <input className={styles.xinput} type="number" value={tokens} onChange={onChange} />
                    <a href="#" onClick={setMax}>Max</a>
                  </div>
                  <p className={styles.exchange}>210 XIN = 0.69 SOL</p>

                  <CTAButton onClick={swap}>SWAP</CTAButton>
                </>
              )

            }
          </main>


      </Paper>
    </Container>
    </Container>
  );
}
