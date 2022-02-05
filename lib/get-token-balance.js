const web3 = require('@solana/web3.js');
const { get } = require('lodash');

const TOKEN_PUBKEY = new web3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export default async function getXinBalance(publicKey, tokenKey) {
  const solana = new web3.Connection(process.env.NEXT_PUBLIC_RPC_HOST);

  const accountPublicKey = new web3.PublicKey(publicKey);
  const mintAccount = new web3.PublicKey(tokenKey);

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
    amount = parseInt(amount, 10);
  }

  return amount;
}
