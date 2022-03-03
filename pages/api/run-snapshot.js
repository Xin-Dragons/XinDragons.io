import { map, flatten, reduce, omit } from 'lodash';
import { fork, exec } from 'child_process';
import path from 'path';


import takeSnapshot from '../../lib/take-snapshot';
import ingest from '../../lib/ingest-data';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        try {
          exec("ls -la ./.next/server", (error, stdout, stderr) => {
              if (error) {
                  console.log(`error: ${error.message}`);
                    res.status(200).json({ success: true });
                  return;
              }
              if (stderr) {
                  console.log(`stderr: ${stderr}`);
                    res.status(200).json({ success: false });
                  return;
              }
              res.status(200).json({ success: true });
              console.log(`stdout: ${stdout}`);
          });
          fork('./.next/server/collection.worker.js', [], { cwd: process.cwd() });
        } catch(e) {
          console.error(e);
          return res.status(500).json({});
        }

        // res.status(200).json({ success: true });

      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
