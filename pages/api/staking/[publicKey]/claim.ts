import type { NextApiRequest, NextApiResponse } from 'next'
import * as web3 from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { getClaimer } from '../../../../lib/db';

const xinTokenMint = new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '');

const fromWallet = web3.Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(bs58.decode(process.env.XIN_WALLET || '').toString())
  )
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { publicKey } = req.query;

  const claimActive = Boolean(process.env.NEXT_PUBLIC_CLAIM_ACTIVE);

  if (!claimActive) {
    return res.status(500).send({ message: 'Claim currently offline' });
  }

  const claimer = await getClaimer({ publicKey });

  if (!claimer) {
    return res.status(500).send({ message: 'No account found' })
  }

  if (claimer.change_id) {
    return res.status(500).send({ message: 'Transaction in progress' })
  }

  const { tokens_to_claim, claim_in_progress } = claimer;

  if (claim_in_progress) {
    return res.status(500).send({ message: 'Transaction in progress' })
  }

  if (tokens_to_claim <= 0) {
    return res.status(500).send({ message: 'No tokens to claim' });
  }

  const connection = new web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST || '');
  const userWallet = new web3.PublicKey(publicKey);

  const xinToken = new Token(
    connection,
    xinTokenMint,
    TOKEN_PROGRAM_ID,
    fromWallet
  );

  const fromTokenAccount = await xinToken.getOrCreateAssociatedAccountInfo(fromWallet.publicKey)

  const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
    xinToken.associatedProgramId,
    xinToken.programId,
    xinTokenMint,
    userWallet
  );

  const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);

  const instructions: web3.TransactionInstruction[] = [];
  let transactionFee = Number(process.env.TRANSACTION_FEE);

  if (transactionFee) {
    instructions.push(
      web3.SystemProgram.transfer({
        fromPubkey: userWallet,
        toPubkey: new web3.PublicKey(process.env.TRANSACTION_FEE_WALLET || ''),
        lamports: transactionFee * web3.LAMPORTS_PER_SOL
      })
    )
  }
  if (receiverAccount === null) {
    instructions.push(
      Token.createAssociatedTokenAccountInstruction(
        xinToken.associatedProgramId,
        xinToken.programId,
        xinTokenMint,
        associatedDestinationTokenAddr,
        userWallet,
        userWallet
      )
    )
  }
  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      associatedDestinationTokenAddr,
      fromWallet.publicKey,
      [],
      tokens_to_claim * 1000000
    )
  );

  const transaction = new web3.Transaction().add(...instructions);
  transaction.feePayer = userWallet;

  transaction.recentBlockhash = (await connection.getRecentBlockhash('singleGossip')).blockhash;
  transaction.setSigners(userWallet, fromWallet.publicKey);

  const signature = nacl.sign.detached(transaction.serializeMessage(), fromWallet.secretKey);

  transaction.addSignature(fromWallet.publicKey, Buffer.from(signature));

  res.status(200).json({ transaction });
}
