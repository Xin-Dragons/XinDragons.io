const web3 = require('@solana/web3.js');
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import getTokensOwing from '../../../../lib/get-tokens-owing';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apiSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, apiSecret);

const xinTokenMint = new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

const fromWallet = web3.Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(bs58.decode(process.env.XIN_WALLET).toString())
  )
)

export default async function handler(req, res) {
  const { publicKey } = req.query;
  const { change_id } = req.body;

  const claimActive = Boolean(process.env.NEXT_PUBLIC_CLAIM_ACTIVE);

  if (!claimActive) {
    return res.status(500).send({ message: 'Claim currently offline' });
  }

  const { data: item, error: itemError } = await supabase
    .from('xin-dragons')
    .select('tokens_to_claim, claim_in_progress, change_id')
    .eq('address', publicKey);

  if (!item || !item.length) {
    return res.status(500).send({ message: 'No tokens to claim' })
  }

  if (item[0].change_id) {
    return res.status(500).send({ message: 'Transaction in progress' })
  }

  const { tokens_to_claim, claim_in_progress } = item[0];

  if (claim_in_progress) {
    return res.status(500).send({ message: 'Transaction in progress' })
  }

  if (tokens_to_claim <= 0) {
    return res.status(500).send({ message: 'No tokens to claim' });
  }

  const { data: update, error: updateError } = await supabase
    .from('xin-dragons')
    .update({ tokens_to_claim: 0, claim_in_progress: tokens_to_claim, change_id })
    .eq('address', publicKey);

  if (updateError) {
    return res.status(500).send({ message: 'Error updating claim amount' })
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

  const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
    xinToken.associatedProgramId,
    xinToken.programId,
    xinTokenMint,
    userWallet
  );

  const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);

  const instructions: web3.TransactionInstruction[] = [];
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

  transaction.addSignature(fromWallet.publicKey, signature);

  res.status(200).json({ transaction });
}
