import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apiSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, apiSecret);

export default async function handler(req, res) {
  const { publicKey } = req.query;
  const { success, change_id } = req.body;

  const { data, error } = await supabase
    .from('xin-dragons')
    .select('*')
    .eq('address', publicKey);

  if (error) {
    return res.status(500).send({ message: 'Error reading from DB' })
  }

  if (!data || !data.length) {
    return res.status(200).json({ message: 'noop' })
  }

  const item = data[0];

  const updates = {
    change_id: null,
    claim_in_progress: null
  };

  if (!success && item.change_id && change_id === item.change_id) {
    updates.tokens_to_claim = item.claim_in_progress;
  }

  const { data: updated, error: updatedErr } = await supabase
    .from('xin-dragons')
    .update(updates)
    .eq('address', item.address);

  if (updatedErr) {
    return res.status(500).send({ message: 'Error writing to DB' });
  }

  res.status(200).json({ message: 'ok' });
}
