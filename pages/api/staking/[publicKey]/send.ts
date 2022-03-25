import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection } from '@solana/web3.js';
import { fork } from 'child_process';
import { transactionStarted, transactionComplete } from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rawTransaction, publicKey } = req.body;
  if (!rawTransaction || !publicKey) {
    return res.status(500).send('Missing params');
  }

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_HOST || '', {
    commitment: "finalized",
    confirmTransactionInitialTimeout: 30000
  });

  const txnId = await connection.sendRawTransaction(rawTransaction, { skipPreflight: true })

  await transactionStarted({ publicKey, txnId });

  try {
    // throw new Error('Transaction was not confirmed in')
    await connection.confirmTransaction(txnId);
    await transactionComplete({ publicKey, txnId, success: true });
    return res.status(200).send('OK');
  } catch (err: any) {
    const isTimeout = err.message.includes('Transaction was not confirmed in');

    if (isTimeout) {
      console.log('IS TIMEOUT')
      // fork(path.resolve(process.cwd(), './workers/check-pending-transactions.worker.js'), [txnId, publicKey], { cwd: process.cwd() })
      return res.status(500).json({ message: 'Timeout, waiting to confirm failed' })
    } else {
      try {
        await transactionComplete({ publicKey, txnId, success: false });
      } catch (err) {
        return res.status(500).json(err)
      }
    }
  }
}

export const config = {
  unstable_includeFiles: ['workers'],
}