import getTokensOwing from '../../../../lib/get-tokens-owing';

export default async function handler(req, res) {
  const { publicKey } = req.query;

  const tokensToClaim = await getTokensOwing(publicKey);

  if (tokensToClaim || tokensToClaim === 0) {
    return res.status(200).send(tokensToClaim);
  }

  return res.status(404);
};
