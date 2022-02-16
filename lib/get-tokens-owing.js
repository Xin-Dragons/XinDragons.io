import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apiSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;
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
