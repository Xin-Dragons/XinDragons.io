import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.API_URL;
const apiSecret = process.env.API_SECRET;
const supabase = createClient(supabaseUrl, apiSecret);

export default async function getTokensOwing(publicKey) {
  const { data, error } = await supabase
    .from('wallet')
    .select('tokens_to_claim')
    .eq('address', publicKey)

  if (error) {
    throw new Error('Error fetching tokens owing');
  }

  return data[0].tokens_to_claim;
}
