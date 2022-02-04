const web3 = require('@solana/web3.js');
const { get } = require('lodash');

const MULTIPLIER = 1000000;

const TOKEN_PUBKEY = new web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

// function getBalance(response) {
//   console.log(response.value[0].account.data.parsed)
//   if (
//     Array.isArray(response?.value) &&
//     response?.value?.length > 0 &&
//     response?.value[0]?.account?.data?.parsed?.info?.tokenAmount
//       ?.amount > 0
//   ) {
//     return (
//       Number(
//         response?.value[0]?.account?.data?.parsed?.info
//           ?.tokenAmount?.amount
//       ) / 1000000000
//     );
//   } else {
//     return 0;
//   }
// }

export default async function handler(req, res) {
  const { publicKey } = req.query;

  const solana = new web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST);

  const accountPublicKey = new web3.PublicKey(publicKey);
  const mintAccount = new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

  const filters = [
    {
      memcmp: {
        offset: 0,
        bytes: mintAccount,
      },
    },
    {
      dataSize: 165,
    }
  ];
  const programAccountsConfig = {
    filters,
    encoding: 'jsonParsed'
  };

  const test = await solana.getParsedProgramAccounts(
    TOKEN_PUBKEY,
    programAccountsConfig
  );

  const result = test.find(item => get(item, 'account.data.parsed.info.owner') === publicKey);
  let amount = get(result, 'account.data.parsed.info.tokenAmount.amount');

  if (amount) {
    amount = parseInt(amount, 10) / MULTIPLIER;
  }

  res.status(200).json({ amount });
}
