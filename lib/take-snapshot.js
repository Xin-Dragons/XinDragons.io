const { takeSnapshot: snapshot } = require('@xindragons/toolkit');
const { omit } = require('lodash');
const allMints = require('../data/mints-all.json');

const MAGIC_EDEN = [
  'GUfCR9mK6azb9vcpsxgXyj7XRPAKJd4KMHTTVvtncGgp',
  '1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix'
];

async function takeSnapshot() {
  const holders = await snapshot(allMints);
  return omit(holders, MAGIC_EDEN);
}

module.exports = takeSnapshot;
