import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.API_URL;
const apiSecret = process.env.API_SECRET;
const supabase = createClient(supabaseUrl, apiSecret);

export default async function handler(req, res) {
  const { publicKey } = req.query;

  const { data, error } = await supabase
    .from('wallet')
    .update({ tokens_to_claim: 0 })
    .eq('address', publicKey);

  if (error) {
    return res.status(500).send({ message: 'Error updating claim amount' })
  }

  res.send(200).send({ success: true });
}
