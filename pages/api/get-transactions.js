const web3 = require('@solana/web3.js');
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import getTokenBalance from '../../lib/get-token-balance';
import bs58 from 'bs58';

const mintPrice = parseInt(process.env.NEXT_PUBLIC_MINT_PRICE, 10);

export default async function handler(req, res) {
  const { publicKey } = req.body;

  const payer = new web3.PublicKey(publicKey);
  const xinTokenMint = new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);
  const fromWallet = new web3.PublicKey(process.env.NEXT_PUBLIC_XIN_WALLET);
  const connection = new web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST);

  const xinToken = new Token(
    connection,
    xinTokenMint,
    TOKEN_PROGRAM_ID,
    payer
  );

  const tokenBalance = await getTokenBalance(publicKey, process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

  const fromTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(fromWallet)
  const toTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(payer)

  const tokensNeeded = mintPrice - tokenBalance;

  const solTransfer = web3.SystemProgram.transfer({
    fromPubkey: payer,
    toPubkey: new web3.PublicKey(process.env.NEXT_PUBLIC_MINT_PROCEEDS),
    lamports: tokensNeeded * parseFloat(process.env.NEXT_PUBLIC_XIN_COST_IN_SOL) * web3.LAMPORTS_PER_SOL,
  });

  const tokenTransfer = Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    fromTokenAccount.address,
    toTokenAccount.address,
    payer,
    [],
    tokensNeeded * 1000000
  )

  res.status(200).json({ transactions: {
    solTransfer: {
      ...solTransfer,
      data: bs58.encode(solTransfer.data)
    },
    tokenTransfer: {
      ...tokenTransfer,
      data: bs58.encode(tokenTransfer.data)
    }
  }});
}
