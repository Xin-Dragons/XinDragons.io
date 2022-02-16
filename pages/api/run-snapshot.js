// import { snapshot as doSnapshot } from '@xindragons/toolkit';
import { createClient } from '@supabase/supabase-js';
import { map, flatten, reduce, omit } from 'lodash';
import { getClaimableTokens } from '../../lib/get-claimable-tokens';
import allMints from '../../data/mints-all.json';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const MAGIC_EDEN = 'GUfCR9mK6azb9vcpsxgXyj7XRPAKJd4KMHTTVvtncGgp';

export default async function handler(req, res) {
  const { publicKey } = req.query;

  let snapshot = await doSnapshot(allMints);
  snapshot = omit(snapshot, MAGIC_EDEN);

  const { data: allMints } = await supabase
    .from('mints')
    .select('mint, gen')

  const { data: wallets } = await supabase
    .from('wallet')
    .select('address, tokens_to_claim')

  let { data: sshot, error: snapshotErr } = await supabase
    .from('snapshot')
    .insert({})

  const { id } = sshot[0];

  const walletUpdates = map(snapshot, (item, address) => {
    const mints = allMints.filter(mint => {
      return snapshot[address].mints.includes(mint.mint);
    });

    const existingTokens = (wallets.find(w => w.address === address) || {}).tokens_to_claim || 0;
    const tokens_to_claim = getClaimableTokens(mints);

    return {
      address,
      tokens_to_claim: existingTokens + tokens_to_claim
    }
  });

  const { data, error } = await supabase
    .from('wallet')
    .upsert(walletUpdates)

  const updates = flatten(map(snapshot, (item, address) => {
    return item.mints.map(mint => {
      return {
        wallet: address,
        mint,
        snapshot_id: id
      }
    })
  }))

  const { data: wallet_mints, error: wallet_mints_error } = await supabase
    .from('wallet_mints')
    .insert(updates);

  res.status(200).send({});
}
