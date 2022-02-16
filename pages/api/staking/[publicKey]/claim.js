const web3 = require('@solana/web3.js');
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import getTokensOwing from '../../../../lib/get-tokens-owing';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

const xinTokenMint = new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

const fromWallet = web3.Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(bs58.decode(process.env.XIN_WALLET).toString())
  )
)

export default async function handler(req, res) {
  const { publicKey } = req.query;

  const claimActive = Boolean(process.env.NEXT_PUBLIC_CLAIM_ACTIVE);

  if (!claimActive) {
    return res.status(500).send({ message: 'Claim currently offline' });
  }

  const tokensToClaim = await getTokensOwing(publicKey);

  if (tokensToClaim <= 0) {
    return res.status(500).send({ message: 'No tokens to claim' });
  }

  const connection = new web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST);
  const userWallet = new web3.PublicKey(publicKey);

  const xinToken = new Token(
    connection,
    xinTokenMint,
    TOKEN_PROGRAM_ID,
    userWallet
  );

  const fromTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(fromWallet.publicKey)
  const toTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(userWallet)

  const transaction = new web3.Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        tokensToClaim * 1000000
      )
    );

  transaction.recentBlockhash = (await connection.getRecentBlockhash('singleGossip')).blockhash;
  transaction.setSigners(userWallet, fromWallet.publicKey);

  const signature = nacl.sign.detached(transaction.serializeMessage(), fromWallet.secretKey);

  transaction.addSignature(fromWallet.publicKey, signature);

  res.status(200).json({ transaction });
}
