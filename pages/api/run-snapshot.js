import { map, flatten, reduce, omit } from 'lodash';
import takeSnapshot from '../../lib/take-snapshot';
import ingest from '../../lib/ingest-data';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        console.log('AUTHORIZED')
        const snapshot = await takeSnapshot();
        await ingest(snapshot);
        res.status(200).json({ success: true });
      } else {
        console.log('UNAUTHORIZED')
        res.status(401).json({ success: false });
      }
    } catch (err) {
      console.log('THROWN', err.message)
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    console.log('BAD METHOD')
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
