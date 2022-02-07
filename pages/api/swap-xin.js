const web3 = require('@solana/web3.js');
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import getTokenBalance from '../../lib/get-token-balance';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

const xinTokenMint = new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

const mintPrice = parseInt(process.env.NEXT_PUBLIC_MINT_PRICE, 10);

const fromWallet = web3.Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(bs58.decode(process.env.XIN_WALLET).toString())
  )
)

export default async function handler(req, res) {
  const { publicKey, tokens } = req.body;

  const swapActive = Boolean(process.env.NEXT_PUBLIC_SWAP_ACTIVE);

  if (!swapActive) {
    return res.status(500).send({ message: 'Swap not currently active' });
  }

  const tokenBalance = await getTokenBalance(publicKey, process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

  if (tokens > tokenBalance / 1000000) {
    return res.status(500).send({ message: 'Balance too low' });
  }

  if (tokens > parseInt(process.env.NEXT_PUBLIC_MAX_TOKEN_SWAP)) {
    return res.status(500).send({ message: 'Too much $XIN for one transaction' });
  }

  const connection = new web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST);
  const userWallet = new web3.PublicKey(publicKey);

  const xinToken = new Token(
    connection,
    xinTokenMint,
    TOKEN_PROGRAM_ID,
    userWallet
  );

  const fromTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(userWallet)
  const toTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(fromWallet.publicKey)

  const transaction = new web3.Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        userWallet,
        [],
        tokens * 1000000
      )
    )
    .add(
      web3.SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey: userWallet,
        lamports: tokens * parseFloat(process.env.NEXT_PUBLIC_XIN_COST_IN_SOL) * web3.LAMPORTS_PER_SOL,
      })
    )

  transaction.recentBlockhash = (await connection.getRecentBlockhash('singleGossip')).blockhash;
  transaction.setSigners(userWallet, fromWallet.publicKey);

  const signature = nacl.sign.detached(transaction.serializeMessage(), fromWallet.secretKey);

  transaction.addSignature(fromWallet.publicKey, signature);

  res.status(200).json({ transaction });
}
