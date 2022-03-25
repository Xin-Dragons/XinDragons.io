const path = require('path');
const { fork } = require('child_process');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.DB_URL || '';
const apiSecret = process.env.DB_SECRET || '';
const table = process.env.DB_TABLE || '';
const supabase = createClient(supabaseUrl, apiSecret);

async function getClaimer({ publicKey }) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('address', publicKey);

  if (error) {
    throw new Error('Error reading from database');
  }

  if (!data || !data.length) {
    throw new Error('Claimer not found');
  }

  return data[0];
}

async function transactionComplete({ publicKey, txnId, success }) {
  const claimer = await getClaimer({ publicKey });

  const updates = {
    change_id: null,
    claim_in_progress: null
  };

  if (!success && claimer.change_id && txnId === claimer.change_id) {
    updates.tokens_to_claim = claimer.claim_in_progress;
  }

  const { data, error } = await supabase
    .from('xin-dragons')
    .update(updates)
    .eq('address', claimer.address);

  if (error) {
    throw new Error('Error writing to DB');
  }

  return data;
}

async function transactionStarted({ publicKey, txnId }) {
  const claimer = await getClaimer({ publicKey });

  const { data, error } = await supabase
    .from(table)
    .update({ tokens_to_claim: 0, claim_in_progress: claimer.tokens_to_claim, change_id: txnId })
    .eq('address', publicKey);

  if (error) {
    throw new Error('Error updating tokens');
  }

  fork(path.resolve(process.cwd(), './workers/check-pending-transactions.worker.js'), [txnId, publicKey], { cwd: process.cwd() })

  return data;
}

module.exports = {
  getClaimer,
  transactionStarted,
  transactionComplete
};