const takeSnapshot = require('../lib/take-snapshot');
const ingest = require('../lib/ingest-data');

(async () => {
  try {
    const snapshot = await takeSnapshot();
    console.log(`Snapshot taken`)
    await ingest(snapshot);
    console.log('Data ingested')
  } catch (err) {
    console.error('Error performing snap/ingest', err);
  }
})();
