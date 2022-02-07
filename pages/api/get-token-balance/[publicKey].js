import getTokenBalance from '../../../lib/get-token-balance';

const MULTIPLIER = 1000000;

export default async function handler(req, res) {
  const { publicKey } = req.query;

  let amount = await getTokenBalance(publicKey, process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

  amount = amount / MULTIPLIER;

  res.status(200).json({ amount });
}
