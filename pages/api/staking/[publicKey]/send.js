import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apiSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, apiSecret);

export default async function handler(req, res) {
  const { publicKey } = req.query;

  const { data, error } = await supabase
    .from('xin-dragons')
    .update({ tokens_to_claim: 0 })
    .eq('address', publicKey);

  if (error) {
    return res.status(500).send({ message: 'Error updating claim amount' })
  }

  res.status(200).send({ success: true });
}
