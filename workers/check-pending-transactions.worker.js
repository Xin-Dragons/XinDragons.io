const { Connection } = require('@solana/web3.js');
const { transactionComplete, getClaimer } = require('../lib/db');

const MAX_RETRIES = 60;

(async () => {
  const txnId = process.argv[2];
  const publicKey = process.argv[3];
  // const delay = process.argv[4] ? parseInt(process.argv[4], 10) : null;
  let confirmed = false;
  let retries = MAX_RETRIES;

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_HOST || '', {
    commitment: "finalized",
    confirmTransactionInitialTimeout: 1000
  });

  // if (delay) {
  //   setTimeout(async () => {
  //     try {
  //       await connection.confirmTransaction(txnId)
  //       const claimer = await getClaimer({ publicKey });
  //       if (claimer && claimer.change_id && claimer.change_id === txnId) {
  //         await transactionComplete({ publicKey, txnId, success: true });
  //       }
  //     } catch {
  //       const claimer = await getClaimer({ publicKey });
  //       if (claimer && claimer.change_id && claimer.change_id === txnId) {
  //         await transactionComplete({ publicKey, txnId, success: false });
  //       }
  //     }
  //   }, delay)
  // } else {

    while (!confirmed && retries > 0) {
      try {
        console.log('TRYING :)')
        await connection.confirmTransaction(txnId)
        console.log('CONFIRMED!!!!!!')
        confirmed = true;
      } catch (err) {
        console.log('FAILED :(')
        retries--;
      }
    }

    console.log('DONE', confirmed)

    await transactionComplete({ publicKey, txnId, success: confirmed });
  // }
})();
