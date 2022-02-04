import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

export default async function handler(req, res) {
  const { transactionBuffer } = req.body;

  const signature = nacl.sign.detached(
    new Uint8Array(bs58.decode(transactionBuffer)),
    new Uint8Array(
      JSON.parse(
        bs58
          .decode(process.env.XIN_WALLET)
          .toString()
      )
    )
  );


  res.status(200).json({ signature: bs58.encode(signature) });
}
