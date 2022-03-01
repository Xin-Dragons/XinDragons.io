import moment from 'moment';
import { map } from 'lodash';
import { createClient } from '@supabase/supabase-js';
import { getClaimableTokens } from './get-claimable-tokens';
import meta from '../data/meta';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function ingest(snapshot) {

  const datetime = moment();

  const [year, month, day, hours, minutes, seconds] = datetime.format('YYYY-MMMM-DD-HH-mm-ss').split('-');

  const { data: snapshotUpload, error: uploadError } = await supabase.storage
    .from('snapshots')
    .upload(`${year}/${month}/${day}-${hours}:${minutes}:${seconds}.json`, JSON.stringify(snapshot, null, 2))

  const { data: wallets } = await supabase
    .from('wallet')
    .select('address, tokens_to_claim')

  const walletUpdates = map(snapshot, (item, address) => {
    const mints = meta.filter(item => {
      return snapshot[address].mints.includes(item.mint);
    });

    const existingTokens = (wallets.find(w => w.address === address) || {}).tokens_to_claim || 0;
    const tokens_to_claim = getClaimableTokens(mints);

    return {
      address,
      tokens_to_claim: existingTokens + tokens_to_claim
    }
  });

  console.log(walletUpdates)

  // const { data, error } = await supabase
  //   .from('wallet')
  //   .upsert(walletUpdates)

  return data;
}
