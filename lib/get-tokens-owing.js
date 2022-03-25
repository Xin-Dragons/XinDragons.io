import { get } from 'lodash';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.DB_URL;
const apiSecret = process.env.DB_SECRET;
const supabase = createClient(supabaseUrl, apiSecret);

export default async function getTokensOwing(publicKey) {
  const { data, error } = await supabase
    .from(process.env.DB_TABLE)
    .select('tokens_to_claim')
    .eq('address', publicKey)

  if (error) {
    throw new Error('Error fetching tokens owing');
  }

  return get(data, '[0].tokens_to_claim', 0);
}
